import React from 'react';
import { FiCalendar, FiMapPin, FiCheckCircle, FiStar } from 'react-icons/fi';

const QualificationCard = ({ item, type, index, isVisible, selectedItem, setSelectedItem }) => {
  const Icon = item.icon;
  const isSelected = selectedItem?.id === item.id && selectedItem?.type === type;
  
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => setSelectedItem({ ...item, type })}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-0 ${
        isSelected ? 'opacity-30' : 'group-hover:opacity-20'
      } transition-opacity duration-500`} />
      
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${
        isSelected ? 'border-primary-500/50' : 'border-gray-700/50'
      } rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 ${
        isSelected ? 'scale-105' : 'group-hover:scale-102'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${item.bgColor} rounded-xl transform ${
            isSelected ? 'rotate-12 scale-110' : 'group-hover:scale-110'
          } transition-all duration-300`}>
            <Icon className="text-2xl text-white" />
          </div>
          
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full">
              <FiStar className="text-yellow-400 text-xs" />
              <span className="text-xs text-gray-300 font-medium">{item.type}</span>
            </div>
          </div>
        </div>

        {/* Title & Institution */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-primary-400 font-semibold text-sm mb-3">
          {item.institution || item.company}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FiCalendar className="text-primary-400" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiMapPin className="text-blue-400" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {item.skills.length > 3 && (
            <span className="px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-500 text-xs rounded-md">
              +{item.skills.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiCheckCircle className="text-green-400" />
            <span>Verified Credential</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 rounded-md">
              {item.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationCard;