import { motion } from 'framer-motion';
import { User, Package, MapPin, Search } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ProfilePage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start gap-12"
        >
          {/* Sidebar */}
          <div className={`w-full md:w-80 p-6 rounded-3xl border ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex flex-col items-center mb-8 pt-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 mb-4 flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Jane Doe
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                jane.doe@example.com
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { icon: User, label: 'Personal Info', active: true },
                { icon: Package, label: 'Orders', active: false },
                { icon: MapPin, label: 'Addresses', active: false },
                { icon: Search, label: 'Browsing History', active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-3 w-full p-4 rounded-xl text-left transition-colors ${
                    item.active
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            <button className="w-full mt-8 p-4 text-red-500 font-medium hover:bg-red-500/10 rounded-xl transition-colors">
              Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Personal Information
            </h1>
            
            <div className={`p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={e => e.preventDefault()}>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                  <input type="text" defaultValue="Jane" className={`w-full p-4 rounded-xl border outline-none focus:border-purple-500 transition-colors ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                  <input type="text" defaultValue="Doe" className={`w-full p-4 rounded-xl border outline-none focus:border-purple-500 transition-colors ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                  <input type="email" defaultValue="jane.doe@example.com" className={`w-full p-4 rounded-xl border outline-none focus:border-purple-500 transition-colors ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`} />
                </div>
                <div className="space-y-2 md:col-span-2 mt-4">
                  <button className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
