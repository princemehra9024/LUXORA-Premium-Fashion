import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/types';
import { allProducts } from '@/data/products';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: Product[];
  cartIds: string[];
  cartItems: Product[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cartIds, setCartIds] = useState<string[]>([]);

  const isInWishlist = useCallback((id: string) => wishlistIds.includes(id), [wishlistIds]);
  const isInCart = useCallback((id: string) => cartIds.includes(id), [cartIds]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlistIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const addToCart = useCallback((id: string) => {
    setCartIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartIds(prev => prev.filter(x => x !== id));
  }, []);

  const wishlistItems = allProducts.filter(p => wishlistIds.includes(p.id));
  const cartItems = allProducts.filter(p => cartIds.includes(p.id));

  return (
    <WishlistContext.Provider value={{
      wishlistIds, wishlistItems,
      cartIds, cartItems,
      isInWishlist, toggleWishlist,
      addToCart, removeFromCart, isInCart,
      cartCount: cartIds.length,
      wishlistCount: wishlistIds.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
