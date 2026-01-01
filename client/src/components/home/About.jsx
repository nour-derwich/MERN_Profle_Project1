import React, { useState, useEffect } from 'react';
import { 
  FiCode, FiTrendingUp, FiTarget, FiZap, 
  FiAward, FiCheckCircle, FiArrowRight 
} from 'react-icons/fi';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const highlights = [
    {
      icon: FiCode,
      title: 'Advanced Programming',
      description: 'Expert in Python, C++, JavaScript & React for building intelligent systems'
    },
    {
      icon: FiTrendingUp,
      title: 'ML/DL Expertise',
      description: 'Specializing in PyTorch, Scikit-learn, and deep learning algorithms'
    },
    {
      icon: FiTarget,
      title: 'Data-Driven Solutions',
      description: 'Transform complex data into actionable business insights'
    }
  ];

  const expertise = [
    'Machine Learning & Deep Learning',
    'Predictive Analytics & Modeling',
    'Data Visualization & Analysis',
    'Algorithm Optimization',
    'AI Solution Architecture',
    'Risk Assessment Models'
  ];

  const languages = [
    { name: 'Arabic', level: 100 },
    { name: 'English', level: 85 },
    { name: 'French', level: 85 },
    { name: 'Deutsch', level: 70 },
    { name: 'Italian', level: 60 }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
            <FiZap className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transforming Data Into
            <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Intelligent Solutions
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI/Machine Learning Developer with 2+ years of experience specializing in 
            building predictive models and optimization algorithms
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Story & Highlights */}
          <div className="space-y-8">
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-primary-600 to-blue-600 rounded-full mr-3" />
                My Journey
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  As a dedicated AI/Machine Learning Developer, I specialize in extracting valuable 
                  insights from complex data and building intelligent systems that drive business growth. 
                  My expertise spans the entire machine learning pipeline, from data analysis to deployment.
                </p>
                <p>
                  With advanced skills in Python, PyTorch, and Scikit-learn, I develop proprietary 
                  machine learning algorithms, including long/short intraday trading systems and 
                  optimization models with specific risk parameters. My work focuses on creating 
                  solutions that are both technically sophisticated and practically applicable.
                </p>
                <p>
                  I hold multiple certifications from IBM Developer Skills Network in Machine Learning, 
                  Deep Learning, and Data Science, complementing my Higher Degree in Electrical Engineering 
                  with cutting-edge AI expertise.
                </p>
              </div>
            </div>

            {/* Highlights Cards */}
            <div className="grid gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                        <Icon className="text-2xl text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Expertise & Languages */}
          <div className="space-y-8">
            {/* Core Expertise */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FiAward className="text-primary-600 mr-3" />
                Core Expertise
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {expertise.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <FiCheckCircle className="text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Languages</h3>
              <div className="space-y-5">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{lang.name}</span>
                      <span className="text-sm text-gray-500">{lang.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-600 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${lang.level}%` : '0%',
                          transitionDelay: `${500 + index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className={`bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl p-8 shadow-xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Collaborate?
              </h3>
              <p className="text-primary-100 mb-6">
                Let's discuss how AI and machine learning can transform your business data into actionable insights.
              </p>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
                <span>View My Projects</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats Banner */}
        <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                02+
              </div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                7+
              </div>
              <div className="text-sm text-gray-600 font-medium">IBM Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">
                5
              </div>
              <div className="text-sm text-gray-600 font-medium">Languages Spoken</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;