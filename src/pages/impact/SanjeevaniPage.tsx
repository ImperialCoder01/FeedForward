import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Compass, 
  Heart, 
  MapPin, 
  Package, 
  Users, 
  Activity,
  ArrowRight,
  PlusCircle,
  Thermometer 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DisasterCard } from "@/components/disaster/DisasterCard";
import { ReliefKitCard } from "@/components/disaster/ReliefKitCard";
import { DisasterTimeline } from "@/components/disaster/DisasterTimeline";
import { useNavigate } from "react-router-dom";
import { DonationConfirmDialog } from "@/components/disaster/DonationConfirmDialog";

// Sample data for active disasters
const activeDisasters = [
  {
    id: "1",
    type: "Flood",
    name: "Maharashtra Flood Crisis",
    location: "Mumbai, Maharashtra",
    date: "2025-04-22",
    severity: "High",
    casualties: 12,
    displaced: 5000,
    urgentNeeds: ["Clean Water", "Food", "Medicine", "Shelter"],
    target: 1000000,
    raised: 450000,
    imageUrl: "https://images.indianexpress.com/2019/08/flood.jpg",
    updates: [
      { date: "2025-04-22", content: "Flood waters rising in Mumbai suburbs" },
      { date: "2025-04-23", content: "Rescue operations underway in affected areas" },
      { date: "2025-04-24", content: "Relief camps established in 5 locations" }
    ]
  },
  {
    id: "2",
    type: "Cyclone",
    name: "Cyclone Vaayu",
    location: "Odisha Coast",
    date: "2025-04-18",
    severity: "Severe",
    casualties: 23,
    displaced: 12000,
    urgentNeeds: ["Shelter", "Medical Aid", "Food Supplies", "Clothing"],
    target: 2500000,
    raised: 1200000,
    imageUrl: "https://images.unsplash.com/photo-1514632595-4944383f2737",
    updates: [
      { date: "2025-04-18", content: "Cyclone makes landfall near Puri" },
      { date: "2025-04-19", content: "Extensive damage to coastal villages reported" },
      { date: "2025-04-20", content: "National Disaster Response Force deployed" }
    ]
  },
  {
    id: "3",
    type: "Earthquake",
    name: "Uttarakhand Earthquake",
    location: "Chamoli, Uttarakhand",
    date: "2025-04-15",
    severity: "Moderate",
    casualties: 7,
    displaced: 2000,
    urgentNeeds: ["Tents", "Blankets", "Medicine", "Food"],
    target: 1500000,
    raised: 800000,
    imageUrl: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf",
    updates: [
      { date: "2025-04-15", content: "5.8 magnitude earthquake strikes Chamoli district" },
      { date: "2025-04-16", content: "Multiple villages affected, infrastructure damaged" },
      { date: "2025-04-17", content: "Relief operations focused on remote mountain villages" }
    ]
  },
  {
    id: "4",
    type: "Drought",
    name: "Marathwada Drought",
    location: "Marathwada Region, Maharashtra",
    date: "2025-03-01",
    severity: "Severe",
    casualties: 0,
    displaced: 0,
    urgentNeeds: ["Water Tankers", "Food Grain", "Fodder for Livestock", "Agricultural Support"],
    target: 3000000,
    raised: 1500000,
    imageUrl: "https://images.unsplash.com/photo-1594799446379-c5f6831e8e0c",
    updates: [
      { date: "2025-03-01", content: "Severe drought declared in Marathwada region" },
      { date: "2025-03-15", content: "Water levels critically low in reservoirs" },
      { date: "2025-04-01", content: "Government initiates water supply via rail tankers" }
    ]
  }
];

// Relief kit data
const reliefKits = [
  {
    id: "kit1",
    name: "Food Kit",
    price: 500,
    imageUrl: "https://images.unsplash.com/photo-1531662937419-c13785f7b8d0",
    description: "Essentials for a family of 4 for one week",
    contents: ["Rice (5kg)", "Wheat Flour (5kg)", "Pulses (2kg)", "Salt, Sugar & Spices", "Cooking Oil (1L)", "Ready-to-eat Items"],
    peopleServed: 4,
    durationDays: 7
  },
  {
    id: "kit2",
    name: "Medical Kit",
    price: 1000,
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde",
    description: "Basic medical supplies for emergency situations",
    contents: ["First Aid Items", "OTC Medications", "Bandages & Dressings", "Antiseptics", "Medical Equipment", "Health Supplements"],
    peopleServed: 10,
    durationDays: 14
  },
  {
    id: "kit3",
    name: "Shelter Kit",
    price: 2500,
    imageUrl: "https://images.unsplash.com/photo-1580223530067-b48401a7efb7",
    description: "Emergency shelter and living essentials",
    contents: ["Disaster Relief Tent", "Tarpaulins", "Sleeping Mats", "Blankets (4)", "Emergency Lights", "Basic Tools"],
    peopleServed: 5,
    durationDays: 30
  },
  {
    id: "kit4",
    name: "Hygiene Kit",
    price: 800,
    imageUrl: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb",
    description: "Essential hygiene supplies for disaster situations",
    contents: ["Soap & Hand Sanitizer", "Toothbrushes & Toothpaste", "Sanitary Products", "Washing Powder", "Clean Water Tablets", "Mosquito Nets"],
    peopleServed: 4,
    durationDays: 14
  },
  {
    id: "kit5",
    name: "Transport Support",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    description: "Funding for emergency transport & logistics",
    contents: ["Fuel for Relief Vehicles", "Volunteer Transport", "Distribution Logistics", "Last-mile Delivery", "Evacuation Support"],
    peopleServed: 25,
    durationDays: 7
  },
  {
    id: "kit6",
    name: "Children's Care Kit",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85",
    description: "Specialized care items for affected children",
    contents: ["Children's Food Items", "Clothing", "Educational Materials", "Play Items", "Infant Supplies", "Child Medicines"],
    peopleServed: 3,
    durationDays: 14
  }
];

// Impact metrics data
const impactMetrics = {
  totalDonations: 8600000,
  foodDonated: 25000,
  mealsProvided: 150000,
  livesImpacted: 35000,
  disastersResponded: 12
};

const SanjeevaniPage = () => {
  const navigate = useNavigate();
  const [disasterFilter, setDisasterFilter] = useState("all");
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState("disasters");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Filter disasters based on type
  const filteredDisasters = disasterFilter === "all" 
    ? activeDisasters 
    : activeDisasters.filter(disaster => disaster.type.toLowerCase() === disasterFilter.toLowerCase());

  const handleDonateKit = (kitId: string) => {
    // In a real app, this would navigate to a checkout page or open a payment modal
    toast.success(`Thank you for donating ${reliefKits.find(kit => kit.id === kitId)?.name}!`);
  };

  const handleCustomDonation = () => {
    if (!customAmount || parseFloat(customAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    toast.success(`Thank you for your generous donation of ₹${customAmount}!`);
    setCustomAmount("");
  };

  const handleViewDisasterDetails = (disasterId: string) => {
    setSelectedDisaster(disasterId);
    setActiveTab("details");
  };

  const handleBackToDisasters = () => {
    setSelectedDisaster(null);
    setActiveTab("disasters");
  };

  // Get the selected disaster details when needed
  const disasterDetails = selectedDisaster 
    ? activeDisasters.find(d => d.id === selectedDisaster) 
    : null;

    const handleDonateClick = () => {
      if (!customAmount || parseFloat(customAmount) <= 0) {
        toast.error("Please enter a valid donation amount");
        return;
      }
      setIsConfirmOpen(true);
    };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header Section with Impact Metrics */}
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-red-500 text-transparent">
            SANJEEVANI
          </h1>
          <p className="text-xl text-muted-foreground">
            Direct Relief When It Matters Most
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <div className="bg-background border rounded-lg p-4 shadow-sm">
            <p className="text-2xl md:text-3xl font-bold">₹{(impactMetrics.totalDonations/100000).toFixed(1)}L</p>
            <p className="text-sm text-muted-foreground">Total Donations</p>
          </div>
          <div className="bg-background border rounded-lg p-4 shadow-sm">
            <p className="text-2xl md:text-3xl font-bold">{(impactMetrics.foodDonated/1000).toFixed(1)}K kg</p>
            <p className="text-sm text-muted-foreground">Food Donated</p>
          </div>
          <div className="bg-background border rounded-lg p-4 shadow-sm">
            <p className="text-2xl md:text-3xl font-bold">{(impactMetrics.mealsProvided/1000).toFixed(1)}K</p>
            <p className="text-sm text-muted-foreground">Meals Provided</p>
          </div>
          <div className="bg-background border rounded-lg p-4 shadow-sm">
            <p className="text-2xl md:text-3xl font-bold">{(impactMetrics.livesImpacted/1000).toFixed(1)}K</p>
            <p className="text-sm text-muted-foreground">Lives Impacted</p>
          </div>
          <div className="bg-background border rounded-lg p-4 shadow-sm">
            <p className="text-2xl md:text-3xl font-bold">{impactMetrics.disastersResponded}</p>
            <p className="text-sm text-muted-foreground">Disasters Responded</p>
          </div>
        </motion.div>

        <Button 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 text-white px-8"
          onClick={() => setActiveTab("donate")}
        >
          Donate Now
        </Button>
      </section>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="disasters">Active Disasters</TabsTrigger>
          <TabsTrigger value="donate">Relief Kits</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedDisaster}>Disaster Details</TabsTrigger>
        </TabsList>

        {/* Active Disasters Dashboard */}
        <TabsContent value="disasters" className="space-y-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <Select value={disasterFilter} onValueChange={setDisasterFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Disasters</SelectItem>
                  <SelectItem value="flood">Floods</SelectItem>
                  <SelectItem value="cyclone">Cyclones</SelectItem>
                  <SelectItem value="earthquake">Earthquakes</SelectItem>
                  <SelectItem value="drought">Droughts</SelectItem>
                  <SelectItem value="fire">Fires</SelectItem>
                </SelectContent>
              </Select>
              
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">
                <AlertTriangle className="mr-1 h-3 w-3" /> {filteredDisasters.length} Active Disasters
              </Badge>
            </div>
          </div>

          {filteredDisasters.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">No active disasters match your filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDisasters.map((disaster) => (
                <DisasterCard 
                  key={disaster.id} 
                  disaster={disaster} 
                  onViewDetails={() => handleViewDisasterDetails(disaster.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Relief Kit Donations */}
        <TabsContent value="donate" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reliefKits.map((kit) => (
              <ReliefKitCard
                key={kit.id}
                kit={kit}
                onDonate={() => handleDonateKit(kit.id)}
              />
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Custom Donation Amount</CardTitle>
              <CardDescription>
                Support disaster relief efforts with your chosen amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="pl-7" 
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDonateClick}
                >
                  Donate
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span>100% to Relief</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Tax Benefits</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                <span>Impact Reports</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Disaster Details */}
        <TabsContent value="details" className="space-y-6">
          {disasterDetails && (
            <>
              <Button 
                variant="ghost" 
                className="mb-4" 
                onClick={handleBackToDisasters}
              >
                ← Back to Disasters
              </Button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <div className="h-64 w-full overflow-hidden">
                      <img 
                        src={disasterDetails.imageUrl} 
                        alt={disasterDetails.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2 bg-red-100 text-red-600 hover:bg-red-200 border-red-200">
                            {disasterDetails.type}
                          </Badge>
                          <CardTitle>{disasterDetails.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className={
                          disasterDetails.severity === "High" || disasterDetails.severity === "Severe" 
                            ? "bg-red-50 text-red-600" 
                            : "bg-yellow-50 text-yellow-600"
                        }>
                          {disasterDetails.severity} Severity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{disasterDetails.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Started: {new Date(disasterDetails.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{disasterDetails.displaced.toLocaleString()} Displaced</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Urgent Needs</h4>
                        <div className="flex flex-wrap gap-2">
                          {disasterDetails.urgentNeeds.map((need, index) => (
                            <Badge key={index} variant="secondary">{need}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Funding Progress</h4>
                        <Progress value={(disasterDetails.raised / disasterDetails.target) * 100} className="h-2" />
                        <div className="flex justify-between text-sm mt-1">
                          <span>₹{(disasterDetails.raised/100000).toFixed(1)}L raised</span>
                          <span>Target: ₹{(disasterDetails.target/100000).toFixed(1)}L</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Situation Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DisasterTimeline updates={disasterDetails.updates} />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-red-700">Donate to This Disaster</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-red-600">₹</span>
                        <Input 
                          type="number" 
                          placeholder="Enter amount" 
                          className="pl-7 border-red-200 focus:border-red-400" 
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" 
                          className="border-red-200 hover:bg-red-100"
                          onClick={() => setCustomAmount("500")}
                        >
                          ₹500
                        </Button>
                        <Button variant="outline" 
                          className="border-red-200 hover:bg-red-100"
                          onClick={() => setCustomAmount("1000")}
                        >
                          ₹1,000
                        </Button>
                        <Button variant="outline" 
                          className="border-red-200 hover:bg-red-100"
                          onClick={() => setCustomAmount("2000")}
                        >
                          ₹2,000
                        </Button>
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDonateClick}
                      >
                        Donate Now
                      </Button>
                      
                      <div className="text-center text-sm text-red-700">
                        100% of your donation goes directly to relief efforts
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Volunteer Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Food Distribution</p>
                          <p className="text-xs text-muted-foreground">Mumbai, Maharashtra</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Medical Support</p>
                          <p className="text-xs text-muted-foreground">Pune, Maharashtra</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Rescue Operations</p>
                          <p className="text-xs text-muted-foreground">Thane, Maharashtra</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                      
                      <Button variant="ghost" className="w-full mt-2">
                        View All Opportunities
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Relief Partners</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">Red Cross India</Badge>
                        <Badge variant="outline">Doctors Without Borders</Badge>
                        <Badge variant="outline">Goonj</Badge>
                        <Badge variant="outline">ActionAid</Badge>
                        <Badge variant="outline">Habitat for Humanity</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      <DonationConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        amount={customAmount}
        onConfirm={handleCustomDonation}
      />
    </div>
  );
};

export default SanjeevaniPage;
