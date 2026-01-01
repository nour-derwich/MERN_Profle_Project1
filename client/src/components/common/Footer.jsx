import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, FiTwitter, FiLinkedin, FiGithub, FiMail, 
  FiPhone, FiMapPin, FiHeart, FiZap, FiCode, FiChevronRight,
  FiSend, FiArrowUpRight, FiShield, FiTerminal
} from 'react-icons/fi';
import { FaPython, FaReact, FaWhatsapp } from 'react-icons/fa';
import { SiPytorch, SiTensorflow } from 'react-icons/si';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home', icon: FiZap },
    { path: '/skills', label: 'Skills', icon: FiCode },
    { path: '/qualification', label: 'Qualification', icon: FiTerminal },
    { path: '/services', label: 'Services', icon: FiSend }
  ];

  const resources = [
    { path: '/projects', label: 'Projects', icon: FiCode },
    { path: '/formations', label: 'Training', icon: FiZap },
    { path: '/courses', label: 'Courses', icon: FiTerminal },
    { path: '/contact', label: 'Contact', icon: FiSend }
  ];

  const techStack = [
    { icon: FaPython, label: 'Python', color: 'from-blue-500 to-cyan-500' },
    { icon: SiPytorch, label: 'PyTorch', color: 'from-red-500 to-orange-500' },
    { icon: SiTensorflow, label: 'TensorFlow', color: 'from-orange-500 to-yellow-500' },
    { icon: FaReact, label: 'React', color: 'from-cyan-500 to-blue-500' }
  ];

  const socialLinks = [
    { 
      icon: FiLinkedin, 
      url: 'https://linkedin.com/in/keraani-naceur-49523a175/', 
      label: 'LinkedIn',
      gradient: 'from-blue-500 to-blue-700'
    },
    { 
      icon: FiGithub, 
      url: 'https://github.com', 
      label: 'GitHub',
      gradient: 'from-gray-800 to-black'
    },
    { 
      icon: FiTwitter, 
      url: 'https://twitter.com', 
      label: 'Twitter',
      gradient: 'from-sky-500 to-blue-500'
    },
    { 
      icon: FaWhatsapp, 
      url: 'https://api.whatsapp.com/send?phone=0021695881709', 
      label: 'WhatsApp',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#80808012_1px,transparent_1px),linear-gradient(180deg,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Binary Code Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono text-primary-400/20 animate-binary-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          >
            {Math.random() > 0.5 ? '1101001' : '0010110'}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-50" />
                <div className="relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl">
                  <FiCode className="text-primary-400 text-2xl" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">NACEUR KERAANI</h3>
                <div className="text-sm text-primary-400 font-medium tracking-wider">AI & ML DEVELOPER</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming complex data into intelligent solutions through cutting-edge 
              machine learning algorithms and innovative AI applications. Building the future, one algorithm at a time.
            </p>
            
            {/* Tech Stack */}
            <div className="mb-6">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-3">Tech Stack</div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={index}
                      className="group relative"
                      title={tech.label}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      <div className={`relative p-2 bg-gradient-to-br ${tech.color}/20 backdrop-blur-sm border border-gray-700/50 rounded-lg group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="text-gray-300 group-hover:text-white text-xl" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                    onMouseEnter={() => setHoveredLink(social.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <Icon className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
                    
                    {/* Tooltip */}
                    <div className={`
                      absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 px-3 py-1 rounded-lg text-xs font-medium text-white whitespace-nowrap
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                      after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800
                    `}>
                      {social.label}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-3 py-2 text-gray-400 hover:text-white transition-all duration-300"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <Icon className="text-primary-400/50 group-hover:text-primary-400 transition-colors" />
                      <span className="flex-1">{link.label}</span>
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-3 py-2 text-gray-400 hover:text-white transition-all duration-300"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <Icon className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                      <span className="flex-1">{link.label}</span>
                      <FiArrowUpRight className="opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
              Stay Updated
            </h4>
            
            {isSubscribed ? (
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiHeart className="text-green-400 animate-pulse" />
                  <div>
                    <div className="text-white font-medium">Subscribed!</div>
                    <div className="text-green-300 text-sm">You'll receive updates soon</div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="mb-3">
                  <label className="text-sm text-gray-500 mb-2 block">Get AI insights & updates</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <FiSend className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <div className="space-y-3">
              <a
                href="mailto:naceur.keraani@gmail.com"
                className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="p-2 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                  <FiMail className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-white group-hover:text-primary-300 transition-colors">
                    naceur.keraani@gmail.com
                  </div>
                </div>
              </a>
              
              <a
                href="tel:+21695881709"
                className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-green-500/30 transition-all duration-300 group"
              >
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                  <FiPhone className="text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-white group-hover:text-green-300 transition-colors">
                    +216 95 88 17 09
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {year} NACEUR KERAANI. All rights reserved.
            <div className="flex items-center gap-1 mt-1">
              <FiMapPin className="text-primary-400" />
              <span>Based in Tunis, Tunisia</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <div className="w-1 h-1 bg-gray-600 rounded-full mx-2" />
            <FiTerminal className="text-primary-400" />
            <span>Powered by Nourderouich159@gmail.com</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
            >
              <FiShield className="text-gray-500 group-hover:text-primary-400" />
              <span>Privacy</span>
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
            >
              <FiTerminal className="text-gray-500 group-hover:text-blue-400" />
              <span>Terms</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Available for projects</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl backdrop-blur-sm text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
        >
          <FiArrowUpRight className="transform -rotate-45 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .animate-binary-fall {
          animation: binary-fall linear infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;