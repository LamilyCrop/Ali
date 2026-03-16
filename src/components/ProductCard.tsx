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

  const content = (
    <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer">
      <div 
        ref={containerRef}
        className="aspect-square overflow-hidden bg-white relative border-2 border-white"
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white animate-pulse" />
        )}
        
        {/* Image */}
        {isInView && (
          <img
            ref={imgRef}
            src={hasError ? "/placeholder.svg" : getValidImageSrc(image)}
            alt={title}
            className={`w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            // Optimize image loading
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="text-muted-foreground text-sm leading-relaxed space-y-1">
          {/* Line 1: Variant information */}
          <p className="font-medium text-primary">
            {(() => {
              // Use the variant prop if available, otherwise extract from title/description
              if (variant && variant.trim()) {
                // Clean up the variant string - remove parentheses and extra spaces
                return variant.replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
              }
              
              // Fallback: extract variant info from title and description
              let variantInfo = '';
              
              // Extract wattage variants (e.g., "70W/100W/150W")
              const wattageMatch = title.match(/(\d+W(?:\/\d+W)*)/) || description.match(/(\d+W(?:\/\d+W)*)/);
              if (wattageMatch) variantInfo += wattageMatch[0];
              
              // Extract CCT variants (e.g., "3000/4000/5000K")
              const cctMatch = description.match(/(\d+\/\d+\/\d+K)/) || description.match(/(\d+K)/);
              if (cctMatch) {
                if (variantInfo) variantInfo += ', ';
                variantInfo += cctMatch[0];
              }
              
              // Extract voltage if present
              const voltageMatch = description.match(/(\d+V)/);
              if (voltageMatch) {
                if (variantInfo) variantInfo += ', ';
                variantInfo += voltageMatch[0];
              }
              
              return variantInfo || 'Standard';
            })()}
          </p>
          
          {/* Line 2: Brief descriptive summary */}
          <p>
            {(() => {
              // Create a concise summary based on the product type and key features
              let summary = '';
              
              if (title.toLowerCase().includes('area light') || title.toLowerCase().includes('flood light')) {
                summary = 'Versatile outdoor lighting solution';
              } else if (title.toLowerCase().includes('wall pack')) {
                summary = 'Reliable wall-mounted lighting solution';
              } else if (title.toLowerCase().includes('ceiling')) {
                summary = 'Modern ceiling lighting fixture';
              } else if (title.toLowerCase().includes('down light')) {
                summary = 'Elegant recessed lighting option';
              } else if (title.toLowerCase().includes('high bay')) {
                summary = 'High-performance industrial lighting';
              } else if (title.toLowerCase().includes('emergency')) {
                summary = 'Emergency backup lighting system';
              } else if (title.toLowerCase().includes('sensor')) {
                summary = 'Smart motion detection sensor';
              } else if (title.toLowerCase().includes('driver')) {
                summary = 'LED power management solution';
              } else if (title.toLowerCase().includes('mount')) {
                summary = 'Flexible mounting hardware';
              } else if (title.toLowerCase().includes('reflector')) {
                summary = 'Optical enhancement accessory';
              } else {
                // Fallback: extract key benefit from description
                const keyWords = ['modern', 'versatile', 'reliable', 'efficient', 'durable', 'smart'];
                for (const word of keyWords) {
                  if (description.toLowerCase().includes(word)) {
                    summary = `${word.charAt(0).toUpperCase() + word.slice(1)} lighting solution`;
                    break;
                  }
                }
                if (!summary) {
                  summary = 'Professional lighting solution';
                }
              }
              
              return summary;
            })()}
          </p>
        </div>
      </div>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return (
    <a href={`/products-and-accessories/details/al-001`} className="block">
      {content}
    </a>
  );
};

export default ProductCard;