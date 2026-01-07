import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiTag,
  FiStar,
  FiGitBranch,
  FiEye,
  FiTrendingUp,
  FiCode,
  FiCloud,
  FiLayers,
  FiZap,
  FiUsers,
  FiClock,
  FiBarChart2,
  FiShare2,
  FiHeart,
  FiBookmark,
  FiChevronRight,
  FiDownload,
  FiCopy,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Add missing FiDatabase icon at the top
const FiDatabase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
  </svg>
);

const ProjectDetailModal = ({
  selectedProject,
  setSelectedProject,
  favorites = [],
  toggleFavorite,
  bookmarks = [],
  toggleBookmark,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(favorites.includes(selectedProject?.id));
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(selectedProject?.id));
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setIsFavorite(favorites.includes(selectedProject.id));
      setIsBookmarked(bookmarks.includes(selectedProject.id));
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, favorites, bookmarks]);

  if (!selectedProject) return null;

  const getTechIcon = (tech) => {
    const icons = {
      'Python': FaPython,
      'TensorFlow': FiTrendingUp,
      'PyTorch': FiCode,
      'React': FaReact,
      'Node.js': FaNodeJs,
      'Docker': FaDocker,
      'AWS': FaAws,
      'FastAPI': FiZap,
      'PostgreSQL': FiDatabase,
      'MongoDB': FiDatabase,
      'MySQL': FiDatabase,
      'Redis': FiDatabase,
      'OpenCV': FiEye,
      'Scikit-learn': FiBarChart2,
      'Pandas': FiDatabase,
      'NumPy': FiCode,
      'Streamlit': FiLayers,
      'Next.js': FaReact,
      'TypeScript': FiCode,
      'GraphQL': FiDatabase,
      'SQLite': FiDatabase,
      'Elasticsearch': FiDatabase,
      'default': FiCode
    };
    return icons[tech] || icons.default;
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-600',
      'Intermediate': 'from-blue-500 to-cyan-600',
      'Advanced': 'from-purple-500 to-pink-600',
      'Expert': 'from-red-500 to-orange-600',
      'default': 'from-gray-600 to-gray-800'
    };
    return colors[complexity] || colors.default;
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (toggleFavorite) {
      toggleFavorite(selectedProject.id);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (toggleBookmark) {
      toggleBookmark(selectedProject.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(selectedProject);
    } else if (navigator.share) {
      navigator.share({
        title: selectedProject.title,
        text: `Check out this project: ${selectedProject.shortDescription || selectedProject.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiEye },
    { id: 'tech', label: 'Tech Stack', icon: FiCode },
    { id: 'features', label: 'Features', icon: FiStar },
    { id: 'challenges', label: 'Challenges', icon: FiAlertCircle },
    { id: 'results', label: 'Results', icon: FiTrendingUp },
    { id: 'docs', label: 'Documentation', icon: FiLayers }
  ];

  // Safely get stats with fallbacks
  const stats = [
    {
      icon: FiStar,
      label: 'GitHub Stars',
      value: selectedProject.stars?.toLocaleString() || selectedProject.github_stars?.toLocaleString() || '0'
    },
    {
      icon: FiGitBranch,
      label: 'Forks',
      value: selectedProject.forks?.toLocaleString() || selectedProject.github_forks?.toLocaleString() || '0'
    },
    {
      icon: FiEye,
      label: 'Views',
      value: selectedProject.views?.toLocaleString() || selectedProject.views_count?.toLocaleString() || 'N/A'
    },
    {
      icon: FiUsers,
      label: 'Contributors',
      value: selectedProject.contributors || selectedProject.team_size || '1'
    },
    {
      icon: FiClock,
      label: 'Duration',
      value: selectedProject.developmentTime || selectedProject.duration || selectedProject.development_time || 'N/A'
    },
    {
      icon: FiDatabase,
      label: 'Dataset Size',
      value: selectedProject.datasetSize || selectedProject.dataset_size || 'N/A'
    }
  ];

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedProject(null)}
      />

      {/* Modal */}
      <div className="relative min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            {/* Image with fallback */}
            <img
              src={selectedProject.image || selectedProject.cover_image || '/default-project.jpg'}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/default-project.jpg';
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex-1">
                  {/* Category & Complexity */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 bg-gradient-to-r ${getComplexityColor(selectedProject.complexity)} text-white text-xs font-bold rounded-full`}>
                        {selectedProject.complexity || 'Intermediate'}
                      </div>
                      <div className="px-3 py-1.5 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-xs font-semibold rounded-full">
                        {selectedProject.category || 'Project'}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm ${selectedProject.status === 'completed' || selectedProject.status === 'published'
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300'
                        : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300'
                      }`}>
                      <div className={`w-2 h-2 rounded-full ${selectedProject.status === 'completed' || selectedProject.status === 'published' ? 'bg-green-400' : 'bg-blue-400'
                        }`} />
                      <span className="text-xs font-medium">
                        {selectedProject.status === 'completed' || selectedProject.status === 'published' ? 'Completed' :
                          selectedProject.status === 'in-progress' || selectedProject.status === 'draft' ? 'In Progress' :
                            selectedProject.status === 'maintained' ? 'Maintained' : selectedProject.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                    {selectedProject.title}
                  </h1>

                  {/* Short Description */}
                  <p className="text-xl text-gray-300 max-w-3xl">
                    {selectedProject.shortDescription || selectedProject.short_description || selectedProject.description || 'No description available'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleFavorite}
                    className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                  >
                    <FiHeart className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                  </button>

                  <button
                    onClick={handleBookmark}
                    className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-yellow-400 hover:border-yellow-500/30 transition-all duration-300"
                  >
                    <FiBookmark className={isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                  >
                    {copiedLink ? <FiCheckCircle className="text-green-400" /> : <FiShare2 />}
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-primary-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                        <Icon className="text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                        <div className="text-white font-bold text-lg">{stat.value}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                        : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                      }`}
                  >
                    <Icon className="text-sm" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Overview */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedProject.fullDescription || selectedProject.full_description || selectedProject.description || 'No detailed description available.'}
                  </p>

                  {/* Project Goals */}
                  {(selectedProject.goals || selectedProject.project_goals) && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Project Goals</h3>
                      <ul className="space-y-2">
                        {(selectedProject.goals || selectedProject.project_goals || []).map((goal, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tech Stack */}
              {activeTab === 'tech' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(selectedProject.technologies || []).map((tech, idx) => {
                      const Icon = getTechIcon(tech);
                      return (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 transition-all duration-300"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                              <Icon className="text-primary-400 text-2xl" />
                            </div>
                            <span className="text-white font-medium text-center">{tech}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Architecture */}
                  {(selectedProject.architecture || selectedProject.system_architecture) && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">System Architecture</h3>
                      <div className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                        <p className="text-gray-300">{selectedProject.architecture || selectedProject.system_architecture}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Features */}
              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(selectedProject.features || []).map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                            <FiCheckCircle className="text-green-400" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges */}
              {activeTab === 'challenges' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Challenges & Solutions</h2>
                  <div className="space-y-4">
                    {(selectedProject.challenges || []).map((challenge, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                              {idx + 1}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Challenge</h4>
                            <p className="text-gray-300 mb-3">{challenge.description || challenge.problem}</p>
                            <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
                              <h5 className="text-green-300 font-semibold mb-2">Solution</h5>
                              <p className="text-gray-300">{challenge.solution || challenge.resolution}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Results */}
              {activeTab === 'results' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Results & Impact</h2>
                  <div className="space-y-4">
                    {(selectedProject.results || selectedProject.project_results || []).map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl"
                      >
                        <FiTrendingUp className="text-green-400 text-xl flex-shrink-0 mt-1" />
                        <span className="text-gray-300 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  {selectedProject.metrics && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(selectedProject.metrics).map(([key, value], idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl"
                          >
                            <div className="text-2xl font-bold text-white mb-1">{value}</div>
                            <div className="text-sm text-blue-300">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Documentation */}
              {activeTab === 'docs' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Documentation & Resources</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(selectedProject.githubUrl || selectedProject.github_url) && (
                      <a
                        href={selectedProject.githubUrl || selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-blue-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
                            <FiGithub className="text-white text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">Source Code</h4>
                            <p className="text-gray-400 text-sm">View complete project on GitHub</p>
                          </div>
                          <FiChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </a>
                    )}

                    {(selectedProject.demoUrl || selectedProject.demo_url) && (
                      <a
                        href={selectedProject.demoUrl || selectedProject.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-green-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                            <FiExternalLink className="text-green-400 text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">Live Demo</h4>
                            <p className="text-gray-400 text-sm">Try the deployed application</p>
                          </div>
                          <FiChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </a>
                    )}

                    {(selectedProject.documentationUrl || selectedProject.documentation_url) && (
                      <a
                        href={selectedProject.documentationUrl || selectedProject.documentation_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-yellow-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                            <FiLayers className="text-yellow-400 text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">Documentation</h4>
                            <p className="text-gray-400 text-sm">Technical documentation and API reference</p>
                          </div>
                          <FiChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </a>
                    )}

                    {(selectedProject.articleUrl || selectedProject.article_url) && (
                      <a
                        href={selectedProject.articleUrl || selectedProject.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                            <FiBarChart2 className="text-primary-400 text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">Case Study</h4>
                            <p className="text-gray-400 text-sm">Read the detailed project analysis</p>
                          </div>
                          <FiChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-700/50">
              {(selectedProject.demoUrl || selectedProject.demo_url) && (
                <a
                  href={selectedProject.demoUrl || selectedProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <FiExternalLink />
                  <span>View Live Demo</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {(selectedProject.githubUrl || selectedProject.github_url) && (
                <a
                  href={selectedProject.githubUrl || selectedProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl font-bold hover:text-white hover:border-primary-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <FiGithub />
                  <span>View Source Code</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Hide */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectDetailModal;