
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductFormModal } from "@/components/marketplace/ProductFormModal";
import { useMarketplace, Product } from "@/contexts/MarketplaceContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Package, PackageCheck, PackageMinus, PackagePlus, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SellerDashboardPage() {
  const { userProducts, loading, fetchUserProducts, updateProduct, deleteProduct } = useMarketplace();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  
  const totalProducts = userProducts.length;
  const totalValue = userProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const perishableCount = userProducts.filter(p => p.type === 'perishable').length;
  const nonPerishableCount = userProducts.filter(p => p.type === 'non-perishable').length;
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsFormOpen(true);
  };
  
  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  };
  
  const handleFormSubmit = async (data: Omit<Product, 'id' | 'seller_id' | 'seller_name' | 'created_at'>) => {
    if (isEditing && selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      // This should be handled by the modal itself via context
    }
    setIsFormOpen(false);
    setIsEditing(false);
    setSelectedProduct(undefined);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your marketplace products</p>
        </div>
        
        <Button onClick={() => {
          setIsEditing(false);
          setSelectedProduct(undefined);
          setIsFormOpen(true);
        }} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">{totalProducts}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <Package className="mr-2 h-4 w-4" />
              <span>In your inventory</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Value</CardDescription>
            <CardTitle className="text-3xl">${totalValue.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <PackageCheck className="mr-2 h-4 w-4" />
              <span>Potential revenue</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Perishable</CardDescription>
            <CardTitle className="text-3xl">{perishableCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <PackageMinus className="mr-2 h-4 w-4" />
              <span>High priority items</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Non-Perishable</CardDescription>
            <CardTitle className="text-3xl">{nonPerishableCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <PackagePlus className="mr-2 h-4 w-4" />
              <span>Standard items</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : userProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No products yet</h3>
              <p className="text-muted-foreground">
                Add your first product to start selling on the marketplace.
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedProduct(undefined);
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  isSellerView={true}
                  onEdit={() => handleEdit(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="table" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : userProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No products yet</h3>
              <p className="text-muted-foreground">
                Add your first product to start selling on the marketplace.
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedProduct(undefined);
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          product.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          product.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {product.priority}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your product.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(product.id)}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <ProductFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
        isEditing={isEditing}
      />
    </div>
  );
}
