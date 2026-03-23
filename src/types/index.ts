export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Multiple images for gallery
  category: string;
  gender: 'men' | 'women' | 'unisex';
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  colors?: { name: string; hex: string }[]; // Updated to object for better UI
  sizes?: string[];
  description?: string;
  detailedDescription?: string; // Long description for detail page
  stock?: number;
  deliveryInfo?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  gender?: 'men' | 'women' | 'unisex';
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type SectionId = 
  | 'hero'
  | 'featured'
  | 'trending'
  | 'categories'
  | 'new-arrivals'
  | 'best-sellers'
  | 'brand-story'
  | 'reviews'
  | 'newsletter';
