# Supabase Connection Guide - Feed Forward

## Your Supabase Project Details

**Project URL:** https://czzxoyxdyhrupgdmazpu.supabase.co

**Project ID:** czzxoyxdyhrupgdmazpu

---

## Connection Strings

### Public API (Frontend)
```
URL: https://czzxoyxdyhrupgdmazpu.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6enhveXhkeWhydXBnZG1henB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTA0NDMsImV4cCI6MjA4OTU2NjQ0M30.Rqusfm10PNX3ldiQLcWgsGK68MLHQp08O5vhg4Q2UyE
```

### Database Connection
```
Host: db.czzxoyxdyhrupgdmazpu.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: [Your database password]
```

---

## How to Find Your API Keys

1. Go to: https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/settings/api

2. Look for these sections:
   - **Project API keys** (for public/anon key)
   - **Reveal `service_role` key** (for admin operations - keep secret!)

---

## Environment Variables Setup

Your `.env` file should have:

```env
VITE_SUPABASE_URL=https://czzxoyxdyhrupgdmazpu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6enhveXhkeWhydXBnZG1henB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTA0NDMsImV4cCI6MjA4OTU2NjQ0M30.Rqusfm10PNX3ldiQLcWgsGK68MLHQp08O5vhg4Q2UyE
```

---

## Database Tables (Already Created)

Your project already has these tables:

### 1. `food_flags`
Stores food donations
```sql
-- Main columns:
- id (UUID)
- user_id (UUID) - references auth.users
- title (TEXT)
- description (TEXT)
- food_type (TEXT[])
- quantity (TEXT)
- unit (TEXT)
- best_before (TIMESTAMPTZ)
- pickup_address (TEXT)
- status (TEXT) - 'available', 'claimed', 'completed'
- created_at (TIMESTAMPTZ)
```

### 2. `profiles`
Extended user profiles
```sql
-- Main columns:
- id (UUID) - references auth.users
- full_name (TEXT)
- avatar_url (TEXT)
- bio (TEXT)
- location (TEXT)
- feedcoin_balance (INTEGER)
- total_donations (INTEGER)
- total_meals_donated (INTEGER)
```

### 3. `feedcoin_transactions`
Reward transaction history
```sql
-- Main columns:
- id (UUID)
- user_id (UUID)
- type (TEXT) - 'earned', 'spent', 'received', 'reward'
- amount (INTEGER)
- description (TEXT)
- status (TEXT)
- created_at (TIMESTAMPTZ)
```

### 4. `notifications`
User notifications
```sql
-- Main columns:
- id (UUID)
- user_id (UUID)
- title (TEXT)
- message (TEXT)
- type (TEXT) - 'info', 'success', 'warning', 'error'
- is_read (BOOLEAN)
- created_at (TIMESTAMPTZ)
```

### 5. `claims`
Food claim tracking
```sql
-- Main columns:
- id (UUID)
- food_flag_id (UUID)
- user_id (UUID)
- status (TEXT)
- pickup_time (TIMESTAMPTZ)
- rating (INTEGER)
- created_at (TIMESTAMPTZ)
```

---

## Row Level Security (RLS)

All tables have RLS enabled for security:

- **Food Flags**: Public can view, authenticated can create/edit own
- **Profiles**: Public can view, users can edit own
- **Notifications**: Users can only see/edit own
- **Transactions**: Users can only see/edit own
- **Claims**: Users can only manage own

---

## Testing Your Connection

### Test 1: Sign Up
1. Go to your app
2. Click "Sign Up"
3. Create an account
4. Check Supabase Dashboard → Authentication → Users

**Success:** User appears in the list

### Test 2: Create Food Flag
1. Login to your app
2. Go to "Donate Food"
3. Fill form and submit
4. Check Supabase Dashboard → Table Editor → food_flags

**Success:** New record appears

### Test 3: Check Profile
1. After signup, check Supabase Dashboard → Table Editor → profiles

**Success:** Profile created automatically (trigger)

---

## Troubleshooting

### "Connection failed"
- Check if `.env` file exists
- Verify Supabase URL is correct: `https://czzxoyxdyhrupgdmazpu.supabase.co`
- Make sure ANON_KEY is set

### "Permission denied"
- Check RLS policies in Supabase
- Make sure user is authenticated
- Verify policies allow the operation

### "Table not found"
- Go to Supabase Dashboard → SQL Editor
- Run: `SELECT * FROM food_flags LIMIT 1;`
- If error, tables weren't created

### "Invalid API key"
- Go to Settings → API
- Copy ANON_KEY again
- Update `.env` file

---

## Supabase CLI (Optional)

If you want to use Supabase CLI locally:

### Install
```bash
npm install -g supabase
```

### Login
```bash
supabase login
```

### Link to Project
```bash
cd supabase
supabase link --project-ref czzxoyxdyhrupgdmazpu
```

### Pull Schema
```bash
supabase db pull
```

---

## Dashboard Access

**Supabase Dashboard:** https://czzxoyxdyhrupgdmazpu.supabase.co

### Quick Links
- **Table Editor:** https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/editor
- **Authentication:** https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/auth/users
- **Storage:** https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/storage
- **SQL Editor:** https://czzxoyxdyhrupgdmazpu.supabase.co/project/default/sql

---

## Need Help?

### Common Issues

**1. Can't login after signup**
- Check if email verification is required
- Go to: Settings → Authentication → Providers → Email
- Disable "Confirm email" for testing

**2. Upload not working**
- Create `food-images` bucket in Storage
- Make bucket public
- Add storage policies

**3. RLS blocking operations**
- Temporarily disable RLS for testing:
  ```sql
  ALTER TABLE food_flags DISABLE ROW LEVEL SECURITY;
  ```
- Re-enable after testing:
  ```sql
  ALTER TABLE food_flags ENABLE ROW LEVEL SECURITY;
  ```

---

## Production Checklist

Before going live:

- [ ] Enable email verification
- [ ] Set up proper RLS policies
- [ ] Configure storage policies
- [ ] Set up environment variables in Vercel
- [ ] Test all user flows
- [ ] Enable rate limiting
- [ ] Set up monitoring

---

## Resources

- **Supabase Docs:** https://supabase.com/docs
- **Auth Docs:** https://supabase.com/docs/guides/auth
- **Database Docs:** https://supabase.com/docs/guides/database
- **Storage Docs:** https://supabase.com/docs/guides/storage
- **RLS Docs:** https://supabase.com/docs/guides/auth/row-level-security

---

**Your Supabase project is ready!** 🚀
