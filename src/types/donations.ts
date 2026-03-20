
export interface FarmerDonation {
  id: string;
  user_id: string;
  crop_name: string;
  quantity: number;
  unit: string;
  market_price?: number;
  reason?: string;
  location: string;
  status: 'available' | 'in_transit' | 'delivered' | 'expired';
  pickup_date?: string;
  contact_details?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface DonationSponsor {
  id: string;
  name: string;
  type: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface SponsorCommitment {
  id: string;
  donation_id: string;
  sponsor_id: string;
  status: string;
  logistics_details?: {
    pickup_date?: string;
    notes?: string;
    transport_type?: string;
  };
  created_at: string;
  updated_at: string;
}
