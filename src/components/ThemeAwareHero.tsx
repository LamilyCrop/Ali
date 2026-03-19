"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const backgroundImages = [
  "/uploads/da7aaf3e-0725-48b9-86a0-942a0dc0b020.png",
  "/uploads/57cca84a-bc3d-46e5-89f5-804bf4d84ad1.png",
  "/uploads/50b9a2a8-ac03-4990-9a91-658d2438adc7.png",
  "/uploads/5ebfc81b-4d98-4097-858c-5fc2abd62d58.png",
  "/uploads/c998f171-aa26-4d1d-b912-ffa640e65a3b.png",
  "/uploads/8754703d-7cae-41f2-9681-091308d895f8.png",
];

const heroFacts = ["TAA-compliant options", "Nationwide delivery", "Warranty-backed support"];

const ThemeAwareHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsTransitioning(true);

      timeoutRef.current = window.setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 450);
    }, 10000);

    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale contrast-125 transition-opacity duration-700 ease-out"
          aria-hidden="true"
          style={{
            backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
            opacity: isTransitioning ? 0.12 : 0.22,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background)/0.78)_40%,hsl(var(--background))_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,hsl(var(--background)))]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex min-h-[calc(100vh-5rem)] items-end pb-14 pt-32 sm:pb-20">
          <div className="max-w-4xl border-t border-border/80 pt-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Specification-first catalog
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-[5.4rem] md:leading-[0.95]">
              American Lighting Industry Corp
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              ALI supplies commercial and industrial LED systems for distributors, contractors,
              and buyers who need dependable products, clear documentation, and restrained
              presentation.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-[12rem]">
                <a href="/products-and-accessories/all">Explore products</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[12rem]">
                <a href="/about#top">Company overview</a>
              </Button>
            </div>

            <div className="mt-12 grid gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:grid-cols-3">
              {heroFacts.map((fact) => (
                <div key={fact} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeAwareHero;
