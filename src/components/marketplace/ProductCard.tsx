import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, Package, ShoppingCart, Star, Tag } from "lucide-react";
import { Product } from "@/contexts/MarketplaceContext";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
  isSellerView?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, isSellerView = false }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to your cart!`);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          <Badge variant={product.type === 'perishable' ? 'destructive' : 'outline'}>
            {product.type}
          </Badge>
        </div>
        {product.company && (
          <p className="text-sm text-muted-foreground">{product.company}</p>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-md bg-muted relative">
            <img 
              src={product.image_url || "/placeholder.svg"} 
              alt={product.name}
              className="object-cover w-full h-full transition-opacity duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
              loading="lazy"
            />
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge className={getPriorityColor(product.priority)}>
              {product.priority} priority
            </Badge>
            
            <div className="flex items-center text-muted-foreground">
              <Package className="mr-1 h-3 w-3" />
              <span>Qty: {product.quantity}</span>
            </div>
            
            {product.expiry_date && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Expires: {new Date(product.expiry_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 pt-2">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <IndianRupee className="mr-1 h-4 w-4" />
            <span className="font-medium">{product.price.toFixed(2)}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            by {product.seller_name}
          </div>
        </div>
        
        {isSellerView ? (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div>

          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={!user}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button><Button 
            className="w-full mt-4" 
            onClick={handleAddToCart}
            disabled={!user}
            >
            <ShoppingCart className="mr-2  h-4 w-4" />
            Donate
          </Button>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
