import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate loading
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced Projects Data
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Trading Algorithm',
      shortDescription: 'Proprietary ML algorithm for automated intraday trading with real-time analytics.',
      fullDescription: 'Developed a sophisticated machine learning algorithm for automated intraday trading that combines multiple ML models for optimal decision-making. The system processes real-time market data, identifies patterns, and executes trades with minimal latency.',
      category: 'Machine Learning',
      complexity: 'Expert',
      status: 'completed',
      technologies: ['Python', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis', 'AWS'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
      demoUrl: 'https://demo-trading.example.com',
      githubUrl: 'https://github.com/username/trading-algorithm',
      date: 'January 2024',
      lastUpdated: '2024-01-15',
      featured: true,
      stars: 342,
      forks: 56,
      views: '2.3K',
      contributors: 1,
      developmentTime: '6 months',
      datasetSize: '5TB market data',
      features: [
        'Real-time market data processing at 1000+ events/second',
        'Ensemble ML models (XGBoost, LSTM, Transformer)',
        'Advanced risk management with Monte Carlo simulations',
        'Automated backtesting framework',
        'Real-time performance dashboard'
      ],
      challenges: [
        {
          description: 'Handling high-frequency data streams with sub-millisecond latency requirements',
          solution: 'Implemented custom data pipeline using Redis Streams and optimized Python async/await patterns'
        },
        {
          description: 'Balancing model accuracy vs inference speed for real-time decisions',
          solution: 'Used model quantization and TensorRT optimization, achieving <10ms inference time'
        }
      ],
      results: [
        'Achieved 73% prediction accuracy on unseen data',
        'Reduced decision latency to <50ms',
        'Generated 28% annual ROI in backtesting',
        'Successfully processed 10M+ daily market events'
      ],
      metrics: {
        'Prediction Accuracy': '73%',
        'Latency': '50ms',
        'Annual ROI': '28%',
        'Events/Day': '10M+'
      },
      goals: [
        'Create scalable trading system for multiple asset classes',
        'Achieve sub-100ms end-to-end latency',
        'Maintain >70% prediction accuracy',
        'Implement robust risk management'
      ],
      architecture: 'Microservices architecture with separate data ingestion, model serving, and execution engines. Containerized with Docker and orchestrated with Kubernetes on AWS.',
      documentationUrl: 'https://docs-trading.example.com',
      articleUrl: 'https://blog.example.com/ai-trading-algorithm'
    },
    {
      id: 2,
      title: 'Advanced Image Recognition System',
      shortDescription: 'State-of-the-art deep learning models for medical image analysis.',
      fullDescription: 'Built a comprehensive computer vision system for medical image analysis using advanced deep learning techniques. The system assists radiologists in detecting abnormalities in X-ray and MRI images.',
      category: 'Deep Learning',
      complexity: 'Advanced',
      status: 'completed',
      technologies: ['PyTorch', 'TensorFlow', 'OpenCV', 'Python', 'CUDA', 'FastAPI', 'Docker', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
      demoUrl: 'https://demo-medical.example.com',
      githubUrl: 'https://github.com/username/medical-cv',
      date: 'November 2023',
      lastUpdated: '2023-11-20',
      featured: true,
      stars: 512,
      forks: 128,
      views: '5.1K',
      contributors: 3,
      developmentTime: '4 months',
      datasetSize: '50K medical images',
      features: [
        'Multi-model ensemble for improved accuracy',
        'Real-time inference with GPU acceleration',
        'Interactive visualization dashboard',
        'Automated report generation',
        'HIPAA compliant data handling'
      ],
      challenges: [
        {
          description: 'Limited annotated medical data for rare conditions',
          solution: 'Implemented advanced data augmentation and synthetic data generation using GANs'
        },
        {
          description: 'Model interpretability for medical professionals',
          solution: 'Integrated Grad-CAM visualization and attention mechanisms to highlight regions of interest'
        }
      ],
      results: [
        'Achieved 94% accuracy on test dataset',
        'Reduced false positives by 35%',
        'Decreased radiologist review time by 60%',
        'Successfully deployed in 3 medical facilities'
      ],
      metrics: {
        'Accuracy': '94%',
        'False Positives': 'Reduced 35%',
        'Review Time': 'Reduced 60%',
        'Deployments': '3 facilities'
      },
      goals: [
        'Achieve >90% accuracy on medical images',
        'Provide explainable AI for medical professionals',
        'Ensure HIPAA compliance',
        'Enable real-time inference'
      ],
      architecture: 'Client-server architecture with model serving via TorchServe, FastAPI backend, and React frontend. Containerized deployment with health monitoring.',
      documentationUrl: 'https://docs-medical.example.com',
      articleUrl: 'https://blog.example.com/medical-ai'
    },
    {
      id: 3,
      title: 'Real-time Anomaly Detection Engine',
      shortDescription: 'Scalable system for detecting anomalies in IoT sensor data.',
      fullDescription: 'Developed a real-time anomaly detection system for IoT sensor networks using streaming data processing and machine learning.',
      category: 'Data Science',
      complexity: 'Advanced',
      status: 'in-progress',
      technologies: ['Python', 'Kafka', 'Spark', 'Scikit-learn', 'InfluxDB', 'Grafana', 'AWS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      demoUrl: 'https://demo-iot.example.com',
      githubUrl: 'https://github.com/username/anomaly-detection',
      date: 'March 2024',
      lastUpdated: '2024-03-10',
      featured: false,
      stars: 187,
      forks: 42,
      views: '1.8K',
      contributors: 2,
      developmentTime: '3 months',
      datasetSize: '100M+ sensor readings',
      features: [
        'Real-time streaming data processing',
        'Adaptive threshold algorithms',
        'Interactive alert dashboard',
        'Historical anomaly analysis',
        'Multi-tenant architecture'
      ],
      challenges: [
        {
          description: 'Processing high-volume streaming data with low latency',
          solution: 'Implemented Apache Kafka for data ingestion and Spark Streaming for real-time processing'
        },
        {
          description: 'Handling concept drift in evolving sensor data',
          solution: 'Used online learning algorithms with adaptive model retraining'
        }
      ],
      results: [
        'Processed 1M+ events per second',
        'Detected anomalies with 99.9% recall',
        'Reduced false alerts by 75%',
        'Achieved <100ms processing latency'
      ],
      metrics: {
        'Events/Sec': '1M+',
        'Recall': '99.9%',
        'False Alerts': 'Reduced 75%',
        'Latency': '100ms'
      },
      goals: [
        'Process 1M+ events per second',
        'Achieve >99% anomaly detection accuracy',
        'Maintain sub-100ms processing latency',
        'Support 1000+ concurrent devices'
      ]
    },
    {
      id: 4,
      title: 'AutoML Platform',
      shortDescription: 'Automated machine learning platform for business users.',
      fullDescription: 'Built an end-to-end AutoML platform that automates the entire machine learning pipeline from data preprocessing to model deployment.',
      category: 'Machine Learning',
      complexity: 'Expert',
      status: 'completed',
      technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS Sagemaker'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
      demoUrl: 'https://demo-automl.example.com',
      githubUrl: 'https://github.com/username/automl-platform',
      date: 'December 2023',
      lastUpdated: '2023-12-15',
      featured: true,
      stars: 423,
      forks: 89,
      views: '3.2K',
      contributors: 4,
      developmentTime: '8 months',
      datasetSize: 'N/A',
      features: [
        'Automated feature engineering',
        'Hyperparameter optimization',
        'Model interpretability tools',
        'One-click deployment',
        'Performance monitoring'
      ],
      challenges: [
        {
          description: 'Making complex ML accessible to non-technical users',
          solution: 'Created intuitive UI with guided workflows and natural language explanations'
        },
        {
          description: 'Optimizing search space for hyperparameter tuning',
          solution: 'Implemented Bayesian optimization with early stopping and parallel execution'
        }
      ],
      results: [
        'Reduced model development time from weeks to hours',
        'Achieved 95% accuracy on benchmark datasets',
        'Served 100+ enterprise customers',
        'Reduced infrastructure costs by 40%'
      ],
      metrics: {
        'Development Time': 'Weeks to Hours',
        'Accuracy': '95%',
        'Customers': '100+',
        'Cost Reduction': '40%'
      }
    },
    {
      id: 5,
      title: 'Predictive Maintenance Dashboard',
      shortDescription: 'Real-time dashboard for industrial equipment monitoring.',
      fullDescription: 'Built a predictive maintenance system that monitors industrial equipment and predicts failures before they occur.',
      category: 'Web Apps',
      complexity: 'Intermediate',
      status: 'completed',
      technologies: ['React', 'Node.js', 'WebSocket', 'TensorFlow.js', 'MongoDB', 'Docker'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
      demoUrl: 'https://demo-maintenance.example.com',
      githubUrl: 'https://github.com/username/predictive-maintenance',
      date: 'February 2024',
      lastUpdated: '2024-02-20',
      featured: false,
      stars: 156,
      forks: 31,
      views: '1.2K',
      contributors: 2,
      developmentTime: '3 months',
      datasetSize: '500K sensor readings',
      features: [
        'Real-time equipment monitoring',
        'Predictive failure alerts',
        'Interactive visualization',
        'Maintenance scheduling',
        'Performance analytics'
      ],
      challenges: [
        {
          description: 'Real-time data streaming to web dashboard',
          solution: 'Implemented WebSocket for bidirectional communication and server-sent events'
        },
        {
          description: 'Deploying ML models in browser environment',
          solution: 'Used TensorFlow.js for client-side inference with model quantization'
        }
      ],
      results: [
        'Reduced unplanned downtime by 65%',
        'Extended equipment lifespan by 30%',
        'Saved $500K+ in maintenance costs',
        'Achieved 92% prediction accuracy'
      ],
      metrics: {
        'Downtime': 'Reduced 65%',
        'Lifespan': 'Extended 30%',
        'Cost Savings': '$500K+',
        'Accuracy': '92%'
      }
    },
    {
      id: 6,
      title: 'Natural Language Processing API',
      shortDescription: 'Scalable NLP API for text analysis and processing.',
      fullDescription: 'Built a comprehensive NLP API service providing various text processing capabilities including sentiment analysis, entity recognition, and text summarization.',
      category: 'APIs',
      complexity: 'Advanced',
      status: 'maintained',
      technologies: ['FastAPI', 'spaCy', 'Transformers', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80',
      demoUrl: 'https://demo-nlp.example.com',
      githubUrl: 'https://github.com/username/nlp-api',
      date: 'October 2023',
      lastUpdated: '2024-01-10',
      featured: false,
      stars: 289,
      forks: 67,
      views: '2.1K',
      contributors: 3,
      developmentTime: '5 months',
      datasetSize: 'N/A',
      features: [
        'Multiple NLP models (BERT, GPT, spaCy)',
        'Real-time text processing',
        'Batch processing support',
        'Model version management',
        'Comprehensive API documentation'
      ],
      challenges: [
        {
          description: 'Handling variable-length text inputs efficiently',
          solution: 'Implemented dynamic batching and model quantization'
        },
        {
          description: 'Ensuring low latency for real-time applications',
          solution: 'Used model caching with Redis and optimized inference pipelines'
        }
      ],
      results: [
        'Processed 1M+ API requests daily',
        'Achieved <50ms average response time',
        'Supported 50+ concurrent languages',
        'Maintained 99.9% API uptime'
      ],
      metrics: {
        'Daily Requests': '1M+',
        'Response Time': '50ms',
        'Languages': '50+',
        'Uptime': '99.9%'
      }
    }
  ];

  // Calculate categories with counts
  const categories = [
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

  // Filter projects based on multiple criteria
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'all' || project.complexity === selectedComplexity;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesComplexity && matchesStatus;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'recent':
        return new Date(b.lastUpdated || b.date) - new Date(a.lastUpdated || a.date);
      case 'complexity':
        const complexityOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
        return (complexityOrder[b.complexity] || 0) - (complexityOrder[a.complexity] || 0);
      case 'popular':
        return (b.stars || 0) - (a.stars || 0);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const itemsPerPage = viewMode === 'compact' ? 12 : viewMode === 'grid' ? 9 : 6;
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = sortedProjects.slice(startIndex, endIndex);

  const toggleFavorite = (projectId) => {
    setFavorites(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleBookmark = (projectId) => {
    setBookmarks(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleQuickView = (project) => {
    // In a real app, you might want to show a quick preview modal
    console.log('Quick view:', project);
  };

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this project: ${project.shortDescription}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
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

  const handleStartProject = (formData) => {
    console.log('Project inquiry submitted:', formData);
    alert('Thank you for your project inquiry! I\'ll get back to you within 24 hours.');
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
      />
      
      <ProjectsGrid
        currentProjects={currentProjects}
        isVisible={isVisible}
        setSelectedProject={setSelectedProject}
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
        isLoading={false}
        totalProjects={projects.length}
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