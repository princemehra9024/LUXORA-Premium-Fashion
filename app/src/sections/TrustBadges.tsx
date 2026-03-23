import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Truck, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const TrustBadges = () => {
  const { theme } = useTheme();

  const badges = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      desc: 'On all orders over $150',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: RefreshCw,
      title: 'Easy 30-Day Returns',
      desc: 'No questions asked online returns',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      desc: '100% protected payments',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Clock,
      title: '24/7 Premium Support',
      desc: 'Dedicated styling assistance',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    }
  ];

  return (
    <section className={`py-16 border-y ${
      theme === 'dark' ? 'bg-black/50 border-white/5' : 'bg-gray-50 border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {badges.map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 ${badge.bg}`}>
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {badge.title}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
