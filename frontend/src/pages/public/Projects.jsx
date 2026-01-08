import React, { useState, useEffect, useMemo } from "react";
import { motion } from 'framer-motion';

// Import components
import ProjectsHero from '../../components/projects/ProjectsHero';
import ProjectsFilters from '../../components/projects/ProjectsFilters';
import ProjectsGrid from '../../components/projects/ProjectsGrid';
import ProjectDetailModal from '../../components/projects/ProjectDetailModal';
import ProjectsCTA from '../../components/projects/ProjectsCTA';
import { 
  FiCode, 
  FiTrendingUp, 
  FiCpu, 
  FiDatabase, 
  FiZap, 
  FiCloud 
} from 'react-icons/fi';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [projects, setProjects] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Mock data for fallback
const mockProjects = useMemo(
  () => [
    {
      id: 1,
      title: "AI-Powered Trading Algorithm",
      shortDescription:
        "Proprietary ML algorithm for automated intraday trading with real-time analytics.",
      fullDescription:
        "Developed a sophisticated machine learning algorithm for automated intraday trading that combines multiple ML models for optimal decision-making. The system processes real-time market data, identifies patterns, and executes trades with minimal latency.",
      category: "Machine Learning",
      complexity: "Expert",
      status: "completed",
      technologies: [
        "Python",
        "PyTorch",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "FastAPI",
        "Docker",
        "PostgreSQL",
        "Redis",
        "AWS",
      ],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      demoUrl: "https://demo-trading.example.com",
      githubUrl: "https://github.com/username/trading-algorithm",
      date: "January 2024",
      lastUpdated: "2024-01-15",
      featured: true,
      stars: 342,
      forks: 56,
      views: "2.3K",
      contributors: 1,
      developmentTime: "6 months",
      datasetSize: "5TB market data",
      features: [
        "Real-time market data processing at 1000+ events/second",
        "Ensemble ML models (XGBoost, LSTM, Transformer)",
        "Advanced risk management with Monte Carlo simulations",
        "Automated backtesting framework",
        "Real-time performance dashboard",
      ],
      challenges: [
        {
          description:
            "Handling high-frequency data streams with sub-millisecond latency requirements",
          solution:
            "Implemented custom data pipeline using Redis Streams and optimized Python async/await patterns",
        },
        {
          description:
            "Balancing model accuracy vs inference speed for real-time decisions",
          solution:
            "Used model quantization and TensorRT optimization, achieving <10ms inference time",
        },
      ],
      results: [
        "Achieved 73% prediction accuracy on unseen data",
        "Reduced decision latency to <50ms",
        "Generated 28% annual ROI in backtesting",
        "Successfully processed 10M+ daily market events",
      ],
      metrics: {
        "Prediction Accuracy": "73%",
        Latency: "50ms",
        "Annual ROI": "28%",
        "Events/Day": "10M+",
      },
      goals: [
        "Create scalable trading system for multiple asset classes",
        "Achieve sub-100ms end-to-end latency",
        "Maintain >70% prediction accuracy",
        "Implement robust risk management",
      ],
      architecture:
        "Microservices architecture with separate data ingestion, model serving, and execution engines. Containerized with Docker and orchestrated with Kubernetes on AWS.",
      documentationUrl: "https://docs-trading.example.com",
      articleUrl: "https://blog.example.com/ai-trading-algorithm",
    },
  ],
  []
); 

 useEffect(() => {
   const fetchProjects = async () => {
     try {
       setLoading(true);
       setError(null);

       // Try to fetch from API
       // const response = await api.get('/projects');
       // const data = response.data;

       // For now, simulate API call with setTimeout
       await new Promise((resolve) => setTimeout(resolve, 500));

       // Simulate API response - replace this with actual API call
       const data = mockProjects; // Replace with: const data = response.data || [];

       // Ensure data is an array
       if (Array.isArray(data)) {
         setProjects(data);
       } else if (data && Array.isArray(data.projects)) {
         // If response has nested projects array
         setProjects(data.projects);
       } else if (data && typeof data === "object") {
         // If it's a single object, wrap in array
         setProjects([data]);
       } else {
         // If data is not in expected format, use mock data
         setProjects(mockProjects);
         setError("Received unexpected data format from API");
       }
     } catch (err) {
       console.error("Error fetching projects:", err);
       setError(
         "Failed to load projects from server. Using sample data instead."
       );
       // Fallback to mock data
       setProjects(mockProjects);
     } finally {
       setLoading(false);
       setIsVisible(true);
     }
   };

   fetchProjects();
 }, [mockProjects]);

  // Calculate categories with counts - ensure projects is an array
  const categories = React.useMemo(() => {
    if (!Array.isArray(projects)) {
      return [
        { 
          value: 'all', 
          label: 'All Projects', 
          icon: FiCode, 
          color: 'from-gray-600 to-gray-800', 
          count: 0 
        }
      ];
    }

    return [
      { 
        value: 'all', 
        label: 'All Projects', 
        icon: FiCode, 
        color: 'from-gray-600 to-gray-800', 
        count: projects.length 
      },
      { 
        value: 'Machine Learning', 
        label: 'Machine Learning', 
        icon: FiTrendingUp, 
        color: 'from-primary-500 to-blue-600', 
        count: projects.filter(p => p.category === 'Machine Learning').length 
      },
      { 
        value: 'Deep Learning', 
        label: 'Deep Learning', 
        icon: FiCpu, 
        color: 'from-purple-500 to-pink-600', 
        count: projects.filter(p => p.category === 'Deep Learning').length 
      },
      { 
        value: 'Data Science', 
        label: 'Data Science', 
        icon: FiDatabase, 
        color: 'from-blue-500 to-cyan-600', 
        count: projects.filter(p => p.category === 'Data Science').length 
      },
      { 
        value: 'Web Apps', 
        label: 'Web Apps', 
        icon: FiZap, 
        color: 'from-orange-500 to-yellow-600', 
        count: projects.filter(p => p.category === 'Web Apps').length 
      },
      { 
        value: 'APIs', 
        label: 'APIs', 
        icon: FiCloud, 
        color: 'from-green-500 to-emerald-600', 
        count: projects.filter(p => p.category === 'APIs').length 
      }
    ];
  }, [projects]);

  // Filter projects based on multiple criteria - ensure projects is an array
  const filteredProjects = React.useMemo(() => {
    if (!Array.isArray(projects)) return [];
    
    return projects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (project.shortDescription && project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (project.technologies && Array.isArray(project.technologies) && 
         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || project.complexity === selectedComplexity;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesComplexity && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedComplexity, selectedStatus]);

  // Sort projects - ensure filteredProjects is an array
  const sortedProjects = React.useMemo(() => {
    if (!Array.isArray(filteredProjects)) return [];
    
    return [...filteredProjects].sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'recent':
          const dateA = a.lastUpdated || a.date;
          const dateB = b.lastUpdated || b.date;
          return new Date(dateB || 0) - new Date(dateA || 0);
        case 'complexity':
          const complexityOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
          return (complexityOrder[b.complexity] || 0) - (complexityOrder[a.complexity] || 0);
        case 'popular':
          return (b.stars || 0) - (a.stars || 0);
        case 'alphabetical':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });
  }, [filteredProjects, sortBy]);

  // Calculate pagination
  const itemsPerPage = viewMode === 'compact' ? 12 : viewMode === 'grid' ? 9 : 6;
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = sortedProjects.slice(startIndex, endIndex);

  const toggleFavorite = async (projectId) => {
    try {
      // If you want to sync with backend
      // await api.post(`/projects/${projectId}/favorite`);
      
      setFavorites(prev => 
        prev.includes(projectId) 
          ? prev.filter(id => id !== projectId)
          : [...prev, projectId]
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const toggleBookmark = async (projectId) => {
    try {
      // If you want to sync with backend
      // await api.post(`/projects/${projectId}/bookmark`);
      
      setBookmarks(prev => 
        prev.includes(projectId) 
          ? prev.filter(id => id !== projectId)
          : [...prev, projectId]
      );
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const handleQuickView = (project) => {
    console.log('Quick view:', project);
  };

  const handleShare = async (project) => {
    try {
      if (navigator.share) {
        navigator.share({
          title: project.title || 'Project',
          text: `Check out this project: ${project.shortDescription || ''}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing project:', err);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedComplexity('all');
    setSelectedStatus('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handleStartProject = async (formData) => {
    try {
      // Send project inquiry to backend
      // await api.post('/project-inquiries', formData);
      console.log('Project inquiry submitted:', formData);
      alert('Thank you for your project inquiry! I\'ll get back to you within 24 hours.');
    } catch (err) {
      console.error('Error submitting project inquiry:', err);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  const handleExportProjects = async () => {
    try {
      const exportData = sortedProjects.map(p => ({
        title: p.title || '',
        category: p.category || '',
        description: p.shortDescription || '',
        technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
        status: p.status || '',
        complexity: p.complexity || ''
      }));
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projects-export.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting projects:', err);
      alert('Failed to export projects.');
    }
  };

  // Handle project selection with error checking
  const handleProjectSelect = (project) => {
    if (project && typeof project === 'object') {
      setSelectedProject(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <ProjectsHero isVisible={isVisible} />
      
      <ProjectsFilters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedComplexity={selectedComplexity}
        setSelectedComplexity={setSelectedComplexity}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProjects={sortedProjects}
        onClearFilters={handleClearFilters}
        setCurrentPage={setCurrentPage}
        toggleBookmark={toggleBookmark}
        bookmarks={bookmarks}
        loading={loading}
        error={error}
        onExportProjects={handleExportProjects}
      />
      
      <ProjectsGrid
        currentProjects={currentProjects}
        isVisible={isVisible}
        setSelectedProject={handleProjectSelect}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onQuickView={handleQuickView}
        onShare={handleShare}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        viewMode={viewMode}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onViewModeChange={setViewMode}
        isLoading={loading}
        totalProjects={Array.isArray(projects) ? projects.length : 0}
        totalPages={totalPages}
        error={error}
      />
      
      <ProjectDetailModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        onShare={handleShare}
      />
      
      <ProjectsCTA 
        isVisible={isVisible}
        onStartProject={handleStartProject}
      />
    </motion.div>
  );
};

export default Projects;