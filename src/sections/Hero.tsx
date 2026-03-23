import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headingRef.current, subheadingRef.current, descRef.current], {
        opacity: 0,
        y: 100,
      });
      gsap.set(ctaRef.current, { opacity: 0, y: 50 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.2 });
      gsap.set(overlayRef.current, { opacity: 1 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
      }, '-=1')
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.2')
      .to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.9')
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.7')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.5');

      // Scroll parallax for image
      gsap.to(imageRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Scroll parallax for text
      gsap.to([headingRef.current, subheadingRef.current, descRef.current], {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/hero-bg.jpg"
          alt="Fashion Hero"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
      </div>

      {/* Loading overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10"
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-20">
          <div className="max-w-4xl">
            {/* Subheading */}
            <p
              ref={subheadingRef}
              className="text-sm sm:text-base tracking-[0.3em] text-purple-400 mb-4 font-medium"
            >
              ACODING BRAND
            </p>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-6"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              <span className="block">ACODING</span>
              <span className="block text-gradient">FASHION</span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-gray-300 max-w-xl mb-10 leading-relaxed"
            >
              Discover the latest information and trends in fashion. With Acoding, 
              we add uniqueness and premium quality to elevate your everyday style.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('#featured')}
                className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(103,39,170,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#categories')}
                className="group border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-20 right-10 lg:right-20 z-20 hidden lg:block">
        <div className="glass rounded-2xl p-6 max-w-xs animate-pulse">
          <p className="text-xs text-purple-400 tracking-wider mb-2">NEW COLLECTION</p>
          <p className="text-white text-sm">Spring/Summer 2024</p>
          <p className="text-gray-400 text-xs mt-1">Available Now</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
