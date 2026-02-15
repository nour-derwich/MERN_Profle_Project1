import { useEffect, useRef, useState } from "react";
import { FaPython, FaReact, FaWhatsapp } from "react-icons/fa";
import {
  FiAward,
  FiBriefcase,
  FiChevronRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiZap,
} from "react-icons/fi";
import { SiPytorch, SiTensorflow } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Naceurimage from "../../assets/images/naceeiruhncf.jpeg";
import "../../styles/components/hero.css";

const Hero = () => {
  const [, setScrollY] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [startYear] = useState(2020);
  const [totalProjects] = useState(20);
  const [activeTech, setActiveTech] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Animate counters
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;
    const duration = 2000;

    // Years counter
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

    // Projects counter
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

    return () => {
      clearInterval(yearsInterval);
      clearInterval(projectsInterval);
    };
  }, [startYear, totalProjects]);

  // Tech stack rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { icon: FaPython, label: "Python", color: "from-blue-500 to-cyan-500" },
    { icon: SiPytorch, label: "PyTorch", color: "from-red-500 to-orange-500" },
    {
      icon: SiTensorflow,
      label: "TensorFlow",
      color: "from-orange-500 to-yellow-500",
    },
    { icon: FaReact, label: "React", color: "from-cyan-500 to-blue-500" },
  ];

  const stats = [
    {
      icon: FiAward,
      label: "Years Experience",
      value: yearsExperience,
      suffix: "+",
      description: "Building AI solutions",
    },
    {
      icon: FiBriefcase,
      label: "Projects Delivered",
      value: projectsCount,
      suffix: "+",
      description: "Successful implementations",
    },
    {
      icon: FiZap,
      label: "IBM Certifications",
      value: "07",
      suffix: "+",
      description: "Professional credentials",
    },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      url: "https://www.linkedin.com/in/keraani-naceur-49523a175/",
      label: "LinkedIn",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: FiGithub,
      url: "https://github.com",
      label: "GitHub",
      gradient: "from-gray-800 to-black",
    },
    {
      icon: FaWhatsapp,
      url: "https://api.whatsapp.com/send?phone=0021695881709&text=Hello, more information!",
      label: "WhatsApp",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const infoData = {
    fullName: "Naceur Keraani",
    position: "AI & Automation Engineer",
    bio: "I am an AI & Automation Engineer specializing in the integration of industrial automation systems with artificial intelligence and data-driven technologies. I design and develop intelligent solutions that improve efficiency, reliability, and performance across industrial and real-world applications. My expertise includes PLC programming, industrial control systems, machine learning, and data analysis, allowing me to bridge the gap between physical systems and intelligent software. I focus on creating practical, scalable automation solutions that turn complex challenges into optimized processes.Driven by innovation, discipline, and continuous learning, I aim to build smart automation systems that deliver measurable impact and long-term value.",
    location: "Tunis, Tunisia",
    email: "info@naceur-keraani.com",
    phone: "+216 95 88 17 09",
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-blue-900/20" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-2/3 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Binary Code Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 animate-binary-scroll">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-xs font-mono text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - Creative Layout */}
          <div className="relative order-2 lg:order-1">
            {/* Floating Tech Badges - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block absolute -top-6 -left-6 z-20">
              <div className="relative w-32 h-32">
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  const isActive = index === activeTech;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50"
                      }`}
                    >
                      <div
                        className={`p-4 bg-gradient-to-br ${tech.color} rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500`}
                      >
                        <Icon className="text-3xl text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-green-500/30 mb-8 lg:ml-20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-300">
                Available for projects
              </span>
              <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full ml-2" />
            </div>

            {/* Name & Title with Glitch Effect */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4">
                <span className="block text-white">NACEUR</span>
                <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  KERAANI
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full hidden sm:block" />
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300">
                    {infoData.position}
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                </div>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                <FiMapPin className="text-primary-400" />
                <span className="text-gray-300">{infoData.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-10 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-blue-500 rounded-full" />
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed pl-6">
                {infoData.bio}
              </p>
            </div>

            {/* Stats Cards - Creative Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-4 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 ${
                            stat.icon === FiAward
                              ? "bg-yellow-500/20"
                              : stat.icon === FiBriefcase
                                ? "bg-green-500/20"
                                : "bg-blue-500/20"
                          } rounded-lg`}
                        >
                          <Icon
                            className={`${
                              stat.icon === FiAward
                                ? "text-yellow-400"
                                : stat.icon === FiBriefcase
                                  ? "text-green-400"
                                  : "text-blue-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {stat.value}
                            {stat.suffix}
                          </div>
                          <div className="text-xs text-gray-400">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => navigate("/projects")}
                className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-6 sm:px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <span>Start a Project</span>
                <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-gray-500 font-medium">Connect</span>
              <div className="h-0.5 w-8 bg-gradient-to-r from-gray-700 to-transparent hidden sm:block" />
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:scale-110 transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      />
                      <Icon className="text-gray-400 group-hover:text-white transition-colors relative z-10" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Ultra Premium Showcase */}
          <div className="relative order-1 lg:order-2">
            {/* Professional Image Display */}
            <div className="relative group/showcase">
              {/* Ambient Background Light */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary-400/20 via-blue-500/15 to-cyan-400/20 rounded-[4rem] blur-[80px] opacity-60 group-hover/showcase:opacity-90 transition-all duration-1000" />

              {/* Main Showcase Card */}
              <div className="relative max-w-sm mx-auto lg:max-w-md">
                {/* Premium Border System */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400 via-blue-500 to-cyan-400 rounded-[2rem] opacity-75 blur-sm" />
                <div className="absolute -inset-0.5 bg-gradient-to-tl from-cyan-400 via-blue-500 to-primary-400 rounded-[2rem] opacity-0 group-hover/showcase:opacity-50 blur-sm transition-opacity duration-700" />

                {/* Image Card */}
                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[2rem] overflow-hidden shadow-2xl">
                  {/* Top Glass Bar */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm z-20 border-b border-white/5">
                    <div className="flex items-center justify-between px-5 py-3">
                      {/* Status Pill */}
                      <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg px-3 py-1.5 rounded-full border border-green-400/30">
                        <div className="relative">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                        </div>
                        <span className="text-xs font-bold text-green-300 tracking-wide">
                          AVAILABLE
                        </span>
                      </div>

                      {/* Pro Badge */}
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-lg px-3 py-1.5 rounded-full border border-yellow-400/30">
                        <FiZap className="text-yellow-400 text-xs animate-pulse" />
                        <span className="text-xs font-bold text-yellow-300 tracking-wide">
                          EXPERT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Portrait Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={Naceurimage}
                      alt="Naceur Keraani - AI & Automation Engineer"
                      className="w-full h-full object-cover object-center transform group-hover/showcase:scale-110 transition-transform duration-[1500ms] ease-out"
                    />

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                    {/* Signature Corner Accent */}
                    <div className="absolute top-20 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
                    <div className="absolute bottom-24 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                  </div>

                  {/* Bottom Info Panel */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md p-6 border-t border-white/10">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        Naceur Keraani
                      </h3>
                      <p className="text-sm text-gray-300 font-medium">
                        AI & Automation Engineer
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-1 h-1 rounded-full bg-primary-400" />
                        <FiMapPin className="text-primary-400 text-xs" />
                        <span className="text-xs text-gray-400 font-medium">
                          Tunis, Tunisia
                        </span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {yearsExperience}+
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Years
                        </div>
                      </div>
                      <div className="text-center border-x border-white/10">
                        <div className="text-lg font-bold text-white">
                          {projectsCount}+
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">7+</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Certs
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Frame Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-400/60 rounded-tl-xl" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-xl" />
                  <div className="absolute bottom-32 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400/60 rounded-bl-xl" />
                  <div className="absolute bottom-32 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-400/60 rounded-br-xl" />
                </div>
              </div>
            </div>

            {/* Tech Stack - Refined */}
            <div className="mt-8 relative max-w-sm mx-auto lg:max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-[1.5rem] blur-md" />
              <div className="relative bg-gradient-to-br from-gray-900/98 via-black/98 to-gray-900/98 backdrop-blur-xl border border-gray-700/50 rounded-[1.5rem] p-5 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-cyan-400 rounded-full" />
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      TECH STACK
                    </h4>
                  </div>
                  {/* Progress Indicator */}
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === activeTech
                            ? "w-6 bg-gradient-to-r from-primary-400 to-cyan-400"
                            : "w-1 bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Tech Grid - Compact */}
                <div className="grid grid-cols-2 gap-2.5">
                  {techStack.map((tech, index) => {
                    const Icon = tech.icon;
                    const isActive = index === activeTech;
                    return (
                      <div
                        key={index}
                        className="relative group/tech cursor-pointer"
                      >
                        {isActive && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/50 to-cyan-500/50 rounded-xl blur-sm" />
                        )}
                        <div
                          className={`relative flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-primary-500/50 shadow-lg"
                              : "bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50"
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg transition-all duration-500 ${
                              isActive
                                ? `bg-gradient-to-br ${tech.color}`
                                : "bg-gray-700/50"
                            }`}
                          >
                            <Icon
                              className={`text-base ${isActive ? "text-white" : "text-gray-400"}`}
                            />
                          </div>
                          <span
                            className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-400"}`}
                          >
                            {tech.label}
                          </span>
                          {isActive && (
                            <div className="ml-auto w-1 h-1 rounded-full bg-primary-400 animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Card - Sleek */}
            <div className="mt-4 relative max-w-sm mx-auto lg:max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-[1.5rem] blur-md" />
              <div className="relative bg-gradient-to-br from-gray-900/98 via-black/98 to-gray-900/98 backdrop-blur-xl border border-gray-700/50 rounded-[1.5rem] p-5 shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-cyan-400 rounded-full" />
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    GET IN TOUCH
                  </h3>
                </div>

                {/* Contact Options - Clean */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${infoData.email}`}
                    className="group/link relative block"
                  >
                    <div className="absolute -inset-px bg-gradient-to-r from-primary-500/0 to-cyan-500/0 group-hover/link:from-primary-500/30 group-hover/link:to-cyan-500/30 rounded-lg blur-sm transition-all duration-300" />
                    <div className="relative flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-700/30 group-hover/link:border-primary-500/50 group-hover/link:bg-gray-800/60 transition-all duration-300">
                      <div className="p-2 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-lg group-hover/link:scale-110 transition-transform duration-300">
                        <FiMail className="text-primary-400 text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 font-medium">
                          Email
                        </div>
                        <div className="text-sm text-white font-semibold truncate group-hover/link:text-primary-300 transition-colors">
                          {infoData.email}
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-600 group-hover/link:text-primary-400 group-hover/link:translate-x-0.5 transition-all text-sm flex-shrink-0" />
                    </div>
                  </a>

                  <a
                    href={`tel:${infoData.phone.replace(/\s/g, "")}`}
                    className="group/link relative block"
                  >
                    <div className="absolute -inset-px bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover/link:from-green-500/30 group-hover/link:to-emerald-500/30 rounded-lg blur-sm transition-all duration-300" />
                    <div className="relative flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-700/30 group-hover/link:border-green-500/50 group-hover/link:bg-gray-800/60 transition-all duration-300">
                      <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg group-hover/link:scale-110 transition-transform duration-300">
                        <FiPhone className="text-green-400 text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 font-medium">
                          Phone
                        </div>
                        <div className="text-sm text-white font-semibold group-hover/link:text-green-300 transition-colors">
                          {infoData.phone}
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-600 group-hover/link:text-green-400 group-hover/link:translate-x-0.5 transition-all text-sm flex-shrink-0" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <div className="text-sm text-gray-500 font-medium tracking-wider hidden sm:block">
            EXPLORE MORE
          </div>
          <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-blue-400 rounded-full animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
