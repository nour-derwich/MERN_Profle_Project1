import { useEffect, useState } from "react";
import { FaBookReader, FaPython } from "react-icons/fa";
import {
  FiBook,
  FiBookOpen,
  FiChevronRight,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiStar,
} from "react-icons/fi";

const CoursesBooksHero = ({ isVisible }) => {
  const [activeBook, setActiveBook] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBook((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featuredBooks = [
    {
      title: "Deep Learning",
      author: "Ian Goodfellow",
      color: "from-purple-600 to-pink-600",
      icon: FiCpu,
      year: "2016",
      pages: "800",
      level: "Advanced",
    },
    {
      title: "Python ML",
      author: "Sebastian Raschka",
      color: "from-blue-600 to-cyan-600",
      icon: FaPython,
      year: "2019",
      pages: "770",
      level: "Intermediate",
    },
    {
      title: "Hands-on ML",
      author: "Aurélien Géron",
      color: "from-orange-600 to-red-600",
      icon: FiCode,
      year: "2022",
      pages: "850",
      level: "Practical",
    },
    {
      title: "Data Science",
      author: "Joel Grus",
      color: "from-green-600 to-emerald-600",
      icon: FiDatabase,
      year: "2019",
      pages: "400",
      level: "Fundamentals",
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Books Read",
      icon: FiBook,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "4.8",
      label: "Avg Rating",
      icon: FiStar,
      color: "from-yellow-500 to-orange-500",
    },
    {
      value: "2K+",
      label: "Pages Mastered",
      icon: FiBookOpen,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "3",
      label: "Years Curating",
      icon: FiClock,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Python Programming",
    "Mathematics",
    "Statistics",
    "AI Ethics",
    "Research Papers",
  ];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Library Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#ffffff12_1px,transparent_1px),linear-gradient(180deg,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Book Stacks */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-primary-600/10 to-transparent rounded-lg blur-3xl rotate-45 animate-float-slow" />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-lg blur-3xl rotate-12 animate-float-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Page Corner Effect */}
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-transparent to-white/5 rounded-tr-full" />
      </div>

      {/* Animated Text Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute font-serif text-sm text-primary-400/20 animate-text-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {"import knowledge".repeat(3)}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="pt-32 pb-20">
          {/* Animated Books Carousel */}
          <div className="relative mb-12">
            <div className="flex justify-center items-center gap-8">
              {featuredBooks.map((book, index) => {
                const Icon = book.icon;
                const isActive = index === activeBook;

                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-1000 ${
                      isActive ? "scale-110 opacity-100" : "scale-90 opacity-40"
                    }`}
                    style={{
                      transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.01}deg)`,
                      transitionDelay: `${index * 200}ms`,
                    }}
                  >
                    {/* Book Glow */}
                    <div
                      className={`absolute -inset-4 bg-gradient-to-br ${book.color} rounded-lg blur-xl opacity-0 ${
                        isActive ? "opacity-30" : ""
                      } transition-opacity duration-1000`}
                    />

                    {/* Book Container */}
                    <div
                      className={`relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 border ${
                        isActive
                          ? "border-primary-500/50"
                          : "border-gray-700/50"
                      } rounded-lg backdrop-blur-sm transform ${
                        isActive ? "rotate-0" : "rotate-6"
                      } transition-all duration-700 shadow-2xl`}
                      style={{
                        width: "160px",
                        height: "200px",
                      }}
                    >
                      {/* Book Spine */}
                      <div
                        className={`absolute -left-2 top-0 bottom-0 w-4 bg-gradient-to-b ${book.color} rounded-l-lg`}
                      />

                      {/* Book Cover */}
                      <div className="h-full flex flex-col justify-center items-center">
                        <Icon className="text-4xl text-white mb-3" />
                        <div className="text-center">
                          <div className="text-sm font-bold text-white mb-1 line-clamp-2">
                            {book.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {book.author}
                          </div>
                        </div>
                      </div>

                      {/* Page Effect */}
                      <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-white/10" />
                    </div>

                    {/* Book Details */}
                    <div
                      className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <div className="text-xs text-gray-400">
                        {book.year} • {book.pages}p
                      </div>
                      <div
                        className={`text-xs font-medium bg-gradient-to-r ${book.color} bg-clip-text text-transparent`}
                      >
                        {book.level}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-8 group hover:border-primary-500/50 transition-all duration-300">
              <div className="relative">
                <FiBook className="text-primary-300" />
                <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-primary-200 font-medium tracking-wider">
                KNOWLEDGE LIBRARY
              </span>
              <div className="w-4 h-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">The Wisdom</span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Library
              </span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" />
              <p className="text-2xl text-gray-300 font-semibold">
                Curated AI & ML Resources
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              A carefully selected collection of books, courses, and resources
              that have shaped my journey in artificial intelligence. Each
              recommendation is battle-tested and proven valuable for mastering
              complex concepts.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`group relative transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    {/* Card Glow */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group-hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${stat.color}/20 rounded-lg`}
                        >
                          <Icon className="text-primary-400" />
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Categories */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-400 rounded-full text-sm font-medium transition-all duration-300 hover:border-primary-500/30 hover:text-white hover:scale-105 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${600 + index * 50}ms` }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className={`mt-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <button className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
                <FaBookReader />
                <span>Explore the Library</span>
                <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce-slow">
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-gray-500 font-medium tracking-wider">
                  DISCOVER RESOURCES
                </div>
                <div className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center p-2">
                  <div className="w-1 h-3 bg-gradient-to-b from-primary-400 to-blue-400 rounded-full animate-scroll" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(45deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(60deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(30deg);
          }
        }
        
        @keyframes text-flow {
          0% {
            transform: translateX(-100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(100vw) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-text-flow {
          animation: text-flow linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default CoursesBooksHero;
