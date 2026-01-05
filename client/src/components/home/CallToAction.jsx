import React, { useState, useEffect } from 'react';
import {
  FiMail, FiPhone, FiMapPin, FiArrowRight,
  FiZap, FiMessageSquare, FiCalendar, FiSend,
  FiChevronRight, FiCheckCircle, FiClock,
  FiUser, FiAlertCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import messageService from '../../services/messageService';
import toast from 'react-hot-toast';

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeContact, setActiveContact] = useState('email');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const contactMethods = [
    {
      id: 'email',
      icon: FiMail,
      title: 'Email',
      value: 'naceur.keraani@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '24h',
      description: 'Detailed discussions',
      actionLabel: 'Send Email',
      url: 'mailto:naceur.keraani@gmail.com'
    },
    {
      id: 'whatsapp',
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+216 95 88 17 09',
      gradient: 'from-green-500 to-emerald-500',
      delay: 'Instant',
      description: 'Quick conversations',
      actionLabel: 'Open WhatsApp',
      url: 'https://api.whatsapp.com/send?phone=21695881709&text=Hello, I\'d like to discuss a project'
    },
    {
      id: 'telegram',
      icon: FaTelegramPlane,
      title: 'Telegram',
      value: '@naceur_keraani',
      gradient: 'from-sky-500 to-blue-500',
      delay: 'Instant',
      description: 'File sharing available',
      actionLabel: 'Open Telegram',
      url: 'https://t.me/naceur_keraani'
    },
    {
      id: 'location',
      icon: FiMapPin,
      title: 'Location',
      value: 'Tunis, Tunisia',
      gradient: 'from-purple-500 to-pink-500',
      delay: 'Remote',
      description: 'Available worldwide',
      actionLabel: 'View on Map',
      url: 'https://maps.google.com/?q=Tunis,Tunisia'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const messageData = {
        full_name: formData.name,
        email: formData.email,
        subject: 'New Contact Form Message',
        message: formData.message,
        message_type: 'contact',
        phone: formData.phone || undefined
      };

      const result = await messageService.send(messageData);

      if (result.success) {
        setIsSubmitted(true);
        toast.success('Message sent successfully! I\'ll get back to you soon.');

        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          phone: ''
        });
        setErrors({});

        // Auto reset after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openContactMethod = (method) => {
    if (method.url) {
      window.open(method.url, method.id === 'email' ? '_self' : '_blank');
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-black/50 to-blue-900/30" />

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#80808012_25%,transparent_25%),linear-gradient(-45deg,#80808012_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#80808012_75%),linear-gradient(-45deg,transparent_75%,#80808012_75%)] bg-[size:20px_20px]" />

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
                    <p className="text-gray-400">I'll get back to you shortly. Check your email for confirmation.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-6 py-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-2 text-red-400">
                          <FiAlertCircle />
                          <span className="text-sm">{submitError}</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FiUser className={`${errors.name ? 'text-red-400' : 'text-gray-500'}`} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border ${errors.name ? 'border-red-500/50' : 'border-gray-700/50'
                            } rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Email *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FiMail className={`${errors.email ? 'text-red-400' : 'text-gray-500'}`} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border ${errors.email ? 'border-red-500/50' : 'border-gray-700/50'
                            } rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone Number (Optional)</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FiPhone className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+216 12 345 678"
                          className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Message *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-4">
                          <FiSend className={`${errors.message ? 'text-red-400' : 'text-gray-500'}`} />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project or question..."
                          rows="5"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border ${errors.message ? 'border-red-500/50' : 'border-gray-700/50'
                            } rounded-xl text-white placeholder-gray-500 focus:border-primary-500/50 focus:outline-none transition-all duration-300 resize-none`}
                        />
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                      <div className="mt-1 text-xs text-gray-500">
                        {formData.message.length}/1000 characters
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FiClock className="text-primary-400" />
                      <span>Typical response time: 4-6 hours</span>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our privacy policy. You'll receive a confirmation email.
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Contact Methods */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const isActive = activeContact === method.id;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setActiveContact(method.id)}
                      className={`group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-primary-500/50'
                          : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-primary-500/30'
                        }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'
                        } transition-opacity duration-300`} />

                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-xl mb-4 ${isActive ? `bg-gradient-to-r ${method.gradient}` : 'bg-gray-800'
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

                          <button
                            onClick={() => openContactMethod(method)}
                            className="w-full group relative bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 py-3 rounded-xl font-semibold hover:text-white hover:border-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <span>{method.actionLabel}</span>
                            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                          </button>

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
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center group hover:border-primary-500/30 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-300">Response Rate</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center group hover:border-primary-500/30 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    24h
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-300">Max Response Time</div>
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
                <button
                  onClick={() => window.open('https://calendly.com/naceurkeraani/30min', '_blank')}
                  className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <FiCalendar />
                  <span>Book a Meeting</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
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
      `}</style>
    </section>
  );
};

export default CallToAction;