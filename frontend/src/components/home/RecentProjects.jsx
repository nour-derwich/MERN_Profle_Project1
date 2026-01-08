import { useEffect, useState } from "react";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiGitBranch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import {
  SiMongodb,
  SiPostgresql,
  SiPytorch,
  SiTensorflow,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { projectService } from "../../services/projectService";

const RecentProjects = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    projectService
      .getFeaturedProjects()
      .then((response) => {
        // Check the actual response structure
        console.log("API Response:", response);

        // The response might be nested differently
        const projectsData = response.data || response || [];

        if (!Array.isArray(projectsData)) {
          console.error("Projects data is not an array:", projectsData);
          setProjects([]);
          return;
        }

        // Transform backend data to frontend format
        const transformedProjects = projectsData
          .slice(0, 4)
          .map((project) => {
            // Ensure project has required properties
            if (!project) return null;

            return {
              id: project.id || Math.random(),
              title: project.title || "Untitled Project",
              description:
                project.short_description ||
                project.description ||
                "No description available",
              category: project.category || "Uncategorized",
              complexity: project.complexity || "Intermediate",
              status: project.status || "Published",
              cover_image: project.cover_image || "",
              technologies: Array.isArray(project.technologies)
                ? project.technologies
                : [],
              duration: project.duration || "3 months",
              team_size: project.team_size || "4 members",
              stars: project.stars || 4.9,
              // Add transformed fields
              icon: getCategoryIcon(project.category),
              gradient: getCategoryGradient(project.category),
              image: project.cover_image || getDefaultImage(project.category),
              teamSize: project.team_size || "4 members",
              results: {
                Accuracy: "96.8%",
                ROI: "28.5%",
                Performance: "2.4x",
                Uptime: "99.9%",
              },
            };
          })
          .filter((project) => project !== null); // Remove null entries

        console.log("Transformed projects:", transformedProjects);
        setProjects(transformedProjects);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
        // Set empty array on error
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Helper functions
  const getCategoryIcon = (category) => {
    const iconMap = {
      "AI Finance": FiTrendingUp,
      "Deep Learning": FiCpu,
      "Data Science": FiDatabase,
      "AI Security": FiShield,
      "Computer Vision": FiCode,
      NLP: FiBarChart2,
      "Web Apps": FaReact,
      default: FiCode,
    };
    return iconMap[category] || iconMap.default;
  };

  const getCategoryGradient = (category) => {
    const gradientMap = {
      "AI Finance": "from-green-500/30 to-emerald-500/30",
      "Deep Learning": "from-purple-500/30 to-pink-500/30",
      "Data Science": "from-blue-500/30 to-cyan-500/30",
      "AI Security": "from-red-500/30 to-orange-500/30",
      default: "from-primary-500/30 to-blue-500/30",
    };
    return gradientMap[category] || gradientMap.default;
  };

  const getTechIcon = (tech) => {
    const iconMap = {
      Python: FaPython,
      React: FaReact,
      "Node.js": FaNodeJs,
      PyTorch: SiPytorch,
      TensorFlow: SiTensorflow,
      MongoDB: SiMongodb,
      PostgreSQL: SiPostgresql,
      default: FiCode,
    };
    return iconMap[tech] || iconMap.default;
  };

  const getTechColor = (tech) => {
    const colorMap = {
      Python: "from-blue-500 to-blue-600",
      React: "from-cyan-500 to-blue-500",
      "Node.js": "from-green-500 to-emerald-600",
      PyTorch: "from-red-500 to-orange-600",
      TensorFlow: "from-orange-500 to-yellow-600",
      MongoDB: "from-green-500 to-teal-600",
      PostgreSQL: "from-blue-500 to-indigo-600",
      default: "from-gray-500 to-gray-600",
    };
    return colorMap[tech] || colorMap.default;
  };

  const getDefaultImage = (category) => {
    // Use placeholder images from unsplash or similar
    const imageMap = {
      "AI Finance":
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Deep Learning":
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
      "Data Science":
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "AI Security":
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    };
    return imageMap[category] || imageMap.default;
  };

  const ProjectCard = ({ project, isDetailed = false }) => {
    if (!project) return null;

    const Icon = project.icon || FiCode;
    const techIcons = Array.isArray(project.technologies)
      ? project.technologies.map((tech) => ({
          name: tech,
          icon: getTechIcon(tech),
          color: getTechColor(tech),
        }))
      : [];

    if (isDetailed) {
      return (
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500">
            {/* Header Section */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = getDefaultImage(project.category);
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm text-primary-300 text-sm font-semibold rounded-full border border-primary-500/30">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full border border-gray-700/50">
                  {project.complexity}
                </span>
              </div>

              {/* Icon */}
              <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Icon className="text-2xl text-primary-400" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>
                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 text-sm font-semibold rounded-full">
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              {techIcons.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {techIcons.slice(0, 6).map((tech, idx) => {
                      const TechIcon = tech.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-lg"
                        >
                          <div
                            className={`p-1.5 bg-gradient-to-br ${tech.color} rounded`}
                          >
                            <TechIcon className="text-white text-sm" />
                          </div>
                          <span className="text-gray-300 text-sm font-medium">
                            {tech.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiClock className="text-primary-400 mx-auto mb-2" />
                  <div className="text-white font-bold">{project.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiUsers className="text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-bold">{project.teamSize}</div>
                  <div className="text-xs text-gray-500">Team</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiGitBranch className="text-green-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Completed</div>
                  <div className="text-xs text-gray-500">Status</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <FiStar className="text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-bold">
                    {project.stars || "4.9"}/5
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                  Key Results
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(project.results || {}).map(
                    ([key, value], idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30"
                      >
                        <div className="text-lg font-bold text-white">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 rounded-xl hover:text-white hover:border-primary-500/30 transition-all duration-300">
                  <FiExternalLink className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View
    return (
      <div className="relative group">
        {/* Mini Card View */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300 group-hover:scale-105">
          <div className="relative h-40 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = getDefaultImage(project.category);
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-30`}
            />
            <div className="absolute top-3 right-3">
              <div className="p-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg">
                <Icon className="text-primary-400" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm text-primary-300 text-xs font-semibold rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {techIcons.slice(0, 3).map((tech, idx) => {
                  const TechIcon = tech.icon;
                  return (
                    <div
                      key={idx}
                      className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full"
                      title={tech.name}
                    >
                      <TechIcon className="text-gray-400 text-xs" />
                    </div>
                  );
                })}
                {techIcons.length > 3 && (
                  <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-full text-xs text-gray-400">
                    +{techIcons.length - 3}
                  </div>
                )}
              </div>
              <button className="text-primary-400 hover:text-primary-300 transition-colors">
                <FiArrowRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading projects...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-full blur-3xl" />

        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Binary Code Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 animate-binary-fall">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-sm font-mono text-primary-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-500/30 mb-6">
            <FiCode className="text-primary-300" />
            <span className="text-primary-200 font-medium tracking-wider">
              PROJECT PORTFOLIO
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Innovative</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge machine learning projects that solve complex problems
            and deliver measurable results. Each project showcases technical
            expertise and innovative problem-solving.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-primary-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === "detailed"
                  ? "bg-gradient-to-r from-primary-500 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Detailed View
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No projects found.</p>
            <p className="text-gray-500 text-sm">
              Add some projects in the admin panel to see them here.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} isDetailed />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Project Impact Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  28.5%
                </div>
                <div className="text-gray-400">Average ROI</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  96.8%
                </div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {projects.length}+
                </div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-8 py-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Next AI Project?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can transform your ideas into intelligent
              solutions with cutting-edge machine learning.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="group relative bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <span>Start a Project</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes binary-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .animate-binary-fall {
          animation: binary-fall 10s linear infinite;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

export default RecentProjects;
