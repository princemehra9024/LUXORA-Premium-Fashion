import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  isInWishlist?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  accentColor?: string;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ 
  product, 
  index, 
  isInWishlist = false, 
  onAddToCart, 
  onToggleWishlist,
  accentColor = 'purple',
  viewMode = 'grid'
}: ProductCardProps) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const accentClasses = {
    purple: {
      badge: 'bg-purple-600',
      badgeHover: 'hover:bg-purple-700',
      text: 'text-purple-500',
      border: 'hover:border-purple-500/50',
      glow: 'hover:shadow-[0_0_40px_rgba(103,39,170,0.25)]',
      button: 'bg-purple-600 hover:bg-purple-700',
      overlay: 'bg-purple-600/20',
    },
    rose: {
      badge: 'bg-rose-500',
      badgeHover: 'hover:bg-rose-600',
      text: 'text-rose-400',
      border: 'hover:border-rose-400/50',
      glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.25)]',
      button: 'bg-rose-500 hover:bg-rose-600',
      overlay: 'bg-rose-500/20',
    },
  };

  const accent = accentClasses[accentColor as keyof typeof accentClasses] || accentClasses.purple;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`group flex flex-col md:flex-row gap-6 p-4 rounded-3xl border transition-all duration-300 ${accent.border} ${
          theme === 'dark' 
            ? 'bg-white/[0.03] border-white/10' 
            : 'bg-white border-gray-100 shadow-md hover:shadow-xl'
        }`}
      >
        <Link to={`/product/${product.id}`} className="w-full md:w-64 aspect-square overflow-hidden rounded-2xl flex-shrink-0">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </Link>
        <div className="flex-1 flex flex-col py-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-1 ${accent.text}`}>
                {product.category}
              </p>
              <h3 className={`font-bold text-xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">({product.reviews} reviews)</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleWishlist}
              className={`p-3 rounded-full transition-all ${
                isInWishlist 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
            </motion.button>
          </div>
          <p className={`text-sm mb-6 line-clamp-2 max-w-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-gray-500">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex gap-3">
               <Link to={`/product/${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full border border-current font-bold text-xs tracking-widest uppercase transition-all ${
                    theme === 'dark' ? 'text-white border-white/20 hover:bg-white/10' : 'text-gray-900 border-gray-900/10 hover:bg-gray-900/5'
                  }`}
                >
                  Details
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddToCart}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg ${accent.glow} ${accent.button}`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 ${accent.border} ${accent.glow} ${
        theme === 'dark' 
          ? 'bg-white/[0.03] border-white/10 backdrop-blur-sm' 
          : 'bg-white border-gray-100 shadow-xl'
      }`}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className={`absolute inset-0 ${accent.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay`} />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {product.isNew && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-4 py-1.5 ${accent.badge} text-white text-[10px] font-black tracking-[0.1em] rounded-full uppercase shadow-lg`}
            >
              New
            </motion.span>
          )}
          {product.isBestseller && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-1.5 bg-amber-500 text-black text-[10px] font-black tracking-[0.1em] rounded-full uppercase shadow-lg"
            >
              Bestseller
            </motion.span>
          )}
          {product.originalPrice && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black tracking-[0.1em] rounded-full uppercase shadow-lg"
            >
              {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
            </motion.span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.preventDefault(); onToggleWishlist?.(); }}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all ${
              isInWishlist 
                ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Add to Cart - Bottom */}
        <motion.div 
          className="absolute bottom-6 left-6 right-6"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { e.preventDefault(); onAddToCart?.(); }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 ${accent.button} text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl backdrop-blur-sm`}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <p className={`text-[11px] font-bold tracking-[0.3em] uppercase mb-2 ${accent.text}`}>
          {product.category}
        </p>
        <h3 className={`font-bold text-[17px] mb-3 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
            />
          ))}
          <span className={`text-[11px] font-medium ml-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className={`text-[15px] font-medium line-through ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${accent.badge} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_15px_rgba(103,39,170,1)]`} />
      </Link>
    </motion.div>
  );
};

export default ProductCard;
