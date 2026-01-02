import React, { useState, useEffect } from 'react';
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare,
  FiCheckCircle, FiClock, FiGlobe, FiLinkedin, FiGithub, 
  FiTwitter, FiCalendar, FiArrowRight, FiChevronRight,
  FiZap, FiTerminal, FiTarget
} from 'react-icons/fi';
import { SiUpwork, SiFiverr } from 'react-icons/si';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMethod, setActiveMethod] = useState('email');
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    // Add binary code animation
    const binaryElements = document.querySelectorAll('.binary-fall');
    binaryElements.forEach(el => {
      el.style.animationDelay = `${Math.random() * 5}s`;
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  // Contact Methods
  const contactMethods = [
    {
      id: 'email',
      icon: FiMail,
      title: 'Email',
      value: 'naceur.keraani@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '24h',
      description: 'Detailed discussions',
      link: 'mailto:naceur.keraani@gmail.com'
    },
    {
      id: 'whatsapp',
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+216 95 88 17 09',
      gradient: 'from-green-500 to-emerald-500',
      delay: 'Instant',
      description: 'Quick conversations',
      link: 'https://api.whatsapp.com/send?phone=0021695881709&text=Hello, more information!'
    },
    {
      id: 'telegram',
      icon: FaTelegramPlane,
      title: 'Telegram',
      value: '@naceur_keraani',
      gradient: 'from-sky-500 to-blue-500',
      delay: 'Instant',
      description: 'File sharing available',
      link: 'https://t.me/naceur_keraani'
    },
    {
      id: 'location',
      icon: FiMapPin,
      title: 'Location',
      value: 'Tunis, Tunisia',
      gradient: 'from-purple-500 to-pink-500',
      delay: 'Remote',
      description: 'Available worldwide',
      link: '#'
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      title: 'AI/ML Project Consultation',
      description: 'Discuss your AI project requirements',
      icon: FiTerminal,
      button: 'Schedule a Call',
      link: 'https://calendly.com/yourprofile',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Training Program Inquiry',
      description: 'Learn about our ML training programs',
      icon: FiTarget,
      button: 'View Programs',
      link: '/formations',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Quick Question',
      description: 'Send me a direct message',
      icon: FiZap,
      button: 'DM on WhatsApp',
      link: 'https://api.whatsapp.com/send?phone=0021695881709',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Social Links
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

  // Stats
  const stats = [
    { label: 'Response Rate', value: '100%', icon: FiCheckCircle, color: 'from-green-400 to-emerald-400' },
    { label: 'Max Response Time', value: '24h', icon: FiClock, color: 'from-blue-400 to-cyan-400' },
    { label: 'Availability', value: 'Global', icon: FiGlobe, color: 'from-purple-400 to-pink-400' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-black/50 to-blue-900/30" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#80808012_25%,transparent_25%),linear-gradient(-45deg,#80808012_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#80808012_75%),linear-gradient(-45deg,transparent_75%,#80808012_75%)] bg-[size:20px_20px]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Binary Code Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-primary-400/20 binary-fall"
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
      </div>

      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
              <FiMail className="text-primary-300" />
              <span className="text-primary-200 font-medium tracking-wider">GET IN TOUCH</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Let's Build
              <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Have a project in mind? Let's discuss how we can work together to 
              bring your AI and Machine Learning ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Methods Cards */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
                  Contact Methods
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    const isActive = activeMethod === method.id;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveMethod(method.id)}
                        className={`group relative p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-primary-500/50' 
                            : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-primary-500/30'
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-xl opacity-0 ${
                          isActive ? 'opacity-10' : 'group-hover:opacity-5'
                        } transition-opacity duration-300`} />
                        
                        <div className="relative z-10">
                          <div className={`inline-flex p-2 rounded-lg mb-3 ${
                            isActive ? `bg-gradient-to-r ${method.gradient}` : 'bg-gray-800'
                          }`}>
                            <Icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          
                          <h4 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                            {method.title}
                          </h4>
                          
                          <div className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                            {method.value}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Contact Details */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Contact Details</h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-300 text-sm font-semibold rounded-full">
                    {contactMethods.find(m => m.id === activeMethod)?.delay}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {contactMethods
                    .filter(m => m.id === activeMethod)
                    .map(method => {
                      const Icon = method.icon;
                      return (
                        <div key={method.id} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 bg-gradient-to-r ${method.gradient} rounded-xl`}>
                              <Icon className="text-white text-xl" />
                            </div>
                            <div>
                              <div className="text-white font-bold">{method.title}</div>
                              <div className="text-gray-300 text-sm">{method.value}</div>
                            </div>
                          </div>
                          
                          <a
                            href={method.link}
                            target={method.id !== 'email' && method.id !== 'location' ? '_blank' : '_self'}
                            rel={method.id !== 'email' && method.id !== 'location' ? 'noopener noreferrer' : ''}
                            className="block group"
                          >
                            <button className="w-full group relative bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 py-3 rounded-xl font-semibold hover:text-white hover:border-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                              <span>
                                {method.id === 'email' ? 'Send Email' : 
                                 method.id === 'whatsapp' ? 'Open WhatsApp' : 
                                 method.id === 'telegram' ? 'Open Telegram' : 'View Location'}
                              </span>
                              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </a>
                          
                          <div className="text-xs text-gray-500 text-center">
                            {method.description}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-center"
                    >
                      <div className="text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Contact Form & Social */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-xl">
                    <FiMessageSquare className="text-primary-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="text-gray-400 text-sm">Get a response within 24 hours</p>
                  </div>
                </div>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mb-4">
                      <FiCheckCircle className="text-green-400 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thank you for reaching out. I'll review your message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          <FiUser className="inline mr-2 text-primary-400" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          <FiMail className="inline mr-2 text-primary-400" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          <FiPhone className="inline mr-2 text-primary-400" />
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all"
                          placeholder="+216 XX XXX XXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white focus:border-primary-500/50 focus:outline-none transition-all"
                        >
                          <option value="">Select a subject</option>
                          <option value="AI Project">AI/ML Project Consultation</option>
                          <option value="Training">Training Program</option>
                          <option value="Collaboration">Business Collaboration</option>
                          <option value="Freelance">Freelance Work</option>
                          <option value="Other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        <FiMessageSquare className="inline mr-2 text-primary-400" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all resize-none"
                        placeholder="Tell me about your project, timeline, and budget..."
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FiSend />
                            <span>Send Message</span>
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FiClock className="text-primary-400" />
                      <span>Typical response time: 4-6 hours</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                  Quick Actions
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <a
                        key={index}
                        href={action.link}
                        target={action.link.startsWith('http') ? '_blank' : '_self'}
                        rel={action.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-primary-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
                          <div className={`h-1 rounded-t-xl bg-gradient-to-r ${action.gradient} mb-4`}></div>
                          <Icon className={`text-xl mb-3 ${action.gradient.includes('blue') ? 'text-blue-400' : action.gradient.includes('purple') ? 'text-purple-400' : 'text-green-400'}`} />
                          <h4 className="font-bold text-white mb-2">{action.title}</h4>
                          <p className="text-sm text-gray-400 mb-4">{action.description}</p>
                          <button className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-lg font-semibold hover:text-white hover:border-primary-500/30 transition-colors border border-gray-700/50">
                            {action.button}
                          </button>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                  Connect With Me
                </h3>
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-blue-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
              <FiCalendar className="text-primary-300" />
              <span className="text-primary-200 font-medium tracking-wider">READY TO INNOVATE?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Start Your AI Journey
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Whether you're looking to implement AI solutions or enhance your team's skills, 
              I'm here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.open('https://calendly.com/yourprofile', '_blank')}
                className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <FiCalendar />
                <span>Schedule a Call</span>
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <a
                href="/projects"
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 px-8 py-4 rounded-xl font-bold hover:text-white hover:border-primary-500/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>View My Projects</span>
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

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
        
        .binary-fall {
          animation: binary-fall linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;