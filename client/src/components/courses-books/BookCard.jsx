import React, { useState } from 'react';
import {
  FiHeart,
  FiExternalLink,
  FiBookOpen,
  FiClock,
  FiChevronRight,
  FiEye,
  FiFeather
} from 'react-icons/fi';
import { FaAmazon } from 'react-icons/fa';
import StarRating from './StarRating';

const BookCard = ({
  book,
  index,
  isVisible,
  favorites,
  toggleFavorite,
  onQuickView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getLevelColor = (level) => {
    const colors = {
      'beginner': 'from-green-500 to-emerald-600',
      'intermediate': 'from-blue-500 to-cyan-600',
      'advanced': 'from-purple-500 to-pink-600',
      'expert': 'from-red-500 to-orange-600',
      'practical': 'from-orange-500 to-yellow-600'
    };
    return colors[level?.toLowerCase()] || 'from-gray-600 to-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'from-blue-500 to-cyan-600',
      'Deep Learning': 'from-purple-500 to-pink-600',
      'Data Science': 'from-teal-500 to-emerald-600',
      'Python Programming': 'from-green-500 to-lime-600',
      'Mathematics': 'from-orange-500 to-yellow-600',
      'Statistics': 'from-red-500 to-orange-600',
      'AI Ethics': 'from-indigo-500 to-purple-600',
      'Research Papers': 'from-gray-600 to-gray-800'
    };
    return colors[category] || 'from-blue-500 to-cyan-600';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80';
  };

  return (
    <div
      className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(book.category)} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30 group-hover:scale-[1.02]">

        {/* Image Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Book Image */}
          <img
            src={book.image}
            alt={book.title}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {book.bestseller && (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-30" />
                <span className="relative px-3 py-1.5 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  BESTSELLER
                </span>
              </div>
            )}

            {book.featured && (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30" />
                <span className="relative px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  FEATURED
                </span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(book.id)}
              className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <FiHeart
                className={`relative text-lg ${favorites.includes(book.id)
                    ? 'fill-red-500 text-red-500 animate-heart-beat'
                    : 'text-gray-400 group-hover/btn:text-red-400'
                  }`}
              />
            </button>

            {/* Quick View Button */}
            <button
              onClick={() => onQuickView && onQuickView(book)}
              className="relative p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500" />
              <FiEye className="relative text-lg text-gray-400 group-hover/btn:text-blue-400" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(book.category)} rounded-full blur opacity-30`} />
              <span className={`relative px-3 py-1.5 bg-gradient-to-r ${getCategoryColor(book.category)} text-white text-xs font-semibold rounded-full backdrop-blur-sm`}>
                {book.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title with Hover Effect */}
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
            <FiFeather className="text-blue-400" />
            <span>by {book.author}</span>
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {book.short_description || book.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {book.pages && (
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-blue-400 text-sm" />
                <span className="text-xs text-gray-400">{book.pages} pages</span>
              </div>
            )}
            {book.year && (
              <div className="flex items-center gap-2">
                <FiClock className="text-yellow-400 text-sm" />
                <span className="text-xs text-gray-400">{book.year}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {book.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/50 hover:border-blue-500/30 hover:text-blue-300 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
              {book.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-800/30 text-gray-500 rounded-lg text-xs">
                  +{book.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Rating and Level */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <StarRating rating={book.rating} size="sm" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{book.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({book.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>
            {book.level && (
              <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(book.level)} text-white text-xs font-bold rounded-full backdrop-blur-sm capitalize`}>
                {book.level}
              </div>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div className="flex flex-col">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ${book.price.toFixed(2)}
              </div>
              {book.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${book.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button className="relative group/btn2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur opacity-0 group-hover/btn2:opacity-30 transition-opacity duration-500" />
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 group-hover/btn2:scale-105"
                >
                  <FaAmazon className="text-lg" />
                  <span className="text-sm">Buy Now</span>
                  <FiChevronRight className="group-hover/btn2:translate-x-1 transition-transform" />
                </a>
              </button>
            </div>
          </div>
        </div>

        {/* Hover Effect Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      {/* 3D Floating Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(book.category)} rounded-2xl blur-xl -z-10 transition-all duration-500 ${isHovered ? 'opacity-20 translate-y-2' : 'opacity-0'
        }`} />
    </div>
  );
};

// Add custom animations
const BookCardStyle = () => (
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

export { BookCard, BookCardStyle };
export default BookCard;