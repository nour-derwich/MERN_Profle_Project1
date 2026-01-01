// src/components/skills/ProgrammingSkills.jsx
import React from 'react';
import { FiCode } from 'react-icons/fi';
import SkillCard from './SkillCard';
import programmingSkills from './data/programmingSkills';

const ProgrammingSkills = ({ isVisible }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <FiCode className="text-3xl text-primary-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Programming Languages
            </h2>
          </div>
          <p className="text-gray-600 ml-12">Core programming languages I excel in</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programmingSkills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} isVisible={isVisible}>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.name}</h3>
                <span className="text-sm text-primary-600 font-semibold mb-4">{skill.subtitle}</span>
              </div>
            </SkillCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammingSkills;