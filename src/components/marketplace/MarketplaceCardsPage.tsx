
import React, { useState } from 'react';
import { useMarketplace, Product } from "@/contexts/MarketplaceContext";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductFilters } from "@/components/marketplace/ProductFilters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductFormModal } from "@/components/marketplace/ProductFormModal";
import { Plus, ShoppingCart, Recycle, Apple, Leaf } from "lucide-react";

type ProductFormData = Omit<Product, "id" | "seller_id" | "seller_name" | "created_at">;

export function MarketplaceCardsPage() {
  const { products, filteredProducts, addProduct, deleteProduct, updateProduct } = useMarketplace();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
  };

  const handleFormSubmit = (productData: ProductFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...productData });
    } else {
      addProduct({ ...productData });
    }
  };

  // Filter products by category
  const getCategoryProducts = (category: string) => {
    if (category === 'all') return filteredProducts;
    
    return filteredProducts.filter(product => {
      switch(category) {
        case 'food':
          return product.type === 'perishable';
        case 'eco':
          return product.company?.toLowerCase().includes('eco') || 
                 product.name.toLowerCase().includes('eco') || 
                 product.description.toLowerCase().includes('bio');
        case 'sustainability':
          return product.description.toLowerCase().includes('sustain') || 
                 product.description.toLowerCase().includes('energy') ||
                 product.description.toLowerCase().includes('saving');
        default:
          return true;
      }
    });
  };

  const displayProducts = getCategoryProducts(activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Eco-Marketplace</h2>
          <p className="text-muted-foreground">
            Shop eco-friendly products using rupees or FeedCoin
          </p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> List New Product
        </Button>
      </div>

      <ProductFilters />

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 w-full max-w-md">
          <TabsTrigger value="all">
            <ShoppingCart className="mr-2 h-4 w-4" /> All
          </TabsTrigger>
          <TabsTrigger value="food">
            <Apple className="mr-2 h-4 w-4" /> Food
          </TabsTrigger>
          <TabsTrigger value="eco">
            <Recycle className="mr-2 h-4 w-4" /> Eco Products
          </TabsTrigger>
          <TabsTrigger value="sustainability">
            <Leaf className="mr-2 h-4 w-4" /> Sustainability
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory}>
          {displayProducts.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button variant="outline" onClick={handleAddProduct} className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add a product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => handleEditProduct(product)}
                  onDelete={() => handleDeleteProduct(product.id)}
                  isSellerView={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ProductFormModal
        open={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        product={editingProduct}
        onSubmit={handleFormSubmit}
        isEditing={!!editingProduct}
      />
    </div>
  );
}
