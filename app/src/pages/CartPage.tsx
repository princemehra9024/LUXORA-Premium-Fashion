import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlist } from '@/contexts/WishlistContext';

const CartPage = () => {
  const { theme } = useTheme();
  const { cartItems, removeFromCart } = useWishlist();

  // For this mock, we just assume quantity 1 for each item in cart for simplicity
  // In a real app, cart state would track quantity and options
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Shopping Cart
            </h1>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 flex flex-col gap-6">
              {cartItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-6 p-4 rounded-2xl border ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  <Link to={`/product/${product.id}`} className="shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-24 h-32 object-cover rounded-xl"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-purple-500 mb-1">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className={`font-semibold text-lg truncate mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                      Size: M | Color: Black
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-lg border ${
                        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <button className={`hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1</span>
                        <button className={`hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${product.price}
                    </span>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className={`sticky top-32 p-6 rounded-3xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Teko, sans-serif' }}
                >
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4 mb-6">
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Subtotal</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Shipping</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className={`flex justify-between ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Estimated Tax</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={`pt-4 border-t flex justify-between items-end mb-8 ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Total</span>
                  <span className={`text-3xl font-bold text-purple-500`}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(103,39,170,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>

                <p className={`text-xs text-center mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Your Cart is Empty
            </h2>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
