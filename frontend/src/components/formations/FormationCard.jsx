import Naceurimage from '../../assets/images/naceeiruhncf.JPG';
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
  FiCode,
  FiCheck,
  FiVideo as FiVideoIcon,
  FiMessageSquare as FiMessageSquareIcon,
  FiTool
} from 'react-icons/fi';
import { FaPython, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'TBD';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'TBD';
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      'beginner': 'from-green-500 to-emerald-600',
      'intermediate': 'from-blue-500 to-cyan-600',
      'advanced': 'from-purple-500 to-pink-600',
      'expert': 'from-red-500 to-orange-600',
      'all': 'from-primary-500 to-indigo-600'
    };
    return colors[level?.toLowerCase()] || 'from-gray-600 to-gray-800';
  };

  const formatLevelLabel = (level) => {
    const labels = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return labels[level] || (level?.charAt(0).toUpperCase() + level?.slice(1)) || 'All Levels';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': FiTrendingUp,
      'Deep Learning': FiCode,
      'Data Science': FaPython,
      'AI Engineering': FiTool,
      'Python': FaPython,
      'Mathematics': FiBook,
      'Statistics': FiTrendingUp,
      'Business AI': FiBookOpen,
      'Web Development': FiCode,
      'Mobile Development': FiCode,
      'Design': FiAward,
      'Business': FiBookOpen,
      'Marketing': FiTrendingUp
    };
    return icons[category] || FiBookOpen;
  };

  const formatCurrency = (amount, currency = 'USD') => {
    // Handle null, undefined, or non-numeric values
    if (amount === null || amount === undefined) return 'Free';

    // Convert to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Check if it's a valid number
    if (isNaN(numAmount)) return 'Free';

    if (numAmount === 0) return 'Free';

    // Format the number
    const formattedAmount = Number.isInteger(numAmount)
      ? numAmount.toString()
      : numAmount.toFixed(2);

    if (currency === 'USD') return `$${formattedAmount}`;
    if (currency === 'EUR') return `€${formattedAmount}`;
    return `${formattedAmount} ${currency}`;
  };

  // Calculate spots left
  const calculateSpotsLeft = (formation) => {
    if (formation.spots_left !== undefined) {
      const spots = parseInt(formation.spots_left);
      return isNaN(spots) ? 0 : spots;
    }

    const maxParticipants = parseInt(formation.max_participants || 0);
    const currentParticipants = parseInt(formation.current_participants || 0);

    if (isNaN(maxParticipants) || isNaN(currentParticipants)) {
      return 0;
    }

    return Math.max(0, maxParticipants - currentParticipants);
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

  // Helper function to safely parse number
  const parseNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined) return defaultValue;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? defaultValue : num;
  };

  // Get instructor avatar - use Naceur's photo for specific name
  const getInstructorAvatar = (instructorName, title = '') => {
    // If the instructor is Naceur Keraani, use your imported image
    if (instructorName && instructorName.toLowerCase().includes('naceur')) {
      return Naceurimage;
    }

    // For other instructors, use DiceBear
    const seed = instructorName || 'instructor';
    const backgroundColors = {
      'Senior ML Engineer': '4f46e5',
      'Deep Learning Specialist': '7c3aed',
      'Data Science Lead': '0ea5e9',
      'AI Architect': '10b981',
      'Senior AI Engineer': '7c3aed',
      'ML Engineer': '4f46e5',
      'Data Scientist': '0ea5e9',
      'AI Researcher': '10b981',
      'Default': '4f46e5'
    };

    const bgColor = backgroundColors[title] || backgroundColors['Default'];

    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&size=128&backgroundColor=${bgColor}`;
  };

  // Get formation data with fallbacks
  const formationData = {
    id: formation.id,
    title: formation.title || 'Untitled Formation',
    category: formation.category || 'Uncategorized',
    level: formation.level || 'beginner',
    duration_hours: parseNumber(formation.duration_hours, 0),
    duration: formation.duration || (formation.duration_hours ? `${parseNumber(formation.duration_hours)} hours` : 'Flexible'),
    weeks_duration: formation.weeks_duration,
    hours_per_week: formation.hours_per_week,
    start_date: formation.start_date ? formatDate(formation.start_date) : 'Coming Soon',
    end_date: formation.end_date ? formatDate(formation.end_date) : '',
    schedule: formation.schedule || 'Flexible',
    price: parseNumber(formation.price, 0),
    original_price: parseNumber(formation.original_price),
    installment_price: parseNumber(formation.installment_price),
    currency: formation.currency || 'USD',
    max_participants: parseNumber(formation.max_participants, 0),
    current_participants: parseNumber(formation.current_participants, 0),
    spots_left: calculateSpotsLeft(formation),
    status: formation.status || 'draft',
    format: formation.format || 'Online',
    location: formation.location || 'Online',
    live_sessions: formation.live_sessions || 'Flexible',
    cover_image: formation.cover_image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    description: formation.description || formation.short_description || 'No description available.',
    highlights: Array.isArray(formation.highlights) ? formation.highlights : (typeof formation.highlights === 'string' ? formation.highlights.split(',').filter(h => h.trim()) : []),
    features: Array.isArray(formation.features) ? formation.features : (typeof formation.features === 'string' ? formation.features.split(',').filter(f => f.trim()) : []),
    prerequisites: Array.isArray(formation.prerequisites) ? formation.prerequisites : (typeof formation.prerequisites === 'string' ? formation.prerequisites.split(',').filter(p => p.trim()) : []),
    learning_objectives: Array.isArray(formation.learning_objectives) ? formation.learning_objectives : (typeof formation.learning_objectives === 'string' ? formation.learning_objectives.split(',').filter(lo => lo.trim()) : []),
    modules: Array.isArray(formation.modules) ? formation.modules : [],
    testimonials: Array.isArray(formation.testimonials) ? formation.testimonials : [],
    tags: Array.isArray(formation.tags) ? formation.tags : (typeof formation.tags === 'string' ? formation.tags.split(',').filter(t => t.trim()) : []),
    rating: parseNumber(formation.rating, 0),
    reviews_count: parseNumber(formation.reviews_count, 0),
    featured: formation.featured || false,
    views_count: parseNumber(formation.views_count, 0),
    created_at: formation.created_at,
    updated_at: formation.updated_at,
    // Instructor data with personalized avatar
    instructor: formation.instructor_name ? {
      name: formation.instructor_name || 'Instructor',
      title: formation.instructor_title || '',
      avatar: formation.instructor_photo || getInstructorAvatar(
        formation.instructor_name,
        formation.instructor_title
      ),
      verified: Boolean(formation.instructor_verified),
      rating: parseNumber(formation.instructor_rating, 0),
      reviews: parseNumber(formation.instructor_reviews, 0),
      students: parseNumber(formation.instructor_students, 0)
    } : null
  };

  const CategoryIcon = getCategoryIcon(formationData.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(formationData)}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getLevelColor(formationData.level)} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

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
            src={formationData.cover_image}
            alt={formationData.title}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80';
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <StatusBadge
              status={formationData.status}
              spotsLeft={formationData.spots_left}
              size="sm"
              showIcon={false}
              interactive={true}
            />

            {formationData.featured && (
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
                className={`relative text-lg ${isFavorite
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
                {formationData.category}
              </span>
            </div>
          </div>

          {/* Level Badge */}
          <div className="absolute bottom-4 right-4">
            <div className={`relative px-3 py-1.5 bg-gradient-to-r ${getLevelColor(formationData.level)} text-white text-xs font-bold rounded-full backdrop-blur-sm`}>
              {formatLevelLabel(formationData.level)}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
            {formationData.title}
          </h3>

          {/* Instructor */}
          {formationData.instructor && (
            <div className="flex items-center gap-2 mb-3">
              <img
                src={formationData.instructor.avatar}
                alt={formationData.instructor.name}
                className="w-6 h-6 rounded-full object-cover border-2 border-primary-500/30"
                onError={(e) => {
                  e.target.onerror = null;
                  // Fallback to DiceBear if the imported image fails
                  if (formationData.instructor.name && formationData.instructor.name.toLowerCase().includes('naceur')) {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formationData.instructor.name}`;
                  } else {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formationData.instructor.name || 'instructor'}`;
                  }
                }}
              />
              <span className="text-sm text-gray-400">
                by {formationData.instructor.name}
              </span>
              {formationData.instructor.verified && (
                <FiCheckCircle className="text-blue-400 text-xs" />
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {formationData.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                <FiClock className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-white font-medium">
                  {formationData.duration_hours > 0 ? `${formationData.duration_hours} hrs` : 'Flexible'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                <FiCalendar className="text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Starts</div>
                <div className="text-white font-medium">{formationData.start_date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                <FiUsers className="text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Spots</div>
                <div className="text-white font-medium">
                  {formationData.spots_left > 0 ? formationData.spots_left : 0}/{formationData.max_participants > 0 ? formationData.max_participants : '∞'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg">
                <FiMapPin className="text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Format</div>
                <div className="text-white font-medium">{formationData.format}</div>
              </div>
            </div>
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {formationData.features?.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/50 hover:border-primary-500/30 hover:text-primary-300 transition-all duration-300"
              >
                {typeof feature === 'string' ? feature.trim() : String(feature)}
              </span>
            ))}
            {formationData.highlights?.slice(0, 1).map((highlight, idx) => (
              <span
                key={`highlight-${idx}`}
                className="px-2 py-1 bg-primary-500/10 text-primary-300 rounded-lg text-xs font-medium border border-primary-500/30"
              >
                {typeof highlight === 'string' ? highlight.trim() : String(highlight)}
              </span>
            ))}
            {(formationData.features?.length > 3 || formationData.highlights?.length > 1) && (
              <span className="px-2 py-1 bg-gray-800/30 text-gray-500 rounded-lg text-xs">
                +{(formationData.features?.length || 0) + (formationData.highlights?.length || 0) - 4}
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div className="flex flex-col">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                {formatCurrency(formationData.price, formationData.currency)}
              </div>
              {formationData.original_price && formationData.original_price > formationData.price && (
                <div className="text-sm text-gray-500 line-through">
                  {formatCurrency(formationData.original_price, formationData.currency)}
                </div>
              )}
              {formationData.installment_price && formationData.installment_price > 0 && (
                <div className="text-xs text-gray-400">
                  or {formatCurrency(formationData.installment_price, formationData.currency)}/mo
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                className="relative group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(formationData);
                }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 group-hover/btn:scale-105">
                  <FaGraduationCap />
                  <span>View Details</span>
                  <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Rating and Views */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/30">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-sm ${i < Math.floor(formationData.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-700'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {formationData.rating?.toFixed(1) || '0.0'} ({formationData.reviews_count || 0})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FiEye className="text-gray-600" />
              <span>{formationData.views_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Hover Effect Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      {/* 3D Floating Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(formationData.level)} rounded-2xl blur-xl -z-10 transition-all duration-500 ${isHovered ? 'opacity-20 translate-y-2' : 'opacity-0'
        }`} />

      {/* Enrollment Warning */}
      {formationData.spots_left > 0 && formationData.spots_left <= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : {}}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-30" />
            <div className="relative px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold rounded-full backdrop-blur-sm whitespace-nowrap">
              ⚡ Only {formationData.spots_left} spots left!
            </div>
          </div>
        </motion.div>
      )}

      {/* Discount Badge */}
      {formationData.original_price && formationData.original_price > formationData.price && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-30" />
            <div className="relative px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full backdrop-blur-sm">
              Save {Math.round((1 - formationData.price / formationData.original_price) * 100)}%
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Custom animations
const FormationCardStyle = () => (
  <style>{`
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