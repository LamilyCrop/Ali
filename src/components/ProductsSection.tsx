"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { useImagePreload } from "@/hooks/use-image-preload";

type DatasetSpec = Record<string, unknown>;
interface ProductData {
  Index: number;
  Title: string;
  Description: string | null;
  Features: string[];
  Category: string;
  images: string[];
  mainImage: string;
  thumbnails?: string[];
  mainThumbnail?: string;
  Specs: DatasetSpec[];
  AccessoriesSectionPresent: boolean;
  Variant: string | null;
  area_category?: string;
  mounting_category?: string;
}

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ProductsSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: gridRef, visibleItems } = useStaggeredAnimation(10, 150);
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load product data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsRes = await fetch("/data/products_full_with_forms.json", { cache: "no-cache" });
        if (productsRes.ok) {
          const products = await productsRes.json() as ProductData[];
          setProductsData(products);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Select featured products (first 10 products from the data)
  const featuredProducts = useMemo(() => {
    return productsData.slice(0, 10).map(product => ({
      image: product.mainThumbnail || product.mainImage || "/placeholder.svg",
      title: product.Title,
      description: product.Description || "Premium LED lighting solution for commercial and industrial applications",
      variant: product.Variant || "",
      href: `/products-and-accessories/details/${toSlug(product.Title)}-${product.Index}`
    }));
  }, [productsData]);

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Best Offer for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium LED lighting solutions,
            designed to meet the demanding requirements of commercial and industrial applications.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${visibleItems.has(index)
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
          ) : (
            featuredProducts.map((product, index) => (
              <div
                key={`${product.title}-${index}`}
                className={`transition-all duration-700 ease-out ${visibleItems.has(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                  }`}
              >
                <ProductCard {...product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;