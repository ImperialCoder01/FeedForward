import { supabase } from '@/integrations/supabase/client';

export interface Listing {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  food_type: 'veg' | 'non-veg';
  quantity: number;
  unit: string;
  price: number;
  currency: 'INR' | 'feedcoin';
  expiry_date?: string;
  pickup_location?: string;
  pickup_date?: string;
  pickup_time?: string;
  image_url?: string;
  is_featured?: boolean;
  is_urgent?: boolean;
  featured_until?: string;
  urgent_until?: string;
  boost_level?: number;
  status: 'active' | 'claimed' | 'expired' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface ListingStats {
  totalListings: number;
  activeListings: number;
  claimedListings: number;
  totalViews: number;
}

class ListingService {
  async getUserListings(userId: string): Promise<Listing[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('food_flags')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user listings:', error);
      return [];
    }
  }

  async getListingStats(userId: string): Promise<ListingStats> {
    try {
      const { data, error } = await (supabase as any)
        .from('food_flags')
        .select('id, status, view_count')
        .eq('user_id', userId);

      if (error) throw error;

      const listings = data || [];
      return {
        totalListings: listings.length,
        activeListings: listings.filter((l: any) => l.status === 'active').length,
        claimedListings: listings.filter((l: any) => l.status === 'claimed').length,
        totalViews: listings.reduce((sum: number, l: any) => sum + (l.view_count || 0), 0),
      };
    } catch (error) {
      console.error('Error fetching listing stats:', error);
      return {
        totalListings: 0,
        activeListings: 0,
        claimedListings: 0,
        totalViews: 0,
      };
    }
  }

  async createListing(listing: Omit<Listing, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const { data, error } = await (supabase as any)
        .from('food_flags')
        .insert({
          ...listing,
          status: listing.status || 'active',
          view_count: 0,
          claim_count: 0,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, id: data.id };
    } catch (error: any) {
      console.error('Error creating listing:', error);
      return { success: false, error: error.message };
    }
  }

  async updateListing(listingId: string, updates: Partial<Listing>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await (supabase as any)
        .from('food_flags')
        .update(updates)
        .eq('id', listingId);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error updating listing:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteListing(listingId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await (supabase as any)
        .from('food_flags')
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting listing:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllListings(filters?: {
    category?: string;
    foodType?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ listings: Listing[]; total: number }> {
    try {
      let query = (supabase as any)
        .from('food_flags')
        .select('*', { count: 'exact' })
        .eq('status', filters?.status || 'active');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.foodType) {
        query = query.eq('food_type', filters.foodType);
      }

      query = query
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return { listings: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching listings:', error);
      return { listings: [], total: 0 };
    }
  }

  async promoteListing(listingId: string, promotionType: 'featured' | 'urgent' | 'boost'): Promise<{ success: boolean; error?: string }> {
    try {
      const updates: Partial<Listing> = {};

      switch (promotionType) {
        case 'featured':
          updates.is_featured = true;
          updates.featured_until = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'urgent':
          updates.is_urgent = true;
          updates.urgent_until = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'boost':
          updates.boost_level = (updates.boost_level || 0) + 1;
          break;
      }

      const { error } = await (supabase as any)
        .from('food_flags')
        .update(updates)
        .eq('id', listingId);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error promoting listing:', error);
      return { success: false, error: error.message };
    }
  }
}

export const listingService = new ListingService();
export default listingService;
