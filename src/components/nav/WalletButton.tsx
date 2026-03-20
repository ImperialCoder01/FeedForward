
import { Wallet, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WalletButton() {
  const { isAuthenticated } = useAuth();
  const [feedCoins, setFeedCoins] = useState<number | null>(null);
  
  // Simulate fetching wallet data - in a real app, this would connect to your backend
  useEffect(() => {
    if (isAuthenticated) {
      // This is a placeholder for actual wallet data fetching
      // In a real implementation, you would fetch from your API/Supabase
      const mockFetchWalletData = () => {
        // Simulate wallet balance of FeedCoins
        setFeedCoins(125);
      };
      
      mockFetchWalletData();
    } else {
      setFeedCoins(null);
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return null; // Don't show wallet button for unauthenticated users
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            asChild 
            variant="ghost" 
            size="icon"
            className="relative"
          >
            <Link to="/wallet">
              <Wallet className="h-5 w-5" />
              {feedCoins !== null && (
                <div className="absolute -bottom-1 -right-1 bg-ff-green text-white rounded-full h-4 px-1 text-[10px] flex items-center justify-center font-medium animate-fade-in">
                  <Coins className="h-2 w-2 mr-0.5" />
                  {feedCoins}
                </div>
              )}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Wallet: {feedCoins} FeedCoins</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
