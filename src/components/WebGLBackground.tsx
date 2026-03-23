import { useTheme } from '@/contexts/ThemeContext';

const WebGLBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === 'dark'
            ? 'bg-[#050505]'
            : 'bg-gradient-to-br from-gray-50 via-white to-purple-50/30'
        }`}
      />

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-aurora opacity-20"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(103,39,170,0.6) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          top: 'calc(-10% + var(--scroll-progress) * 10%)',
          left: '10%',
          willChange: 'transform, top',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(244,63,94,0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)',
          bottom: 'calc(-5% + var(--scroll-progress) * 5%)',
          right: '5%',
          animation: 'aurora 25s ease-in-out infinite reverse',
          willChange: 'transform, bottom',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-10"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(255,203,77,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,203,77,0.15) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, calc(var(--scroll-progress) * 80px))',
          animation: 'aurora 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: theme === 'dark'
            ? `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating fashion elements - subtle diagonal lines like fabric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Thread line 1 */}
        <div
          className="absolute w-[1px] h-[300px] opacity-[0.06] rotate-[25deg]"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to bottom, transparent, rgba(103,39,170,0.8), transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(103,39,170,0.3), transparent)',
            top: '10%',
            left: '20%',
            animation: 'float-thread 12s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Thread line 2 */}
        <div
          className="absolute w-[1px] h-[250px] opacity-[0.05] rotate-[-15deg]"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to bottom, transparent, rgba(244,63,94,0.7), transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(244,63,94,0.25), transparent)',
            top: '30%',
            right: '25%',
            animation: 'float-thread 15s ease-in-out infinite reverse',
          }}
        />
        {/* Thread line 3 */}
        <div
          className="absolute w-[1px] h-[350px] opacity-[0.04] rotate-[40deg]"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to bottom, transparent, rgba(255,203,77,0.6), transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(255,203,77,0.2), transparent)',
            bottom: '10%',
            left: '60%',
            animation: 'float-thread 18s ease-in-out infinite',
          }}
        />

        {/* Floating diamond shapes - like fashion accents */}
        <div
          className="absolute w-3 h-3 rotate-45 opacity-[0.08]"
          style={{
            background: theme === 'dark'
              ? 'rgba(103,39,170,0.8)' : 'rgba(103,39,170,0.3)',
            top: '15%',
            right: '15%',
            animation: 'float-diamond 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-2 h-2 rotate-45 opacity-[0.06]"
          style={{
            background: theme === 'dark'
              ? 'rgba(244,63,94,0.7)' : 'rgba(244,63,94,0.25)',
            bottom: '25%',
            left: '10%',
            animation: 'float-diamond 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-4 h-4 rotate-45 opacity-[0.05]"
          style={{
            background: theme === 'dark'
              ? 'rgba(255,203,77,0.5)' : 'rgba(255,203,77,0.15)',
            top: '60%',
            right: '35%',
            animation: 'float-diamond 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          theme === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.03)_100%)]'
        }`}
      />
    </div>
  );
};

export default WebGLBackground;
