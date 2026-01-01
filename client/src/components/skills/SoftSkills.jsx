// src/components/skills/SoftSkills.jsx
import React from 'react';
import { FiUsers, FiCheckCircle, FiTool, FiStar } from 'react-icons/fi';

const softSkills = [
  { name: 'Problem Solving', level: 95, icon: FiCheckCircle },
  { name: 'Team Collaboration', level: 90, icon: FiUsers },
  { name: 'Communication', level: 88, icon: FiUsers },
  { name: 'Project Management', level: 85, icon: FiTool },
  { name: 'Critical Thinking', level: 92, icon: FiCheckCircle },
  { name: 'Adaptability', level: 90, icon: FiStar }
];

const SoftSkills = ({ isVisible }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <FiUsers className="text-3xl text-primary-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Soft Skills
            </h2>
          </div>
          <p className="text-gray-600 ml-12">Professional and interpersonal competencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                    <Icon className="text-2xl text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-3">{skill.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level</span>
                        <span className="font-bold text-gray-900">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%', 
                            transitionDelay: `${300 + index * 100}ms` 
                          }}
                        />
                      </div>
                    </div>
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

export default SoftSkills; 