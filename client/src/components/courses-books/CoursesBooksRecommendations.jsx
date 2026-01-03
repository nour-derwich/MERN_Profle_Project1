import React, { useState, useEffect } from 'react';
import { 
  FiAward, 
  FiChevronRight, 
  FiBook, 
  FiTrendingUp, 
  FiClock,
  FiCheckCircle,
  FiStar,
  FiBookOpen,
  FiHeart
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';

const CoursesBooksRecommendations = ({ 
  fetchRecommendations,
  favorites = [],
  toggleFavorite,
  onBookSelect
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    loadRecommendations();
    
    // Auto-rotate recommendations
    const interval = setInterval(() => {
      if (recommendations.length > 0) {
        setActiveIndex((prev) => (prev + 1) % recommendations.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [recommendations.length]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const data = await fetchRecommendations();
      
      // Format the data for frontend
      const formattedRecommendations = data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        price: parseFloat(book.price),
        originalPrice: book.original_price ? parseFloat(book.original_price) : null,
        rating: parseFloat(book.rating),
        reviews: book.reviews || book.reviews_count || 0,
        image: book.cover_image,
        amazonLink: book.amazon_link,
        description: book.description,
        short_description: book.short_description,
        level: book.level,
        priority: book.priority || 'Recommended',
        personal_insight: book.personal_insight || book.description,
        time_to_read: book.time_to_read || '2-3 weeks',
        year: book.year || book.publication_year,
        pages: book.pages,
        why_recommend: book.why_recommend || ['Practical', 'Career', 'Foundation'],
        tags: book.tags || []
      }));
      
      setRecommendations(formattedRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    if (onBookSelect) {
      onBookSelect(book);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Essential': 'from-yellow-500 to-orange-600',
      'Foundational': 'from-blue-500 to-cyan-600',
      'Advanced': 'from-purple-500 to-pink-600',
      'Practical': 'from-green-500 to-emerald-600',
      'Theoretical': 'from-indigo-500 to-purple-600',
      'Recommended': 'from-primary-500 to-blue-600'
    };
    return colors[priority] || 'from-primary-500 to-blue-600';
  };

  const getWhyColor = (why) => {
    const colors = {
      'Career': 'from-orange-500 to-yellow-600',
      'Foundation': 'from-green-500 to-emerald-600',
      'Practical': 'from-blue-500 to-cyan-600',
      'Research': 'from-purple-500 to-pink-600',
      'Reference': 'from-indigo-500 to-purple-600'
    };
    return colors[why] || 'from-gray-600 to-gray-800';
  };

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded-lg mb-6 w-64 mx-auto"></div>
            <div className="h-8 bg-gray-700 rounded-lg mb-4 w-96 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded-lg mb-8 w-3/4 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show recommendations section if no data
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_30%,#ffffff12_2px,transparent_2px)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-yellow-500/30 mb-6 group hover:border-yellow-500/50 transition-all duration-300">
            <div className="relative">
              <FiAward className="text-yellow-300" />
              <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-yellow-200 font-medium tracking-wider">
              PERSONAL PICKS
            </span>
            <FiChevronRight className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Battle-Tested </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
              Recommendations
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Books that have profoundly shaped my understanding of AI and Machine Learning. 
            Each recommendation comes with personal insights and specific use cases.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Featured Book */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {recommendations.map((book, index) => {
                if (index !== activeIndex) return null;
                
                return (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Featured Card */}
                    <div className="relative group">
                      {/* Glow Effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      
                      {/* Main Card */}
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/30 rounded-2xl overflow-hidden backdrop-blur-sm p-8">
                        
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 bg-gradient-to-r ${getPriorityColor(book.priority)} rounded-lg`}>
                                <FiStar className="text-white text-lg" />
                              </div>
                              <span className={`text-sm font-bold bg-gradient-to-r ${getPriorityColor(book.priority)} bg-clip-text text-transparent`}>
                                {book.priority} READING
                              </span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{book.title}</h3>
                            <p className="text-lg text-gray-400">by {book.author}</p>
                          </div>
                          
                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite && toggleFavorite(book.id)}
                            className="relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl hover:border-red-500/50 transition-all duration-300 group/btn"
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
                            <FiHeart 
                              className={`text-xl ${
                                favorites.includes(book.id) 
                                  ? 'fill-red-500 text-red-500 animate-heart-beat' 
                                  : 'text-gray-400 group-hover/btn:text-red-400'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                          
                          {/* Book Image */}
                          <div className="relative overflow-hidden rounded-xl">
                            <img 
                              src={book.image} 
                              alt={book.title}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                            
                            {/* Year Badge */}
                            {book.year && (
                              <div className="absolute bottom-4 left-4">
                                <div className="px-3 py-1.5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg">
                                  <span className="text-sm font-bold text-white">{book.year}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Personal Insights */}
                          <div className="md:col-span-2">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <FiBookOpen className="text-yellow-400" />
                              <span>Why I Recommend It</span>
                            </h4>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                              {book.personal_insight || book.description}
                            </p>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                                  <FiClock className="text-blue-400" />
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">Time to Read</div>
                                  <div className="text-white font-medium">{book.time_to_read}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                                  <FiTrendingUp className="text-green-400" />
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">Skill Level</div>
                                  <div className="text-white font-medium">{book.level}</div>
                                </div>
                              </div>
                            </div>

                            {/* Tags */}
                            {book.why_recommend && book.why_recommend.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {book.why_recommend.map((reason, idx) => (
                                  <span 
                                    key={idx}
                                    className={`px-3 py-1.5 bg-gradient-to-br ${getWhyColor(reason)}/20 border ${getWhyColor(reason).replace('from-', 'border-').replace(' to-', '/30 to-')} text-gray-300 rounded-lg text-xs font-medium`}
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-700/50">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                ${book.price.toFixed(2)}
                              </div>
                              {book.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${book.originalPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <StarRating rating={book.rating} />
                              <span className="text-sm text-gray-400">({book.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleBookClick(book)}
                              className="px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-primary-500/30 transition-all duration-300"
                            >
                              View Details
                            </button>
                            <a
                              href={book.amazonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 group/amazon"
                            >
                              <span>Buy Now</span>
                              <FiChevronRight className="group-hover/amazon:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Right: Recommendations List */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" />
              <span>All Recommendations</span>
            </h3>
            
            {recommendations.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div 
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeIndex === index 
                      ? 'transform scale-105' 
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Selection Indicator */}
                  {activeIndex === index && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full" />
                  )}
                  
                  {/* Card */}
                  <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/30'
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Number Badge */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${
                        activeIndex === index
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{book.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-400 truncate">{book.author}</span>
                          <span className={`text-sm font-bold ${
                            activeIndex === index 
                              ? 'text-yellow-400' 
                              : 'text-gray-500'
                          }`}>
                            ${book.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Actions */}
                    {isHovered === index && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
                        <div className="flex items-center gap-2">
                          <StarRating rating={book.rating} size="sm" showNumber={false} />
                          <span className="text-xs text-gray-500">{book.rating.toFixed(1)}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite && toggleFavorite(book.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <FiHeart className={favorites.includes(book.id) ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative transition-all duration-300 ${
                activeIndex === index ? 'scale-125' : ''
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`} />
              {activeIndex === index && (
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom animations
const RecommendationsStyle = () => (
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
);

export { CoursesBooksRecommendations, RecommendationsStyle };
export default CoursesBooksRecommendations;