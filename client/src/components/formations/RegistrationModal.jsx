import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare,
  FiCheckCircle,
  FiLock,
  FiCalendar,
  FiClock,
  FiUsers,
  FiCreditCard,
  FiShield,
  FiAlertCircle,
  FiChevronRight,
  FiLoader,
  FiStar,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';
import { FaGoogle, FaLinkedin, FaGithub } from 'react-icons/fa';
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

  const steps = [
    { id: 1, title: 'Personal Info', icon: FiUser },
    { id: 2, title: 'Payment', icon: FiCreditCard },
    { id: 3, title: 'Confirmation', icon: FiCheckCircle }
  ];

  const paymentOptions = [
    { id: 'credit', label: 'Credit Card', icon: FiCreditCard },
    { id: 'paypal', label: 'PayPal', icon: FiCreditCard },
    { id: 'bank', label: 'Bank Transfer', icon: FiCreditCard }
  ];

  useEffect(() => {
    if (registrationSuccess) {
      setCurrentStep(3);
      setShowSuccess(true);
    }
  }, [registrationSuccess]);

  useEffect(() => {
    const validateForm = () => {
      const requiredFields = ['fullName', 'email', 'phone'];
      const isValid = requiredFields.every(field => formData[field]?.trim());
      setIsFormValid(isValid);
    };
    validateForm();
  }, [formData]);

  const handleClose = () => {
    if (showSuccess && onSuccessClose) {
      onSuccessClose();
    }
    setShowRegistrationModal(false);
    setCurrentStep(1);
    setShowSuccess(false);
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

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'EUR') return `€${amount}`;
    return `${amount} ${currency}`;
  };

  if (!showRegistrationModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative w-full max-w-4xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700/50 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-20" />
              <div className="relative p-3 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl">
                <FaGoogle className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Enroll in Formation</h3>
              <p className="text-gray-400 mt-1">{selectedFormation.title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep >= step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center relative">
                    {/* Step Circle */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : isActive
                        ? 'bg-gradient-to-r from-primary-500 to-blue-600'
                        : 'bg-gray-800 border border-gray-700/50'
                    }`}>
                      {isCompleted ? (
                        <FiCheckCircle className="text-white text-lg" />
                      ) : (
                        <StepIcon className={`text-lg ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 relative">
                      <div className="absolute inset-0 bg-gray-700/50 rounded-full" />
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full transition-all duration-300 ${
                          currentStep > step.id ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-6">
            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                      <FiCheckCircle className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white">Registration Successful! 🎉</h4>
                      <p className="text-gray-300 mt-1">
                        You're enrolled in {selectedFormation.title}. Check your email for confirmation and next steps.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Quick Social Login */}
                <div>
                  <p className="text-sm text-gray-400 mb-3">Quick registration with</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-primary-500/30 transition-all duration-300">
                      <FaGoogle className="text-xl" />
                      <span className="text-sm">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-blue-500/30 transition-all duration-300">
                      <FaLinkedin className="text-xl" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-gray-600/50 transition-all duration-300">
                      <FaGithub className="text-xl" />
                      <span className="text-sm">GitHub</span>
                    </button>
                  </div>
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-700/50" />
                    <span className="px-4 text-sm text-gray-500">or continue with email</span>
                    <div className="flex-1 h-px bg-gray-700/50" />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <FiUser className="text-primary-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <FiMail className="text-primary-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300 placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <FiPhone className="text-primary-400" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300 placeholder-gray-500"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <FiTrendingUp className="text-primary-400" />
                      Current Role
                    </label>
                    <select
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select your role</option>
                      <option value="student">Student</option>
                      <option value="developer">Developer</option>
                      <option value="data-scientist">Data Scientist</option>
                      <option value="ml-engineer">ML Engineer</option>
                      <option value="manager">Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <FiMessageSquare className="text-primary-400" />
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message || ''}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none resize-none transition-all duration-300 placeholder-gray-500"
                    placeholder="Any questions or special requirements?"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms || false}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 text-primary-600 bg-gray-800 border-gray-700 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <div>
                    <p className="text-sm text-gray-300">
                      I agree to the <a href="#" className="text-primary-400 hover:text-primary-300">Terms of Service</a> and <a href="#" className="text-primary-400 hover:text-primary-300">Privacy Policy</a>. I understand that I'll receive course-related emails.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Payment Methods */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Select Payment Method</h4>
                  <div className="grid gap-3">
                    {paymentOptions.map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl hover:border-primary-500/30 cursor-pointer transition-all duration-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary-600 bg-gray-800 border-gray-700 focus:ring-primary-500"
                        />
                        <method.icon className="text-xl text-gray-400" />
                        <span className="flex-1 text-gray-300">{method.label}</span>
                        {method.id === 'credit' && (
                          <FiShield className="text-green-400" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Credit Card Form */}
                {formData.paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">Card Holder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl focus:border-primary-500/50 focus:outline-none placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Note */}
                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiLock className="text-yellow-400 text-xl" />
                    <div>
                      <p className="text-sm text-yellow-300 font-medium">Secure Payment</p>
                      <p className="text-xs text-yellow-400/70">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Order Summary */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-6">Order Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={selectedFormation.image} 
                          alt={selectedFormation.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-white">{selectedFormation.title}</h5>
                        <p className="text-sm text-gray-400">{selectedFormation.category} • {selectedFormation.level}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          {formatCurrency(selectedFormation.price, selectedFormation.currency)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-700/50">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white font-medium">{selectedFormation.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Start Date</span>
                        <span className="text-white font-medium">{selectedFormation.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Format</span>
                        <span className="text-white font-medium">{selectedFormation.format}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-400">Total Amount</span>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                            {formatCurrency(selectedFormation.price, selectedFormation.currency)}
                          </div>
                          {selectedFormation.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatCurrency(selectedFormation.originalPrice, selectedFormation.currency)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <FiAward className="text-green-400 text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Ready to Transform Your Career?</h4>
                      <p className="text-gray-300">
                        By clicking "Confirm Enrollment", you'll gain immediate access to course materials 
                        and join our community of aspiring AI professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-800 to-gray-900 border-t border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiShield className="text-green-400" />
              <span className="text-sm text-gray-400">Secure • Encrypted • 30-Day Guarantee</span>
            </div>

            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-gray-600/50 transition-all duration-300"
                >
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isFormValid}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>Continue</span>
                  <FiChevronRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegistrationSubmit}
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      <span>Confirm Enrollment</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;