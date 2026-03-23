import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Mail, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      
      // Confetti animation
      const confetti = Array.from({ length: 30 }, (_, i) => {
        const el = document.createElement('div');
        el.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
        el.style.backgroundColor = i % 2 === 0 ? '#6727aa' : '#ffcb4d';
        el.style.left = '50%';
        el.style.top = '50%';
        contentRef.current?.appendChild(el);
        return el;
      });

      confetti.forEach((el, i) => {
        const angle = (i / confetti.length) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(el, {
          x: vx,
          y: vy,
          opacity: 0,
          scale: 0,
          duration: 1 + Math.random(),
          ease: 'power2.out',
          onComplete: () => el.remove(),
        });
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/20 rounded-full blur-[150px]" />
      </div>

      {/* Spotlight effect when focused */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-500 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-8">
            <Mail className="w-8 h-8 text-purple-400" />
          </div>

          {/* Heading */}
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Join the <span className="text-gradient">Movement</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive offers, and style tips.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div 
              className={`relative flex flex-col sm:flex-row gap-4 p-2 rounded-full transition-all duration-500 ${
                isFocused 
                  ? 'bg-white/10 shadow-[0_0_60px_rgba(103,39,170,0.3)]' 
                  : 'bg-white/5'
              } border border-white/10`}
            >
              {/* Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-500 text-base focus:outline-none rounded-full"
                  disabled={isSubmitted}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted || !email}
                className={`group relative px-8 py-4 rounded-full font-semibold text-base transition-all duration-500 overflow-hidden ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-[0_0_30px_rgba(103,39,170,0.5)]'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                <span className={`flex items-center gap-2 transition-all duration-300 ${
                  isSubmitted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  Subscribe
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                
                {isSubmitted && (
                  <span className="absolute inset-0 flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: Sparkles, text: 'Exclusive Deals' },
              { icon: Mail, text: 'Weekly Updates' },
              { icon: Check, text: 'No Spam' },
            ].map((benefit) => (
              <div key={benefit.text} className="flex items-center gap-2 text-gray-400">
                <benefit.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
