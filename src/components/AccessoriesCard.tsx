import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Accessory {
  index: number;
  title: string;
  category: string;
  variant: string;
  description: string;
  mainImage: string;
}

interface AccessoriesCardProps {
  productIndex: number;
  productTitle: string;
  productVariant: string;
  matchingAccessories: Accessory[];
  totalAccessories: number;
}

const AccessoriesCard = ({ 
  productIndex, 
  productTitle, 
  productVariant,
  matchingAccessories, 
  totalAccessories 
}: AccessoriesCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (totalAccessories === 0) {
    return null;
  }

  const itemsPerView = 4; // Show 4 small cards at a time
  const maxIndex = Math.max(0, matchingAccessories.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / matchingAccessories.length;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  return (
    <Card className="overflow-hidden border border-primary/10">
      {/* Header */}
      <div className="border-b border-primary/10 bg-background p-4 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">
              Compatible Accessories
            </h3>
            <p className="text-sm text-muted-foreground">
              {totalAccessories} accessories available for {productTitle}
              {productVariant && ` (${productVariant})`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {maxIndex + 1}
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-2 rounded-full hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className="p-2 rounded-full hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessories Carousel */}
      <div className="p-4 pt-6">
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {matchingAccessories.map((accessory) => {
              return (
                <a
                  key={accessory.index}
                  href={`/accessories/details/${accessory.index}`}
                  className="block w-48 flex-shrink-0 overflow-hidden rounded-lg border border-primary/10 bg-background no-underline transition-colors duration-200 hover:border-primary/20"
                >
                  {/* Accessory Image */}
                  <div className="aspect-square overflow-hidden border-b border-primary/10 bg-background">
                    <img
                      src={accessory.mainImage}
                      alt={accessory.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log(`Failed to load accessory image: ${accessory.mainImage}`);
                        target.src = '/placeholder.svg';
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded accessory image: ${accessory.mainImage}`);
                      }}
                    />
                  </div>

                  {/* Accessory Info */}
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
                      {accessory.title}
                    </h4>
                    {accessory.variant && (
                      <p className="text-xs text-primary font-medium mb-1 line-clamp-1">
                        {accessory.variant}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {accessory.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {accessory.category}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators */}
        {matchingAccessories.length > itemsPerView && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccessoriesCard;
