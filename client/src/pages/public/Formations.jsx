import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormationsHero from '../../components/formations/FormationsHero';
import FormationsFilters from '../../components/formations/FormationsFilters';
import FormationsGrid from '../../components/formations/FormationsGrid';
import FormationDetail from '../../components/formations/FormationDetail';
import RegistrationModal from '../../components/formations/RegistrationModal';
import { formationService } from '../../services/formationService';

const Formations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    terms: false,
    paymentMethod: 'credit'
  });

  // New state for API data
  const [formations, setFormations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [totalFormations, setTotalFormations] = useState(0);

  const itemsPerPage = 6;

  // Initialize component
  useEffect(() => {
    setIsVisible(true);
    fetchFormations();
    fetchCategories();
    fetchLevels();
    
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch formations with filters
  const fetchFormations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filters = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        level: selectedLevel !== 'all' ? selectedLevel : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        priceRange: priceRange !== 'all' ? priceRange : undefined,
        searchQuery: searchQuery || undefined,
        sortBy,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        admin: false // Only get published formations for public view
      };

      // Remove undefined filters
      Object.keys(filters).forEach(key => {
        if (filters[key] === undefined) {
          delete filters[key];
        }
      });

      const response = await formationService.getAll(filters);
      
      if (response.success) {
        setFormations(response.data || []);
        setTotalFormations(response.count || response.data?.length || 0);
      } else {
        setError('Failed to load formations');
      }
    } catch (err) {
      console.error('Error fetching formations:', err);
      setError(err.response?.data?.message || 'Failed to load formations');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await formationService.getCategories();
      if (response.success) {
        const categoriesData = response.data || [];
        setCategories([
          { value: 'all', label: 'All Categories', color: 'from-gray-600 to-gray-800' },
          ...categoriesData.map(cat => ({
            value: cat.category.toLowerCase().replace(/ /g, '-'),
            label: cat.category,
            color: getCategoryColor(cat.category),
            count: cat.count
          }))
        ]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback categories if API fails
      setCategories([
        { value: 'all', label: 'All Categories', color: 'from-gray-600 to-gray-800' },
        { value: 'machine-learning', label: 'Machine Learning', color: 'from-primary-500 to-blue-600' },
        { value: 'deep-learning', label: 'Deep Learning', color: 'from-purple-500 to-pink-600' },
        { value: 'data-science', label: 'Data Science', color: 'from-blue-500 to-cyan-600' },
        { value: 'ai-engineering', label: 'AI Engineering', color: 'from-green-500 to-emerald-600' }
      ]);
    }
  };

  // Fetch levels from API
  const fetchLevels = async () => {
    try {
      const response = await formationService.getLevels();
      if (response.success) {
        const levelsData = response.data || [];
        setLevels([
          { value: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
          ...levelsData.map(level => ({
            value: level.level,
            label: formatLevelLabel(level.level),
            color: getLevelColor(level.level),
            count: level.count
          }))
        ]);
      }
    } catch (err) {
      console.error('Error fetching levels:', err);
      // Fallback levels if API fails
      setLevels([
        { value: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
        { value: 'beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600' },
        { value: 'intermediate', label: 'Intermediate', color: 'from-blue-500 to-cyan-600' },
        { value: 'advanced', label: 'Advanced', color: 'from-purple-500 to-pink-600' },
        { value: 'expert', label: 'Expert', color: 'from-red-500 to-orange-600' }
      ]);
    }
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
    return labels[level] || level.charAt(0).toUpperCase() + level.slice(1);
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

  // Update formations when filters change
  useEffect(() => {
    fetchFormations();
  }, [searchQuery, selectedCategory, selectedLevel, selectedStatus, priceRange, sortBy, currentPage]);

  // Status options
  const statuses = [
    { value: 'all', label: 'All Statuses', color: 'from-gray-600 to-gray-800' },
    { value: 'upcoming', label: 'Upcoming', color: 'from-blue-500 to-cyan-600' },
    { value: 'enrolling', label: 'Enrolling', color: 'from-green-500 to-emerald-600' },
    { value: 'full', label: 'Full', color: 'from-red-500 to-orange-600' },
    { value: 'completed', label: 'Completed', color: 'from-gray-600 to-gray-800' },
    { value: 'published', label: 'Published', color: 'from-green-500 to-emerald-600' },
    { value: 'draft', label: 'Draft', color: 'from-yellow-500 to-orange-600' }
  ];

  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Prices', range: 'Any price', color: 'from-gray-600 to-gray-800' },
    { id: 'under600', label: 'Under $600', range: '$0 - $600', color: 'from-green-500 to-emerald-600' },
    { id: '600-900', label: '$600 - $900', range: '$600 - $900', color: 'from-blue-500 to-cyan-600' },
    { id: '900-1200', label: '$900 - $1200', range: '$900 - $1200', color: 'from-primary-500 to-indigo-600' },
    { id: 'over1200', label: 'Premium', range: '$1200+', color: 'from-purple-500 to-pink-600' }
  ];

  // Filter formations client-side for better UX
  const filteredFormations = formations.filter(formation => {
    const matchesSearch = !searchQuery || 
      formation.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      formation.category?.toLowerCase().replace(/ /g, '-') === selectedCategory;
    
    const matchesLevel = selectedLevel === 'all' || 
      formation.level?.toLowerCase() === selectedLevel;
    
    const matchesStatus = selectedStatus === 'all' || 
      formation.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'under600' && formation.price < 600) ||
      (priceRange === '600-900' && formation.price >= 600 && formation.price <= 900) ||
      (priceRange === '900-1200' && formation.price >= 900 && formation.price <= 1200) ||
      (priceRange === 'over1200' && formation.price > 1200);

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesPrice;
  });

  // Sort formations
  const sortedFormations = [...filteredFormations].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.views_count || b.reviews_count || b.current_participants || 0) - (a.views_count || a.reviews_count || a.current_participants || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'recent':
        return new Date(b.created_at || b.start_date || 0) - new Date(a.created_at || a.start_date || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleFavorite = (formationId) => {
    setFavorites(prev => 
      prev.includes(formationId) 
        ? prev.filter(id => id !== formationId)
        : [...prev, formationId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would call your registration API
      console.log('Registration submitted:', {
        formationId: selectedFormation.id,
        formationTitle: selectedFormation.title,
        ...formData
      });

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setRegistrationSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setShowRegistrationModal(false);
          setRegistrationSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            role: '',
            message: '',
            terms: false,
            paymentMethod: 'credit'
          });
        }, 3000);
      }, 2000);
    } catch (err) {
      console.error('Error submitting registration:', err);
      setError('Failed to submit registration. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedStatus('all');
    setPriceRange('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handleQuickView = (formation) => {
    setSelectedFormation(formation);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedFormation.title,
        text: `Check out this amazing formation: ${selectedFormation.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle formation selection for detail view
  const handleSelectFormation = async (formation) => {
    try {
      // Fetch full formation details
      const response = await formationService.getById(formation.id);
      if (response.success) {
        setSelectedFormation(response.data);
      } else {
        setSelectedFormation(formation);
      }
    } catch (err) {
      console.error('Error fetching formation details:', err);
      setSelectedFormation(formation);
    }
  };

  // If formation is selected, show detail view
  if (selectedFormation) {
    return (
      <>
        <FormationDetail
          selectedFormation={selectedFormation}
          setSelectedFormation={setSelectedFormation}
          setShowRegistrationModal={setShowRegistrationModal}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onShare={handleShare}
        />
        <RegistrationModal
          showRegistrationModal={showRegistrationModal}
          setShowRegistrationModal={setShowRegistrationModal}
          selectedFormation={selectedFormation}
          formData={formData}
          handleInputChange={handleInputChange}
          handleRegistrationSubmit={handleRegistrationSubmit}
          isLoading={isLoading}
          registrationSuccess={registrationSuccess}
          onSuccessClose={() => {
            setShowRegistrationModal(false);
            setRegistrationSuccess(false);
          }}
        />
      </>
    );
  }

  // Show loading state on initial load
  if (isLoading && formations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading formations...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && formations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 rounded-xl bg-red-900/20 border border-red-700/30 max-w-md">
          <div className="text-5xl text-red-500 mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchFormations}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main Formations List View
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <FormationsHero 
        isVisible={isVisible}
        totalFormations={totalFormations}
      />
      
      <FormationsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        levels={levels}
        statuses={statuses}
        priceRanges={priceRanges}
        filteredFormations={filteredFormations}
        onClearFilters={handleClearFilters}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center p-8 rounded-xl bg-red-900/20 border border-red-700/30 max-w-md">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchFormations}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <FormationsGrid
          filteredFormations={sortedFormations}
          isVisible={isVisible}
          setSelectedFormation={handleSelectFormation}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onQuickView={handleQuickView}
          viewMode={viewMode}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onViewModeChange={setViewMode}
          isLoading={isLoading}
          totalFormations={totalFormations}
          totalFiltered={filteredFormations.length}
        />
      )}
      
      {/* Display message when no formations found */}
      {!isLoading && !error && filteredFormations.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No formations found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Formations;