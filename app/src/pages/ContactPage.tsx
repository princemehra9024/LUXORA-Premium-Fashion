import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@noir.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (234) 567-890',
    description: 'Mon-Fri, 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '123 Fashion Street',
    description: 'New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon - Fri: 9AM - 6PM',
    description: 'Weekend: Closed',
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unworn items with original tags attached.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 30 countries worldwide. International shipping times vary by location.',
  },
  {
    question: 'How do I find my size?',
    answer: 'Check our detailed size guide on each product page. You can also contact us for personalized sizing advice.',
  },
];

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a question or feedback? We'd love to hear from you. 
            Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info) => (
            <div 
              key={info.title}
              className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:border-purple-500/50 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/20 mb-4">
                <info.icon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {info.title}
              </h3>
              <p className="text-purple-500 font-medium">{info.value}</p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {info.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white border-gray-200 shadow-xl'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-[0_0_30px_rgba(103,39,170,0.5)]'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Social */}
          <div className="space-y-8">
            {/* FAQ */}
            <div className={`p-8 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-purple-500" />
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className={`border rounded-xl overflow-hidden transition-colors ${
                      theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                        openFaq === index 
                          ? 'bg-purple-600/10' 
                          : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </span>
                      <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-40' : 'max-h-0'
                    }`}>
                      <p className={`p-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className={`p-8 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-xl'
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h2>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Stay updated with our latest collections and exclusive offers
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/10 text-white hover:bg-purple-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white'
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
