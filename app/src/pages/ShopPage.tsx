import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Grid3X3, 
  List, 
  ChevronDown, 
  X, 
  ShoppingCart, 
  Heart,
  Star,
  SlidersHorizontal,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { allProducts, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const ShopPage = () => {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Get category from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // GSAP Hero Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.shop-hero-text',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return products;
  }, [selectedCategory, priceRange, sortBy]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, id]
    );
  };

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  return (
    <div className={`min-h-screen pb-24 theme-transition ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="shop-hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold tracking-[0.2em] text-purple-500 uppercase">Premium Curation</span>
          </div>
          
          <h1 
            className={`shop-hero-text text-6xl sm:text-7xl lg:text-8xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            DISCOVER THE <span className="text-gradient">COLLECTION</span>
          </h1>
          
          <p className={`shop-hero-text max-w-2xl text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore our meticulously crafted selection of premium menswear. 
            From contemporary essentials to avant-garde statement pieces.
          </p>
        </div>
      </section>

      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Controls Bar */}
        <div className={`sticky top-24 z-40 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl mb-12 backdrop-blur-xl border ${
          theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white/80 border-gray-100 shadow-xl'
        }`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border font-bold text-xs tracking-widest uppercase transition-all ${
                theme === 'dark' 
                  ? 'border-white/10 text-white hover:bg-white/10' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {selectedCategory !== 'All' && <span className="w-2 h-2 rounded-full bg-purple-500 ml-1" />}
            </button>

            <span className={`text-xs font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {filteredProducts.length} masterpieces
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none px-6 py-2.5 pr-12 rounded-full border cursor-pointer font-bold text-xs tracking-widest uppercase transition-all ${
                  theme === 'dark' 
                    ? 'bg-transparent border-white/10 text-white' 
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
            </div>

            {/* View Mode Toggle */}
            <div className={`flex items-center rounded-full border p-1 ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-100'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-full transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                    : theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-full transition-all ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                    : theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full lg:w-72 flex-shrink-0"
              >
                <div className={`p-8 rounded-[2rem] sticky top-48 border ${
                  theme === 'dark' ? 'bg-white/[0.03] border-white/5' : 'bg-white border-gray-100 shadow-xl'
                }`}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className={`font-black text-2xl uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Teko, sans-serif' }}>
                      Filters
                    </h3>
                    <button onClick={() => setShowFilters(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-10">
                    <h4 className={`text-[10px] font-black tracking-[0.2em] uppercase mb-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Categories
                    </h4>
                    <div className="space-y-2">
                       <button
                        onClick={() => setSelectedCategory('All')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                          selectedCategory === 'All'
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                            : theme === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        All Masterpieces
                        {selectedCategory === 'All' && <Check className="w-4 h-4" />}
                      </button>
                      {categories.slice(0, 8).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                            selectedCategory === cat.name
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                              : theme === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {cat.name}
                          {selectedCategory === cat.name && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className={`text-[10px] font-black tracking-[0.2em] uppercase mb-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Price Spectrum
                    </h4>
                    <div className="space-y-6 px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-purple-600"
                      />
                      <div className="flex justify-between items-center">
                        <div className={`px-4 py-2 rounded-xl text-sm font-black ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>
                          ${priceRange[0]}
                        </div>
                        <div className="h-[1px] w-4 bg-gray-500 opacity-30" />
                        <div className={`px-4 py-2 rounded-xl text-sm font-black ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-900'}`}>
                          ${priceRange[1]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 500]);
                    }}
                    className={`w-full py-4 mt-4 rounded-2xl text-[10px] font-black tracking-widest uppercase border transition-all ${
                      theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Reset All
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div 
              layout
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    viewMode={viewMode}
                    isInWishlist={wishlist.includes(product.id)}
                    onAddToCart={() => addToCart(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-32"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                  <X className="w-8 h-8 opacity-20" />
                </div>
                <h3 className={`text-2xl font-black uppercase mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Teko, sans-serif' }}>
                  No matches found
                </h3>
                <p className={`max-w-xs mx-auto text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  We couldn't find any products matching your current filters. 
                  Try adjusting your criteria or reset the filters.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 500]);
                  }}
                  className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/25"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default ShopPage;
