import { Product } from '@/types/product';

// Sample product data - in a real app, this would come from an API or database
export const products: Product[] = [
  {
    id: 'al-001',
    name: 'Commercial Area Light Series',
    model: 'AL-150W-5000K',
    category: 'products',
    subcategory: 'area-light',
    image: '/uploads/1a611b42-3d26-4708-b8ff-97568ca3878a.png',
    price: 299.99,
    description: 'High-performance LED area light designed for commercial and industrial applications. Features advanced thermal management and superior light distribution for optimal illumination coverage.',
    features: [
      'IP65 weatherproof rating',
      'Advanced thermal management system',
      'Uniform light distribution',
      '50,000+ hour lifespan',
      'Surge protection up to 10kV',
      'Tool-free maintenance access',
      'Multiple mounting options',
      'Energy Star certified'
    ],
    specifications: {
      'Wattage': '150W',
      'Input Voltage': '120-277V AC',
      'Lumens': '20,250 lm',
      'Efficacy': '135 lm/W',
      'Color Temperature': '5000K',
      'Color Rendering Index (CRI)': '>80',
      'Beam Angle': '120° x 60°',
      'Operating Temperature': '-40°C to +50°C',
      'IP Rating': 'IP65',
      'Dimensions': '15.7" x 11.8" x 4.3"',
      'Weight': '12.5 lbs',
      'Mounting': 'Slip Fitter, Yoke Mount',
      'Warranty': '5 Years'
    },
    certifications: ['UL Listed', 'DLC Premium', 'Energy Star', 'FCC Compliant'],
    availability: 'In Stock',
    wattage: '150W',
    voltage: '120-277V AC',
    lumens: '20,250 lm',
    colorTemperature: '5000K',
    dimmable: true,
    warranty: '5 Years'
  },
  {
    id: 'wp-001',
    name: 'LED Wall Pack Light',
    model: 'WP-80W-4000K',
    category: 'products',
    subcategory: 'wall-pack',
    image: '/uploads/241725bd-1a4d-4e2e-89c4-62862ea1437d.png',
    price: 189.99,
    description: 'Compact and efficient LED wall pack designed for building perimeter lighting, security applications, and architectural accent lighting.',
    features: [
      'Low-profile design',
      'Vandal-resistant construction',
      'Photocell compatible',
      'Easy installation',
      'Energy efficient operation',
      'Long-lasting performance'
    ],
    specifications: {
      'Wattage': '80W',
      'Input Voltage': '120-277V AC',
      'Lumens': '10,800 lm',
      'Efficacy': '135 lm/W',
      'Color Temperature': '4000K',
      'Color Rendering Index (CRI)': '>80',
      'Beam Angle': '110° x 70°',
      'Operating Temperature': '-40°C to +50°C',
      'IP Rating': 'IP65',
      'Dimensions': '12.2" x 8.7" x 3.9"',
      'Weight': '8.2 lbs',
      'Mounting': 'Wall Mount',
      'Warranty': '5 Years'
    },
    certifications: ['UL Listed', 'DLC Premium', 'FCC Compliant'],
    availability: 'In Stock',
    wattage: '80W',
    voltage: '120-277V AC',
    lumens: '10,800 lm',
    colorTemperature: '4000K',
    dimmable: false,
    warranty: '5 Years'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string, subcategory?: string): Product[] => {
  return products.filter(product => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory;
    }
    return product.category === category;
  });
};