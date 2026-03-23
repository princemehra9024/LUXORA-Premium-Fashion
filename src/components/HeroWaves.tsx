/**
 * HeroWaves — Animated background waves using pure CSS + SVG sine curves.
 * Creates layered, flowing wave strips that undulate continuously.
 * Used behind the hero 3D model for a fashion/energy feel.
 */
const HeroWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* ── Bottom sine-wave stack ── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave 1 – deepest purple */}
        <path
          d="M0,160 C360,260 1080,60 1440,160 L1440,320 L0,320 Z"
          fill="rgba(103,39,170,0.12)"
          style={{ animation: 'waveShift1 8s ease-in-out infinite alternate' }}
        />
        {/* Wave 2 – mid indigo */}
        <path
          d="M0,200 C480,100 960,300 1440,200 L1440,320 L0,320 Z"
          fill="rgba(79,70,229,0.08)"
          style={{ animation: 'waveShift2 11s ease-in-out infinite alternate' }}
        />
        {/* Wave 3 – top violet */}
        <path
          d="M0,240 C360,180 1080,300 1440,240 L1440,320 L0,320 Z"
          fill="rgba(139,92,246,0.06)"
          style={{ animation: 'waveShift3 14s ease-in-out infinite alternate' }}
        />
      </svg>

      {/* ── Top / mid ambient glow streaks ── */}
      <div
        className="absolute w-full h-[2px] opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8) 30%, rgba(244,63,94,0.6) 70%, transparent)',
          top: '35%',
          animation: 'streakMove 6s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute w-full h-[1px] opacity-15"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,203,77,0.5) 50%, transparent)',
          top: '55%',
          animation: 'streakMove 9s ease-in-out infinite alternate-reverse',
        }}
      />
    </div>
  );
};

export default HeroWaves;
