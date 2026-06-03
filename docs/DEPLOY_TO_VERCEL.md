# Vercel Deployment Guide

## Prerequisites
1. A Vercel account (sign up at https://vercel.com)
2. Your GitHub repository connected to Vercel
3. Razorpay account (for payment integration)

## Step 1: Configure Environment Variables

In your Vercel dashboard:

1. Go to **Settings** > **Environment Variables**
2. Add the following variables:

| Name | Value | Notes |
|------|-------|-------|
| `supabase_url` | `https://czzxoyxdyhrupgdmazpu.supabase.co` | From Supabase dashboard |
| `supabase_anon_key` | Your Supabase anon key | From Supabase dashboard |
| `razorpay_key_id` | Your Razorpay Key ID | From Razorpay dashboard |
| `razorpay_key_secret` | Your Razorpay Key Secret | From Razorpay dashboard (mark as secret) |

## Step 2: Deploy

### Option A: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework: **Vite** (or select "Other")
   - Root Directory: `.` (default)
   - Build Command: `npm run build`
4. Add environment variables from Step 1
5. Click **Deploy**

### Option B: Deploy via CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Domain (Optional)

1. In Vercel dashboard, go to **Settings** > **Domains**
2. Add your custom domain
3. Update DNS records as instructed

## Step 4: Update Supabase Auth Redirect URLs

For authentication to work in production:

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **URL Configuration**
3. Add your production URL:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: Add your production URL + `https://your-domain.vercel.app/auth/callback`

## Step 5: Update CORS Settings

In Supabase Dashboard:
1. Go to **Authentication** > **URL Configuration**
2. Add your production domain to allowed URLs

## Testing Your Deployment

1. Visit your Vercel URL
2. Test authentication (login/signup)
3. Test donation flow
4. Test payment flow (if Razorpay configured)
5. Test Analytics dashboard

## Troubleshooting

### Authentication Issues
- Verify Supabase redirect URLs are configured
- Check browser console for CORS errors
- Ensure environment variables are set correctly

### Payment Issues
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure HTTPS is used in production

### Build Failures
- Check TypeScript errors: `npm run build`
- Verify all dependencies are installed
- Check vercel.json configuration

## CI/CD

Vercel automatically deploys on every push to your connected GitHub repository.

To control deployments:
- Use branch prefixes: `feature/`, `fix/` deploy to preview
- Merge to `main` triggers production deployment

## Monitoring

- View deployment logs in Vercel dashboard
- Enable Vercel Analytics for performance tracking
- Set up Slack notifications for deployments

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Razorpay Docs: https://razorpay.com/docs
