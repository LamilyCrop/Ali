"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

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
    <section
      id="products"
      className="border-y border-primary/10 bg-background py-20 sm:py-28"
    >
      <div className="container mx-auto px-6">
        <div className="mb-14">
          <div className="flex flex-col gap-6 border-b border-primary/10 pb-10 text-left md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-primary/75">
                Featured selection
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Lighting made for <span className="text-primary">commercial use.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              A focused sample of fixtures and accessories, presented with quieter hierarchy and
              less visual clutter.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <div className="overflow-hidden rounded-lg border border-border/80 bg-card">
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
              <div key={`${product.title}-${index}`}>
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
