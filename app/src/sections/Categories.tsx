import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      // Accordion items animation
      const items = accordionRef.current?.querySelectorAll('.category-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-purple-400 mb-3">BROWSE BY</p>
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            <span className="text-gradient">Categories</span>
          </h2>
        </div>

        {/* Accordion Categories */}
        <div 
          ref={accordionRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-2 lg:h-[600px]"
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-item group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeIndex === index
                  ? 'lg:flex-[3] flex-auto h-[400px] lg:h-auto'
                  : activeIndex !== null
                  ? 'lg:flex-[0.5] flex-auto h-[100px] lg:h-auto'
                  : 'lg:flex-1 flex-auto h-[150px] lg:h-auto'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    activeIndex === index ? 'scale-100' : 'scale-110'
                  }`}
                />
                {/* Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
                    : 'bg-black/60'
                }`} />
                <div className={`absolute inset-0 bg-purple-600/20 transition-opacity duration-500 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                {/* Category Name - Vertical when collapsed on desktop */}
                <div className={`transition-all duration-500 ${
                  activeIndex === index ? 'lg:transform-none' : 'lg:-rotate-90 lg:origin-left lg:translate-x-8'
                }`}>
                  <h3 
                    className={`font-bold text-white transition-all duration-500 ${
                      activeIndex === index 
                        ? 'text-3xl lg:text-5xl' 
                        : 'text-xl lg:text-2xl lg:whitespace-nowrap'
                    }`}
                    style={{ fontFamily: 'Teko, sans-serif' }}
                  >
                    {category.name}
                  </h3>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-gray-300 text-sm mb-4">
                    {category.productCount} Products
                  </p>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors duration-300 group/btn">
                    Explore
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none ${
                activeIndex === index 
                  ? 'border-purple-500 shadow-[0_0_30px_rgba(103,39,170,0.4)]' 
                  : 'border-white/10'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
