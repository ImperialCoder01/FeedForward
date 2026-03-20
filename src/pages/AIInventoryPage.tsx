
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Database, List, Calendar, Tag, Filter, FileCheck, FileWarning, SendHorizonal, AlertCircle, Crown, Zap, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import listingService from "@/services/listings";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysLeft: number;
  quantity: number;
  unit: string;
  foodType: "veg" | "non-veg";
  status: "expiring-soon" | "critical" | "good";
}

// Sample inventory data
const sampleInventory: InventoryItem[] = [
  {
    id: "INV001",
    name: "Full Cream Milk",
    category: "Dairy",
    expiryDate: "2025-04-29",
    daysLeft: 4,
    quantity: 24,
    unit: "liters",
    foodType: "veg",
    status: "expiring-soon"
  },
  {
    id: "INV002",
    name: "Whole Wheat Bread",
    category: "Bakery",
    expiryDate: "2025-04-27",
    daysLeft: 2,
    quantity: 15,
    unit: "loaves",
    foodType: "veg",
    status: "expiring-soon"
  },
  {
    id: "INV003",
    name: "Greek Yogurt",
    category: "Dairy",
    expiryDate: "2025-04-28",
    daysLeft: 3,
    quantity: 30,
    unit: "cups",
    foodType: "veg",
    status: "expiring-soon"
  },
  {
    id: "INV004",
    name: "Chicken Breasts",
    category: "Meat",
    expiryDate: "2025-04-26",
    daysLeft: 1,
    quantity: 10,
    unit: "kg",
    foodType: "non-veg",
    status: "critical"
  },
  {
    id: "INV005",
    name: "Fresh Spinach",
    category: "Produce",
    expiryDate: "2025-04-27",
    daysLeft: 2,
    quantity: 8,
    unit: "kg",
    foodType: "veg",
    status: "expiring-soon"
  },
  {
    id: "INV006",
    name: "Orange Juice",
    category: "Beverages",
    expiryDate: "2025-05-05",
    daysLeft: 10,
    quantity: 12,
    unit: "bottles",
    foodType: "veg",
    status: "good"
  },
  {
    id: "INV007",
    name: "Eggs",
    category: "Dairy",
    expiryDate: "2025-05-03",
    daysLeft: 8,
    quantity: 120,
    unit: "pieces",
    foodType: "non-veg",
    status: "good"
  },
  {
    id: "INV008",
    name: "Chocolate Ice Cream",
    category: "Frozen",
    expiryDate: "2025-06-15",
    daysLeft: 50,
    quantity: 15,
    unit: "tubs",
    foodType: "veg",
    status: "good"
  },
  {
    id: "INV009",
    name: "Tomato Soup",
    category: "Canned",
    expiryDate: "2025-04-27",
    daysLeft: 2,
    quantity: 20,
    unit: "cans",
    foodType: "veg",
    status: "expiring-soon"
  },
  {
    id: "INV010",
    name: "Mixed Vegetables",
    category: "Frozen",
    expiryDate: "2025-04-26",
    daysLeft: 1,
    quantity: 12,
    unit: "packs",
    foodType: "veg",
    status: "critical"
  }
];

// Inventory database connection options
const databaseOptions = [
  {
    name: "Direct POS Integration",
    id: "pos",
    description: "Connect directly to your Point of Sale system"
  },
  {
    name: "ERP Integration",
    id: "erp",
    description: "Connect to your Enterprise Resource Planning software"
  },
  {
    name: "CSV/Excel Import",
    id: "csv",
    description: "Upload inventory data from spreadsheets"
  },
  {
    name: "Manual Entry",
    id: "manual",
    description: "Add products manually to the system"
  }
];

const AIInventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentPlan, canCreateListing, remainingListings, listingStats, refreshListingStats } = useSubscription();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string>("");
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    foodType: "all",
    expiryRange: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  
  // AI processing states
  const [processingInventory, setProcessingInventory] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);

  // Function to filter inventory items
  const filteredInventory = sampleInventory.filter(item => {
    const matchesCategory = filters.category === "all" || item.category.toLowerCase() === filters.category;
    const matchesFoodType = filters.foodType === "all" || item.foodType === filters.foodType;
    const matchesExpiryRange = filters.expiryRange === "all" || 
      (filters.expiryRange === "critical" && item.daysLeft <= 1) ||
      (filters.expiryRange === "expiring-soon" && item.daysLeft > 1 && item.daysLeft <= 5) ||
      (filters.expiryRange === "good" && item.daysLeft > 5);
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesFoodType && matchesExpiryRange && matchesSearch;
  });

  const handleConnectDatabase = async () => {
    if (!selectedIntegration || !selectedDatabase) {
      toast.error("Please select both integration type and database");
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnected(true);
    setIsConnecting(false);
    setIsIntegrationDialogOpen(false);
    
    toast.success("Database connected successfully", {
      description: `Connected to ${selectedDatabase} via ${selectedIntegration}`
    });
    
    // Simulate AI processing the inventory
    startInventoryProcessing();
  };
  
  const startInventoryProcessing = () => {
    setProcessingInventory(true);
    setProcessProgress(0);
    
    const interval = setInterval(() => {
      setProcessProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingInventory(false);
          toast.success("Inventory analysis complete", {
            description: "AI has identified items nearing expiry"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };
  
  const handlePostAsFoodFlag = (item: InventoryItem) => {
    if (!isAuthenticated) {
      toast.error("Please login to post items");
      navigate("/login");
      return;
    }
    
    if (!canCreateListing) {
      toast.error("Listing limit reached", {
        description: `Upgrade to ${currentPlan?.name === 'Free' ? 'Pro' : 'a higher plan'} for more listings`
      });
      navigate("/plans");
      return;
    }
    
    setSelectedItem(item);
    setDonationDialogOpen(true);
  };
  
  const confirmDonation = async () => {
    if (!selectedItem) return;
    
    setIsPosting(true);
    try {
      const result = await listingService.createListing({
        user_id: 'current-user',
        title: selectedItem.name,
        description: `Expiring soon - ${selectedItem.quantity} ${selectedItem.unit} of ${selectedItem.category}`,
        category: selectedItem.category.toLowerCase(),
        food_type: selectedItem.foodType,
        quantity: selectedItem.quantity,
        unit: selectedItem.unit,
        price: 0,
        currency: 'feedcoin',
        expiry_date: selectedItem.expiryDate,
        status: 'active',
      });

      if (result.success) {
        toast.success(`Posted ${selectedItem.name} as a FoodFlag`, {
          description: "NGOs and volunteers can now claim this item"
        });
        await refreshListingStats();
      } else {
        toast.error("Failed to post", {
          description: result.error || "Please try again"
        });
      }
    } catch (error) {
      toast.error("Error posting item");
    } finally {
      setIsPosting(false);
      setDonationDialogOpen(false);
    }
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          AI Inventory Management
        </h1>
        <p className="text-xl text-muted-foreground">
          Smart tools to identify and redirect soon-to-expire items
        </p>
      </div>

      {/* Subscription Status Banner */}
      {isAuthenticated && currentPlan && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentPlan.name === 'Enterprise' ? (
                <Crown className="h-8 w-8 text-yellow-600" />
              ) : currentPlan.name === 'Pro' ? (
                <Zap className="h-8 w-8 text-purple-600" />
              ) : (
                <Badge className="h-8 px-3">Free</Badge>
              )}
              <div>
                <p className="font-semibold">{currentPlan.name} Plan</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.max_listings_unlimited 
                    ? 'Unlimited listings' 
                    : `${remainingListings || 0} of ${currentPlan.max_listings} listings remaining`}
                  {listingStats && listingStats.totalListings > 0 && (
                    <span className="ml-2">({listingStats.totalListings} created this month)</span>
                  )}
                </p>
              </div>
            </div>
            {!currentPlan.max_listings_unlimited && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/plans')}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                <Zap className="h-4 w-4 mr-2" />
                Upgrade for Unlimited
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Analytics Access Banner for Free Users */}
      {isAuthenticated && currentPlan && !currentPlan.analytics_access && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart className="h-5 w-5 text-amber-600" />
            <p className="text-sm">
              <strong>Unlock Analytics:</strong> Get detailed insights on your donations with Pro plan
            </p>
          </div>
          <Button size="sm" onClick={() => navigate('/plans')}>
            Upgrade
          </Button>
        </div>
      )}

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
          <TabsTrigger value="settings">Settings &amp; Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {isConnected ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold">
                        {filteredInventory.filter(i => i.status === "critical").length}
                      </CardTitle>
                      <CardDescription>Critical Items</CardDescription>
                    </div>
                    <FileWarning className="h-5 w-5 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Items expiring within 24 hours
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold">
                        {filteredInventory.filter(i => i.status === "expiring-soon").length}
                      </CardTitle>
                      <CardDescription>Expiring Soon</CardDescription>
                    </div>
                    <Calendar className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Items expiring within 2-5 days
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold">
                        {filteredInventory.filter(i => i.status === "good").length}
                      </CardTitle>
                      <CardDescription>Healthy Stock</CardDescription>
                    </div>
                    <FileCheck className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Items with good shelf life
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {processingInventory && (
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">AI processing inventory data</p>
                      <p>{processProgress}%</p>
                    </div>
                    <Progress value={processProgress} />
                    <p className="text-sm text-muted-foreground">
                      Analyzing expiration dates and identifying potential donations
                    </p>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Items Requiring Attention</h2>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm text-muted-foreground">Quick filters:</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFilters({...filters, expiryRange: "critical"})}
                    className={filters.expiryRange === "critical" ? "bg-red-100 dark:bg-red-900/20" : ""}
                  >
                    Critical (24h)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFilters({...filters, expiryRange: "expiring-soon"})}
                    className={filters.expiryRange === "expiring-soon" ? "bg-orange-100 dark:bg-orange-900/20" : ""}
                  >
                    Expiring Soon
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFilters({...filters, foodType: "veg"})}
                    className={filters.foodType === "veg" ? "bg-green-100 dark:bg-green-900/20" : ""}
                  >
                    Veg Only
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFilters({...filters, foodType: "non-veg"})}
                    className={filters.foodType === "non-veg" ? "bg-purple-100 dark:bg-purple-900/20" : ""}
                  >
                    Non-Veg
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFilters({category: "all", foodType: "all", expiryRange: "all"})}
                  >
                    Reset Filters
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Days Left</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Food Type</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory
                        .filter(item => item.status !== "good")
                        .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={item.daysLeft <= 1 ? "destructive" : "outline"} className={
                              item.daysLeft <= 1 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                              item.daysLeft <= 3 ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" :
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            }>
                              {item.daysLeft} {item.daysLeft === 1 ? "day" : "days"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.quantity} {item.unit}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              item.foodType === "veg" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                              "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            }>
                              {item.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              onClick={() => handlePostAsFoodFlag(item)}
                              className="flex items-center gap-1"
                            >
                              <SendHorizonal className="h-3.5 w-3.5" />
                              <span>Post as FoodFlag</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredInventory.filter(item => item.status !== "good").length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                            No items found matching your filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
              <Database className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Connect Your Inventory</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Connect your existing inventory database to identify soon-to-expire items and reduce food waste.
                </p>
              </div>
              <Button onClick={() => setIsIntegrationDialogOpen(true)} className="mt-4">
                Connect Inventory Database
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6 mt-6">
          {isConnected ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search inventory items..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="produce">Produce</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="frozen">Frozen</SelectItem>
                      <SelectItem value="canned">Canned</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filters.foodType} onValueChange={(value) => setFilters({...filters, foodType: value})}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Food Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filters.expiryRange} onValueChange={(value) => setFilters({...filters, expiryRange: value})}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Expiry Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="critical">Critical (24h)</SelectItem>
                      <SelectItem value="expiring-soon">Expiring Soon (2-5 days)</SelectItem>
                      <SelectItem value="good">Good Shelf Life (&gt;5 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id} className={
                        item.daysLeft <= 1 ? "bg-red-50/50 dark:bg-red-950/10" : 
                        item.daysLeft <= 5 ? "bg-orange-50/50 dark:bg-orange-950/10" : 
                        ""
                      }>
                        <TableCell className="font-mono">{item.id}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={item.daysLeft <= 1 ? "destructive" : "outline"} className={
                            item.daysLeft <= 1 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                            item.daysLeft <= 5 ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" :
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }>
                            {item.daysLeft} {item.daysLeft === 1 ? "day" : "days"}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.quantity} {item.unit}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            item.foodType === "veg" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          }>
                            {item.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handlePostAsFoodFlag(item)}
                            className="flex items-center gap-1"
                          >
                            <SendHorizonal className="h-3.5 w-3.5" />
                            <span>Post as FoodFlag</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInventory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No items found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
              <Database className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Connect Your Inventory</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Connect your database to view and analyze your full inventory.
                </p>
              </div>
              <Button onClick={() => setIsIntegrationDialogOpen(true)} className="mt-4">
                Connect Inventory Database
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Settings</CardTitle>
              <CardDescription>
                Configure how the AI processes your inventory data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expiry-threshold">Critical Expiry Threshold</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="expiry-threshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">24 hours (1 day)</SelectItem>
                      <SelectItem value="2">48 hours (2 days)</SelectItem>
                      <SelectItem value="3">72 hours (3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Items expiring within this timeframe will be marked as critical
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiry-warning">Warning Expiry Threshold</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="expiry-warning">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Items expiring within this timeframe will be highlighted for attention
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-scan">Automatic Inventory Scanning</Label>
                  <Switch id="auto-scan" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically scan inventory daily to identify expiring items
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-post">Auto-Post Critical Items</Label>
                  <Switch id="auto-post" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically create FoodFlags for items nearing critical expiry
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="scan-time">Daily Scan Time</Label>
                <Select defaultValue="00:00">
                  <SelectTrigger id="scan-time">
                    <SelectValue placeholder="Select scan time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00:00">12:00 AM</SelectItem>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  When the system should check inventory and generate alerts
                </p>
              </div>
              
              <div>
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input 
                  id="notification-email"
                  type="email" 
                  placeholder="manager@yourstore.com"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Daily inventory expiry reports will be sent to this email
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                Manage your inventory database connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 py-1 px-2">
                      Connected
                    </Badge>
                    <p>Connected to {selectedDatabase} via {selectedIntegration}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Test Connection
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                      Disconnect
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    You haven't connected any inventory database yet.
                  </p>
                  <Button onClick={() => setIsIntegrationDialogOpen(true)}>
                    Connect Database
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Inventory Database</DialogTitle>
            <DialogDescription>
              Choose your integration method and connect your inventory system
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="integration-type">Integration Type</Label>
              <Select 
                value={selectedIntegration} 
                onValueChange={setSelectedIntegration}
              >
                <SelectTrigger id="integration-type">
                  <SelectValue placeholder="Select integration type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api">API Connection</SelectItem>
                  <SelectItem value="db">Direct Database</SelectItem>
                  <SelectItem value="file">File Upload</SelectItem>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database-type">Database Type</Label>
              <Select
                value={selectedDatabase}
                onValueChange={setSelectedDatabase}
              >
                <SelectTrigger id="database-type">
                  <SelectValue placeholder="Select your inventory system" />
                </SelectTrigger>
                <SelectContent>
                  {databaseOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedIntegration && selectedIntegration !== "manual" && (
              <div className="space-y-2">
                <Label htmlFor="connection-string">Connection String / URL</Label>
                <Input 
                  id="connection-string" 
                  placeholder={
                    selectedIntegration === "api" ? "https://your-api-endpoint.com/inventory" : 
                    selectedIntegration === "db" ? "postgresql://user:password@localhost:5432/db" : 
                    "Upload inventory file"
                  } 
                  type={selectedIntegration === "file" ? "file" : "text"}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-sync">Automatic Synchronization</Label>
                <Switch id="auto-sync" defaultChecked={true} />
              </div>
              <p className="text-xs text-muted-foreground">
                Keep your inventory data in sync automatically
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectDatabase} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect Database"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Post Item as FoodFlag</DialogTitle>
            <DialogDescription>
              Make this item available for donation via the FoodFlag system
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label>Item Name</Label>
                <p className="font-medium">{selectedItem.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Quantity</Label>
                  <p className="font-medium">{selectedItem.quantity} {selectedItem.unit}</p>
                </div>
                <div className="space-y-1">
                  <Label>Expiry Date</Label>
                  <p className="font-medium">{new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickup-instructions">Pickup Instructions</Label>
                <Textarea 
                  id="pickup-instructions" 
                  placeholder="Enter any special instructions for pickup..."
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-ngos">Notify Nearby NGOs</Label>
                  <Switch id="notify-ngos" defaultChecked={true} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically notify verified NGOs about this donation
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDonationDialogOpen(false)} disabled={isPosting}>
              Cancel
            </Button>
            <Button onClick={confirmDonation} disabled={isPosting}>
              {isPosting ? "Posting..." : "Post as FoodFlag"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default AIInventoryPage;
