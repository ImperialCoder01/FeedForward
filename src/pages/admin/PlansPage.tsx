import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Check, X, Star, Zap, Crown, Building, Loader2, AlertCircle, TrendingUp, Eye, Heart, Leaf, Users, BarChart3, Zap as Lightning } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import razorpayService from '@/services/razorpay';

const iconMap: Record<string, React.ReactNode> = {
  Free: <Star className="h-8 w-8 text-gray-600" />,
  Pro: <Zap className="h-8 w-8 text-purple-600" />,
  Enterprise: <Crown className="h-8 w-8 text-yellow-600" />,
};

const isDevMode = import.meta.env.DEV;

interface UserStats {
  totalListings: number;
  totalViews: number;
  totalDonations: number;
  mealsSaved: number;
  co2Saved: number;
  rank: number;
}

export default function PlansPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { plans, currentPlan, subscribe, isLoading, listingStats } = useSubscription();
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [isSubscribing, setIsSubscribing] = useState<string | null>(null);
  const [showDevModal, setShowDevModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalListings: 0,
    totalViews: 0,
    totalDonations: 0,
    mealsSaved: 0,
    co2Saved: 0,
    rank: 0,
  });

  useEffect(() => {
    const mockStats: UserStats = {
      totalListings: listingStats?.totalListings || 0,
      totalViews: Math.floor(Math.random() * 500) + 100,
      totalDonations: Math.floor(Math.random() * 50) + 10,
      mealsSaved: Math.floor(Math.random() * 500) + 50,
      co2Saved: Math.floor(Math.random() * 200) + 20,
      rank: Math.floor(Math.random() * 100) + 1,
    };
    setUserStats(mockStats);
  }, [listingStats]);

  const getPlanLimit = (plan: any) => plan.max_listings_unlimited ? Infinity : plan.max_listings || 10;
  const getUsagePercentage = (plan: any) => {
    const limit = getPlanLimit(plan);
    if (limit === Infinity) return 0;
    return Math.min(100, (userStats.totalListings / limit) * 100);
  };

  const handleSubscribe = async (plan: any) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    if (plan.id === currentPlan?.id || plan.name === currentPlan?.name) {
      toast.info('You are already on this plan');
      return;
    }

    const price = selectedBilling === 'yearly' ? plan.price_yearly : plan.price_monthly;

    if (price === 0) {
      setIsSubscribing(plan.id);
      try {
        await subscribe(plan.id, selectedBilling);
        toast.success('Subscribed to Free plan!');
      } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
        toast.error('Subscription failed', {
          description: err.message || 'Please try again later',
        });
      } finally {
        setIsSubscribing(null);
      }
      return;
    }

    if (isDevMode && (!import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID === 'your_razorpay_key_id')) {
      setPendingPlan(plan);
      setShowDevModal(true);
      return;
    }

    setIsSubscribing(plan.id);
    try {
      const result = await razorpayService.processSubscription(
        plan,
        selectedBilling,
        {
          name: (user as any)?.user_metadata?.full_name || (user as any)?.full_name,
          email: user?.email,
          phone: (user as any)?.user_metadata?.phone || (user as any)?.phone,
        }
      );

      if (result.success) {
        await subscribe(plan.id, selectedBilling);
        toast.success('Payment successful! Subscription activated.');
      } else {
        toast.error(result.error || 'Payment failed');
      }
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      toast.error('Payment error', {
        description: err.message,
      });
    } finally {
      setIsSubscribing(null);
    }
  };

  const handleDevPayment = async () => {
    if (!pendingPlan) return;
    
    setShowDevModal(false);
    setIsSubscribing(pendingPlan.id);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await subscribe(pendingPlan.id, selectedBilling);
      toast.success('Development mode: Subscription activated!');
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      toast.error('Subscription failed', {
        description: err.message || 'Please try again later',
      });
    } finally {
      setIsSubscribing(null);
      setPendingPlan(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 space-y-12">
      {isDevMode && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            <strong>Development Mode:</strong> Razorpay is not configured. Payments will be simulated.
          </p>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upgrade to unlock powerful features and maximize your impact in the food donation ecosystem
        </p>
      </div>

      {isAuthenticated && currentPlan && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Your Analytics Dashboard
            </CardTitle>
            <CardDescription>Track your impact and usage on your current {currentPlan.name} plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                <p className="text-2xl font-bold">{userStats.totalListings}</p>
                <p className="text-xs text-muted-foreground">Listings</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Eye className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                <p className="text-2xl font-bold">{userStats.totalViews}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Heart className="h-6 w-6 mx-auto text-red-500 mb-1" />
                <p className="text-2xl font-bold">{userStats.totalDonations}</p>
                <p className="text-xs text-muted-foreground">Donations</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Users className="h-6 w-6 mx-auto text-green-600 mb-1" />
                <p className="text-2xl font-bold">{userStats.mealsSaved}</p>
                <p className="text-xs text-muted-foreground">Meals Saved</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Leaf className="h-6 w-6 mx-auto text-emerald-500 mb-1" />
                <p className="text-2xl font-bold">{userStats.co2Saved} kg</p>
                <p className="text-xs text-muted-foreground">CO₂ Saved</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Crown className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
                <p className="text-2xl font-bold">#{userStats.rank}</p>
                <p className="text-xs text-muted-foreground">Your Rank</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Listing Usage</span>
                <span>{userStats.totalListings} / {getPlanLimit(currentPlan) === Infinity ? '∞' : getPlanLimit(currentPlan)}</span>
              </div>
              <Progress value={getUsagePercentage(currentPlan)} className="h-2" />
              {getPlanLimit(currentPlan) !== Infinity && getUsagePercentage(currentPlan) > 80 && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <Lightning className="h-3 w-3" />
                  You're using {Math.round(getUsagePercentage(currentPlan))}% of your listings. Upgrade for more!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDevModal} onOpenChange={setShowDevModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Development Mode - Simulate Payment</DialogTitle>
            <DialogDescription>
              This is a simulated payment for testing purposes. No real money will be charged.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Plan: {pendingPlan?.name}</p>
              <p className="text-2xl font-bold mt-2">
                ₹{selectedBilling === 'yearly' ? pendingPlan?.price_yearly : pendingPlan?.price_monthly}
                <span className="text-sm font-normal text-muted-foreground">
                  /{selectedBilling === 'yearly' ? 'year' : 'month'}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDevModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleDevPayment}>
                Simulate Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border p-1 bg-muted">
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedBilling === 'monthly'
                ? 'bg-white shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedBilling('yearly')}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedBilling === 'yearly'
                ? 'bg-white shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <Badge variant="secondary" className="ml-2 text-xs">Save 17%</Badge>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan: any) => {
          const isCurrentPlan = currentPlan?.id === plan.id || currentPlan?.name === plan.name;
          const price = selectedBilling === 'yearly' ? plan.price_yearly : plan.price_monthly;
          const isFree = price === 0;

          return (
            <Card
              key={plan.id}
              className={`relative ${
                plan.name === 'Pro' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
              } ${plan.name === 'Enterprise' ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : ''}`}
            >
              {plan.name === 'Pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">
                  {iconMap[plan.name] || <Building className="h-8 w-8" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {isFree ? 'Free' : `₹${price}`}
                  </span>
                  {!isFree && (
                    <span className="text-muted-foreground">
                      /{selectedBilling === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-left">
                  {plan.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}

                  {plan.name === 'Free' && (
                    <>
                      <li className="flex items-start gap-2 opacity-50">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Priority listing</span>
                      </li>
                      <li className="flex items-start gap-2 opacity-50">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Analytics dashboard</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-4 text-sm text-muted-foreground">
                  {plan.max_listings_unlimited ? (
                    <span>Unlimited listings per month</span>
                  ) : (
                    <span>Up to {plan.max_listings} listings per month</span>
                  )}
                </div>

                {plan.analytics_access && (
                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <p className="text-xs font-medium text-purple-700 dark:text-purple-300">
                      + Full Analytics Dashboard
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      Track your impact with detailed insights
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.name === 'Pro'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : plan.name === 'Enterprise'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : ''
                  }`}
                  variant={isCurrentPlan ? 'secondary' : 'default'}
                  disabled={isCurrentPlan || isSubscribing === plan.id}
                  onClick={() => handleSubscribe(plan)}
                >
                  {isSubscribing === plan.id ? (
                    'Subscribing...'
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : isFree ? (
                    'Get Started'
                  ) : (
                    'Upgrade Now'
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Plan Comparison</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30">Pro</th>
                    <th className="text-center py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Listings per month</td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30">Unlimited</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Priority listing</td>
                    <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                    <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Analytics dashboard</td>
                    <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                    <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Featured badges</td>
                    <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                    <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">API access</td>
                    <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">AI insights</td>
                    <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4 bg-purple-50 dark:bg-purple-950/30"><X className="h-4 w-4 mx-4 w-4 mx-auto text-gray-400" /></td>
                    <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit/debit cards, UPI, net banking, and popular digital wallets through our secure payment partners.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                The Free plan is always free! You can try Pro and Enterprise features with a 7-day money-back guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
