import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from 'lucide-react';
import { reviews } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const CustomerReviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

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

      // Carousel entrance
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-purple-400 mb-3">TESTIMONIALS</p>
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Main Review Card */}
          <div className="relative overflow-hidden rounded-3xl glass p-8 lg:p-12">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
              <Quote className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600/30" />
            </div>

            {/* Review Content */}
            <div className="relative">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-purple-500/50"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <BadgeCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold text-white">{review.name}</h4>
                      <p className="text-sm text-gray-400">{review.date}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-purple-600'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Side cards (decorative) */}
          <div className="hidden lg:block absolute top-1/2 -left-32 -translate-y-1/2 w-48 h-64 rounded-2xl bg-white/5 border border-white/10 opacity-50 transform -rotate-6" />
          <div className="hidden lg:block absolute top-1/2 -right-32 -translate-y-1/2 w-48 h-64 rounded-2xl bg-white/5 border border-white/10 opacity-50 transform rotate-6" />
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
