# Feed Forward - Revenue Model Upgrade Plan

## 📋 Project Overview

**Current System:** Zero-Waste Marketplace PWA for food donation
**Goal:** Add comprehensive monetization while maintaining core functionality

---

## 🔄 REVERT POINTS

| Checkpoint | Commit Hash | Description |
|------------|-------------|-------------|
| 1 | (current) | Base system with auth, donations, wallet |
| 2 | TBD | After commission model |
| 3 | TBD | After subscription model |
| 4 | TBD | After featured listings |
| 5 | TBD | After logistics module |
| 6 | TBD | After all features |

---

## 🎯 PHASE 1: COMMISSION MODEL

### 1.1 Database Changes
```sql
-- Add to transactions table
ALTER TABLE transactions ADD COLUMN commission_fee DECIMAL(10,2) DEFAULT 0;
ALTER TABLE transactions ADD COLUMN platform_fee_percentage DECIMAL(5,2) DEFAULT 7.5;
ALTER TABLE transactions ADD COLUMN payment_status TEXT DEFAULT 'pending';
ALTER TABLE transactions ADD COLUMN payment_gateway TEXT;
ALTER TABLE transactions ADD COLUMN payment_id TEXT;
```

### 1.2 API Endpoints
- `POST /api/commissions/calculate` - Calculate fee
- `POST /api/commissions/process` - Process payment
- `GET /api/commissions/history` - Commission history
- `GET /api/commissions/summary` - Dashboard stats

### 1.3 Implementation Steps
1. Add commission fields to database
2. Create commission calculation service
3. Add payment gateway integration (Razorpay)
4. Create commission history page
5. Add to transaction workflow

---

## 💳 PHASE 2: SUBSCRIPTION MODEL

### 2.1 Database Changes
```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  features JSONB,
  max_listings INTEGER DEFAULT 10,
  priority_listing BOOLEAN DEFAULT FALSE,
  analytics_access BOOLEAN DEFAULT FALSE,
  api_access BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE billing_history (
  id UUID PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_id TEXT,
  invoice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 Subscription Plans
| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | 10 listings/month, basic analytics |
| Pro | ₹499/mo | Unlimited listings, priority, full analytics |
| Enterprise | ₹1999/mo | Everything + API access, bulk upload, AI insights |

### 2.3 API Endpoints
- `GET /api/subscriptions/plans` - List plans
- `POST /api/subscriptions/subscribe` - Subscribe to plan
- `POST /api/subscriptions/cancel` - Cancel subscription
- `GET /api/subscriptions/current` - Current subscription
- `GET /api/subscriptions/billing` - Billing history

---

## 🚀 PHASE 3: FEATURED LISTINGS / ADS

### 3.1 Database Changes
```sql
ALTER TABLE food_flags ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE food_flags ADD COLUMN featured_until TIMESTAMPTZ;
ALTER TABLE food_flags ADD COLUMN is_urgent BOOLEAN DEFAULT FALSE;
ALTER TABLE food_flags ADD COLUMN boost_level INTEGER DEFAULT 0;
ALTER TABLE food_flags ADD COLUMN view_count INTEGER DEFAULT 0;

CREATE TABLE listing_promotions (
  id UUID PRIMARY KEY,
  food_flag_id UUID REFERENCES food_flags(id),
  promotion_type TEXT NOT NULL,
  duration_days INTEGER,
  price_paid DECIMAL(10,2),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Promotion Types
| Type | Price | Duration | Effect |
|------|-------|----------|--------|
| Featured | ₹100 | 7 days | Top of list |
| Urgent | ₹150 | 3 days | Red "Urgent" tag |
| Boost | ₹500 | 30 days | +50% visibility |

### 3.3 API Endpoints
- `POST /api/promotions/promote` - Promote listing
- `GET /api/promotions/options` - Get promotion types
- `POST /api/promotions/process` - Process payment
- `GET /api/promotions/history` - Promotion history

---

## 🤝 PHASE 4: CSR FUNDING MODULE

### 4.1 Database Changes
```sql
CREATE TABLE csr_partners (
  id UUID PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  total_donated DECIMAL(15,2) DEFAULT 0,
  meals_funded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE csr_donations (
  id UUID PRIMARY KEY,
  partner_id UUID REFERENCES csr_partners(id),
  amount DECIMAL(10,2) NOT NULL,
  purpose TEXT,
  meals_count INTEGER,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 CSR Dashboard Features
- Impact metrics dashboard
- Meals saved counter
- Waste reduced tracker
- Exportable reports (PDF/CSV)
- Partner management

### 4.3 API Endpoints
- `GET /api/csr/dashboard` - Impact metrics
- `GET /api/csr/partners` - List partners
- `POST /api/csr/partners` - Add partner
- `GET /api/csr/reports` - Generate reports
- `GET /api/csr/export` - Export data

---

## 🚚 PHASE 5: LOGISTICS MODULE

### 5.1 Database Changes
```sql
CREATE TABLE logistics_services (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  estimated_time TEXT,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE pickup_orders (
  id UUID PRIMARY KEY,
  food_flag_id UUID REFERENCES food_flags(id),
  logistics_service_id UUID REFERENCES logistics_services(id),
  pickup_address TEXT,
  pickup_time TIMESTAMPTZ,
  delivery_address TEXT,
  status TEXT DEFAULT 'pending',
  tracking_id TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Logistics Options
| Service | Price | ETA |
|---------|-------|-----|
| Standard Pickup | ₹50 | 2-4 hours |
| Express Pickup | ₹150 | 30-60 mins |
| Same Day Delivery | ₹300 | 4-6 hours |

### 5.3 API Endpoints
- `GET /api/logistics/services` - List services
- `POST /api/logistics/quote` - Get quote
- `POST /api/logistics/book` - Book pickup
- `GET /api/logistics/track/:id` - Track order

---

## 📊 PHASE 6: DATA MONETIZATION

### 6.1 Analytics Dashboard
- Food waste trends
- Demand hotspots (geographic)
- Peak donation times
- Popular food categories
- NGO distribution maps

### 6.2 Report Types
- Daily/Weekly/Monthly summaries
- CSV export
- PDF reports
- Custom date ranges

### 6.3 API Endpoints
- `GET /api/analytics/trends` - Waste trends
- `GET /api/analytics/hotspots` - Demand hotspots
- `GET /api/analytics/reports` - Generate reports
- `GET /api/analytics/export` - Export data

---

## 💰 PHASE 7: DONATION SYSTEM

### 7.1 Database Changes
```sql
CREATE TABLE money_donations (
  id UUID PRIMARY KEY,
  donor_id UUID REFERENCES users(id),
  recipient_ngo_id UUID,
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2),
  net_amount DECIMAL(10,2),
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 Donation Flow
1. User selects NGO
2. Enters amount
3. Adds optional dedication
4. Pays via gateway
5. Platform takes 2-5% fee
6. NGO receives funds

### 7.3 API Endpoints
- `GET /api/donations/ngos` - List NGOs
- `POST /api/donations/donate` - Make donation
- `GET /api/donations/history` - Donation history
- `GET /api/donations/receipt/:id` - Donation receipt

---

## 🌱 PHASE 8: CARBON CREDIT TRACKING

### 8.1 Database Changes
```sql
ALTER TABLE transactions ADD COLUMN co2_saved DECIMAL(10,2) DEFAULT 0;
ALTER TABLE transactions ADD COLUMN water_saved DECIMAL(10,2) DEFAULT 0;
ALTER TABLE transactions ADD COLUMN waste_prevented DECIMAL(10,2) DEFAULT 0;

CREATE TABLE sustainability_metrics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_co2_saved DECIMAL(15,2) DEFAULT 0,
  total_meals_saved INTEGER DEFAULT 0,
  total_waste_prevented DECIMAL(15,2) DEFAULT 0,
  trees_equivalent INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 Environmental Impact Calculator
| Food Type | CO₂ Saved/kg | Water Saved/kg |
|-----------|--------------|----------------|
| Cooked Meals | 2.5 kg | 50 liters |
| Vegetables | 1.5 kg | 30 liters |
| Grains | 1.0 kg | 20 liters |
| Dairy | 3.0 kg | 100 liters |

### 8.3 API Endpoints
- `GET /api/carbon/summary` - User's impact
- `GET /api/carbon/global` - Platform impact
- `GET /api/carbon/certificate` - Generate certificate

---

## 🤖 PHASE 9: AI FEATURES (BONUS)

### 9.1 Surplus Forecast AI
- Analyze past donation patterns
- Predict surplus based on:
  - Day of week
  - Seasonality
  - Events
  - Location

### 9.2 AI Insights
- Optimal pickup times
- Demand forecasting
- Waste prevention tips
- Community engagement scores

### 9.3 API Endpoints
- `GET /api/ai/forecast` - Get surplus forecast
- `GET /api/ai/insights` - Get AI insights
- `POST /api/ai/recommend` - Get recommendations

---

## 🏗️ SYSTEM ARCHITECTURE

### Frontend (React + TypeScript)
```
src/
├── pages/
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── RevenueReport.tsx
│   │   ├── UserManagement.tsx
│   │   └── Analytics.tsx
│   ├── subscription/
│   │   ├── PlansPage.tsx
│   │   ├── SubscribePage.tsx
│   │   └── BillingHistory.tsx
│   ├── logistics/
│   │   ├── BookPickup.tsx
│   │   └── TrackOrder.tsx
│   └── donations/
│       ├── DonateMoney.tsx
│       └── NGOList.tsx
├── components/
│   ├── subscription/
│   │   ├── PlanCard.tsx
│   │   └── UpgradeModal.tsx
│   ├── promotions/
│   │   ├── PromoteButton.tsx
│   │   └── PromotionBadge.tsx
│   └── payment/
│       ├── PaymentGateway.tsx
│       └── Invoice.tsx
├── services/
│   ├── payments/
│   │   ├── razorpay.ts
│   │   └── stripe.ts
│   ├── subscriptions.ts
│   ├── commissions.ts
│   ├── analytics.ts
│   └── logistics.ts
└── contexts/
    ├── SubscriptionContext.tsx
    └── PaymentContext.tsx
```

### Backend (Supabase Edge Functions)
```
supabase/
├── functions/
│   ├── calculate-commission/
│   ├── process-payment/
│   ├── subscription-manager/
│   ├── analytics-generator/
│   └── ai-insights/
└── migrations/
    └── revenue_tables.sql
```

---

## 🔐 SECURITY CONSIDERATIONS

1. **Payment Security**
   - Use HTTPS for all payment endpoints
   - Never store card details
   - Use PCI-compliant payment gateway
   - Implement 2FA for large transactions

2. **Data Protection**
   - Encrypt sensitive data at rest
   - Implement GDPR compliance
   - Regular security audits
   - Rate limiting on API endpoints

3. **Access Control**
   - Role-based permissions
   - Admin dashboard protection
   - API key rotation
   - Audit logging

---

## 📈 SCALABILITY CONSIDERATIONS

1. **Database**
   - Use read replicas for analytics
   - Implement caching (Redis)
   - Partition large tables
   - Regular cleanup of old data

2. **API**
   - Load balancing
   - CDN for static content
   - Rate limiting
   - API versioning

3. **Infrastructure**
   - Container orchestration (Docker/K8s)
   - Auto-scaling
   - Multi-region deployment
   - Backup & disaster recovery

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1 (Hackathon MVP)
1. ✅ Commission model (basic)
2. ✅ Subscription model (Free/Pro)
3. ✅ Featured listings (basic)

### Phase 2 (Production Ready)
4. Logistics module
5. CSR dashboard
6. Analytics

### Phase 3 (Scale)
7. Money donations
8. Carbon credits
9. AI features

---

## 💡 QUICK WINS

For immediate impact:

1. **Add commission to existing flow** - 1 day
2. **Create subscription plans** - 2 days
3. **Add featured listing badges** - 1 day
4. **Build simple analytics** - 2 days
5. **Add logistics options** - 3 days

**Total MVP: ~9 days**

---

## 📞 NEXT STEPS

1. ✅ Review this plan
2. Start Phase 1 implementation
3. Test thoroughly
4. Deploy incrementally
5. Gather feedback
6. Iterate

---

**Let's build this revenue model step by step! 🚀**
