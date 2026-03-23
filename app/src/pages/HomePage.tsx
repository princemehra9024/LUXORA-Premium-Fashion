import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { allProducts } from '@/data/products';
import { Link } from 'react-router-dom';
import Marquee from '@/components/Marquee';
import FlashSale from '@/sections/FlashSale';
import TrustBadges from '@/sections/TrustBadges';
import ProductFeatureSlider from '@/components/ProductFeatureSlider';
import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import SketchfabModel from '@/components/SketchfabModel';
import FeaturedCollection from '@/sections/FeaturedCollection';
import ProductMarquee from '@/components/ProductMarquee';
import ReviewMarquee from '@/components/ReviewMarquee';
import PremiumProductCard from '@/components/PremiumProductCard';
import { Spinner } from '@/components/ui/spinner';

// Lazy load heavy sections
const TrendingProducts = lazy(() => import('@/sections/TrendingProducts'));
const Categories = lazy(() => import('@/sections/Categories'));
const ProductTabs = lazy(() => import('@/sections/ProductTabs'));
const BrandStory = lazy(() => import('@/sections/BrandStory'));
const Newsletter = lazy(() => import('@/sections/Newsletter'));
const ClothesShowcase = lazy(() => import('@/sections/ClothesShowcase'));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center bg-black">
    <Spinner className="size-10 text-purple-500" />
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

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

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center overflow-hidden theme-transition">
        {/* Theme-aware background */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f8f7ff]'}`} />
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-15 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-200'}`} />
           <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100'}`} />
        </div>

        {/* Sketchfab 3D Model */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0">
          {!modelLoaded && (
            <div className={`absolute inset-0 animate-pulse flex items-center justify-center ${
              theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-purple-50 to-white'
            }`}>
              <div className="text-purple-500/20 text-9xl font-teko font-bold select-none italic tracking-tighter">LUXORA</div>
            </div>
          )}

          <SketchfabModel
            modelId="96340701c2ed4d37851c7d9109eee9c0"
            onLoad={() => setModelLoaded(true)}
            theme={theme}
            className={`w-full h-full transition-opacity duration-1000 ${modelLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r ${
            theme === 'dark' ? 'from-[#050505] via-[#050505]/20' : 'from-[#f8f7ff] via-[#f8f7ff]/20'
          } to-transparent`} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-32 pointer-events-none">
          <div ref={heroContentRef} className="max-w-3xl pointer-events-auto">
            <motion.div 
               className="hero-animate inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
               whileHover={{ scale: 1.05 }}
            >
               <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
               <span className="text-xs font-black tracking-[0.2em] text-purple-600 uppercase">Season 2024 Collection 26</span>
            </motion.div>
            
            <h1 
              className={`hero-animate text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.8] mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-[#111111]'
              }`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              CRAFTED FOR <br />
              <span className="text-gradient">UNIQUENESS</span>
            </h1>
            
            <p className={`hero-animate text-xl max-w-xl mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              At Luxora, we believe every individual is a masterpiece. Discover our premium fashion 
              line engineered for those who dare to be different.
            </p>
            
            <div className="hero-animate flex flex-wrap gap-8 items-center">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="group bg-white text-black hover:bg-white/90 px-10 py-7 text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Explore Studio
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase text-purple-500 cursor-pointer group">
                Summer Campaign
                <div className="w-12 h-[1px] bg-purple-500 group-hover:w-24 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <Marquee text="LUXORA MASTERPIECES • FREE GLOBAL SHIPPING • ARTISANAL CRAFTSMANSHIP • LIMITED EDITION DROPS • 24/7 ELITE CONCIERGE • SECURE BIOMETRIC CHECKOUT" speed={1} />

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
      <FeaturedCollection />

      {/* Flash Sale Section */}
      <FlashSale />

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
      <ReviewMarquee />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Product Marquee (Infinite Selection) */}
      <ProductMarquee />

      {/* Newsletter */}
      <Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default HomePage;
