export interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  subcategory: string;
  image: string;
  images?: string[];
  price?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  certifications?: string[];
  availability: string;
  wattage?: string;
  voltage?: string;
  lumens?: string;
  colorTemperature?: string;
  dimmable?: boolean;
  warranty?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  subcategories: string[];
}