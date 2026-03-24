import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Filter, 
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  SlidersHorizontal
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { menProducts, menCategories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Marquee from '@/components/Marquee';

gsap.registerPlugin(ScrollTrigger);

const MenPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  // const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [, setCart] = useState<string[]>([]);
  const [columns, setColumns] = useState(3);
  
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // GSAP Hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = heroTextRef.current?.querySelectorAll('.hero-text-item');
      if (items && items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, y: 80, skewY: 3 },
          {
            opacity: 1, y: 0, skewY: 0,
            duration: 1.2, stagger: 0.15,
            ease: 'power4.out', delay: 0.3,
          }
        );
      }

      // Parallax hero image
      gsap.to('.men-hero-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Bento Grid items animation
      gsap.fromTo('.men-feature-item',
        { opacity: 0, scale: 0.9, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.men-feature-grid',
            start: 'top 80%',
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...menProducts];
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'newest': products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return products;
  }, [selectedCategory, priceRange, sortBy]);

  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const addToCart = (id: string) => setCart(prev => [...prev, id]);

  return (
    <div className={`min-h-screen theme-transition ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&h=1080&fit=crop"
            alt="Men's Fashion"
            className="men-hero-img w-full h-full object-cover scale-110"
          />
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-black via-black/80 to-black/30'
              : 'bg-gradient-to-r from-white/95 via-white/70 to-transparent'
          }`} />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
          <div ref={heroTextRef} className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hero-text-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 tracking-[0.2em] font-bold uppercase">Men's Editorial 2024</span>
            </motion.div>

            <h1
              className={`hero-text-item text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.8] mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              ARCHITECTURAL <br />
              <span className="text-gradient">FORM</span> & FUNCTION
            </h1>

            <p className={`hero-text-item text-xl max-w-xl mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Redefining the modern silhouette through technical precision and artisanal craftsmanship. 
              Engineered for those who lead.
            </p>

            <div className="hero-text-item flex flex-wrap gap-8 items-center">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <div className="flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase text-purple-500 cursor-pointer group">
                New Arrivals
                <div className="w-12 h-[1px] bg-purple-500 group-hover:w-24 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-7 h-12 border-2 rounded-full flex justify-center pt-2 ${
            theme === 'dark' ? 'border-white/20' : 'border-gray-900/20'
          }`}>
            <div className="w-1.5 h-3 bg-purple-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Bento Featured Categories */}
      <section className="py-32 px-6 sm:px-8 lg:px-16 xl:px-24 bg-noise">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-[2px] bg-purple-600" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-500">Curated Categories</span>
            </div>
            <h2 
              className={`text-6xl sm:text-7xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              FEATURED <span className="text-gradient">UNIVERSE</span>
            </h2>
          </div>
          <p className={`max-w-md text-base leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            Explore our meticulously segmented collection. Each category represents a 
            unique philosophy in modern menswear design.
          </p>
        </div>

        <div className="men-feature-grid grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[800px] gap-6">
          {/* Main Large Item */}
          <motion.div 
            className="men-feature-item md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[3rem] border border-white/5"
            whileHover={{ y: -10 }}
          >
            <img loading="lazy" 
              src={menCategories[0]?.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop"} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Category"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-16 left-16 right-16">
               <span className="inline-block px-5 py-2 bg-purple-600 text-white text-[10px] font-black tracking-widest uppercase rounded-full mb-8 shadow-xl">Best in Class</span>
               <h3 className="text-6xl font-black text-white uppercase mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>{menCategories[0]?.name || "Essentials"}</h3>
               <p className="text-gray-400 text-lg mb-10 max-w-sm">Premium organic materials sculpted for unparalleled comfort and modern silhouette.</p>
               <button className="flex items-center gap-6 text-xs font-black text-white uppercase tracking-widest group/btn">
                  Explore Studio
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </div>
               </button>
            </div>
          </motion.div>

          {/* Top Small Item */}
          <motion.div 
            className="men-feature-item md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[3rem] border border-white/5"
            whileHover={{ y: -5 }}
          >
            <img loading="lazy" src={menCategories[1]?.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Category" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-3xl font-black text-white uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>{menCategories[1]?.name}</h3>
              <ArrowRight className="w-6 h-6 text-white/50 mt-2 transform -rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
          </motion.div>

          {/* Second Top Small Item */}
          <motion.div 
            className="men-feature-item md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl"
            whileHover={{ y: -5 }}
          >
            <img loading="lazy" src={menCategories[2]?.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Category" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-3xl font-black text-white uppercase" style={{ fontFamily: 'Teko, sans-serif' }}>{menCategories[2]?.name}</h3>
              <ArrowRight className="w-6 h-6 text-white/50 mt-2 transform -rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
          </motion.div>

          {/* Bottom Long Item */}
          <motion.div 
            className="men-feature-item md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[3rem] border border-white/5"
            whileHover={{ y: -5 }}
          >
            <img loading="lazy" src={menCategories[3]?.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Category" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute left-12 top-1/2 -translate-y-1/2">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase">New Drop</span>
               </div>
              <h3 className="text-4xl font-black text-white uppercase mb-2" style={{ fontFamily: 'Teko, sans-serif' }}>{menCategories[3]?.name} COLLECTION</h3>
              <p className="text-gray-400 text-xs tracking-[0.3em] font-bold uppercase">Engineered for Permanence</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-16 border-y border-white/5 overflow-hidden">
        <Marquee 
          text="AVANT-GARDE • MASTERPIECE • PREMIUM • RAW • LUXURY • ARCHITECTURAL • MASCULINE" 
          speed={0.5} 
        />
      </section>

      {/* Main Grid Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-32 p-8 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-10">
                <SlidersHorizontal className="w-5 h-5 text-purple-500" />
                <h3 className={`text-2xl font-black uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Teko, sans-serif' }}>REFINEMENT</h3>
              </div>
              
              <div className="space-y-3 mb-12">
                 <h4 className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-4 px-4">Categories</h4>
                {['All', ...menCategories.map(c => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`group w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase border ${
                      selectedCategory === cat
                        ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30 font-black'
                        : theme === 'dark' 
                          ? 'border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                      selectedCategory === cat ? 'bg-white scale-150 shadow-[0_0_8px_white]' : 'bg-transparent group-hover:bg-purple-500/50'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Price Selection */}
              <div className="mb-12 px-4">
                 <h4 className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-6">Price Spectrum</h4>
                 <input
                    type="range"
                    min="0" max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-purple-600 mb-4"
                  />
                  <div className="flex justify-between items-center text-[11px] font-black tracking-widest text-purple-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
              </div>

              {/* Sorting */}
                <div className="px-4 mb-12">
                    <h4 className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-6">Sequence</h4>
                    <div className="relative">
                        <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full appearance-none px-6 py-4 rounded-2xl border font-bold text-xs tracking-widest uppercase transition-all ${
                            theme === 'dark' ? 'bg-black/50 border-white/5 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-md'
                        }`}
                        >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price Ascending</option>
                        <option value="price-high">Price Descending</option>
                        <option value="rating">Top Rated</option>
                        <option value="newest">Recent Drop</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                    </div>
                </div>

              {/* Guarantees */}
              <div className={`p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-white shadow-md border-gray-100'}`}>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <ShieldCheck className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>LIFETIME PROMISE</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Unrivaled craftsmanship</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Award className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ELITE SERIES</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Numbered production</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-16 px-4">
              <h2 className={`text-3xl font-black uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Teko, sans-serif' }}>
                 Showing {filteredProducts.length} <span className="opacity-40">Artifacts</span>
              </h2>
              <div className={`hidden sm:flex items-center rounded-2xl border p-1 ${
                theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'
              }`}>
                {[3, 4].map((col) => (
                  <button
                    key={col}
                    onClick={() => setColumns(col)}
                    className={`p-3 rounded-xl transition-all ${
                      columns === col
                        ? 'bg-purple-600 text-white shadow-lg'
                        : theme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {col === 3 ? <LayoutGrid className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className={`grid gap-8 ${
              columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    accentColor="purple"
                    onAddToCart={() => addToCart(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    isInWishlist={wishlist.includes(product.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-32 h-32 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-10">
                        <Filter className="w-12 h-12 opacity-10" />
                    </div>
                    <h3 className="text-4xl font-black text-white uppercase mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>No results within spectrum</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-10">We couldn't find any masterpieces matching your current filter parameters.</p>
                    <button 
                        onClick={() => { setSelectedCategory('All'); setPriceRange([0, 500]); }}
                        className="px-10 py-5 bg-purple-600 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-purple-700 transition-all"
                    >
                        Reset Refinement
                    </button>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Visual Identity Break */}
      <section className="py-32 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="relative h-[650px] rounded-[5rem] overflow-hidden border border-white/5 group shadow-2xl">
           <img loading="lazy" 
            src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&h=800&fit=crop" 
            className="w-full h-full object-cover grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1500 ease-out" 
            alt="Visual Break"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
              <Sparkles className="w-16 h-16 text-purple-500 mb-10 animate-pulse" />
              <h3 className="text-7xl sm:text-9xl font-black text-white uppercase leading-[0.85] mb-10" style={{ fontFamily: 'Teko, sans-serif' }}>
                 METICULOUS <br /> PERMANENCE
              </h3>
              <p className="text-white/60 text-xl max-w-2xl uppercase tracking-[0.3em] font-bold mb-14 drop-shadow-2xl">
                Beyond transient trends. Towards an architectural heritage of masculinity.
              </p>
              <div className="flex gap-6">
                <button className="px-12 py-6 bg-purple-600 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-purple-700 transition-all shadow-2xl">
                    View Heritage Story
                </button>
                <button className="px-12 py-6 bg-white/10 text-white backdrop-blur-xl border border-white/20 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/20 transition-all">
                    Visual Lookbook
                </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MenPage;
