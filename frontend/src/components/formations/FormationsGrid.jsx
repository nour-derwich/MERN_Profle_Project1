import React, { useState, useEffect } from 'react';
import {
  FiBook,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiSearch,
  FiUsers,
  FiTrendingUp,
  FiCalendar,
  FiFilter,
  FiRefreshCw,
  FiAward,
  FiClock,
  FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import FormationCard from './FormationCard';

const FormationsGrid = ({
  filteredFormations,
  isVisible,
  setSelectedFormation,
  favorites = [],
  toggleFavorite,
  onQuickView,
  viewMode = 'grid',
  currentPage = 1,
  itemsPerPage = 9,
  onPageChange,
  onViewModeChange,
  isLoading = false,
  totalFormations = 0
}) => {
  const [isGridLoaded, setIsGridLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFormations = filteredFormations.slice(startIndex, endIndex);

  useEffect(() => {
    if (filteredFormations.length > 0) {
      const timer = setTimeout(() => setIsGridLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [filteredFormations]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  const noResultsVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  // Calculate statistics
  const getStats = () => {
    const upcoming = filteredFormations.filter(f => f.status === 'upcoming').length;
    const enrolling = filteredFormations.filter(f => f.status === 'enrolling').length;
    const featured = filteredFormations.filter(f => f.featured).length;
    const free = filteredFormations.filter(f => f.price === 0).length;

    return { upcoming, enrolling, featured, free };
  };

  const stats = getStats();

  return (
    <section className="relative py-12 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Results Info */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative px-4 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FiUsers className="text-primary-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {filteredFormations.length}
                      </div>
                      <div className="text-xs text-gray-500">Formations Found</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              {filteredFormations.length > 0 && (
                <div className="hidden md:flex items-center gap-3">
                  {stats.enrolling > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                      <FiTrendingUp className="text-green-400" />
                      <span className="text-sm text-green-300 font-medium">
                        {stats.enrolling} Enrolling
                      </span>
                    </div>
                  )}

                  {stats.upcoming > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg">
                      <FiCalendar className="text-blue-400" />
                      <span className="text-sm text-blue-300 font-medium">
                        {stats.upcoming} Upcoming
                      </span>
                    </div>
                  )}

                  {stats.featured > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                      <FiAward className="text-yellow-400" />
                      <span className="text-sm text-yellow-300 font-medium">
                        {stats.featured} Featured
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange && onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:border-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <FiChevronLeft />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const pageNumber = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      // Show dynamic page numbers for large page counts
                      if (i === 0) return <span key="first" className="px-1 text-gray-500">...</span>;
                      if (i === 4) return <span key="last" className="px-1 text-gray-500">...</span>;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => onPageChange && onPageChange(pageNumber)}
                        className={`px-3 py-1 rounded-lg transition-all duration-300 ${currentPage === pageNumber
                            ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => onPageChange && onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:border-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Grid/Layout Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {Math.min(startIndex + 1, filteredFormations.length)}-{Math.min(endIndex, filteredFormations.length)} of {filteredFormations.length} formations
              {totalFormations > 0 && ` (${totalFormations} total)`}
            </div>

            {onViewModeChange && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 hidden md:block">View:</span>
                <div className="flex bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg p-1">
                  {[
                    { id: 'grid', icon: FiGrid, label: 'Grid' },
                    { id: 'list', icon: FiList, label: 'List' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => onViewModeChange(mode.id)}
                      className={`p-2 rounded transition-all duration-300 ${viewMode === mode.id
                          ? 'bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-400'
                          : 'text-gray-400 hover:text-white'
                        }`}
                      title={`${mode.label} View`}
                    >
                      <mode.icon className="text-lg" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur-xl animate-ping opacity-20" />
              <FiLoader className="relative text-6xl text-primary-400 animate-spin" />
            </div>
            <div className="text-lg text-gray-400 font-medium">Loading formations...</div>
            <div className="text-sm text-gray-500 mt-2">Curating the best training programs for you</div>
          </div>
        )}

        {/* Formations Grid */}
        <AnimatePresence>
          {!isLoading && currentFormations.length > 0 && (
            <motion.div
              key="formations-grid"
              variants={containerVariants}
              initial="hidden"
              animate={isGridLoaded ? "visible" : "hidden"}
              className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 lg:grid-cols-2'
                }`}
            >
              {currentFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  variants={itemVariants}
                  layout
                  className={`${viewMode === 'list' ? 'col-span-1 lg:col-span-2' : ''}`}
                  onMouseEnter={() => setIsHovered(formation.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <FormationCard
                    formation={formation}
                    onClick={setSelectedFormation}
                    index={index}
                    isVisible={isGridLoaded}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    onQuickView={onQuickView}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results State */}
        <AnimatePresence>
          {!isLoading && filteredFormations.length === 0 && (
            <motion.div
              key="no-results"
              variants={noResultsVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              {/* Animated Book Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur-2xl opacity-10" />
                <div className="relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl">
                  <FiBook className="text-8xl text-gray-700" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <FiSearch className="text-4xl text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent mb-4">
                No formations match your criteria
              </h3>
              <p className="text-lg text-gray-400 max-w-md mb-8">
                Try adjusting your filters or search terms to discover amazing training programs
              </p>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-3 justify-center max-w-lg">
                <button className="px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-primary-500/30 transition-all duration-300">
                  Clear All Filters
                </button>
                <button className="px-4 py-2 bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/30 text-primary-300 rounded-lg hover:text-white hover:border-primary-500/50 transition-all duration-300">
                  Show All Formations
                </button>
                <button className="px-4 py-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-lg hover:text-white hover:border-green-500/50 transition-all duration-300">
                  View Upcoming
                </button>
                <button className="px-4 py-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg hover:text-white hover:border-yellow-500/50 transition-all duration-300">
                  Featured Programs
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Footer */}
        {totalPages > 1 && !isLoading && currentFormations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages} • {itemsPerPage} formations per page
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onPageChange && onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                >
                  <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else {
                      // Smart pagination for large page counts
                      if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => onPageChange && onPageChange(pageNumber)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${currentPage === pageNumber
                            ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-lg'
                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-gray-600">...</span>
                      <button
                        onClick={() => onPageChange && onPageChange(totalPages)}
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-300"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => onPageChange && onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-lg hover:text-white hover:border-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                >
                  <span>Next</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Stats Footer */}
        {filteredFormations.length > 0 && (
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-gray-700/30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <FiClock className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Avg. Duration</div>
                  <div className="text-white font-medium">12 weeks</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
                  <FiStar className="text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Avg. Rating</div>
                  <div className="text-white font-medium">4.7/5.0</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                  <FiUsers className="text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Students</div>
                  <div className="text-white font-medium">10,500+</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <div className="p-2 bg-gradient-to-br from-primary-500/20 to-indigo-500/20 rounded-lg">
                  <FiAward className="text-primary-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Certified</div>
                  <div className="text-white font-medium">100%</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default FormationsGrid;