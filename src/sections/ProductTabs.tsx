import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Flame, ShoppingCart, Heart, Star } from 'lucide-react';
import { newArrivals, bestSellers } from '@/data/products';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'new' | 'bestsellers';

const ProductTabs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('new');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const products = activeTab === 'new' ? newArrivals : bestSellers;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update pill position when tab changes
  useEffect(() => {
    const activeIndex = activeTab === 'new' ? 0 : 1;
    const activeTabEl = tabRefs.current[activeIndex];
    if (activeTabEl && tabsRef.current) {
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const tabRect = activeTabEl.getBoundingClientRect();
      setPillStyle({
        left: tabRect.left - tabsRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  // Animate products when tab changes
  useEffect(() => {
    const cards = contentRef.current?.querySelectorAll('.product-tab-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] text-purple-400 mb-3">DISCOVER MORE</p>
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            <span className="text-gradient">Latest</span> & <span className="text-gradient-gold">Greatest</span>
          </h2>

          {/* Tabs */}
          <div 
            ref={tabsRef}
            className="relative inline-flex items-center gap-2 p-1.5 bg-white/5 rounded-full border border-white/10"
          >
            {/* Animated pill background */}
            <div 
              className="absolute h-[calc(100%-12px)] bg-purple-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ left: pillStyle.left + 6, width: pillStyle.width - 12 }}
            />
            
            <button
              ref={(el) => { tabRefs.current[0] = el; }}
              onClick={() => setActiveTab('new')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeTab === 'new' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              New Arrivals
            </button>
            <button
              ref={(el) => { tabRefs.current[1] = el; }}
              onClick={() => setActiveTab('bestsellers')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeTab === 'bestsellers' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              Best Sellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-tab-card group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(103,39,170,0.2)]">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3" />
                HOT
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs text-purple-400 tracking-wider mb-1">{product.category}</p>
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
