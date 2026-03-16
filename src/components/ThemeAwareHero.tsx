"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeAwareHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of background images
  const backgroundImages = [
    '/uploads/da7aaf3e-0725-48b9-86a0-942a0dc0b020.png',
    '/uploads/57cca84a-bc3d-46e5-89f5-804bf4d84ad1.png',
    '/uploads/50b9a2a8-ac03-4990-9a91-658d2438adc7.png',
    '/uploads/5ebfc81b-4d98-4097-858c-5fc2abd62d58.png',
    '/uploads/c998f171-aa26-4d1d-b912-ffa640e65a3b.png',
    '/uploads/8754703d-7cae-41f2-9681-091308d895f8.png'
  ];

  // Removed scroll listener to eliminate parallax/scrolling effect

  // Cycle through background images every 10 seconds with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        );
        setIsTransitioning(false);
      }, 500); // Half second fade out, then change image and fade in
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Fixed content for the single theme
  const content = {
    title: "Lamily Corp",
    subtitle:
      "Leading provider of premium LED lighting solutions. Competitive prices, superior quality, and innovative designs for commercial and industrial applications.",
    button1: "Explore Products",
    button2: "Our Story",
  } as const;

  // Fixed styling classes for the single theme (based on previous "premium")
  const classes = {
    container:
      "relative min-h-screen flex items-center justify-center overflow-hidden",
    background:
      "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out",
    title:
      "text-5xl md:text-7xl font-sans font-bold text-yellow-300 drop-shadow-[0_0_16px_rgba(250,204,21,0.75)] mb-6 leading-tight",
    subtitle:
      "text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed",
    button1:
      "bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-glow transition-all hover:scale-105",
    button2:
      "bg-accent text-white hover:bg-accent/90 px-8 py-6 text-lg font-semibold transition-all hover:scale-105 shadow-glow",
  } as const;

  return (
    <section className={classes.container}>
      {/* Background Image */}
      <div 
        className={classes.background}
        style={{
          backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImages[currentImageIndex]}')`,
          opacity: isTransitioning ? 0.3 : 1
        }}
      />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_hsl(var(--accent)/0.1)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in opacity-0 translate-y-8" style={{ animation: 'fade-in 1s ease-out 0.3s both' }}>
          <h1 className={classes.title}>{content.title}</h1>
          
          <p className={classes.subtitle}>
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 translate-y-8" style={{ animation: 'fade-in 1s ease-out 0.8s both' }}>
            <a href="/products-and-accessories/all">
              <Button size="lg" className={classes.button1}>
                {content.button1}
              </Button>
            </a>
            <a href="/about#top">
              <Button size="lg" className={classes.button2}>
                {content.button2}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements removed */
      }
    </section>
  );
};

export default ThemeAwareHero;