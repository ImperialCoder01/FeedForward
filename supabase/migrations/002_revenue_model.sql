-- ===============================================
-- FEED FORWARD REVENUE MODEL - PHASE 1
-- Commission & Subscription Tables
-- ===============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================================
-- COMMISSION MODEL TABLES
-- ===============================================

-- Add commission fields to existing transactions table
ALTER TABLE feedcoin_transactions 
ADD COLUMN IF NOT EXISTS commission_fee DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS platform_fee_percentage DECIMAL(5,2) DEFAULT 7.5,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_gateway TEXT,
ADD COLUMN IF NOT EXISTS payment_id TEXT;

-- Commission history table
CREATE TABLE IF NOT EXISTS commissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  transaction_id UUID REFERENCES feedcoin_transactions(id) ON DELETE SET NULL,
  food_flag_id UUID REFERENCES food_flags(id) ON DELETE SET NULL,
  donor_id UUID REFERENCES auth.users(id),
  recipient_id UUID REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_gateway TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commission settings table
CREATE TABLE IF NOT EXISTS commission_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  default_rate DECIMAL(5,2) DEFAULT 7.5,
  min_rate DECIMAL(5,2) DEFAULT 5.0,
  max_rate DECIMAL(5,2) DEFAULT 10.0,
  charge_donors BOOLEAN DEFAULT TRUE,
  charge_recipients BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default commission settings
INSERT INTO commission_settings (default_rate, min_rate, max_rate, charge_donors, charge_recipients, active)
VALUES (7.5, 5.0, 10.0, TRUE, FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- ===============================================
-- SUBSCRIPTION MODEL TABLES
-- ===============================================

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_yearly DECIMAL(10,2) NOT NULL DEFAULT 0,
  features JSONB DEFAULT '[]',
  max_listings INTEGER DEFAULT 10,
  max_listings_unlimited BOOLEAN DEFAULT FALSE,
  priority_listing BOOLEAN DEFAULT FALSE,
  analytics_access BOOLEAN DEFAULT FALSE,
  api_access BOOLEAN DEFAULT FALSE,
  bulk_upload BOOLEAN DEFAULT FALSE,
  ai_insights BOOLEAN DEFAULT FALSE,
  dedicated_support BOOLEAN DEFAULT FALSE,
  custom_branding BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features, max_listings, max_listings_unlimited, priority_listing, analytics_access, api_access, bulk_upload, ai_insights, dedicated_support, custom_branding, active, sort_order)
VALUES 
  (
    'Free',
    'Basic plan for individual donors',
    0,
    0,
    '["Basic listing", "Community access", "Standard support"]'::JSONB,
    10,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    TRUE,
    1
  ),
  (
    'Pro',
    'Professional plan for regular donors',
    499,
    4999,
    '["Unlimited listings", "Priority visibility", "Full analytics", "Featured badges", "Email support"]'::JSONB,
    100,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    TRUE,
    2
  ),
  (
    'Enterprise',
    'Enterprise plan for organizations',
    1999,
    19999,
    '["Everything in Pro", "API access", "Bulk upload", "AI insights", "Dedicated support", "Custom branding", "White-label"]'::JSONB,
    1000,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    3
  )
ON CONFLICT DO NOTHING;

-- User subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active',
  billing_cycle TEXT DEFAULT 'monthly',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT TRUE,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Billing history
CREATE TABLE IF NOT EXISTS billing_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  plan_id UUID REFERENCES subscription_plans(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_gateway TEXT,
  payment_id TEXT,
  transaction_id TEXT,
  invoice_number TEXT,
  invoice_url TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================================
-- FEATURED LISTINGS / PROMOTIONS
-- ===============================================

-- Add promotion fields to food_flags
ALTER TABLE food_flags 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS is_urgent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS urgent_until TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS boost_level INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS claim_count INTEGER DEFAULT 0;

-- Promotion types
CREATE TABLE IF NOT EXISTS promotion_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  boost_percentage INTEGER DEFAULT 0,
  badge_color TEXT,
  badge_text TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default promotion types
INSERT INTO promotion_types (name, type, price, duration_days, boost_percentage, badge_color, badge_text, active)
VALUES 
  ('Featured', 'featured', 100, 7, 100, 'gold', 'Featured', TRUE),
  ('Urgent', 'urgent', 150, 3, 50, 'red', 'Urgent', TRUE),
  ('Premium Boost', 'boost', 500, 30, 150, 'purple', 'Premium', TRUE),
  ('Quick Boost', 'boost', 200, 7, 75, 'blue', 'Boosted', TRUE)
ON CONFLICT DO NOTHING;

-- Listing promotions history
CREATE TABLE IF NOT EXISTS listing_promotions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  food_flag_id UUID REFERENCES food_flags(id) ON DELETE CASCADE,
  promotion_type_id UUID REFERENCES promotion_types(id),
  user_id UUID REFERENCES auth.users(id),
  price_paid DECIMAL(10,2) NOT NULL,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================================
-- CARBON CREDIT TRACKING
-- ===============================================

-- Add sustainability fields to transactions
ALTER TABLE feedcoin_transactions
ADD COLUMN IF NOT EXISTS co2_saved DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS water_saved DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS waste_prevented DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS meals_count INTEGER DEFAULT 0;

-- User sustainability metrics
CREATE TABLE IF NOT EXISTS sustainability_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_co2_saved DECIMAL(15,2) DEFAULT 0,
  total_meals_saved INTEGER DEFAULT 0,
  total_waste_prevented DECIMAL(15,2) DEFAULT 0,
  total_water_saved DECIMAL(15,2) DEFAULT 0,
  trees_equivalent DECIMAL(15,2) DEFAULT 0,
  impact_score INTEGER DEFAULT 0,
  rank INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Environmental impact calculations (food type multipliers)
CREATE TABLE IF NOT EXISTS food_impact_factors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  food_category TEXT NOT NULL,
  co2_per_kg DECIMAL(10,2) NOT NULL,
  water_per_kg DECIMAL(10,2) NOT NULL,
  waste_factor DECIMAL(5,2) DEFAULT 1.0,
  UNIQUE(food_category)
);

-- Insert default impact factors
INSERT INTO food_impact_factors (food_category, co2_per_kg, water_per_kg, waste_factor)
VALUES 
  ('cooked', 2.5, 50, 1.2),
  ('vegetables', 1.5, 30, 1.0),
  ('fruits', 1.2, 25, 0.9),
  ('grains', 1.0, 20, 0.8),
  ('dairy', 3.0, 100, 1.1),
  ('meat', 5.0, 150, 1.5),
  ('bakery', 0.8, 15, 0.7),
  ('packaged', 0.5, 10, 0.5)
ON CONFLICT DO NOTHING;

-- ===============================================
-- ROW LEVEL SECURITY
-- ===============================================

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotion_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainability_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_impact_factors ENABLE ROW LEVEL SECURITY;

-- Commission policies
CREATE POLICY "Admins can view all commissions" ON commissions FOR SELECT USING (true);
CREATE POLICY "Users can view their own commissions" ON commissions FOR SELECT USING (auth.uid() = donor_id OR auth.uid() = recipient_id);
CREATE POLICY "Service role can manage commissions" ON commissions FOR ALL USING (true);

-- Subscription policies
CREATE POLICY "Anyone can view active plans" ON subscription_plans FOR SELECT USING (active = true);
CREATE POLICY "Service role can manage plans" ON subscription_plans FOR ALL USING (true);

CREATE POLICY "Users can view their own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own billing history" ON billing_history FOR SELECT USING (auth.uid() = user_id);

-- Promotion policies
CREATE POLICY "Anyone can view active promotion types" ON promotion_types FOR SELECT USING (active = true);
CREATE POLICY "Service role can manage promotion types" ON promotion_types FOR ALL USING (true);

CREATE POLICY "Users can view their own promotions" ON listing_promotions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own promotions" ON listing_promotions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sustainability policies
CREATE POLICY "Anyone can view sustainability metrics" ON sustainability_metrics FOR SELECT USING (true);
CREATE POLICY "Users can update their own metrics" ON sustainability_metrics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own metrics" ON sustainability_metrics FOR SELECT USING (auth.uid() = user_id);

-- Impact factors policies
CREATE POLICY "Anyone can view impact factors" ON food_impact_factors FOR SELECT USING (true);
CREATE POLICY "Service role can manage impact factors" ON food_impact_factors FOR ALL USING (true);

-- ===============================================
-- FUNCTIONS & TRIGGERS
-- ===============================================

-- Function to calculate environmental impact
CREATE OR REPLACE FUNCTION calculate_environmental_impact(
  food_category TEXT,
  quantity_kg DECIMAL
)
RETURNS JSONB AS $$
DECLARE
  impact JSONB;
BEGIN
  SELECT jsonb_build_object(
    'co2_saved', COALESCE(co2_per_kg, 1.5) * quantity_kg,
    'water_saved', COALESCE(water_per_kg, 30) * quantity_kg,
    'waste_prevented', COALESCE(waste_factor, 1.0) * quantity_kg
  ) INTO impact
  FROM food_impact_factors
  WHERE food_category = food_category;
  
  RETURN COALESCE(impact, jsonb_build_object(
    'co2_saved', 1.5 * quantity_kg,
    'water_saved', 30 * quantity_kg,
    'waste_prevented', 1.0 * quantity_kg
  ));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user sustainability metrics
CREATE OR REPLACE FUNCTION update_sustainability_metrics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO sustainability_metrics (user_id, total_co2_saved, total_meals_saved, total_waste_prevented, total_water_saved)
  VALUES (
    NEW.user_id,
    NEW.co2_saved,
    NEW.meals_count,
    NEW.waste_prevented,
    NEW.water_saved
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_co2_saved = sustainability_metrics.total_co2_saved + NEW.co2_saved,
    total_meals_saved = sustainability_metrics.total_meals_saved + NEW.meals_count,
    total_waste_prevented = sustainability_metrics.total_waste_prevented + NEW.waste_prevented,
    total_water_saved = sustainability_metrics.total_water_saved + NEW.water_saved,
    trees_equivalent = (sustainability_metrics.total_co2_saved + NEW.co2_saved) / 21.77,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_sustainability_on_transaction
  AFTER INSERT ON feedcoin_transactions
  FOR EACH ROW
  WHEN (NEW.co2_saved > 0 OR NEW.meals_count > 0)
  EXECUTE FUNCTION update_sustainability_metrics();

-- Function to auto-create profile with default subscription
CREATE OR REPLACE FUNCTION handle_new_user_subscription()
RETURNS TRIGGER AS $$
DECLARE
  free_plan_id UUID;
BEGIN
  -- Get the free plan ID
  SELECT id INTO free_plan_id FROM subscription_plans WHERE name = 'Free' LIMIT 1;
  
  -- Create free subscription
  INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date, auto_renew)
  VALUES (NEW.id, free_plan_id, 'active', NOW(), NULL, FALSE);
  
  -- Create sustainability metrics
  INSERT INTO sustainability_metrics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_subscription();

-- Function to calculate commission
CREATE OR REPLACE FUNCTION calculate_commission(
  amount DECIMAL,
  donor_id_param UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  rate DECIMAL;
  charge_donors BOOLEAN;
  commission DECIMAL;
  net DECIMAL;
BEGIN
  SELECT default_rate, charge_donors INTO rate, charge_donors
  FROM commission_settings
  WHERE active = true
  LIMIT 1;
  
  -- If not charging donors, commission is 0
  IF NOT charge_donors OR donor_id_param IS NULL THEN
    RETURN jsonb_build_object(
      'gross_amount', amount,
      'commission_rate', 0,
      'commission_amount', 0,
      'net_amount', amount
    );
  END IF;
  
  commission := ROUND(amount * rate / 100, 2);
  net := amount - commission;
  
  RETURN jsonb_build_object(
    'gross_amount', amount,
    'commission_rate', rate,
    'commission_amount', commission,
    'net_amount', net
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================
-- INITIAL DATA
-- ===============================================

-- Set initial sustainability metrics for existing users
INSERT INTO sustainability_metrics (user_id)
SELECT id FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM sustainability_metrics WHERE sustainability_metrics.user_id = auth.users.id
);

-- ===============================================
-- COMPLETE!
-- ===============================================

SELECT 'Revenue Model Tables Created Successfully!' as status;
