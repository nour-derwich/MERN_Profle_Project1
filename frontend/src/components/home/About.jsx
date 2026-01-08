import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiCpu as FiChip,
  FiCode,
  FiCpu,
  FiGlobe,
  FiPieChart,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import "../../styles/components/about.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [startYear] = useState(2020);
  const [totalProjects] = useState(15);
  const [totalCertifications] = useState(7);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Store the current ref value in a variable
    const currentSectionRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            const currentYear = new Date().getFullYear();
            const totalYears = currentYear - startYear;
            const duration = 2000;

            let yearsCounter = 0;
            const yearsInterval = setInterval(() => {
              yearsCounter += totalYears / (duration / 16);
              if (yearsCounter >= totalYears) {
                setYearsExperience(totalYears);
                clearInterval(yearsInterval);
              } else {
                setYearsExperience(Math.floor(yearsCounter));
              }
            }, 16);

            let projectsCounter = 0;
            const projectsInterval = setInterval(() => {
              projectsCounter += totalProjects / (duration / 16);
              if (projectsCounter >= totalProjects) {
                setProjectsCount(totalProjects);
                clearInterval(projectsInterval);
              } else {
                setProjectsCount(Math.floor(projectsCounter));
              }
            }, 16);

            // Clean up intervals when section becomes invisible
            return () => {
              clearInterval(yearsInterval);
              clearInterval(projectsInterval);
            };
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
      // Note: The intervals are cleaned up in the observer callback above
    };
  }, [startYear, totalProjects]);

  const expertisePillars = [
    {
      icon: FiCpu,
      title: "AI Engineering",
      color: "from-purple-500 to-pink-500",
      description:
        "Building intelligent systems with Python, PyTorch & TensorFlow",
      features: ["Deep Learning", "Computer Vision", "NLP"],
    },
    {
      icon: FiPieChart,
      title: "Data Science",
      color: "from-blue-500 to-cyan-500",
      description: "Transforming raw data into actionable business insights",
      features: [
        "Predictive Analytics",
        "Statistical Modeling",
        "Data Visualization",
      ],
    },
    {
      icon: FiCode,
      title: "Full-Stack Dev",
      color: "from-green-500 to-teal-500",
      description: "End-to-end solution development with modern tech stack",
      features: ["React Applications", "REST APIs", "Database Design"],
    },
  ];

  const languageSkills = [
    { name: "Arabic", level: 100, flag: "🇹🇳", native: true },
    { name: "English", level: 90, flag: "🇬🇧", proficiency: "Fluent" },
    { name: "French", level: 85, flag: "🇫🇷", proficiency: "Professional" },
    { name: "Deutsch", level: 75, flag: "🇩🇪", proficiency: "Intermediate" },
    { name: "Italian", level: 65, flag: "🇮🇹", proficiency: "Conversational" },
  ];

  const stats = [
    {
      label: "Years Innovating",
      value: yearsExperience,
      suffix: "+",
      icon: FiAward,
    },
    {
      label: "Projects Delivered",
      value: projectsCount,
      suffix: "+",
      icon: FiTarget,
    },
    {
      label: "Certifications",
      value: totalCertifications,
      suffix: "+",
      icon: FiCheckCircle,
    },
    {
      label: "Global Languages",
      value: languageSkills.length,
      suffix: "",
      icon: FiGlobe,
    },
  ];

  const timeline = [
    {
      year: "2018",
      event: "Electrical Engineering Degree",
      description: "Specialized in automation & control systems",
    },
    {
      year: "2020",
      event: "AI/ML Specialization",
      description: "Began professional journey in machine learning",
    },
    {
      year: "2022",
      event: "IBM Certifications",
      description: "Completed multiple IBM data science certifications",
    },
    {
      year: "2023",
      event: "Advanced Projects",
      description: "Led complex ML projects in predictive analytics",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary-500/10 to-cyan-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-2xl animate-float-slow" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-2xl animate-float-slow"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          >
            <FiZap className="text-primary-300 animate-pulse" />
            <span className="text-primary-200 font-medium tracking-wider">
              THE INNOVATOR'S PROFILE
            </span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          >
            <span className="text-white">Crafting the Future</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              With Intelligent Code
            </span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          >
            Bridging the gap between complex data problems and elegant AI
            solutions. With {yearsExperience}+ years of transforming theoretical
            concepts into production-ready systems.
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-gradient-to-br ${stat.icon === FiAward ? "from-yellow-500/20 to-yellow-600/20" : stat.icon === FiTarget ? "from-green-500/20 to-green-600/20" : stat.icon === FiCheckCircle ? "from-blue-500/20 to-blue-600/20" : "from-cyan-500/20 to-cyan-600/20"} rounded-lg`}
                    >
                      <Icon
                        className={`${stat.icon === FiAward ? "text-yellow-400" : stat.icon === FiTarget ? "text-green-400" : stat.icon === FiCheckCircle ? "text-blue-400" : "text-cyan-400"} text-xl`}
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{
                        width: isVisible
                          ? `${Math.min(100, stat.value * 5)}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content - Creative Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Expertise Pillars */}
          <div className="lg:col-span-2 space-y-8">
            <div
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
                <span>Expertise Pillars</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {expertisePillars.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={index}
                      className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                      style={{ transitionDelay: `${600 + index * 200}ms` }}
                    >
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-full flex items-center justify-center">
                          <FiArrowRight className="text-primary-300" />
                        </div>
                      </div>

                      <div
                        className={`inline-flex p-3 rounded-xl mb-4 ${pillar.color.replace("from-", "bg-gradient-to-br ")}`}
                      >
                        <Icon className="text-2xl text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {pillar.description}
                      </p>

                      <div className="space-y-2">
                        {pillar.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Journey Timeline */}
            <div
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <span>Innovation Journey</span>
              </h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-blue-500/50 to-cyan-500/50" />

                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-6 group"
                      style={{ transitionDelay: `${800 + index * 200}ms` }}
                    >
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-full flex items-center justify-center group-hover:border-primary-500 transition-all duration-300">
                          <span className="text-primary-300 font-bold">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 pt-1">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {item.event}
                        </h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Languages & CTA */}
          <div className="space-y-8">
            {/* Languages Card */}
            <div
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 h-fit transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                <span>Global Communication</span>
              </h2>

              <div className="space-y-6">
                {languageSkills.map((lang, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-semibold text-white">
                          {lang.name}
                        </span>
                        {lang.native && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 text-xs rounded-full">
                            Native
                          </span>
                        )}
                        {lang.proficiency && (
                          <span className="text-sm text-gray-400">
                            {lang.proficiency}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-300">
                        {lang.level}%
                      </span>
                    </div>

                    <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{
                          width: isVisible ? `${lang.level}%` : "0%",
                          transitionDelay: `${900 + index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm italic">
                  "Effective communication across cultures enhances
                  collaboration and innovation."
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div
              className={`relative overflow-hidden rounded-3xl transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800" />

              {/* Animated Particles */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-white/10 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Glitch Effect Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />

              <div className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FiChip className="text-3xl text-white/80" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Ready to Innovate?
                    </h3>
                    <p className="text-primary-200">
                      Let's build something extraordinary
                    </p>
                  </div>
                </div>

                <p className="text-white/80 mb-8 leading-relaxed">
                  Every great innovation begins with a conversation. Let's
                  combine your vision with my technical expertise to create AI
                  solutions that redefine possibilities.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="group w-full bg-white text-gray-900 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <span>Start Collaboration</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigate("/qualification")}
                    className="w-full bg-transparent border-2 border-white/30 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <span>View Portfolio</span>
                    <FiArrowRight />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Available for projects</span>
                    </div>
                    <span>Response time: 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-8 py-6">
            <p className="text-2xl text-white/90 italic leading-relaxed">
              "In the symphony of data, I conduct algorithms that transform
              noise into harmony, crafting intelligent solutions that don't just
              predict the future — they shape it."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-0.5 w-12 bg-gradient-to-r from-primary-500 to-blue-500" />
              <span className="text-primary-300 font-medium">
                — Naceur Keraani
              </span>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
    </section>
  );
};

export default About;
