import React from 'react';
import { FiLayers, FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi';

const LatestFormations = () => {
  const formations = [
    {
      title: 'Machine Learning Mastery',
      category: 'AI & ML',
      level: 'Advanced',
      duration: '8 weeks',
      startDate: 'March 2026',
      price: '1200 TND',
      spots: 5,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    {
      title: 'Deep Learning Fundamentals',
      category: 'Neural Networks',
      level: 'Intermediate',
      duration: '6 weeks',
      startDate: 'April 2026',
      price: '950 TND',
      spots: 8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      badge: 'Popular',
      badgeColor: 'bg-blue-500'
    },
    {
      title: 'Data Science with Python',
      category: 'Data Analysis',
      level: 'Beginner',
      duration: '4 weeks',
      startDate: 'May 2026',
      price: '750 TND',
      spots: 12,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      badge: 'Soon',
      badgeColor: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <FiLayers className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Training Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Latest Formations
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive training programs in AI and Machine Learning
            </p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
            <span>View All Formations</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={formation.image} 
                  alt={formation.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-4 right-4 ${formation.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {formation.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/90 text-sm font-medium">{formation.category}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {formation.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiClock className="mr-2 text-primary-600" />
                    <span>{formation.duration}</span>
                    <span className="mx-2">•</span>
                    <span className="text-primary-600 font-semibold">{formation.level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="mr-2 text-primary-600" />
                    <span>Starts {formation.startDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">{formation.price}</div>
                    <div className="text-xs text-gray-500">{formation.spots} spots left</div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center space-x-2 group">
                    <span>Enroll</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestFormations;