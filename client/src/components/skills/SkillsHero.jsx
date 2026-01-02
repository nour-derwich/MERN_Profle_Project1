import React, { useEffect, useState } from 'react';
import { FiCode, FiZap, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiPytorch, SiTensorflow } from 'react-icons/si';

const SkillsHero = ({ isVisible }) => {
  const [activeTech, setActiveTech] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const techIcons = [
    { icon: FaPython, label: 'Python', color: 'from-blue-500 to-cyan-500' },
    { icon: SiPytorch, label: 'PyTorch', color: 'from-red-500 to-orange-500' },
    { icon: SiTensorflow, label: 'TensorFlow', color: 'from-orange-500 to-yellow-500' },
    { icon: FaReact, label: 'React', color: 'from-cyan-500 to-blue-500' }
  ];

  const stats = [
    { value: '95%', label: 'ML Accuracy', icon: FiTrendingUp },
    { value: '4.9', label: 'Expert Rating', icon: FiZap },
    { value: '15+', label: 'Technologies', icon: FiCpu },
    { value: '100%', label: 'Project Success', icon: FiCode }
  ];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-black/50 to-blue-900/30" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#80808012_25%,transparent_25%),linear-gradient(-45deg,#80808012_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#80808012_75%),linear-gradient(-45deg,transparent_75%,#80808012_75%)] bg-[size:40px_40px]" />
        
        {/* Floating Tech Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Code Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs text-primary-400/30 animate-code-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            {`def train_model():`}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="pt-32 pb-20">
          
          {/* Tech Icons Carousel */}
          <div className="relative mb-12">
            <div className="flex justify-center items-center gap-8">
              {techIcons.map((tech, index) => {
                const Icon = tech.icon;
                const isActive = index === activeTech;
                
                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-1000 ${
                      isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'
                    }`}
                    style={{
                      transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${tech.color} rounded-full blur-xl opacity-0 ${
                      isActive ? 'opacity-30' : ''
                    } transition-opacity duration-1000`} />
                    
                    {/* Icon Container */}
                    <div className={`relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 border ${
                      isActive ? 'border-primary-500/50' : 'border-gray-700/50'
                    } rounded-2xl backdrop-blur-sm transform ${
                      isActive ? 'rotate-0' : 'rotate-12'
                    } transition-all duration-700`}>
                      <Icon className="text-5xl text-white" />
                    </div>
                    
                    {/* Label */}
                    <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap transition-all duration-700 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <span className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                        {tech.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-8 group hover:border-primary-500/50 transition-all duration-300">
              <div className="relative">
                <FiCode className="text-primary-300 animate-pulse" />
                <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-primary-200 font-medium tracking-wider">
                TECHNICAL MASTERY
              </span>
              <div className="w-4 h-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">Where Code Meets</span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
              <p className="text-2xl text-gray-300 font-semibold">
                AI & Machine Learning Expertise
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              A comprehensive showcase of cutting-edge skills in artificial intelligence, 
              machine learning, and full-stack development. Transforming complex problems 
              into intelligent solutions through technical excellence.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`group relative transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    {/* Card Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group-hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                          <Icon className="text-primary-400" />
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce-slow">
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-gray-500 font-medium tracking-wider">EXPLORE SKILLS</div>
                <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
                  <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-blue-400 rounded-full animate-scroll" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        
        @keyframes code-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(20px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
            opacity: 0.4;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-code-float {
          animation: code-float 15s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsHero;