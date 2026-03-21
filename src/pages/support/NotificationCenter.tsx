
import { useState, useEffect } from "react";
import { Bell, Check, Trash2, Clock, Calendar, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Notification type definition
interface Notification {
  id: string;
  type: "food_available" | "claim_approved" | "donation_received" | "system" | "expiry_warning";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  relatedItemId?: string;
  metadata?: {
    foodName?: string;
    location?: string;
    expiryTime?: string;
  };
}

export default function NotificationCenter() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch notifications (mock data for now)
  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setNotifications([
        {
          id: "1",
          type: "food_available",
          title: "New Food Available Nearby",
          message: "Fresh vegetables are available 0.8 km from your location",
          timestamp: "2025-04-24T10:30:00Z",
          isRead: false,
          actionUrl: "/food/123",
          relatedItemId: "123",
          metadata: {
            foodName: "Fresh Vegetables",
            location: "Green Market",
            expiryTime: "2025-04-24T18:00:00Z"
          }
        },
        {
          id: "2",
          type: "claim_approved",
          title: "Claim Approved",
          message: "Your claim for 'Bakery Leftovers' has been approved",
          timestamp: "2025-04-23T14:15:00Z",
          isRead: true,
          actionUrl: "/food/456",
          relatedItemId: "456",
          metadata: {
            foodName: "Bakery Leftovers",
            location: "Downtown Bakery"
          }
        },
        {
          id: "3",
          type: "expiry_warning",
          title: "Food Expiring Soon",
          message: "Your donated 'Cooked Meals' will expire in 2 hours",
          timestamp: "2025-04-23T09:20:00Z",
          isRead: false,
          relatedItemId: "789",
          metadata: {
            foodName: "Cooked Meals",
            expiryTime: "2025-04-23T11:30:00Z"
          }
        },
        {
          id: "4",
          type: "donation_received",
          title: "Donation Impact",
          message: "Your donation fed 5 people and earned 20 FeedCoins",
          timestamp: "2025-04-22T17:45:00Z",
          isRead: true,
          actionUrl: "/wallet",
          metadata: {
            foodName: "Restaurant Surplus"
          }
        },
        {
          id: "5",
          type: "system",
          title: "Welcome to FeedForward",
          message: "Thanks for joining our community to reduce food waste",
          timestamp: "2025-04-20T12:00:00Z",
          isRead: true
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.type === activeTab;
  });

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification removed");
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  // Get the notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "food_available": 
        return <MapPin className="h-5 w-5 text-ff-green" />;
      case "claim_approved": 
        return <Check className="h-5 w-5 text-ff-green" />;
      case "expiry_warning": 
        return <Clock className="h-5 w-5 text-ff-orange" />;
      case "donation_received": 
        return <Heart className="h-5 w-5 text-ff-yellow" />;
      default: 
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your food donation activities
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={!unreadCount}
          >
            <Check className="h-4 w-4 mr-1" />
            Mark All Read
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={deleteAllNotifications}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 overflow-x-auto flex-wrap justify-start">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="food_available">Available Food</TabsTrigger>
          <TabsTrigger value="claim_approved">Claims</TabsTrigger>
          <TabsTrigger value="expiry_warning">Expiry Alerts</TabsTrigger>
          <TabsTrigger value="donation_received">Donations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-2">
                You don't have any {activeTab === "all" ? "" : activeTab + " "}notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{notification.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {formatDate(notification.timestamp)}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0" 
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-sm">{notification.message}</p>
                    
                    {notification.metadata && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {notification.metadata.foodName && (
                          <Badge variant="outline" className="text-xs">
                            {notification.metadata.foodName}
                          </Badge>
                        )}
                        {notification.metadata.location && (
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {notification.metadata.location}
                          </Badge>
                        )}
                        {notification.metadata.expiryTime && (
                          <Badge variant="outline" className={`text-xs ${new Date(notification.metadata.expiryTime) < new Date() ? 'bg-destructive/10 text-destructive' : ''}`}>
                            <Calendar className="h-3 w-3 mr-1" />
                            Expires: {formatDate(notification.metadata.expiryTime)}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                  
                  {notification.actionUrl && (
                    <CardFooter className="pt-2">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        onClick={() => handleNotificationClick(notification)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
