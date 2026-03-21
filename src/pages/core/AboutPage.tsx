import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Truck, 
  BarChart3, 
  MapPin, 
  Heart, 
  AlertCircle,
  MoveRight,
  Database 
} from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container py-8 space-y-10 max-w-7xl">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About FeedForward
          </h1>
          <p className="text-xl text-muted-foreground">
            Every meal shared is a life touched, every action counts
          </p>
        </div>
        
        <Card className="bg-red-50/50 border-red-100 dark:bg-red-950/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">The Crisis We Face</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-red-600">9 Million</span>
                <p className="text-center mt-2">People die annually from hunger and hunger-related causes</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-red-600">25,000</span>
                <p className="text-center mt-2">People, including 10,000 children, die from hunger every day</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-red-600">733 Million</span>
                <p className="text-center mt-2">People still go hungry despite enough food production globally</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Faces of Hunger</h2>
          <p className="text-xl text-muted-foreground">
            Behind every statistic is a human story
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/2435a09c-3a7b-473e-96fd-25ec452833e2.png"
              alt="Child in need"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Every child deserves a chance at a healthy, nourished life
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/44e59b9c-ba0f-4dad-bed6-622b672bcbb6.png"
              alt="Food waste"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                While some search for food in waste, others waste what could feed many
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/73319f04-e1f5-48d4-b5ed-9c1cca312bd1.png"
              alt="Food waste in stores"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Tons of edible food is discarded daily while millions go hungry
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/86fe838c-63df-4ff1-bfd9-6462f562a732.png"
              alt="Happy child with food"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                A simple meal can bring joy and hope to a child's life
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/ab101a95-efc6-456a-959c-98f22a8a0013.png"
              alt="Children in poverty"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Every child deserves access to basic necessities
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="/lovable-uploads/c1bdb005-8062-4572-982a-300d9216df00.png"
              alt="Children sharing food"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                When we share, we create moments of joy and dignity
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">The Harsh Reality</h2>
          <p className="text-xl text-muted-foreground">
            Facts that demand our immediate attention and action
          </p>
        </div>

        <Card className="bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                Global Crisis:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
                  <span>Hunger kills more people than AIDS, malaria, and tuberculosis combined</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
                  <span>The world produces enough food to feed everyone, yet millions go hungry</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
                  <span>Every 3.5 seconds, someone dies from hunger-related causes</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">How We're Solving It</h2>
          <p className="text-xl text-muted-foreground">
            Our approach to bridging the gap between food surplus and hunger
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Food Map</CardTitle>
              <CardDescription>Real-time visualization of food surplus and needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our interactive Food Map shows available food donations in real-time, making it easy to find and claim surplus food before it goes to waste.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Donation Platform</CardTitle>
              <CardDescription>Simple process to share surplus food</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Anyone with surplus food can easily create a FoodFlag on our platform, providing details about quantity, type, and pickup information.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Volunteer Network</CardTitle>
              <CardDescription>Community-powered distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our dedicated volunteer network helps collect and deliver food from donors to recipients, ensuring efficient redistribution.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Logistics Management</CardTitle>
              <CardDescription>Efficient food transport systems</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform optimizes routes and coordinates pickups and deliveries to ensure food reaches recipients quickly and safely.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Inventory System</CardTitle>
              <CardDescription>Preventing food waste before it happens</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI inventory tool helps businesses identify soon-to-expire products and connect them with potential recipients.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Impact Tracking</CardTitle>
              <CardDescription>Measuring our collective difference</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track the social and environmental impact of food donations, from meals served to carbon emissions reduced.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Why FeedForward?</h2>
          <p className="text-xl text-muted-foreground">
            What makes our platform unique
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                    <h3 className="font-medium">Real-time Food Mapping</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Visualize available food donations and needs across locations.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                    <h3 className="font-medium">Blockchain Verification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Transparent tracking of every food donation from source to recipient.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                    <h3 className="font-medium">FeedCoin Rewards</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Incentivize donations and volunteering through our token ecosystem.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">4</Badge>
                    <h3 className="font-medium">AI Inventory Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Predictive analytics to identify and redirect soon-to-expire food.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">5</Badge>
                    <h3 className="font-medium">Community Engagement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Volunteer network and gamified participation system.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">6</Badge>
                    <h3 className="font-medium">Impact Analytics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Detailed metrics on social and environmental impact of contributions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Separator />
      
      <section className="space-y-4 text-center max-w-3xl mx-auto py-8">
        <h2 className="text-3xl font-bold">Join Us in Making a Difference</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Your action today can save a life tomorrow. Together, we can create a world where no one goes to bed hungry.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a 
            href="/volunteer" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
          >
            Become a Volunteer
            <Heart className="ml-2 h-4 w-4" />
          </a>
          <a 
            href="/donate" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Donate Now
            <MoveRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
