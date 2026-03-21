
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Apple, Droplets, TrendingUp, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Mock data - in production this would come from your API/database
const donationTrendsData = [
  { month: 'Jan', meals: 1200, donors: 85 },
  { month: 'Feb', meals: 1800, donors: 105 },
  { month: 'Mar', meals: 1600, donors: 90 },
  { month: 'Apr', meals: 2200, donors: 120 },
  { month: 'May', meals: 2800, donors: 150 },
  { month: 'Jun', meals: 3500, donors: 180 },
];

const impactData = [
  { name: 'Meals Distributed', value: 15800, color: '#8B5CF6' },
  { name: 'CO₂ Saved (kg)', value: 3240, color: '#10B981' },
  { name: 'Water Saved (L)', value: 9560, color: '#0EA5E9' },
  { name: 'Waste Reduced (kg)', value: 7850, color: '#F97316' },
];

const successStories = [
  {
    id: 1,
    title: "Local Restaurant Partnership Success",
    summary: "A chain of 5 restaurants in San Francisco reduced food waste by 60% through regular donations.",
    impact: "3,200 meals distributed",
    organization: "Food Runners SF",
    date: "March 2025"
  },
  {
    id: 2,
    title: "Campus Food Recovery Program",
    summary: "Berkeley University established a food recovery program saving leftover meals from campus cafeterias.",
    impact: "1,800 meals distributed",
    organization: "Student Food Coalition",
    date: "February 2025"
  },
  {
    id: 3,
    title: "Corporate Lunch Donation Initiative",
    summary: "Tech companies in Silicon Valley now donate excess catering from meetings and events.",
    impact: "5,600 meals distributed",
    organization: "Silicon Valley Food Rescue",
    date: "April 2025"
  }
];

const participatingOrganizations = [
  {
    id: 1,
    name: "Food Runners SF",
    type: "NGO",
    city: "San Francisco",
    meals: 3200,
  },
  {
    id: 2,
    name: "Student Food Coalition",
    type: "Community",
    city: "Berkeley",
    meals: 1800,
  },
  {
    id: 3,
    name: "Silicon Valley Food Rescue",
    type: "NGO",
    city: "Palo Alto",
    meals: 5600,
  },
  {
    id: 4,
    name: "Urban Harvest",
    type: "Nonprofit",
    city: "Oakland",
    meals: 2900,
  },
  {
    id: 5,
    name: "Bay Area Food Bank",
    type: "Food Bank",
    city: "San Jose",
    meals: 7300,
  }
];

export default function CommunityImpactPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [totalMeals, setTotalMeals] = useState(15800);
  const [totalDonors, setTotalDonors] = useState(320);
  const [citiesCovered, setCitiesCovered] = useState(8);
  const [co2Saved, setCo2Saved] = useState(3240);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch this data from your API/Supabase
    const fetchData = async () => {
      try {
        // Example of how to fetch real data from Supabase
        // const { data: donationsData, error } = await supabase
        //   .from('farmer_donations')
        //   .select('*')
        //   .eq('status', 'delivered');
        
        // if (error) throw error;
        // Process the data and update state
        
        // For demo, we'll just simulate a loading state
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Community Impact Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track our collective progress in reducing food waste and fighting hunger
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Total Meals Distributed</span>
                    <span className="text-3xl font-bold">{totalMeals.toLocaleString()}</span>
                  </div>
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Apple className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 18%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Participating Donors</span>
                    <span className="text-3xl font-bold">{totalDonors.toLocaleString()}</span>
                  </div>
                  <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 12%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Cities Covered</span>
                    <span className="text-3xl font-bold">{citiesCovered}</span>
                  </div>
                  <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 2</span> new cities this month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">CO₂ Saved (kg)</span>
                    <span className="text-3xl font-bold">{co2Saved.toLocaleString()}</span>
                  </div>
                  <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 22%</span> from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="stories">Success Stories</TabsTrigger>
              <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Trends</CardTitle>
                    <CardDescription>Monthly meal distributions and donor participation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={donationTrendsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                          <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="meals" name="Meals Distributed" fill="#8B5CF6" />
                          <Bar yAxisId="right" dataKey="donors" name="Active Donors" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impact Metrics</CardTitle>
                    <CardDescription>Key statistics on hunger relief and environmental impact</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={impactData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {impactData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => value.toLocaleString()} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organizations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Participating Organizations</CardTitle>
                  <CardDescription>NGOs, community groups and food banks leveraging our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Organization</th>
                          <th className="text-left p-4">Type</th>
                          <th className="text-left p-4">City</th>
                          <th className="text-left p-4">Meals Distributed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participatingOrganizations.map(org => (
                          <tr key={org.id} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{org.name}</td>
                            <td className="p-4">
                              <Badge variant="outline" className="font-normal">
                                {org.type}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{org.city}</td>
                            <td className="p-4">{org.meals.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map(story => (
                  <Card key={story.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                      <CardDescription>{story.organization} • {story.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{story.summary}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{story.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="environmental" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Track the environmental benefits of food waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Droplets className="h-8 w-8 text-green-500" />
                      </div>
                      <span className="text-2xl font-bold">9,560</span>
                      <span className="text-sm text-muted-foreground">Liters of Water Saved</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Globe className="h-8 w-8 text-blue-500" />
                      </div>
                      <span className="text-2xl font-bold">3,240</span>
                      <span className="text-sm text-muted-foreground">kg of CO₂ Prevented</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                      <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8 text-amber-500" />
                      </div>
                      <span className="text-2xl font-bold">7,850</span>
                      <span className="text-sm text-muted-foreground">kg of Waste Reduced</span>
                    </div>
                  </div>

                  <div className="mt-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={donationTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="meals" 
                          name="Environmental Impact Score" 
                          stroke="#10B981" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
