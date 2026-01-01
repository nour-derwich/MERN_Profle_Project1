import React, { useState, useEffect } from 'react';
import { 
  FiLayers, FiArrowRight, FiClock, FiCalendar,
  FiUsers, FiTrendingUp, FiZap, FiStar,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaPython, FaBrain, FaChartLine } from 'react-icons/fa';
import { SiPytorch, SiTensorflow, SiJupyter } from 'react-icons/si';

const LatestFormations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const formations = [
    {
      id: 1,
      title: 'AI Engineering Bootcamp',
      category: 'ai-ml',
      level: 'Advanced',
      duration: '12 weeks',
      startDate: 'March 2026',
      price: '2400 TND',
      spots: 8,
      enrolled: 42,
      rating: 4.9,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      badge: 'Hot',
      badgeColor: 'from-red-500 to-orange-500',
      tech: [FaPython, SiPytorch, SiTensorflow],
      description: 'Master advanced AI concepts with hands-on projects and real-world applications.'
    },
    {
      id: 2,
      title: 'Deep Learning Specialization',
      category: 'deep-learning',
      level: 'Intermediate',
      duration: '8 weeks',
      startDate: 'April 2026',
      price: '1800 TND',
      spots: 12,
      enrolled: 35,
      rating: 4.8,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      badge: 'Popular',
      badgeColor: 'from-blue-500 to-cyan-500',
      tech: [SiPytorch, FaBrain, SiJupyter],
      description: 'Build and deploy neural networks for computer vision and NLP tasks.'
    },
    {
      id: 3,
      title: 'Data Science Mastery',
      category: 'data-science',
      level: 'Beginner+',
      duration: '10 weeks',
      startDate: 'May 2026',
      price: '1600 TND',
      spots: 15,
      enrolled: 28,
      rating: 4.7,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      badge: 'New',
      badgeColor: 'from-green-500 to-emerald-500',
      tech: [FaPython, FaChartLine, SiJupyter],
      description: 'Transform raw data into actionable insights with statistical analysis and visualization.'
    },
    {
      id: 4,
      title: 'MLOps & Deployment',
      category: 'mlops',
      level: 'Advanced',
      duration: '6 weeks',
      startDate: 'June 2026',
      price: '2000 TND',
      spots: 6,
      enrolled: 18,
      rating: 4.9,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      badge: 'Limited',
      badgeColor: 'from-purple-500 to-pink-500',
      tech: [FaPython, SiTensorflow],
      description: 'Learn to deploy, monitor, and scale machine learning models in production.'
    },
    {
      id: 5,
      title: 'Computer Vision Fundamentals',
      category: 'cv',
      level: 'Intermediate',
      duration: '8 weeks',
      startDate: 'July 2026',
      price: '1750 TND',
      spots: 10,
      enrolled: 24,
      rating: 4.6,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
      badge: 'Upcoming',
      badgeColor: 'from-yellow-500 to-orange-500',
      tech: [SiPytorch, FaBrain],
      description: 'Master image processing, object detection, and segmentation techniques.'
    },
    {
      id: 6,
      title: 'NLP with Transformers',
      category: 'nlp',
      level: 'Advanced',
      duration: '9 weeks',
      startDate: 'August 2026',
      price: '2200 TND',
      spots: 8,
      enrolled: 15,
      rating: 4.8,
      instructor: 'Naceur Keraani',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      badge: 'Premium',
      badgeColor: 'from-indigo-500 to-purple-500',
      tech: [SiPytorch, SiTensorflow],
      description: 'Advanced natural language processing with transformer architectures.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Courses', count: 6 },
    { id: 'ai-ml', label: 'AI & ML', count: 2 },
    { id: 'deep-learning', label: 'Deep Learning', count: 2 },
    { id: 'data-science', label: 'Data Science', count: 1 },
    { id: 'mlops', label: 'MLOps', count: 1 },
  ];

  const filteredFormations = activeCategory === 'all' 
    ? formations 
    : formations.filter(f => f.category === activeCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredFormations.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredFormations.length / 3)) % Math.ceil(filteredFormations.length / 3));
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiLayers className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">EXPERT LED TRAINING</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Master AI with</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Hands-On Training
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your career with comprehensive training programs designed and taught by 
            industry expert Naceur Keraani. Learn cutting-edge AI technologies through practical projects.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`group relative px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
              }`}
            >
              <span className="font-semibold">{category.label}</span>
              <span className={`ml-2 text-sm ${
                activeCategory === category.id ? 'text-white/80' : 'text-gray-500'
              }`}>
                ({category.count})
              </span>
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${
                activeCategory === category.id ? 'opacity-20' : 'group-hover:opacity-10'
              } transition-opacity duration-500`} />
            </button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white">
            Featured Programs <span className="text-primary-400">({filteredFormations.length})</span>
          </h3>
          
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-300"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-300"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {filteredFormations.map((formation) => (
              <div key={formation.id} className="w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0">
                <div className="group relative h-full">
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  
                  {/* Main Card */}
                  <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 group-hover:scale-105">
                    
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={formation.image} 
                        alt={formation.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Badge */}
                      <div className={`absolute top-4 right-4 bg-gradient-to-r ${formation.badgeColor} text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg`}>
                        {formation.badge}
                      </div>
                      
                      {/* Tech Stack Icons */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        {formation.tech.map((Icon, index) => (
                          <div 
                            key={index}
                            className="p-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg"
                          >
                            <Icon className="text-lg text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Category & Level */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-primary-400 font-semibold uppercase tracking-wider">
                          {formation.category.replace('-', ' ')}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 text-xs font-medium rounded-full">
                          {formation.level}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors leading-tight">
                        {formation.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {formation.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-400">
                            <FiClock className="text-primary-400" />
                            <span>{formation.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <FiUsers className="text-primary-400" />
                            <span>{formation.enrolled}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="fill-current" />
                          <span className="font-semibold">{formation.rating}</span>
                        </div>
                      </div>

                      {/* Instructor & Date */}
                      <div className="flex items-center justify-between text-sm mb-6">
                        <div className="text-gray-500">
                          <span className="text-gray-400">Instructor: </span>
                          {formation.instructor}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <FiCalendar className="text-primary-400" />
                          <span>Starts {formation.startDate}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

                      {/* Footer - Price & Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                            {formation.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formation.spots} spots remaining
                          </div>
                        </div>
                        
                        <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 overflow-hidden">
                          <span>Enroll Now</span>
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-3xl transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(filteredFormations.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-gradient-to-r from-primary-500 to-blue-500' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-8 py-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Custom Training for Your Team?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contact us for customized corporate training programs tailored to your organization's needs.
            </p>
            <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <span>Request Custom Training</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 30px) scale(1.1);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LatestFormations;