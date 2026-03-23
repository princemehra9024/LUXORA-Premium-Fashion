import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import useLenis from '@/hooks/useLenis';

// Components
import LogoReveal from '@/components/LogoReveal';
import WebGLBackground from '@/components/WebGLBackground';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { Spinner } from '@/components/ui/spinner';

// Pages - Lazy loaded
const HomePage = lazy(() => import('@/pages/HomePage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const MenPage = lazy(() => import('@/pages/MenPage'));
const WomenPage = lazy(() => import('@/pages/WomenPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location]);
  
  return null;
};

// Main App Content
const AppContent = () => {
  const [showLogoReveal, setShowLogoReveal] = useState(true);
  // const [scrollProgress, setScrollProgress] = useState(0); // Removed to prevent re-renders
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Initialize smooth scrolling
  useLenis();

  useEffect(() => {
    // Track scroll progress using CSS variables for high-performance background updates
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on load and route change
    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  const handleLogoRevealComplete = () => {
    setShowLogoReveal(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Logo Reveal Animation */}
      {showLogoReveal && isHomePage && (
        <LogoReveal onComplete={handleLogoRevealComplete} />
      )}

      {/* Background */}
      <WebGLBackground />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh] w-full">
            <Spinner className="size-12 text-primary" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
};

// Root App with Router, Theme Provider, and Wishlist Provider
function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
