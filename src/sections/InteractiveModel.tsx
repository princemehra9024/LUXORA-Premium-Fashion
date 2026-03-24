import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import SketchfabModel from '@/components/SketchfabModel';
import ModelLoader from '@/components/ModelLoader';
import { Box } from 'lucide-react';

const InteractiveModel = () => {
  const { theme } = useTheme();
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <section className={`py-32 px-5 sm:px-8 lg:px-16 xl:px-24 overflow-hidden relative ${
      theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0eeff]'
    }`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 ${
          theme === 'dark' ? 'bg-purple-600' : 'bg-purple-300'
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 ${
          theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-200'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-3 mb-6"
            >
              <div className="w-16 h-[2px] bg-purple-600" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-500">Virtual Fitting Room</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              EXPERIENCE IN <span className="text-gradient">3D</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`max-w-md text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Interact with our flagship masterpiece from every angle before you buy. Experience the precision of our artisan tailoring in high-definition 3D.
          </motion.p>
        </div>

        {/* 3D Model Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`relative w-full h-[60svh] lg:h-[80svh] rounded-3xl overflow-hidden shadow-2xl ${
            theme === 'dark' ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-purple-100'
          }`}
        >
          {/* Top-right floating badge */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-purple-600/90 backdrop-blur-md px-4 py-2 rounded-full border border-purple-400/30 shadow-lg">
             <Box className="w-4 h-4 text-white" />
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Interactive View</span>
          </div>

          <ModelLoader isLoaded={modelLoaded} />

          <SketchfabModel
            modelId="96340701c2ed4d37851c7d9109eee9c0"
            onLoad={() => setModelLoaded(true)}
            theme={theme}
            className={`w-full h-full transition-opacity duration-[2000ms] ${modelLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveModel;
