
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Clock, 
  MapPin, 
  Award, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Users,
  FileText,
  Phone, 
  CalendarDays,
  Info
} from "lucide-react";
import { mockFoodFlags } from "@/data/mockData";
import { ClaimForm } from "@/components/ClaimForm";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isClaimFormOpen, setIsClaimFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Find the food flag from mock data
  const foodFlag = mockFoodFlags.find(flag => flag.id === id);
  
  if (!foodFlag) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Food Not Found</CardTitle>
            <CardDescription>
              The food item you're looking for doesn't exist or has already been claimed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/map")}>
              Back to Food Map
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const handleClaimSuccess = () => {
    // Navigate back to the map after successful claim
    setTimeout(() => {
      navigate("/map");
    }, 2000);
  };
  
  // Determine badge color based on food type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Vegetarian":
        return "bg-ff-green text-white hover:bg-ff-green";
      case "Vegan":
        return "bg-emerald-600 text-white hover:bg-emerald-600";
      case "Non-Vegetarian":
        return "bg-ff-orange text-white hover:bg-ff-orange";
      default:
        return "bg-ff-yellow text-foreground hover:bg-ff-yellow";
    }
  };
  
  const timeLeft = foodFlag.expiryTime;
  const isUrgent = timeLeft.includes("hours") && parseInt(timeLeft.split(" ")[0]) <= 3;
  
  // Calculate freshness score (mock data)
  const freshnessScore = Math.floor(Math.random() * 30) + 70; // 70-100%
  const qualityRating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  
  // Nutritional info (mock data)
  const nutritionalInfo = {
    calories: Math.floor(Math.random() * 500) + 200,
    protein: Math.floor(Math.random() * 30) + 5,
    carbs: Math.floor(Math.random() * 50) + 20,
    fats: Math.floor(Math.random() * 20) + 5,
    servings: Math.floor(Math.random() * 5) + 2
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Image and main details */}
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/map")}
            >
              Back to Food Map
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-96 w-full">
              <img 
                src={foodFlag.imageUrl} 
                alt={foodFlag.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge className={`${getBadgeColor(foodFlag.foodType)}`}>
                  {foodFlag.foodType}
                </Badge>
                
                <Badge variant="outline" className="bg-background">
                  {foodFlag.quantity}
                </Badge>
                
                {isUrgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                  </Badge>
                )}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl">{foodFlag.title}</CardTitle>
              <CardDescription>{foodFlag.description}</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="details" onValueChange={setActiveTab} className="w-full">
              <div className="px-6">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="details" className="p-6 pt-3">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Location:</strong> {foodFlag.location} ({foodFlag.distance})
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Expires in:</strong>{" "}
                        <span className={isUrgent ? "text-destructive font-medium" : ""}>
                          {foodFlag.expiryTime}
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Posted:</strong> {foodFlag.postedTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Posted by:</strong> {foodFlag.donorName} 
                        <Badge variant="outline" className="ml-2 bg-amber-50">
                          ⭐ {foodFlag.donorRating}
                        </Badge>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Contact:</strong> <span className="text-muted-foreground">(Available after claiming)</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        <strong>Freshness:</strong> 
                        <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${freshnessScore > 90 ? 'bg-green-500' : freshnessScore > 80 ? 'bg-ff-green' : 'bg-ff-orange'}`}
                            style={{ width: `${freshnessScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm">{freshnessScore}%</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-ff-orange" />
                      <span>
                        <strong>Impact:</strong> {foodFlag.impact.mealsProvided} meals • 
                        {foodFlag.impact.co2Saved}kg CO₂ saved
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Quality Rating</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xl">
                          {i < qualityRating ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        Based on donor history
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="p-6 pt-3">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Estimated nutritional values per serving. Actual values may vary.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Calories</div>
                      <div className="text-2xl font-bold">{nutritionalInfo.calories}</div>
                      <div className="text-xs text-muted-foreground">kcal per serving</div>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-2xl font-bold">{nutritionalInfo.protein}g</div>
                      <div className="text-xs text-muted-foreground">per serving</div>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Carbohydrates</div>
                      <div className="text-2xl font-bold">{nutritionalInfo.carbs}g</div>
                      <div className="text-xs text-muted-foreground">per serving</div>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Fats</div>
                      <div className="text-2xl font-bold">{nutritionalInfo.fats}g</div>
                      <div className="text-xs text-muted-foreground">per serving</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Servings</span>
                    <span className="font-semibold">{nutritionalInfo.servings}</span>
                  </div>
                  
                  <div className="rounded-md bg-amber-50 border-amber-200 border p-3 flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-amber-800">
                      Allergy information is not available. If you have food allergies, please contact the donor directly after claiming.
                    </span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="impact" className="p-6 pt-3">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    By claiming this food, you are contributing to these environmental and social impacts:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 space-y-2">
                      <h4 className="font-medium flex items-center">
                        <Award className="h-4 w-4 mr-2 text-ff-orange" />
                        CO₂ Emission Reduction
                      </h4>
                      <p className="text-3xl font-bold text-ff-green">
                        {foodFlag.impact.co2Saved}kg
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equivalent to {Math.round(foodFlag.impact.co2Saved * 4)} km driven by an average car
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-2">
                      <h4 className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2 text-ff-orange" />
                        Meals Provided
                      </h4>
                      <p className="text-3xl font-bold text-ff-green">
                        {foodFlag.impact.mealsProvided}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Potentially feeding {Math.ceil(foodFlag.impact.mealsProvided / 3)} people for a day
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">FeedCoin Rewards</h4>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                        <span className="text-amber-600 font-bold">FC</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold">+{Math.round(foodFlag.impact.mealsProvided * 1.5)} FeedCoins</p>
                        <p className="text-xs text-muted-foreground">Estimated rewards for this claim</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator />
            
            <CardFooter className="p-6">
              <div className="w-full">
                <Button 
                  onClick={() => setIsClaimFormOpen(true)}
                  className="btn-gradient w-full text-lg py-6"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Claim This Food
                </Button>
                
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  By claiming, you agree to pick up this food within the specified time frame.
                </p>
                
                <ClaimForm 
                  foodFlag={foodFlag}
                  open={isClaimFormOpen}
                  onOpenChange={setIsClaimFormOpen}
                  onSuccess={handleClaimSuccess}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Additional information */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pickup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Contact donor through the app after claiming</li>
                <li>Arrive at the location within the expiry window</li>
                <li>Bring your own containers if possible</li>
                <li>Show your QR code from the confirmation email</li>
                <li>Provide feedback after pickup is complete</li>
              </ol>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Submit Claim</h4>
                  <p className="text-sm text-muted-foreground">Complete the claim form with your details</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Receive Confirmation</h4>
                  <p className="text-sm text-muted-foreground">Get verification code via email or SMS</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Show ID at Pickup</h4>
                  <p className="text-sm text-muted-foreground">Present ID and verification code to donor</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Confirm Receipt</h4>
                  <p className="text-sm text-muted-foreground">Mark food as received in the app</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Food Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This food has been verified by our donor. Please check the quality before consuming.
                Report any issues immediately through the feedback form.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-sm">Quality verified by donor</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-sm">Food handling guidelines followed</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-sm">Temperature-controlled storage</span>
                </div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-center cursor-help">
                      <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Learn about our food safety standards
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>All donors follow our strict food safety guidelines including temperature control, proper storage, and hygiene standards. Food is inspected before donation.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Nearby</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFoodFlags
                  .filter(f => f.id !== foodFlag.id)
                  .slice(0, 3)
                  .map(flag => (
                    <div 
                      key={flag.id} 
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => navigate(`/food/${flag.id}`)}
                    >
                      <img 
                        src={flag.imageUrl} 
                        alt={flag.title} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium line-clamp-1">{flag.title}</p>
                        <p className="text-xs text-muted-foreground">{flag.distance}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
