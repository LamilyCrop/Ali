"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { normalizeCategorySlug } from "@/lib/categories";
import { ChevronDown, ChevronRight, Search, Clock, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const productCategories = [
  "Area Light",
  "Wall Pack",
  "Canopy",
  "Flood Light",
  "Frame Light",
  "Backlit Panel",
  "Troffer Light",
  "Ceiling Light",
  "Down Light",
  "UFO High Bay",
  "Linear High Bay",
  "Linear Strip",
  "Up and Down Linear Slot Light",
  "Vapor Tight",
  "Tube Series",
  "Integrated Tube",
  "Bollards",
];

const accessoriesItems = [
  "Emergency Driver",
  "Sensor",
  "Mount Bracket",
  "Surface Mount Kit",
  "UFO Reflector",
  "Remote Control",
  "Transformer",
  "Suspending Rope",
  "Junction Box",
  "Adapter",
  "Connector",
];

const areaCategories = [
  "Covered",
  "Damp Location", 
  "Dry Location",
  "Indoor"
];

const mountingCategories = [
  "Hanging and Pendant",
  "Inlay and Recessed",
  "Pole Mount",
  "Surface Mount",
  "Wall Mount"
];

function toSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

interface ProductData {
  Index: number;
  Category: string;
  Name: string | null;
  Specs: Array<{
    SKU: string;
    Wattage: string;
    Voltage: string;
    Lumens: string;
    [key: string]: string | null;
  }>;
}

interface AccessoryData {
  Index: number;
  Category: string;
  Name: string | null;
}

export default function ProductSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["products"]) // Products section expanded by default
  );
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [accessoriesData, setAccessoriesData] = useState<AccessoryData[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prioritizeAccessories = searchParams.get("prioritize") === "accessories";

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, accessoriesRes] = await Promise.all([
          fetch("/data/products_full_with_forms.json", { cache: "no-cache" }),
          fetch("/data/accessories_full.json", { cache: "no-cache" })
        ]);
        
        if (productsRes.ok) {
          const products = await productsRes.json() as ProductData[];
          setProductsData(products);
        }
        
        if (accessoriesRes.ok) {
          const accessories = await accessoriesRes.json() as AccessoryData[];
          setAccessoriesData(accessories);
        }
        
        // Load recently viewed from localStorage
        const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        setRecentlyViewed(recent);
        
      } catch (error) {
        console.error('Error loading sidebar data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Dynamic category processing
  const dynamicCategories = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    productsData.forEach(product => {
      const count = categoryCounts.get(product.Category) || 0;
      categoryCounts.set(product.Category, count + 1);
    });
    
    return Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [productsData]);

  const dynamicAccessoryCategories = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    accessoriesData.forEach(accessory => {
      const count = categoryCounts.get(accessory.Category) || 0;
      categoryCounts.set(accessory.Category, count + 1);
    });
    
    return Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [accessoriesData]);


  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Live search update
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      const currentParams = new URLSearchParams(searchParams.toString());
      
      if (searchQuery.trim()) {
        currentParams.set("q", searchQuery.trim());
      } else {
        currentParams.delete("q");
      }
      
      // Navigate to the current category with updated search params
      const pathParts = pathname.split('/');
      const currentCategory = pathParts[pathParts.length - 1];
      
      let newUrl;
      if (pathname === '/products-and-accessories' || currentCategory === 'products-and-accessories') {
        newUrl = `/products-and-accessories/all`;
      } else if (pathname.startsWith('/products-and-accessories/')) {
        newUrl = pathname;
      } else {
        newUrl = `/products-and-accessories/all`;
      }
      
      if (currentParams.toString()) {
        newUrl += `?${currentParams.toString()}`;
      }
      
      router.replace(newUrl);
    }, 300); // 300ms debounce

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, pathname, searchParams, router]);

  // Update search query when URL params change
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Search Bar */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 border-border focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => toggleSection("products")}
            className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            <span>Products & Accessories</span>
            <div className="flex items-center gap-2">
              {!isLoading && (
                <Badge variant="secondary" className="text-xs">
                  {dynamicCategories.reduce((sum, cat) => sum + cat.count, 0) + dynamicAccessoryCategories.reduce((sum, cat) => sum + cat.count, 0)}
                </Badge>
              )}
              {expandedSections.has("products") ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            expandedSections.has("products") 
              ? "max-h-[1000px] overflow-y-auto" 
              : "max-h-0"
          )}>
            <nav className="space-y-1 pt-1">
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-8 bg-muted animate-pulse rounded-md" />
                  ))}
                </div>
              ) : (
                <>
                  {/* Accessories Section - Show first when prioritized */}
                  {prioritizeAccessories && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-3">Accessories</h4>
                      {dynamicAccessoryCategories.map(({ category, count }) => {
                        const slug = toSlug(category);
                        const href = `/products-and-accessories/${slug}`;
                        const isActive = pathname === `/products-and-accessories/${slug}`;
                        return (
                          <a
                            key={`accessory-${category}`}
                            href={href}
                            className={cn(
                              "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors no-underline group ml-2",
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            <span>{category}</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs transition-colors",
                                isActive 
                                  ? "border-foreground/20 text-foreground" 
                                  : "border-muted-foreground/20 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                              )}
                            >
                              {count}
                            </Badge>
                          </a>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Products Section - Show first when not prioritized */}
                  {!prioritizeAccessories && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-3">Products</h4>
                      {dynamicCategories.map(({ category, count }) => {
                        const slug = normalizeCategorySlug(category);
                        const href = `/products-and-accessories/${slug}`;
                        const isActive = pathname === `/products-and-accessories/${slug}`;
                        return (
                          <a
                            key={`product-${category}`}
                            href={href}
                            className={cn(
                              "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors no-underline group ml-2",
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            <span>{category}</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs transition-colors",
                                isActive 
                                  ? "border-foreground/20 text-foreground" 
                                  : "border-muted-foreground/20 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                              )}
                            >
                              {count}
                            </Badge>
                          </a>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Accessories Section - Show second when not prioritized */}
                  {!prioritizeAccessories && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-3">Accessories</h4>
                      {dynamicAccessoryCategories.map(({ category, count }) => {
                        const slug = toSlug(category);
                        const href = `/products-and-accessories/${slug}`;
                        const isActive = pathname === `/products-and-accessories/${slug}`;
                        return (
                          <a
                            key={`accessory-${category}`}
                            href={href}
                            className={cn(
                              "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors no-underline group ml-2",
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            <span>{category}</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs transition-colors",
                                isActive 
                                  ? "border-foreground/20 text-foreground" 
                                  : "border-muted-foreground/20 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                              )}
                            >
                              {count}
                            </Badge>
                          </a>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Products Section - Show second when prioritized */}
                  {prioritizeAccessories && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-3">Products</h4>
                      {dynamicCategories.map(({ category, count }) => {
                        const slug = normalizeCategorySlug(category);
                        const href = `/products-and-accessories/${slug}`;
                        const isActive = pathname === `/products-and-accessories/${slug}`;
                        return (
                          <a
                            key={`product-${category}`}
                            href={href}
                            className={cn(
                              "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors no-underline group ml-2",
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            <span>{category}</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs transition-colors",
                                isActive 
                                  ? "border-foreground/20 text-foreground" 
                                  : "border-muted-foreground/20 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                              )}
                            >
                              {count}
                            </Badge>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Area Section - Hidden when prioritizing accessories */}
        {!prioritizeAccessories && (
          <div>
            <button
              onClick={() => toggleSection("area")}
              className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
            >
              <span>Area</span>
              {expandedSections.has("area") ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expandedSections.has("area") 
                ? "max-h-[200px]" 
                : "max-h-0"
            )}>
              <nav className="space-y-1 pt-1">
                {areaCategories.map((item) => {
                  const slug = toSlug(item);
                  const href = `/products-and-accessories/${slug}`;
                  const isActive = pathname === `/products-and-accessories/${slug}`;
                  return (
                    <a
                      key={item}
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors no-underline",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      )}
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Mounting Section - Hidden when prioritizing accessories */}
        {!prioritizeAccessories && (
          <div>
            <button
              onClick={() => toggleSection("mounting")}
              className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
            >
              <span>Mounting</span>
              {expandedSections.has("mounting") ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expandedSections.has("mounting") 
                ? "max-h-[150px]" 
                : "max-h-0"
            )}>
              <nav className="space-y-1 pt-1">
                {mountingCategories.map((item) => {
                  const slug = toSlug(item);
                  const href = `/products-and-accessories/${slug}`;
                  const isActive = pathname === `/products-and-accessories/${slug}`;
                  return (
                    <a
                      key={item}
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors no-underline",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      )}
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        )}



        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection("recent")}
              className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Recently Viewed</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {recentlyViewed.length}
                </Badge>
                {expandedSections.has("recent") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expandedSections.has("recent")
                ? "max-h-[200px]"
                : "max-h-0"
            )}>
              <nav className="space-y-1 pt-1">
                {recentlyViewed.slice(0, 5).map((item, index) => (
                  <a
                    key={`${item}-${index}`}
                    href={item}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors no-underline"
                  >
                    <Zap className="w-3 h-3" />
                    <span className="truncate">
                      {item.split('/').pop()?.replace(/-/g, ' ') || item}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}


