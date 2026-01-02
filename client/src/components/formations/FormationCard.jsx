import React, { useState } from 'react';
import { 
  FiClock, 
  FiCalendar, 
  FiUsers, 
  FiMapPin, 
  FiDollarSign,
  FiChevronRight,
  FiBook,
  FiBookOpen,
  FiAward,
  FiStar,
  FiEye,
  FiHeart,
  FiShare2,
  FiCheckCircle,
  FiTrendingUp,
  FiVideo,
  FiMessageSquare,
  FiCode
} from 'react-icons/fi';
import { FaPython, FaGraduationCap } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge';

const FormationCard = ({ 
  formation, 
  onClick, 
  index, 
  isVisible,
  favorites = [],
  toggleFavorite,
  onQuickView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(formation.id));

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-600',
      'Intermediate': 'from-blue-500 to-cyan-600',
      'Advanced': 'from-purple-500 to-pink-600',
      'Expert': 'from-red-500 to-orange-600',
      'All Levels': 'from-primary-500 to-indigo-600'
    };
    return colors[level] || 'from-gray-600 to-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': FiTrendingUp,
      'Deep Learning': FiCode,
      'Data Science': FaPython,
      'AI Engineering': FiCode,
      'Python': FaPython,
      'Mathematics': FiBook,
      'Statistics': FiTrendingUp,
      'Business AI': FiBookOpen
    };
    return icons[category] || FiBookOpen;
  };

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'EUR') return `€${amount}`;
    return `${amount} ${currency}`;
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (toggleFavorite) {
      toggleFavorite(formation.id);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(formation);
    }
  };

  const CategoryIcon = getCategoryIcon(formation.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(formation)}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getLevelColor(formation.level)} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:border-primary-500/30 group-hover:scale-[1.02]">
        
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Formation Image */}
          <img 
            src={formation.image} 
            alt={formation.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <StatusBadge 
              status={formation.status} 
              spotsLeft={formation.spotsLeft}
              size="sm"
              showIcon={false}
              interactive={true}
            />
            
            {formation.featured && (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur opacity-30" />
                <span className="relative px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  FEATURED
                </span>
              </div>
            )}
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
                {formation.category}
              </span>
            </div>
          </div>

          {/* Level Badge */}
          <div className="absolute bottom-4 right-4">
            <div className={`relative px-3 py-1.5 bg-gradient-to-r ${getLevelColor(formation.level)} text-white text-xs font-bold rounded-full backdrop-blur-sm`}>
              {formation.level}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
            {formation.title}
          </h3>
          
          {/* Instructor */}
          {formation.instructor && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {formation.instructor.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                by {formation.instructor.name}
              </span>
              {formation.instructor.verified && (
                <FiCheckCircle className="text-blue-400 text-xs" />
              )}
            </div>
          )}
          
          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {formation.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                <FiClock className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-white font-medium">{formation.duration}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                <FiCalendar className="text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Starts</div>
                <div className="text-white font-medium">{formation.startDate}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                <FiUsers className="text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Spots</div>
                <div className="text-white font-medium">
                  {formation.spotsLeft}/{formation.maxParticipants}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg">
                <FiMapPin className="text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Format</div>
                <div className="text-white font-medium">{formation.format}</div>
              </div>
            </div>
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {formation.features?.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/50 hover:border-primary-500/30 hover:text-primary-300 transition-all duration-300"
              >
                {feature}
              </span>
            ))}
            {formation.features?.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/30 text-gray-500 rounded-lg text-xs">
                +{formation.features.length - 3}
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div className="flex flex-col">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                {formatCurrency(formation.price, formation.currency)}
              </div>
              {formation.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {formatCurrency(formation.originalPrice, formation.currency)}
                </div>
              )}
              {formation.installment && (
                <div className="text-xs text-gray-400">
                  or {formation.installment}/mo
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button className="relative group/btn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 group-hover/btn:scale-105">
                  <FaGraduationCap />
                  <span>Enroll Now</span>
                  <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Rating (Optional) */}
          {formation.rating && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/30">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(formation.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {formation.rating} ({formation.reviews || 0})
                </span>
              </div>
              <button className="text-xs text-gray-500 hover:text-primary-400 transition-colors">
                <FiShare2 />
              </button>
            </div>
          )}
        </div>

        {/* Hover Effect Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      {/* 3D Floating Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(formation.level)} rounded-2xl blur-xl -z-10 transition-all duration-500 ${
        isHovered ? 'opacity-20 translate-y-2' : 'opacity-0'
      }`} />

      {/* Enrollment Warning */}
      {formation.spotsLeft <= 5 && formation.spotsLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : {}}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-30" />
            <div className="relative px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold rounded-full backdrop-blur-sm whitespace-nowrap">
              ⚡ Only {formation.spotsLeft} spots left!
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Custom animations
const FormationCardStyle = () => (
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
  `}</style>
);

export { FormationCard, FormationCardStyle };
export default FormationCard;