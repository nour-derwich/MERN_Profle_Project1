import React, { useState, useEffect } from 'react';
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiTrendingUp,
  FiChevronRight,
  FiGlobe,
  FiLayers,
  FiStar,
  FiGitBranch,
  FiCloud,
  FiBarChart2,
  FiTarget,
  FiZap,
  FiAward
} from 'react-icons/fi';
import { FaPython, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectsHero = ({ isVisible = true }) => {
  const [activeTech, setActiveTech] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    {
      name: 'Python',
      icon: FaPython,
      color: 'from-blue-500 to-cyan-600',
      description: 'Data Science & ML'
    },
    {
      name: 'TensorFlow',
      icon: FiCpu,
      color: 'from-orange-500 to-yellow-600',
      description: 'Deep Learning'
    },
    {
      name: 'PyTorch',
      icon: FiTrendingUp,
      color: 'from-red-500 to-orange-600',
      description: 'Research & Models'
    },
    {
      name: 'React',
      icon: FaReact,
      color: 'from-cyan-500 to-blue-600',
      description: 'Web Applications'
    },
    {
      name: 'Node.js',
      icon: FaNodeJs,
      color: 'from-green-500 to-emerald-600',
      description: 'Backend Services'
    },
    {
      name: 'Docker',
      icon: FaDocker,
      color: 'from-blue-600 to-indigo-600',
      description: 'Containerization'
    }
  ];

  const projectStats = [
    { value: '50+', label: 'Projects Built', icon: FiCode, color: 'from-primary-500 to-blue-500' },
    { value: '95%', label: 'Success Rate', icon: FiTarget, color: 'from-green-500 to-emerald-500' },
    { value: '10K+', label: 'Lines of Code', icon: FiGitBranch, color: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Uptime', icon: FiCloud, color: 'from-yellow-500 to-orange-500' }
  ];

  const projectCategories = [
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'NLP',
    'Web Apps',
    'APIs',
    'Dashboards',
    'Automation'
  ];

  const TechCard = ({ tech, index, isActive }) => {
    const Icon = tech.icon;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative cursor-pointer transition-all duration-500 ${isActive ? 'scale-110' : 'scale-90 opacity-60'
          }`}
        onClick={() => setActiveTech(index)}
        onMouseEnter={() => setIsHovered(index)}
        onMouseLeave={() => setIsHovered(null)}
      >
        {/* Card Glow */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${tech.color} rounded-2xl blur-xl opacity-0 ${isActive || isHovered === index ? 'opacity-30' : ''
          } transition-opacity duration-500`} />

        {/* Card */}
        <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${isActive ? 'border-primary-500/50' : 'border-gray-700/50'
          } rounded-xl p-6 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300`}>

          {/* Icon */}
          <div className={`relative p-4 bg-gradient-to-br ${tech.color}/20 rounded-xl w-fit mb-4 mx-auto`}>
            <Icon className="text-3xl text-white" />
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
            <p className="text-xs text-gray-400">{tech.description}</p>
          </div>

          {/* Active Indicator */}
          <div className={`absolute -right-2 -top-2 w-4 h-4 bg-gradient-to-r ${tech.color} rounded-full border-2 border-gray-900 opacity-0 ${isActive ? 'opacity-100' : ''
            } transition-opacity duration-300`} />
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        {/* Code Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#ffffff12_1px,transparent_1px),linear-gradient(180deg,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Code Blocks */}
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-gradient-to-br from-primary-500/5 to-transparent rounded-lg blur-3xl rotate-45 animate-float-slow" />
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-lg blur-3xl -rotate-12 animate-float-slow" style={{ animationDelay: '1s' }} />

        {/* Code Lines Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute font-mono text-xs text-primary-400/20 animate-code-flow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              {`const project = new Project();`}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="pt-32 pb-20">

          {/* Tech Stack Carousel */}
          <div className="relative mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {techStack.map((tech, index) => (
                <TechCard
                  key={index}
                  tech={tech}
                  index={index}
                  isActive={index === activeTech}
                />
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {techStack.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTech(index)}
                  className={`relative transition-all duration-300 ${activeTech === index ? 'scale-125' : ''
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeTech === index
                      ? 'bg-gradient-to-r from-primary-400 to-blue-400'
                      : 'bg-gray-700 hover:bg-gray-600'
                    }`} />
                  {activeTech === index && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-blue-400/20 rounded-full animate-ping" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-8 group hover:border-primary-500/50 transition-all duration-300">
              <div className="relative">
                <FiCode className="text-primary-300" />
                <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-primary-200 font-medium tracking-wider">
                PROJECT PORTFOLIO
              </span>
              <FiChevronRight className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">Code. Build.</span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Innovate.
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
              <p className="text-2xl text-gray-300 font-semibold">
                Real-World AI & ML Projects
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Explore my collection of production-ready projects that solve real problems.
              From machine learning models to full-stack applications, each project demonstrates
              technical expertise and practical problem-solving.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {projectStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 * index }}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group-hover:scale-105">
                      <div className="flex flex-col items-center gap-3">
                        <div className={`p-3 bg-gradient-to-br ${stat.color}/20 rounded-xl`}>
                          <Icon className="text-xl text-white" />
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Project Categories */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {projectCategories.map((category, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + (index * 0.05) }}
                    className="px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-full text-sm font-medium transition-all duration-300 hover:border-primary-500/30 hover:text-white hover:scale-105 flex items-center gap-2 group"
                  >
                    <FiZap className="text-primary-400 text-xs group-hover:rotate-12 transition-transform" />
                    {category}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <FiGlobe />
                  <span>Explore Projects</span>
                  <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </button>

                <button className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 px-8 py-4 rounded-xl font-bold hover:text-white hover:border-primary-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <FiLayers />
                  <span>View GitHub</span>
                  <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 animate-bounce-slow"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-gray-500 font-medium tracking-wider">EXPLORE PROJECTS</div>
                <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
                  <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-blue-400 rounded-full animate-scroll" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
        
        @keyframes code-flow {
          0% {
            transform: translateX(-100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateX(100vw) rotate(360deg);
            opacity: 0;
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
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-code-flow {
          animation: code-flow linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectsHero;