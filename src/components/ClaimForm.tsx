import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FoodFlag } from "./FoodFlagCard";
import { Check, Info } from "lucide-react";
import { ClaimSuccess } from "./ClaimSuccess";

const claimFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobileNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  quantityRequested: z.string().min(1, { message: "Please specify quantity" }),
  pickupTime: z.string().min(1, { message: "Please select pickup time" }),
  pickupPersonName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  pickupContactNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  transportMode: z.string().min(1, { message: "Please select transport mode" }),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
  additionalNotes: z.string().optional(),
});

type ClaimFormValues = z.infer<typeof claimFormSchema>;

interface ClaimFormProps {
  foodFlag: FoodFlag;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ClaimForm({ foodFlag, open, onOpenChange, onSuccess }: ClaimFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const form = useForm<ClaimFormValues>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      quantityRequested: foodFlag.quantity.split(" ")[0], // Extract just the number
      pickupTime: "Within 1 hour",
      pickupPersonName: "",
      pickupContactNumber: "",
      transportMode: "On Foot",
      termsAgreed: undefined, 
      additionalNotes: "",
    },
  });

  const onSubmit = async (values: ClaimFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form values submitted:", values);
      console.log("For food flag:", foodFlag.id);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Food claimed successfully!", {
        description: "You will receive the pickup details shortly.",
      });
      
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
      
      // Show success dialog
      setShowSuccessDialog(true);
      
      // Call success callback
      setTimeout(onSuccess, 5000);
      
    } catch (error) {
      toast.error("Failed to submit claim", {
        description: "Please try again or contact support.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Claim Food: {foodFlag.title}</DialogTitle>
            <DialogDescription>
              Please provide your details to claim this food. The donor will be notified of your request.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Claim Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantityRequested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Requested</FormLabel>
                      <FormControl>
                        <Input
                          type="text" 
                          placeholder="How much food you need"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Available: {foodFlag.quantity}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pickupTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Time</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="Within 1 hour">Within 1 hour</option>
                          <option value="1-3 hours">1-3 hours</option>
                          <option value="Today">Today</option>
                          <option value="Tomorrow">Tomorrow</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Expires in {foodFlag.expiryTime}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Pickup Person */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pickupPersonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Person Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Who will collect the food" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pickupContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Pickup person's contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Transport Mode */}
              <FormField
                control={form.control}
                name="transportMode"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Mode of Transport</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="On Foot" id="transport-foot" />
                          <label htmlFor="transport-foot" className="text-sm">On Foot</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Bicycle" id="transport-bicycle" />
                          <label htmlFor="transport-bicycle" className="text-sm">Bicycle</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Motorbike" id="transport-motorbike" />
                          <label htmlFor="transport-motorbike" className="text-sm">Motorbike</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Car" id="transport-car" />
                          <label htmlFor="transport-car" className="text-sm">Car</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special instructions or requests for the donor"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Terms Agreement */}
              <FormField
                control={form.control}
                name="termsAgreed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription>
                        By claiming this food, you agree to collect it within the specified time frame and accept responsibility for its proper handling.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="btn-gradient"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Submit Claim
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <ClaimSuccess 
        foodFlag={foodFlag}
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  );
}
