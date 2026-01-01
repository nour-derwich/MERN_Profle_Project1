// src/components/skills/Skills.jsx
import React, { useState, useEffect } from 'react';

// Make sure you're importing the default export, not a named export
import SkillsHero from './SkillsHero';           // Correct for default export
import ProgrammingSkills from './ProgrammingSkills';
import ToolsLibraries from './ToolsLibraries';
import BackendSkills from './BackendSkills';
import SoftSkills from './SoftSkills';
import Certifications from './Certifications';
import SkillsCTA from './SkillsCTA';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SkillsHero isVisible={isVisible} />
      <ProgrammingSkills isVisible={isVisible} />
      <ToolsLibraries isVisible={isVisible} />
      <BackendSkills isVisible={isVisible} />
      <SoftSkills isVisible={isVisible} />
      <Certifications />
      <SkillsCTA />
    </div>
  );
};

export default Skills;  