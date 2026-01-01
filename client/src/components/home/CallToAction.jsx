import React, { useState, useEffect } from 'react';
import { 
  FiMail, FiPhone, FiMapPin, FiArrowRight,
  FiZap, FiMessageSquare, FiCalendar, FiSend,
  FiChevronRight, FiCheckCircle, FiClock
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContact, setActiveContact] = useState('email');

  const contactMethods = [
    {
      id: 'email',
      icon: FiMail,
      title: 'Email',
      value: 'naceur.keraani@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '24h',
      description: 'Detailed discussions'
    },
    {
      id: 'whatsapp',
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+216 95 88 17 09',
      gradient: 'from-green-500 to-emerald-500',
      delay: 'Instant',
      description: 'Quick conversations'
    },
    {
      id: 'telegram',
      icon: FaTelegramPlane,
      title: 'Telegram',
      value: '@naceur_keraani',
      gradient: 'from-sky-500 to-blue-500',
      delay: 'Instant',
      description: 'File sharing available'
    },
    {
      id: 'location',
      icon: FiMapPin,
      title: 'Location',
      value: 'Tunis, Tunisia',
      gradient: 'from-purple-500 to-pink-500',
      delay: 'Remote',
      description: 'Available worldwide'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      
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
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
              <FiZap className="text-primary-300 animate-pulse" />
              <span className="text-primary-200 font-medium tracking-wider">CONNECT & COLLABORATE</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Let's Build the</span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Future Together
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every great innovation begins with a conversation. Let's combine your vision with my expertise 
              to create intelligent solutions that push boundaries and deliver real impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Contact Form */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-30" />
              
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-xl">
                    <FiMessageSquare className="text-primary-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                    <p className="text-gray-400 text-sm">Get a response within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mb-4">
                      <FiCheckCircle className="text-green-400 text-4xl" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-gray-400">I'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FiMail className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                      <div className="relative">
                        <div className="absolute left-4 top-4">
                          <FiSend className="text-gray-500" />
                        </div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell me about your project..."
                          rows="5"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <span>Send Message</span>
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FiClock className="text-primary-400" />
                      <span>Typical response time: 4-6 hours</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Contact Methods */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  const isActive = activeContact === method.id;
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => setActiveContact(method.id)}
                      className={`group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-primary-500/50' 
                          : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-primary-500/30'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 ${
                        isActive ? 'opacity-10' : 'group-hover:opacity-5'
                      } transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-xl mb-4 ${
                          isActive ? `bg-gradient-to-r ${method.gradient}` : 'bg-gray-800'
                        }`}>
                          <Icon className={`text-xl ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        
                        <h4 className={`font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {method.title}
                        </h4>
                        
                        <div className={`text-sm mb-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                          {method.value}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{method.description}</span>
                          <div className="flex items-center gap-1">
                            <FiClock className="text-primary-400 text-xs" />
                            <span className="text-primary-300">{method.delay}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Contact Details */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">Get in Touch</h4>
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-300 text-sm font-semibold rounded-full">
                    {activeContact === 'email' ? 'Professional' : activeContact === 'whatsapp' ? 'Quick' : activeContact === 'telegram' ? 'Flexible' : 'Global'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {contactMethods
                    .filter(m => m.id === activeContact)
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
                            href={
                              method.id === 'email' ? `mailto:${method.value}` :
                              method.id === 'whatsapp' ? `https://api.whatsapp.com/send?phone=${method.value.replace(/\D/g, '')}&text=Hello, I'd like to discuss a project` :
                              method.id === 'telegram' ? `https://t.me/${method.value.replace('@', '')}` :
                              '#'
                            }
                            target={method.id !== 'email' && method.id !== 'location' ? '_blank' : '_self'}
                            rel={method.id !== 'email' && method.id !== 'location' ? 'noopener noreferrer' : ''}
                            className="block group"
                          >
                            <button className="w-full group relative bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 py-3 rounded-xl font-semibold hover:text-white hover:border-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                              <span>{method.id === 'email' ? 'Send Email' : method.id === 'whatsapp' ? 'Open WhatsApp' : method.id === 'telegram' ? 'Open Telegram' : 'View Location'}</span>
                              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </a>
                          
                          <div className="text-xs text-gray-500 text-center">
                            {method.id === 'email' && 'Perfect for detailed project briefs'}
                            {method.id === 'whatsapp' && 'Ideal for quick questions and updates'}
                            {method.id === 'telegram' && 'Great for sharing files and code snippets'}
                            {method.id === 'location' && 'Available for remote collaboration worldwide'}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                    100%
                  </div>
                  <div className="text-xs text-gray-500">Response Rate</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    24h
                  </div>
                  <div className="text-xs text-gray-500">Max Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">Schedule a Discovery Call</h4>
                  <p className="text-gray-400">Let's discuss your project requirements and explore possibilities.</p>
                </div>
                <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <FiCalendar />
                  <span>Book a Meeting</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
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
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;