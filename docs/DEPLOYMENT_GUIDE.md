# Feed Forward - Deployment Guide

## Prerequisites
- Git installed on your computer
- GitHub account
- Vercel account
- Supabase account (already configured)
- Razorpay account (optional, for payments)

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Fill in details:
   - **Repository name:** `feed-forward`
   - **Description:** Food donation marketplace with subscription plans
   - **Visibility:** Public (or Private)
   - ✅ **DO NOT** initialize with README (we already have files)
4. Click **Create repository**

### Step 2: Initialize Git & Push Code

Open terminal/command prompt in your project folder:

```bash
# Navigate to project folder
cd D:\LOQ\Documents\GitHub\Feed-Forward

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Feed Forward - Food Donation Platform"

# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/feed-forward.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Verify Push

1. Go to your GitHub repository
2. You should see all your project files
3. Green checkmark ✅ means push was successful

---

## Part 2: Deploy to Vercel

### Step 1: Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Click **Sign Up**
3. Sign up with **GitHub** (recommended)
4. Authorize Vercel to access your GitHub repos

### Step 2: Import Project

1. Click **Add New...** → **Project**
2. Find your `feed-forward` repository in the list
3. Click **Import**
4. Or paste the GitHub URL: `https://github.com/YOUR_USERNAME/feed-forward`

### Step 3: Configure Build Settings

Vercel auto-detects Vite, but verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `.` (default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Step 4: Add Environment Variables

Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://czzxoyxdyhrupgdmazpu.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (Your anon key from Supabase) |
| `VITE_RAZORPAY_KEY_ID` | (Your Razorpay key - optional) |
| `VITE_APP_NAME` | `Feed Forward` |
| `VITE_APP_URL` | (Your Vercel URL - will be generated) |

**To get Supabase Anon Key:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the `anon public` key

### Step 5: Deploy

1. Click **Deploy**
2. Wait 1-2 minutes for build
3. You'll see a success screen with your URL

**Your site is live at:** `https://feed-forward.vercel.app`

---

## Part 3: Configure Supabase for Production

### Update Supabase Auth Redirect URLs

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your production URL:
   - **Site URL:** `https://feed-forward.vercel.app` (your actual URL)
   - **Redirect URLs:** Add these:
     ```
     https://feed-forward.vercel.app
     https://feed-forward.vercel.app/
     https://feed-forward.vercel.app/auth/callback
     ```
5. Click **Save**

---

## Part 4: Custom Domain (Optional)

1. Go to Vercel → Your Project → **Settings** → **Domains**
2. Enter your domain (e.g., `feedforward.com`)
3. Vercel will show DNS records to add
4. Add the records in your domain registrar (GoDaddy, Namecheap, etc.)
5. Wait 24-48 hours for DNS propagation

---

## Part 5: Update README

Update your GitHub repository README:

```markdown
# Feed Forward 🍽️

A food donation marketplace platform with subscription plans, AI inventory management, and impact tracking.

![Deploy Status](https://img.shields.io/badge/Vercel-Deployed-brightgreen)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-orange)

## Features

- 🍽️ Food Donation Marketplace
- 💳 Subscription Plans (Free/Pro/Enterprise)
- 📊 Analytics Dashboard
- 🤖 AI Inventory Management
- 🌿 Eco Marketplace
- 🔗 Web3 Integration (Polygon)

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Tailwind CSS, shadcn/ui
- **Backend:** Supabase
- **Payments:** Razorpay
- **Charts:** Recharts
- **Deployment:** Vercel

## Getting Started

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/feed-forward.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

## Deployment

Deployed on Vercel: [feed-forward.vercel.app](https://feed-forward.vercel.app)

## License

MIT License
```

---

## Troubleshooting

### Build Fails on Vercel

1. Check **Build Logs** in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - TypeScript errors (run `npm run build` locally first)
   - Missing dependencies

### Authentication Not Working

1. Verify Supabase redirect URLs are configured
2. Check browser console for CORS errors
3. Ensure Site URL matches exactly

### Database Connection Issues

1. Check environment variables are set in Vercel
2. Verify Supabase project is not paused
3. Check Row Level Security policies

### Payments Not Working

1. Ensure Razorpay keys are in production environment
2. Use test mode for development
3. Check Razorpay dashboard for errors

---

## Useful Links

| Service | Link |
|---------|------|
| GitHub | https://github.com |
| Vercel | https://vercel.com |
| Supabase | https://supabase.com |
| Razorpay | https://dashboard.razorpay.com |
| React Docs | https://react.dev |
| Vite Docs | https://vitejs.dev |

---

## Quick Command Reference

```bash
# Git Commands
git add .                    # Stage all changes
git commit -m "message"     # Commit changes
git push                   # Push to GitHub
git status                 # Check status

# Development
npm install                # Install dependencies
npm run dev               # Start dev server
npm run build             # Build for production
npm run lint              # Check for errors

# Vercel
vercel                    # Deploy to preview
vercel --prod             # Deploy to production
vercel env add            # Add environment variable
```

---

## Support

For issues with this project:
1. Check the [Issues](https://github.com/YOUR_USERNAME/feed-forward/issues) tab
2. Create a new issue with detailed description
3. Include browser console logs if applicable

---

**Happy Deploying! 🚀**
