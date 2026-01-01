// src/components/skills/SkillCard.jsx
import React from 'react';
import ProgressBar from './ProgressBar';

const SkillCard = ({ 
  skill, 
  index, 
  isVisible, 
  children,
  className = '',
  showProgress = true,
  progressDelay = 300
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
      {showProgress && (
        <div className="mt-4">
          <ProgressBar 
            level={skill.level} 
            isVisible={isVisible} 
            delay={progressDelay + index * 100}
          />
        </div>
      )}
    </div>
  );
};

export default SkillCard;