
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductPriority, ProductType, useMarketplace } from "@/contexts/MarketplaceContext";
import { Filter, Search, X } from "lucide-react";

export function ProductFilters() {
  const { filters, setFilters, products } = useMarketplace();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique companies from products
  const [companies, setCompanies] = useState<string[]>([]);
  
  useEffect(() => {
    const uniqueCompanies = Array.from(
      new Set(products.map(p => p.company).filter(Boolean) as string[])
    );
    setCompanies(uniqueCompanies);
  }, [products]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };
  
  const handlePriorityChange = (value: string) => {
    setFilters({ priority: value as ProductPriority || null });
  };
  
  const handleTypeChange = (value: string) => {
    setFilters({ type: value as ProductType || null });
  };
  
  const handleCompanyChange = (value: string) => {
    setFilters({ company: value || null });
  };
  
  const clearFilters = () => {
    setFilters({
      priority: null,
      type: null,
      company: null,
      search: ""
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          {(filters.priority || filters.type || filters.company) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-background">
          <div className="space-y-2">
            <Label htmlFor="priority-filter">Priority</Label>
            <Select
              value={filters.priority || ""}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger id="priority-filter">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type-filter">Product Type</Label>
            <Select
              value={filters.type || ""}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="perishable">Perishable</SelectItem>
                  <SelectItem value="non-perishable">Non-Perishable</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-filter">Company</Label>
            <Select
              value={filters.company || ""}
              onValueChange={handleCompanyChange}
            >
              <SelectTrigger id="company-filter">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
