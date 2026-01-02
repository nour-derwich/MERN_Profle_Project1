import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormationsHero from '../../components/formations/FormationsHero';
import FormationsFilters from '../../components/formations/FormationsFilters';
import FormationsGrid from '../../components/formations/FormationsGrid';
import FormationDetail from '../../components/formations/FormationDetail';
import RegistrationModal from '../../components/formations/RegistrationModal';

const Formations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    terms: false,
    paymentMethod: 'credit'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate loading for demo
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced Formations Data
  const formations = [
    {
      id: 1,
      title: 'Machine Learning Mastery Bootcamp',
      category: 'Machine Learning',
      level: 'Advanced',
      duration: '12 weeks',
      hours: '96 hours',
      startDate: 'March 15, 2026',
      endDate: 'May 10, 2026',
      schedule: 'Mon, Wed, Fri - 6:00 PM - 9:00 PM',
      price: 899,
      originalPrice: 1199,
      installment: 299,
      currency: 'USD',
      maxParticipants: 15,
      spotsLeft: 5,
      status: 'enrolling',
      format: 'Online + Live Sessions',
      instructor: {
        name: 'Naceur Keraani',
        title: 'Senior ML Engineer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur',
        verified: true,
        rating: 4.9,
        reviews: 124,
        students: 2500
      },
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
      description: 'Comprehensive hands-on training in machine learning algorithms, from fundamentals to advanced techniques. Transform your career with real-world projects.',
      highlights: [
        'Build 10+ ML models from scratch',
        'Master Scikit-learn, PyTorch, TensorFlow',
        'Real-world datasets and capstone projects',
        'One-on-one mentorship sessions',
        'Industry-recognized certificate'
      ],
      features: [
        'Live Interactive Sessions',
        'Career Support',
        'Certificate',
        'Real Projects',
        'Lifetime Access',
        'Mentorship'
      ],
      prerequisites: [
        'Python programming knowledge',
        'Basic statistics and linear algebra',
        'Passion for AI and data science'
      ],
      modules: [
        { 
          title: 'Weeks 1-3: ML Fundamentals', 
          duration: '24 hours',
          topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Model Evaluation'] 
        },
        { 
          title: 'Weeks 4-6: Advanced Algorithms', 
          duration: '24 hours',
          topics: ['Random Forests', 'SVM', 'Ensemble Methods', 'Hyperparameter Tuning'] 
        },
        { 
          title: 'Weeks 7-9: Deep Learning', 
          duration: '24 hours',
          topics: ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning'] 
        },
        { 
          title: 'Weeks 10-12: Real Projects', 
          duration: '24 hours',
          topics: ['Capstone Project', 'Model Deployment', 'MLOps', 'Portfolio Building'] 
        }
      ],
      testimonials: [
        { 
          name: 'Ahmed Benali', 
          role: 'Data Scientist at Startup',
          text: 'This course transformed my career. The practical projects helped me land my dream job!',
          rating: 5
        },
        { 
          name: 'Sarah Mohamed', 
          role: 'ML Engineer',
          text: 'Naceur explains complex concepts with clarity. Best investment in my education!',
          rating: 5
        },
        { 
          name: 'Karim Othman', 
          role: 'AI Researcher',
          text: 'The curriculum is industry-relevant and up-to-date with latest ML trends.',
          rating: 4
        }
      ],
      rating: 4.8,
      reviews: 124,
      featured: true,
      liveSessions: 'Weekly',
      tags: ['Machine Learning', 'AI', 'Data Science', 'Python']
    },
    {
      id: 2,
      title: 'Deep Learning Specialization',
      category: 'Deep Learning',
      level: 'Intermediate',
      duration: '10 weeks',
      hours: '80 hours',
      startDate: 'April 1, 2026',
      endDate: 'May 15, 2026',
      schedule: 'Tue, Thu - 7:00 PM - 10:00 PM',
      price: 749,
      originalPrice: 999,
      installment: 249,
      currency: 'USD',
      maxParticipants: 20,
      spotsLeft: 12,
      status: 'enrolling',
      format: 'Online + Live Sessions',
      instructor: {
        name: 'Naceur Keraani',
        title: 'Deep Learning Specialist',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur2',
        verified: true,
        rating: 4.8,
        reviews: 89,
        students: 1800
      },
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      description: 'Deep dive into neural networks and deep learning. Master PyTorch and TensorFlow for cutting-edge AI applications.',
      highlights: [
        'Master PyTorch and TensorFlow',
        'Build CNNs, RNNs, and Transformers',
        'Computer vision projects',
        'NLP applications',
        'GPU training techniques'
      ],
      features: [
        'Live Interactive Sessions',
        'Hands-on Projects',
        'Certificate',
        'Code Reviews',
        'Community Access'
      ],
      prerequisites: [
        'Python and NumPy knowledge',
        'Basic ML understanding',
        'Linear algebra basics'
      ],
      modules: [
        { 
          title: 'Weeks 1-2: Neural Network Basics', 
          duration: '16 hours',
          topics: ['Perceptrons', 'Backpropagation', 'Optimization', 'Activation Functions'] 
        },
        { 
          title: 'Weeks 3-5: CNNs for Computer Vision', 
          duration: '24 hours',
          topics: ['Convolutions', 'Image Classification', 'Object Detection', 'Transfer Learning'] 
        },
        { 
          title: 'Weeks 6-8: RNNs & NLP', 
          duration: '24 hours',
          topics: ['LSTMs', 'Attention', 'Transformers', 'BERT'] 
        },
        { 
          title: 'Weeks 9-10: Advanced Topics', 
          duration: '16 hours',
          topics: ['GANs', 'Reinforcement Learning', 'Model Deployment'] 
        }
      ],
      testimonials: [
        { 
          name: 'Mohamed K.', 
          role: 'AI Developer',
          text: 'Excellent course structure. The projects are industry-relevant and challenging.',
          rating: 5
        }
      ],
      rating: 4.7,
      reviews: 89,
      featured: true,
      liveSessions: 'Bi-weekly',
      tags: ['Deep Learning', 'Neural Networks', 'PyTorch', 'Computer Vision']
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      level: 'Beginner',
      duration: '8 weeks',
      hours: '64 hours',
      startDate: 'May 1, 2026',
      endDate: 'June 15, 2026',
      schedule: 'Mon, Wed - 6:00 PM - 8:00 PM',
      price: 599,
      originalPrice: 799,
      installment: 199,
      currency: 'USD',
      maxParticipants: 25,
      spotsLeft: 18,
      status: 'upcoming',
      format: 'Online',
      instructor: {
        name: 'Naceur Keraani',
        title: 'Data Science Lead',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur3',
        verified: true,
        rating: 4.6,
        reviews: 156,
        students: 3200
      },
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      description: 'Complete introduction to data science. Learn Python, statistics, and visualization to kickstart your data career.',
      highlights: [
        'Master Python for data analysis',
        'Statistical analysis and hypothesis testing',
        'Data visualization with Seaborn',
        'Real-world case studies',
        'SQL for data scientists'
      ],
      features: [
        'Self-paced Learning',
        'Certificate',
        'Practice Exercises',
        'Community Forum',
        'Career Guidance'
      ],
      prerequisites: [
        'Basic programming knowledge',
        'High school mathematics',
        'Curiosity about data'
      ],
      modules: [
        { 
          title: 'Weeks 1-2: Python for Data Science', 
          duration: '16 hours',
          topics: ['Pandas', 'NumPy', 'Data Cleaning', 'Exploratory Analysis'] 
        },
        { 
          title: 'Weeks 3-4: Statistics & Probability', 
          duration: '16 hours',
          topics: ['Descriptive Stats', 'Inferential Stats', 'Hypothesis Testing', 'A/B Testing'] 
        },
        { 
          title: 'Weeks 5-6: Data Visualization', 
          duration: '16 hours',
          topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Design'] 
        },
        { 
          title: 'Weeks 7-8: Real Projects', 
          duration: '16 hours',
          topics: ['Capstone Project', 'Portfolio', 'Interview Prep'] 
        }
      ],
      testimonials: [],
      rating: 4.6,
      reviews: 156,
      featured: false,
      liveSessions: 'Recorded',
      tags: ['Data Science', 'Python', 'Statistics', 'Visualization']
    },
    {
      id: 4,
      title: 'AI Engineering Career Path',
      category: 'AI Engineering',
      level: 'Expert',
      duration: '16 weeks',
      hours: '128 hours',
      startDate: 'Completed',
      endDate: 'Completed',
      schedule: 'Flexible',
      price: 1299,
      originalPrice: 1799,
      installment: 433,
      currency: 'USD',
      maxParticipants: 10,
      spotsLeft: 0,
      status: 'full',
      format: 'Hybrid',
      instructor: {
        name: 'Naceur Keraani',
        title: 'AI Architect',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur4',
        verified: true,
        rating: 4.9,
        reviews: 45,
        students: 1200
      },
      location: 'Online & In-person',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
      description: 'Become a full-stack AI engineer. Master ML systems, deployment, and MLOps for production environments.',
      highlights: [
        'ML system design and architecture',
        'Model deployment and serving',
        'MLOps and CI/CD pipelines',
        'Cloud platforms (AWS, GCP, Azure)',
        'Scalable ML systems'
      ],
      features: [
        'Intensive Mentorship',
        'Industry Projects',
        'Career Placement',
        'Networking Events',
        'Lifetime Support'
      ],
      prerequisites: [
        'Advanced ML knowledge',
        'Software engineering experience',
        'Cloud computing basics'
      ],
      modules: [
        { 
          title: 'Weeks 1-4: ML System Design', 
          duration: '32 hours',
          topics: ['Architecture Patterns', 'Data Pipelines', 'Feature Stores', 'Monitoring'] 
        },
        { 
          title: 'Weeks 5-8: Deployment & Serving', 
          duration: '32 hours',
          topics: ['Containerization', 'Kubernetes', 'Model Serving', 'A/B Testing'] 
        },
        { 
          title: 'Weeks 9-12: MLOps', 
          duration: '32 hours',
          topics: ['CI/CD for ML', 'Experiment Tracking', 'Model Registry', 'Automation'] 
        },
        { 
          title: 'Weeks 13-16: Capstone', 
          duration: '32 hours',
          topics: ['End-to-end Project', 'Production Deployment', 'Case Studies'] 
        }
      ],
      testimonials: [
        { 
          name: 'Rami S.', 
          role: 'Senior AI Engineer',
          text: 'This program took my skills to the next level. The MLOps content is gold.',
          rating: 5
        }
      ],
      rating: 4.9,
      reviews: 45,
      featured: true,
      liveSessions: 'Weekly',
      tags: ['AI Engineering', 'MLOps', 'Cloud', 'Deployment']
    }
  ];

  // Extract unique values for filters
  const categories = [
    { value: 'all', label: 'All Categories', color: 'from-gray-600 to-gray-800' },
    ...Array.from(new Set(formations.map(f => f.category))).map(cat => ({
      value: cat.toLowerCase().replace(/ /g, '-'),
      label: cat,
      color: cat === 'Machine Learning' ? 'from-primary-500 to-blue-600' :
             cat === 'Deep Learning' ? 'from-purple-500 to-pink-600' :
             cat === 'Data Science' ? 'from-blue-500 to-cyan-600' :
             'from-green-500 to-emerald-600'
    }))
  ];

  const levels = [
    { value: 'all', label: 'All Levels', color: 'from-gray-600 to-gray-800' },
    { value: 'beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600' },
    { value: 'intermediate', label: 'Intermediate', color: 'from-blue-500 to-cyan-600' },
    { value: 'advanced', label: 'Advanced', color: 'from-purple-500 to-pink-600' },
    { value: 'expert', label: 'Expert', color: 'from-red-500 to-orange-600' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses', color: 'from-gray-600 to-gray-800' },
    { value: 'upcoming', label: 'Upcoming', color: 'from-blue-500 to-cyan-600' },
    { value: 'enrolling', label: 'Enrolling', color: 'from-green-500 to-emerald-600' },
    { value: 'full', label: 'Full', color: 'from-red-500 to-orange-600' },
    { value: 'completed', label: 'Completed', color: 'from-gray-600 to-gray-800' }
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices', range: 'Any price', color: 'from-gray-600 to-gray-800' },
    { id: 'under600', label: 'Under $600', range: '$0 - $600', color: 'from-green-500 to-emerald-600' },
    { id: '600-900', label: '$600 - $900', range: '$600 - $900', color: 'from-blue-500 to-cyan-600' },
    { id: '900-1200', label: '$900 - $1200', range: '$900 - $1200', color: 'from-primary-500 to-indigo-600' },
    { id: 'over1200', label: 'Premium', range: '$1200+', color: 'from-purple-500 to-pink-600' }
  ];

  // Filter formations
  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         formation.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         formation.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                          formation.category.toLowerCase().includes(selectedCategory.replace(/-/g, ' '));
    
    const matchesLevel = selectedLevel === 'all' || 
                        formation.level.toLowerCase() === selectedLevel;
    
    const matchesStatus = selectedStatus === 'all' || 
                         formation.status === selectedStatus;
    
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'under600' && formation.price < 600) ||
                        (priceRange === '600-900' && formation.price >= 600 && formation.price <= 900) ||
                        (priceRange === '900-1200' && formation.price >= 900 && formation.price <= 1200) ||
                        (priceRange === 'over1200' && formation.price > 1200);

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesPrice;
  });

  // Sort formations
  const sortedFormations = [...filteredFormations].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.reviews - a.reviews;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return new Date(b.startDate) - new Date(a.startDate);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleFavorite = (formationId) => {
    setFavorites(prev => 
      prev.includes(formationId) 
        ? prev.filter(id => id !== formationId)
        : [...prev, formationId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration submitted:', {
        formation: selectedFormation.title,
        ...formData
      });
      
      setIsLoading(false);
      setRegistrationSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowRegistrationModal(false);
        setRegistrationSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          message: '',
          terms: false,
          paymentMethod: 'credit'
        });
      }, 3000);
    }, 2000);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedStatus('all');
    setPriceRange('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handleQuickView = (formation) => {
    setSelectedFormation(formation);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedFormation.title,
        text: `Check out this amazing formation: ${selectedFormation.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // If formation is selected, show detail view
  if (selectedFormation) {
    return (
      <>
        <FormationDetail
          selectedFormation={selectedFormation}
          setSelectedFormation={setSelectedFormation}
          setShowRegistrationModal={setShowRegistrationModal}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onShare={handleShare}
        />
        <RegistrationModal
          showRegistrationModal={showRegistrationModal}
          setShowRegistrationModal={setShowRegistrationModal}
          selectedFormation={selectedFormation}
          formData={formData}
          handleInputChange={handleInputChange}
          handleRegistrationSubmit={handleRegistrationSubmit}
          isLoading={isLoading}
          registrationSuccess={registrationSuccess}
          onSuccessClose={() => {
            setShowRegistrationModal(false);
            setRegistrationSuccess(false);
          }}
        />
      </>
    );
  }

  // Main Formations List View
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <FormationsHero isVisible={isVisible} />
      
      <FormationsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        levels={levels}
        statuses={statuses}
        priceRanges={priceRanges}
        filteredFormations={filteredFormations}
        onClearFilters={handleClearFilters}
      />
      
      <FormationsGrid
        filteredFormations={sortedFormations}
        isVisible={isVisible}
        setSelectedFormation={setSelectedFormation}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onQuickView={handleQuickView}
        viewMode={viewMode}
        currentPage={currentPage}
        itemsPerPage={6}
        onPageChange={setCurrentPage}
        onViewModeChange={setViewMode}
        isLoading={false}
        totalFormations={formations.length}
      />
    </motion.div>
  );
};

export default Formations;