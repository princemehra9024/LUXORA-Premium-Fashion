import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { allProducts } from '@/data/products';
import type { Product } from '@/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const results: Product[] = query.length >= 2
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const trending = allProducts.filter(p => p.isBestseller).slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60]"
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 backdrop-blur-xl ${
              theme === 'dark' ? 'bg-black/80' : 'bg-white/80'
            }`}
            onClick={onClose}
          />

          {/* Search Content */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-3xl mx-auto pt-24 px-6"
          >
            {/* Search Input */}
            <div className={`relative flex items-center gap-4 p-4 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white border-gray-200 shadow-2xl'
            }`}>
              <Search className={`w-6 h-6 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className={`flex-1 text-lg bg-transparent outline-none ${
                  theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="mt-6">
              {query.length >= 2 ? (
                results.length > 0 ? (
                  <div>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-white/5'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <img loading="lazy"
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs text-purple-500 mb-0.5`}>{product.category}</p>
                            <h4 className={`font-medium text-sm truncate ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {product.name}
                            </h4>
                            <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              ${product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      No products found for "{query}"
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Trending Products
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trending.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                          theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <img loading="lazy" src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-purple-500 mb-0.5">{product.category}</p>
                          <h4 className={`font-medium text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {product.name}
                          </h4>
                          <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
