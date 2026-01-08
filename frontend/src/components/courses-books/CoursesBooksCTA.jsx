import React, { useState } from 'react';
import {
  FiExternalLink,
  FiMail,
  FiMessageSquare,
  FiCalendar,
  FiChevronRight,
  FiStar,
  FiBookOpen,
  FiUsers
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const CoursesBooksCTA = ({ isVisible = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    goal: '',
    level: '',
    timeframe: '',
    email: ''
  });

  const goals = [
    'Career Transition',
    'Skill Enhancement',
    'Academic Research',
    'Project Building',
    'Interview Preparation',
    'General Learning'
  ];

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const timeframes = [
    '1-2 months',
    '3-6 months',
    '6-12 months',
    '1+ years'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsFormVisible(false);
  };

  const floatingElements = [
    { icon: FiBookOpen, delay: 0, color: 'from-primary-500 to-blue-500' },
    { icon: FiUsers, delay: 1, color: 'from-purple-500 to-pink-500' },
    { icon: FiStar, delay: 2, color: 'from-yellow-500 to-orange-500' },
    { icon: FiCalendar, delay: 3, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        {/* Floating Elements */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute p-4 rounded-2xl bg-gradient-to-br ${element.color}/10 border ${element.color.replace('from-', 'border-').replace(' to-', '/20 to-')} backdrop-blur-sm animate-float-slow`}
              style={{
                top: `${20 + index * 15}%`,
                left: `${10 + index * 20}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${15 + index * 5}s`
              }}
            >
              <Icon className={`text-xl bg-gradient-to-r ${element.color} bg-clip-text text-transparent`} />
            </div>
          );
        })}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#ffffff12_1px,transparent_1px),linear-gradient(180deg,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Decorative Elements */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />
            <div className="relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
              <FiStar className="text-4xl bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent text-white" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-8 group hover:border-primary-500/50 transition-all duration-300">
            <FiMessageSquare className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">
              PERSONALIZED GUIDANCE
            </span>
            <div className="w-4 h-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Need </span>
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Personalized
            </span>
            <br />
            <span className="text-white">Book Guidance?</span>
          </h2>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
            <p className="text-2xl text-gray-300 font-semibold">
              Get Custom Recommendations Tailored to Your Goals
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>

          {/* Description */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Navigating the vast world of AI and ML resources can be overwhelming.
            Share your learning goals, current level, and timeline, and I'll curate
            a personalized reading list specifically for you.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { value: '500+', label: 'Students Helped', icon: FiUsers },
              { value: '98%', label: 'Satisfaction Rate', icon: FiStar },
              { value: '24h', label: 'Response Time', icon: FiCalendar },
              { value: 'Free', label: 'Consultation', icon: FiBookOpen }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${index % 2 === 0 ? 'from-primary-500 to-blue-500' : 'from-purple-500 to-pink-500'} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 bg-gradient-to-br ${index % 2 === 0 ? 'from-primary-500/20 to-blue-500/20' : 'from-purple-500/20 to-pink-500/20'} rounded-xl`}>
                        <Icon className={`text-xl ${index % 2 === 0 ? 'text-primary-400' : 'text-purple-400'}`} />
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Button Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur transition-all duration-700 ${isHovered ? 'opacity-70' : 'opacity-30'
              }`} />

            {/* Main Button */}
            <button
              onClick={() => setIsFormVisible(true)}
              className="relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group/btn"
            >
              <FiMail className="text-xl" />
              <span className="text-lg">Get Personalized Recommendations</span>
              <FiChevronRight className="group-hover/btn:translate-x-2 transition-transform" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>

            {/* Sparkle Animation */}
            {isHovered && (
              <div className="absolute -top-4 -right-4">
                <FiStar className="text-yellow-400 animate-ping" />
              </div>
            )}
          </motion.div>

          {/* Secondary Action */}
          <div className="text-sm text-gray-500">
            or{' '}
            <button
              onClick={() => window.open('mailto:hello@example.com', '_blank')}
              className="text-primary-400 hover:text-primary-300 transition-colors duration-300 inline-flex items-center gap-1"
            >
              <span>email me directly</span>
              <FiExternalLink className="text-xs" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recommendation Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFormVisible(false)}
          />

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Personalized Book Recommendations</h3>
                  <p className="text-gray-400">Fill out your learning goals for tailored suggestions</p>
                </div>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiExternalLink className="rotate-45" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Learning Goal */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    What's your primary learning goal?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal })}
                        className={`px-4 py-3 rounded-xl transition-all duration-300 ${formData.goal === goal
                            ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                          }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Your current skill level
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, level })}
                        className={`px-4 py-3 rounded-xl transition-all duration-300 ${formData.level === level
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-green-500/30'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Desired timeframe
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeframes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeframe: time })}
                        className={`px-4 py-3 rounded-xl transition-all duration-300 ${formData.timeframe === time
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white'
                            : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-orange-500/30'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Where should I send the recommendations?
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-xl placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-xl hover:text-white hover:border-gray-600/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FiStar />
                  <span>Get My Reading List</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CoursesBooksCTA;