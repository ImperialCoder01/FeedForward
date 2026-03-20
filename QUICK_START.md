# 🚀 QUICK START GUIDE - Feed Forward

## 30-Second Summary

Your Feed Forward app is now fully configured with:
- ✅ Supabase database (connected)
- ✅ User authentication
- ✅ Food donation system
- ✅ FeedCoin rewards
- ✅ Polygon Amoy wallet (testnet)
- ✅ Ready for deployment

---

## ⚡ Start Now (3 Steps)

### Step 1: Install & Run

Open terminal in project folder:

```bash
npm install
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Step 2: Open Browser

Go to: http://localhost:5173

### Step 3: Test It!

1. **Sign Up** → Create account
2. **Donate Food** → Post a donation
3. **View Map** → See your donation
4. **Check Wallet** → See FeedCoins earned!

---

## 🎯 What Works Now

### ✅ Ready to Use
- User signup/login
- Create food donations
- View on interactive map
- FeedCoin rewards system
- Transaction history
- User profiles

### 🔧 Needs Testing
- MetaMask wallet connection
- Image uploads
- Real-time notifications
- Deploy to Vercel

---

## 📱 Try These Features

### 1. Create a Food Donation (2 min)
```
1. Sign up / Login
2. Click "Donate Food" in sidebar
3. Fill form (keep it simple)
4. Submit
5. Check wallet for FeedCoins!
```

### 2. Explore the Map (1 min)
```
1. Click "Food Map" in sidebar
2. See available donations
3. Switch between Map/List view
4. Try filters
```

### 3. Check Your Wallet (1 min)
```
1. Click "Wallet" in sidebar
2. View FeedCoin balance
3. See transaction history
4. Learn how to earn more!
```

---

## 🌐 Connect MetaMask (Optional)

Want to try real blockchain?

### Install MetaMask
1. Go to: https://metamask.io/download/
2. Install browser extension
3. Create wallet

### Add Polygon Amoy Testnet
1. Open MetaMask
2. Click Networks → Add Network
3. Fill in:
   - Name: `Polygon Amoy`
   - RPC: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Symbol: `MATIC`

### Get Free Test MATIC
1. Go to: https://faucet.polygon.technology/
2. Select "Amoy Testnet"
3. Paste your MetaMask address
4. Receive 0.1 MATIC (free!)

---

## 🚀 Deploy to Vercel (10 min)

Want your app live on the internet?

### Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Deploy on Vercel
1. Go to: https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo
4. Add these Environment Variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://czzxoyxdyhrupgdmazpu.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (your anon key) |

5. Click "Deploy"

Your app will be live at: `your-project.vercel.app`

---

## 🐛 Troubleshooting

### "App won't start"
```bash
# Fix: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Login not working"
1. Check Supabase auth is enabled
2. Verify email/password provider

### "Database errors"
1. Check `.env` file exists
2. Verify Supabase URL and key
3. Check Supabase dashboard for issues

### "Build fails"
```bash
# Fix: Clear cache and rebuild
npm run build
```

---

## 📚 More Information

### Full Setup Guide
See `SETUP_GUIDE.md` for detailed instructions

### Test Checklist
See `TEST_CHECKLIST.md` for verification steps

### Implementation Summary
See `IMPLEMENTATION_SUMMARY.md` for what was built

---

## 🎉 You're All Set!

Your app is ready to use. Start the dev server and test it out!

```bash
npm run dev
```

**Have questions?** Check the guides or ask for help! 🚀

---

## Quick Links

- **Local App**: http://localhost:5173
- **Supabase Dashboard**: https://czzxoyxdyhrupgdmazpu.supabase.co
- **MetaMask**: https://metamask.io/download/
- **Polygon Faucet**: https://faucet.polygon.technology/
- **Vercel**: https://vercel.com

---

**Happy coding!** 🎊
