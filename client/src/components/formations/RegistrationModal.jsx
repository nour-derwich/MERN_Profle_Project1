import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare,
  FiCheckCircle,
  FiCalendar,
  FiClock,
  FiUsers,
  FiShield,
  FiChevronRight,
  FiLoader,
  FiStar,
  FiAward,
  FiTrendingUp,
  FiLock,
  FiBookOpen,
  FiGlobe,
  FiVideo,
  FiDownload
} from 'react-icons/fi';
import { FaGoogle, FaLinkedin, FaGithub, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationModal = ({ 
  showRegistrationModal, 
  setShowRegistrationModal, 
  selectedFormation, 
  formData = {},
  handleInputChange, 
  handleRegistrationSubmit,
  isLoading = false,
  registrationSuccess = false,
  onSuccessClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);

  const steps = [
    { id: 1, title: 'Your Details', icon: FiUser, description: 'Basic information' },
    { id: 2, title: 'Confirmation', icon: FiCheckCircle, description: 'Review & submit' }
  ];

  const formationBenefits = [
    { icon: FiVideo, text: 'On-demand video lessons' },
    { icon: FiDownload, text: 'Downloadable resources' },
    { icon: FiUsers, text: 'Community access' },
    { icon: FiBookOpen, text: 'Lifetime updates' },
  ];

  useEffect(() => {
    if (registrationSuccess) {
      setCurrentStep(2);
      setShowSuccess(true);
    }
  }, [registrationSuccess]);

  useEffect(() => {
    const validateForm = () => {
      const requiredFields = ['full_name', 'email', 'phone'];
      const isValid = requiredFields.every(field => {
        const value = formData[field];
        return value && typeof value === 'string' && value.trim().length > 0;
      }) && formData.terms_accepted === true;
      
      setIsFormValid(isValid);
    };
    
    validateForm();
  }, [formData]);

  const handleClose = () => {
    if (showSuccess && onSuccessClose) {
      onSuccessClose();
    }
    setShowRegistrationModal(false);
    setTimeout(() => {
      setCurrentStep(1);
      setShowSuccess(false);
      setActiveSocial(null);
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSocialClick = (platform) => {
    setActiveSocial(platform);
    // Simulate social login (you can implement actual OAuth here)
    setTimeout(() => {
      setActiveSocial(null);
      // Pre-fill some fields for demo
      if (platform === 'google') {
        handleInputChange({ target: { name: 'full_name', value: 'Demo User' } });
        handleInputChange({ target: { name: 'email', value: 'demo@example.com' } });
      }
    }, 1000);
  };

  if (!showRegistrationModal || !selectedFormation) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-gradient-to-br from-gray-800 via-gray-800/95 to-gray-900 border border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Modal Header with gradient */}
        <div className="sticky top-0 bg-gradient-to-b from-gray-800/95 to-gray-900/95 border-b border-gray-700/30 p-6 flex items-center justify-between z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-primary-500/30 to-blue-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-3 bg-gradient-to-r from-primary-500/90 to-blue-500/90 rounded-xl shadow-lg">
                <FiAward className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Join the Formation
              </h2>
              <p className="text-gray-400 mt-1 text-sm">
                Complete your registration for
                <span className="text-primary-300 font-semibold ml-1">{selectedFormation.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50"
            disabled={isLoading}
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Progress Steps with improved design */}
        <div className="px-8 py-5 border-b border-gray-700/30 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center relative flex-1">
                    {/* Step Circle with glow effect */}
                    <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 scale-110'
                        : isActive
                        ? 'bg-gradient-to-r from-primary-500 to-blue-600 shadow-lg shadow-primary-500/25 scale-110'
                        : 'bg-gray-800 border border-gray-700/50 group'
                    }`}>
                      {isCompleted ? (
                        <FaCheck className="text-white text-lg" />
                      ) : (
                        <StepIcon className={`text-lg ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'}`} />
                      )}
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 border-2 border-gray-900"
                        />
                      )}
                    </div>
                    
                    {/* Step Label with animation */}
                    <div className="mt-3 text-center">
                      <span className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Connection Line with animation */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-4 relative">
                      <div className="absolute inset-0 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Content with smooth scrolling */}
        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
          <div className="p-8">
            {/* Success Message with celebration */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="mb-8 p-6 bg-gradient-to-br from-green-500/10 via-green-500/5 to-emerald-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-start gap-5">
                    <div className="relative">
                      <div className="absolute -inset-3 bg-gradient-to-r from-green-500/30 to-emerald-600/30 rounded-full blur-md animate-pulse" />
                      <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <FiCheckCircle className="text-white text-2xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Welcome Aboard! 🎉
                      </h3>
                      <p className="text-gray-300 mb-3">
                        You're now enrolled in <span className="text-primary-300 font-semibold">{selectedFormation.title}</span>. 
                        Check your email for the verification link and access instructions.
                      </p>
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <FiShield className="flex-shrink-0" />
                        <span>Free enrollment • Email verification required • Instant access pending verification</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                {/* Formation Preview */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-2xl p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-blue-600/20 border border-primary-500/30 flex items-center justify-center">
                      {selectedFormation.cover_image ? (
                        <img 
                          src={selectedFormation.cover_image} 
                          alt={selectedFormation.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiAward className="text-primary-400 text-2xl" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{selectedFormation.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 text-primary-300 text-xs font-semibold rounded-full border border-primary-500/30">
                          {selectedFormation.category}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                          FREE Enrollment
                        </span>
                        <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs font-semibold rounded-full border border-gray-700/50">
                          {selectedFormation.level}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FiClock className="text-primary-400" />
                          <span className="text-sm">{selectedFormation.duration_hours || 'Flexible'} hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FiCalendar className="text-primary-400" />
                          <span className="text-sm">
                            {selectedFormation.start_date 
                              ? new Date(selectedFormation.start_date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })
                              : 'Coming Soon'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Registration Options */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Registration</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { platform: 'google', icon: FaGoogle, label: 'Google', color: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30' },
                      { platform: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
                      { platform: 'github', icon: FaGithub, label: 'GitHub', color: 'from-gray-700/50 to-gray-800/50', border: 'border-gray-700/50' },
                    ].map(({ platform, icon: Icon, label, color, border }) => (
                      <motion.button
                        key={platform}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSocialClick(platform)}
                        disabled={isLoading || activeSocial}
                        className={`flex items-center justify-center gap-3 p-4 bg-gradient-to-br ${color} border ${border} text-gray-300 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group`}
                      >
                        {activeSocial === platform ? (
                          <FiLoader className="animate-spin text-xl" />
                        ) : (
                          <>
                            <Icon className="text-xl group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">{label}</span>
                          </>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
                    <span className="px-4 text-sm text-gray-500 font-medium">Or register with email</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
                  </div>
                </div>

                {/* Form Fields with improved layout */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                        <FiUser className="text-primary-400" />
                        Full Name *
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name || ''}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="relative w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                        <FiMail className="text-primary-400" />
                        Email Address *
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="relative w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                        <FiPhone className="text-primary-400" />
                        Phone Number *
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="relative w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                          placeholder="+216 12 345 678"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                        <FiTrendingUp className="text-primary-400" />
                        Current Role
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
                        <select
                          name="role"
                          value={formData.role || ''}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="relative w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 appearance-none disabled:opacity-50"
                        >
                          <option value="">Select your role</option>
                          <option value="student">🎓 Student</option>
                          <option value="developer">💻 Developer</option>
                          <option value="data-scientist">📊 Data Scientist</option>
                          <option value="ml-engineer">🤖 ML Engineer</option>
                          <option value="manager">👔 Manager</option>
                          <option value="other">✨ Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <FiChevronRight className="text-gray-500 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                      <FiMessageSquare className="text-primary-400" />
                      Tell us about your goals
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300" />
                      <textarea
                        name="motivation"
                        value={formData.motivation || ''}
                        onChange={handleInputChange}
                        rows="3"
                        disabled={isLoading}
                        className="relative w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                        placeholder="What do you hope to achieve with this formation? (Optional)"
                      />
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-400">
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { level: 'beginner', label: ' Beginner', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
                        { level: 'intermediate', label: 'Intermediate', color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30' },
                        { level: 'advanced', label: 'Advanced', color: 'from-primary-500/20 to-primary-600/20', border: 'border-primary-500/30' },
                      ].map(({ level, label, color, border }) => (
                        <label 
                          key={level}
                          className={`relative cursor-pointer transition-all duration-300 ${formData.experience_level === level ? 'transform scale-[1.02]' : ''}`}
                        >
                          <input
                            type="radio"
                            name="experience_level"
                            value={level}
                            checked={formData.experience_level === level}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="sr-only"
                          />
                          <div className={`p-4 bg-gradient-to-br ${color} border ${border} rounded-xl text-center transition-all duration-300 ${
                            formData.experience_level === level 
                              ? 'ring-2 ring-primary-500/50 shadow-lg' 
                              : 'hover:border-gray-600/50 hover:shadow-md'
                          }`}>
                            <span className={`text-sm font-medium ${
                              formData.experience_level === level ? 'text-white' : 'text-gray-300'
                            }`}>
                              {label}
                            </span>
                          </div>
                          {formData.experience_level === level && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                              <FaCheck className="text-white text-xs" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Benefits */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30">
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          name="terms_accepted"
                          checked={formData.terms_accepted || false}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="w-5 h-5 text-primary-600 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          I agree to the <a href="#" className="text-primary-400 hover:text-primary-300 font-medium">Terms of Service</a> and <a href="#" className="text-primary-400 hover:text-primary-300 font-medium">Privacy Policy</a>. I consent to receiving formation-related communications.
                        </p>
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <FiStar className="flex-shrink-0" />
                          <span>100% Free • No payment required • Certificate included</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="grid grid-cols-2 gap-3">
                      {formationBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                          <benefit.icon className="text-primary-400 text-lg" />
                          <span className="text-sm text-gray-300">{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Confirmation */}
            {currentStep === 2 && !showSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                {/* Registration Summary Card */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Registration Summary</h3>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">
                      FREE Enrollment
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Formation Details */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Formation Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-blue-600/20 border border-primary-500/30 flex items-center justify-center">
                            <FiAward className="text-primary-400 text-lg" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{selectedFormation.title}</p>
                            <p className="text-xs text-gray-400">{selectedFormation.category} • {selectedFormation.level}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-800/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Start Date</p>
                            <p className="text-sm text-white font-medium">
                              {selectedFormation.start_date 
                                ? new Date(selectedFormation.start_date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })
                                : 'Coming Soon'
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-gray-800/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Duration</p>
                            <p className="text-sm text-white font-medium">
                              {selectedFormation.duration_hours 
                                ? `${selectedFormation.duration_hours} hours` 
                                : 'Flexible'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Your Information */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Information</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">Full Name</p>
                          <p className="text-sm text-white font-medium">{formData.full_name || 'Not provided'}</p>
                        </div>
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">Email Address</p>
                          <p className="text-sm text-white font-medium">{formData.email || 'Not provided'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-800/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Phone</p>
                            <p className="text-sm text-white font-medium">{formData.phone || 'Not provided'}</p>
                          </div>
                          <div className="p-3 bg-gray-800/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Role</p>
                            <p className="text-sm text-white font-medium capitalize">{formData.role || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Section */}
                  <div className="pt-6 border-t border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg text-gray-400">Registration Fee</p>
                        <p className="text-sm text-gray-500">No payment required</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          FREE
                        </div>
                        <div className="text-sm text-green-400 mt-1">
                          <FiLock className="inline mr-1" />
                          Secure registration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Call to Action */}
                <div className="p-6 bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-blue-500/10 border border-primary-500/30 rounded-2xl">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl shadow-lg">
                      <FiAward className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">Ready to Start Learning?</h3>
                      <div className="space-y-3">
                        <p className="text-gray-300">
                          You're one click away from joining <span className="text-primary-300 font-semibold">{selectedFormation.title}</span>. 
                          After registration, you'll receive a verification email to activate your access.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-green-400">
                            <FaCheck className="flex-shrink-0" />
                            <span>Email verification</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <FaCheck className="flex-shrink-0" />
                            <span>Free enrollment</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <FaCheck className="flex-shrink-0" />
                            <span>Certificate included</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Modal Footer with improved buttons */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-800/95 to-gray-900/95 border-t border-gray-700/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FiShield className="text-green-400" />
              <span>Secure • Free • Email Verification Required</span>
            </div>

            <div className="flex items-center gap-4">
              {currentStep === 2 && !showSuccess && (
                <motion.button
                  type="button"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-xl hover:text-white hover:border-gray-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Back
                </motion.button>
              )}
              
              {currentStep === 1 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!isFormValid || isLoading}
                  className="px-8 py-3.5 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group"
                >
                  <span>Continue to Review</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : !showSuccess ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegistrationSubmit}
                  disabled={isLoading}
                  className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      <span>Complete Registration</span>
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Close & Continue
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add custom scrollbar styles
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #6366f1, #3b82f6);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #4f46e5, #2563eb);
  }
`;
document.head.appendChild(style);

export default RegistrationModal;