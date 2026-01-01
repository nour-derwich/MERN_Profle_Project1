import React from 'react';
import { FiCode, FiArrowRight, FiTrendingUp, FiCpu, FiDatabase } from 'react-icons/fi';

const RecentProjects = () => {
  const projects = [
    {
      title: 'AI Trading Algorithm',
      description: 'Proprietary machine learning long/short intraday algorithm with risk optimization',
      category: 'Machine Learning',
      technologies: ['Python', 'PyTorch', 'Pandas'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      icon: FiTrendingUp,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Deep Learning Models',
      description: 'Advanced neural networks for pattern recognition and predictive analytics',
      category: 'Deep Learning',
      technologies: ['PyTorch', 'TensorFlow', 'Scikit-learn'],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      icon: FiCpu,
      gradient: 'from-primary-500 to-blue-600'
    },
    {
      title: 'Data Analytics Platform',
      description: 'Multivariate regression models for business intelligence and decision making',
      category: 'Data Science',
      technologies: ['Python', 'Matplotlib', 'NumPy'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      icon: FiDatabase,
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <FiCode className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Recent Projects
            </h2>
            <p className="text-lg text-gray-600">
              Cutting-edge AI and ML solutions delivered with excellence
            </p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
            <span>View All Projects</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                      <Icon className="text-5xl text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-sm text-primary-600 font-semibold">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-lg font-semibold hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <span>View Details</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;