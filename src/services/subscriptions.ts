import { supabase } from '@/integrations/supabase/client';

// Mock data for initial development (before running SQL migration)
export const mockPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic plan for individual donors',
    price_monthly: 0,
    price_yearly: 0,
    features: ['Basic listing', 'Community access', 'Standard support'],
    max_listings: 10,
    max_listings_unlimited: false,
    priority_listing: false,
    analytics_access: false,
    api_access: false,
    bulk_upload: false,
    ai_insights: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Professional plan for regular donors',
    price_monthly: 499,
    price_yearly: 4999,
    features: ['Unlimited listings', 'Priority visibility', 'Full analytics', 'Featured badges', 'Email support'],
    max_listings: 100,
    max_listings_unlimited: true,
    priority_listing: true,
    analytics_access: true,
    api_access: false,
    bulk_upload: false,
    ai_insights: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Enterprise plan for organizations',
    price_monthly: 1999,
    price_yearly: 19999,
    features: ['Everything in Pro', 'API access', 'Bulk upload', 'AI insights', 'Dedicated support', 'Custom branding'],
    max_listings: 1000,
    max_listings_unlimited: true,
    priority_listing: true,
    analytics_access: true,
    api_access: true,
    bulk_upload: true,
    ai_insights: true,
  },
];

export const subscriptionService = {
  // For initial development without database
  async getPlans() {
    // Try database first, fallback to mock data
    try {
      const { data, error } = await (supabase as any)
        .from('subscription_plans')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      // If no error and has data, return it
      if (!error && data && data.length > 0) {
        return data;
      }
      
      // Otherwise return mock data
      return mockPlans;
    } catch (e) {
      // Return mock data if database not ready
      console.log('Using mock plans (database not ready)');
      return mockPlans;
    }
  },

  async getCurrentSubscription(userId: string) {
    try {
      const { data, error } = await (supabase as any)
        .from('subscriptions')
        .select('*, plan:subscription_plans(*)')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      // If no error and has data, return it
      if (!error && data) {
        return data;
      }
      
      // Return mock free plan as default
      return {
        user_id: userId,
        plan: mockPlans[0],
        status: 'active'
      };
    } catch (e) {
      // Return free plan as default
      return {
        user_id: userId,
        plan: mockPlans[0],
        status: 'active'
      };
    }
  },

  async subscribe(userId: string, planId: string, billingCycle: 'monthly' | 'yearly' = 'monthly') {
    try {
      const { data: plan, error: planError } = await (supabase as any)
        .from('subscription_plans')
        .select('price_monthly, price_yearly')
        .eq('id', planId)
        .single();

      if (planError) throw planError;

      const price = billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly;

      const { data: subscription, error: subError } = await (supabase as any)
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          billing_cycle: billingCycle,
          start_date: new Date().toISOString(),
          end_date: billingCycle === 'yearly' 
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          auto_renew: true,
        })
        .select()
        .single();

      if (subError) throw subError;

      await (supabase as any)
        .from('billing_history')
        .insert({
          user_id: userId,
          subscription_id: subscription.id,
          plan_id: planId,
          amount: price,
          status: 'completed',
          payment_method: 'razorpay',
        });

      return subscription;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  },

  async checkFeatureAccess(userId: string, feature: string): Promise<boolean> {
    const subscription = await this.getCurrentSubscription(userId);
    
    if (!subscription || !subscription.plan) return false;

    const plan = subscription.plan;

    switch (feature) {
      case 'unlimited_listings':
        return plan.max_listings_unlimited || false;
      case 'priority_listing':
        return plan.priority_listing || false;
      case 'analytics':
        return plan.analytics_access || false;
      case 'api_access':
        return plan.api_access || false;
      case 'bulk_upload':
        return plan.bulk_upload || false;
      case 'ai_insights':
        return plan.ai_insights || false;
      default:
        return false;
    }
  },
};

export default subscriptionService;
