import React, { useState } from 'react';
import { 
  FiFilter, 
  FiSearch, 
  FiChevronDown, 
  FiX, 
  FiTrendingUp,
  FiClock,
  FiStar,
  FiCode,
  FiLayers,
  FiZap,
  FiRefreshCw,
  FiGrid,
  FiList,
  FiHash,
  FiEye,
  FiBookmark,
  FiShare2
} from 'react-icons/fi';
import { FaPython, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Add missing FiDatabase icon
const FiDatabase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
  </svg>
);

const ProjectsFilters = ({
  categories = [],
  selectedCategory = 'all',
  setSelectedCategory,
  selectedComplexity = 'all',
  setSelectedComplexity,
  selectedStatus = 'all',
  setSelectedStatus,
  sortBy = 'featured',
  setSortBy,
  viewMode = 'grid',
  setViewMode,
  searchQuery = '',
  setSearchQuery,
  filteredProjects = [],
  onClearFilters,
  onAdvancedFilter,
  setCurrentPage = () => {},
  showBookmarks = false,
  toggleBookmark,
  bookmarks = [],
  isLoading = false
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Default categories matching your project data
  const defaultCategories = [
    { value: 'all', label: 'All Projects', icon: FiLayers, color: 'from-gray-600 to-gray-800', count: Array.isArray(filteredProjects) ? filteredProjects.length : 0 },
    { value: 'Machine Learning', label: 'Machine Learning', icon: FiTrendingUp, color: 'from-primary-500 to-blue-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'Machine Learning').length : 0 },
    { value: 'Deep Learning', label: 'Deep Learning', icon: FiCode, color: 'from-purple-500 to-pink-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'Deep Learning').length : 0 },
    { value: 'Data Science', label: 'Data Science', icon: FiDatabase, color: 'from-blue-500 to-cyan-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'Data Science').length : 0 },
    { value: 'Web Apps', label: 'Web Apps', icon: FaReact, color: 'from-cyan-500 to-blue-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'Web Apps').length : 0 },
    { value: 'APIs', label: 'APIs', icon: FaNodeJs, color: 'from-green-500 to-emerald-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'APIs').length : 0 },
    { value: 'Computer Vision', label: 'Computer Vision', icon: FiEye, color: 'from-blue-500 to-cyan-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'Computer Vision').length : 0 },
    { value: 'AI Finance', label: 'AI Finance', icon: FiTrendingUp, color: 'from-teal-500 to-emerald-600', count: Array.isArray(filteredProjects) ? filteredProjects.filter(p => p.category === 'AI Finance').length : 0 }
  ];

  const allCategories = categories.length > 0 ? [
    { value: 'all', label: 'All Projects', icon: FiLayers, color: 'from-gray-600 to-gray-800', count: Array.isArray(filteredProjects) ? filteredProjects.length : 0 },
    ...categories
  ] : defaultCategories;

  const complexities = [
    { id: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
    { id: 'Beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600' },
    { id: 'Intermediate', label: 'Intermediate', color: 'from-blue-500 to-cyan-600' },
    { id: 'Advanced', label: 'Advanced', color: 'from-purple-500 to-pink-600' },
    { id: 'Expert', label: 'Expert', color: 'from-red-500 to-orange-600' }
  ];

  const statuses = [
    { id: 'all', label: 'All Statuses', color: 'from-gray-600 to-gray-800' },
    { id: 'completed', label: 'Completed', color: 'from-green-500 to-emerald-600' },
    { id: 'published', label: 'Published', color: 'from-green-500 to-emerald-600' },
    { id: 'in-progress', label: 'In Progress', color: 'from-blue-500 to-cyan-600' },
    { id: 'draft', label: 'Draft', color: 'from-blue-500 to-cyan-600' },
    { id: 'maintained', label: 'Maintained', color: 'from-yellow-500 to-orange-600' },
    { id: 'archived', label: 'Archived', color: 'from-gray-600 to-gray-800' }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured', icon: FiStar },
    { id: 'recent', label: 'Most Recent', icon: FiClock },
    { id: 'complexity', label: 'Complexity', icon: FiTrendingUp },
    { id: 'popular', label: 'Most Popular', icon: FiStar },
    { id: 'alphabetical', label: 'Alphabetical', icon: FiHash }
  ];

  const viewModes = [
    { id: 'grid', label: 'Grid View', icon: FiGrid },
    { id: 'list', label: 'List View', icon: FiList },
    { id: 'compact', label: 'Compact View', icon: FiLayers }
  ];

  const advancedFilters = [
    { id: 'hasDemo', label: 'Live Demo', icon: FiEye },
    { id: 'hasCode', label: 'Source Code', icon: FiCode },
    { id: 'hasDocs', label: 'Documentation', icon: FiBookmark },
    { id: 'hasApi', label: 'API Available', icon: FiDatabase },
    { id: 'opensource', label: 'Open Source', icon: FiShare2 }
  ];

  const techQuickFilters = [
    'Python', 'TensorFlow', 'PyTorch', 'React', 'FastAPI', 
    'Docker', 'PostgreSQL', 'MongoDB', 'AWS', 'GitHub'
  ];

  const handleQuickFilter = (tech) => {
    setSearchQuery(tech);
    setIsSearchFocused(false);
  };

  const getFilterColor = (type, value) => {
    if (value === 'all') return 'from-gray-600 to-gray-800';
    
    const colorMap = {
      category: {
        // Real categories from your projects
        'Machine Learning': 'from-primary-500 to-blue-600',
        'Deep Learning': 'from-purple-500 to-pink-600',
        'Computer Vision': 'from-blue-500 to-cyan-600',
        'Data Science': 'from-green-500 to-emerald-600',
        'Web Apps': 'from-cyan-500 to-blue-600',
        'APIs': 'from-green-500 to-emerald-600',
        'AI Finance': 'from-teal-500 to-emerald-600',
        'NLP': 'from-green-500 to-emerald-600',
        'default': 'from-primary-500 to-blue-600'
      },
      complexity: {
        'Beginner': 'from-green-500 to-emerald-600',
        'Intermediate': 'from-blue-500 to-cyan-600',
        'Advanced': 'from-purple-500 to-pink-600',
        'Expert': 'from-red-500 to-orange-600'
      },
      status: {
        'completed': 'from-green-500 to-emerald-600',
        'published': 'from-green-500 to-emerald-600',
        'in-progress': 'from-blue-500 to-cyan-600',
        'draft': 'from-blue-500 to-cyan-600',
        'maintained': 'from-yellow-500 to-orange-600',
        'archived': 'from-gray-600 to-gray-800'
      }
    };

    return colorMap[type]?.[value] || colorMap[type]?.default || 'from-primary-500 to-blue-600';
  };

  if (isLoading) {
    return (
      <section className="relative py-6 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            <div className="h-16 bg-gray-700/50 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

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
                placeholder="Search projects, technologies, or keywords..."
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

            {/* Tech Quick Filters */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
                >
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-3 px-1">Popular technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {techQuickFilters.map((tech, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickFilter(tech)}
                          className="px-3 py-2 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 text-sm rounded-lg hover:text-white hover:border-primary-500/30 border border-gray-700/50 transition-all duration-300 hover:scale-105"
                        >
                          {tech}
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
            >
              <FiFilter className="text-lg" />
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
                  <span className="text-white font-bold">{Array.isArray(filteredProjects) ? filteredProjects.length : 0}</span> projects
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sort & Actions */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                {(() => {
                  const sortOption = sortOptions.find(opt => opt.id === sortBy);
                  const Icon = sortOption?.icon || FiStar;
                  return (
                    <>
                      <Icon className="text-primary-400" />
                      <span>{sortOption?.label || 'Sort'}</span>
                      <FiChevronDown className={`text-sm transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`} />
                    </>
                  );
                })()}
              </button>

              {/* Sort Dropdown Menu */}
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl z-50"
                  >
                    {sortOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = sortBy === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-700/50 last:border-b-0 transition-all duration-300 ${
                            isActive
                              ? 'text-primary-400 bg-primary-500/10'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                          }`}
                        >
                          <Icon className={isActive ? 'text-primary-400' : 'text-gray-500'} />
                          <span className="flex-1 text-left">{option.label}</span>
                          {isActive && <div className="w-2 h-2 rounded-full bg-primary-400" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedStatus !== 'all' || searchQuery) && (
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

        {/* Category Filter Buttons */}
        <div className="flex overflow-x-auto gap-3 py-3 mb-4 scrollbar-hide">
          {allCategories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            
            return (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1);
                }}
                className={`relative group flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'scale-105' : ''
                }`}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${getFilterColor('category', category.value)} rounded-xl blur opacity-0 ${
                  isActive ? 'opacity-30' : 'group-hover:opacity-20'
                } transition-opacity duration-500`} />
                
                {/* Button */}
                <div className={`relative flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${getFilterColor('category', category.value)} text-white`
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                }`}>
                  <Icon className="text-lg" />
                  <span className="font-semibold whitespace-nowrap">{category.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-gray-700/50 group-hover:bg-gray-700'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            );
          })}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Complexity Filter */}
                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" />
                      <span>Complexity Level</span>
                    </div>
                    <div className="space-y-2">
                      {complexities.map((complexity) => {
                        const isActive = selectedComplexity === complexity.id;
                        return (
                          <button
                            key={complexity.id}
                            onClick={() => setSelectedComplexity(complexity.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                              isActive
                                ? `bg-gradient-to-r ${getFilterColor('complexity', complexity.id)} text-white`
                                : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/30'
                            }`}
                          >
                            <span className="text-sm">{complexity.label}</span>
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-gray-700 group-hover:bg-gray-600'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                      <FiClock className="text-green-400" />
                      <span>Project Status</span>
                    </div>
                    <div className="space-y-2">
                      {statuses.map((status) => {
                        const isActive = selectedStatus === status.id;
                        return (
                          <button
                            key={status.id}
                            onClick={() => setSelectedStatus(status.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                              isActive
                                ? `bg-gradient-to-r ${getFilterColor('status', status.id)} text-white`
                                : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-green-500/30'
                            }`}
                          >
                            <span className="text-sm">{status.label}</span>
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-gray-700 group-hover:bg-gray-600'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <div className="text-sm font-semibold text-gray-400 mb-4">Quick Actions</div>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-primary-500/30 transition-all duration-300">
                        <FiBookmark className="text-yellow-400" />
                        <span className="text-sm flex-1 text-left">Bookmarked Projects</span>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">{bookmarks.length}</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-blue-500/30 transition-all duration-300">
                        <FiEye className="text-blue-400" />
                        <span className="text-sm flex-1 text-left">With Live Demos</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-green-500/30 transition-all duration-300">
                        <FiShare2 className="text-green-400" />
                        <span className="text-sm flex-1 text-left">Open Source</span>
                      </button>
                    </div>
                  </div>
                </div>
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
                          <FiChevronDown className="text-xs opacity-0 group-hover:opacity-100 text-purple-400 rotate-180" />
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
        {(selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedStatus !== 'all' || searchQuery) && (
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
                  {(() => {
                    const category = allCategories.find(c => c.value === selectedCategory);
                    const Icon = category?.icon || FiCode;
                    return <Icon className="text-xs mr-1" />;
                  })()}
                  <span>{allCategories.find(c => c.value === selectedCategory)?.label}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 text-gray-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedComplexity !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm">
                  <FiTrendingUp className="text-xs" />
                  <span>{complexities.find(l => l.id === selectedComplexity)?.label}</span>
                  <button
                    onClick={() => setSelectedComplexity('all')}
                    className="ml-1 text-blue-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
              
              {selectedStatus !== 'all' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
                  <FiClock className="text-xs" />
                  <span>{statuses.find(s => s.id === selectedStatus)?.label}</span>
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className="ml-1 text-green-400 hover:text-white"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectsFilters;