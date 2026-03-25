"use client";

import { Button } from "@/components/ui/button";

const backgroundImages = [
  "/uploads/da7aaf3e-0725-48b9-86a0-942a0dc0b020.png",
  "/uploads/57cca84a-bc3d-46e5-89f5-804bf4d84ad1.png",
  "/uploads/50b9a2a8-ac03-4990-9a91-658d2438adc7.png",
  "/uploads/5ebfc81b-4d98-4097-858c-5fc2abd62d58.png",
  "/uploads/c998f171-aa26-4d1d-b912-ffa640e65a3b.png",
  "/uploads/8754703d-7cae-41f2-9681-091308d895f8.png",
];

const ThemeAwareHero = () => {
  const backgroundImage = backgroundImages[0];

  return (
    <section className="relative isolate overflow-hidden border-b border-primary/10 bg-background">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            opacity: 0.12,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background)/0.78)_40%,hsl(var(--background))_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,hsl(var(--background)))]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex min-h-[calc(100vh-5rem)] items-end pb-14 pt-32 sm:pb-20">
          <div className="max-w-4xl pt-8">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-[5.4rem] md:leading-[0.95]">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeAwareHero;
