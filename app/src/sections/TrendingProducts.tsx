import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Eye } from 'lucide-react';
import { trendingProducts } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const TrendingProducts = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Masonry cards animation with different parallax speeds
      const cards = gridRef.current?.querySelectorAll('.trending-card');
      if (cards) {
        cards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          
          // Entrance animation
          gsap.fromTo(
            card,
            { opacity: 0, y: 100, rotateX: 20 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Parallax effect - odd columns move faster
          gsap.to(card, {
            y: isEven ? -30 : -80,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trending"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 tracking-wider">TRENDING NOW</span>
          </div>
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            What's <span className="text-gradient">Hot</span>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className={`trending-card group relative ${
                index % 2 === 1 ? 'lg:mt-16' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_50px_rgba(103,39,170,0.3)]">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Hover overlay with quick view */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-purple-700">
                      <Eye className="w-4 h-4" />
                      Quick View
                    </button>
                  </div>

                  {/* Product info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-purple-400 tracking-wider mb-1">{product.category}</p>
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">${product.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-300">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
