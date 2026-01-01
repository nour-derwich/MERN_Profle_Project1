import React, { useState, useRef, useEffect } from 'react';
import { 
  FiCode, FiArrowRight, FiTrendingUp, FiCpu, FiDatabase,
  FiGitBranch, FiShield, FiBarChart2, FiExternalLink,
  FiPlay, FiStar, FiUsers, FiClock
} from 'react-icons/fi';
import { FaPython, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiPytorch, SiTensorflow, SiMongodb, SiPostgresql } from 'react-icons/si';

const RecentProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detailed'
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Quantitative Trading AI',
      description: 'Proprietary machine learning algorithm for intraday trading with dynamic risk management and optimization models.',
      category: 'AI Finance',
      technologies: [
        { name: 'Python', icon: FaPython, color: 'from-blue-500 to-cyan-500' },
        { name: 'PyTorch', icon: SiPytorch, color: 'from-red-500 to-orange-500' },
        { name: 'Pandas', icon: FiBarChart2, color: 'from-green-500 to-emerald-500' },
        { name: 'NumPy', icon: FiCpu, color: 'from-indigo-500 to-purple-500' }
      ],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      icon: FiTrendingUp,
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      complexity: 'Advanced',
      status: 'Completed',
      duration: '6 months',
      teamSize: 'Solo',
      github: '#',
      liveDemo: '#',
      features: [
        'Real-time market analysis',
        'Risk optimization models',
        'Backtesting framework',
        'Automated execution'
      ],
      results: {
        roi: '+28.5%',
        accuracy: '94.2%',
        riskScore: 'Low',
        performance: 'A+'
      }
    },
    {
      id: 2,
      title: 'Deep Learning Framework',
      description: 'Custom neural network architecture for computer vision tasks with transfer learning capabilities.',
      category: 'Deep Learning',
      technologies: [
        { name: 'PyTorch', icon: SiPytorch, color: 'from-red-500 to-orange-500' },
        { name: 'TensorFlow', icon: SiTensorflow, color: 'from-orange-500 to-yellow-500' },
        { name: 'OpenCV', icon: FiCpu, color: 'from-blue-500 to-cyan-500' },
        { name: 'Scikit-learn', icon: FiDatabase, color: 'from-green-500 to-teal-500' }
      ],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      icon: FiCpu,
      gradient: 'from-primary-600 via-blue-600 to-cyan-600',
      complexity: 'Expert',
      status: 'Ongoing',
      duration: '8 months',
      teamSize: '3 members',
      github: '#',
      liveDemo: '#',
      features: [
        'Transfer learning pipeline',
        'Model optimization',
        'GPU acceleration',
        'Deployment ready'
      ],
      results: {
        accuracy: '98.7%',
        speed: '120 FPS',
        models: '15+',
        scalability: 'High'
      }
    },
    {
      id: 3,
      title: 'Enterprise Analytics Suite',
      description: 'Comprehensive data analysis platform with predictive modeling and business intelligence dashboard.',
      category: 'Data Science',
      technologies: [
        { name: 'Python', icon: FaPython, color: 'from-blue-500 to-cyan-500' },
        { name: 'React', icon: FaReact, color: 'from-cyan-500 to-blue-500' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'from-blue-500 to-indigo-500' },
        { name: 'D3.js', icon: FiBarChart2, color: 'from-orange-500 to-red-500' }
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      icon: FiDatabase,
      gradient: 'from-green-600 via-teal-600 to-emerald-600',
      complexity: 'Advanced',
      status: 'Deployed',
      duration: '5 months',
      teamSize: '4 members',
      github: '#',
      liveDemo: '#',
      features: [
        'Real-time analytics',
        'Predictive modeling',
        'Custom dashboards',
        'API integration'
      ],
      results: {
        efficiency: '+65%',
        insights: '100+',
        users: '500+',
        uptime: '99.9%'
      }
    },
    {
      id: 4,
      title: 'AI Security System',
      description: 'Intelligent threat detection using machine learning for real-time security monitoring.',
      category: 'AI Security',
      technologies: [
        { name: 'TensorFlow', icon: SiTensorflow, color: 'from-orange-500 to-yellow-500' },
        { name: 'Node.js', icon: FaNodeJs, color: 'from-green-500 to-emerald-500' },
        { name: 'MongoDB', icon: SiMongodb, color: 'from-green-600 to-teal-600' },
        { name: 'React', icon: FaReact, color: 'from-cyan-500 to-blue-500' }
      ],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      icon: FiShield,
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      complexity: 'Intermediate',
      status: 'Completed',
      duration: '4 months',
      teamSize: '2 members',
      github: '#',
      liveDemo: '#',
      features: [
        'Real-time monitoring',
        'Anomaly detection',
        'Alert system',
        'Dashboard interface'
      ],
      results: {
        detectionRate: '99.5%',
        falsePositives: '0.2%',
        responseTime: '<2s',
        coverage: 'Full'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: 4 },
    { id: 'ai-finance', label: 'AI Finance', count: 1 },
    { id: 'deep-learning', label: 'Deep Learning', count: 1 },
    { id: 'data-science', label: 'Data Science', count: 1 },
    { id: 'ai-security', label: 'AI Security', count: 1 }
  ];

  const ProjectCard = ({ project, index, isDetailed = false }) => {
    const Icon = project.icon;
    
    if (isDetailed) {
      return (
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500">
            
            {/* Header Section */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm text-primary-300 text-sm font-semibold rounded-full border border-primary-500/30">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full border border-gray-700/50">
                  {project.complexity}
                </span>
              </div>
              
              {/* Icon */}
              <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Icon className="text-2xl text-primary-400" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>
                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 text-sm font-semibold rounded-full">
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => {
                    const TechIcon = tech.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg"
                      >
                        <div className={`p-1.5 bg-gradient-to-br ${tech.color} rounded`}>
                          <TechIcon className="text-white text-sm" />
                        </div>
                        <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiClock className="text-primary-400 mx-auto mb-2" />
                  <div className="text-white font-bold">{project.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiUsers className="text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-bold">{project.teamSize}</div>
                  <div className="text-xs text-gray-500">Team</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiGitBranch className="text-green-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Completed</div>
                  <div className="text-xs text-gray-500">Status</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiStar className="text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-bold">4.9/5</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Key Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(project.results).map(([key, value], idx) => (
                    <div 
                      key={idx}
                      className="text-center p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30"
                    >
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 rounded-xl hover:text-white hover:border-primary-500/30 transition-all duration-300">
                  <FiExternalLink className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group">
        {/* Mini Card View */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300 group-hover:scale-105">
          <div className="relative h-40 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-30`} />
            <div className="absolute top-3 right-3">
              <div className="p-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg">
                <Icon className="text-primary-400" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm text-primary-300 text-xs font-semibold rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.technologies.slice(0, 3).map((tech, idx) => {
                  const TechIcon = tech.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full"
                      title={tech.name}
                    >
                      <TechIcon className="text-gray-400 text-xs" />
                    </div>
                  );
                })}
                {project.technologies.length > 3 && (
                  <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full text-xs text-gray-400">
                    +{project.technologies.length - 3}
                  </div>
                )}
              </div>
              <button className="text-primary-400 hover:text-primary-300 transition-colors">
                <FiArrowRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-full blur-3xl" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Binary Code Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 animate-binary-fall">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-sm font-mono text-primary-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiCode className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">PROJECT PORTFOLIO</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Innovative</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge machine learning projects that solve complex problems and deliver measurable results. 
            Each project showcases technical expertise and innovative problem-solving.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === 'detailed'
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Detailed View
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isDetailed={true} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Project Impact Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  28.5%
                </div>
                <div className="text-gray-400">Average ROI</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  96.8%
                </div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  15+
                </div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-8 py-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Next AI Project?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can transform your ideas into intelligent solutions with cutting-edge machine learning.
            </p>
            <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <span>Start a Project</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
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
        
        .animate-binary-fall {
          animation: binary-fall 10s linear infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default RecentProjects;