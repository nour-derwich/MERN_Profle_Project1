import React, { useEffect, useState, useRef } from 'react';
import { 
  FiLinkedin, FiFacebook, FiMail, FiPhone, FiMapPin, 
  FiArrowRight, FiDownload, FiAward, FiBriefcase,
  FiGithub, FiTwitter, FiZap, FiChevronRight
} from 'react-icons/fi';
import { FaWhatsapp, FaPython, FaReact } from 'react-icons/fa';
import { SiPytorch, SiTensorflow } from 'react-icons/si';
import Button from '../common/Button';
import Naceurimage from '../../assets/images/naceeiruhncf.JPG';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [startYear] = useState(2020);
  const [totalProjects] = useState(20);
  const [activeTech, setActiveTech] = useState(0);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;
    const duration = 2000;
    
    // Years counter
    let yearsCounter = 0;
    const yearsInterval = setInterval(() => {
      yearsCounter += totalYears / (duration / 16);
      if (yearsCounter >= totalYears) {
        setYearsExperience(totalYears);
        clearInterval(yearsInterval);
      } else {
        setYearsExperience(Math.floor(yearsCounter));
      }
    }, 16);

    // Projects counter
    let projectsCounter = 0;
    const projectsInterval = setInterval(() => {
      projectsCounter += totalProjects / (duration / 16);
      if (projectsCounter >= totalProjects) {
        setProjectsCount(totalProjects);
        clearInterval(projectsInterval);
      } else {
        setProjectsCount(Math.floor(projectsCounter));
      }
    }, 16);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(projectsInterval);
    };
  }, [startYear, totalProjects]);

  // Tech stack rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { icon: FaPython, label: 'Python', color: 'from-blue-500 to-cyan-500' },
    { icon: SiPytorch, label: 'PyTorch', color: 'from-red-500 to-orange-500' },
    { icon: SiTensorflow, label: 'TensorFlow', color: 'from-orange-500 to-yellow-500' },
    { icon: FaReact, label: 'React', color: 'from-cyan-500 to-blue-500' }
  ];

  const stats = [
    { 
      icon: FiAward, 
      label: 'Years Experience', 
      value: yearsExperience,
      suffix: '+',
      description: 'Building AI solutions'
    },
    { 
      icon: FiBriefcase, 
      label: 'Projects Delivered', 
      value: projectsCount,
      suffix: '+',
      description: 'Successful implementations'
    },
    { 
      icon: FiZap, 
      label: 'IBM Certifications', 
      value: '07',
      suffix: '+',
      description: 'Professional credentials'
    },
  ];

  const socialLinks = [
    { 
      icon: FiLinkedin, 
      url: 'https://www.linkedin.com/in/keraani-naceur-49523a175/', 
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
      url: 'https://api.whatsapp.com/send?phone=0021695881709&text=Hello, more information!', 
      label: 'WhatsApp',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const infoData = {
    fullName: "Naceur Keraani",
    position: "AI & Machine Learning Developer",
    bio: "Transforming complex data into intelligent systems. I specialize in building scalable AI solutions that drive business growth through innovative machine learning algorithms and data-driven insights.",
    location: "Tunis, Tunisia",
    email: "naceur.keraani@gmail.com",
    phone: "+216 95 88 17 09"
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-blue-900/20" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Binary Code Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 animate-binary-scroll">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-xs font-mono text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content - Creative Layout */}
          <div className="relative">
            {/* Floating Tech Badges */}
            <div className="absolute -top-6 -left-6 z-20">
              <div className="relative w-32 h-32">
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  const isActive = index === activeTech;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                    >
                      <div className={`p-4 bg-gradient-to-br ${tech.color} rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500`}>
                        <Icon className="text-3xl text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-green-500/30 mb-8 ml-20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-300">Available for projects</span>
              <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full ml-2" />
            </div>

            {/* Name & Title with Glitch Effect */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
                <span className="block text-white">NACEUR</span>
                <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  KERAANI
                </span>
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
                    {infoData.position}
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                </div>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                <FiMapPin className="text-primary-400" />
                <span className="text-gray-300">{infoData.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-10 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
              <p className="text-lg text-gray-400 leading-relaxed pl-6">
                {infoData.bio}
              </p>
            </div>

            {/* Stats Cards - Creative Layout */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-4 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 ${
                          stat.icon === FiAward ? 'bg-yellow-500/20' : 
                          stat.icon === FiBriefcase ? 'bg-green-500/20' : 
                          'bg-blue-500/20'
                        } rounded-lg`}>
                          <Icon className={`${
                            stat.icon === FiAward ? 'text-yellow-400' : 
                            stat.icon === FiBriefcase ? 'text-green-400' : 
                            'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {stat.value}{stat.suffix}
                          </div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{stat.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden">
                <span>Start a Project</span>
                <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group relative bg-transparent border-2 border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-bold hover:border-primary-500 hover:text-white transition-all duration-300 flex items-center gap-3">
                <FiDownload />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-medium">Connect</span>
              <div className="h-0.5 w-8 bg-gradient-to-r from-gray-700 to-transparent" />
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:scale-110 transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      <Icon className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Image & Tech Stack */}
          <div className="relative">
            {/* Tech Stack Rotation Display */}
            <div className="absolute -top-10 right-10 z-20">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-white font-bold mb-4 text-center">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => {
                    const Icon = tech.icon;
                    const isActive = index === activeTech;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-gray-700 to-gray-800 border border-primary-500/30' 
                            : 'bg-gray-800/50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? tech.color.replace('from-', 'bg-gradient-to-br ') : 'bg-gray-700'}`}>
                          <Icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {tech.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Image with Futuristic Frame */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              
              {/* Image Container */}
              <div className="relative z-10 group">
                {/* Animated Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-blue-500 to-cyan-500 rounded-3xl opacity-70 group-hover:opacity-100 animate-border-rotate" />
                
                {/* Image */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1.5">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={Naceurimage} 
                      alt="Naceur Keraani"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Scan Lines Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary-400 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary-400 rounded-br-lg" />
                </div>
              </div>

              {/* Floating Elements Around Image */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl" />
            </div>

            {/* Contact Info - Modern Card */}
            <div className="mt-10 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-50" />
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
                  <span>Get In Touch</span>
                </h3>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${infoData.email}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-primary-500/10 hover:to-blue-500/10 transition-all duration-300 border border-gray-700/50 hover:border-primary-500/30"
                  >
                    <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <FiMail className="text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Email</div>
                      <div className="text-white font-medium group-hover:text-primary-300 transition-colors">
                        {infoData.email}
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </a>
                  
                  <a 
                    href={`tel:${infoData.phone.replace(/\s/g, '')}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 border border-gray-700/50 hover:border-green-500/30"
                  >
                    <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <FiPhone className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Phone</div>
                      <div className="text-white font-medium group-hover:text-green-300 transition-colors">
                        {infoData.phone}
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <div className="text-sm text-gray-500 font-medium tracking-wider">EXPLORE MORE</div>
          <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-blue-400 rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 30px) scale(1.1);
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
        
        @keyframes border-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes binary-scroll {
          0% {
            transform: translateY(-100%);
          }
          100% {
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-border-rotate {
          animation: border-rotate 3s linear infinite;
        }
        
        .animate-binary-scroll {
          animation: binary-scroll 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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

export default Hero;