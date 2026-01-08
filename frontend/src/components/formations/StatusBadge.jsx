import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

const StatusBadge = ({
  status,
  spotsLeft = null,
  startDate = null,
  size = "md",
  showIcon = true,
  showCountdown = false,
  interactive = false,
  onStatusClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const sizeConfig = {
    sm: {
      text: "text-xs",
      padding: "px-2 py-1",
      iconSize: "text-xs",
      countdown: "text-xs",
    },
    md: {
      text: "text-sm",
      padding: "px-3 py-1.5",
      iconSize: "text-sm",
      countdown: "text-xs",
    },
    lg: {
      text: "text-base",
      padding: "px-4 py-2",
      iconSize: "text-base",
      countdown: "text-sm",
    },
  };

  const statusConfigs = {
    upcoming: {
      gradient: "from-blue-500 to-cyan-600",
      icon: FiCalendar,
      text: "Upcoming",
      description: "Registration opens soon",
      glow: "from-blue-500/30 to-cyan-500/30",
    },
    enrolling: {
      gradient: "from-green-500 to-emerald-600",
      icon: FiUsers,
      text: "Enrolling Now",
      description: "Limited spots available",
      glow: "from-green-500/30 to-emerald-500/30",
    },
    full: {
      gradient: "from-red-500 to-orange-600",
      icon: FiAlertCircle,
      text: "Fully Booked",
      description: "Waitlist available",
      glow: "from-red-500/30 to-orange-500/30",
    },
    soon: {
      gradient: "from-purple-500 to-pink-600",
      icon: FiClock,
      text: "Coming Soon",
      description: "Launching shortly",
      glow: "from-purple-500/30 to-pink-500/30",
    },
    ongoing: {
      gradient: "from-primary-500 to-indigo-600",
      icon: FiTrendingUp,
      text: "In Progress",
      description: "Live sessions ongoing",
      glow: "from-primary-500/30 to-indigo-500/30",
    },
    completed: {
      gradient: "from-gray-600 to-gray-800",
      icon: FiCheckCircle,
      text: "Completed",
      description: "Access recordings",
      glow: "from-gray-500/30 to-gray-700/30",
    },
    featured: {
      gradient: "from-yellow-500 to-orange-600",
      icon: FiStar,
      text: "Featured",
      description: "Highly recommended",
      glow: "from-yellow-500/30 to-orange-500/30",
    },
    limited: {
      gradient: "from-orange-500 to-yellow-600",
      icon: FiAlertTriangle,
      text: "Limited Spots",
      description: "Almost full",
      glow: "from-orange-500/30 to-yellow-500/30",
    },
  };

  const config = statusConfigs[status] || statusConfigs.upcoming;
  const Icon = config.icon;
  const sizeProps = sizeConfig[size];

  // Calculate countdown if startDate is provided
  useEffect(() => {
    if (startDate && showCountdown) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const target = new Date(startDate);
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );

          if (days > 0) {
            setTimeLeft(`${days}d ${hours}h`);
          } else if (hours > 0) {
            setTimeLeft(`${hours}h ${minutes}m`);
          } else {
            setTimeLeft(`${minutes}m`);
          }
        } else {
          setTimeLeft("Started");
        }
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [startDate, showCountdown]);

  const handleClick = () => {
    if (interactive && onStatusClick) {
      onStatusClick(status);
    }
    if (spotsLeft !== null) {
      setIsExpanded(!isExpanded);
    }
  };

  const getSpotsColor = (spots) => {
    if (spots === null || spots === undefined)
      return "from-gray-600 to-gray-800";
    if (spots <= 5) return "from-red-500 to-orange-600";
    if (spots <= 15) return "from-orange-500 to-yellow-600";
    if (spots <= 30) return "from-blue-500 to-cyan-600";
    return "from-green-500 to-emerald-600";
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main Badge */}
      <motion.div
        whileHover={interactive ? { scale: 1.05 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={`relative cursor-${interactive ? "pointer" : "default"} group`}
      >
        {/* Glow Effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r ${config.glow} rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
        />

        {/* Badge Container */}
        <div
          className={`relative bg-gradient-to-r ${config.gradient} ${sizeProps.padding} rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}
        >
          <div className="flex items-center gap-2">
            {/* Icon */}
            {showIcon && (
              <Icon className={`${sizeProps.iconSize} text-white`} />
            )}

            {/* Text */}
            <span
              className={`${sizeProps.text} font-bold text-white whitespace-nowrap`}
            >
              {config.text}
            </span>

            {/* Spots Counter */}
            {spotsLeft !== null && spotsLeft > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-white/50" />
                <span className={`${sizeProps.text} font-bold text-white`}>
                  {spotsLeft} left
                </span>
              </div>
            )}

            {/* Countdown Timer */}
            {timeLeft && showCountdown && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/30">
                <FiClock className={`${sizeProps.iconSize} text-white/80`} />
                <span
                  className={`${sizeProps.countdown} font-medium text-white/90`}
                >
                  {timeLeft}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Arrow */}
          {interactive && (
            <FiChevronRight
              className={`absolute -right-2 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
            />
          )}
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {isHovered && config.description && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="relative">
                {/* Tooltip Triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />

                {/* Tooltip Content */}
                <div className="px-3 py-2 bg-gray-800 border border-gray-700/50 rounded-lg backdrop-blur-sm">
                  <div className="text-xs text-white font-medium whitespace-nowrap">
                    {config.description}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {isExpanded && spotsLeft !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsExpanded(false)}
            />

            {/* Details Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-full left-0 mt-2 z-50 w-64"
            >
              <div className="relative">
                {/* Card Glow */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${getSpotsColor(spotsLeft)} rounded-xl blur-md opacity-30`}
                />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="absolute -top-2 -right-2 p-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="text-sm" />
                  </button>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-gradient-to-r ${getSpotsColor(spotsLeft)} rounded-lg`}
                    >
                      <Icon className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{config.text}</div>
                      <div className="text-xs text-gray-400">
                        {config.description}
                      </div>
                    </div>
                  </div>

                  {/* Spots Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Available Spots:
                      </span>
                      <span
                        className={`text-lg font-bold bg-gradient-to-r ${getSpotsColor(spotsLeft)} bg-clip-text text-transparent`}
                      >
                        {spotsLeft}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (spotsLeft / 50) * 100)}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute inset-0 bg-gradient-to-r ${getSpotsColor(spotsLeft)}`}
                      />
                    </div>

                    {/* Status Message */}
                    <div className="text-xs text-gray-500 text-center pt-2">
                      {spotsLeft <= 5
                        ? "Almost full!"
                        : spotsLeft <= 15
                          ? "Limited availability"
                          : "Good availability"}
                    </div>
                  </div>

                  {/* Action Button */}
                  {status === "enrolling" && (
                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add missing FiCheck icon component
const FiCheck = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);
console.log(FiCheck);

export default StatusBadge;
