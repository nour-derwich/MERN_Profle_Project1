import React, { useState, useEffect } from 'react';
import { 
  FiTool, FiPackage, FiCpu, FiDatabase, 
  FiServer, FiLayers, FiBarChart2, FiGrid,
  FiZap, FiMonitor, FiCode, FiSettings
} from 'react-icons/fi';
import { 
  SiPytorch, SiTensorflow, SiScikitlearn, SiPandas,
  SiNumpy, SiJupyter, SiAnaconda, SiDocker,
  SiKubernetes, SiGit, SiVisualstudiocode, SiPostman
} from 'react-icons/si';
import { FaGitAlt, FaDocker, FaChartLine } from 'react-icons/fa';

const ToolsLibraries = ({ isVisible }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTool, setHoveredTool] = useState(null);

  const toolsLibraries = [
    // ML/DL Frameworks
    {
      id: 1,
      name: 'PyTorch',
      level: 92,
      category: 'ml-frameworks',
      icon: SiPytorch,
      color: 'from-red-500 to-orange-500',
      description: 'Deep Learning Framework',
      complexity: 'Advanced',
      experience: '3+ years',
      projects: 18
    },
    {
      id: 2,
      name: 'TensorFlow',
      level: 85,
      category: 'ml-frameworks',
      icon: SiTensorflow,
      color: 'from-orange-500 to-yellow-500',
      description: 'ML Framework',
      complexity: 'Advanced',
      experience: '2+ years',
      projects: 12
    },
    {
      id: 3,
      name: 'Scikit-learn',
      level: 95,
      category: 'ml-frameworks',
      icon: SiScikitlearn,
      color: 'from-blue-500 to-teal-500',
      description: 'ML Library',
      complexity: 'Expert',
      experience: '4+ years',
      projects: 25
    },

    // Data Science
    {
      id: 4,
      name: 'Pandas',
      level: 90,
      category: 'data-science',
      icon: SiPandas,
      color: 'from-purple-500 to-pink-500',
      description: 'Data Analysis',
      complexity: 'Expert',
      experience: '4+ years',
      projects: 30
    },
    {
      id: 5,
      name: 'NumPy',
      level: 90,
      category: 'data-science',
      icon: SiNumpy,
      color: 'from-green-500 to-emerald-500',
      description: 'Numerical Computing',
      complexity: 'Expert',
      experience: '4+ years',
      projects: 28
    },
    {
      id: 6,
      name: 'Matplotlib',
      level: 85,
      category: 'data-science',
      icon: FaChartLine,
      color: 'from-blue-600 to-indigo-600',
      description: 'Data Visualization',
      complexity: 'Advanced',
      experience: '3+ years',
      projects: 20
    },

    // Development Tools
    {
      id: 7,
      name: 'Jupyter',
      level: 88,
      category: 'dev-tools',
      icon: SiJupyter,
      color: 'from-orange-600 to-red-600',
      description: 'Notebook Environment',
      complexity: 'Advanced',
      experience: '3+ years',
      projects: 22
    },
    {
      id: 8,
      name: 'Docker',
      level: 82,
      category: 'dev-tools',
      icon: SiDocker,
      color: 'from-blue-400 to-cyan-400',
      description: 'Containerization',
      complexity: 'Intermediate',
      experience: '2+ years',
      projects: 15
    },
    {
      id: 9,
      name: 'Git',
      level: 88,
      category: 'dev-tools',
      icon: SiGit,
      color: 'from-orange-500 to-red-500',
      description: 'Version Control',
      complexity: 'Expert',
      experience: '4+ years',
      projects: 35
    },
    {
      id: 10,
      name: 'VS Code',
      level: 92,
      category: 'dev-tools',
      icon: SiVisualstudiocode,
      color: 'from-blue-500 to-purple-500',
      description: 'Code Editor',
      complexity: 'Expert',
      experience: '4+ years',
      projects: 40
    },

    // Other Tools
    {
      id: 11,
      name: 'Anaconda',
      level: 87,
      category: 'other',
      icon: SiAnaconda,
      color: 'from-green-600 to-teal-600',
      description: 'Python Distribution',
      complexity: 'Advanced',
      experience: '3+ years',
      projects: 20
    },
    {
      id: 12,
      name: 'Postman',
      level: 85,
      category: 'other',
      icon: SiPostman,
      color: 'from-orange-500 to-red-500',
      description: 'API Testing',
      complexity: 'Advanced',
      experience: '2+ years',
      projects: 18
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tools', count: 12, icon: FiGrid },
    { id: 'ml-frameworks', label: 'ML Frameworks', count: 3, icon: FiCpu },
    { id: 'data-science', label: 'Data Science', count: 3, icon: FiBarChart2 },
    { id: 'dev-tools', label: 'Dev Tools', count: 4, icon: FiTool },
    { id: 'other', label: 'Other', count: 2, icon: FiSettings }
  ];

  const filteredTools = activeCategory === 'all' 
    ? toolsLibraries 
    : toolsLibraries.filter(tool => tool.category === activeCategory);

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#80808012_1px,transparent_1px),linear-gradient(180deg,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Tools */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Tool Icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 12 }).map((_, i) => {
          const icons = [FiTool, FiPackage, FiCpu, FiDatabase, FiServer, FiLayers];
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className="absolute animate-tool-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              <Icon className="text-primary-400/30 text-2xl" />
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiTool className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">TECHNICAL TOOLKIT</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Development</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tools & Frameworks
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mastering a comprehensive suite of tools and libraries that power modern 
            AI development, from data analysis to deployment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-5 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                }`}
              >
                <Icon className={activeCategory === category.id ? 'text-white' : 'text-gray-500'} />
                <span className="font-semibold">{category.label}</span>
                <span className={`ml-1 text-sm ${
                  activeCategory === category.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  ({category.count})
                </span>
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${
                  activeCategory === category.id ? 'opacity-20' : 'group-hover:opacity-10'
                } transition-opacity duration-500`} />
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            const isHovered = hoveredTool === tool.id;
            
            return (
              <div
                key={tool.id}
                className="relative group"
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${tool.color} rounded-3xl blur opacity-0 ${
                  isHovered ? 'opacity-30' : 'group-hover:opacity-20'
                } transition-opacity duration-500`} />
                
                {/* Main Card */}
                <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${
                  isHovered ? 'border-primary-500/50' : 'border-gray-700/50'
                } rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isHovered ? 'scale-105' : 'group-hover:scale-102'}`}
                style={{ transitionDelay: `${index * 50}ms` }}>
                  
                  {/* Icon & Level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${tool.color}/20 rounded-xl transform ${
                      isHovered ? 'rotate-12 scale-110' : 'group-hover:scale-110'
                    } transition-all duration-300`}>
                      <Icon className="text-2xl text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {tool.level}%
                      </div>
                      <div className="text-xs text-gray-500">{tool.complexity}</div>
                    </div>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {tool.description}
                  </p>

                  {/* Radial Progress */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-20 h-20 transform -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#374151"
                        strokeWidth="4"
                        fill="none"
                      />
                      
                      {/* Progress Circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke={`url(#gradient-${tool.id})`}
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - tool.level / 100)}`}
                        className="transition-all duration-1000 ease-out"
                        style={{ 
                          strokeDashoffset: isVisible ? `${2 * Math.PI * 36 * (1 - tool.level / 100)}` : `${2 * Math.PI * 36}`,
                          transitionDelay: `${200 + index * 50}ms`
                        }}
                        strokeLinecap="round"
                      />
                      
                      <defs>
                        <linearGradient
                          id={`gradient-${tool.id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            className={
                              tool.color?.split(' ').find(c => c.startsWith('from-'))?.replace('from-', '') 
                              || 'gray-400'
                            }
                          />
                          <stop
                            offset="100%"
                            className={
                              tool.color?.split(' ').find(c => c.startsWith('to-'))?.replace('to-', '') 
                              || 'gray-600'
                            }
                          />
                        </linearGradient>
                      </defs>

                    </svg>
                    
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-sm font-bold text-white">{tool.level}%</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700/50 pt-3">
                    <div className="flex items-center gap-1">
                      <FiZap className="text-primary-400" />
                      <span>{tool.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiLayers className="text-blue-400" />
                      <span>{tool.projects} projects</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r ${tool.color} rounded-full transform ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                } transition-transform duration-300`} />
              </div>
            );
          })}
        </div>

        {/* Category Stats */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 text-center">Tool Proficiency Distribution</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(c => c.id !== 'all').map((category) => {
              const categoryTools = toolsLibraries.filter(t => t.category === category.id);
              const avgLevel = categoryTools.reduce((sum, tool) => sum + tool.level, 0) / categoryTools.length;
              
              return (
                <div key={category.id} className="text-center p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1">
                    {Math.round(avgLevel)}%
                  </div>
                  <div className="text-sm text-gray-400">{category.label}</div>
                  <div className="text-xs text-gray-500">{categoryTools.length} tools</div>
                </div>
              );
            })}
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
        
        @keyframes tool-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(20px) rotate(180deg);
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-tool-float {
          animation: tool-float 15s linear infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ToolsLibraries;