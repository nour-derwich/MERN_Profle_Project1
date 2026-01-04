import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiClock, 
  FiCalendar, 
  FiUsers, 
  FiMapPin, 
  FiAward, 
  FiBook, 
  FiCheckCircle, 
  FiStar,
  FiChevronRight,
  FiPlay,
  FiDownload,
  FiShare2,
  FiHeart,
  FiBookOpen,
  FiCode,
  FiVideo,
  FiMessageSquare,
  FiBarChart2,
  FiTarget,
  FiTool,
  FiDollarSign,
  FiPercent,
  FiTrendingUp,
  FiUserCheck,
  FiGlobe,
  FiLock,
  FiUnlock,
  FiX
} from 'react-icons/fi';
import { FaPython, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge';
import Naceurimage from '../../assets/images/naceeiruhncf.JPG';

const FormationDetail = ({ 
  selectedFormation, 
  setSelectedFormation, 
  setShowRegistrationModal,
  favorites = [],
  toggleFavorite,
  onShare
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(favorites.includes(selectedFormation?.id));
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsFavorite(favorites.includes(selectedFormation?.id));
  }, [favorites, selectedFormation]);

  if (!selectedFormation) return null;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Coming Soon';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Coming Soon';
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      return 'Coming Soon';
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      'beginner': 'from-green-500 to-emerald-600',
      'intermediate': 'from-blue-500 to-cyan-600',
      'advanced': 'from-purple-500 to-pink-600',
      'expert': 'from-red-500 to-orange-600',
      'all': 'from-primary-500 to-indigo-600'
    };
    return colors[level?.toLowerCase()] || 'from-gray-600 to-gray-800';
  };

  const formatLevelLabel = (level) => {
    const labels = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return labels[level] || (level?.charAt(0).toUpperCase() + level?.slice(1)) || 'All Levels';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': FiTrendingUp,
      'Deep Learning': FiCode,
      'Data Science': FaPython,
      'AI Engineering': FiTool,
      'Python': FaPython,
      'Mathematics': FiBarChart2,
      'Statistics': FiTrendingUp,
      'Business AI': FiTarget,
      'Web Development': FiCode,
      'Mobile Development': FiCode,
      'Design': FiAward,
      'Business': FiBookOpen,
      'Marketing': FiTrendingUp
    };
    return icons[category] || FiBookOpen;
  };

  const formatCurrency = (amount, currency = 'USD') => {
    // Handle null, undefined, or non-numeric values
    if (amount === null || amount === undefined) return 'Free';
    
    // Convert to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Check if it's a valid number
    if (isNaN(numAmount)) return 'Free';
    
    if (numAmount === 0) return 'Free';
    
    // Format the number
    const formattedAmount = Number.isInteger(numAmount) 
      ? numAmount.toString() 
      : numAmount.toFixed(2);
    
    if (currency === 'USD') return `$${formattedAmount}`;
    if (currency === 'EUR') return `€${formattedAmount}`;
    return `${formattedAmount} ${currency}`;
  };

  // Helper function to safely parse number
  const parseNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined) return defaultValue;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? defaultValue : num;
  };

  // Create formation cover image
  const getFormationCover = (category, title) => {
    const colors = {
      'Machine Learning': '4f46e5',
      'Deep Learning': '7c3aed',
      'Data Science': '0ea5e9',
      'AI Engineering': '10b981',
      'Web Development': 'f97316',
      'Mobile Development': 'ec4899'
    };
    
    const color = colors[category] || '4f46e5';
    const seed = (title || '').replace(/[^a-z0-9]/gi, '') || 'formation';
    
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&size=800&backgroundColor=${color}`;
  };

  // Create instructor avatar
   const getInstructorAvatar = (instructorName, title = '') => {
    // If the instructor is Naceur Keraani, use your imported image
    if (instructorName && instructorName.toLowerCase().includes('naceur')) {
      return Naceurimage;
    }
         // For other instructors, use DiceBear
    const seed = instructorName || 'instructor';
    const backgroundColors = {
      'Senior ML Engineer': '4f46e5',
      'Deep Learning Specialist': '7c3aed',
      'Data Science Lead': '0ea5e9',
      'AI Architect': '10b981',
      'Default': '4f46e5'
    };
    
    const bgColor = backgroundColors[title] || '4f46e5';
    
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&size=200&backgroundColor=${bgColor}`;
  };


  // Transform formation data
  const formationData = {
    id: selectedFormation.id,
    title: selectedFormation.title || 'Untitled Formation',
    category: selectedFormation.category || 'Uncategorized',
    level: selectedFormation.level || 'beginner',
    duration: selectedFormation.duration || (selectedFormation.duration_hours ? `${parseNumber(selectedFormation.duration_hours)} hours` : 'Flexible'),
    duration_hours: parseNumber(selectedFormation.duration_hours, 0),
    startDate: formatDate(selectedFormation.start_date),
    endDate: formatDate(selectedFormation.end_date),
    schedule: selectedFormation.schedule || 'Flexible',
    price: parseNumber(selectedFormation.price, 0),
    originalPrice: parseNumber(selectedFormation.original_price),
    installment: parseNumber(selectedFormation.installment_price),
    currency: selectedFormation.currency || 'USD',
    maxParticipants: parseNumber(selectedFormation.max_participants, 0),
    currentParticipants: parseNumber(selectedFormation.current_participants, 0),
    spotsLeft: selectedFormation.spots_left !== undefined 
      ? parseNumber(selectedFormation.spots_left, 0)
      : Math.max(0, parseNumber(selectedFormation.max_participants, 0) - parseNumber(selectedFormation.current_participants, 0)),
    status: selectedFormation.status || 'draft',
    format: selectedFormation.format || 'Online',
    location: selectedFormation.location || 'Online',
    liveSessions: selectedFormation.live_sessions || 'Flexible',
    // Use generated formation cover
    cover_image: selectedFormation.cover_image || getFormationCover(
      selectedFormation.category || 'Uncategorized',
      selectedFormation.title || 'Untitled Formation'
    ),
    description: selectedFormation.description || selectedFormation.short_description || 'No description available.',
    highlights: Array.isArray(selectedFormation.highlights) 
      ? selectedFormation.highlights 
      : (typeof selectedFormation.highlights === 'string' 
        ? selectedFormation.highlights.split(',').filter(h => h.trim()) 
        : []),
    features: Array.isArray(selectedFormation.features) 
      ? selectedFormation.features 
      : (typeof selectedFormation.features === 'string' 
        ? selectedFormation.features.split(',').filter(f => f.trim()) 
        : []),
    prerequisites: Array.isArray(selectedFormation.prerequisites) 
      ? selectedFormation.prerequisites 
      : (typeof selectedFormation.prerequisites === 'string' 
        ? selectedFormation.prerequisites.split(',').filter(p => p.trim()) 
        : []),
    learning_objectives: Array.isArray(selectedFormation.learning_objectives) 
      ? selectedFormation.learning_objectives 
      : (typeof selectedFormation.learning_objectives === 'string' 
        ? selectedFormation.learning_objectives.split(',').filter(lo => lo.trim()) 
        : []),
    modules: Array.isArray(selectedFormation.modules) ? selectedFormation.modules : [],
    testimonials: Array.isArray(selectedFormation.testimonials) ? selectedFormation.testimonials : [],
    tags: Array.isArray(selectedFormation.tags) 
      ? selectedFormation.tags 
      : (typeof selectedFormation.tags === 'string' 
        ? selectedFormation.tags.split(',').filter(t => t.trim()) 
        : []),
    rating: parseNumber(selectedFormation.rating, 0),
    reviews_count: parseNumber(selectedFormation.reviews_count, 0),
    featured: selectedFormation.featured || false,
    views_count: parseNumber(selectedFormation.views_count, 0),
    created_at: selectedFormation.created_at,
    updated_at: selectedFormation.updated_at,
    // Instructor data with generated avatar
    instructor: selectedFormation.instructor_name ? {
      name: selectedFormation.instructor_name || 'Instructor',
      title: selectedFormation.instructor_title || '',
      avatar: selectedFormation.instructor_photo || getInstructorAvatar(
        selectedFormation.instructor_name,
        selectedFormation.instructor_title
      ),
      verified: Boolean(selectedFormation.instructor_verified),
      rating: parseNumber(selectedFormation.instructor_rating, 0),
      reviews: parseNumber(selectedFormation.instructor_reviews, 0),
      students: parseNumber(selectedFormation.instructor_students, 0)
    } : null
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (toggleFavorite) {
      toggleFavorite(formationData.id);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: FiBookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: FiBook },
    { id: 'instructor', label: 'Instructor', icon: FaChalkboardTeacher },
    { id: 'testimonials', label: 'Testimonials', icon: FiStar },
    { id: 'faq', label: 'FAQ', icon: FiMessageSquare },
  ];

  const stats = [
    { 
      icon: FiClock, 
      label: 'Duration', 
      value: formationData.duration_hours > 0 
        ? `${formationData.duration_hours} hours` 
        : formationData.duration 
    },
    { 
      icon: FiCalendar, 
      label: 'Start Date', 
      value: formationData.startDate 
    },
    { 
      icon: FiUsers, 
      label: 'Class Size', 
      value: formationData.maxParticipants > 0 
        ? `${formationData.spotsLeft}/${formationData.maxParticipants}` 
        : 'Unlimited' 
    },
    { 
      icon: FiMapPin, 
      label: 'Format', 
      value: formationData.format 
    },
    { 
      icon: FiVideo, 
      label: 'Live Sessions', 
      value: formationData.liveSessions 
    },
    { 
      icon: FiAward, 
      label: 'Certificate', 
      value: 'Included' 
    },
  ];

  const CategoryIcon = getCategoryIcon(formationData.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      {/* Sticky Navigation Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFormation(null)}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Formations</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <section.icon className="text-sm" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-600/10 to-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Breadcrumb & Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="text-primary-400" />
                  <span className="text-sm text-gray-400">{formationData.category}</span>
                </div>
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <StatusBadge 
                  status={formationData.status} 
                  spotsLeft={formationData.spotsLeft}
                  size="sm"
                  showIcon={false}
                />
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(formationData.level)} text-white text-xs font-bold rounded-full`}>
                  {formatLevelLabel(formationData.level)}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {formationData.title}
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {formationData.description}
              </p>

              {/* Instructor */}
              {formationData.instructor && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-30" />
                    <img 
                      src={formationData.instructor.avatar} 
                      alt={formationData.instructor.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-gray-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formationData.instructor.name}`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">Instructor: {formationData.instructor.name}</h3>
                      {formationData.instructor.verified && (
                        <FiCheckCircle className="text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{formationData.instructor.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 fill-yellow-400 text-sm" />
                        <span className="text-sm text-gray-400">
                          {formationData.instructor.rating?.toFixed(1) || '0.0'} ({formationData.instructor.reviews || 0} reviews)
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-700 rounded-full" />
                      <span className="text-sm text-gray-400">
                        {formationData.instructor.students} students
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index}
                      className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-lg">
                          <Icon className="text-primary-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{stat.label}</div>
                          <div className="text-white font-medium">{stat.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  disabled={formationData.status === 'full' || formationData.spotsLeft <= 0}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    formationData.status === 'full' || formationData.spotsLeft <= 0
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:shadow-2xl hover:scale-105'
                  }`}>
                    <FaGraduationCap />
                    <span>
                      {formationData.status === 'full' || formationData.spotsLeft <= 0 ? 'Formation Full' : 'Enroll Now'}
                    </span>
                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFavorite}
                    className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                  >
                    <FiHeart className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                  <button
                    onClick={onShare}
                    className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="relative">
                  {/* Card Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur-xl opacity-20" />
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {formatCurrency(formationData.price, formationData.currency)}
                      </div>
                      {formationData.originalPrice && formationData.originalPrice > formationData.price && (
                        <div className="text-lg text-gray-500 line-through">
                          {formatCurrency(formationData.originalPrice, formationData.currency)}
                        </div>
                      )}
                      {formationData.installment && formationData.installment > 0 && (
                        <div className="text-sm text-gray-400 mt-2">
                          or {formatCurrency(formationData.installment, formationData.currency)}/month
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-6">
                      {formationData.features?.slice(0, 5).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <FiCheckCircle className="text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{typeof feature === 'string' ? feature.trim() : String(feature)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Enrollment Stats */}
                    {formationData.maxParticipants > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Spots Filled</span>
                          <span className="text-sm font-bold text-white">
                            {formationData.currentParticipants > 0 
                              ? `${Math.round((formationData.currentParticipants / formationData.maxParticipants) * 100)}%`
                              : '0%'
                            }
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                            style={{ 
                              width: formationData.currentParticipants > 0 
                                ? `${Math.round((formationData.currentParticipants / formationData.maxParticipants) * 100)}%` 
                                : '0%' 
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Time Remaining */}
                    {formationData.status === 'enrolling' && formationData.spotsLeft > 0 && formationData.spotsLeft <= 10 && (
                      <div className="mb-6 p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <FiClock />
                          <span>Only {formationData.spotsLeft} spots left - Enroll soon!</span>
                        </div>
                      </div>
                    )}

                    {/* Guarantee */}
                    <div className="mb-6 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-2 text-green-300 text-sm">
                        <FiCheckCircle />
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Navigation Menu for Mobile */}
          <div className="md:hidden mb-8">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400'
                  }`}
                >
                  <section.icon className="text-sm" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sections Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* What You'll Learn */}
            <motion.div
              id="overview"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FiAward className="text-yellow-400" />
                <span>What You'll Master</span>
              </h2>
              {formationData.highlights && formationData.highlights.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {formationData.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                      <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{typeof highlight === 'string' ? highlight.trim() : String(highlight)}</span>
                    </div>
                  ))}
                </div>
              ) : formationData.learning_objectives && formationData.learning_objectives.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {formationData.learning_objectives.map((objective, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                      <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{typeof objective === 'string' ? objective.trim() : String(objective)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No learning objectives specified.</p>
              )}
            </motion.div>

            {/* Curriculum */}
            {formationData.modules && formationData.modules.length > 0 && (
              <motion.div
                id="curriculum"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <FiBook className="text-primary-400" />
                  <span>Course Curriculum</span>
                </h2>
                <div className="space-y-4">
                  {formationData.modules.map((module, idx) => (
                    <div key={idx} className="border border-gray-700/50 rounded-xl p-6 hover:border-primary-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {module.title ? `Module ${idx + 1}: ${module.title}` : `Module ${idx + 1}`}
                        </h3>
                        {module.duration && (
                          <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-sm">
                            {module.duration}
                          </span>
                        )}
                      </div>
                      {module.topics && module.topics.length > 0 && (
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIdx) => (
                            <li key={topicIdx} className="flex items-center text-gray-400 hover:text-white transition-colors">
                              <FiPlay className="text-primary-400 mr-3 text-sm" />
                              {typeof topic === 'string' ? topic.trim() : String(topic)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Prerequisites */}
            {formationData.prerequisites && formationData.prerequisites.length > 0 && (
              <motion.div
                id="prerequisites"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {formationData.prerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl">
                      <FiUnlock className="text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{typeof prereq === 'string' ? prereq.trim() : String(prereq)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials */}
            {formationData.testimonials && formationData.testimonials.length > 0 && (
              <motion.div
                id="testimonials"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <FiStar className="text-yellow-400" />
                  <span>Student Testimonials</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {formationData.testimonials.map((testimonial, idx) => {
                    const rating = testimonial.rating || 5;
                    const name = testimonial.name || 'Anonymous Student';
                    const role = testimonial.role || 'Student';
                    const text = testimonial.text || testimonial.review || 'Great course!';
                    
                    return (
                      <div key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{name}</div>
                            <div className="text-sm text-gray-400">{role}</div>
                          </div>
                        </div>
                        <p className="text-gray-300 italic mb-4">"{text}"</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i}
                              className={`text-sm ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-l border-gray-700/50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-white">Navigation</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <section.icon />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FormationDetail;