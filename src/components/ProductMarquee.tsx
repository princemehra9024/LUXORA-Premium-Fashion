import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { featuredProducts } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const cards = Array.from(marquee.children);
    const totalWidth = cards.reduce((acc, card) => acc + (card as HTMLElement).offsetWidth + 24, 0);

    // Duplicate content for infinite scroll
    const clone = marquee.cloneNode(true) as HTMLDivElement;
    marquee.parentElement?.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = `${totalWidth}px`;

    const animation = gsap.to([marquee, clone], {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    marquee.parentElement?.addEventListener('mouseenter', handleMouseEnter);
    marquee.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      clone.remove();
      marquee.parentElement?.removeEventListener('mouseenter', handleMouseEnter);
      marquee.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-black/5 dark:bg-white/5">
      <div className="px-6 mb-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trending Now</h2>
        <Link to="/shop" className="text-sm font-medium flex items-center gap-2 hover:text-purple-500 transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="relative">
        <div ref={marqueeRef} className="flex gap-6 px-3">
          {featuredProducts.concat(featuredProducts).map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`}
              className="flex-shrink-0 w-64 md:w-80 group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-purple-500 font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductMarquee;
