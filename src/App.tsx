
import React from "react";
import "./i18n"; // Import i18n configuration
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Web3Provider } from "./components/providers/Web3Provider";
import { MarketplaceProvider } from "./contexts/MarketplaceContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Import all page components
import Home from "./pages/core/Home";
import ExplorePage from "./pages/core/ExplorePage";
import AboutPage from "./pages/core/AboutPage";
import NotFound from "./pages/core/NotFound";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProfilePage from "./pages/auth/ProfilePage";
import WalletPage from "./pages/auth/WalletPage";

import FoodMap from "./pages/food/FoodMap";
import FoodDetail from "./pages/food/FoodDetail";
import DonatePage from "./pages/food/DonatePage";
import AIInventoryPage from "./pages/food/AIInventoryPage";

import EcoMarketplacePage from "./pages/marketplace/EcoMarketplacePage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import SellerDashboardPage from "./pages/marketplace/SellerDashboardPage";
import CheckoutPage from "./pages/marketplace/CheckoutPage";

import SanjeevaniPage from "./pages/impact/SanjeevaniPage";
import VolunteerPage from "./pages/impact/VolunteerPage";
import CommunityImpactPage from "./pages/impact/CommunityImpactPage";
import FarmerDonations from "./pages/impact/FarmerDonations";

import AnnapoornaChatbotPage from "./pages/support/AnnapoornaChatbotPage";
import AIOrderVerificationPage from "./pages/support/AIOrderVerificationPage";
import NotificationCenter from "./pages/support/NotificationCenter";

import CSRDashboardPage from "./pages/admin/CSRDashboardPage";
import PlansPage from "./pages/admin/PlansPage";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <BrowserRouter>
              <AuthProvider>
                <ProfileProvider>
                  <Web3Provider>
                    <MarketplaceProvider>
                      <CartProvider>
                        <SubscriptionProvider>
                          <Toaster />
                          <Sonner />
                          <Routes>
                            <Route path="/" element={<Layout><Home /></Layout>} />
                          <Route path="/map" element={<Layout><FoodMap /></Layout>} />
                          <Route path="/food/:id" element={<Layout><FoodDetail /></Layout>} />
                          <Route path="/donate" element={<Layout><DonatePage /></Layout>} />
                          <Route path="/notifications" element={<Layout><NotificationCenter /></Layout>} />
                          <Route path="/login" element={<Layout><Login /></Layout>} />
                          <Route path="/signup" element={<Layout><SignUp /></Layout>} />
                          
                          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                          <Route path="/volunteer" element={<Layout><VolunteerPage /></Layout>} />
                          <Route path="/ai-inventory" element={
                            <Layout>
                              <ProtectedRoute>
                                <AIInventoryPage />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          <Route path="/explore" element={<Layout><ExplorePage /></Layout>} />
                          
                          <Route path="/ai-order-verification" element={<Layout><AIOrderVerificationPage /></Layout>} />
                          <Route path="/annapoorna-chatbot" element={<Layout><AnnapoornaChatbotPage /></Layout>} />
                          <Route path="/csr-dashboard" element={<Layout><CSRDashboardPage /></Layout>} />
                          <Route path="/sanjeevani" element={<Layout><SanjeevaniPage /></Layout>} />
                          <Route path="/eco-marketplace" element={<Layout><EcoMarketplacePage /></Layout>} />
                          
                          <Route path="/profile" element={
                            <Layout>
                              <ProtectedRoute>
                                <ProfilePage />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          
                          <Route path="/wallet" element={
                            <Layout>
                              <ProtectedRoute>
                                <WalletPage />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          
                          <Route path="/marketplace" element={
                            <Layout>
                              <MarketplacePage />
                            </Layout>
                          } />
                          
                          <Route path="/seller-dashboard" element={
                            <Layout>
                              <ProtectedRoute>
                                <SellerDashboardPage />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          
                          <Route path="/farmer-donations" element={
                            <Layout>
                              <ProtectedRoute>
                                <FarmerDonations />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          
                          <Route path="/impact" element={
                            <Layout>
                              <CommunityImpactPage />
                            </Layout>
                          } />
                          
                          <Route path="/plans" element={
                            <Layout>
                              <PlansPage />
                            </Layout>
                          } />

                          <Route path="/analytics" element={
                            <Layout>
                              <ProtectedRoute>
                                <AnalyticsDashboard />
                              </ProtectedRoute>
                            </Layout>
                          } />
                          
                          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
                          
                          <Route path="*" element={<Layout><NotFound /></Layout>} />
                        </Routes>
                        </SubscriptionProvider>
                      </CartProvider>
                    </MarketplaceProvider>
                  </Web3Provider>
                </ProfileProvider>
              </AuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </ErrorBoundary>
);

export default App;
