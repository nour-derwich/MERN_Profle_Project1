import React from 'react';
import QualificationCard from './QualificationCard';
import { FiBookOpen, FiBriefcase } from 'react-icons/fi';

const QualificationGrid = ({ 
  activeTab, 
  education, 
  experience, 
  isVisible, 
  selectedItem, 
  setSelectedItem,
  timelineRef 
}) => {
  return (
    <section ref={timelineRef} className="py-16">
      <div className="container mx-auto px-4">
        {/* Education Grid */}
        {activeTab === 'education' && (
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
                <FiBookOpen className="text-primary-300" />
                <span className="text-primary-200 font-medium tracking-wider">EDUCATION & CERTIFICATIONS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Academic Excellence
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Formal education and professional certifications that built the foundation of my expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {education.map((item, index) => (
                <QualificationCard 
                  key={item.id} 
                  item={item} 
                  type="education"
                  index={index}
                  isVisible={isVisible}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Experience Grid */}
        {activeTab === 'experience' && (
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
                <FiBriefcase className="text-primary-300" />
                <span className="text-primary-200 font-medium tracking-wider">PROFESSIONAL EXPERIENCE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Career Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Hands-on experience and professional achievements in AI/ML development.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experience.map((item, index) => (
                <QualificationCard 
                  key={item.id} 
                  item={item} 
                  type="experience"
                  index={index}
                  isVisible={isVisible}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QualificationGrid;