# Product Requirements Document: Project Feed Forward (FF)
*Current State: Fully Implemented & Deployed*

## 1. Introduction

### 1.1 Purpose
Project Feed Forward (FF) is an intelligent, scalable system designed to connect surplus food sources with individuals and organizations in need, while incentivizing participation through web3 rewards and reputation systems.

### 1.2 Live Deployment
- **Platform URL**: https://feedforward-one.vercel.app/
- **Repository**: [ImperialCoder01/FeedForward](https://github.com/ImperialCoder01/FeedForward)

### 1.3 Core Objectives
- **Food Waste Reduction**: Utilize real-time geographic routing and AI to prevent edible food from being discarded.
- **Hunger Alleviation**: Match verified food donors with hungry individuals and NGOs.
- **Transparency & Trust**: Utilize Web3 integrations for unchangeable impact ledgers and wallet connectivity.
- **Community Empowerment**: Reward active contributors with FeedCoin (FFC) and a decentralized Eco-Marketplace.
- **Inclusivity**: Support multiple languages (currently English and Hindi) so non-English speakers can donate, claim, and communicate easily.

---

## 2. Technical Architecture & Stack

### 2.1 Core Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Routing**: React Router DOM (v6) with optimized SPA routing via Vercel Rewrites.
- **Internationalization (i18n)**: `i18next` and `react-i18next` supporting dynamic EN/HI switching.

### 2.2 Backend & Database
- **Provider**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password & seamless profile bridging)
- **Data Security**: Row Level Security (RLS) and deeply nested `SECURITY DEFINER` triggers for atomic user onboarding.

### 2.3 Web3 & AI Interoperability
- **Web3 Setup**: RainbowKit, Wagmi, viem for wallet connection (MetaMask, Coinbase Wallet).
- **AI Processing**: Dedicated UI layers for Annapoorna Chatbot and AI Inventory processing to intercept expiring food metrics.

---

## 3. Product Modules (Current Implementation)

The project structure has been refactored to align directly with these modules, separating concerns cleanly across `/src/pages/`.

### 3.1. Core Module (`/core/`)
- **Home (`Home.tsx`)**: Global landing page with translated heroic metrics, tabbed routing between local "Nearby" versus "Trending" food flags.
- **Explore (`ExplorePage.tsx`)**: In-depth look at global non-profits and community boards.

### 3.2. Authentication & Profiles (`/auth/`)
- **Login/Signup**: Interfaced directly with Supabase, handling exception catches and redirecting correctly on success.
- **Wallet Connection (`WalletPage.tsx`)**: Interfaces `useAccount()` and `useConnect()` from Wagmi. Users can bridge their FeedCoin balance, refresh networks, and view wallet addresses directly inside their profile.

### 3.3. Food & Logistics (`/food/`)
- **Food Map (`FoodMap.tsx`)**: A fully realized leaflet/geographic map pinging local APIs to visualize listed food drop-offs.
- **Donate Flow (`DonatePage.tsx`)**: Easy-to-use form creation to generate "FoodFlags."
- **AI Inventory (`AIInventoryPage.tsx`)**: Predictive AI feature to monitor food expiry and automate flagging.

### 3.4. Impact & Disaster Relief (`/impact/`)
- **Sanjeevani (`SanjeevaniPage.tsx`)**: Disaster alert system. When earthquakes or floods hit, surplus food is instantly requested for refugee camps.
- **Farmer Donations (`FarmerDonations.tsx`)**: Targeted interface for agriculture. When market crashes occur, farmers can liquidate excess crop yield to charities instead of destroying it.
- **Community Impact**: Total CO₂ saved and meals delivered visualization.

### 3.5. Eco-Marketplace (`/marketplace/`)
- **Product Store**: A storefront accepting FeedCoin as the exclusive tender.
- **Seller Dashboard**: Admin panel for corporates and CSR sponsors providing goods to the marketplace.

### 3.6. Support & Administration (`/support/`, `/admin/`)
- **Annapoorna Chatbot**: Generative AI helper to guide users through the workflow.
- **AI Order Verification**: Automated visual check for delivered boxes.
- **Admin Dashboards**: Metric overviews for site super-users.

---

## 4. Internationalization (i18n)

### 4.1. Supported Locales
- **English (`en`)**: Primary application language.
- **Hindi (`hi`)**: Secondary translation to include rural Indian farmer bases and local delivery workers who may not speak English natively.

### 4.2. Technical Implementation
- Context initialized via `src/i18n.ts`.
- Navigation bar houses a Global `<LanguageSwitcher />` component.
- `useTranslation` hook deployed fundamentally on core pages, replacing hardcoded strings with nested JSON keys (`nav.foodMap`, `home.heroTitle`).

---

## 5. Deployment Specs

- **Host**: Vercel Serverless
- **Configuration**: Vercel SPA Routing handled via `vercel.json` rewrite directives. Direct subpath navigation (e.g., `feedforward-one.vercel.app/map`) bypasses physical subdirectories and intercepts React Router.
- **CI/CD**: Connected directly to GitHub `main` branch. 

---

## 6. Success Metrics & Future Roadmap
Currently, the platform fundamentally guarantees:
1. Zero syntax/TypeScript errors (passing `--noEmit` strictly).
2. Bullet-proof Database inserts upon Sign Up.
3. Clean user interfaces across 25+ distinct views.

**Future Phases:**
- Layer 2 Blockchain execution for cheap smart-contract FeedCoin tokenomics.
- Video verification of donor drop-offs via WebRTC integrations.
- Addition of 3 more local languages (Marathi, Tamil, Bengali).
