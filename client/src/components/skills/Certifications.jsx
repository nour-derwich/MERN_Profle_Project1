// src/components/skills/Certifications.jsx
import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';
import certifications from './data/certifications';

const Certifications = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
            <FiAward className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certifications & Credentials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional certifications validating my expertise in AI, Machine Learning, and Data Science
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${cert.color} mb-4`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCheckCircle className="mr-2 text-green-500" />
                  <span>{cert.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;