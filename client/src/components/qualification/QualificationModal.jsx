import React from 'react';
import { FiCalendar, FiMapPin, FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const QualificationModal = ({ selectedItem, setSelectedItem }) => {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-30" />
        
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-lg">
          {/* Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-br ${selectedItem.bgColor} rounded-xl`}>
                  {React.createElement(selectedItem.icon, { className: "text-2xl text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
                  <p className="text-primary-400 font-semibold">
                    {selectedItem.institution || selectedItem.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:border-primary-500/30 transition-all duration-300"
              >
                <FiArrowRight className="rotate-45" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Description</h4>
                  <p className="text-gray-400">
                    {selectedItem.description || 'Professional experience and achievements in the field.'}
                  </p>
                </div>

                {selectedItem.achievements && (
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedItem.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-400">
                          <FiCheckCircle className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-3">Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiCalendar className="text-primary-400" />
                      <span>{selectedItem.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiMapPin className="text-blue-400" />
                      <span>{selectedItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiAward className="text-yellow-400" />
                      <span>{selectedItem.type}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-3">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 text-sm rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationModal;