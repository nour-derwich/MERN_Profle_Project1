import React from 'react';
import { FiBookOpen, FiBriefcase } from 'react-icons/fi';

const QualificationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <section className="sticky top-0 z-40 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800/50 py-6 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('education')}
            className={`group relative px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'education'
                ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
            }`}
          >
            <FiBookOpen />
            <span className="font-semibold">Education</span>
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${
              activeTab === 'education' ? 'opacity-20' : 'group-hover:opacity-10'
            } transition-opacity duration-500`} />
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`group relative px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
            }`}
          >
            <FiBriefcase />
            <span className="font-semibold">Experience</span>
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${
              activeTab === 'experience' ? 'opacity-20' : 'group-hover:opacity-10'
            } transition-opacity duration-500`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default QualificationTabs;