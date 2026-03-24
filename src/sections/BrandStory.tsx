import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Package, Award, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers', color: 'purple' },
  { icon: Package, value: 500, suffix: '+', label: 'Products', color: 'yellow' },
  { icon: Award, value: 50, suffix: '+', label: 'Awards Won', color: 'purple' },
  { icon: Globe, value: 30, suffix: '+', label: 'Countries', color: 'yellow' },
];

const BrandStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content parallax
      gsap.fromTo(
        contentRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            stats.forEach((stat, index) => {
              const duration = 2;
              const startTime = Date.now();
              const animate = () => {
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const current = Math.floor(eased * stat.value);
                
                setCounters((prev) => {
                  const newCounters = [...prev];
                  newCounters[index] = current;
                  return newCounters;
                });

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              setTimeout(() => animate(), index * 200);
            });
          }
        },
      });

      // Stats cards animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 50, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <section
      ref={sectionRef}
      id="brand-story"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img loading="lazy"
          src="/hero-bg.jpg"
          alt="Brand Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Content */}
        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-purple-400 mb-4">OUR STORY</p>
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Redefining <span className="text-gradient">Men's Fashion</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2024, NOIR has been at the forefront of modern menswear, 
            blending timeless elegance with contemporary street style. We believe 
            that fashion is more than clothing—it's a statement of identity, 
            confidence, and individuality.
          </p>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Every piece in our collection is crafted with meticulous attention to detail, 
            using only the finest materials sourced from sustainable suppliers worldwide. 
            From our signature hoodies to our premium denim, each item tells a story of 
            quality, innovation, and uncompromising style.
          </p>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card group relative"
            >
              <div className="relative overflow-hidden rounded-2xl glass p-6 lg:p-8 text-center transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(103,39,170,0.2)]">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                  stat.color === 'purple' 
                    ? 'bg-purple-600/20 text-purple-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <stat.icon className="w-7 h-7" />
                </div>

                {/* Counter */}
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Teko, sans-serif' }}>
                  {formatNumber(counters[index])}{stat.suffix}
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm tracking-wider">{stat.label}</p>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  stat.color === 'purple' 
                    ? 'shadow-[inset_0_0_30px_rgba(103,39,170,0.2)]' 
                    : 'shadow-[inset_0_0_30px_rgba(255,203,77,0.2)]'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
