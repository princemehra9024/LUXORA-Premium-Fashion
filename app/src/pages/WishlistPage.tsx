import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlist } from '@/contexts/WishlistContext';

const WishlistPage = () => {
  const { theme } = useTheme();
  const { wishlistItems, toggleWishlist, addToCart, isInCart } = useWishlist();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Teko, sans-serif' }}
              >
                My <span className="text-gradient">Wishlist</span>
              </h1>
            </div>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </motion.div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(103,39,170,0.2)] ${
                  theme === 'dark'
                    ? 'bg-white/[0.03] border-white/10'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="p-5">
                  <p className="text-[11px] font-medium tracking-wider uppercase mb-1 text-purple-500">
                    {product.category}
                  </p>
                  <h3 className={`font-semibold text-[15px] mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className={`text-sm line-through ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isInCart(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isInCart(product.id) ? 'Added' : 'Add'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
              <Heart className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Your Wishlist is Empty
            </h2>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Start adding items you love to your wishlist
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
