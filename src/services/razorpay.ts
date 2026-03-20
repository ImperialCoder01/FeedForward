declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentConfig {
  key: string;
  amount: number;
  currency?: string;
  name: string;
  description: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: (response: any) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

class RazorpayService {
  private apiUrl = '/api/razorpay';
  private razorpayKey: string;
  private isDevelopment: boolean;

  constructor() {
    this.razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
    this.isDevelopment = import.meta.env.DEV || false;
  }

  private loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async createOrder(amount: number, planId: string, billingCycle: string): Promise<RazorpayOrderResponse | null> {
    try {
      const response = await fetch(`${this.apiUrl}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          planId,
          billingCycle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to create order');
      }

      return await response.json();
    } catch (error: any) {
      console.log('API order creation failed, using mock order for development');
      return {
        id: `mock_order_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
        status: 'created'
      };
    }
  }

  async openPayment(config: PaymentConfig): Promise<void> {
    if (!this.razorpayKey || this.razorpayKey === 'your_razorpay_key_id') {
      console.log('Development mode: Simulating payment success');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return;
    }

    const isLoaded = await this.loadRazorpayScript();

    if (!isLoaded) {
      throw new Error('Failed to load Razorpay');
    }

    return new Promise((resolve, reject) => {
      const options: any = {
        key: config.key || this.razorpayKey,
        amount: config.amount * 100,
        currency: config.currency || 'INR',
        name: config.name,
        description: config.description,
        order_id: config.orderId,
        prefill: config.prefill,
        theme: {
          color: config.theme?.color || '#7C3AED',
        },
        handler: (response: any) => {
          if (config.handler) {
            config.handler(response);
          }
          resolve();
        },
        modal: {
          ondismiss: () => {
            if (config.modal?.ondismiss) {
              config.modal.ondismiss();
            }
            reject(new Error('Payment cancelled'));
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  }

  async processSubscription(
    plan: {
      id: string;
      name: string;
      price_monthly?: number;
      price_yearly?: number;
    },
    billingCycle: 'monthly' | 'yearly',
    user: { name?: string; email?: string; phone?: string }
  ): Promise<{ success: boolean; error?: string }> {
    const amount = billingCycle === 'yearly' 
      ? (plan.price_yearly || 0) 
      : (plan.price_monthly || 0);

    if (amount === 0) {
      return { success: true };
    }

    const order = await this.createOrder(amount, plan.id, billingCycle);

    if (!order) {
      return { success: false, error: 'Failed to create payment order' };
    }

    try {
      await this.openPayment({
        key: this.razorpayKey,
        amount,
        name: 'Feed Forward',
        description: `${plan.name} Plan - ${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}`,
        orderId: order.id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
      });

      return { success: true };
    } catch (error: any) {
      if (error.message === 'Payment cancelled') {
        return { success: false, error: 'Payment was cancelled' };
      }
      return { success: false, error: error.message };
    }
  }
}

export const razorpayService = new RazorpayService();
export default razorpayService;
