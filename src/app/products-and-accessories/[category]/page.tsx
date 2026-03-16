"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSidebar from "@/components/ProductSidebar";
import AccessoriesCard from "@/components/AccessoriesCard";
import { products as legacyProducts } from "@/data/products";
import { findCategoryByTitle, normalizeCategorySlug } from "@/lib/categories";
import { useImagePreload } from "@/hooks/use-image-preload";

type DatasetSpec = Record<string, string | null>;
interface DatasetEntry {
  Index: number;
  Title: string;
  Variant: string | null;
  Description: string | null;
  Features: string[];
  AccessoriesSectionPresent: boolean;
  Specs: DatasetSpec[];
  Category?: string | null;
  area_category?: string;
  mounting_category?: string;
  images?: string[];
  mainImage?: string;
  thumbnails?: string[];
  mainThumbnail?: string;
}

interface AccessoryMapping {
  productIndex: number;
  productTitle: string;
  productCategory: string;
  productVariant: string;
  matchingAccessories: Array<{
    index: number;
    title: string;
    category: string;
    variant: string;
    description: string;
    mainImage: string;
  }>;
  totalAccessories: number;
}

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toTitleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function UnifiedProductsPage() {
  const params = useParams<{ category: string }>();
  const category = typeof params?.category === "string" ? params.category : "";
  const [dataset, setDataset] = useState<DatasetEntry[] | null>(null);
  const [accessoryMappings, setAccessoryMappings] = useState<Record<number, AccessoryMapping> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        console.log("Loading product and accessory data...");
        
        // Load products, accessories, and accessory mappings in parallel
        const [productsRes, accessoriesRes, mappingsRes] = await Promise.all([
          fetch("/data/products_full_with_forms.json", { cache: "no-cache" }),
          fetch("/data/accessories_full.json", { cache: "no-cache" }),
          fetch("/data/accessory_mappings.json", { cache: "no-cache" })
        ]);
        
        if (!productsRes.ok) {
          console.error("Failed to fetch product data:", productsRes.status, productsRes.statusText);
          return;
        }
        
        if (!accessoriesRes.ok) {
          console.error("Failed to fetch accessories data:", accessoriesRes.status, accessoriesRes.statusText);
          return;
        }
        
        const [products, accessories, mappings] = await Promise.all([
          productsRes.json() as Promise<DatasetEntry[]>,
          accessoriesRes.json() as Promise<DatasetEntry[]>,
          mappingsRes.ok ? mappingsRes.json() as Promise<Record<number, AccessoryMapping>> : null
        ]);
        
        // Transform accessories to match the expected structure
        const transformedAccessories = accessories.map(accessory => ({
          ...accessory,
          Specs: [], // Accessories don't have specs like products
          AccessoriesSectionPresent: false,
          Variant: null,
          area_category: undefined,
          mounting_category: undefined
        }));
        
        // Combine products and accessories
        const combinedData = [...products, ...transformedAccessories];
        
        console.log("Data loaded successfully:", products.length, "products,", accessories.length, "accessories");
        if (isActive) {
          setDataset(combinedData);
          setAccessoryMappings(mappings);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, []);

  const items = useMemo(() => {
    const all = dataset ?? [];
    const query = (searchParams.get("q") || "").trim().toLowerCase();
    const prioritizeAccessories = searchParams.get("prioritize") === "accessories";

    // Debug logging - remove in production
    if (process.env.NODE_ENV === 'development') {
      console.log("Total products loaded:", all.length);
      console.log("Current category:", category);
      console.log("Prioritize accessories:", prioritizeAccessories);
    }

    let filtered = all;

    // Filter by category type
    if (category && category !== "all") {
      const categorySlug = category.toLowerCase();
      
      // Check if it's a product category
      const isProductCategory = [
        "area-light", "wall-pack", "canopy", "flood-light", "frame-light",
        "backlit-panel", "troffer-light", "ceiling-light", "down-light",
        "ufo-high-bay", "linear-high-bay", "linear-strip", "up-and-down-linear-slot-light",
        "vapor-tight", "tube-series", "integrated-tube", "bollards"
      ].includes(categorySlug);

      // Check if it's an accessory category
      const isAccessoryCategory = [
        "emergency-driver", "sensor", "mount-bracket", "surface-mount-kit",
        "ufo-reflector", "remote-control", "transformer", "suspending-rope",
        "junction-box", "adapter", "connector"
      ].includes(categorySlug);

      // Check if it's an area category
      const isAreaCategory = [
        "covered", "damp-location", "dry-location", "indoor"
      ].includes(categorySlug);

      // Check if it's a mounting category
      const isMountingCategory = [
        "hanging-and-pendant", "inlay-and-recessed", "pole-mount", "surface-mount", "wall-mount"
      ].includes(categorySlug);



      if (isProductCategory) {
        // Filter by product category
        filtered = filtered.filter((d) => {
          const slug = d.Category
            ? normalizeCategorySlug(d.Category)
            : findCategoryByTitle(d.Title, d.Description)?.slug ?? "other";
          return slug === categorySlug;
        });
      } else if (isAccessoryCategory) {
        // Filter by accessory category
        filtered = filtered.filter((d) => {
          if (!d.Category) return false;
          
          const slug = normalizeCategorySlug(d.Category);
          
          // Map category slugs to match our URL structure
          const categoryMappings: Record<string, string> = {
            "emergency-driver": "emergency-driver",
            "sensor": "sensor", 
            "mount-bracket": "mount-bracket",
            "surface-mount-kit": "surface-mount-kit",
            "ufo-reflector": "ufo-reflector",
            "remote-control": "remote-control",
            "transformer": "transformer",
            "suspending-rope": "suspending-rope",
            "junction-box": "junction-box",
            "adapter": "adapter",
            "connector": "connector"
          };
          
          return categoryMappings[slug] === categorySlug;
        });
      } else if (isAreaCategory) {
        // Filter by area category using the new area_category field

        const originalLength = filtered.length;
        const categoryName = categorySlug.replace(/-/g, " ");
        const normalizedCategoryName = categoryName.split(" ").map(word => {
          // Handle special cases for proper capitalization
          if (word.toLowerCase() === "and") return "and";
          if (word.toLowerCase() === "or") return "or";
          if (word.toLowerCase() === "of") return "of";
          if (word.toLowerCase() === "in") return "in";
          if (word.toLowerCase() === "on") return "on";
          if (word.toLowerCase() === "at") return "at";
          if (word.toLowerCase() === "to") return "to";
          if (word.toLowerCase() === "for") return "for";
          if (word.toLowerCase() === "with") return "with";
          if (word.toLowerCase() === "by") return "by";
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
        
        filtered = filtered.filter((d) => {
          return d.area_category === normalizedCategoryName;
        });
        console.log(`Area category filter: ${originalLength} -> ${filtered.length} products`);
      } else if (isMountingCategory) {
        // Filter by mounting category using the new mounting_category field

        const originalLength = filtered.length;
        const categoryName = categorySlug.replace(/-/g, " ");
        const normalizedCategoryName = categoryName.split(" ").map(word => {
          // Handle special cases for proper capitalization
          if (word.toLowerCase() === "and") return "and";
          if (word.toLowerCase() === "or") return "or";
          if (word.toLowerCase() === "of") return "of";
          if (word.toLowerCase() === "in") return "in";
          if (word.toLowerCase() === "on") return "on";
          if (word.toLowerCase() === "at") return "at";
          if (word.toLowerCase() === "to") return "to";
          if (word.toLowerCase() === "for") return "for";
          if (word.toLowerCase() === "with") return "with";
          if (word.toLowerCase() === "by") return "by";
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
        
        console.log(`Mounting category debug:`, {
          categorySlug,
          categoryName,
          normalizedCategoryName,
          originalLength
        });
        
        filtered = filtered.filter((d) => {
          const matches = d.mounting_category === normalizedCategoryName;
          if (matches) {
            console.log(`Found matching product:`, {
              Index: d.Index,
              Category: d.Category,
              mounting_category: d.mounting_category
            });
          }
          return matches;
        });
        console.log(`Mounting category filter: ${originalLength} -> ${filtered.length} products`);
      }
    }

    // Apply search query if present
    if (query.length > 0) {
      filtered = filtered.filter((d) => {
        const inTitle = d.Title?.toLowerCase().includes(query);
        const inDesc = d.Description?.toLowerCase().includes(query) ?? false;
        const inVariant = d.Variant?.toLowerCase().includes(query) ?? false;
        const inFeatures = Array.isArray(d.Features)
          ? d.Features.some((f) => f?.toLowerCase().includes(query))
          : false;
        const inCategory = (d.Category || "")
          .toString()
          .toLowerCase()
          .includes(query);
        return inTitle || inDesc || inVariant || inFeatures || inCategory;
      });
    }

    // Sort to prioritize accessories when requested
    if (prioritizeAccessories) {
      filtered = filtered.sort((a, b) => {
        // Check if items are accessories (they have Category but no area_category/mounting_category)
        const aIsAccessory = a.Category && !a.area_category && !a.mounting_category;
        const bIsAccessory = b.Category && !b.area_category && !b.mounting_category;
        
        // Accessories come first
        if (aIsAccessory && !bIsAccessory) return -1;
        if (!aIsAccessory && bIsAccessory) return 1;
        
        // Within same type, maintain original order
        return 0;
      });
    }

    console.log("Final filtered results:", filtered.length);
    return filtered;
  }, [dataset, searchParams, category]);

  // Preload first few images for faster loading
  const preloadImages = useMemo(() => {
    return items.slice(0, 8).map(item => {
      const catSlug = item.Category
        ? normalizeCategorySlug(item.Category)
        : findCategoryByTitle(item.Title, item.Description)?.slug ?? "other";
      return item.mainThumbnail || item.mainImage || legacyProducts.find((p) => p.subcategory === catSlug)?.image || "/placeholder.svg";
    }).filter(img => img !== "/placeholder.svg");
  }, [items]);

  useImagePreload(preloadImages, !isLoading);

  // Trigger staggered animation immediately when data loads
  useEffect(() => {
    if (!isLoading && items.length > 0) {
      // Clear previous animations
      setVisibleItems(new Set());
      
      // Stagger the animation of items
      for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, i]));
        }, i * 100);
      }
    }
  }, [isLoading, items.length]);

  // Also trigger animation for loading skeletons immediately
  useEffect(() => {
    if (isLoading) {
      setVisibleItems(new Set());
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, i]));
        }, i * 100);
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen font-poppins flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-6 mt-16 flex-1">
        {/* Hero */}
        <section className="relative py-32 bg-primary mb-10 rounded-lg">
          <div className="container mx-auto px-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span>/</span>
                <span className="text-white">Products and Accessories</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-sans font-bold text-yellow-400">Product and Accessories</h1>
              <p className="text-xl font-sans text-white max-w-3xl">Browse our full catalog of premium LED lighting solutions and accessories.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block md:w-64 lg:w-72 shrink-0">
            <ProductSidebar />
          </div>
          <div className="flex-1">
            {/* Products Grid */}
            {items.length === 0 && !isLoading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products found.</p>
              </div>
            ) : (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {isLoading
                  ? Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-700 ease-out ${
                          visibleItems.has(index)
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-8 scale-95'
                        }`}
                      >
                        <div className="rounded-lg border border-border overflow-hidden">
                          <div className="aspect-square bg-muted animate-pulse" />
                          <div className="p-4 space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                            <div className="h-3 bg-muted rounded w-full animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))
                  : items.map((item, index) => {
                      const catSlug = item.Category
                        ? normalizeCategorySlug(item.Category)
                        : findCategoryByTitle(item.Title, item.Description)?.slug ?? "other";
                      const image = item.mainThumbnail || item.mainImage || legacyProducts.find((p) => p.subcategory === catSlug)?.image || "/placeholder.svg";
                      return (
                        <div
                          key={`${toSlug(item.Title)}-${item.Index}`}
                          className={`transition-all duration-700 ease-out ${
                            visibleItems.has(index)
                              ? 'opacity-100 translate-y-0 scale-100'
                              : 'opacity-0 translate-y-8 scale-95'
                          }`}
                        >
                          <ProductCard
                            image={image}
                            title={item.Title}
                            description={item.Description ?? ""}
                            variant={item.Variant ?? ""}
                            href={`/products-and-accessories/details/${toSlug(item.Title)}-${item.Index}`}
                            priority={index < 8} // Mark first 8 items as priority for faster loading
                          />
                        </div>
                      );
                    })
                }
              </div>
            )}


          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
