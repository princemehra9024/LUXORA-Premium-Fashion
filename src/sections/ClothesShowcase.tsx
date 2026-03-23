import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allProducts } from '@/data/products';

// Check if user is on mobile to disable heavy parallax
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const ClothesShowcase = () => {
  const displayProducts = allProducts.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Reduce parallax intensity on mobile devices to prevent lag
  const range = isMobile ? 30 : 150;
  const y1 = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y2 = useTransform(scrollYProgress, [0, 1], [range * 2, -range * 2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [range * 0.7, -range * 0.7]);
  const y4 = useTransform(scrollYProgress, [0, 1], [range * 2.5, -range * 2.5]);

  const transforms = [y1, y2, y3, y4];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-64 overflow-hidden bg-black">
      {/* Background decorations instead of canvas */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-28">
          <p className="text-sm tracking-[0.3em] text-purple-500 mb-3">EXCLUSIVE DROPS</p>
          <h2 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Essential <span className="text-gradient">Apparel</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Experience our premium collection with ultra-smooth scroll-driven parallax cards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {displayProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="group relative"
              style={{ y: transforms[index] }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link to={`/shop?product=${product.id}`}>
                <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(103,39,170,0.3)] bg-white/5 border-white/10`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                    />
                  </div>
                  <div className="p-5 backdrop-blur-md bg-black/40">
                    <p className="text-xs text-purple-400 mb-1">{product.category}</p>
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">${product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClothesShowcase;
