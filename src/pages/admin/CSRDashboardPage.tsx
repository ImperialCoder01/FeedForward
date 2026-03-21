
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Calendar,
  Download,
  FileText,
  PieChart,
  Share2,
  Users,
  Leaf,
  Globe,
  IndianRupee,
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data
const financialData = {
  totalDonated: 1250000,
  taxBenefits: 437500,
  budgetUsed: 67,
  mealsProvided: 42500,
  communitiesImpacted: 28
};

const monthlyContributions = [
  { month: 'Jan', amount: 105000 },
  { month: 'Feb', amount: 125000 },
  { month: 'Mar', amount: 115000 },
  { month: 'Apr', amount: 145000 },
  { month: 'May', amount: 170000 },
  { month: 'Jun', amount: 190000 },
  { month: 'Jul', amount: 210000 },
  { month: 'Aug', amount: 190000 },
];

const donationCategories = [
  { name: 'Monetary', value: 750000, color: '#8B5CF6' },
  { name: 'In-kind Food', value: 350000, color: '#10B981' },
  { name: 'Equipment', value: 120000, color: '#0EA5E9' },
  { name: 'Volunteer Hours', value: 30000, color: '#F97316' },
];

const impactData = {
  co2Saved: 25.8, // tons
  wasteReduction: 15.3, // tons
  peopleFed: 42500,
  communitiesSupported: 28,
  sdgAlignment: [
    { goal: "2", name: "Zero Hunger", contribution: 75 },
    { goal: "12", name: "Responsible Consumption", contribution: 64 },
    { goal: "13", name: "Climate Action", contribution: 41 }
  ]
};

// India state-wise impact data for the map
const impactMapData = [
  { state: "Maharashtra", impactScore: 85, meals: 8500 },
  { state: "Karnataka", impactScore: 72, meals: 7200 },
  { state: "Delhi", impactScore: 68, meals: 6800 },
  { state: "Tamil Nadu", impactScore: 65, meals: 6500 },
  { state: "Gujarat", impactScore: 58, meals: 5800 },
  { state: "Telangana", impactScore: 52, meals: 5200 },
  { state: "West Bengal", impactScore: 48, meals: 4800 },
  { state: "Rajasthan", impactScore: 45, meals: 4500 },
  { state: "Uttar Pradesh", impactScore: 42, meals: 4200 },
  { state: "Kerala", impactScore: 38, meals: 3800 },
  { state: "Punjab", impactScore: 32, meals: 3200 },
];

const environmentalImpactData = [
  { month: 'Jan', score: 42 },
  { month: 'Feb', score: 48 },
  { month: 'Mar', score: 55 },
  { month: 'Apr', score: 62 },
  { month: 'May', score: 68 },
  { month: 'Jun', score: 75 },
  { month: 'Jul', score: 82 },
  { month: 'Aug', score: 89 },
];

const utilizationData = {
  allocation: [
    { category: "Food Distribution", percentage: 62, color: "#8B5CF6" },
    { category: "Logistics", percentage: 23, color: "#10B981" },
    { category: "Administration", percentage: 10, color: "#0EA5E9" },
    { category: "Education", percentage: 5, color: "#F97316" }
  ],
  costPerMeal: 29.4, // rupees
  adminOverhead: 10.4 // percentage
};

const employeeData = {
  volunteerHours: 1240,
  employeeDonations: 385000,
  companyMatched: 385000,
  topDepartments: [
    { name: "Engineering", contribution: 128000 },
    { name: "Sales", contribution: 104500 },
    { name: "Operations", contribution: 87500 },
    { name: "HR", contribution: 65000 }
  ]
};

// Add map image location
const mapImageUrl = "/lovable-uploads/3276cd6b-ea7d-4cf9-9f5a-937a8941c66e.png";

const COLORS = ['#8B5CF6', '#10B981', '#0EA5E9', '#F97316'];

const CSRDashboardPage = () => {
  const [dateRange, setDateRange] = useState("thisYear");
  
  // Function to handle export
  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format...`);
    // This would connect to a real export functionality
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">CSR Dashboard</h1>
            <p className="text-muted-foreground">Track your company's social impact and contributions</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="pdf">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="ppt">Presentation</SelectItem>
              </SelectContent>
            </Select>
            
            <Button size="icon" variant="outline" onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto mb-6">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          {/* Financial Overview Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Contributed</CardDescription>
                  <CardTitle className="text-3xl flex items-center"><IndianRupee className="h-6 w-6 mr-1" />{(financialData.totalDonated/100000).toFixed(1)}L</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Monetary + In-kind donations
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Tax Benefits</CardDescription>
                  <CardTitle className="text-3xl flex items-center"><IndianRupee className="h-6 w-6 mr-1" />{(financialData.taxBenefits/100000).toFixed(1)}L</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    35% of total contributions
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Budget Utilized</CardDescription>
                  <CardTitle className="text-3xl">{financialData.budgetUsed}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={financialData.budgetUsed} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Communities Impacted</CardDescription>
                  <CardTitle className="text-3xl">{financialData.communitiesImpacted}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Across 12 states
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Monthly Contributions</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={monthlyContributions}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `₹${value/1000}K`}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="amount" fill="#8B5CF6" name="Contribution" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Donation Categories</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={donationCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {donationCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Impact Metrics Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>CO₂ Saved</CardDescription>
                  <CardTitle className="text-3xl">{impactData.co2Saved} tons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-600">
                      Equivalent to planting 430 trees
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Waste Reduced</CardDescription>
                  <CardTitle className="text-3xl">{impactData.wasteReduction} tons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-600">
                      From landfills and incineration
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>People Fed</CardDescription>
                  <CardTitle className="text-3xl">{impactData.peopleFed.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-500 mr-1" />
                    <p className="text-xs text-blue-600">
                      Throughout the year
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Communities Supported</CardDescription>
                  <CardTitle className="text-3xl">{impactData.communitiesSupported}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-blue-500 mr-1" />
                    <p className="text-xs text-blue-600">
                      In 12 states
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Impact Map</CardTitle>
                  <CardDescription>Geographic distribution of your impact</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center relative">
                  <img 
                    src={mapImageUrl} 
                    alt="India Impact Map" 
                    className="object-contain max-h-full"
                  />
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded shadow text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      <span>High Impact (70-100%)</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium Impact (40-69%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 bg-red-300 rounded-full"></div>
                      <span>Low Impact (0-39%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SDG Alignment</CardTitle>
                  <CardDescription>UN Sustainable Development Goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impactData.sdgAlignment.map((sdg, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded flex items-center justify-center bg-[#48773e] text-white mr-2 text-xs font-bold`}>
                            {sdg.goal}
                          </div>
                          <span className="text-sm">{sdg.name}</span>
                        </div>
                        <span className="text-sm font-medium">{sdg.contribution}%</span>
                      </div>
                      <Progress value={sdg.contribution} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Score Trend</CardTitle>
                <CardDescription>Monthly progress in environmental sustainability</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={environmentalImpactData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Impact Score"
                      stroke="#10B981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Fund Utilization Tab */}
          <TabsContent value="utilization" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Allocation Chart</CardTitle>
                  <CardDescription>How your donations are being utilized</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={utilizationData.allocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {utilizationData.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fund Distribution</CardTitle>
                  <CardDescription>Breakdown of utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {utilizationData.allocation.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-1.5" style={{ backgroundColor: `${item.color}20`, '--tw-progress-fill': item.color } as React.CSSProperties} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Cost Per Meal</CardDescription>
                  <CardTitle className="text-3xl flex items-center"><IndianRupee className="h-6 w-6 mr-1" />{utilizationData.costPerMeal}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Including logistics and distribution
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Admin Overhead</CardDescription>
                  <CardTitle className="text-3xl">{utilizationData.adminOverhead}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">
                    Below industry average of 15%
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Transparency Score</CardDescription>
                  <CardTitle className="text-3xl">92/100</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={92} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Reporting Tools Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <CardTitle>CSR Reports</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Annual Impact Report</p>
                        <p className="text-xs text-muted-foreground">Comprehensive overview of your impact</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Financial Summary</p>
                        <p className="text-xs text-muted-foreground">Detailed fund allocation</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Environmental Impact</p>
                        <p className="text-xs text-muted-foreground">Carbon footprint reduction</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Button className="w-full">Generate Custom Report</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    <CardTitle>Tax Documentation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">80G Certificate</p>
                        <p className="text-xs text-muted-foreground">Tax exemption document</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Donation Receipts</p>
                        <p className="text-xs text-muted-foreground">All transactions</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">CSR Statement</p>
                        <p className="text-xs text-muted-foreground">For corporate filing</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Request Custom Certificate</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-purple-500" />
                    <CardTitle>Shareable Content</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Impact Story</p>
                        <p className="text-xs text-muted-foreground">Community transformation</p>
                      </div>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Impact Metrics</p>
                        <p className="text-xs text-muted-foreground">Key statistics for social media</p>
                      </div>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Photo Gallery</p>
                        <p className="text-xs text-muted-foreground">15 high-quality images</p>
                      </div>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Create Social Post</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Reporting Calendar</CardTitle>
                <CardDescription>Upcoming report schedules and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upcoming reporting deadlines and scheduled reports</p>
                </div>
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Quarterly CSR Report</p>
                      <p className="text-xs text-muted-foreground">Due in 15 days</p>
                    </div>
                    <Button size="sm">Prepare</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Annual Compliance Filing</p>
                      <p className="text-xs text-muted-foreground">Due in 45 days</p>
                    </div>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Impact Newsletter</p>
                      <p className="text-xs text-muted-foreground">Monthly - Next: 7 days</p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Engagement Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Volunteer Hours</CardDescription>
                  <CardTitle className="text-3xl">{employeeData.volunteerHours}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    By 85 employees this year
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Employee Donations</CardDescription>
                  <CardTitle className="text-3xl flex items-center"><IndianRupee className="h-6 w-6 mr-1" />{(employeeData.employeeDonations/100000).toFixed(1)}L</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    From 124 team members
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Company Matched</CardDescription>
                  <CardTitle className="text-3xl flex items-center"><IndianRupee className="h-6 w-6 mr-1" />{(employeeData.companyMatched/100000).toFixed(1)}L</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    100% matching program
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Contributions</CardTitle>
                  <CardDescription>Top contributing teams</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={employeeData.topDepartments}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Contribution"]} />
                      <Bar dataKey="contribution" fill="#8B5CF6" name="Amount" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recognition Highlights</CardTitle>
                  <CardDescription>Top contributors this quarter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src="/lovable-uploads/5dd1b7e9-5b3f-4c3c-9099-4aff084b8520.png" 
                        alt="Engineering Team" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">Engineering Team</p>
                        <p className="text-xs text-muted-foreground">Most volunteer hours: 450 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <img 
                        src="/lovable-uploads/d679d7ac-4e87-4a72-8b58-c2ab588c09c7.png" 
                        alt="Rajeev Kumar" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">Rajeev Kumar</p>
                        <p className="text-xs text-muted-foreground">Highest individual donation: ₹45K</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Marketing Team</p>
                        <p className="text-xs text-muted-foreground">Most consistent participation: 92%</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Contributors</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Activities</CardTitle>
                <CardDescription>Upcoming and recent events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Food Distribution Drive</p>
                      <p className="text-xs text-muted-foreground">Next Saturday, 10 AM - 2 PM</p>
                    </div>
                    <Button size="sm">Sign Up</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">CSR Awareness Workshop</p>
                      <p className="text-xs text-muted-foreground">Aug 15, Virtual Event</p>
                    </div>
                    <Button size="sm" variant="outline">Learn More</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Team Fundraising Challenge</p>
                      <p className="text-xs text-muted-foreground">Ongoing until Sep 30</p>
                    </div>
                    <Button size="sm" variant="outline">View Status</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default CSRDashboardPage;
