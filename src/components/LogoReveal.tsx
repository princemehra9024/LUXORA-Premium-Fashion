import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoRevealProps {
  onComplete?: () => void;
}

const LogoReveal = ({ onComplete }: LogoRevealProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const letters = 'LUXORA'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          onComplete?.();
        },
      });

      // Initial states
      gsap.set(logoRef.current, { 
        scale: 0.5, 
        rotation: -20,
        opacity: 0,
        filter: 'blur(20px)'
      });
      
      const letterElements = textRef.current?.querySelectorAll('.letter');
      if (letterElements && letterElements.length > 0) {
        gsap.set(letterElements, { 
          y: 40, 
          opacity: 0,
          rotateX: -30,
          filter: 'blur(10px)'
        });
      }
      
      gsap.set(taglineRef.current, { 
        opacity: 0, 
        y: 10,
        letterSpacing: '0.1em'
      });

      // Animation sequence
      tl.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'expo.out',
      });
      
      if (letterElements && letterElements.length > 0) {
        tl.to(letterElements, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.04,
          ease: 'expo.out',
        }, '-=0.6');
      }
      
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.3em',
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(logoRef.current, {
        boxShadow: theme === 'dark' 
          ? '0 0 60px rgba(168, 85, 247, 0.4)' 
          : '0 0 60px rgba(103, 39, 170, 0.2)',
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      }, '-=0.3')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'expo.inOut',
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, theme]);

  if (!isAnimating) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-700 ${
        theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fcfcff]'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] animate-pulse opacity-20 ${
          theme === 'dark' ? 'bg-purple-600' : 'bg-purple-200'
        }`} />
        <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 ${
          theme === 'dark' ? 'bg-purple-800' : 'bg-purple-100'
        }`} />
      </div>

      <div className="relative flex flex-col items-center">
        <div 
          ref={logoRef}
          className={`w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] flex items-center justify-center mb-10 overflow-hidden relative shadow-2xl ${
            theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-purple-100'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br opacity-10 ${
            theme === 'dark' ? 'from-purple-500 to-transparent' : 'from-purple-200 to-transparent'
          }`} />
          <img 
            src="/logo.png" 
            alt="LUXORA Logo" 
            className="w-16 lg:w-20 h-16 lg:h-20 object-contain relative z-10"
          />
        </div>

        <div 
          ref={textRef}
          className="flex overflow-hidden mb-4"
          style={{ perspective: '1000px' }}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`letter text-7xl lg:text-9xl font-black inline-block tracking-tighter ${
                theme === 'dark' ? 'text-white' : 'text-[#111111]'
              }`}
              style={{ 
                fontFamily: 'Teko, sans-serif',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p 
          ref={taglineRef}
          className={`text-sm lg:text-base tracking-[0.3em] font-medium uppercase ${
            theme === 'dark' ? 'text-purple-400/80' : 'text-purple-600/70'
          }`}
          style={{ fontFamily: 'Teko, sans-serif' }}
        >
          REDEFINE YOUR STYLE
        </p>

        <div className={`mt-16 w-32 h-[1px] rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-white/10' : 'bg-black/5'
        }`}>
          <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 animate-loading-bar" />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 3s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoReveal;
