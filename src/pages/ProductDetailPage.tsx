import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Star, 
  ShieldCheck, 
  Zap,
  Globe,
  ArrowLeft,
  Share2,
  Minus,
  Plus
} from 'lucide-react';
import { allProducts } from '@/data/products';
import { useTheme } from '@/contexts/ThemeContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { wishlistIds, toggleWishlist, addToCart } = useWishlist();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Experience');
  
  const imageSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading and find product
    setLoading(true);
    const foundProduct = allProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes?.[0] || '');
    }
    setLoading(false);

    // Initial animation
    gsap.fromTo('.product-reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className={`min-h-screen pb-32 theme-transition ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
         <button 
           onClick={() => navigate(-1)}
           className="pointer-events-auto p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all group"
         >
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
         </button>
         <div className="flex gap-4 pointer-events-auto">
            <button className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all">
               <Share2 className="w-5 h-5" />
            </button>
            <button 
               onClick={() => toggleWishlist(product.id)}
               className={`p-4 rounded-full backdrop-blur-xl border transition-all ${
                  wishlistIds.includes(product.id) 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
               }`}
            >
               <Heart className={`w-5 h-5 ${wishlistIds.includes(product.id) ? 'fill-white' : ''}`} />
            </button>
         </div>
      </div>

      <div className="pt-32 px-6 sm:px-8 lg:px-16 xl:px-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Visual Experience Section */}
            <div ref={imageSectionRef} className="space-y-6">
               <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 group">
                  <AnimatePresence mode="wait">
                     <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt={product.name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full object-cover"
                     />
                  </AnimatePresence>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-8 left-8 z-10">
                     <span className="px-5 py-2 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                        {images.length > 1 ? `Angle 0${selectedImage + 1}` : 'Studio Shot'}
                     </span>
                  </div>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                     <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button 
                           onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                           className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                        >
                           <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                           onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                           className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                        >
                           <ChevronRight className="w-6 h-6" />
                        </button>
                     </div>
                  )}
               </div>

               {/* Thumbnails */}
               <div className="grid grid-cols-4 gap-4">
                  {images.map((img: string, idx: number) => (
                     <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-300 ${
                           selectedImage === idx ? 'border-purple-600 scale-[0.98]' : 'border-white/5 opacity-50 hover:opacity-100'
                        }`}
                     >
                        <img loading="lazy" src={img} className="w-full h-full object-cover" />
                        {selectedImage === idx && (
                           <div className="absolute inset-0 bg-purple-600/10" />
                        )}
                     </button>
                  ))}
               </div>
            </div>

            {/* Content & Details Section */}
            <div className="flex flex-col justify-center">
               <div className="product-reveal">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-12 h-[2px] bg-purple-600" />
                     <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-600">Premium Artifact // {product.id}</span>
                  </div>
                  
                  <h1 
                     className={`text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-[0.85] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                     style={{ fontFamily: 'Teko, sans-serif' }}
                  >
                     {product.name}
                  </h1>

                  <div className="flex items-center gap-8 mb-10">
                     <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-purple-600">${product.price}</span>
                        {product.originalPrice && (
                           <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-gray-400">{product.rating}</span>
                     </div>
                  </div>

                  <p className={`text-lg leading-relaxed mb-12 max-w-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                     {product.description}
                  </p>
               </div>

               {/* Configuration Section */}
               <div className="product-reveal space-y-10">
                  {/* Size Selection */}
                  <div>
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black tracking-widest text-gray-500 uppercase">Select Architecture (Size)</span>
                        <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest border-b border-purple-600/30">Size Guide</button>
                     </div>
                     <div className="flex flex-wrap gap-4">
                        {(product.sizes || ['S', 'M', 'L', 'XL']).map((size: string) => (
                           <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-sm border transition-all duration-300 ${
                                 selectedSize === size
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-900/40'
                                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                              }`}
                           >
                              {size}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col sm:flex-row gap-6 items-end sm:items-center">
                     <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2">
                        <button 
                           onClick={() => setQuantity(q => Math.max(1, q - 1))}
                           className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                           <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-black text-lg text-white">{quantity}</span>
                        <button 
                           onClick={() => setQuantity(q => q + 1)}
                           className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                           <Plus className="w-4 h-4" />
                        </button>
                     </div>

                     <button 
                        onClick={() => addToCart(product.id)}
                        className="flex-1 w-full h-16 bg-white text-black rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
                     >
                        <ShoppingCart className="w-5 h-5" />
                        Inscribe to Cart
                     </button>
                  </div>
               </div>

               {/* Artisan Badges */}
               <div className="product-reveal grid grid-cols-3 gap-4 mt-16 pt-16 border-t border-white/5">
                  <div className="flex flex-col items-center text-center gap-3">
                     <ShieldCheck className="w-6 h-6 text-purple-600" />
                     <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Authenticated</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                     <Globe className="w-6 h-6 text-purple-600" />
                     <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Global Freight</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                     <Zap className="w-6 h-6 text-purple-600" />
                     <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Priority Craft</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Tabs / Detailed Specs */}
      <section className="mt-32 px-6 sm:px-8 lg:px-16 xl:px-24">
         <div className="flex justify-center border-b border-white/5 mb-16">
            {['Experience', 'Specs', 'Sustainability'].map(tab => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-12 py-6 text-xs font-black tracking-[0.3em] uppercase transition-all relative ${
                     activeTab === tab ? 'text-purple-600' : 'text-gray-500 hover:text-gray-300'
                  }`}
               >
                  {tab}
                  {activeTab === tab && (
                     <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600" />
                  )}
               </button>
            ))}
         </div>

         <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
               <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
               >
                  {activeTab === 'Experience' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <p className="text-xl leading-relaxed text-gray-400 italic">
                           "Every stitch is a conscious decision. Every seam an architectural boundary. 
                           This piece doesn't just sit on you; it co-exists."
                        </p>
                        <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5">
                           <h4 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Teko, sans-serif' }}>THE VISION</h4>
                           <ul className="space-y-4">
                              {[
                                 'Engineered for maximum kinetic freedom',
                                 'Refractive surface treatment for depth',
                                 'Internalized seams for sensory neutrality',
                                 'Modular silhouette adaptation'
                              ].map(item => (
                                 <li key={item} className="flex items-center gap-4 text-sm text-gray-500 uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  )}
                  {activeTab === 'Specs' && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                           { label: 'Material', value: 'Technical Silk' },
                           { label: 'Weight', value: 'Ultralight' },
                           { label: 'Season', value: 'Eternal' },
                           { label: 'Care', value: 'Specialized' },
                           { label: 'Origin', value: 'Studio A01' },
                           { label: 'Stitch', value: 'Reinforced' },
                           { label: 'Fit', value: 'Sculpted' },
                           { label: 'Category', value: product.category }
                        ].map(spec => (
                           <div key={spec.label} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                              <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">{spec.label}</p>
                              <p className="text-sm font-bold text-white uppercase">{spec.value}</p>
                           </div>
                        ))}
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>
      </section>

      {/* Recommended Artifacts */}
      <section className="mt-48 px-6 sm:px-8 lg:px-16 xl:px-24">
         <div className="flex items-center justify-between mb-16">
            <h2 
               className="text-5xl font-black text-white uppercase" 
               style={{ fontFamily: 'Teko, sans-serif' }}
            >
               COMPLEMENTARY <span className="text-gradient">DROPS</span>
            </h2>
            <Link to="/shop" className="text-xs font-black tracking-widest text-purple-600 uppercase border-b border-purple-600/30">View All</Link>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.slice(0, 4).filter(p => p.id !== id).map((p, idx) => (
               <ProductCard key={p.id} product={p} index={idx} accentColor="purple" />
            ))}
         </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
