import { supabase } from '@/integrations/supabase/client';

export interface CommissionConfig {
  platformFeePercent: number;
  charityPercent: number;
  creatorPercent: number;
}

export interface DonationTransaction {
  id: string;
  donor_id: string;
  recipient_id: string;
  amount: number;
  food_type: string;
  quantity: number;
  status: string;
}

export interface CommissionRecord {
  id: string;
  transaction_id: string;
  donor_id: string;
  recipient_id: string;
  amount: number;
  commission_rate: number;
  commission_amount: number;
  net_amount: number;
  status: string;
  created_at: string;
}

export const commissionConfig: CommissionConfig = {
  platformFeePercent: 7.5,
  charityPercent: 2.5,
  creatorPercent: 90,
};

class CommissionService {
  calculateCommission(amount: number): {
    platformFee: number;
    charityShare: number;
    creatorAmount: number;
  } {
    const platformFee = (amount * commissionConfig.platformFeePercent) / 100;
    const charityShare = (amount * commissionConfig.charityPercent) / 100;
    const creatorAmount = amount - platformFee;

    return {
      platformFee: Math.round(platformFee * 100) / 100,
      charityShare: Math.round(charityShare * 100) / 100,
      creatorAmount: Math.round(creatorAmount * 100) / 100,
    };
  }

  async recordCommission(
    transactionId: string,
    donorId: string,
    recipientId: string,
    amount: number
  ): Promise<CommissionRecord | null> {
    try {
      const { platformFee } = this.calculateCommission(amount);

      const { data, error } = await (supabase as any)
        .from('commissions')
        .insert({
          transaction_id: transactionId,
          donor_id: donorId,
          recipient_id: recipientId,
          amount,
          commission_rate: commissionConfig.platformFeePercent,
          commission_amount: platformFee,
          net_amount: amount - platformFee,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error recording commission:', error);
      return null;
    }
  }

  async updateCommissionStatus(
    commissionId: string,
    status: 'pending' | 'completed' | 'failed'
  ): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('commissions')
        .update({ status })
        .eq('id', commissionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating commission status:', error);
      return false;
    }
  }

  async getCommissionsByUser(userId: string): Promise<CommissionRecord[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('commissions')
        .select('*')
        .or(`donor_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching commissions:', error);
      return [];
    }
  }

  async getPlatformRevenue(startDate?: string, endDate?: string): Promise<{
    totalRevenue: number;
    totalCharity: number;
    transactionCount: number;
  }> {
    try {
      let query = (supabase as any).from('commissions').select('commission_amount');

      if (startDate) {
        query = query.gte('created_at', startDate);
      }
      if (endDate) {
        query = query.lte('created_at', endDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      const totalRevenue = data?.reduce((sum: number, c: any) => sum + c.commission_amount, 0) || 0;

      return {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalCharity: Math.round((totalRevenue * 0.33) * 100) / 100,
        transactionCount: data?.length || 0,
      };
    } catch (error) {
      console.error('Error calculating platform revenue:', error);
      return { totalRevenue: 0, totalCharity: 0, transactionCount: 0 };
    }
  }

  async processTransactionCommission(
    transaction: DonationTransaction
  ): Promise<{ success: boolean; commissionId?: string; error?: string }> {
    try {
      if (transaction.amount <= 0) {
        return { success: true };
      }

      const commission = await this.recordCommission(
        transaction.id,
        transaction.donor_id,
        transaction.recipient_id,
        transaction.amount
      );

      if (!commission) {
        return { success: false, error: 'Failed to record commission' };
      }

      return { success: true, commissionId: commission.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const commissionService = new CommissionService();
export default commissionService;
