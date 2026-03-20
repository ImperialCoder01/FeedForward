import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type FoodFlag = Database['public']['Tables']['food_flags']['Row'];
type FoodFlagInsert = Database['public']['Tables']['food_flags']['Insert'];
type FoodFlagUpdate = Database['public']['Tables']['food_flags']['Update'];

export interface CreateFoodFlagData {
  donor_type: string;
  organization_name?: string;
  contact_person_name: string;
  contact_number: string;
  email?: string;
  title: string;
  description?: string;
  food_type: string[];
  quantity: string;
  unit: string;
  servings?: string;
  dietary_tags?: string[];
  prepared_datetime?: string;
  best_before: string;
  pickup_address: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  pickup_time_window?: string;
  logistics_support?: boolean;
  is_hygienically_packed?: string;
  packaging_type?: string[];
  serving_instructions?: string;
  images?: string[];
}

export const foodFlagsService = {
  async getAll(): Promise<FoodFlag[]> {
    const { data, error } = await supabase
      .from('food_flags')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<FoodFlag | null> {
    const { data, error } = await supabase
      .from('food_flags')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByUser(userId: string): Promise<FoodFlag[]> {
    const { data, error } = await supabase
      .from('food_flags')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(foodFlagData: CreateFoodFlagData, userId: string): Promise<FoodFlag> {
    const { data, error } = await supabase
      .from('food_flags')
      .insert({
        ...foodFlagData,
        user_id: userId,
        status: 'available'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: FoodFlagUpdate): Promise<FoodFlag> {
    const { data, error } = await supabase
      .from('food_flags')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async claim(id: string, userId: string): Promise<FoodFlag> {
    const { data, error } = await supabase
      .from('food_flags')
      .update({
        status: 'claimed',
        claimed_by: userId
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async complete(id: string): Promise<FoodFlag> {
    const { data, error } = await supabase
      .from('food_flags')
      .update({ status: 'completed' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('food_flags')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImages(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('food-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('food-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    });

    return Promise.all(uploadPromises);
  }
};

export default foodFlagsService;
