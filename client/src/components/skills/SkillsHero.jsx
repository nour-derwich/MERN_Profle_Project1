// src/components/skills/SkillsHero.jsx
import React from 'react';
import { FiCode } from 'react-icons/fi';

const SkillsHero = ({ isVisible }) => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
            <FiCode className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Technical Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            My 
            <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A comprehensive overview of my technical skills, tools, and certifications 
            in AI, Machine Learning, and Software Development
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsHero;