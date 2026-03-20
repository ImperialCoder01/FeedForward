
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function NotificationButton() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  
  // Simulate fetching notifications - in a real app, this would connect to your backend
  useEffect(() => {
    if (isAuthenticated) {
      // This is a placeholder for actual notification fetching logic
      // In a real implementation, you would fetch from your API/Supabase
      const mockFetchNotifications = () => {
        // Simulate 2 unread notifications
        setNotificationCount(2);
      };
      
      mockFetchNotifications();
      
      // Set up a periodic check for new notifications
      const intervalId = setInterval(mockFetchNotifications, 30000);
      
      return () => clearInterval(intervalId);
    } else {
      setNotificationCount(0);
    }
  }, [isAuthenticated]);
  
  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your notifications");
      navigate("/login");
      return;
    }
    navigate("/notifications");
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className={`relative ${notificationCount > 0 ? "animate-pulse" : ""}`}
      onClick={handleClick}
    >
      <Bell className="h-5 w-5" />
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-ff-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center animate-fade-in">
          {notificationCount}
        </span>
      )}
    </Button>
  );
}
