
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function DisasterAlertButton() {
  const [isBlinking, setIsBlinking] = useState(true);
  
  // Blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Button
      asChild
      variant="outline"
    className="bg-red-500"
    >
      <Link to="/sanjeevani">
        <AlertTriangle className="mr-2 h-4 w-4" />
        SANJEEVANI
      </Link>
    </Button>
  );
}
