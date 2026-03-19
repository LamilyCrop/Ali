"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

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
      } catch {
        setProductsData([]);
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
    <section id="products" className="border-y border-border/70 bg-background py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={titleRef}
          className={`mb-14 transition-all duration-1000 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col gap-6 border-b border-border/70 pb-10 text-left md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Featured selection
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Lighting made for commercial use.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              A focused sample of fixtures and accessories, presented with quieter hierarchy and
              less visual clutter.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-soft">
                  <div className="aspect-[4/3] bg-muted/70 animate-pulse" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 rounded-full bg-muted animate-pulse" />
                    <div className="h-5 w-3/4 rounded-full bg-muted animate-pulse" />
                    <div className="h-4 w-full rounded-full bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <div
                key={`${product.title}-${index}`}
                className={`transition-all duration-700 ease-out ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
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
