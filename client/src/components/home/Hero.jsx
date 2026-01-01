import React, { useEffect, useState } from 'react';
import { 
  FiLinkedin, FiFacebook, FiMail, FiPhone, FiMapPin, 
  FiArrowRight, FiDownload, FiAward, FiBriefcase 
} from 'react-icons/fi';
import { FaListUl, FaWhatsapp } from 'react-icons/fa';
import Button from '../common/Button';
import Naceurimage from '../../assets/images/naceeiruhncf.JPG';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [startYear] = useState(2020); // Year you started working
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the years experience counter
  useEffect(() => {
    if (!hasAnimated) {
      const currentYear = new Date().getFullYear();
      const totalYears = currentYear - startYear;
      const duration = 2000; // 2 seconds
      const increment = totalYears / (duration / 16); // 60fps
      let currentValue = 0;
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= totalYears) {
          setYearsExperience(totalYears);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setYearsExperience(Math.floor(currentValue));
        }
      }, 16); // ~60fps
      
      return () => clearInterval(timer);
    }
  }, [startYear, hasAnimated]);

  const stats = [
    { 
      icon: FiAward, 
      label: 'Years Experience', 
      value: `${yearsExperience}+`,
      suffix: '+'
    },
    { icon: FiBriefcase, label: 'Completed Projects', value: '20+' },
  ];

  const socialLinks = [
    { 
      icon: FiLinkedin, 
      url: 'https://www.linkedin.com/in/keraani-naceur-49523a175/', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600'
    },
    { 
      icon: FiFacebook, 
      url: 'https://www.facebook.com/naseur.ker', 
      label: 'Facebook',
      color: 'hover:bg-blue-700'
    },
    { 
      icon: FaWhatsapp, 
      url: 'https://api.whatsapp.com/send?phone=0021695881709&text=Hello, more information!', 
      label: 'WhatsApp',
      color: 'hover:bg-green-500'
    }
  ];

  const infoData = {
    fullName: "Naceur Keraani",
    position: "AI/Machine Learning Developer",
    bio: "Expert in machine learning with a focus on extracting valuable insights from data. I guide you through the entire process of developing machine learning solutions to unlock the full potential of your data and drive business growth.",
    location: "Tunis, Tunisia",
    email: "naceur.keraani@gmail.com",
    phone: "+216 95 88 17 09"
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-primary-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Available for work</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  {infoData.fullName}
                </span>
              </h1>
              <div className="flex items-center space-x-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full" />
                <p className="text-xl md:text-2xl text-gray-600 font-semibold">
                  {infoData.position}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiMapPin className="text-primary-600" />
                <span>{infoData.location}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {infoData.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Icon className="text-xl text-primary-600" />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                to="/contact"
                icon={FiArrowRight}
                iconPosition="right"
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon={FiDownload}
              >
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Follow me:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 text-gray-700 transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-xl ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Content - Image & Contact Card */}
          <div className="relative" style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-blue-400 to-primary-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Image */}
              <div className="relative z-10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-600 rounded-3xl rotate-6 group-hover:rotate-3 transition-transform duration-300" />
                <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={Naceurimage} 
                      alt="Naceur Keraani"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="mt-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-blue-600 rounded-full mr-3" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <a 
                  href="mailto:Keraani.naceur@gmail.com"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-600 transition-colors">
                    <FiMail className="text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    {infoData.email}
                  </span>
                </a>
                <a 
                  href="tel:+21695881709"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-600 transition-colors">
                    <FiPhone className="text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    {infoData.phone}
                  </span>
                </a>
                <div className="flex items-center space-x-3 p-3 rounded-xl">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <FiMapPin className="text-primary-600" />
                  </div>
                  <span className="text-gray-700">
                    {infoData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-primary-600 rounded-full animate-scroll" />
          </div>
          <span className="text-xs text-gray-600 font-medium">Scroll Down</span>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;