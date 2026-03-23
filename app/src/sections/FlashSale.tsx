import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CountdownTimer from '@/components/CountdownTimer';
import { Zap } from 'lucide-react';

const FlashSale = () => {
  const { theme } = useTheme();
  const { isInWishlist, toggleWishlist, addToCart } = useWishlist();

  // Grab some products to feature in the sale (mix of men/women)
  const saleProducts = allProducts.slice(4, 8).map(p => ({
    ...p,
    originalPrice: p.price,
    price: +(p.price * 0.7).toFixed(2) // 30% off
  }));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-red-500 fill-red-500" />
              </div>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase">Limited Time Offer</span>
            </div>
            
            <h2 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              FLASH <span className="text-red-500">SALE</span>
            </h2>
            
            <p className={`text-lg max-w-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Get up to <strong className="text-red-500">30% OFF</strong> on premium selections. 
              These exclusive deals are gone once the timer hits zero.
            </p>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl ${
            theme === 'dark' ? 'bg-black/40 border-red-500/20 shadow-red-500/10' : 'bg-white border-red-100 shadow-red-500/5'
          } backdrop-blur-md`}>
            <div className="text-center mb-4">
              <span className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Sale Ends In
              </span>
            </div>
            <CountdownTimer hours={12} minutes={45} seconds={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative"
            >
              {/* Sale Tag */}
              <div className="absolute -top-3 -right-3 z-20 w-16 h-16 bg-red-500 text-white rounded-full flex flex-col items-center justify-center shadow-lg font-bold rotate-12" style={{ fontFamily: 'Teko, sans-serif' }}>
                <span className="text-xl leading-none">30%</span>
                <span className="text-xs leading-none">OFF</span>
              </div>
              
              <ProductCard
                product={product}
                index={index}
                isInWishlist={isInWishlist(product.id)}
                onAddToCart={() => addToCart(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
