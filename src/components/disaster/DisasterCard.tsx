
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, MapPin, Users, Calendar } from "lucide-react";

interface Disaster {
  id: string;
  type: string;
  name: string;
  location: string;
  date: string;
  severity: string;
  casualties: number;
  displaced: number;
  urgentNeeds: string[];
  target: number;
  raised: number;
  imageUrl: string;
  updates: { date: string; content: string }[];
}

interface DisasterCardProps {
  disaster: Disaster;
  onViewDetails: () => void;
}

export function DisasterCard({ disaster, onViewDetails }: DisasterCardProps) {
  const progress = (disaster.raised / disaster.target) * 100;
  
  // Determine severity color
  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'bg-red-100 text-red-600 hover:bg-red-200 border-red-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={disaster.imageUrl}
          alt={disaster.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getSeverityColor(disaster.severity)}>
            {disaster.type}
          </Badge>
          <Badge variant="outline" className="font-medium">
            <AlertTriangle className="mr-1 h-3 w-3 text-red-500" />
            {disaster.severity} Severity
          </Badge>
        </div>
        <CardTitle className="text-xl mt-2">{disaster.name}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {disaster.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Date(disaster.date).toLocaleDateString('en-IN')}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">
              {disaster.displaced.toLocaleString()} affected
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Funding Progress</span>
            <span>₹{(disaster.raised/100000).toFixed(1)}L of ₹{(disaster.target/100000).toFixed(1)}L</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div>
          <div className="text-xs mb-1">Urgent Needs:</div>
          <div className="flex flex-wrap gap-1">
            {disaster.urgentNeeds.slice(0, 3).map((need, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {need}
              </Badge>
            ))}
            {disaster.urgentNeeds.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{disaster.urgentNeeds.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onViewDetails} 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          View Details & Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
