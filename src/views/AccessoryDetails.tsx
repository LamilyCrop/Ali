"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Accessory {
  Index: number;
  Title: string;
  Description: string;
  Features: string[];
  Category: string;
  images: string[];
  mainImage: string;
  thumbnails: string[];
  mainThumbnail: string;
  'Spec Sheet'?: string | null;
  DLC?: string | null;
  'LM79 File'?: string | null;
  'IES File'?: string | null;
}

const AccessoryDetails = () => {
  const params = useParams<{ accessoryId: string }>();
  const accessoryId = params?.accessoryId;
  const [accessory, setAccessory] = useState<Accessory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle ESC key to close zoom modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  useEffect(() => {
    const controller = new AbortController();
    const loadAccessory = async () => {
      try {
        const accessoriesRes = await fetch("/data/accessories_full.json", { 
          cache: "force-cache",
          signal: controller.signal
        });
        if (!accessoriesRes.ok) return;
        
        const accessories: Accessory[] = await accessoriesRes.json();
        const accessoryIndex = parseInt(accessoryId || '0', 10);
        const foundAccessory = accessories.find(acc => acc.Index === accessoryIndex);
        
        if (!controller.signal.aborted && foundAccessory) {
          setAccessory(foundAccessory);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Failed to load accessory:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (accessoryId) {
      loadAccessory();
    }

    return () => controller.abort();
  }, [accessoryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen font-poppins flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 mt-16 flex-1">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="min-h-screen font-poppins flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 mt-16 flex-1">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-muted-foreground mb-4">Accessory Not Found</h1>
            <p className="text-muted-foreground mb-6">The accessory you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/products-and-accessories/all">Back to Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = accessory.images.filter(img => img && img.trim() !== '');
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen font-poppins flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-6 mt-16 flex-1">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/products-and-accessories/all" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </a>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <a href="/accessories" className="hover:text-foreground transition-colors">Accessories</a>
            <span>/</span>
            <a href={`/products-and-accessories/${accessory.Category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground transition-colors">
              {accessory.Category}
            </a>
            <span>/</span>
            <span className="text-foreground">{accessory.Title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Accessory Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-white">
              <img
                src={hasImages ? images[selectedImageIndex] : accessory.mainImage || '/placeholder.svg'}
                alt={accessory.Title}
                className="w-full h-full object-contain cursor-zoom-in"
                loading="lazy"
                onClick={() => setIsZoomed(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/placeholder.svg') {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {hasImages && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-primary' 
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${accessory.Title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessory Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{accessory.Title}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
                <Badge variant="outline">
                  {accessory.Category}
                </Badge>
              </div>
            </div>

            <div className="h-px w-full bg-border" />

            {/* Key Features and Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {accessory.Features && accessory.Features.length > 0 ? (
                  accessory.Features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">High-quality accessory for LED lighting systems</span>
                  </li>
                )}
              </ul>
              
              {/* Accessory Description */}
              {accessory.Description && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-foreground mb-2">Product Description</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {accessory.Description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="text-sm font-medium">{accessory.Category}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Product Code</span>
                <span className="text-sm font-medium">ACC-{accessory.Index.toString().padStart(3, '0')}</span>
              </div>
              {accessory['Spec Sheet'] && (
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Spec Sheet</span>
                  <span className="text-sm font-medium">
                    <a 
                      href={accessory['Spec Sheet']} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Spec Sheet
                    </a>
                  </span>
                </div>
              )}
              {accessory.DLC && (
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">DLC Certificate</span>
                  <span className="text-sm font-medium">
                    <a 
                      href={accessory.DLC} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View DLC Certificate
                    </a>
                  </span>
                </div>
              )}
              {accessory['LM79 File'] && (
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">LM79 Report</span>
                  <span className="text-sm font-medium">
                    <a 
                      href={accessory['LM79 File']} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      View LM79 Report
                    </a>
                  </span>
                </div>
              )}
              {accessory['IES File'] && (
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">IES File</span>
                  <span className="text-sm font-medium">
                    <a 
                      href={accessory['IES File']} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-800 underline"
                    >
                      View IES File
                    </a>
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={hasImages ? images[selectedImageIndex] : accessory.mainImage || '/placeholder.svg'}
              alt={accessory.Title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== '/placeholder.svg') {
                  target.src = '/placeholder.svg';
                }
              }}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AccessoryDetails;
