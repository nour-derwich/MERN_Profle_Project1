import React, { useState } from 'react';
import { 
  FiExternalLink, 
  FiGithub, 
  FiStar, 
  FiGitBranch,
  FiEye,
  FiHeart,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiShield,
  FiCloud,
  FiLayers,
  FiShare2,
  FiBookmark,
  FiChevronRight
} from 'react-icons/fi';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectCard = ({ 
  project, 
  index, 
  isVisible, 
  setSelectedProject,
  favorites = [],
  toggleFavorite,
  onQuickView,
  onShare,
  bookmarks = [],
  toggleBookmark
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getComplexityColor = (complexity) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-600',
      'Intermediate': 'from-blue-500 to-cyan-600',
      'Advanced': 'from-purple-500 to-pink-600',
      'Expert': 'from-red-500 to-orange-600'
    };
    return colors[complexity] || 'from-gray-600 to-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': FiTrendingUp,
      'Deep Learning': FiCode,
      'Computer Vision': FiEye,
      'NLP': FiBarChart2,
      'Web Apps': FaReact,
      'APIs': FaNodeJs,
      'Automation': FiZap,
      'Dashboards': FiLayers,
      'Cloud': FiCloud,
      'Security': FiShield
    };
    return icons[category] || FiCode;
  };

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
      'MongoDB': FiDatabase
    };
    return icons[tech] || FiCode;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(project.id);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (toggleBookmark) {
      toggleBookmark(project.id);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(project);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(project);
    }
  };

  const CategoryIcon = getCategoryIcon(project.category);
  const isFavorite = favorites.includes(project.id);
  const isBookmarked = bookmarks.includes(project.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProject(project)}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getComplexityColor(project.complexity)} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:border-primary-500/30 group-hover:scale-[1.02]">
        
        {/* Image/Header Section */}
        <div className="relative h-56 overflow-hidden">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Project Image */}
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Featured Badge */}
            {project.featured && (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur opacity-30" />
                <span className="relative px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold rounded-full backdrop-blur-sm flex items-center gap-1">
                  <FiStar className="text-xs" />
                  Featured
                </span>
              </div>
            )}
            
            {/* Complexity Badge */}
            <div className={`relative px-3 py-1 bg-gradient-to-r ${getComplexityColor(project.complexity)} text-white text-xs font-bold rounded-full backdrop-blur-sm`}>
              {project.complexity}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <FiHeart 
                className={`relative text-lg ${
                  isFavorite 
                    ? 'fill-red-500 text-red-500 animate-heart-beat' 
                    : 'text-gray-400 group-hover/btn:text-red-400'
                }`}
              />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-300 group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <FiBookmark 
                className={`relative text-lg ${
                  isBookmarked 
                    ? 'fill-yellow-500 text-yellow-500' 
                    : 'text-gray-400 group-hover/btn:text-yellow-400'
                }`}
              />
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleQuickView}
              className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <FiEye className="relative text-lg text-gray-400 group-hover/btn:text-primary-400" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="relative flex items-center gap-2">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-30" />
              <span className="relative px-3 py-1.5 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
                <CategoryIcon className="text-xs" />
                {project.category}
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute bottom-4 right-4">
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm ${
              project.status === 'completed' 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300'
                : project.status === 'in-progress'
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300'
                : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                project.status === 'completed' ? 'bg-green-400' :
                project.status === 'in-progress' ? 'bg-blue-400 animate-pulse' :
                'bg-yellow-400'
              }`} />
              <span className="text-xs font-medium">
                {project.status === 'completed' ? 'Completed' : 
                 project.status === 'in-progress' ? 'In Progress' : 'Maintained'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* Short Description */}
          <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg">
              <FiStar className="text-yellow-400 text-sm mb-1" />
              <div className="text-xs text-gray-500">Stars</div>
              <div className="text-white font-bold">{project.stars?.toLocaleString() || '0'}</div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg">
              <FiGitBranch className="text-blue-400 text-sm mb-1" />
              <div className="text-xs text-gray-500">Forks</div>
              <div className="text-white font-bold">{project.forks?.toLocaleString() || '0'}</div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg">
              <FiClock className="text-green-400 text-sm mb-1" />
              <div className="text-xs text-gray-500">Updated</div>
              <div className="text-white font-bold text-xs">{formatDate(project.lastUpdated)}</div>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech, idx) => {
              const TechIcon = getTechIcon(tech);
              return (
                <span 
                  key={idx}
                  className="px-2 py-1.5 bg-gray-800/50 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/50 hover:border-primary-500/30 hover:text-primary-300 transition-all duration-300 flex items-center gap-1"
                  title={tech}
                >
                  {TechIcon && <TechIcon className="text-xs" />}
                  <span className="truncate max-w-[60px]">{tech}</span>
                </span>
              );
            })}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1.5 bg-gray-800/30 text-gray-500 rounded-lg text-xs">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div className="flex items-center gap-4">
              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="View on GitHub"
                >
                  <FiGithub className="text-lg" />
                </a>
              )}
              
              {/* Live Demo */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  title="Live Demo"
                >
                  <FiExternalLink className="text-lg" />
                </a>
              )}
              
              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                title="Share Project"
              >
                <FiShare2 className="text-lg" />
              </button>
            </div>
            
            {/* View Project Button */}
            <button className="relative group/btn">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-primary-500/30 transition-all duration-300 group-hover/btn:scale-105">
                <span className="text-sm font-medium">View Details</span>
                <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Hover Effect Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      {/* 3D Floating Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getComplexityColor(project.complexity)} rounded-2xl blur-xl -z-10 transition-all duration-500 ${
        isHovered ? 'opacity-20 translate-y-2' : 'opacity-0'
      }`} />

      {/* Missing FiDatabase icon */}
      {!FiDatabase && (
        <style jsx>{`
          .FiDatabase {
            width: 1em;
            height: 1em;
            fill: currentColor;
          }
        `}</style>
      )}
    </motion.div>
  );
};

// Add missing FiDatabase icon component
const FiDatabase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
  </svg>
);

// Custom animations
const ProjectCardStyle = () => (
  <style jsx>{`
    @keyframes heart-beat {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
    .animate-heart-beat {
      animation: heart-beat 0.5s ease-in-out;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `}</style>
);

export { ProjectCard, ProjectCardStyle };
export default ProjectCard;