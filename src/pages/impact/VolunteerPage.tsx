import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Users, 
  Truck, 
  AlertCircle, 
  CheckCircle, 
  Bike 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const volunteerOpportunities = [
  {
    id: 1,
    title: "Food Pickup from Hotel Taj",
    date: "Tomorrow, 4:00 PM",
    location: "Hotel Taj, Central Mumbai",
    type: "Pickup",
    distance: "3.2 km",
    urgency: "High",
    slots: 2,
  },
  {
    id: 2,
    title: "Distribution at Dharavi Community Center",
    date: "Saturday, 10:00 AM",
    location: "Dharavi Community Center",
    type: "Distribution",
    distance: "5.8 km",
    urgency: "Medium",
    slots: 5,
  },
  {
    id: 3,
    title: "Verification for Wedding Leftovers",
    date: "Sunday, 9:00 PM",
    location: "Royal Gardens, Andheri West",
    type: "Verification",
    distance: "7.1 km",
    urgency: "Low",
    slots: 1,
  },
  {
    id: 4,
    title: "Emergency Food Distribution",
    date: "Today, 6:00 PM",
    location: "Malad Slum Area",
    type: "Emergency",
    distance: "12.3 km",
    urgency: "Critical",
    slots: 8,
  },
  {
    id: 5,
    title: "Transport Food from D-Mart to Shelter",
    date: "Friday, 11:00 AM",
    location: "D-Mart, Powai",
    type: "Logistics",
    distance: "4.5 km",
    urgency: "Medium",
    slots: 2,
  },
];

const volunteerFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  contactNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal("")),
  zone: z.string().min(1, { message: "Please select your preferred zone" }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability slot" }),
  hasVehicle: z.boolean(),
  vehicleType: z.string().optional(),
  languages: z.string().optional(),
  walletAddress: z.string().min(1, { message: "Wallet address is required for FeedCoin rewards" }),
  emergencyContact: z.string().optional(),
  volunteerTypes: z.array(z.string()).min(1, { message: "Please select at least one volunteer role" }),
  idUpload: z.any().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const VolunteerPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("roles");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      zone: "",
      availability: [],
      hasVehicle: false,
      vehicleType: "",
      languages: "",
      walletAddress: "",
      emergencyContact: "",
      volunteerTypes: [],
      idUpload: undefined,
    },
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form Data:", data);
      
      toast.success("Volunteer application submitted successfully! We'll contact you soon.", {
        description: "Thank you for joining our mission to fight hunger.",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again later.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container py-8 space-y-8 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Volunteer with FeedForward
        </h1>
        <p className="text-xl text-muted-foreground">
          Be the bridge between food surplus and those in need
        </p>
      </div>

      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Volunteer Roles</TabsTrigger>
          <TabsTrigger value="opportunities">Active Opportunities</TabsTrigger>
          <TabsTrigger value="signup">Volunteer Signup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pickup Volunteer</CardTitle>
                <CardDescription>
                  Collect food from donors and deliver to recipients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Collect surplus food from registered donors</li>
                  <li>Ensure proper food handling and transport</li>
                  <li>Deliver to NGOs or distribution centers</li>
                  <li>Track and verify delivery in the app</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  Most Needed
                </Badge>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Distribution Volunteer</CardTitle>
                <CardDescription>
                  Help serve food at NGO/shelter sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Organize and serve meals at distribution centers</li>
                  <li>Track number of meals served</li>
                  <li>Maintain hygiene and proper food handling</li>
                  <li>Collect feedback from recipients</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  Weekend Availability
                </Badge>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Logistics Partner</CardTitle>
                <CardDescription>
                  Provide vehicles for large-scale food movement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Transport large quantities of food</li>
                  <li>Help with bulk food pickups from events</li>
                  <li>Assist with routing and logistics planning</li>
                  <li>Ensure food safety during transport</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  Vehicle Required
                </Badge>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Emergency Responder</CardTitle>
                <CardDescription>
                  Active during crises for quick food rerouting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>On-call for urgent food redistribution needs</li>
                  <li>Respond to time-sensitive food rescue opportunities</li>
                  <li>Help with disaster relief food distribution</li>
                  <li>Coordinate with multiple stakeholders during emergencies</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  On-call Availability
                </Badge>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Verification Volunteer</CardTitle>
                <CardDescription>
                  Confirm quality, packaging, and delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Inspect food quality and safety before distribution</li>
                  <li>Ensure proper packaging and storage</li>
                  <li>Verify donations and deliveries in the system</li>
                  <li>Document food rescue missions</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  Food Safety Knowledge
                </Badge>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Organizer</CardTitle>
                <CardDescription>
                  Build awareness and organize local food rescue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Recruit and onboard new donors and volunteers</li>
                  <li>Organize community food rescue events</li>
                  <li>Build relationships with local businesses</li>
                  <li>Create awareness about food waste and hunger</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="bg-primary/5">
                  Good Communication Skills
                </Badge>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button onClick={() => setActiveTab("signup")} className="animate-fade-in">
              Sign Up as Volunteer
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="opportunities" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {volunteerOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <CardHeader className={`pb-3 ${
                  opportunity.urgency === "Critical" ? "bg-red-50 dark:bg-red-950/20" :
                  opportunity.urgency === "High" ? "bg-orange-50 dark:bg-orange-950/20" :
                  opportunity.urgency === "Medium" ? "bg-yellow-50 dark:bg-yellow-950/20" :
                  "bg-green-50 dark:bg-green-950/20"
                }`}>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{opportunity.title}</CardTitle>
                    <Badge variant={opportunity.urgency === "Critical" ? "destructive" : "outline"}>
                      {opportunity.urgency}
                    </Badge>
                  </div>
                  <CardDescription>
                    {opportunity.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{opportunity.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{opportunity.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">{opportunity.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Slots available:</span>
                      <span className="font-medium">{opportunity.slots}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button size="sm" className="w-full">Sign Up</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              These are the current active opportunities. New ones are added daily.
            </p>
            <Button variant="outline" onClick={() => setActiveTab("signup")}>
              Register as Volunteer to Get Notified
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="signup" className="mt-6">
          {isAuthenticated ? (
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Volunteer Registration Form</CardTitle>
                <CardDescription>
                  Join our network of food rescue volunteers and make a real impact in fighting hunger.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Will be verified via OTP
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email (optional)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="walletAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wallet Address*</FormLabel>
                              <FormControl>
                                <Input placeholder="For FeedCoin rewards" {...field} />
                              </FormControl>
                              <FormDescription>
                                Required for FeedCoin rewards
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Name and phone number (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Volunteering Preferences</h3>
                      
                      <FormField
                        control={form.control}
                        name="zone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Volunteering Zone*</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your preferred area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="central_mumbai">Central Mumbai</SelectItem>
                                <SelectItem value="south_mumbai">South Mumbai</SelectItem>
                                <SelectItem value="western_mumbai">Western Mumbai</SelectItem>
                                <SelectItem value="eastern_mumbai">Eastern Mumbai</SelectItem>
                                <SelectItem value="navi_mumbai">Navi Mumbai</SelectItem>
                                <SelectItem value="thane">Thane</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              The area where you'd prefer to volunteer
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="volunteerTypes"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Preferred Volunteer Roles*</FormLabel>
                              <FormDescription>
                                Select all that interest you
                              </FormDescription>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                              {[
                                { id: "pickup", label: "Pickup Volunteer" },
                                { id: "distribution", label: "Distribution Volunteer" },
                                { id: "logistics", label: "Logistics Partner" },
                                { id: "emergency", label: "Emergency Responder" },
                                { id: "verification", label: "Verification Volunteer" },
                                { id: "community", label: "Community Organizer" }
                              ].map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="volunteerTypes"
                                  render={({ field }) => (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedValues = checked
                                              ? [...field.value, item.id]
                                              : field.value?.filter(
                                                  (val) => val !== item.id
                                                );
                                            field.onChange(updatedValues);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="availability"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Availability Schedule*</FormLabel>
                              <FormDescription>
                                Select all available time slots
                              </FormDescription>
                            </div>
                            <div className="grid gap-2 md:grid-cols-3">
                              {[
                                { id: "weekday_morning", label: "Weekday Mornings" },
                                { id: "weekday_afternoon", label: "Weekday Afternoons" },
                                { id: "weekday_evening", label: "Weekday Evenings" },
                                { id: "weekend_morning", label: "Weekend Mornings" },
                                { id: "weekend_afternoon", label: "Weekend Afternoons" },
                                { id: "weekend_evening", label: "Weekend Evenings" },
                                { id: "on_call", label: "On-Call (Emergency)" },
                              ].map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="availability"
                                  render={({ field }) => (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedValues = checked
                                              ? [...field.value, item.id]
                                              : field.value?.filter(
                                                  (val) => val !== item.id
                                                );
                                            field.onChange(updatedValues);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Additional Information</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="hasVehicle"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Vehicle Ownership
                                </FormLabel>
                                <FormDescription>
                                  Do you own a vehicle you can use?
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vehicleType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vehicle Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!form.watch("hasVehicle")}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select vehicle type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="two_wheeler">Two-Wheeler</SelectItem>
                                  <SelectItem value="car">Car</SelectItem>
                                  <SelectItem value="van">Van</SelectItem>
                                  <SelectItem value="pickup">Pickup Truck</SelectItem>
                                  <SelectItem value="large_truck">Truck</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Languages Spoken</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Hindi, English, Marathi" {...field} />
                            </FormControl>
                            <FormDescription>
                              List languages you're comfortable speaking
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="idUpload"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                          <FormItem>
                            <FormLabel>ID Proof*</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...fieldProps}
                              />
                            </FormControl>
                            <FormDescription>
                              Upload a government ID for verification (Aadhar, PAN, Driving License)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Volunteer Application"}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      By submitting, you agree to our volunteer guidelines and code of conduct.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center p-6 max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Sign in Required</CardTitle>
                <CardDescription>
                  You need to be signed in to register as a volunteer
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button onClick={handleSignIn}>
                  Sign In to Continue
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerPage;
