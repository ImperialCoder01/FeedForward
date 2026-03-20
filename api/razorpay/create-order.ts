import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, planId, billingCycle } = req.body;

    if (!amount || !planId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency: currency || 'INR',
      receipt: `order_${planId}_${Date.now()}`,
      notes: {
        planId,
        billingCycle,
      },
    });

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Razorpay error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to create order'
    });
  }
}
