import React, { useState, useEffect } from 'react';
import { 
  FiExternalLink, 
  FiCode, 
  FiMessageSquare, 
  FiCalendar,
  FiChevronRight,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiZap,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiCoffee,
    FiBook
} from 'react-icons/fi';
import { FaPython, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AiOutlineStar } from 'react-icons/ai';
const ProjectsCTA = ({ isVisible = true, onStartProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeProjectType, setActiveProjectType] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: ''
  });

  const projectTypes = [
    {
      title: 'ML Solutions',
      icon: FiTrendingUp,
      color: 'from-blue-500 to-cyan-600',
      description: 'Custom ML models & algorithms'
    },
    {
      title: 'AI Integration',
      icon: FaRobot,
      color: 'from-purple-500 to-pink-600',
      description: 'AI-powered applications'
    },
    {
      title: 'Data Pipelines',
      icon: FiCode,
      color: 'from-green-500 to-emerald-600',
      description: 'ETL & data processing'
    },
    {
      title: 'Web Apps',
      icon: FiZap,
      color: 'from-orange-500 to-yellow-600',
      description: 'Full-stack applications'
    }
  ];

  const timelineOptions = [
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months'
  ];

  const budgetRanges = [
    '$1K - $5K',
    '$5K - $15K',
    '$15K - $30K',
    '$30K - $50K',
    '$50K+'
  ];

  const successStories = [
    { metric: '50+', label: 'Projects Completed', icon: FiAward },
    { metric: '95%', label: 'Client Satisfaction', icon: AiOutlineStar },
    { metric: '30%', label: 'Cost Reduction', icon: FiTrendingUp },
    { metric: '24/7', label: 'Support', icon: FiUsers }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjectType((prev) => (prev + 1) % projectTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStartProject) {
      onStartProject(formData);
    }
    setFormVisible(false);
    setFormData({
      name: '',
      email: '',
      projectType: '',
      timeline: '',
      budget: '',
      description: ''
    });
  };

  const ProjectTypeCard = ({ project, index, isActive }) => {
    const Icon = project.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative cursor-pointer transition-all duration-500 ${
          isActive ? 'scale-105' : 'scale-95 opacity-70'
        }`}
        onMouseEnter={() => setIsHovered(index)}
        onMouseLeave={() => setIsHovered(null)}
        onClick={() => {
          setActiveProjectType(index);
          setFormData({ ...formData, projectType: project.title });
        }}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-xl blur-lg opacity-0 ${
          isActive || isHovered === index ? 'opacity-30' : ''
        } transition-opacity duration-500`} />
        
        {/* Card */}
        <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${
          isActive ? 'border-primary-500/50' : 'border-gray-700/50'
        } rounded-xl p-5 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-br ${project.color}/20 rounded-lg`}>
              <Icon className={`text-2xl bg-gradient-to-r ${project.color} bg-clip-text text-transparent`} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">{project.title}</h4>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg blur-3xl rotate-45 animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-green-500/5 to-transparent rounded-lg blur-3xl -rotate-12 animate-float-slow" style={{ animationDelay: '1s' }} />
        
        {/* Code Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#ffffff12_1px,transparent_1px),linear-gradient(180deg,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Decorative Element */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />
            <div className="relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
              <FiCode className="text-4xl text-white" />
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-8 group hover:border-primary-500/50 transition-all duration-300">
            <AiOutlineStar className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">
              LET'S BUILD TOGETHER
            </span>
            <div className="w-4 h-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Ready to </span>
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Build Something
            </span>
            <br />
            <span className="text-white">Amazing?</span>
          </h2>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
            <p className="text-2xl text-gray-300 font-semibold">
              Let's transform your ideas into reality
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>

          {/* Description */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            From concept to deployment, I'll help you build cutting-edge AI solutions 
            that drive real business value. Let's discuss your project and create something extraordinary.
          </p>

          {/* Project Types */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Project Types I Work On</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {projectTypes.map((project, index) => (
                <ProjectTypeCard
                  key={index}
                  project={project}
                  index={index}
                  isActive={index === activeProjectType}
                />
              ))}
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {successStories.map((story, index) => {
              const Icon = story.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-primary-500 to-blue-500' : 'from-purple-500 to-pink-500'
                  } rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 bg-gradient-to-br ${
                        index % 2 === 0 ? 'from-primary-500/20 to-blue-500/20' : 'from-purple-500/20 to-pink-500/20'
                      } rounded-xl`}>
                        <Icon className={`text-xl ${
                          index % 2 === 0 ? 'text-primary-400' : 'text-purple-400'
                        }`} />
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {story.metric}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{story.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main CTA */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Button Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur transition-all duration-700 ${
              isHovered ? 'opacity-70' : 'opacity-30'
            }`} />
            
            {/* Main Button */}
            <button
              onClick={() => setFormVisible(true)}
              className="relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group/btn"
            >
              <FiMessageSquare className="text-xl" />
              <span className="text-lg">Start Your Project</span>
              <FiChevronRight className="group-hover/btn:translate-x-2 transition-transform" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>
            
            {/* Sparkle Animation */}
            {isHovered && (
              <div className="absolute -top-4 -right-4">
                <AiOutlineStar className="text-yellow-400 animate-ping" />
              </div>
            )}
          </motion.div>

          {/* Alternative Contact Methods */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <FiMail className="group-hover:scale-110 transition-transform" />
              <span>hello@example.com</span>
            </a>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <FiGithub className="group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
            >
              <FiLinkedin className="group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Project Form Modal */}
      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setFormVisible(false)}
          />
          
          {/* Form Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Start Your Project</h3>
                  <p className="text-gray-400">Tell me about your idea and let's make it happen</p>
                </div>
                <button
                  onClick={() => setFormVisible(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiExternalLink className="rotate-45" />
                </button>
              </div>
            </div>
            
            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300 placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300 placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map((project, index) => {
                      const Icon = project.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({...formData, projectType: project.title})}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            formData.projectType === project.title
                              ? `bg-gradient-to-r ${project.color} text-white`
                              : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                          }`}
                        >
                          <Icon />
                          <span className="text-sm">{project.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline & Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Expected Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((timeline, idx) => (
                        <option key={idx} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((budget, idx) => (
                        <option key={idx} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none resize-none transition-all duration-300 placeholder-gray-500"
                    placeholder="Describe your project in detail..."
                  />
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-gray-600/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <AiOutlineStar />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
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
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCTA;