import React from 'react';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const QualificationCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-black/50 to-blue-900/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-8 py-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Collaborate?
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's combine your vision with my expertise to build innovative AI solutions 
              that drive real business impact and technological advancement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <span>Start a Project</span>
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 px-8 py-4 rounded-xl font-bold hover:text-white hover:border-primary-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <FiDownload />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationCTA;