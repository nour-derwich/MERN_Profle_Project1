// src/components/skills/ToolsLibraries.jsx
import React from 'react';
import { FiTool } from 'react-icons/fi';
import toolsLibraries from './data/toolsLibraries';

const ToolsLibraries = ({ isVisible }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <FiTool className="text-3xl text-primary-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tools & Libraries
            </h2>
          </div>
          <p className="text-gray-600 ml-12">ML/AI frameworks and data science tools</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {toolsLibraries.map((tool, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {tool.name}
                </h3>
                
                {/* Circular Progress */}
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#E5E7EB"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - tool.level / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ 
                        strokeDashoffset: isVisible ? `${2 * Math.PI * 28 * (1 - tool.level / 100)}` : `${2 * Math.PI * 28}`,
                        transitionDelay: `${index * 100}ms`
                      }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{tool.level}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsLibraries;