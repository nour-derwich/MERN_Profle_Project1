import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiChevronDown, FiX, 
  FiStar, FiTrendingUp, FiClock, FiDollarSign,
  FiBookOpen, FiCheck, FiGrid, FiList,
  FiRefreshCw, FiHash, FiLoader
} from 'react-icons/fi';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';
import axios from 'axios';

const CoursesBooksFilters = ({
  searchQuery = '',
  setSearchQuery,
  selectedCategory = 'all',
  setSelectedCategory,
  selectedLevel = 'all',
  setSelectedLevel,
  priceRange = 'all',
  setPriceRange,
  sortBy = 'featured',
  setSortBy,
  viewMode = 'grid',
  setViewMode,
  categories = [],
  filteredBooks = [],   
  onClearFilters
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [levels, setLevels] = useState([]);
  const [loadingLevels, setLoadingLevels] = useState(false);

  // Fetch levels from backend on component mount
  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoadingLevels(true);
      const response = await axios.get('/api/courses/levels');
      const levelsData = response.data.data || [];
      
      // Format levels for frontend
      const formattedLevels = [
        { id: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
        ...levelsData.map(level => {
          const levelLower = level.toLowerCase();
          let color = 'from-gray-600 to-gray-800';
          
          switch(levelLower) {
            case 'beginner':
              color = 'from-green-500 to-emerald-600';
              break;
            case 'intermediate':
              color = 'from-blue-500 to-cyan-600';
              break;
            case 'advanced':
              color = 'from-purple-500 to-pink-600';
              break;
            case 'expert':
              color = 'from-red-500 to-orange-600';
              break;
            default:
              color = 'from-gray-600 to-gray-800';
          }
          
          return {
            id: level,
            label: level.charAt(0).toUpperCase() + level.slice(1),
            color: color
          };
        })
      ];
      
      setLevels(formattedLevels);
    } catch (error) {
      console.error('Error fetching levels:', error);
      // Fallback to default levels
      setLevels([
        { id: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
        { id: 'beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600' },
        { id: 'intermediate', label: 'Intermediate', color: 'from-blue-500 to-cyan-600' },
        { id: 'advanced', label: 'Advanced', color: 'from-purple-500 to-pink-600' },
        { id: 'expert', label: 'Expert', color: 'from-red-500 to-orange-600' }
      ]);
    } finally {
      setLoadingLevels(false);
    }
  };

  const priceRanges = [
    { id: 'all', label: 'All Prices', range: 'Any price' },
    { id: 'under40', label: 'Under $40', range: '$0 - $40' },
    { id: '40-80', label: '$40 - $80', range: '$40 - $80' },
    { id: '80-120', label: '$80 - $120', range: '$80 - $120' },
    { id: 'over120', label: 'Premium', range: '$120+' }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured', icon: FiStar },
    { id: 'popular', label: 'Most Popular', icon: FiTrendingUp },
    { id: 'rating', label: 'Highest Rated', icon: FiStar },
    { id: 'recent', label: 'Recently Added', icon: FiClock },
    { id: 'price-low', label: 'Price: Low to High', icon: FaSortAmountDown },
    { id: 'price-high', label: 'Price: High to Low', icon: FaSortAmountUpAlt }
  ];

  const viewModes = [
    { id: 'grid', label: 'Grid View', icon: FiGrid },
    { id: 'list', label: 'List View', icon: FiList }
  ];

  const advancedFilters = [
    { id: 'hasExercises', label: 'With Exercises' },
    { id: 'hasCode', label: 'Includes Code' },
    { id: 'hasVideo', label: 'Video Content' },
    { id: 'hasCertificate', label: 'Offers Certificate' },
    { id: 'recommended', label: 'Personal Recommendation' }
  ];

  // Handle quick filter suggestions
  const handleQuickFilter = (filter) => {
    setSearchQuery(filter);
    // Optionally trigger search immediately
    // You might want to add a debounce or handle this in parent
  };

  return (
    <section className="relative py-6 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        
        {/* Search Bar - Modern Design */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="relative group">
            {/* Search Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Search Container */}
            <div className="relative flex items-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm group-hover:border-blue-500/30 transition-all duration-300">
              <div className="pl-4 pr-3">
                <FiSearch className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              
              <input
                type="text"
                placeholder="Search books, authors, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-4 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="text-sm" />
                </button>
              )}
              
              {/* Search Suggestions */}
              <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-50">
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-2 px-2">Quick filters</div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleQuickFilter('Machine Learning')}
                      className="px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-xs rounded-lg hover:text-white hover:border-blue-500/30 border border-gray-700/50 transition-all duration-300"
                    >
                      Machine Learning
                    </button>
                    <button 
                      onClick={() => handleQuickFilter('Python')}
                      className="px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-xs rounded-lg hover:text-white hover:border-blue-500/30 border border-gray-700/50 transition-all duration-300"
                    >
                      Python
                    </button>
                    <button 
                      onClick={() => handleQuickFilter('Deep Learning')}
                      className="px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-xs rounded-lg hover:text-white hover:border-blue-500/30 border border-gray-700/50 transition-all duration-300"
                    >
                      Deep Learning
                    </button>
                    <button 
                      onClick={() => handleQuickFilter('Data Science')}
                      className="px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-xs rounded-lg hover:text-white hover:border-blue-500/30 border border-gray-700/50 transition-all duration-300"
                    >
                      Data Science
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          
          {/* Left: Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                isFiltersExpanded
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/30'
              }`}
            >
              <FiFilter className={isFiltersExpanded ? 'text-white' : 'text-gray-400'} />
              <span className="font-medium">Filters</span>
              <FiChevronDown className={`transition-transform duration-300 ${
                isFiltersExpanded ? 'rotate-180' : ''
              }`} />
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
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400'
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
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="px-3 py-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg">
                <span className="text-gray-300">
                  <span className="text-white font-bold">{filteredBooks.length}</span> results
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sort & Actions */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/30 rounded-xl backdrop-blur-sm transition-all duration-300">
                {(() => {
                  const sortOption = sortOptions.find(opt => opt.id === sortBy);
                  const Icon = sortOption?.icon || FiStar;
                  return (
                    <>
                      <Icon className="text-blue-400" />
                      <span>{sortOption?.label || 'Sort'}</span>
                      <FiChevronDown className="text-xs" />
                    </>
                  );
                })()}
              </button>

              {/* Sort Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = sortBy === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-700/50 last:border-b-0 transition-all duration-300 ${
                        isActive
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className={isActive ? 'text-blue-400' : 'text-gray-500'} />
                      <span className="flex-1 text-left">{option.label}</span>
                      {isActive && <FiCheck className="text-blue-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedLevel !== 'all' || priceRange !== 'all' || searchQuery) && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-red-500/30 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <FiRefreshCw className="text-sm" />
                <span className="font-medium">Clear</span>
              </button>
            )}

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
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
        {isFiltersExpanded && (
          <div className="mt-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl backdrop-blur-sm animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Category Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-400">Category</div>
                  {loadingCategories && (
                    <FiLoader className="text-gray-500 animate-spin text-sm" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      onMouseEnter={() => setActiveFilter(`category-${category.value}`)}
                      onMouseLeave={() => setActiveFilter(null)}
                      className={`group relative px-3 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                          : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/30'
                      }`}
                    >
                      <span className="text-sm">{category.label}</span>
                      <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-0 ${
                        selectedCategory === category.value ? 'opacity-20' : 'group-hover:opacity-10'
                      } transition-opacity duration-500`} />
                    </button>
                  ))}
                  {categories.length === 0 && !loadingCategories && (
                    <p className="text-sm text-gray-500">No categories available</p>
                  )}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-400">Level</div>
                  {loadingLevels && (
                    <FiLoader className="text-gray-500 animate-spin text-sm" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      onMouseEnter={() => setActiveFilter(`level-${level.id}`)}
                      onMouseLeave={() => setActiveFilter(null)}
                      className={`group relative px-3 py-2 rounded-lg transition-all duration-300 ${
                        selectedLevel === level.id
                          ? `bg-gradient-to-r ${level.color} text-white`
                          : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600/50'
                      }`}
                    >
                      <span className="text-sm">{level.label}</span>
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${level.color} rounded-lg blur opacity-0 ${
                        selectedLevel === level.id ? 'opacity-20' : 'group-hover:opacity-10'
                      } transition-opacity duration-500`} />
                    </button>
                  ))}
                  {levels.length === 0 && !loadingLevels && (
                    <p className="text-sm text-gray-500">Loading levels...</p>
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="text-sm font-semibold text-gray-400 mb-3">Price Range</div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      onMouseEnter={() => setActiveFilter(`price-${range.id}`)}
                      onMouseLeave={() => setActiveFilter(null)}
                      className={`group relative px-3 py-2 rounded-lg transition-all duration-300 ${
                        priceRange === range.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-green-500/30'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm">{range.label}</span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-300">
                          {range.range}
                        </span>
                      </div>
                      <div className={`absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-0 ${
                        priceRange === range.id ? 'opacity-20' : 'group-hover:opacity-10'
                      } transition-opacity duration-500`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <div className="mt-4 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-700/30 rounded-xl backdrop-blur-sm animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-purple-400">Advanced Filters</div>
              <button
                onClick={() => setShowAdvanced(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="text-sm" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {advancedFilters.map((filter) => (
                <button
                  key={filter.id}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-purple-500/30 rounded-lg transition-all duration-300"
                >
                  <div className="w-4 h-4 border border-gray-600 rounded flex items-center justify-center">
                    <FiCheck className="text-xs opacity-0" />
                  </div>
                  <span className="text-sm">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedLevel !== 'all' || priceRange !== 'all' || searchQuery) && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm">
                  <span>{categories.find(c => c.value === selectedCategory)?.label || selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 text-blue-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedLevel !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 text-gray-300 rounded-lg text-sm">
                  <span>{levels.find(l => l.id === selectedLevel)?.label || selectedLevel}</span>
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className="ml-1 text-gray-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {priceRange !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
                  <FiDollarSign className="text-xs" />
                  <span>{priceRanges.find(p => p.id === priceRange)?.label}</span>
                  <button
                    onClick={() => setPriceRange('all')}
                    className="ml-1 text-green-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {searchQuery && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm">
                  <FiSearch className="text-xs" />
                  <span>"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 text-purple-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default CoursesBooksFilters;