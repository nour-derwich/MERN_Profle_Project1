import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiX, 
  FiClock,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiRefreshCw,
  FiCalendar,
  FiCheckCircle,
  FiBookOpen,
  FiStar,
  FiGrid,
  FiList,
  FiHash,
  FiCheck
} from 'react-icons/fi';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { formationService } from '../../services/formationService';

const FormationsFilters = ({
  searchQuery = '',
  setSearchQuery,
  selectedCategory = 'all',
  setSelectedCategory,
  selectedLevel = 'all',
  setSelectedLevel,
  selectedStatus = 'all',
  setSelectedStatus,
  priceRange = 'all',
  setPriceRange,
  sortBy = 'featured',
  setSortBy,
  viewMode = 'grid',
  setViewMode,
  filteredFormations = [],
  onClearFilters,
  onAdvancedFilter
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // State for dynamic data from backend
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch filter data from backend
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const categoriesResponse = await formationService.getCategories();
        if (categoriesResponse.success && Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data.map(cat => ({
            value: cat.category?.toLowerCase().replace(/ /g, '-') || 'unknown',
            label: cat.category || 'Unknown',
            color: getCategoryColor(cat.category),
            count: cat.count || 0
          })));
        }
        
        // Fetch levels
        const levelsResponse = await formationService.getLevels();
        if (levelsResponse.success && Array.isArray(levelsResponse.data)) {
          setLevels(levelsResponse.data.map(level => ({
            value: level.level || 'unknown',
            label: formatLevelLabel(level.level),
            color: getLevelColor(level.level),
            count: level.count || 0
          })));
        }
        
        // Fetch statuses
        const statusesResponse = await formationService.getStatuses();
        if (statusesResponse.success && Array.isArray(statusesResponse.data)) {
          setStatuses(statusesResponse.data.map(status => ({
            value: status.status || 'unknown',
            label: formatStatusLabel(status.status),
            color: getStatusColor(status.status),
            count: status.count || 0
          })));
        }
        
      } catch (error) {
        console.error('Error fetching filter data:', error);
        setDefaultFilterData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  // Helper function to set default filter data if API fails
  const setDefaultFilterData = () => {
    setCategories([
      { value: 'machine-learning', label: 'Machine Learning', color: 'from-primary-500 to-blue-600', count: 0 },
      { value: 'deep-learning', label: 'Deep Learning', color: 'from-purple-500 to-pink-600', count: 0 },
      { value: 'data-science', label: 'Data Science', color: 'from-blue-500 to-cyan-600', count: 0 },
      { value: 'ai-engineering', label: 'AI Engineering', color: 'from-green-500 to-emerald-600', count: 0 },
      { value: 'web-development', label: 'Web Development', color: 'from-orange-500 to-red-600', count: 0 }
    ]);
    
    setLevels([
      { value: 'beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600', count: 0 },
      { value: 'intermediate', label: 'Intermediate', color: 'from-blue-500 to-cyan-600', count: 0 },
      { value: 'advanced', label: 'Advanced', color: 'from-purple-500 to-pink-600', count: 0 },
      { value: 'expert', label: 'Expert', color: 'from-red-500 to-orange-600', count: 0 }
    ]);
    
    setStatuses([
      { value: 'published', label: 'Published', color: 'from-green-500 to-emerald-600', count: 0 },
      { value: 'draft', label: 'Draft', color: 'from-yellow-500 to-orange-600', count: 0 },
      { value: 'enrolling', label: 'Enrolling', color: 'from-blue-500 to-cyan-600', count: 0 },
      { value: 'full', label: 'Full', color: 'from-red-500 to-orange-600', count: 0 },
      { value: 'completed', label: 'Completed', color: 'from-gray-600 to-gray-800', count: 0 }
    ]);
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'from-primary-500 to-blue-600',
      'Deep Learning': 'from-purple-500 to-pink-600',
      'Data Science': 'from-blue-500 to-cyan-600',
      'AI Engineering': 'from-green-500 to-emerald-600',
      'Web Development': 'from-orange-500 to-red-600',
      'Mobile Development': 'from-indigo-500 to-purple-600',
      'Design': 'from-pink-500 to-rose-600',
      'Business': 'from-emerald-500 to-green-600',
      'Marketing': 'from-yellow-500 to-amber-600',
      'default': 'from-gray-500 to-gray-700'
    };
    return colors[category] || colors.default;
  };

  // Helper function to format level label
  const formatLevelLabel = (level) => {
    const labels = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return labels[level] || (level?.charAt(0).toUpperCase() + level?.slice(1)) || 'Unknown';
  };

  // Helper function to get level color
  const getLevelColor = (level) => {
    const colors = {
      'beginner': 'from-green-500 to-emerald-600',
      'intermediate': 'from-blue-500 to-cyan-600',
      'advanced': 'from-purple-500 to-pink-600',
      'expert': 'from-red-500 to-orange-600',
      'default': 'from-gray-500 to-gray-700'
    };
    return colors[level] || colors.default;
  };

  // Helper function to format status label
  const formatStatusLabel = (status) => {
    const labels = {
      'published': 'Published',
      'draft': 'Draft',
      'enrolling': 'Enrolling',
      'full': 'Full',
      'completed': 'Completed',
      'archived': 'Archived'
    };
    return labels[status] || (status?.charAt(0).toUpperCase() + status?.slice(1)) || 'Unknown';
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    const colors = {
      'published': 'from-green-500 to-emerald-600',
      'draft': 'from-yellow-500 to-orange-600',
      'enrolling': 'from-blue-500 to-cyan-600',
      'full': 'from-red-500 to-orange-600',
      'completed': 'from-gray-600 to-gray-800',
      'archived': 'from-gray-600 to-gray-800',
      'default': 'from-gray-500 to-gray-700'
    };
    return colors[status] || colors.default;
  };

  // Create filter arrays with "All" option
  const allCategories = [{ value: 'all', label: 'All Categories', color: 'from-gray-600 to-gray-800', count: 0 }, ...categories];
  const allLevels = [{ value: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800', count: 0 }, ...levels];
  const allStatuses = [{ value: 'all', label: 'All Statuses', color: 'from-gray-600 to-gray-800', count: 0 }, ...statuses];
  
  const allPriceRanges = [
    { id: 'all', label: 'All Prices', range: 'Any price', color: 'from-gray-600 to-gray-800' },
    { id: 'under600', label: 'Under $600', range: '$0 - $600', color: 'from-green-500 to-emerald-600' },
    { id: '600-900', label: '$600 - $900', range: '$600 - $900', color: 'from-blue-500 to-cyan-600' },
    { id: '900-1200', label: '$900 - $1200', range: '$900 - $1200', color: 'from-primary-500 to-indigo-600' },
    { id: 'over1200', label: 'Premium', range: '$1200+', color: 'from-purple-500 to-pink-600' }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured', icon: FiStar },
    { id: 'popular', label: 'Most Popular', icon: FiTrendingUp },
    { id: 'rating', label: 'Highest Rated', icon: FiStar },
    { id: 'recent', label: 'Recently Added', icon: FiCalendar },
    { id: 'price-low', label: 'Price: Low to High', icon: FaSortAmountDown },
    { id: 'price-high', label: 'Price: High to Low', icon: FaSortAmountUpAlt },
    { id: 'duration', label: 'Duration', icon: FiClock }
  ];

  const viewModes = [
    { id: 'grid', label: 'Grid View', icon: FiGrid },
    { id: 'list', label: 'List View', icon: FiList }
  ];

  const advancedFilters = [
    { id: 'hasCertificate', label: 'Certificate', icon: FiCheckCircle },
    { id: 'hasProjects', label: 'With Projects', icon: FiBookOpen },
    { id: 'liveSessions', label: 'Live Sessions', icon: FiUsers },
    { id: 'mentorship', label: 'Mentorship', icon: FiStar },
    { id: 'lifetimeAccess', label: 'Lifetime Access', icon: FiCalendar }
  ];

  const quickFilters = [
    'Beginner Friendly',
    'Project-Based',
    'Career Focused',
    'Free Resources',
    'Certification',
    'Live Mentoring'
  ];

  const handleQuickFilter = (filter) => {
    setSearchQuery(filter);
    setIsSearchFocused(false);
  };

  const getFilterColor = (type, value) => {
    if (value === 'all') return 'from-gray-600 to-gray-800';
    
    const colorMap = {
      category: {
        'machine-learning': 'from-primary-500 to-blue-600',
        'deep-learning': 'from-purple-500 to-pink-600',
        'data-science': 'from-blue-500 to-cyan-600',
        'ai-engineering': 'from-green-500 to-emerald-600',
        'web-development': 'from-orange-500 to-yellow-600'
      },
      level: {
        'beginner': 'from-green-500 to-emerald-600',
        'intermediate': 'from-blue-500 to-cyan-600',
        'advanced': 'from-purple-500 to-pink-600',
        'expert': 'from-red-500 to-orange-600'
      },
      status: {
        'published': 'from-green-500 to-emerald-600',
        'draft': 'from-yellow-500 to-orange-600',
        'enrolling': 'from-blue-500 to-cyan-600',
        'full': 'from-red-500 to-orange-600',
        'completed': 'from-gray-600 to-gray-800'
      }
    };

    return colorMap[type]?.[value] || 'from-primary-500 to-blue-600';
  };

  // Get current filter label
  const getFilterLabel = (type, value) => {
    if (value === 'all') return 'All';
    
    switch (type) {
      case 'category':
        return categories.find(c => c.value === value)?.label || value;
      case 'level':
        return levels.find(l => l.value === value)?.label || value;
      case 'status':
        return statuses.find(s => s.value === value)?.label || value;
      case 'price':
        return allPriceRanges.find(p => p.id === value)?.label || value;
      default:
        return value;
    }
  };

  return (
    <section className="relative py-6 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        
        {/* Modern Search Bar */}
        <div className="relative max-w-3xl mx-auto mb-6">
          <div className="relative group">
            {/* Search Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Search Container */}
            <div className={`relative flex items-center bg-gradient-to-br from-gray-800 to-gray-900 border ${
              isSearchFocused ? 'border-primary-500/50' : 'border-gray-700/50'
            } rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300`}>
              <div className="pl-4 pr-3">
                <FiSearch className={`text-lg ${
                  isSearchFocused ? 'text-primary-400' : 'text-gray-400'
                } transition-colors duration-300`} />
              </div>
              
              <input
                type="text"
                placeholder="Search formations, topics, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="flex-1 px-3 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
              />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-4 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              )}
            </div>

            {/* Quick Filters Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
                >
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-3 px-1">Popular searches</div>
                    <div className="flex flex-wrap gap-2">
                      {quickFilters.map((filter, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickFilter(filter)}
                          className="px-3 py-2 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-sm rounded-lg hover:text-white hover:border-primary-500/30 border border-gray-700/50 transition-all duration-300 hover:scale-105"
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          
          {/* Left: Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                isFiltersExpanded
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
              }`}
              disabled={isLoading}
            >
              <FiFilter className="text-lg" />
              <span className="font-medium">Filters</span>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiChevronDown className={`transition-transform duration-300 ${
                  isFiltersExpanded ? 'rotate-180' : ''
                }`} />
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-1">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                const isActive = viewMode === mode.id;
                
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title={mode.label}
                  >
                    <Icon className="text-lg" />
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="hidden md:flex items-center gap-2">
              <div className="px-3 py-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg">
                <span className="text-gray-300">
                  <span className="text-white font-bold">{filteredFormations.length}</span> formations
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sort & Actions */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30 rounded-xl backdrop-blur-sm transition-all duration-300">
                {(() => {
                  const sortOption = sortOptions.find(opt => opt.id === sortBy);
                  const Icon = sortOption?.icon || FiStar;
                  return (
                    <>
                      <Icon className="text-primary-400" />
                      <span>{sortOption?.label || 'Sort'}</span>
                      <FiChevronDown className="text-sm" />
                    </>
                  );
                })()}
              </button>

              {/* Sort Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = sortBy === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-700/50 last:border-b-0 transition-all duration-300 ${
                        isActive
                          ? 'text-primary-400 bg-primary-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className={isActive ? 'text-primary-400' : 'text-gray-500'} />
                      <span className="flex-1 text-left">{option.label}</span>
                      {isActive && <FiChevronDown className="text-primary-400 rotate-180 text-sm" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedLevel !== 'all' || selectedStatus !== 'all' || priceRange !== 'all' || searchQuery) && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-red-500/30 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <FiRefreshCw className="text-sm" />
                <span className="font-medium">Clear</span>
              </button>
            )}

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                showAdvanced
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-purple-500/30'
              }`}
            >
              <FiHash className="text-sm" />
              <span className="font-medium">Advanced</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters Panel */}
        <AnimatePresence>
          {isFiltersExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Category Filter */}
                    <div>
                      <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <FiHash className="text-primary-400" />
                        <span>Category</span>
                      </div>
                      <div className="space-y-2">
                        {allCategories.map((category) => {
                          const isActive = selectedCategory === category.value;
                          return (
                            <button
                              key={category.value}
                              onClick={() => setSelectedCategory(category.value)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                                isActive
                                  ? `bg-gradient-to-r ${getFilterColor('category', category.value)} text-white`
                                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-sm">{category.label}</span>
                                {category.count > 0 && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    isActive ? 'bg-white/20' : 'bg-gray-700/50'
                                  }`}>
                                    {category.count}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Level Filter */}
                    <div>
                      <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <FiTrendingUp className="text-blue-400" />
                        <span>Level</span>
                      </div>
                      <div className="space-y-2">
                        {allLevels.map((level) => {
                          const isActive = selectedLevel === level.value;
                          return (
                            <button
                              key={level.value}
                              onClick={() => setSelectedLevel(level.value)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                                isActive
                                  ? `bg-gradient-to-r ${getFilterColor('level', level.value)} text-white`
                                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/30'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-sm">{level.label}</span>
                                {level.count > 0 && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    isActive ? 'bg-white/20' : 'bg-gray-700/50'
                                  }`}>
                                    {level.count}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <FiClock className="text-green-400" />
                        <span>Status</span>
                      </div>
                      <div className="space-y-2">
                        {allStatuses.map((status) => {
                          const isActive = selectedStatus === status.value;
                          return (
                            <button
                              key={status.value}
                              onClick={() => setSelectedStatus(status.value)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                                isActive
                                  ? `bg-gradient-to-r ${getFilterColor('status', status.value)} text-white`
                                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-green-500/30'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-sm">{status.label}</span>
                                {status.count > 0 && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    isActive ? 'bg-white/20' : 'bg-gray-700/50'
                                  }`}>
                                    {status.count}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <FiDollarSign className="text-yellow-400" />
                        <span>Price Range</span>
                      </div>
                      <div className="space-y-2">
                        {allPriceRanges.map((range) => {
                          const isActive = priceRange === range.id;
                          return (
                            <button
                              key={range.id}
                              onClick={() => setPriceRange(range.id)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group ${
                                isActive
                                  ? `bg-gradient-to-r ${range.color} text-white`
                                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-yellow-500/30'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{range.label}</span>
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                  {range.range}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-700/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FiHash className="text-purple-400" />
                    <span className="text-sm font-semibold text-purple-400">Advanced Filters</span>
                  </div>
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {advancedFilters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => onAdvancedFilter && onAdvancedFilter(filter.id)}
                        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-purple-500/30 rounded-lg transition-all duration-300 group"
                      >
                        <div className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center group-hover:border-purple-500">
                          <FiCheck className="text-xs opacity-0 group-hover:opacity-100 text-purple-400" />
                        </div>
                        <Icon className="text-lg text-purple-500" />
                        <span className="text-sm flex-1 text-left">{filter.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedLevel !== 'all' || selectedStatus !== 'all' || priceRange !== 'all' || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="text-xs text-gray-500 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/30 text-primary-300 rounded-lg text-sm">
                  <FiSearch className="text-xs" />
                  <span>"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 text-primary-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 text-gray-300 rounded-lg text-sm">
                  <span>{getFilterLabel('category', selectedCategory)}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 text-gray-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedLevel !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm">
                  <FiTrendingUp className="text-xs" />
                  <span>{getFilterLabel('level', selectedLevel)}</span>
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className="ml-1 text-blue-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedStatus !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
                  <FiClock className="text-xs" />
                  <span>{getFilterLabel('status', selectedStatus)}</span>
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className="ml-1 text-green-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {priceRange !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg text-sm">
                  <FiDollarSign className="text-xs" />
                  <span>{getFilterLabel('price', priceRange)}</span>
                  <button
                    onClick={() => setPriceRange('all')}
                    className="ml-1 text-yellow-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FormationsFilters;