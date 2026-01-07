// src/components/skills/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ level, isVisible, delay = 0, gradient = 'from-primary-600 to-blue-600', showLabel = true }) => {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Proficiency</span>
          <span className="text-sm font-bold text-gray-900">{level}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;