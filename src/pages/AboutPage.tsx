import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, 
  Leaf, 
  Users, 
  Target, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Passion for Quality',
    description: 'Every stitch, every fabric, every detail is crafted with love and dedication to excellence.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We are committed to eco-friendly practices and sustainable sourcing of materials.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We listen, adapt, and continuously improve.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Pushing boundaries in design and technology to create the future of fashion.',
  },
];

const milestones = [
  { year: '2024', title: 'Founded', description: 'NOIR was born with a vision to redefine menswear.' },
  { year: '2024', title: 'First Collection', description: 'Launched our debut collection with 50 premium pieces.' },
  { year: '2024', title: 'Global Reach', description: 'Expanded to 30+ countries worldwide.' },
  { year: '2025', title: 'Sustainability Initiative', description: 'Committed to 100% sustainable materials by 2030.' },
];

const team = [
  {
    name: 'Alexander Noir',
    role: 'Founder & CEO',
    image: '/avatar-1.jpg',
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: '/avatar-2.jpg',
  },
  {
    name: 'David Park',
    role: 'Head of Design',
    image: '/avatar-3.jpg',
  },
];

const AboutPage = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll('.animate-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div ref={heroRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src={theme === 'dark' ? '/hero-bg.jpg' : '/hero-bg-light.jpg'}
            alt="About Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'}`} />
        </div>

        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-purple-500 tracking-wider">OUR STORY</span>
          </div>
          <h1 
            className={`text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Crafting <span className="text-gradient">Excellence</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            From a small studio to a global brand, our journey is defined by passion, 
            innovation, and an unwavering commitment to quality.
          </p>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Mission Statement */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center animate-item">
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Our <span className="text-gradient">Mission</span>
            </h2>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              At NOIR, we believe that fashion is more than just clothing—it's a powerful form of self-expression. 
              Our mission is to empower men around the world to look and feel their best through thoughtfully 
              designed, premium quality apparel that combines timeless elegance with modern innovation.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16 animate-item">
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`animate-item p-8 rounded-2xl border text-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(103,39,170,0.2)] ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-6">
                  <value.icon className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16 animate-item">
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Milestones that shaped our story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.title}
                className={`animate-item flex gap-8 mb-8 last:mb-0 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-1 p-6 rounded-2xl border ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}>
                  <span className="text-purple-500 font-bold text-lg">{milestone.year}</span>
                  <h3 className={`text-xl font-semibold mt-2 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {milestone.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {milestone.description}
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-600" />
                  <div className="w-0.5 flex-1 bg-purple-600/30" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16 animate-item">
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              The passionate people behind NOIR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.name}
                className={`animate-item text-center p-6 rounded-2xl border transition-all duration-300 hover:border-purple-500/50 ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <img loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-purple-600/30"
                />
                <h3 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className="text-purple-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className={`p-8 lg:p-12 rounded-3xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-purple-900/30 to-purple-600/10' 
              : 'bg-gradient-to-br from-purple-100 to-purple-50'
          }`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '200+', label: 'Products' },
                { value: '30+', label: 'Countries' },
                { value: '15+', label: 'Awards' },
              ].map((stat) => (
                <div key={stat.label} className="text-center animate-item">
                  <div 
                    className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
                    style={{ fontFamily: 'Teko, sans-serif' }}
                  >
                    {stat.value}
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Promise */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-item">
              <h2 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Teko, sans-serif' }}
              >
                Our <span className="text-gradient">Quality Promise</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Premium materials sourced from trusted suppliers',
                'Rigorous quality control at every stage',
                'Ethical manufacturing practices',
                'Sustainable packaging solutions',
                '30-day satisfaction guarantee',
                'Lifetime customer support',
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`animate-item flex items-center gap-4 p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-white shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
