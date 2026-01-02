import React from 'react';
import { FiAward, FiDownload, FiArrowRight } from 'react-icons/fi';

const QualificationHero = ({ isVisible }) => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary-900/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/30 to-transparent rounded-full blur-3xl" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#80808012_25%,transparent_25%),linear-gradient(-45deg,#80808012_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#80808012_75%),linear-gradient(-45deg,transparent_75%,#80808012_75%)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiAward className="text-primary-300 animate-pulse" />
            <span className="text-primary-200 font-medium tracking-wider">PROFESSIONAL JOURNEY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">My Path to</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive journey through formal education, professional certifications, 
            and hands-on experience in artificial intelligence and machine learning.
          </p>

          {/* Download CV Button */}
          <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
            <FiDownload className="group-hover:animate-bounce" />
            <span>Download CV</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default QualificationHero;