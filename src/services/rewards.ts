import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Transaction = Database['public']['Tables']['feedcoin_transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['feedcoin_transactions']['Insert'];

export interface RewardData {
  userId: string;
  amount: number;
  description: string;
  type: 'earned' | 'reward' | 'received';
  referenceId?: string;
}

export const rewardsService = {
  async getBalance(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('profiles')
      .select('feedcoin_balance')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.feedcoin_balance || 0;
  },

  async getTransactions(userId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('feedcoin_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addReward({ userId, amount, description, type, referenceId }: RewardData): Promise<Transaction> {
    const { data: transaction, error: txError } = await supabase
      .from('feedcoin_transactions')
      .insert({
        user_id: userId,
        amount,
        description,
        type,
        reference_id: referenceId,
        status: 'completed'
      })
      .select()
      .single();

    if (txError) throw txError;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('feedcoin_balance')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    const newBalance = (profile?.feedcoin_balance || 0) + amount;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ feedcoin_balance: newBalance })
      .eq('id', userId);

    if (updateError) throw updateError;

    return transaction;
  },

  async spendReward(userId: string, amount: number, description: string): Promise<Transaction> {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('feedcoin_balance')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    const currentBalance = profile?.feedcoin_balance || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }

    const { data: transaction, error: txError } = await supabase
      .from('feedcoin_transactions')
      .insert({
        user_id: userId,
        amount: -amount,
        description,
        type: 'spent',
        status: 'completed'
      })
      .select()
      .single();

    if (txError) throw txError;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ feedcoin_balance: currentBalance - amount })
      .eq('id', userId);

    if (updateError) throw updateError;

    return transaction;
  },

  async updateProfileStats(userId: string, stats: { total_donations?: number; total_meals_donated?: number }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(stats)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  calculateRewardAmount(foodType: string, quantity: string): number {
    const baseReward = 10;
    const quantityMultiplier = parseFloat(quantity) || 1;
    let typeBonus = 0;

    switch (foodType) {
      case 'cooked':
      case 'cooked meals':
        typeBonus = 20;
        break;
      case 'perishable':
        typeBonus = 15;
        break;
      case 'packaged':
        typeBonus = 5;
        break;
      default:
        typeBonus = 10;
    }

    return baseReward + typeBonus + (quantityMultiplier * 2);
  }
};

export default rewardsService;
