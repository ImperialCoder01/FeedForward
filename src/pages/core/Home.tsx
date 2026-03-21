
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FoodFlagGrid } from "@/components/FoodFlagGrid";
import { mockFoodFlags, impactStats } from "@/data/mockData";
import { MapPin, Users, Award, ArrowRight, TrendingUp, Heart, ShieldCheck, Bell, Crown, Zap, Star } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import FrameworkSection from "@/components/FrameworkSection";
import { useTranslation } from "react-i18next";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export default function Home() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("nearby");
  
  const nearbyFlags = mockFoodFlags.slice(0, 3);
  const trendingFlags = [...mockFoodFlags].reverse().slice(0, 3);
  
  const impactMetrics = [
    {
      icon: Heart,
      label: "Meals Donated",
      value: formatNumber(impactStats.mealsDonated),
      description: "Nutritious meals provided to those in need through our platform"
    },
    {
      icon: TrendingUp,
      label: "CO₂ Prevented",
      value: formatNumber(impactStats.co2Prevented) + "kg",
      description: "Reduction in carbon emissions by preventing food waste"
    },
    {
      icon: Users,
      label: "Active Donors",
      value: formatNumber(impactStats.activeDonors),
      description: "Dedicated food donors making a difference in their communities"
    }
  ];

  const feasibilityCards = [
    {
      title: "Easy Integration",
      description: "Simple onboarding process for both donors and recipients",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      title: "Real-time Updates",
      description: "Instant notifications and live tracking of food donations",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      title: "Community Impact",
      description: "Measurable reduction in food waste and hunger",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ff-green/10 to-ff-orange/10 -z-10" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              {t('home.heroTitle', 'Rescuing Food, Feeding Communities')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in" style={{animationDelay: "0.2s"}}>
              {t('home.heroSubtitle', 'Connect surplus food with those in need while earning rewards for your positive impact on the community and environment.')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild className="btn-gradient" size="lg">
                <Link to="/donate">{t('home.ctaDonate', 'Donate Food')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map">{t('home.ctaExplore', 'Find Food')}</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" size="lg">
                <Link to="/plans" className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in" style={{animationDelay: "0.3s"}}>
            <div className="w-full relative">
              <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/hero-placeholder.svg"
                  alt="Feed Forward - Rescuing Food, Feeding Communities"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/lovable-uploads/d679d7ac-4e87-4a72-8b58-c2ab588c09c7.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Upgrade Banner */}
      <section className="py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl animate-pulse">
                  <Crown className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Unlock Premium Features
                </h3>
                <p className="text-purple-100 text-lg mb-3">
                  Get unlimited listings, priority visibility, AI insights, and more with Pro & Enterprise plans
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <Zap className="h-5 w-5" />
                    <span className="text-sm font-medium">Unlimited Listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">Priority Visibility</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Star className="h-5 w-5" />
                    <span className="text-sm font-medium">Analytics Dashboard</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-xl font-bold px-8">
                  <Link to="/plans" className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    View Plans
                  </Link>
                </Button>
                <p className="text-center text-purple-200 text-sm mt-2">
                  Starting at ₹499/month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards & Impact Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Rewards & Impact</h3>
                <p className="text-green-600 font-medium text-lg mb-2">Earn FeedCoins for your contributions</p>
                <p className="text-gray-600 leading-relaxed">
                  Every donation makes a difference. Join our community of changemakers and earn rewards while helping those in need. 
                  Your positive impact on the community and environment is recognized and rewarded!
                </p>
              </div>
              <div className="flex-shrink-0 mt-4 md:mt-0">
                <Button asChild className="btn-gradient">
                  <Link to="/donate">Start Donating</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section with Hover Cards */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Community Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <metric.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{metric.label}</h4>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Food Flags Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Available Food</h2>
              <p className="text-muted-foreground">Browse surplus food that needs rescuing near you</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nearby" className="mt-0">
                <FoodFlagGrid foodFlags={nearbyFlags} />
              </TabsContent>
              
              <TabsContent value="trending" className="mt-0">
                <FoodFlagGrid foodFlags={trendingFlags} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="group">
              <Link to="/map">
                View All Available Food
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Framework Section */}
      <FrameworkSection />
      
      {/* How It Works */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform connects food donors with recipients through an easy-to-use system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">1. Create a FoodFlag</h3>
                <p className="text-sm text-muted-foreground">
                  Donors post details about surplus food including type, quantity, and pickup location.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">2. Connect with Recipients</h3>
                <p className="text-sm text-muted-foreground">
                  Recipients are notified of nearby available food and can claim it for pickup.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">3. Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Both donors and recipients earn FeedCoins that can be redeemed for various rewards.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="btn-gradient">
              <Link to="/about">Learn More About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Platform Features</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Project FeedForward combines innovative technology with social impact
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Blockchain Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Immutable records of all donations for complete transparency and trust.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">GPS Navigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time directions to pickup locations for efficient food rescue.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">FeedCoin Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn tokens for your contributions and redeem them for various perks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Real-time Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified instantly when food is available in your area.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Community Governance</h3>
                    <p className="text-sm text-muted-foreground">
                      Participate in platform decisions through our DAO structure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Impact Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor your environmental and social impact with detailed metrics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
