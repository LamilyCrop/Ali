"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Shield, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessoriesCard from '@/components/AccessoriesCard';
import { getProductById } from '@/data/products';
import { Product } from '@/types/product';

interface TechnicalFile {
  name: string;
  file: string;
  show: boolean;
}

type DatasetSpec = Record<string, string | null | TechnicalFile[]>;

interface DatasetEntry {
  Index: number;
  Title: string;
  Variant: string | null;
  Description: string | null;
  Features: string[];
  AccessoriesSectionPresent: boolean;
  Specs: DatasetSpec[];
  Category?: string | null;
  area_category?: string;
  mounting_category?: string;
  images?: string[];
  mainImage?: string;
  DLC?: string | null;
  'Spec Sheet'?: string | null;
}

interface AccessoryMapping {
  productIndex: number;
  productTitle: string;
  productCategory: string;
  productVariant: string;
  matchingAccessories: Array<{
    index: number;
    title: string;
    category: string;
    variant: string;
    description: string;
    mainImage: string;
  }>;
  totalAccessories: number;
}

const ProductDetails = () => {
  const params = useParams<{ productId: string; categoryId?: string }>();
  const productId = params?.productId;
  const categoryId = params?.categoryId;

  const product: Product | undefined = typeof productId === 'string' ? getProductById(productId) : undefined;

  const [dataset, setDataset] = useState<DatasetEntry[] | null>(null);
  const [accessoryMappings, setAccessoryMappings] = useState<Record<number, AccessoryMapping> | null>(null);
  const [selectedSkuIndex, setSelectedSkuIndex] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);



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
    let isActive = true;
    const load = async () => {
      try {
        // Load products, accessories, and accessory mappings in parallel
        const [productsRes, accessoriesRes, mappingsRes] = await Promise.all([
          fetch("/data/products_full_with_forms.json", { cache: "no-cache" }),
          fetch("/data/accessories_full.json", { cache: "no-cache" }),
          fetch("/data/accessory_mappings.json", { cache: "no-cache" })
        ]);
        
        if (!productsRes.ok) {
          return;
        }
        
        const [products, accessories, mappings] = await Promise.all([
          productsRes.json() as Promise<DatasetEntry[]>,
          accessoriesRes.ok ? accessoriesRes.json() as Promise<DatasetEntry[]> : [],
          mappingsRes.ok ? mappingsRes.json() as Promise<Record<number, AccessoryMapping>> : null
        ]);
        

        
        // Transform accessories to match the expected structure
        const transformedAccessories = accessories.map(accessory => ({
          ...accessory,
          Specs: [], // Accessories don't have specs like products
          AccessoriesSectionPresent: false,
          Variant: null,
          area_category: undefined,
          mounting_category: undefined
        }));
        
        // Combine products and accessories
        const combinedData = [...products, ...transformedAccessories];
        

        
        if (isActive) {
          setDataset(combinedData);
          setAccessoryMappings(mappings);
        }
      } catch {
        // ignore fetch errors; dataset stays null
      } finally {
        if (isActive) setIsLoading(false);
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, []);

  function toSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  const matchedDatasetEntry: DatasetEntry | null = useMemo(() => {
    if (!dataset) return null;
    const pid = typeof productId === 'string' ? productId : '';
    
    // Extract index from URL like "area-light-1" -> 1, "flood-light-10" -> 10
    const suffixMatch = pid.match(/.*?-(\d+)$/);
    
    if (suffixMatch) {
      const idx = parseInt(suffixMatch[1], 10);
      
      // First try to find by exact Index match
      const found = dataset.find((d) => d.Index === idx);
      
      // If we found something, check if it's the right type based on URL keywords
      if (found) {
        // Check if URL suggests this should be an accessory
        const urlLower = pid.toLowerCase();
        const isAccessoryUrl = urlLower.includes('sensor') || 
                              urlLower.includes('emergency') || 
                              urlLower.includes('driver') || 
                              urlLower.includes('bracket') || 
                              urlLower.includes('kit') || 
                              urlLower.includes('reflector') || 
                              urlLower.includes('control') || 
                              urlLower.includes('transformer') || 
                              urlLower.includes('rope') || 
                              urlLower.includes('junction') || 
                              urlLower.includes('adapter') || 
                              urlLower.includes('connector');
        
        if (isAccessoryUrl && found.Category) {
          // URL suggests accessory, but we found a product - look for accessory instead
          const accessoryMatch = dataset.find((d) => 
            d.Index === idx && 
            d.Category && 
            (d.Category.toLowerCase().includes('sensor') || 
             d.Category.toLowerCase().includes('emergency') ||
             d.Category.toLowerCase().includes('driver') ||
             d.Category.toLowerCase().includes('category') ||
             d.Category.toLowerCase().includes('kit') ||
             d.Category.toLowerCase().includes('reflector') ||
             d.Category.toLowerCase().includes('control') ||
             d.Category.toLowerCase().includes('transformer') ||
             d.Category.toLowerCase().includes('rope') ||
             d.Category.toLowerCase().includes('junction') ||
             d.Category.toLowerCase().includes('adapter') ||
             d.Category.toLowerCase().includes('connector'))
          );
          
          if (accessoryMatch) {
            return accessoryMatch;
          }
        }
        
        // If no accessory found or URL doesn't suggest accessory, return what we found
        return found;
      }
    }
    
    // If no exact index match, try to find by title/keywords
    const titleMatch = pid.replace(/-/g, ' ').toLowerCase();
    
    // Try exact title match first
    let foundByTitle = dataset.find((d) => 
      d.Title.toLowerCase().replace(/\s+/g, '-') === titleMatch
    );
    
    // If no exact match, try partial title match
    if (!foundByTitle) {
      foundByTitle = dataset.find((d) => 
        d.Title.toLowerCase().includes(titleMatch) ||
        titleMatch.includes(d.Title.toLowerCase())
      );
    }
    
    // If still no match, try category-based search for accessories
    if (!foundByTitle) {
      const categoryKeywords = pid.split('-');
      foundByTitle = dataset.find((d) => {
        if (d.Category) {
          return categoryKeywords.some(keyword => 
            d.Category!.toLowerCase().includes(keyword) ||
            d.Title.toLowerCase().includes(keyword)
          );
        }
        return false;
      });
    }
    
    // If still no match, try to find by URL pattern for accessories
    // URLs like "infrared-sensor-for-high-bay-8" should find accessory Index 8
    if (!foundByTitle && suffixMatch) {
      const idx = parseInt(suffixMatch[1], 10);
      // Look specifically for accessories with this index
      const accessoryMatch = dataset.find((d) => 
        d.Index === idx && 
        (d.Category?.toLowerCase().includes('sensor') || 
         d.Category?.toLowerCase().includes('emergency') ||
         d.Category?.toLowerCase().includes('driver') ||
         d.Category?.toLowerCase().includes('bracket') ||
         d.Category?.toLowerCase().includes('kit') ||
         d.Category?.toLowerCase().includes('reflector') ||
         d.Category?.toLowerCase().includes('control') ||
         d.Category?.toLowerCase().includes('transformer') ||
         d.Category?.toLowerCase().includes('rope') ||
         d.Category?.toLowerCase().includes('junction') ||
         d.Category?.toLowerCase().includes('adapter') ||
         d.Category?.toLowerCase().includes('connector'))
      );
      if (accessoryMatch) {
        return accessoryMatch;
      }
    }
    
    if (foundByTitle) {
      return foundByTitle;
    }
    
    return null;
  }, [dataset, productId]);

  useEffect(() => {
    setSelectedSkuIndex(0);
    setSelectedImageIndex(0);
  }, [matchedDatasetEntry?.Index]);

  // While loading, show skeleton instead of flashing Not Found
  if (isLoading) {
    return (
      <div className="min-h-screen font-poppins flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 mt-16 flex-1">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-pulse">
            <div className="h-4 w-16 bg-muted rounded" />
            <span>/</span>
            <div className="h-4 w-24 bg-muted rounded" />
            <span>/</span>
            <div className="h-4 w-28 bg-muted rounded" />
          </div>

          {/* Main layout skeleton */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden animate-pulse" />
            </div>

            {/* Right panel skeleton */}
            <div className="space-y-6">
              <div className="space-y-3 animate-pulse">
                <div className="h-8 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-6 bg-muted rounded w-1/4" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-24 bg-muted rounded" />
                  <div className="h-6 w-28 bg-muted rounded" />
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              <div className="animate-pulse">
                <div className="h-5 bg-muted rounded w-40 mb-3" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description and Specs cards skeleton */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="h-5 w-44 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2 animate-pulse">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-5 w-56 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="animate-pulse">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b last:border-b-0 border-border">
                          <td className="py-3 pr-4">
                            <div className="h-4 w-24 bg-muted rounded" />
                          </td>
                          <td className="py-3">
                            <div className="h-4 w-40 bg-muted rounded" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product && !matchedDatasetEntry) {
    return (
      <div className="min-h-screen font-poppins flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-poppins flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-6 mt-16 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          {categoryId ? (
            <>
              <a
                href={`/products-and-accessories/${categoryId}`}
                className="hover:text-primary transition-colors capitalize"
              >
                {categoryId.replace('-', ' ')}
              </a>
              <span>/</span>
            </>
          ) : (
            <>
              <a href="/#products" className="hover:text-primary transition-colors">Products</a>
              <span>/</span>
              <span className="capitalize">{product ? product.subcategory.replace('-', ' ') : (matchedDatasetEntry?.Title || '')}</span>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{matchedDatasetEntry?.Title || product?.name || ''}</span>
        </div>

        {/* Main Product Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-white p-6 md:p-8 lg:p-12 shadow-sm">
              <img
                src={
                  matchedDatasetEntry?.images && matchedDatasetEntry.images.length > 0
                    ? matchedDatasetEntry.images[selectedImageIndex] || '/placeholder.svg'
                    : matchedDatasetEntry?.mainImage || product?.image || '/placeholder.svg'
                }
                alt={matchedDatasetEntry?.Title || product?.name || ''}
                className="w-full h-full object-contain cursor-zoom-in"
                loading="lazy"
                onClick={() => setIsZoomed(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.jpg')) {
                    target.src = target.src.replace(/\.jpg($|\?)/i, '.png$1');
                    return;
                  }
                  if (target.src.endsWith('.png')) {
                    target.src = target.src.replace(/\.png($|\?)/i, '.jpg$1');
                    return;
                  }
                  if (target.src !== '/placeholder.svg') {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {matchedDatasetEntry?.images && matchedDatasetEntry.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {matchedDatasetEntry.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 bg-white transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-primary' 
                        : 'border-white'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${matchedDatasetEntry.Title} - Image ${index + 1}`}
                      className="w-full h-full object-contain bg-white"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.endsWith('.jpg')) {
                          target.src = target.src.replace(/\.jpg($|\?)/i, '.png$1');
                          return;
                        }
                        if (target.src.endsWith('.png')) {
                          target.src = target.src.replace(/\.png($|\?)/i, '.jpg$1');
                          return;
                        }
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

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{matchedDatasetEntry?.Title || product?.name || ''}</h1>
              {matchedDatasetEntry?.Variant && (
                <p className="text-sm text-muted-foreground mb-4">Variant: {matchedDatasetEntry.Variant}</p>
              )}

              {product?.price && (
                <div className="text-2xl font-bold text-primary mb-4">
                  ${product.price.toFixed(2)}
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  {product ? product.availability : 'In Stock'}
                </Badge>
                {product?.warranty && (
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    {product.warranty} Warranty
                  </Badge>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-border" />

            {/* Key Features and Description (from dataset if available, fallback to product) */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {(matchedDatasetEntry?.Features?.length ? matchedDatasetEntry.Features : (product?.features || [])).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Product Description moved here */}
              {matchedDatasetEntry?.Description && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-foreground mb-2">Product Description</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {matchedDatasetEntry.Description}
                  </p>
                </div>
              )}
            </div>

            {/* Certifications */}
            {product?.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Technical Specifications - Full Width */}
        <div className="w-full mt-8" style={{ gridColumn: '1 / -1' }}>
          {/* Specs Table (from dataset), fallback to legacy technical specs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Technical Specifications</CardTitle>
              <p className="text-sm text-muted-foreground">
                Complete technical details and specifications for {matchedDatasetEntry?.Title || product?.name || 'this product'}
              </p>
            </CardHeader>
            <CardContent>
              {matchedDatasetEntry?.Specs && matchedDatasetEntry.Specs.length > 0 && matchedDatasetEntry.Specs[0] && Object.keys(matchedDatasetEntry.Specs[0]).some(key => key !== 'SIZE' && key !== 'TYPE' && key !== 'PC') ? (
                // Products with meaningful Specs array (not just empty accessory specs)
                <div className="space-y-3">
                  {matchedDatasetEntry.Specs.length > 1 && (
                    <div className="mb-2">
                      <label className="text-sm text-muted-foreground mr-2">Select SKU</label>
                      <select
                        className="px-3 py-2 border rounded-md bg-background"
                        value={selectedSkuIndex}
                        onChange={(e) => setSelectedSkuIndex(parseInt(e.target.value, 10))}
                      >
                        {matchedDatasetEntry.Specs.map((spec, idx) => (
                          <option key={idx} value={idx}>
                            {typeof spec.SKU === 'string' ? spec.SKU : `Option ${idx + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {/* Product Basic Info */}
                        <tr className="border-b border-border bg-muted/30">
                          <td className="py-3 pr-4 text-muted-foreground font-medium" colSpan={2}>
                            Product Information
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Product Name</td>
                          <td className="py-2 font-medium">{matchedDatasetEntry.Title}</td>
                        </tr>
                        {matchedDatasetEntry.Variant && (
                          <tr className="border-b border-border">
                            <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Variant</td>
                            <td className="py-2 font-medium">{matchedDatasetEntry.Variant}</td>
                          </tr>
                        )}
                        {matchedDatasetEntry.Category && (
                          <tr className="border-b border-border">
                            <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Category</td>
                            <td className="py-2 font-medium">{matchedDatasetEntry.Category}</td>
                          </tr>
                        )}
                        
                        {/* Technical Specs */}
                        <tr className="border-b border-border bg-muted/30">
                          <td className="py-3 pr-4 text-muted-foreground font-medium" colSpan={2}>
                            Technical Specifications
                          </td>
                        </tr>
                        {Object.entries(matchedDatasetEntry.Specs[selectedSkuIndex] || {})
                          .filter(([key, value]) => {
                            // Always show important fields like DLC, DLC Files, IES Files, LM79 Files, LM79 File, and Spec Sheet
                            if (key === 'DLC' || key === 'DLC Files' || key === 'IES Files' || key === 'LM79 Files' || key === 'LM79 File' || key === 'Spec Sheet') {
                              return true;
                            }
                            // Filter out empty SIZE, TYPE, PC fields
                            if (key === 'SIZE' || key === 'TYPE' || key === 'PC') {
                              return value && value !== '' && value !== null;
                            }
                            // Show all other fields
                            return true;
                          })
                          .map(([key, value]) => (
                            <tr key={key} className="border-b last:border-b-0 border-border">
                              <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">{key}</td>
                              <td className="py-2 font-medium">
                                {key === 'Spec Sheet' && value && typeof value === 'string' ? (
                                  <a 
                                    href={value} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    View Spec Sheet
                                  </a>
                                ) : key === 'DLC Files' && Array.isArray(value) ? (
                                  <div className="space-y-1">
                                    {value.map((dlcFile: TechnicalFile, index: number) => (
                                      dlcFile.show ? (
                                        <a 
                                          key={index}
                                          href={dlcFile.file} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="block text-green-600 hover:text-green-800 underline text-sm"
                                        >
                                          {dlcFile.name}
                                        </a>
                                      ) : null
                                    ))}
                                  </div>
                                ) : key === 'DLC' && value && typeof value === 'string' ? (
                                  <a 
                                    href={value} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 underline"
                                  >
                                    View DLC Certificate
                                  </a>
                                ) : key === 'DLC' && !value ? (
                                  <span className="text-muted-foreground">Not Available</span>
                                ) : key === 'LM79 Files' && Array.isArray(value) ? (
                                  <div className="space-y-1">
                                    {value.map((lm79File: TechnicalFile, index: number) => (
                                      lm79File.show ? (
                                        <a 
                                          key={index}
                                          href={lm79File.file} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="block text-purple-600 hover:text-purple-800 underline text-sm"
                                        >
                                          {lm79File.name}
                                        </a>
                                      ) : null
                                    ))}
                                  </div>
                                ) : key === 'LM79 File' && value && typeof value === 'string' ? (
                                  <a 
                                    href={value} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-800 underline"
                                  >
                                    View LM79 Report
                                  </a>
                                ) : key === 'IES Files' && Array.isArray(value) ? (
                                  <div className="space-y-1">
                                    {value.map((iesFile: TechnicalFile, index: number) => (
                                      iesFile.show ? (
                                        <a 
                                          key={index}
                                          href={iesFile.file} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="block text-orange-600 hover:text-orange-800 underline text-sm"
                                        >
                                          {iesFile.name}
                                        </a>
                                      ) : null
                                    ))}
                                  </div>
                                ) : (key === 'DLC Files' || key === 'IES Files' || key === 'LM79 Files' || key === 'LM79 File') && !value ? (
                                  <span className="text-muted-foreground">Not Available</span>
                                ) : Array.isArray(value) ? (
                                  <span className="text-muted-foreground">Multiple files available</span>
                                ) : (
                                  value ?? ''
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {matchedDatasetEntry.AccessoriesSectionPresent && (
                    <p className="text-xs text-muted-foreground">Accessories available for this product.</p>
                  )}
                </div>
              ) : matchedDatasetEntry?.['Spec Sheet'] ? (
                // Accessories with direct Spec Sheet field
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {/* Accessory Basic Info */}
                        <tr className="border-b border-border bg-muted/30">
                          <td className="py-3 pr-4 text-muted-foreground font-medium" colSpan={2}>
                            Accessory Information
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Accessory Name</td>
                          <td className="py-2 font-medium">{matchedDatasetEntry.Title}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Category</td>
                          <td className="py-2 font-medium">{matchedDatasetEntry.Category}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Product Code</td>
                          <td className="py-2 font-medium">ACC-{matchedDatasetEntry.Index.toString().padStart(3, '0')}</td>
                        </tr>
                        
                        {/* Accessory Specs */}
                        <tr className="border-b border-border bg-muted/30">
                          <td className="py-3 pr-4 text-muted-foreground font-medium" colSpan={2}>
                            Specifications
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">Spec Sheet</td>
                          <td className="py-2 font-medium">
                            <a 
                              href={matchedDatasetEntry['Spec Sheet']} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              View Spec Sheet
                            </a>
                          </td>
                        </tr>
                        {matchedDatasetEntry.DLC && (
                          <tr className="border-b border-border last:border-b-0">
                            <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">DLC Certificate</td>
                            <td className="py-2 font-medium">
                              <a 
                                href={matchedDatasetEntry.DLC} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 underline"
                              >
                                View DLC Certificate
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Fallback to legacy product specifications
                <div className="space-y-3">
                  {product && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Compatible Accessories Section - Only show for products, not accessories */}
        {matchedDatasetEntry && 
         accessoryMappings && 
         accessoryMappings[matchedDatasetEntry.Index] && 
         accessoryMappings[matchedDatasetEntry.Index].totalAccessories > 0 &&
         // Only show for products, not accessories
         !matchedDatasetEntry.Category?.toLowerCase().includes('emergency driver') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('sensor') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('mount bracket') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('surface mount kit') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('ufo reflector') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('remote control') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('transformer') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('suspending rope') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('junction box') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('adapter') &&
         !matchedDatasetEntry.Category?.toLowerCase().includes('connector') && (
          <div className="mt-12">
            <AccessoriesCard
              productIndex={matchedDatasetEntry.Index}
              productTitle={matchedDatasetEntry.Title}
              productVariant={matchedDatasetEntry.Variant || ''}
              matchingAccessories={accessoryMappings[matchedDatasetEntry.Index].matchingAccessories}
              totalAccessories={accessoryMappings[matchedDatasetEntry.Index].totalAccessories}
            />
          </div>
        )}
      </main>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={
                matchedDatasetEntry?.images && matchedDatasetEntry.images.length > 0
                  ? matchedDatasetEntry.images[selectedImageIndex] || '/placeholder.svg'
                  : matchedDatasetEntry?.mainImage || product?.image || '/placeholder.svg'
              }
              alt={matchedDatasetEntry?.Title || product?.name || ''}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.endsWith('.jpg')) {
                  target.src = target.src.replace(/\.jpg($|\?)/i, '.png$1');
                  return;
                }
                if (target.src.endsWith('.png')) {
                  target.src = target.src.replace(/\.png($|\?)/i, '.jpg$1');
                  return;
                }
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

export default ProductDetails;