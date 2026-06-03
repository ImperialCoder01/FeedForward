# Authentication Test Guide

## What Was Fixed

✅ **Login Page** - Now properly uses AuthContext
✅ **SignUp Page** - Now properly uses AuthContext  
✅ **AuthContext** - Fixed metadata field names (full_name, user_type)

---

## Quick Test

### Step 1: Clear Browser Data
1. Open browser DevTools (F12)
2. Go to "Application" tab
3. Find "Local Storage" or "Cookies"
4. Clear all data for localhost

### Step 2: Restart the App
```bash
# In your terminal
cd D:\LOQ\Documents\GitHub\Feed-Forward
npm run dev
```

### Step 3: Test Signup
1. Go to http://localhost:5173/signup
2. Fill in:
   - Name: `Test User`
   - Email: `testuser123@gmail.com` (use a real email!)
   - Password: `testpass123`
   - Confirm Password: `testpass123`
   - User Type: Individual
   - Check "I agree to terms"
3. Click "Create Account"

**Expected Result:**
- ✅ Success message
- ✅ Should redirect to home or login
- ✅ No errors in console

### Step 4: Test Login
1. Go to http://localhost:5173/login
2. Use the same email/password
3. Click "Sign in"

**Expected Result:**
- ✅ Success message
- ✅ Redirect to home page
- ✅ User logged in

---

## Common Issues

### Issue: "Sign up failed"

**Check:**
1. Is Email provider enabled in Supabase?
   - Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/auth/providers
   - Make sure Email is enabled

2. Is email already registered?
   - Try a different email

3. Check browser console (F12 → Console)
   - Look for red error messages
   - Share them with me

### Issue: Signup succeeds but login fails

**Cause:** Email confirmation required

**Fix:**
1. Go to Supabase Dashboard
2. Authentication → Providers → Email
3. Uncheck "Confirm email"
4. Try signup again with a new email

### Issue: "No users in database"

**Check:**
1. Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/auth/users
2. See if user appears there
3. If not, signup failed silently

---

## Console Check

Open browser DevTools (F12) and check Console tab for:

### Success Messages:
```
✅ "Successfully signed in!"
✅ User object with id, email, etc.
```

### Error Messages:
```
❌ "Login failed" - Check credentials
❌ "Sign up failed" - Check email/password
❌ "Network error" - Check internet connection
❌ "Auth api error" - Check Supabase config
```

---

## Test Credentials

Try these test accounts:

**Test Account 1:**
- Email: `test1@example.com`
- Password: `testpass123`

**Test Account 2:**
- Email: `donor@example.com`
- Password: `donorpass123`

*(Create these by signing up first)*

---

## Debug Steps

### Step 1: Check Supabase Connection
Open browser console and type:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
```
Should output: `https://czzxoyxdyhrupgdmazpu.supabase.co`

### Step 2: Test Auth Directly
In browser console:
```javascript
const { data, error } = await fetch('https://czzxoyxdyhrupgdmazpu.supabase.co/auth/v1/health');
console.log(data);
```
Should return: `{ "status": "healthy" }`

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Try to signup/login
3. Look for requests to:
   - `https://czzxoyxdyhrupgdmazpu.supabase.co/auth/v1/token?grant_type=password`
   - Status should be 200 for success

---

## Success Indicators

✅ **Sign Up Works If:**
- Form submits without error
- Toast message appears
- User created in Supabase dashboard
- Redirect happens

✅ **Login Works If:**
- Form submits without error
- Toast message appears
- User stays logged in
- Can access protected pages (profile, wallet)

✅ **Auth State Works If:**
- Navbar shows user name/avatar
- Protected routes accessible
- Logout button appears

---

## Still Not Working?

Tell me:

1. **What error message do you see?**
2. **What does the browser console show?** (F12 → Console)
3. **What does the Network tab show?** (F12 → Network)
4. **Does the user appear in Supabase dashboard?**

**I'll help you debug!** 🔍
