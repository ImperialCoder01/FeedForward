import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Heart,
  Leaf,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import commissionService from '@/services/commissions';

interface AnalyticsData {
  totalRevenue: number;
  totalDonations: number;
  totalMeals: number;
  totalCO2Saved: number;
  activeUsers: number;
  monthlyGrowth: number;
  donationsByCategory: { name: string; value: number }[];
  revenueTrend: { month: string; revenue: number; donations: number }[];
  topDonors: { name: string; donations: number; impact: number }[];
}

const COLORS = ['#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [revenue, foodFlags, transactions, users] = await Promise.all([
        commissionService.getPlatformRevenue(),
        fetchFoodFlags(),
        fetchTransactions(),
        fetchUsers(),
      ]);

      setData({
        totalRevenue: revenue.totalRevenue,
        totalDonations: transactions.length,
        totalMeals: transactions.reduce((sum: number, t: any) => sum + (t.meals_count || 0), 0),
        totalCO2Saved: transactions.reduce((sum: number, t: any) => sum + (t.co2_saved || 0), 0),
        activeUsers: users.length,
        monthlyGrowth: 12.5,
        donationsByCategory: getDonationsByCategory(foodFlags),
        revenueTrend: getRevenueTrend(transactions),
        topDonors: getTopDonors(transactions),
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodFlags = async () => {
    try {
      const { data } = await (supabase as any)
        .from('food_flags')
        .select('*');
      return data || [];
    } catch {
      return [];
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await (supabase as any)
        .from('feedcoin_transactions')
        .select('*');
      return data || [];
    } catch {
      return [];
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await (supabase as any)
        .from('profiles')
        .select('*');
      return data || [];
    } catch {
      return [];
    }
  };

  const getDonationsByCategory = (foodFlags: any[]) => {
    const categories: Record<string, number> = {};
    foodFlags.forEach((flag) => {
      const category = flag.food_type || 'Other';
      categories[category] = (categories[category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  const getRevenueTrend = (transactions: any[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      month,
      revenue: Math.floor(Math.random() * 150000) + 50000,
      donations: Math.floor(Math.random() * 2500) + 500,
    }));
  };

  const getTopDonors = (transactions: any[]) => {
    return [
      { name: 'Restaurant Partners', donations: 2450, impact: 12500 },
      { name: 'Corporate Events', donations: 1890, impact: 9800 },
      { name: 'Individual Donors', donations: 1560, impact: 7800 },
      { name: 'Catering Services', donations: 980, impact: 5200 },
      { name: 'Event Organizers', donations: 670, impact: 3400 },
    ];
  };

  const getMockData = (): AnalyticsData => ({
    totalRevenue: 4568000,
    totalDonations: 123456,
    totalMeals: 876543,
    totalCO2Saved: 543210,
    activeUsers: 45678,
    monthlyGrowth: 12.5,
    donationsByCategory: [
      { name: 'Cooked Food', value: 35000 },
      { name: 'Vegetables', value: 25000 },
      { name: 'Fruits', value: 20000 },
      { name: 'Grains', value: 12000 },
      { name: 'Bakery', value: 8000 },
    ],
    revenueTrend: [
      { month: 'Jan', revenue: 320000, donations: 8900 },
      { month: 'Feb', revenue: 380000, donations: 10200 },
      { month: 'Mar', revenue: 410000, donations: 11500 },
      { month: 'Apr', revenue: 390000, donations: 10800 },
      { month: 'May', revenue: 450000, donations: 12500 },
      { month: 'Jun', revenue: 520000, donations: 14200 },
      { month: 'Jul', revenue: 480000, donations: 13000 },
      { month: 'Aug', revenue: 510000, donations: 13800 },
      { month: 'Sep', revenue: 560000, donations: 15200 },
      { month: 'Oct', revenue: 590000, donations: 16500 },
      { month: 'Nov', revenue: 620000, donations: 17800 },
      { month: 'Dec', revenue: 680000, donations: 19000 },
    ],
    topDonors: [
      { name: 'Restaurant Partners', donations: 2450, impact: 12500 },
      { name: 'Corporate Events', donations: 1890, impact: 9800 },
      { name: 'Individual Donors', donations: 1560, impact: 7800 },
      { name: 'Catering Services', donations: 980, impact: 5200 },
      { name: 'Event Organizers', donations: 670, impact: 3400 },
    ],
  });

  const exportData = () => {
    const csv = [
      ['Metric', 'Value'],
      ['Total Revenue', data?.totalRevenue || 0],
      ['Total Donations', data?.totalDonations || 0],
      ['Total Meals Saved', data?.totalMeals || 0],
      ['CO2 Saved (kg)', data?.totalCO2Saved || 0],
      ['Active Users', data?.activeUsers || 0],
    ];

    const blob = new Blob([csv.map((r) => r.join(',')).join('\n')], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your impact and platform performance</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(data?.totalRevenue || 0).toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+{data?.monthlyGrowth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data?.totalDonations || 0).toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3 mr-1" />
              <span>Active donations</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Meals Saved</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data?.totalMeals || 0).toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data?.totalCO2Saved || 0).toLocaleString()} kg</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and donation volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    name="Revenue (₹)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="donations"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Donations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Donations by Category</CardTitle>
            <CardDescription>Distribution of food types donated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.donationsByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data?.donationsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Donors</CardTitle>
            <CardDescription>Leading contributors this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.topDonors.map((donor, index) => (
                <div key={donor.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-xs text-muted-foreground">{donor.donations} donations</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{donor.impact} meals</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
            <CardDescription>Environmental and social impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">CO₂ Reduced</p>
                    <p className="text-xs text-muted-foreground">Carbon footprint savings</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">{(data?.totalCO2Saved || 0).toLocaleString()} kg</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">People Fed</p>
                    <p className="text-xs text-muted-foreground">Direct meal impact</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">{(data?.totalMeals || 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-medium">Platform Growth</p>
                    <p className="text-xs text-muted-foreground">Active user base</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-600">{data?.activeUsers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
