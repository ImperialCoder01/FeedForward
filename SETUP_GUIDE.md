# Feed Forward - Complete Setup Guide

A decentralized platform connecting surplus food sources with those in need, powered by blockchain technology and AI.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Feed-Forward.git
cd Feed-Forward
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://czzxoyxdyhrupgdmazpu.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🗄️ Supabase Setup

### Database Tables (Already Created)
- ✅ `food_flags` - Store food donations
- ✅ `claims` - Track claims
- ✅ `notifications` - User notifications
- ✅ `profiles` - Extended user profiles
- ✅ `feedcoin_transactions` - Reward transactions

### Enable Email Auth
1. Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/auth/providers
2. Enable Email/Password authentication

### Create Storage Bucket
1. Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/storage
2. Create bucket: `food-images`
3. Set to Public
4. Add policy:
```sql
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'food-images');
```

---

## 🌐 Wallet Setup (Polygon Amoy Testnet)

### MetaMask Setup
1. Install MetaMask: https://metamask.io/download/
2. Add Polygon Amoy Testnet:
   - Network Name: `Polygon Amoy`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Currency Symbol: `MATIC`
   - Block Explorer: `https://www.oklink.com/amoy`

### Get Test MATIC
1. Visit: https://faucet.polygon.technology/
2. Select "Amoy Testnet"
3. Enter your MetaMask address
4. Receive free test MATIC

---

## 🚀 Deployment to Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Feed-Forward.git
git push -u origin main
```

2. Go to: https://vercel.com
3. Click "Add New Project"
4. Import your GitHub repository
5. Add Environment Variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://czzxoyxdyhrupgdmazpu.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your anon key |
| `VITE_BLOCKCHAIN_RPC_URL` | `https://rpc-amoy.polygon.technology` |
| `VITE_CHAIN_ID` | `80002` |

6. Click "Deploy"

### Option 2: Deploy from CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to configure and deploy.

---

## 📱 Key Features

### Food Donation Flow
1. **Sign Up/Login** - Create account or login
2. **Create FoodFlag** - Post surplus food details
3. **Browse Map** - View available donations
4. **Claim Food** - Request to claim a donation
5. **Earn Rewards** - Get FeedCoins for donations

### Wallet & Rewards
- View FeedCoin balance
- Transaction history
- Earn rewards for donations
- Spend on marketplace perks

### Volunteer System
- Register as volunteer
- Browse nearby tasks
- Track impact metrics

---

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Maps**: Leaflet, OpenStreetMap
- **Blockchain**: Polygon Amoy (Testnet)
- **Web3**: wagmi, viem, RainbowKit
- **State**: React Context, React Query

---

## 📁 Project Structure

```
Feed-Forward/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── integrations/    # Supabase client
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── public/              # Static assets
├── supabase/            # Supabase config
└── Config files         # Vite, Tailwind, ESLint
```

---

## 🎯 API Services

### Food Flags
```typescript
import foodFlagsService from '@/services/foodFlags';

await foodFlagsService.getAll();           // Get all available flags
await foodFlagsService.getById(id);        // Get single flag
await foodFlagsService.create(data, userId); // Create new flag
await foodFlagsService.claim(id, userId);  // Claim a flag
```

### Authentication
```typescript
import authService from '@/services/auth';

await authService.signUp({ email, password, fullName, userType });
await authService.signIn({ email, password });
await authService.signOut();
```

### Rewards
```typescript
import rewardsService from '@/services/rewards';

await rewardsService.getBalance(userId);
await rewardsService.getTransactions(userId);
await rewardsService.addReward({ userId, amount, description, type });
```

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

### "Failed to load food flags"
- Check Supabase database connection
- Verify RLS policies are set correctly
- Check browser console for specific errors

### "MetaMask not connecting"
- Install MetaMask browser extension
- Add Polygon Amoy testnet
- Get test MATIC from faucet

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the community**
