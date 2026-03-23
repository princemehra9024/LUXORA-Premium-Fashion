import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation with a slightly different skew/scale for Bento feel
      const cards = cardsRef.current?.querySelectorAll('.product-card-container');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, scale: 0.9, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    if (isEnter) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30; // Subtle rotation
      const rotateY = (centerX - x) / 30;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        scale: 1.01,
        z: 20,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const leftProduct = featuredProducts[0];
  const rightProduct = featuredProducts[1];

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent opacity-50" />
      
      {/* Abstract shapes for premium feel */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-0 sm:px-0 lg:px-0">
        {/* Section Header */}
        <div ref={headingRef} className="px-6 sm:px-8 lg:px-16 xl:px-24 flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-sm tracking-[0.4em] text-purple-400 mb-4 font-teko uppercase">The Archive</p>
            <h2 
              className="text-6xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.85]"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              CRAFTED FOR <br /><span className="text-gradient">UNIQUENESS</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0 text-right">
             <span className="text-xs tracking-[0.4em] text-white/40 uppercase font-black italic block">Collection 2024 / Elite Edition</span>
             <p className="text-white/20 text-[10px] mt-2 tracking-[0.2em] font-medium">LUXORA © ALL RIGHTS RESERVED</p>
          </div>
        </div>

        {/* Split Screen Product Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 preserve-3d"
        >
          {/* Left Large Card */}
          <div 
            className="product-card-container relative h-[600px] lg:h-[90vh] overflow-hidden group cursor-pointer"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onMouseMove={handleMouseMove}
          >
            <div className="absolute top-8 left-8 z-20">
              <span className="px-4 py-2 bg-yellow-500 text-black text-xs font-black tracking-widest rounded-sm shadow-xl">BESTSELLER</span>
            </div>
            <img 
              src={leftProduct.image} 
              alt={leftProduct.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12 z-10">
              <p className="text-purple-400 text-xs tracking-[0.3em] font-bold mb-2 uppercase">{leftProduct.category}</p>
              <h3 className="text-4xl lg:text-7xl font-black text-white mb-4 leading-none" style={{ fontFamily: 'Teko, sans-serif' }}>{leftProduct.name}</h3>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black text-white">${leftProduct.price}</span>
                <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-purple-600 hover:text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right Large Card with Background Glow */}
          <div 
            className="product-card-container relative h-[600px] lg:h-[90vh] bg-[#030303] overflow-hidden flex items-center justify-center p-12 group cursor-pointer"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onMouseMove={handleMouseMove}
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)]" />
             
             <div className="relative z-10 w-full max-w-lg">
                <div className="absolute -top-12 left-0 z-20">
                  <span className="px-4 py-2 bg-red-600 text-white text-xs font-black tracking-widest rounded-sm shadow-xl">
                    {rightProduct.originalPrice ? 'LIMITED SALE' : 'NEW ARRIVAL'}
                  </span>
                </div>
                <div className="absolute -bottom-8 right-0 z-20">
                  <span className="px-4 py-2 bg-purple-600 text-white text-xs font-black tracking-widest rounded-sm shadow-xl">ESSENTIALS</span>
                </div>
                <img 
                  src={rightProduct.image} 
                  alt={rightProduct.name} 
                  className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl transition-all duration-700 group-hover:rotate-1"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-2xl opacity-90">
                  <p className="text-purple-400 text-xs tracking-[0.3em] font-bold mb-1 uppercase">{rightProduct.category}</p>
                  <h3 className="text-4xl font-black text-white leading-none mb-4" style={{ fontFamily: 'Teko, sans-serif' }}>{rightProduct.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-white">${rightProduct.price}</span>
                    {rightProduct.originalPrice && (
                      <span className="text-white/40 line-through text-sm font-bold">${rightProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center -mt-16 relative z-30">
          <button className="group relative px-16 py-6 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] flex items-center gap-6">
            <span className="relative z-10 text-[10px] tracking-[0.5em] font-black uppercase">
              Explore All Essentials
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
