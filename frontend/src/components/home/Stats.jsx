import React, { useState, useEffect } from 'react';
import { FiAward, FiBriefcase, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Stats = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    certifications: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const targets = {
      experience: 2,
      projects: 15,
      clients: 10,
      certifications: 7
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        experience: Math.floor(targets.experience * progress),
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        certifications: Math.floor(targets.certifications * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: FiAward,
      value: counters.experience,
      suffix: '+',
      label: 'Years Experience',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FiBriefcase,
      value: counters.projects,
      suffix: '+',
      label: 'Projects Completed',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      icon: FiUsers,
      value: counters.clients,
      suffix: '+',
      label: 'Happy Clients',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FiTrendingUp,
      value: counters.certifications,
      suffix: '+',
      label: 'IBM Certifications',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Achievements & 
            <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that reflect dedication, expertise, and successful project delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex p-4 rounded-xl ${stat.bgColor} mb-4`}>
                  <Icon className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;