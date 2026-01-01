// src/components/skills/BackendSkills.jsx
import React from 'react';
import { FiServer, FiCode } from 'react-icons/fi';

const backendSkills = [
  { name: 'Node.js', level: 80, icon: FiServer },
  { name: 'PostgreSQL', level: 75, icon: FiServer },
  { name: 'MongoDB', level: 78, icon: FiServer },
  { name: 'REST APIs', level: 85, icon: FiCode }
];

const BackendSkills = ({ isVisible }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <FiServer className="text-3xl text-primary-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Backend & Databases
            </h2>
          </div>
          <p className="text-gray-600 ml-12">Server-side technologies and database management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {backendSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Icon className="text-xl text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{skill.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Proficiency</span>
                    <span className="font-bold text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-600 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%', 
                        transitionDelay: `${200 + index * 100}ms` 
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BackendSkills; 