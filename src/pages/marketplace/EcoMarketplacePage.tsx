
import React from 'react';
import { MarketplaceCardsPage } from "@/components/marketplace/MarketplaceCardsPage";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, Recycle, ShoppingCart, TreePine, Zap, Crown, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { CartDrawer } from "@/components/marketplace/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EcoMarketplacePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentPlan, canCreateListing, remainingListings } = useSubscription();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-8"
        >
          <div className="flex justify-center">
            <div className="p-3 bg-green-100 rounded-full">
              <TreePine className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t('eco.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('eco.subtitle')}
          </p>
        </motion.div>
        <div className="flex flex-col items-end gap-2">
          <CartDrawer />
          {isAuthenticated && currentPlan && (
            <Button 
              size="sm" 
              onClick={() => navigate('/sell')}
              disabled={!canCreateListing}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('eco.listItem')}
            </Button>
          )}
        </div>
      </div>

      {/* Subscription Status for Sellers */}
      {isAuthenticated && currentPlan && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentPlan.name === 'Enterprise' ? (
                <Crown className="h-6 w-6 text-yellow-600" />
              ) : currentPlan.name === 'Pro' ? (
                <Zap className="h-6 w-6 text-purple-600" />
              ) : (
                <Badge variant="outline">{t('eco.free')}</Badge>
              )}
              <div>
                <p className="font-medium">
                  {currentPlan.max_listings_unlimited 
                    ? t('eco.planUnlimited').replace('{plan}', currentPlan.name)
                    : t('eco.planLimited').replace('{plan}', currentPlan.name).replace('{rem}', (remainingListings || 0).toString()).replace('{max}', currentPlan.max_listings.toString())
                  }
                </p>
                {currentPlan.priority_listing && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" /> {t('eco.priorityListing')}
                  </p>
                )}
              </div>
            </div>
            {!canCreateListing && (
              <Button size="sm" onClick={() => navigate('/plans')}>
                <Zap className="h-4 w-4 mr-2" />
                {t('eco.upgradeListings')}
              </Button>
            )}
            {currentPlan.name === 'Free' && canCreateListing && (
              <Button size="sm" variant="outline" onClick={() => navigate('/plans')}>
                <Zap className="h-4 w-4 mr-2" />
                {t('eco.getPriority')}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">{t('eco.sustainableTitle')}</h3>
          </div>
          <p className="text-sm text-green-700">
            {t('eco.sustainableDesc')}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">{t('eco.dualCurrencyTitle')}</h3>
          </div>
          <p className="text-sm text-green-700">
            {t('eco.dualCurrencyDesc')}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">{t('eco.envImpactTitle')}</h3>
          </div>
          <p className="text-sm text-green-700">
            {t('eco.envImpactDesc')}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <MarketplaceCardsPage />
    </div>
  );
};

export default EcoMarketplacePage;
