import React from 'react';
import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating = 0, size = 'md', showNumber = true, interactive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const getStarColor = (index) => {
    if (interactive && hoverRating > 0) {
      return index < hoverRating
        ? 'from-yellow-400 to-orange-400'
        : 'from-gray-700 to-gray-800';
    }

    if (index < Math.floor(rating)) {
      return 'from-yellow-400 to-orange-400';
    }

    if (index < rating) {
      return 'from-yellow-300 to-yellow-400';
    }

    return 'from-gray-700 to-gray-800';
  };

  return (
    <div className="flex items-center gap-2 group">
      {/* Star Container with Glow Effect */}
      <div className={`flex items-center ${interactive ? 'cursor-pointer' : ''}`}>
        {[...Array(5)].map((_, index) => {
          const currentRating = hoverRating > 0 ? hoverRating : rating;
          const isActive = index < currentRating;
          const isHalfStar = index < currentRating && index + 1 > currentRating;
          const starColor = getStarColor(index);

          return (
            <div
              key={index}
              className="relative group/star"
              onClick={() => handleClick(index + 1)}
              onMouseEnter={() => handleMouseEnter(index + 1)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Star Glow */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${starColor} rounded-full blur-md opacity-0 ${(isActive || hoverRating > index) ? 'opacity-30' : ''
                  } transition-all duration-300`}
              />

              {/* Star Background (for half stars) */}
              {isHalfStar && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <FiStar
                    className={`${sizeClasses[size]} absolute fill-yellow-400 text-yellow-400`}
                  />
                </div>
              )}

              {/* Star Icon */}
              <FiStar
                className={`
                  ${sizeClasses[size]}
                  relative
                  transition-all duration-300
                  ${interactive ? 'hover:scale-125' : ''}
                  ${isActive
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-600 group-hover/star:text-yellow-300'
                  }
                  ${isHalfStar ? 'text-yellow-300' : ''}
                `}
              />

              {/* Interactive Hover Tooltip */}
              {interactive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg text-xs text-white opacity-0 group-hover/star:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Rate {index + 1} star{index !== 0 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating Number with Gradient */}
      {showNumber && (
        <div className="relative">
          {/* Number Background Glow */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${getStarColor(0)} rounded-md blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

          {/* Rating Number */}
          <div className="relative px-3 py-1.5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg group-hover:border-yellow-500/30 transition-all duration-300">
            <span className="text-sm font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 ml-1">/ 5.0</span>
          </div>

          {/* Animated Ring on Hover */}
          <div className="absolute inset-0 border-2 border-yellow-500/0 rounded-lg group-hover:border-yellow-500/30 group-hover:animate-ping-slow transition-all duration-700" />
        </div>
      )}

      {/* Review Count (Optional) */}
      {showNumber && interactive && (
        <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
          Click to rate
        </div>
      )}
    </div>
  );
};

// Custom CSS for ping animation
const StarRatingStyle = () => (
  <style>{`
    @keyframes ping-slow {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      75%, 100% {
        transform: scale(1.1);
        opacity: 0;
      }
    }
    .animate-ping-slow {
      animation: ping-slow 2s ease-in-out infinite;
    }
  `}</style>
);

export { StarRating, StarRatingStyle };
export default StarRating;