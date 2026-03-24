import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Truck, RefreshCw, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { allProducts } from '@/data/products';
import { Link } from 'react-router-dom';
import Marquee from '@/components/Marquee';
import ProductFeatureSlider from '@/components/ProductFeatureSlider';
import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import PremiumProductCard from '@/components/PremiumProductCard';
import { Spinner } from '@/components/ui/spinner';

// Lazy load heavy sections
const TrendingProducts = lazy(() => import('@/sections/TrendingProducts'));
const Categories = lazy(() => import('@/sections/Categories'));
const ProductTabs = lazy(() => import('@/sections/ProductTabs'));
const BrandStory = lazy(() => import('@/sections/BrandStory'));
const Newsletter = lazy(() => import('@/sections/Newsletter'));
const ClothesShowcase = lazy(() => import('@/sections/ClothesShowcase'));
const FlashSale = lazy(() => import('@/sections/FlashSale'));
const FeaturedCollection = lazy(() => import('@/sections/FeaturedCollection'));
const ProductMarquee = lazy(() => import('@/components/ProductMarquee'));
const ReviewMarquee = lazy(() => import('@/components/ReviewMarquee'));
const TrustBadges = lazy(() => import('@/sections/TrustBadges'));
const InteractiveModel = lazy(() => import('@/sections/InteractiveModel'));

const SectionLoader = () => {
  const { theme } = useTheme();
  return (
    <div className={`py-20 flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f8f7ff]'
    }`}>
      <Spinner className="size-10 text-purple-500" />
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);


  // Find special product
  const specialProduct = allProducts.find(p => p.id === 'wd-3');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation
      const heroItems = heroContentRef.current?.querySelectorAll('.hero-animate');
      if (heroItems && heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1.5,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    { icon: Truck, label: 'Free Shipping', sub: 'On orders over $99', color: 'from-purple-500 to-indigo-600' },
    { icon: RefreshCw, label: 'Easy Returns', sub: '30-day hassle-free', color: 'from-pink-500 to-rose-600' },
    { icon: Award, label: 'Premium Quality', sub: 'Artisan crafted', color: 'from-amber-500 to-orange-600' },
    { icon: ShieldCheck, label: 'Secure Payment', sub: '100% protected', color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Premium Full-bleed Hero Section */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden theme-transition bg-black">
        
        {/* Cinematic Background Image with slow zoom */}
        <motion.div
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 15, ease: "easeOut" }}
           className="absolute inset-0 z-0"
        >
           <img loading="lazy" 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500&auto=format&fit=crop" 
              alt="Premium Fashion Collection" 
              className="w-full h-full object-cover object-[center_30%]"
           />
        </motion.div>

        {/* Elegant Gradient Overlay - Ensures high contrast for text */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-center text-center mt-20">
          <div ref={heroContentRef} className="max-w-4xl pointer-events-auto flex flex-col items-center">
            {/* Minimalist Badge */}
            <motion.div
              className="hero-animate relative inline-flex items-center gap-3 px-5 py-2 mb-8 backdrop-blur-md bg-black/30 border border-white/20 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-white">The 2025 Reserve</span>
            </motion.div>

            <h1
              className="hero-animate relative leading-[0.85] mb-6 sm:mb-8 text-white drop-shadow-2xl"
              style={{
                fontFamily: 'Teko, sans-serif',
                fontSize: 'clamp(4rem, 14vw, 12rem)',
                fontWeight: 900,
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              }}
            >
              CRAFTED<br />
              FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">UNIQUENESS</span>
            </h1>

            <p
              className="hero-animate relative text-base sm:text-xl lg:text-2xl max-w-2xl mb-10 sm:mb-14 leading-relaxed font-light text-gray-200 drop-shadow-lg"
            >
              At Luxora, every individual is a masterpiece. Discover our premium fashion line — where luxury meets identity.
            </p>

            <div className="hero-animate relative flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center justify-center">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:w-auto group bg-white text-black hover:bg-gray-100 px-10 sm:px-14 py-6 sm:py-8 text-sm font-black tracking-widest uppercase rounded-full transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about" className="hidden sm:flex items-center gap-3 text-xs font-black tracking-[0.3em] uppercase text-white hover:text-gray-300 transition-colors group px-6">
                Our Story
                <div className="w-12 h-[1px] bg-white group-hover:w-24 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle scroll indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
           <span className="text-[9px] font-black tracking-[0.4em] text-white/50 uppercase">Scroll</span>
           <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" 
           />
        </motion.div>
      </section>

      {/* Benefits Bar */}
      <div className={`relative z-10 ${
        theme === 'dark' ? 'bg-[#0a0a0a] border-y border-white/5' : 'bg-white border-y border-purple-100'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 py-5">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x ${
            theme === 'dark' ? 'divide-white/5' : 'divide-purple-100'
          }`}>
            {benefits.map(({ icon: Icon, label, sub, color }) => (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 px-4 py-3 lg:py-2"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-bold tracking-wide ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{label}</div>
                  <div className={`text-[11px] ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>{sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <Marquee text="LUXORA MASTERPIECES • FREE GLOBAL SHIPPING • ARTISANAL CRAFTSMANSHIP • 24/7 ELITE CONCIERGE • SECURE BIOMETRIC CHECKOUT" speed={1} />

      {/* 3D Interactive Model Section */}
      <Suspense fallback={<SectionLoader />}>
        <InteractiveModel />
      </Suspense>

      {/* Masterpiece Showcase Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-16 xl:px-24">
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-[2px] bg-purple-600" />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-500">The Artisan Spotlight</span>
              </div>
              <h2 
                className={`text-6xl sm:text-7xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Teko, sans-serif' }}
              >
                MEET THE <span className="text-gradient">MASTERPIECE</span>
              </h2>
            </div>
            <p className={`max-w-sm text-base leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              Our crowning achievement of the season. A synthesis of luxury textiles and 
              avant-garde architectural design.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
             {specialProduct && (
               <PremiumProductCard 
                product={specialProduct} 
                index={0} 
                accentColor="purple"
               />
             )}
          </div>
      </section>

      {/* Featured Collection */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedCollection />
      </Suspense>

      {/* Flash Sale Section */}
      <Suspense fallback={<SectionLoader />}>
        <FlashSale />
      </Suspense>

      {/* Trending Products */}
      <Suspense fallback={<SectionLoader />}>
        <TrendingProducts />
      </Suspense>

      {/* Categories */}
      <Suspense fallback={<SectionLoader />}>
        <Categories />
      </Suspense>

      {/* New Arrivals & Best Sellers */}
      <Suspense fallback={<SectionLoader />}>
        <ProductTabs />
      </Suspense>

      {/* 2D Canvas Parallax Clothes Showcase */}
      <Suspense fallback={<SectionLoader />}>
        <ClothesShowcase />
      </Suspense>

      {/* Feature Comparison */}
      <ProductFeatureSlider 
        leftImage="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=800&fit=crop"
        rightImage="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&h=800&fit=crop"
        leftTitle="NOIR PREMIUM"
        rightTitle="OTHER BRANDS"
        leftFeatures={[
          { id: '1', text: 'Premium Fabric', top: '25%', left: '15%' },
          { id: '2', text: 'Perfect Fit', top: '50%', left: '10%' },
          { id: '3', text: 'Durable Stitching', top: '75%', left: '15%' },
        ]}
        rightFeatures={[
          { id: '4', text: 'Basic Cotton', top: '25%', right: '15%' },
          { id: '5', text: 'Boxy Fit', top: '50%', right: '10%' },
          { id: '6', text: 'Fades Quickly', top: '75%', right: '15%' },
        ]}
      />

      {/* Brand Story */}
      <Suspense fallback={<SectionLoader />}>
        <BrandStory />
      </Suspense>

      {/* Reviews Marquee */}
      <Suspense fallback={<SectionLoader />}>
        <ReviewMarquee />
      </Suspense>

      {/* Trust Badges */}
      <Suspense fallback={<SectionLoader />}>
        <TrustBadges />
      </Suspense>

      {/* Product Marquee (Infinite Selection) */}
      <Suspense fallback={<SectionLoader />}>
        <ProductMarquee />
      </Suspense>

      {/* Newsletter */}
      <Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default HomePage;
