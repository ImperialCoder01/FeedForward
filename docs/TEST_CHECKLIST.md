# Quick Verification Checklist

Use this checklist to test that everything is working properly.

---

## ✅ Pre-Flight Check

Before testing, verify:

- [ ] `.env` file exists in project root
- [ ] Supabase database tables are created (SQL ran successfully)
- [ ] Email auth is enabled in Supabase
- [ ] `npm install` completed without errors

---

## 🧪 Test 1: Sign Up (2 min)

**Steps:**
1. Go to http://localhost:5173/signup
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `testpass123`
   - User Type: `Individual`
   - Check "I agree to terms"
3. Click "Create Account"

**Expected Result:**
- ✅ Success message appears
- ✅ Redirected to home page
- ✅ No console errors

**If Error:**
- Check Supabase auth settings
- Check browser console

---

## 🧪 Test 2: Login (1 min)

**Steps:**
1. Go to http://localhost:5173/login
2. Enter credentials from Test 1
3. Click "Sign in"

**Expected Result:**
- ✅ Success message appears
- ✅ User is logged in
- ✅ Navigation updates

**If Error:**
- Verify email auth is enabled
- Check credentials

---

## 🧪 Test 3: Create FoodFlag (3 min)

**Steps:**
1. Click "Donate Food" in sidebar
2. Fill form:
   - Donor Type: `Individual`
   - Contact Name: `Test Donor`
   - Phone: `9876543210`
   - Food Title: `Test Donation`
   - Description: `This is a test food donation for verification`
   - Food Type: Select "Cooked"
   - Quantity: `5`
   - Unit: `kg`
   - Best Before: Pick a future date
   - Pickup Address: `Test Location, Mumbai`
   - Check "I agree to terms"
   - Check "I accept liability waiver"
3. Click "Create FoodFlag"

**Expected Result:**
- ✅ Success message appears
- ✅ FeedCoins awarded (if rewards enabled)
- ✅ Redirected to home
- ✅ Food flag appears in database

**If Error:**
- Check browser console
- Verify all required fields filled

---

## 🧪 Test 4: View on Map (2 min)

**Steps:**
1. Go to http://localhost:5173/map
2. Wait for map to load

**Expected Result:**
- ✅ Map displays
- ✅ Food flags show (if any exist)
- ✅ Can switch between Map/List view
- ✅ Filters work

**If Error:**
- Check if food flags exist
- Check browser console

---

## 🧪 Test 5: Check Wallet (2 min)

**Steps:**
1. Click "Wallet" in sidebar
2. View balance and transactions

**Expected Result:**
- ✅ Balance displays
- ✅ Transaction history shows
- ✅ Data matches database

**If Error:**
- Check rewards service
- Verify Supabase connection

---

## 🧪 Test 6: MetaMask Wallet (Optional - 5 min)

**Steps:**
1. Install MetaMask browser extension
2. Create or import wallet
3. Go to Wallet page
4. Click "Connect Wallet" button

**Expected Result:**
- ✅ MetaMask opens
- ✅ Connection successful
- ✅ Wallet address displays

**If Error:**
- MetaMask not installed
- Network not configured

---

## 📊 Database Verification

Check your Supabase database:

1. Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/editor

2. Check `profiles` table:
   - Should have user record
   - Should have `feedcoin_balance`

3. Check `food_flags` table:
   - Should have donation records
   - Should have status

4. Check `feedcoin_transactions` table:
   - Should have reward transactions

---

## 🚀 Deployment Test

### Test Deployment Ready:
```bash
npm run build
```

**Expected Result:**
- ✅ Build completes without errors
- ✅ `dist/` folder created

**If Error:**
- Check all imports
- Check TypeScript errors
- Run `npm run lint`

---

## 🎯 Success Criteria

Everything is working if:
- [ ] Can sign up and login
- [ ] Can create food flag
- [ ] Food flag appears in database
- [ ] Can view on map
- [ ] Wallet shows balance
- [ ] Build succeeds

---

## 🆘 If Something Breaks

### Error: "Cannot read property..."
- Missing imports
- Run `npm install`

### Error: "Supabase connection failed"
- Check `.env` file
- Verify Supabase URL and key

### Error: "Type error..."
- Check TypeScript types
- Verify service returns correct types

### Error: "Auth failed"
- Check Supabase auth settings
- Verify email/password enabled

---

## 📝 Test Results

Record your test results:

| Test | Status | Notes |
|------|--------|-------|
| Sign Up | ✅/❌ | |
| Login | ✅/❌ | |
| Create FoodFlag | ✅/❌ | |
| View on Map | ✅/❌ | |
| Check Wallet | ✅/❌ | |
| MetaMask (optional) | ✅/❌ | |
| Build | ✅/❌ | |

---

## 🎉 All Tests Passed?

Congratulations! Your app is ready for:
- Testing with friends
- Deploy to Vercel
- Show to others!

---

## 🚀 Ready for Deployment?

See `SETUP_GUIDE.md` for deployment instructions.
