import React, { useState, useEffect } from 'react';
import {
  FiAward, FiCheckCircle, FiBookOpen, FiCalendar,
  FiClock, FiStar, FiExternalLink, FiFilter,
  FiChevronRight, FiShield, FiZap, FiTrendingUp
} from 'react-icons/fi';
import { FaPython, FaRobot, FaDatabase } from 'react-icons/fa';
import { SiIbm, SiTensorflow, SiMicrosoftazure } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';


const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCert, setHoveredCert] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const navigate = useNavigate();


  const certifications = [
    {
      id: 1,
      name: 'Deep Learning Specialization',
      issuer: 'IBM Developer Skills Network',
      date: 'March 2024',
      icon: FaRobot,
      color: 'from-purple-600 to-pink-600',
      category: 'ai-ml',
      duration: '6 weeks',
      level: 'Advanced',
      skills: ['Neural Networks', 'CNNs', 'RNNs', 'TensorFlow'],
      verified: true,
      badge: 'Top Rated',
      link: '#'
    },
    {
      id: 2,
      name: 'Machine Learning with Python',
      issuer: 'IBM Developer Skills Network',
      date: 'February 2024',
      icon: FaPython,
      color: 'from-blue-600 to-cyan-600',
      category: 'ai-ml',
      duration: '8 weeks',
      level: 'Intermediate',
      skills: ['Scikit-learn', 'Pandas', 'Model Evaluation'],
      verified: true,
      badge: 'Verified',
      link: '#'
    },
    {
      id: 3,
      name: 'Data Science Professional',
      issuer: 'IBM Developer Skills Network',
      date: 'December 2023',
      icon: FaDatabase,
      color: 'from-green-600 to-emerald-600',
      category: 'data-science',
      duration: '10 weeks',
      level: 'Advanced',
      skills: ['Data Analysis', 'Visualization', 'Statistics'],
      verified: true,
      badge: 'Professional',
      link: '#'
    },
    {
      id: 4,
      name: 'AI Engineering Certification',
      issuer: 'IBM Developer Skills Network',
      date: 'October 2023',
      icon: FiZap,
      color: 'from-orange-600 to-red-600',
      category: 'ai-ml',
      duration: '12 weeks',
      level: 'Expert',
      skills: ['MLOps', 'Deployment', 'Model Serving'],
      verified: true,
      badge: 'Expert Level',
      link: '#'
    },
    {
      id: 5,
      name: 'TensorFlow Developer',
      issuer: 'TensorFlow / Google',
      date: 'August 2023',
      icon: SiTensorflow,
      color: 'from-yellow-600 to-orange-600',
      category: 'ai-ml',
      duration: 'Certification',
      level: 'Advanced',
      skills: ['TensorFlow', 'Keras', 'Production'],
      verified: true,
      badge: 'Google Certified',
      link: '#'
    },
    {
      id: 6,
      name: 'Azure AI Engineer',
      issuer: 'Microsoft',
      date: 'June 2023',
      icon: SiMicrosoftazure,
      color: 'from-blue-700 to-cyan-700',
      category: 'cloud-ai',
      duration: 'Professional',
      level: 'Expert',
      skills: ['Azure ML', 'Cognitive Services', 'AI Solutions'],
      verified: true,
      badge: 'Microsoft',
      link: '#'
    },
    {
      id: 7,
      name: 'Data Analysis with Python',
      issuer: 'IBM Developer Skills Network',
      date: 'May 2023',
      icon: FiTrendingUp,
      color: 'from-indigo-600 to-purple-600',
      category: 'data-science',
      duration: '6 weeks',
      level: 'Intermediate',
      skills: ['NumPy', 'Pandas', 'Matplotlib'],
      verified: true,
      badge: 'Completed',
      link: '#'
    },
    {
      id: 8,
      name: 'Python 101 for Data Science',
      issuer: 'IBM Developer Skills Network',
      date: 'April 2023',
      icon: FaPython,
      color: 'from-teal-600 to-green-600',
      category: 'data-science',
      duration: '4 weeks',
      level: 'Beginner',
      skills: ['Python Basics', 'Data Types', 'Functions'],
      verified: true,
      badge: 'Fundamentals',
      link: '#'
    },
    {
      id: 9,
      name: 'AI & ML Professional',
      issuer: 'GOMYCODE',
      date: 'February 2023',
      icon: FiShield,
      color: 'from-red-600 to-pink-600',
      category: 'ai-ml',
      duration: '5 months',
      level: 'Professional',
      skills: ['Full Stack ML', 'Projects', 'Portfolio'],
      verified: true,
      badge: 'Intensive',
      link: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Certifications', count: 9, icon: FiAward },
    { id: 'ai-ml', label: 'AI & Machine Learning', count: 5, icon: FaRobot },
    { id: 'data-science', label: 'Data Science', count: 3, icon: FaDatabase },
    { id: 'cloud-ai', label: 'Cloud AI', count: 1, icon: SiMicrosoftazure }
  ];

  const filteredCerts = activeFilter === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === activeFilter);

  const issuerStats = {
    'IBM Developer Skills Network': 6,
    'TensorFlow / Google': 1,
    'Microsoft': 1,
    'GOMYCODE': 1
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Diploma Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating Awards */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Badges */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-badge-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            <FiAward className="text-primary-400/20 text-3xl" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiAward className="text-primary-300 animate-pulse" />
            <span className="text-primary-200 font-medium tracking-wider">PROFESSIONAL CREDENTIALS</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Certified</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Validated expertise through industry-recognized certifications in artificial intelligence,
            machine learning, and data science from leading technology organizations.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
              {certifications.length}
            </div>
            <div className="text-gray-400">Total Certifications</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-gray-400">Verified Credentials</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              4
            </div>
            <div className="text-gray-400">Issuing Organizations</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              3
            </div>
            <div className="text-gray-400">Expertise Areas</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group relative px-5 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
                  }`}
              >
                <Icon className={activeFilter === filter.id ? 'text-white' : 'text-gray-500'} />
                <span className="font-semibold">{filter.label}</span>
                <span className={`ml-1 text-sm ${activeFilter === filter.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                  ({filter.count})
                </span>
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${activeFilter === filter.id ? 'opacity-20' : 'group-hover:opacity-10'
                  } transition-opacity duration-500`} />
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const Icon = cert.icon;
            const isHovered = hoveredCert === cert.id;
            const showDetail = showDetails === cert.id;

            return (
              <div
                key={cert.id}
                className="relative group"
                onMouseEnter={() => setHoveredCert(cert.id)}
                onMouseLeave={() => {
                  setHoveredCert(null);
                  if (!showDetail) setShowDetails(null);
                }}
                onClick={() => setShowDetails(showDetail ? null : cert.id)}
              >
                {/* Card Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-3xl blur opacity-0 ${isHovered ? 'opacity-30' : 'group-hover:opacity-20'
                  } transition-opacity duration-500`} />

                {/* Main Card */}
                <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${isHovered ? 'border-primary-500/50' : 'border-gray-700/50'
                  } rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300 cursor-pointer ${showDetail ? 'h-auto' : 'h-full'
                  }`}>

                  {/* Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${cert.color} rounded-xl transform ${isHovered ? 'scale-110 rotate-12' : 'group-hover:scale-110'
                        } transition-all duration-300`}>
                        <Icon className="text-2xl text-white" />
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full">
                          <FiStar className="text-yellow-400 text-xs" />
                          <span className="text-xs text-gray-300 font-medium">{cert.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full mb-4">
                      <span className={`text-xs font-bold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                        {cert.badge}
                      </span>
                      {cert.verified && (
                        <FiCheckCircle className="text-green-400 text-xs" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                      {cert.name}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <span>{cert.issuer}</span>
                      <div className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span>{cert.date}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <FiClock className="text-primary-400" />
                        <span>{cert.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCalendar className="text-blue-400" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  {showDetail && (
                    <div className="border-t border-gray-700/50 px-6 py-4 animate-slide-down">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Skills Gained</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button className="w-full group relative bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 py-2 rounded-lg font-medium hover:text-white hover:border-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>View Credential</span>
                        <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-gray-700/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiCheckCircle className="text-green-400" />
                        <span>Verified Credential</span>
                      </div>
                      <button className="text-primary-400 hover:text-primary-300 transition-colors">
                        <FiChevronRight className={`transform transition-transform duration-300 ${showDetail ? 'rotate-90' : ''
                          }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute -bottom-2 left-4 right-4 h-1 bg-gradient-to-r ${cert.color} rounded-full transform ${isHovered ? 'scale-x-100' : 'scale-x-0'
                  } transition-transform duration-300`} />
              </div>
            );
          })}
        </div>

        {/* Issuer Stats */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 text-center">Certification Partners</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(issuerStats).map(([issuer, count], index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                  {count}
                </div>
                <div className="text-sm text-gray-400">{issuer}</div>
                <div className="text-xs text-gray-500">certification{count > 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-8 py-6">
            <h4 className="text-2xl font-bold text-white mb-4">
              Continuously Learning & Evolving
            </h4>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Staying at the forefront of AI and machine learning through ongoing education
              and professional development in emerging technologies.
            </p>
            <button onClick={() => navigate('/contact')} className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <FiBookOpen />
              <span>View Learning Path</span>
              <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes badge-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(20px) rotate(180deg);
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
          }
        }
        
        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-badge-float {
          animation: badge-float 15s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Certifications;