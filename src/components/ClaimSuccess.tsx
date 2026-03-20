
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FoodFlag } from "./FoodFlagCard";
import { Award, Check, MapPin } from "lucide-react";
import confetti from 'canvas-confetti';

interface ClaimSuccessProps {
  foodFlag: FoodFlag;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClaimSuccess({ foodFlag, open, onOpenChange }: ClaimSuccessProps) {
  const navigate = useNavigate();
  const [claimCode, setClaimCode] = useState("");
  
  // Generate random claim code
  useEffect(() => {
    if (open) {
      const code = Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join("");
      setClaimCode(code);
      
      // Launch confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [open]);
  
  const handleViewDetails = () => {
    onOpenChange(false);
    navigate("/profile");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-green-600">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            Food Claimed Successfully!
          </DialogTitle>
          <DialogDescription className="text-center">
            You have successfully claimed {foodFlag.title}. Please keep this claim code handy.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-md text-center">
            <div className="text-xs text-muted-foreground mb-1">Your Claim Code</div>
            <div className="text-2xl font-mono font-bold tracking-widest">{claimCode}</div>
            <div className="text-xs text-muted-foreground mt-1">Show this code to the donor when you arrive</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                <strong>Pickup Location:</strong> {foodFlag.location}
              </span>
            </div>
            
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-ff-orange" />
              <span className="text-sm">
                <strong>Reward:</strong> {Math.round(foodFlag.impact.mealsProvided * 1.5)} FeedCoins have been added to your account
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
            <p className="text-sm text-blue-700">
              A confirmation has been sent to your email and phone. You can also view this claim in your profile.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="w-full sm:w-auto btn-gradient" onClick={handleViewDetails}>
            View My Claims
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
