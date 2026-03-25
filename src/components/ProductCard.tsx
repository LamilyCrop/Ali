import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  variant?: string;
  href?: string;
  priority?: boolean; // For above-the-fold images
}

const ProductCard = ({ image, title, description, variant, href, priority = false }: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    // Try swapping extension once before giving up
    if (!target.dataset.swapTried) {
      target.dataset.swapTried = '1';
      if (target.src.endsWith('.jpg')) {
        target.src = target.src.replace(/\.jpg($|\?)/i, '.png$1');
        return;
      }
      if (target.src.endsWith('.png')) {
        target.src = target.src.replace(/\.png($|\?)/i, '.jpg$1');
        return;
      }
    }
    setHasError(true);
    setIsLoaded(true); // Still show the container
  };

  // Validate image source
  const getValidImageSrc = (src: string) => {
    if (!src || src === '' || src === 'undefined') {
      return '/placeholder.svg';
    }
    return src;
  };

  const getVariantLabel = () => {
    if (variant && variant.trim()) {
      return variant.replace(/[()]/g, "").replace(/\s+/g, " ").trim();
    }

    let variantInfo = "";
    const wattageMatch = title.match(/(\d+W(?:\/\d+W)*)/) || description.match(/(\d+W(?:\/\d+W)*)/);
    if (wattageMatch) variantInfo += wattageMatch[0];

    const cctMatch = description.match(/(\d+\/\d+\/\d+K)/) || description.match(/(\d+K)/);
    if (cctMatch) {
      if (variantInfo) variantInfo += ", ";
      variantInfo += cctMatch[0];
    }

    const voltageMatch = description.match(/(\d+V)/);
    if (voltageMatch) {
      if (variantInfo) variantInfo += ", ";
      variantInfo += voltageMatch[0];
    }

    return variantInfo || "Standard";
  };

  const getSummary = () => {
    if (title.toLowerCase().includes("area light") || title.toLowerCase().includes("flood light")) {
      return "Versatile outdoor lighting solution";
    }
    if (title.toLowerCase().includes("wall pack")) {
      return "Reliable wall-mounted lighting solution";
    }
    if (title.toLowerCase().includes("ceiling")) {
      return "Modern ceiling lighting fixture";
    }
    if (title.toLowerCase().includes("down light")) {
      return "Elegant recessed lighting option";
    }
    if (title.toLowerCase().includes("high bay")) {
      return "High-performance industrial lighting";
    }
    if (title.toLowerCase().includes("emergency")) {
      return "Emergency backup lighting system";
    }
    if (title.toLowerCase().includes("sensor")) {
      return "Smart motion detection sensor";
    }
    if (title.toLowerCase().includes("driver")) {
      return "LED power management solution";
    }
    if (title.toLowerCase().includes("mount")) {
      return "Flexible mounting hardware";
    }
    if (title.toLowerCase().includes("reflector")) {
      return "Optical enhancement accessory";
    }

    const keyWords = ["modern", "versatile", "reliable", "efficient", "durable", "smart"];
    for (const word of keyWords) {
      if (description.toLowerCase().includes(word)) {
        return `${word.charAt(0).toUpperCase() + word.slice(1)} lighting solution`;
      }
    }

    return "Professional lighting solution";
  };

  const content = (
    <Card className="h-full overflow-hidden border-border/80 bg-card transition-colors duration-200 hover:border-primary/20">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden border-b border-border/80 bg-background p-8"
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted/80 animate-pulse" />
        )}

        {isInView && (
          <img
            ref={imgRef}
            src={hasError ? "/placeholder.svg" : getValidImageSrc(image)}
            alt={title}
            className={`h-full w-full object-contain ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}
      </div>
      <div className="flex min-h-[11rem] flex-col gap-3 p-5">
        <p className="flex items-start gap-2 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.18em] text-primary/80">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="min-w-0 break-words">
            {getVariantLabel()}
          </span>
        </p>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{getSummary()}</p>
      </div>
    </Card>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={`/products-and-accessories/details/al-001`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {content}
    </a>
  );
};

export default ProductCard;
