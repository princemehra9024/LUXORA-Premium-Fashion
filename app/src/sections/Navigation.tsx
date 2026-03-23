import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, ShoppingBag, Search, Heart, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { navItems } from '@/data/products';
import SearchOverlay from '@/components/SearchOverlay';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount, cartCount } = useWishlist();
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.2
    });
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl opacity-0 -translate-y-8"
      >
        <div className={`backdrop-blur-2xl rounded-full border transition-all duration-500 shadow-2xl ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10 shadow-black/50' 
            : 'bg-white/70 border-white/40 shadow-purple-900/10'
        }`}>
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src="/logo.png" 
                  alt="LUXORA" 
                  className="w-10 h-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <span 
                  className={`text-2xl font-bold hidden sm:block transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: 'Teko, sans-serif', letterSpacing: '0.05em' }}
                >
                  LUXORA
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-sm font-medium transition-colors relative group ${
                      isActive(item.href)
                        ? 'text-purple-500'
                        : theme === 'dark' 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                      isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-yellow-400 hover:bg-white/20' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Search */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Wishlist */}
                <Link 
                  to="/wishlist"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* User */}
                <Link
                  to="/profile"
                  className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <User className="w-5 h-5" />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(103,39,170,0.4)] transition-all duration-300 relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-black text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className={`absolute inset-0 backdrop-blur-lg transition-colors ${
            theme === 'dark' ? 'bg-black/80' : 'bg-white/80'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div 
          className={`absolute top-20 left-4 right-4 rounded-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          } ${theme === 'dark' ? 'bg-black/90 border border-white/10' : 'bg-white border border-gray-200 shadow-xl'}`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg py-3 px-4 rounded-xl transition-colors ${
                  isActive(item.href)
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark' 
                      ? 'text-gray-300 hover:bg-white/10' 
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg py-3 px-4 rounded-xl transition-colors flex items-center gap-2 ${
                isActive('/wishlist')
                  ? 'bg-purple-600 text-white'
                  : theme === 'dark' 
                    ? 'text-gray-300 hover:bg-white/10' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-5 h-5" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </div>

          {/* Theme toggle in mobile menu */}
          <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navigation;
