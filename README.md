<div align="center">

# 🌍 Feed-Forward (FF)
**Rescuing Food, Feeding Communities, Preserving Our Planet.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Feed%20Forward-success?style=for-the-badge&logo=vercel)](https://feedforward-one.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Web3](https://img.shields.io/badge/Web3-F6851B?style=for-the-badge&logo=metamask&logoColor=white)](https://rainbowkit.com/)

An intelligent, decentralized platform connecting surplus food sources with individuals and organizations in need, powered by AI prediction models and Web3 blockchain rewards.

</div>

---

## 🚀 Live Demo
Visit the fully verified and functional application at: **[feedforward-one.vercel.app](https://feedforward-one.vercel.app/)**

---

## 🌟 Project Overview
Feed-Forward is a next-generation ecosystem built to eradicate food waste and combat hunger. By utilizing real-time geographic routing, artificial intelligence, and a gamified blockchain token economy, we match verified food donors (restaurants, events, farmers) with hungry individuals and NGOs seamlessly.

Every action makes an impact—and every impact is rewarded.

---

## ⚡ Key Features (Fully Implemented)

### 🍱 The Core Food Rescue Engine
- **Food Map & Discovery**: Interactive visual map utilizing mapping APIs to instantly locate available surplus food in real-time.
- **Donate & Claim Flow**: Donors can list food (FoodFlags), and recipients or NGOs can claim and navigate to the pickup point.

### 🧠 Cutting-Edge AI Integrations
- **Annapoorna Chatbot**: A dedicated AI assistant to help users navigate the platform, understand food safety, and get answers.
- **AI Inventory Parsing**: Upload food inventory lists and let AI automatically identify items nearing expiry to flag for donation.
- **AI Order Verification**: Automated visual/textual verification of food deliveries for quality assurance.

### ⛓️ Web3 & Blockchain Economy
- **Wallet Connection**: Seamlessly link your cryptocurrency wallet via RainbowKit & Wagmi.
- **FeedCoin Rewards (FFC)**: Earn tokenized rewards for donating food, volunteering, or claiming food on time.
- **Eco-Marketplace**: A decentralized storefront where users can spend their earned FeedCoins on eco-friendly products and sponsor perks.

### 🌍 Impact & Societal Modules
- **Sanjeevani (Disaster Relief)**: A dedicated disaster response module that reroutes surplus food to climate crisis zones and refugee camps.
- **Farmer Distress Donations**: Special provisions allowing farmers to donate surplus crops during market crashes to minimize agrarian waste.
- **Community Impact Dashboard**: Track CO₂ saved, meals donated, and water preserved in real-time.

### 🌐 Global Reach
- **Multi-Language Support (i18n)**: Instantly toggle the entire interface between **English (EN)** and **Hindi (HI)** to bridge the gap between rural farmers and urban donators.
- **Mobile Responsive**: Impeccable UI built with Tailwind CSS & Shadcn, optimized for every device format.

---

## 🏗️ Technical Architecture

Feed-Forward utilizes a modern, modular architecture:

- **Frontend Framework**: React 18 / Vite / TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components + Framer Motion
- **Authentication & Database**: Supabase (PostgreSQL, Row Level Security, Trigger-based Profile Synchronization)
- **Web3 Integration**: RainbowKit, Wagmi, viem, Ethers.js
- **Routing**: React Router DOM v6
- **Internationalization**: `i18next` & `react-i18next`
- **Deployment**: Vercel (SPA routing configured)

### 📁 Clean Feature-Based Folder Structure
The codebase follows a strictly organized domain-driven architecture:
- `/src/pages/auth/` - Sign In, Sign Up, Profile, Wallet configuration
- `/src/pages/core/` - Homepage, Landing content, 404
- `/src/pages/food/` - Maps, Donation forms, AI Inventory
- `/src/pages/marketplace/` - Eco-Marketplace, Checkout, Seller Dashboards
- `/src/pages/impact/` - Sanjeevani, Volunteer flows, CSR connections
- `/src/pages/support/` - AI Chatbots and Help Centers

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18+)
- Web3 Wallet (e.g., MetaMask to test blockchain connections)
- A Supabase Project (for Auth & DB)

### Installation Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/ImperialCoder01/FeedForward.git
   cd FeedForward
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:8080`!

---

## 📖 Database Schema (Supabase)

To run the application properly, the Supabase backend relies on multiple automated triggers to keep user accounts synced with `profiles`. The included SQL file (`fix_signup_complete.sql`) contains the exact definitions for our robust `SECURITY DEFINER` triggers that bypass RLS to ensure smooth onboarding.

---

## 🌱 Sustainable Development Goals (SDGs)
Project Feed-Forward directly aligns with UN SDGs:
- **SDG 2:** Zero Hunger
- **SDG 11:** Sustainable Cities and Communities
- **SDG 12:** Responsible Consumption and Production
- **SDG 13:** Climate Action

---

## 🤝 Contributing
Contributions are absolutely welcome! We are always looking for open-source contributors to help us expand our AI models, fix bugs, or add new local languages to the i18n roster. 

Please read our contributing guidelines before submitting a Pull Request.

---

<div align="center">
  Built with ❤️ to feed the world.
</div>
