import React from 'react';
import { 
  FiUsers, 
  FiBook, 
  FiDollarSign, 
  FiMail, 
  FiTrendingUp, 
  FiTrendingDown,
  FiEye,
  FiShoppingCart,
  FiDownload,
  FiStar,
  FiCalendar,
  FiActivity
} from 'react-icons/fi';

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, // New: numeric trend value for better control
  trendLabel = 'from last month',
  loading = false,
  onClick,
  compact = false,
  currency,
  percentage,
  description,
  badge,
  className = ''
}) => {
  // Enhanced icon mapping
  const getIcon = () => {
    const iconMap = {
      users: FiUsers,
      courses: FiBook,
      revenue: FiDollarSign,
      messages: FiMail,
      views: FiEye,
      sales: FiShoppingCart,
      downloads: FiDownload,
      rating: FiStar,
      events: FiCalendar,
      activity: FiActivity
    };
    const IconComponent = iconMap[icon] || FiActivity;
    return <IconComponent className={compact ? "text-2xl" : "text-3xl"} />;
  };

  // Calculate trend data
  const getTrendData = () => {
    if (trendValue !== undefined) {
      return {
        value: trendValue,
        isPositive: trendValue >= 0,
        display: trend || `${trendValue > 0 ? '+' : ''}${trendValue}%`
      };
    }
    
    if (trend) {
      const numericTrend = parseFloat(trend.replace(/[^0-9.-]/g, ''));
      return {
        value: numericTrend,
        isPositive: numericTrend >= 0,
        display: trend
      };
    }
    
    return null;
  };

  const trendData = getTrendData();
  const TrendIcon = trendData?.isPositive ? FiTrendingUp : FiTrendingDown;

  // Enhanced gradient mapping
  const getGradient = () => {
    const gradients = {
      users: 'from-purple-500 to-indigo-600',
      courses: 'from-teal-500 to-cyan-600',
      revenue: 'from-emerald-500 to-green-600',
      messages: 'from-pink-500 to-rose-600',
      views: 'from-blue-500 to-cyan-600',
      sales: 'from-orange-500 to-amber-600',
      downloads: 'from-violet-500 to-purple-600',
      rating: 'from-yellow-500 to-amber-600',
      events: 'from-red-500 to-pink-600',
      activity: 'from-indigo-500 to-blue-600'
    };
    return gradients[icon] || 'from-gray-500 to-gray-600';
  };

  // Format value with currency/percentage
  const formatValue = (val) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(val);
    }
    if (percentage) {
      return `${val}%`;
    }
    return val;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${compact ? 'p-4' : 'p-6'} ${className}`}
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 ${
        compact ? 'w-20 h-20 -translate-y-10 translate-x-10' : 'w-32 h-32 -translate-y-16 translate-x-16'
      } bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`} />
      
      <div className="relative">
        <div className="flex justify-between items-start">
          {/* Content */}
          <div className="flex-1 z-10">
            {/* Title and Badge */}
            <div className="flex items-center space-x-2 mb-2">
              <p className={`text-gray-500 font-semibold uppercase tracking-wider ${
                compact ? 'text-xs' : 'text-sm'
              }`}>
                {title}
              </p>
              {badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  badge.type === 'success' ? 'bg-green-100 text-green-700' :
                  badge.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  badge.type === 'error' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {badge.text}
                </span>
              )}
            </div>

            {/* Value */}
            <h3 className={`font-bold text-gray-900 mb-1 ${
              compact ? 'text-2xl' : 'text-4xl'
            }`}>
              {formatValue(value)}
            </h3>

            {/* Description */}
            {description && (
              <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'} mb-2`}>
                {description}
              </p>
            )}

            {/* Trend */}
            {trendData && (
              <div className="flex items-center space-x-2 mt-3">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                  trendData.isPositive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <TrendIcon className={compact ? "text-xs" : "text-sm"} />
                  <span className={`font-bold ${compact ? 'text-xs' : 'text-sm'}`}>
                    {trendData.display}
                  </span>
                </div>
                <span className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
                  {trendLabel}
                </span>
              </div>
            )}
          </div>

          {/* Icon with gradient background */}
          <div className={`relative z-10 ${
            compact ? 'p-3 rounded-xl' : 'p-4 rounded-2xl'
          } bg-gradient-to-br ${getGradient()} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <div className="text-white">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Progress bar decoration */}
        {trendData && !compact && (
          <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out`}
              style={{ 
                width: `${Math.min(Math.abs(trendData.value) * 2 + 20, 100)}%` 
              }}
            />
          </div>
        )}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000" />

      {/* Click indicator */}
      {onClick && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-current text-gray-400 rounded-full" />
        </div>
      )}
    </div>
  );
};

// Additional specialized card components
export const StatsCard = (props) => (
  <DashboardCard {...props} />
);

export const MetricCard = ({ icon, title, value, previousValue, ...props }) => {
  const trendValue = previousValue !== undefined 
    ? ((value - previousValue) / previousValue * 100).toFixed(1)
    : undefined;

  return (
    <DashboardCard
      icon={icon}
      title={title}
      value={value}
      trendValue={trendValue}
      trendLabel="vs previous period"
      percentage={props.percentage}
      {...props}
    />
  );
};

export const KpiCard = ({ target, current, ...props }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isOnTarget = percentage >= 90;
  
  return (
    <DashboardCard
      value={current}
      percentage={props.showPercentage}
      trendValue={percentage - 100}
      trendLabel={`of ${target} target`}
      badge={
        isOnTarget 
          ? { text: 'On Track', type: 'success' }
          : { text: 'Needs Attention', type: 'warning' }
      }
      {...props}
    />
  );
};

export default DashboardCard;