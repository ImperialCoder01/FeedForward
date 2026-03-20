
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
import { 
  Check, 
  Gift, 
  Users, 
  Clock 
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ReliefKit {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  contents: string[];
  peopleServed: number;
  durationDays: number;
}

interface ReliefKitCardProps {
  kit: ReliefKit;
  onDonate: () => void;
}

export function ReliefKitCard({ kit, onDonate }: ReliefKitCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-40 overflow-hidden">
        <img
          src={kit.imageUrl}
          alt={kit.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{kit.name}</span>
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-red-200">
            ₹{kit.price}
          </Badge>
        </CardTitle>
        <CardDescription>{kit.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>Serves {kit.peopleServed} people</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>For {kit.durationDays} days</span>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md">
          <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium">
            <span>Kit Contents</span>
            <span className="text-xs text-muted-foreground">{isOpen ? 'Hide' : 'Show'}</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-3">
            <ul className="text-sm space-y-1">
              {kit.contents.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onDonate} 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Gift className="mr-2 h-4 w-4" />
          Donate This Kit
        </Button>
      </CardFooter>
    </Card>
  );
}
