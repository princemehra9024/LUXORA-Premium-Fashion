import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { reviews } from '@/data/products';
import { Star, Quote } from 'lucide-react';

const ReviewMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const cards = Array.from(marquee.children);
    const totalWidth = cards.reduce((acc, card) => acc + (card as HTMLElement).offsetWidth + 24, 0);

    const clone = marquee.cloneNode(true) as HTMLDivElement;
    marquee.parentElement?.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = `${totalWidth}px`;

    const animation = gsap.to([marquee, clone], {
      x: -totalWidth,
      duration: 40,
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
    <section className="py-24 overflow-hidden bg-black text-white">
      <div className="px-6 mb-16 text-center">
        <p className="text-purple-400 text-sm tracking-[0.3em] font-medium mb-4 uppercase">Voice of Luxora</p>
        <h2 
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          style={{ fontFamily: 'Teko, sans-serif' }}
        >
          Customer <span className="text-gradient">Experiences</span>
        </h2>
      </div>
      
      <div className="relative">
        <div ref={marqueeRef} className="flex gap-6 px-3">
          {reviews.concat(reviews).map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 w-[350px] md:w-[450px] p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1 border-2 border-black">
                    <Quote className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 italic leading-relaxed text-lg">
                "{review.comment}"
              </p>
              <div className="mt-6 flex items-center justify-between opacity-50 text-xs tracking-widest uppercase">
                <span>{review.date}</span>
                <span className="text-purple-400">Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewMarquee;
