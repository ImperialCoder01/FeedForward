import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Store, 
  Users, 
  Search, 
  Filter, 
  MapPin,
  Star,
  ChevronsUpDown,
  ChevronDown,
  Briefcase
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample data for organizations
const organizations = [
  {
    id: 1,
    name: "Mumbai Food Bank",
    type: "ngo",
    logo: "/images/organizations/mumbai-food-bank-logo.png",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    donationsMade: 0,
    donationsClaimed: 247,
    description: "Working to eliminate hunger in Mumbai by distributing surplus food to those in need.",
    impact: "Served over 10,000 meals to the homeless and underprivileged",
    contact: "contact@mumbaifoodbank.org",
    phone: "+91-22-12345678",
    website: "www.mumbaifoodbank.org",
    address: "123 Charity Lane, Andheri East, Mumbai",
    ranking: 1,
    verificationStatus: "verified",
    joinedDate: "2023-02-15",
    focusArea: "Homeless & Urban Poor",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtwPk_BGzCkcgwlY8vbs0I3l2HR_ToKoi40snbwy1y5j-gtflVPut4SQF4Nh_O_In2Yo&usqp=CAU"
  },
  {
    id: 2,
    name: "Taj Hotels Mumbai",
    type: "company",
    logo: "/images/organizations/taj-hotels-logo.png",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    donationsMade: 189,
    donationsClaimed: 0,
    description: "Luxury hotel chain committed to sustainable practices including food waste reduction.",
    impact: "Donated 5 tons of quality food to local charities in 2024",
    contact: "csr@tajhotels.com",
    phone: "+91-22-66574000",
    website: "www.tajhotels.com",
    address: "Apollo Bunder, Mumbai",
    ranking: 2,
    verificationStatus: "verified",
    joinedDate: "2023-05-10",
    focusArea: "Luxury Hospitality",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOLfJMWws6sGwuaWwlob2x59EUA0YptYL_A&s"
  },
  {
    id: 3,
    name: "D-Mart Powai",
    type: "shop",
    logo: "/images/organizations/dmart-logo.png",
    location: "Powai, Mumbai",
    rating: 4.3,
    donationsMade: 134,
    donationsClaimed: 0,
    description: "Hypermarket chain dedicated to reducing food waste through our partnership program.",
    impact: "Prevented 1.2 tons of food from being wasted monthly",
    contact: "manager.powai@dmart.in",
    phone: "+91-22-28574526",
    website: "www.dmart.in",
    address: "Central Avenue, Hiranandani Gardens, Powai",
    ranking: 5,
    verificationStatus: "verified",
    joinedDate: "2023-07-22",
    focusArea: "Grocery & Retail",
    coverImage: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2024-07/BeFunky-collage%20-%202024-07-15T110428.241.jpg"
  },
  {
    id: 4,
    name: "TechForGood Inc.",
    type: "sponsor",
    logo: "/images/organizations/tech-for-good-logo.png",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    donationsMade: 0,
    donationsClaimed: 0,
    description: "Tech company providing funding and technical support for food rescue operations.",
    impact: "Funded the development of FeedForward's mobile app and logistics system",
    contact: "partnerships@techforgood.com",
    phone: "+91-80-45678901",
    website: "www.techforgood.com",
    address: "Tech Park, Electronic City, Bangalore",
    ranking: 3,
    verificationStatus: "verified",
    joinedDate: "2023-03-05",
    focusArea: "CSR & Technology Sponsorship",
    coverImage: "https://static.wixstatic.com/media/661f94_0104bb38921242649a7f86ac1bab0ff0~mv2.png"
  },
  {
    id: 5,
    name: "Community Kitchen Network",
    type: "ngo",
    logo: "/images/organizations/ckn-logo.png",
    location: "Delhi, NCR",
    rating: 4.5,
    donationsMade: 0,
    donationsClaimed: 205,
    description: "Network of community kitchens serving fresh meals to underprivileged communities.",
    impact: "Operating 12 kitchens across Delhi NCR serving 5000+ meals daily",
    contact: "info@ckn.org",
    phone: "+91-11-28574680",
    website: "www.communitykitchennetwork.org",
    address: "45 Social Welfare Road, Delhi",
    ranking: 4,
    verificationStatus: "verified",
    joinedDate: "2023-01-18",
    focusArea: "Community Feeding Programs",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcorAou92nEnYqK6gOb58_K0k9hLPYYA_Qw&s"
  },
  {
    id: 6,
    name: "Green Grocers Cooperative",
    type: "shop",
    logo: "/placeholder.svg",
    location: "Pune, Maharashtra",
    rating: 4.2,
    donationsMade: 87,
    donationsClaimed: 0,
    description: "Cooperative grocery store with strong commitment to sustainability and reducing waste.",
    impact: "Donated all unsold produce to local shelters, approximately 500kg monthly",
    contact: "manager@greengrocers.coop",
    phone: "+91-20-25470123",
    website: "www.greengrocers.coop",
    address: "123 Sustainable Market, Koregaon Park, Pune",
    ranking: 7,
    verificationStatus: "verified",
    joinedDate: "2023-08-15",
    focusArea: "Sustainable Retail",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxgs9SgBffPyZJj79_zxjziaABsT0ukbeV2w&s"
  },
  {
    id: 7,
    name: "Marriott Chennai",
    type: "company",
    logo: "/placeholder.svg",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    donationsMade: 152,
    donationsClaimed: 0,
    description: "Luxury hotel with active food waste management and donation program.",
    impact: "Reduced food waste by 30% and donated 4 tons of food in 2023",
    contact: "sustainability@marriottchennai.com",
    phone: "+91-44-28574920",
    website: "www.marriott.com/chennai",
    address: "235 Beachfront Road, Chennai",
    ranking: 6,
    verificationStatus: "verified",
    joinedDate: "2023-04-28",
    focusArea: "Hospitality & Events",
    coverImage: "https://pointsmath.com/wp-content/uploads/2023/01/Ultimate-Guide-to-Marriott-Bonvoy-India-.jpg"
  },
  {
    id: 8,
    name: "EcoFoundation",
    type: "sponsor",
    logo: "/placeholder.svg",
    location: "Mumbai, Maharashtra",
    rating: 4.4,
    donationsMade: 0,
    donationsClaimed: 0,
    description: "Environmental foundation providing grants for sustainability projects including food waste reduction.",
    impact: "Funded 25 food rescue projects across India in 2023",
    contact: "grants@ecofoundation.org",
    phone: "+91-22-26745902",
    website: "www.ecofoundation.org",
    address: "Green Building, Bandra West, Mumbai",
    ranking: 9,
    verificationStatus: "verified",
    joinedDate: "2023-06-10",
    focusArea: "Environmental Sustainability",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUbkKbceDQ9FG17-XkJK2DYUvGpOy7ruJ-fQ&s"
  },
];

// Sample data for food donations
const foodDonations = [
  {
    id: 1,
    title: "Fresh Vegetables from Weekend Farmer's Market",
    type: "Produce",
    quantity: "50 kg",
    location: "Bandra Farmer's Market",
    donatedBy: "Green Earth Farms",
    expiryDate: "2025-04-27", // tomorrow
    status: "available",
    createdAt: "2025-04-25T10:30:00Z",
    foodType: "veg",
    description: "Assorted vegetables including tomatoes, cucumbers, and carrots left over from our weekend market stall.",
    pickupInstructions: "Please bring your own containers. Available for pickup between 5PM-7PM today."
  },
  {
    id: 2,
    title: "Catered Lunch Surplus",
    type: "Prepared Food",
    quantity: "25 meals",
    location: "TechCorp Office, Powai",
    donatedBy: "TechCorp Ltd.",
    expiryDate: "2025-04-25", // today
    status: "urgent",
    createdAt: "2025-04-25T14:00:00Z",
    foodType: "veg",
    description: "Vegetarian lunch boxes from a corporate event. Includes rice, dal, and vegetable curry.",
    pickupInstructions: "Contact security desk at main entrance. Must be picked up by 7PM today."
  },
  {
    id: 3,
    title: "Bread and Pastries",
    type: "Bakery",
    quantity: "30 items",
    location: "Daily Bread Bakery, Andheri",
    donatedBy: "Daily Bread",
    expiryDate: "2025-04-26", // day after tomorrow
    status: "available",
    createdAt: "2025-04-25T16:45:00Z",
    foodType: "veg",
    description: "Assorted bread loaves, buns, and pastries baked this morning. Still fresh and of good quality.",
    pickupInstructions: "Available after closing hours (8PM). Ask for manager."
  },
  {
    id: 4,
    title: "Wedding Reception Leftovers",
    type: "Prepared Food",
    quantity: "100+ servings",
    location: "Grand Marriott, Juhu",
    donatedBy: "Marriott Hotel",
    expiryDate: "2025-04-25", // today
    status: "urgent",
    createdAt: "2025-04-25T22:00:00Z",
    foodType: "non-veg",
    description: "Large quantity of untouched food from wedding reception. Various dishes including vegetarian and non-vegetarian options.",
    pickupInstructions: "Enter through service entrance. Call event manager upon arrival. Must be picked up tonight."
  },
  {
    id: 5,
    title: "Milk and Dairy Products",
    type: "Dairy",
    quantity: "40 liters of milk, 20kg yogurt",
    location: "FreshMart Supermarket, Colaba",
    donatedBy: "FreshMart",
    expiryDate: "2025-04-27", // two days from now
    status: "available",
    createdAt: "2025-04-25T09:15:00Z",
    foodType: "veg",
    description: "Full-fat and toned milk packages, plain yogurt. Approaching sell-by date but still fresh.",
    pickupInstructions: "Ask for store manager. Available between 5PM-7PM."
  },
  {
    id: 6,
    title: "Fresh Fruit Assortment",
    type: "Produce",
    quantity: "30 kg",
    location: "Organic Heaven Store, Bandra",
    donatedBy: "Organic Heaven",
    expiryDate: "2025-04-28", // three days from now
    status: "available",
    createdAt: "2025-04-25T11:20:00Z",
    foodType: "veg",
    description: "Mixed fruits including bananas, apples, and oranges. Slightly blemished but perfectly edible.",
    pickupInstructions: "Come to back entrance between 7PM-8PM. Call store before arriving."
  },
];

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("organizations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrgType, setSelectedOrgType] = useState("all");
  const [selectedFoodType, setSelectedFoodType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [expandedOrganization, setExpandedOrganization] = useState<number | null>(null);
  const [expandedDonation, setExpandedDonation] = useState<number | null>(null);
  
  // Filter organizations based on search and filters
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = !searchQuery || 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = selectedOrgType === "all" || org.type === selectedOrgType;
    
    return matchesSearch && matchesType;
  });
  
  // Sort organizations based on selected sort option
  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "donations") {
      return (b.donationsMade + b.donationsClaimed) - (a.donationsMade + a.donationsClaimed);
    } else if (sortBy === "ranking") {
      return a.ranking - b.ranking;
    }
    // Default to sorting by ID (recent)
    return a.id - b.id;
  });
  
  // Filter donations based on search and filters
  const filteredDonations = foodDonations.filter(donation => {
    const matchesSearch = !searchQuery || 
      donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donatedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || donation.type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesFoodType = selectedFoodType === "all" || donation.foodType === selectedFoodType;
    
    return matchesSearch && matchesCategory && matchesFoodType;
  });
  
  // Sort donations based on urgency/expiry date
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    // First sort by status (urgent first)
    if (a.status === "urgent" && b.status !== "urgent") return -1;
    if (a.status !== "urgent" && b.status === "urgent") return 1;
    
    // Then by expiry date
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });

  // Function to render organization type icon
  const renderOrgTypeIcon = (type: string) => {
    switch (type) {
      case "ngo":
        return <Users className="h-5 w-5" />;
      case "company":
        return <Building className="h-5 w-5" />;
      case "shop":
        return <Store className="h-5 w-5" />;
      case "sponsor":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };
  
  // Function to render organization type in human-readable form
  const getOrgTypeName = (type: string) => {
    switch (type) {
      case "ngo":
        return "NGO";
      case "company":
        return "Company";
      case "shop":
        return "Shop/Mart";
      case "sponsor":
        return "Sponsor/CSR";
      default:
        return type;
    }
  };
  
  // Function to get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "claimed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "";
    }
  };
  
  return (
    <div className="container py-8 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Explore
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover food donations and organizations in our community
        </p>
      </div>

      <Tabs defaultValue="organizations" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="donations">Available Food</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={activeTab === "organizations" ? "Search organizations..." : "Search food donations..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {activeTab === "organizations" ? (
            <Select value={selectedOrgType} onValueChange={setSelectedOrgType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Organization Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ngo">NGOs</SelectItem>
                <SelectItem value="company">Companies</SelectItem>
                <SelectItem value="shop">Shops/Marts</SelectItem>
                <SelectItem value="sponsor">Sponsors/CSR</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Food Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Produce">Produce</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Prepared Food">Prepared Food</SelectItem>
                  <SelectItem value="Packaged">Packaged</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedFoodType} onValueChange={setSelectedFoodType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Food Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {activeTab === "organizations" ? (
                <>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="donations">Most Active</SelectItem>
                  <SelectItem value="ranking">Top Ranked</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="quantity">Highest Quantity</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <TabsContent value="organizations" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedOrganizations.length > 0 ? (
              sortedOrganizations.map((org) => (
                <Card key={org.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-36 w-full">
                      <img
                        src={org.coverImage}
                        alt={org.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-white">
                            <AvatarImage 
                              src={org.logo} 
                              alt={org.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                            <AvatarFallback className="bg-primary/10">{org.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{org.name}</p>
                            <div className="flex items-center text-xs text-white/80 gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{org.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-black/20 backdrop-blur border-white/40 text-white">
                          {getOrgTypeName(org.type)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{org.rating.toFixed(1)}</span>
                        </div>
                        
                        <Badge variant={org.verificationStatus === "verified" ? "outline" : "secondary"} className={
                          org.verificationStatus === "verified" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : ""
                        }>
                          {org.verificationStatus === "verified" ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-xs">Donations Made</p>
                          <p className="font-medium">{org.donationsMade.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-xs">Donations Claimed</p>
                          <p className="font-medium">{org.donationsClaimed.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="line-clamp-2 text-sm text-muted-foreground">
                        {org.description}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex items-center gap-1"
                      onClick={() => setExpandedOrganization(expandedOrganization === org.id ? null : org.id)}
                    >
                      {expandedOrganization === org.id ? "Show Less" : "View Details"}
                      <ChevronsUpDown className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                  
                  <Collapsible open={expandedOrganization === org.id}>
                    <CollapsibleContent>
                      <div className="px-6 py-4 space-y-4 border-t">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Impact</h4>
                          <p className="text-sm text-muted-foreground">{org.impact}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Email:</span> {org.contact}</p>
                            <p><span className="text-muted-foreground">Phone:</span> {org.phone}</p>
                            <p><span className="text-muted-foreground">Website:</span> {org.website}</p>
                            <p><span className="text-muted-foreground">Address:</span> {org.address}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1">Focus Area</h4>
                            <p>{org.focusArea}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1">Joined</h4>
                            <p>{new Date(org.joinedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button size="sm" className="w-full">
                            Contact Organization
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Organizations Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="donations" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedDonations.length > 0 ? (
              sortedDonations.map((donation) => {
                const isExpiringSoon = new Date(donation.expiryDate).getTime() - new Date().getTime() < 24*60*60*1000;
                const isExpired = new Date(donation.expiryDate).getTime() < new Date().getTime();
                
                return (
                  <Card key={donation.id} className={`overflow-hidden ${
                    donation.status === "urgent" ? "border-red-400 dark:border-red-500" : ""
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={donation.status === "urgent" ? "destructive" : "outline"} className={getStatusBadgeClass(donation.status)}>
                          {donation.status === "urgent" ? "Urgent" : donation.status === "claimed" ? "Claimed" : "Available"}
                        </Badge>
                        <Badge variant="outline" className={
                          donation.foodType === "veg" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        }>
                          {donation.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{donation.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Store className="h-3 w-3" />
                        Donated by {donation.donatedBy}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-xs">Type</p>
                            <p className="font-medium">{donation.type}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-xs">Quantity</p>
                            <p className="font-medium">{donation.quantity}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-xs">Location</p>
                            <p className="font-medium">{donation.location}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground text-xs">Expiry</p>
                            <p className={`font-medium ${isExpired ? "text-red-500" : isExpiringSoon ? "text-amber-500" : ""}`}>
                              {isExpired ? "Expired" : new Date(donation.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="line-clamp-2 text-sm text-muted-foreground">
                          {donation.description}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center gap-1"
                        onClick={() => setExpandedDonation(expandedDonation === donation.id ? null : donation.id)}
                      >
                        {expandedDonation === donation.id ? "Show Less" : "View Details"}
                        <ChevronsUpDown className="h-3 w-3" />
                      </Button>
                      
                      <Button size="sm" className="w-full" disabled={isExpired}>
                        {isExpired ? "Expired" : "Claim This Food"}
                      </Button>
                    </CardFooter>
                    
                    <Collapsible open={expandedDonation === donation.id}>
                      <CollapsibleContent>
                        <div className="px-6 py-4 space-y-4 border-t">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{donation.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Pickup Instructions</h4>
                            <p className="text-sm text-muted-foreground">{donation.pickupInstructions}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Posted</h4>
                              <p>{new Date(donation.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">ID</h4>
                              <p className="font-mono">{donation.id}</p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Food Donations Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
