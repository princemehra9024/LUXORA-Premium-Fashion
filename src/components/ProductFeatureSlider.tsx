import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export interface Feature {
  id: string;
  text: string;
  top: string;
  left?: string;
  right?: string;
}

interface ProductFeatureSliderProps {
  leftImage: string;
  rightImage: string;
  leftTitle: string;
  rightTitle: string;
  leftFeatures: Feature[];
  rightFeatures: Feature[];
}

const ProductFeatureSlider = ({
  leftImage,
  rightImage,
  leftTitle,
  rightTitle,
  leftFeatures,
  rightFeatures,
}: ProductFeatureSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchend', stopDragging);
    } else {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging]);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-transparent">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-purple-500 mb-3">THE DIFFERENCE</p>
          <h2 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Why Choose <span className="text-gradient">NOIR</span>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[3/4] md:aspect-[16/9] select-none group">
          <div
            ref={containerRef}
            className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ${
              theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-gray-100 border-gray-200'
            } border`}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* Right Image (Background) - OTHER BRANDS */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={rightImage}
                alt="Right comparison"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg pointer-events-none z-10 transition-opacity">
                {rightTitle}
              </div>
              
              {/* Right Features */}
              {rightFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="absolute z-20 pointer-events-none flex items-center transition-opacity duration-300"
                  style={{ 
                    top: feature.top, 
                    right: feature.right || '10%',
                    opacity: sliderPosition < parseFloat(feature.right || '10') ? 1 : 0 
                  }}
                >
                  <div className={`hidden md:block w-12 lg:w-20 h-[2px] ${theme === 'dark' ? 'bg-white/50' : 'bg-gray-900/50'} mr-4`} />
                  <span className={`font-semibold text-xs md:text-sm lg:text-base whitespace-nowrap bg-white/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg border ${
                    theme === 'dark' ? 'text-gray-900 border-white/20' : 'text-gray-900 border-gray-200'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Left Image (Foreground/Clipped) - OUR BRAND */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={leftImage}
                alt="Left comparison"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 bg-purple-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg pointer-events-none z-10">
                {leftTitle}
              </div>

              {/* Left Features */}
              {leftFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="absolute z-20 pointer-events-none flex items-center transition-opacity duration-300"
                  style={{ 
                    top: feature.top, 
                    left: feature.left || '10%',
                    opacity: sliderPosition > (100 - parseFloat(feature.left || '10')) ? 1 : 0 
                  }}
                >
                  <span className="font-semibold text-xs md:text-sm lg:text-base whitespace-nowrap bg-purple-600/80 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg border border-purple-500/50">
                    {feature.text}
                  </span>
                  <div className="hidden md:block w-12 lg:w-20 h-[2px] bg-purple-500/50 ml-4" />
                </div>
              ))}
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-purple-500 text-purple-600 pointer-events-auto transition-transform hover:scale-110 active:scale-95">
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 -mr-1" />
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 -ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureSlider;
