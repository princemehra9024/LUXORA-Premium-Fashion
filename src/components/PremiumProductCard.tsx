import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

import { Link } from 'react-router-dom';
import type { Product } from '@/types';

interface PremiumProductCardProps {
  product: Product;
  index: number;
  isInWishlist?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  accentColor?: 'purple' | 'rose' | 'amber';
}

const PremiumProductCard = ({
  product,
  index,
  isInWishlist = false,
  onAddToCart,
  onToggleWishlist,
  accentColor = 'purple',
}: PremiumProductCardProps) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`group relative flex flex-col md:flex-row rounded-[2rem] overflow-hidden border transition-all duration-700 hover:shadow-[0_0_80px_rgba(103,39,170,0.15)] ${
        theme === 'dark' 
          ? 'bg-transparent border-white/10 backdrop-blur-md hover:border-purple-500/50' 
          : 'bg-white border-gray-100 shadow-xl hover:border-purple-500/30'
      }`}
    >
      {/* Image Slider Section */}
      <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Index Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentImageIndex 
                    ? `w-8 ${accentColor === 'rose' ? 'bg-rose-500' : accentColor === 'amber' ? 'bg-amber-500' : 'bg-purple-500'}` 
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 p-8 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleWishlist?.()}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
              isInWishlist 
                ? 'bg-red-500 border-red-500 text-white' 
                : theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`text-sm font-black tracking-[0.4em] uppercase mb-4 ${
            accentColor === 'rose' ? 'text-rose-400' : accentColor === 'amber' ? 'text-amber-400' : 'text-purple-400'
          }`}
        >
          {product.category}
        </motion.p>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          style={{ fontFamily: 'Teko, sans-serif' }}
        >
          {product.name}
        </motion.h3>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className={`flex items-center border px-3 py-1.5 rounded-full ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'
          }`}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1.5" />
            <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.rating}</span>
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>{product.reviews} Artisan Reviews</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-lg leading-relaxed mb-10 max-w-lg ${
            theme === 'dark' ? 'text-white/60' : 'text-gray-600'
          }`}
        >
          {product.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex flex-col">
            <span className={`text-xs tracking-widest uppercase mb-1 ${
              theme === 'dark' ? 'text-white/40' : 'text-gray-400'
            }`}>Price</span>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-black ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>${product.price}</span>
              {product.originalPrice && (
                <span className={`text-xl line-through ${
                  theme === 'dark' ? 'text-white/30' : 'text-gray-400'
                }`}>${product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex-1 w-full flex gap-3">
            <Link to={`/product/${product.id}`} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-16 rounded-2xl font-black text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                  accentColor === 'rose' 
                    ? 'bg-rose-500 text-white hover:bg-rose-600' 
                    : accentColor === 'amber'
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : theme === 'dark' 
                        ? 'bg-white text-black hover:bg-purple-500 hover:text-white'
                        : 'bg-black text-white hover:bg-purple-600 hover:shadow-xl'
                }`}
              >
                View Details
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart?.()}
              className={`w-16 h-16 border rounded-2xl flex items-center justify-center transition-all ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
    </motion.div>
  );
};

export default PremiumProductCard;
