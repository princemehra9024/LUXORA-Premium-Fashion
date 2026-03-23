import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';
import { Star } from 'lucide-react';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
}

const Marquee = ({ text, speed = 1, direction = 'left' }: MarqueeProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    const textWidth = textElement.offsetWidth;

    // Clone the text element to create an infinite loop
    const clone = textElement.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    // Initial positioning
    gsap.set([textElement, clone], { x: 0 });

    // Animation
    const distance = direction === 'left' ? -textWidth : textWidth;
    const duration = (textWidth / 100) / speed; // Adjust multiplier for base speed

    const tl = gsap.to([textElement, clone], {
      x: distance,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % textWidth)
      }
    });

    return () => {
      tl.kill();
      if (container.contains(clone)) {
        container.removeChild(clone);
      }
    };
  }, [text, speed, direction]);

  const items = text.split('•').map(t => t.trim()).filter(Boolean);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden whitespace-nowrap py-3 sm:py-4 flex items-center border-y ${
        theme === 'dark' 
          ? 'bg-purple-900/20 border-purple-500/20 text-purple-300' 
          : 'bg-purple-50 border-purple-200 text-purple-800'
      }`}
    >
      <div ref={textRef} className="inline-flex items-center gap-8 px-4 font-semibold text-xs sm:text-sm tracking-widest uppercase">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span>{item}</span>
            <Star className="w-3 h-3 text-purple-500 fill-purple-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
