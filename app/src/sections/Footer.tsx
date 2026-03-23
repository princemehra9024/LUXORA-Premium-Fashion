import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  ShoppingBag
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Best Sellers', href: '/shop?sort=bestsellers' },
    { label: 'Sale', href: '/shop?sale=true' },
    { label: 'All Products', href: '/shop' },
  ],
  help: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/contact#faq' },
    { label: 'Shipping', href: '/contact' },
    { label: 'Returns', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/about#careers' },
    { label: 'Press', href: '/about#press' },
    { label: 'Sustainability', href: '/about#sustainability' },
  ],
};

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`border-t transition-colors ${
      theme === 'dark' 
        ? 'bg-black border-white/10' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span 
                className={`text-3xl font-bold transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: 'Teko, sans-serif' }}
              >
                NOIR
              </span>
            </Link>

            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Redefining men's fashion with premium quality, modern designs, and 
              uncompromising style. Join the movement.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 text-gray-400 hover:bg-purple-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h4 className={`font-semibold mb-4 text-sm tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                SHOP
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className={`text-sm transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-purple-400' 
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 text-sm tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                HELP
              </h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className={`text-sm transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-purple-400' 
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 text-sm tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                COMPANY
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className={`text-sm transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-purple-400' 
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className={`font-semibold mb-4 text-sm tracking-wider ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  123 Fashion Street<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className={`text-sm transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <a 
                  href="mailto:hello@noir.com" 
                  className={`text-sm transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-purple-400' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  hello@noir.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2024 NOIR. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className={`text-sm transition-colors ${
              theme === 'dark' 
                ? 'text-gray-500 hover:text-purple-400' 
                : 'text-gray-500 hover:text-purple-600'
            }`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm transition-colors ${
              theme === 'dark' 
                ? 'text-gray-500 hover:text-purple-400' 
                : 'text-gray-500 hover:text-purple-600'
            }`}>
              Terms of Service
            </a>
            <a href="#" className={`text-sm transition-colors ${
              theme === 'dark' 
                ? 'text-gray-500 hover:text-purple-400' 
                : 'text-gray-500 hover:text-purple-600'
            }`}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
