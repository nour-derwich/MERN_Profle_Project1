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

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-600',
      'Intermediate': 'from-blue-500 to-cyan-600',
      'Advanced': 'from-purple-500 to-pink-600',
      'Expert': 'from-red-500 to-orange-600',
      'All Levels': 'from-primary-500 to-indigo-600'
    };
    return colors[level] || 'from-gray-600 to-gray-800';
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
      'Business AI': FiTarget
    };
    return icons[category] || FiBookOpen;
  };

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'EUR') return `€${amount}`;
    return `${amount} ${currency}`;
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (toggleFavorite) {
      toggleFavorite(selectedFormation.id);
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
    { icon: FiClock, label: 'Duration', value: selectedFormation.duration },
    { icon: FiCalendar, label: 'Start Date', value: selectedFormation.startDate },
    { icon: FiUsers, label: 'Class Size', value: `${selectedFormation.spotsLeft}/${selectedFormation.maxParticipants}` },
    { icon: FiMapPin, label: 'Format', value: selectedFormation.format },
    { icon: FiVideo, label: 'Live Sessions', value: selectedFormation.liveSessions || 'Weekly' },
    { icon: FiAward, label: 'Certificate', value: 'Included' },
  ];

  const CategoryIcon = getCategoryIcon(selectedFormation.category);

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
                  <span className="text-sm text-gray-400">{selectedFormation.category}</span>
                </div>
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <StatusBadge 
                  status={selectedFormation.status} 
                  spotsLeft={selectedFormation.spotsLeft}
                  size="sm"
                  showIcon={false}
                />
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(selectedFormation.level)} text-white text-xs font-bold rounded-full`}>
                  {selectedFormation.level}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {selectedFormation.title}
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {selectedFormation.description}
              </p>

              {/* Instructor */}
              {selectedFormation.instructor && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-30" />
                    <img 
                      src={selectedFormation.instructor.avatar} 
                      alt={selectedFormation.instructor.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-gray-800"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">Instructor: {selectedFormation.instructor.name}</h3>
                      {selectedFormation.instructor.verified && (
                        <FiCheckCircle className="text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{selectedFormation.instructor.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 fill-yellow-400 text-sm" />
                        <span className="text-sm text-gray-400">
                          {selectedFormation.instructor.rating} ({selectedFormation.instructor.reviews} reviews)
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-700 rounded-full" />
                      <span className="text-sm text-gray-400">
                        {selectedFormation.instructor.students} students
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
                  disabled={selectedFormation.status === 'full'}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    selectedFormation.status === 'full'
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:shadow-2xl hover:scale-105'
                  }`}>
                    <FaGraduationCap />
                    <span>
                      {selectedFormation.status === 'full' ? 'Formation Full' : 'Enroll Now'}
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
                        {formatCurrency(selectedFormation.price, selectedFormation.currency)}
                      </div>
                      {selectedFormation.originalPrice && (
                        <div className="text-lg text-gray-500 line-through">
                          {formatCurrency(selectedFormation.originalPrice, selectedFormation.currency)}
                        </div>
                      )}
                      {selectedFormation.installment && (
                        <div className="text-sm text-gray-400 mt-2">
                          or {formatCurrency(selectedFormation.installment, selectedFormation.currency)}/month
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-6">
                      {selectedFormation.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <FiCheckCircle className="text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Enrollment Stats */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Spots Filled</span>
                        <span className="text-sm font-bold text-white">
                          {((selectedFormation.maxParticipants - selectedFormation.spotsLeft) / selectedFormation.maxParticipants * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                          style={{ width: `${((selectedFormation.maxParticipants - selectedFormation.spotsLeft) / selectedFormation.maxParticipants * 100).toFixed(0)}%` }}
                        />
                      </div>
                    </div>

                    {/* Time Remaining */}
                    {selectedFormation.status === 'enrolling' && selectedFormation.spotsLeft <= 10 && (
                      <div className="mb-6 p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <FiClock />
                          <span>Only {selectedFormation.spotsLeft} spots left - Enroll soon!</span>
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
              <div className="grid md:grid-cols-2 gap-4">
                {selectedFormation.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                    <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Curriculum */}
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
                {selectedFormation.modules.map((module, idx) => (
                  <div key={idx} className="border border-gray-700/50 rounded-xl p-6 hover:border-primary-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Module {idx + 1}: {module.title}
                      </h3>
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-sm">
                        {module.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-center text-gray-400 hover:text-white transition-colors">
                          <FiPlay className="text-primary-400 mr-3 text-sm" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            {selectedFormation.prerequisites && selectedFormation.prerequisites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedFormation.prerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl">
                      <FiUnlock className="text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{prereq}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonials */}
            {selectedFormation.testimonials.length > 0 && (
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
                  {selectedFormation.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i}
                            className={`text-sm ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
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