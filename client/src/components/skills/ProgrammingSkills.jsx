import React, { useState, useEffect } from 'react';
import { FiCode, FiCpu, FiDatabase, FiLayers, FiZap } from 'react-icons/fi';
import { FaPython, FaJava, FaJs, FaReact } from 'react-icons/fa';
import { SiCplusplus, SiTypescript, SiGo, SiRust } from 'react-icons/si';

const ProgrammingSkills = ({ isVisible }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeLevel, setActiveLevel] = useState('all');

  const programmingSkills = [
    {
      id: 1,
      name: 'Python',
      level: 95,
      subtitle: 'Expert',
      icon: FaPython,
      color: 'from-blue-500 to-cyan-500',
      description: 'Data Science & ML',
      projects: 25,
      experience: '4+ years',
      tags: ['ML', 'AI', 'Automation']
    },
    {
      id: 2,
      name: 'C++',
      level: 90,
      subtitle: 'Advanced',
      icon: SiCplusplus,
      color: 'from-purple-500 to-pink-500',
      description: 'Systems Programming',
      projects: 18,
      experience: '3+ years',
      tags: ['Performance', 'Embedded', 'Games']
    },
    {
      id: 3,
      name: 'JavaScript',
      level: 88,
      subtitle: 'Advanced',
      icon: FaJs,
      color: 'from-yellow-500 to-orange-500',
      description: 'Full Stack Development',
      projects: 32,
      experience: '4+ years',
      tags: ['Web', 'Node.js', 'React']
    },
    {
      id: 4,
      name: 'TypeScript',
      level: 85,
      subtitle: 'Advanced',
      icon: SiTypescript,
      color: 'from-blue-600 to-blue-800',
      description: 'Enterprise Applications',
      projects: 15,
      experience: '2+ years',
      tags: ['Scalable', 'Type-Safe', 'Modern']
    },
    {
      id: 5,
      name: 'React',
      level: 87,
      subtitle: 'Expert',
      icon: FaReact,
      color: 'from-cyan-500 to-blue-500',
      description: 'Frontend Development',
      projects: 22,
      experience: '3+ years',
      tags: ['UI/UX', 'SPA', 'Components']
    },
    {
      id: 6,
      name: 'Java',
      level: 82,
      subtitle: 'Intermediate',
      icon: FaJava,
      color: 'from-red-500 to-orange-500',
      description: 'Enterprise Systems',
      projects: 12,
      experience: '2+ years',
      tags: ['Spring', 'Android', 'Backend']
    },
    {
      id: 7,
      name: 'Go',
      level: 78,
      subtitle: 'Intermediate',
      icon: SiGo,
      color: 'from-cyan-600 to-blue-600',
      description: 'Concurrent Systems',
      projects: 8,
      experience: '1+ years',
      tags: ['Microservices', 'Cloud', 'Fast']
    },
    {
      id: 8,
      name: 'Rust',
      level: 75,
      subtitle: 'Intermediate',
      icon: SiRust,
      color: 'from-orange-600 to-red-600',
      description: 'Safe Systems Programming',
      projects: 6,
      experience: '1+ years',
      tags: ['Memory Safe', 'Performance', 'Systems']
    }
  ];

  const levels = [
    { id: 'all', label: 'All Languages', count: 8 },
    { id: 'expert', label: 'Expert (85%+)', count: 3 },
    { id: 'advanced', label: 'Advanced (75-84%)', count: 3 },
    { id: 'intermediate', label: 'Intermediate (65-74%)', count: 2 }
  ];

  const filteredSkills = activeLevel === 'all' 
    ? programmingSkills 
    : programmingSkills.filter(skill => {
        if (activeLevel === 'expert') return skill.level >= 85;
        if (activeLevel === 'advanced') return skill.level >= 75 && skill.level < 85;
        if (activeLevel === 'intermediate') return skill.level >= 65 && skill.level < 75;
        return true;
      });

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-full blur-3xl" />
        
        {/* Code Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,#80808012_1px,transparent_1px),linear-gradient(90deg,#80808012_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Animated Syntax */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs text-primary-400/20 animate-syntax-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            {i % 3 === 0 ? 'function optimize() {' : i % 3 === 1 ? 'class NeuralNetwork {' : 'async def train():'}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiCode className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">PROGRAMMING MASTERY</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Crafting Solutions in</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Modern Languages
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mastery across multiple programming paradigms and languages, enabling the 
            creation of efficient, scalable, and innovative solutions for diverse challenges.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`group relative px-5 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                activeLevel === level.id
                  ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30'
              }`}
            >
              <span className="font-semibold">{level.label}</span>
              <span className={`ml-2 text-sm ${
                activeLevel === level.id ? 'text-white/80' : 'text-gray-500'
              }`}>
                ({level.count})
              </span>
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-0 ${
                activeLevel === level.id ? 'opacity-20' : 'group-hover:opacity-10'
              } transition-opacity duration-500`} />
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.id;
            
            return (
              <div
                key={skill.id}
                className="relative group"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Card Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-3xl blur opacity-0 ${
                  isHovered ? 'opacity-30' : 'group-hover:opacity-20'
                } transition-opacity duration-500`} />
                
                {/* Main Card */}
                <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border ${
                  isHovered ? 'border-primary-500/50' : 'border-gray-700/50'
                } rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isHovered ? 'scale-105' : 'group-hover:scale-102'}`}
                style={{ transitionDelay: `${index * 100}ms` }}>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 bg-gradient-to-br ${skill.color}/20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-3xl text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {skill.level}%
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{skill.subtitle}</div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${300 + index * 100}ms`
                        }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {skill.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-700/50 pt-4">
                    <div className="flex items-center gap-1">
                      <FiLayers className="text-primary-400" />
                      <span>{skill.projects} projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiZap className="text-blue-400" />
                      <span>{skill.experience}</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 rounded-3xl opacity-0 ${
                    isHovered ? 'opacity-100' : 'group-hover:opacity-50'
                  } transition-opacity duration-300 pointer-events-none`} />
                </div>

                {/* Floating Badge */}
                <div className={`absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r ${skill.color} text-white text-xs font-bold rounded-full transform ${
                  isHovered ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                } transition-all duration-300`}>
                  {skill.level}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <span className="text-gray-400">AI/ML Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <span className="text-gray-400">Systems Programming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
            <span className="text-gray-400">Web Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <span className="text-gray-400">Frontend Specialization</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes syntax-flow {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-20px) translateX(20px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(20px) translateX(-20px);
            opacity: 0.1;
          }
          75% {
            transform: translateY(-10px) translateX(10px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
        }
        
        .animate-syntax-flow {
          animation: syntax-flow linear infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default ProgrammingSkills;