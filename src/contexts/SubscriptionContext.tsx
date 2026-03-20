import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import subscriptionService, { mockPlans } from '@/services/subscriptions';
import { useAuth } from './AuthContext';
import listingService, { ListingStats } from '@/services/listings';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  features?: string[];
  max_listings: number;
  max_listings_unlimited: boolean;
  priority_listing?: boolean;
  analytics_access?: boolean;
  api_access?: boolean;
  bulk_upload?: boolean;
  ai_insights?: boolean;
}

export interface Subscription {
  user_id: string;
  plan: SubscriptionPlan;
  status: string;
}

type SubscriptionContextType = {
  plans: SubscriptionPlan[];
  currentPlan: SubscriptionPlan | null;
  isLoading: boolean;
  listingStats: ListingStats | null;
  canCreateListing: boolean;
  remainingListings: number | null;
  checkFeatureAccess: (feature: string) => Promise<boolean>;
  subscribe: (planId: string, billingCycle?: 'monthly' | 'yearly') => Promise<void>;
  refreshListingStats: () => Promise<void>;
  getListingLimit: () => number;
};

const SubscriptionContext = createContext<SubscriptionContextType>({
  plans: [],
  currentPlan: null,
  isLoading: true,
  listingStats: null,
  canCreateListing: true,
  remainingListings: null,
  checkFeatureAccess: async () => false,
  subscribe: async () => {},
  refreshListingStats: async () => {},
  getListingLimit: () => 10,
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listingStats, setListingStats] = useState<ListingStats | null>(null);

  const loadPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const plansData = await subscriptionService.getPlans();
      setPlans(plansData as SubscriptionPlan[]);
    } catch (error) {
      console.error('Error loading plans:', error);
      setPlans(mockPlans as SubscriptionPlan[]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCurrentSubscription = useCallback(async () => {
    if (!user) return;
    
    try {
      const subscription = await subscriptionService.getCurrentSubscription(user.id);
      setCurrentPlan(subscription?.plan || (mockPlans[0] as SubscriptionPlan));
    } catch (error) {
      console.error('Error loading subscription:', error);
      setCurrentPlan(mockPlans[0] as SubscriptionPlan);
    }
  }, [user]);

  const refreshListingStats = useCallback(async () => {
    if (!user) return;
    
    try {
      const stats = await listingService.getListingStats(user.id);
      setListingStats(stats);
    } catch (error) {
      console.error('Error loading listing stats:', error);
    }
  }, [user]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCurrentSubscription();
      refreshListingStats();
    } else {
      setCurrentPlan(null);
      setListingStats(null);
    }
  }, [isAuthenticated, user, loadCurrentSubscription, refreshListingStats]);

  const getListingLimit = (): number => {
    if (!currentPlan) return 10;
    if (currentPlan.max_listings_unlimited) return Infinity;
    return currentPlan.max_listings || 10;
  };

  const canCreateListing = (): boolean => {
    if (!currentPlan) return true;
    if (!listingStats) return true;
    if (currentPlan.max_listings_unlimited) return true;
    return listingStats.totalListings < (currentPlan.max_listings || 10);
  };

  const remainingListings = (): number | null => {
    if (!currentPlan) return null;
    if (currentPlan.max_listings_unlimited) return null;
    if (!listingStats) return currentPlan.max_listings || 10;
    return Math.max(0, (currentPlan.max_listings || 10) - listingStats.totalListings);
  };

  const checkFeatureAccess = async (feature: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      return await subscriptionService.checkFeatureAccess(user.id, feature);
    } catch {
      return false;
    }
  };

  const subscribe = async (planId: string, billingCycle: 'monthly' | 'yearly' = 'monthly') => {
    if (!user) {
      throw new Error('Must be logged in to subscribe');
    }

    await subscriptionService.subscribe(user.id, planId, billingCycle);
    await loadCurrentSubscription();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans,
        currentPlan,
        isLoading,
        listingStats,
        canCreateListing: canCreateListing(),
        remainingListings: remainingListings(),
        checkFeatureAccess,
        subscribe,
        refreshListingStats,
        getListingLimit,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
