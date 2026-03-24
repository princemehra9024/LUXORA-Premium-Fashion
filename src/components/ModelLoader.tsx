import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface ModelLoaderProps {
  isLoaded: boolean;
}

/**
 * A premium logo overlay that shows while the 3D model is loading.
 * Smoothly fades out and reveals the model once it's fully loaded.
 */
const ModelLoader = ({ isLoaded }: ModelLoaderProps) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="model-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none ${
            theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f8f7ff]'
          }`}
        >
          {/* Logo Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl border ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white border-purple-100 shadow-purple-100/50'
            }`}
          >
            <img loading="lazy"
              src="/logo.png"
              alt="LUXORA"
              className="w-12 h-12 object-contain"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-3xl font-black tracking-[0.2em] uppercase mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-[#111111]'
            }`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            LUXORA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`text-xs tracking-[0.3em] uppercase mb-10 ${
              theme === 'dark' ? 'text-purple-400/70' : 'text-purple-600/60'
            }`}
          >
            Loading Experience...
          </motion.p>

          {/* Animated loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`w-32 h-[2px] rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-white/10' : 'bg-black/5'
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
              style={{ animation: 'model-load-progress 2s ease-in-out infinite' }}
            />
          </motion.div>

          <style>{`
            @keyframes model-load-progress {
              0% { width: 0%; margin-left: 0%; }
              50% { width: 100%; margin-left: 0%; }
              100% { width: 0%; margin-left: 100%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModelLoader;
