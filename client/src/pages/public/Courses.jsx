import React, { useState, useEffect } from 'react';
import {
  FiBook,
  FiSearch,
  FiFilter,
  FiStar,
  FiExternalLink,
  FiTag,
  FiTrendingUp,
  FiAward,
  FiShoppingCart,
  FiHeart
} from 'react-icons/fi';


// Import components
import CoursesBooksHero from '../../components/courses-books/CoursesBooksHero';
import CoursesBooksFilters from '../../components/courses-books/CoursesBooksFilters';
import CoursesBooksRecommendations from '../../components/courses-books/CoursesBooksRecommendations';
import CoursesBooksGrid from '../../components/courses-books/CoursesBooksGrid';
import CoursesBooksCTA from '../../components/courses-books/CoursesBooksCTA';

const CoursesBooks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Books Data
  const books = [
    {
      id: 1,
      title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
      author: 'Aurélien Géron',
      category: 'Machine Learning',
      level: 'Intermediate',
      price: 59.99,
      rating: 4.7,
      reviews: 2834,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Comprehensive guide to building intelligent systems with practical examples and projects.',
      featured: true,
      bestseller: true,
      tags: ['Python', 'ML', 'Deep Learning', 'TensorFlow']
    },
    {
      id: 2,
      title: 'Deep Learning with Python',
      author: 'François Chollet',
      category: 'Deep Learning',
      level: 'Intermediate',
      price: 49.99,
      rating: 4.8,
      reviews: 1923,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Master deep learning using Python and Keras from the creator of Keras himself.',
      featured: true,
      tags: ['Python', 'Keras', 'Neural Networks']
    },
    {
      id: 3,
      title: 'Python for Data Analysis',
      author: 'Wes McKinney',
      category: 'Data Science',
      level: 'Beginner',
      price: 44.99,
      rating: 4.6,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Data wrangling with Pandas, NumPy, and IPython from the creator of Pandas.',
      bestseller: true,
      tags: ['Python', 'Pandas', 'Data Analysis']
    },
    {
      id: 4,
      title: 'Pattern Recognition and Machine Learning',
      author: 'Christopher Bishop',
      category: 'Machine Learning',
      level: 'Advanced',
      price: 79.99,
      rating: 4.5,
      reviews: 1456,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Mathematical foundations and practical algorithms for pattern recognition.',
      tags: ['ML', 'Statistics', 'Algorithms']
    },
    {
      id: 5,
      title: 'The Hundred-Page Machine Learning Book',
      author: 'Andriy Burkov',
      category: 'Machine Learning',
      level: 'Beginner',
      price: 34.99,
      rating: 4.7,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Concise introduction to the most important ML concepts and algorithms.',
      featured: true,
      tags: ['ML', 'Beginner-Friendly']
    },
    {
      id: 6,
      title: 'Neural Networks and Deep Learning',
      author: 'Michael Nielsen',
      category: 'Deep Learning',
      level: 'Intermediate',
      price: 54.99,
      rating: 4.6,
      reviews: 1789,
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Visual and intuitive introduction to neural networks and deep learning.',
      tags: ['Neural Networks', 'Deep Learning']
    },
    {
      id: 7,
      title: 'Data Science from Scratch',
      author: 'Joel Grus',
      category: 'Data Science',
      level: 'Beginner',
      price: 39.99,
      rating: 4.5,
      reviews: 2678,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'First principles approach to data science with Python implementation.',
      bestseller: true,
      tags: ['Python', 'Data Science', 'Statistics']
    },
    {
      id: 8,
      title: 'Reinforcement Learning: An Introduction',
      author: 'Richard S. Sutton',
      category: 'Machine Learning',
      level: 'Advanced',
      price: 69.99,
      rating: 4.8,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Comprehensive guide to reinforcement learning from first principles.',
      tags: ['RL', 'AI', 'Algorithms']
    },
    {
      id: 9,
      title: 'Practical Statistics for Data Scientists',
      author: 'Peter Bruce',
      category: 'Data Science',
      level: 'Intermediate',
      price: 47.99,
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
      amazonLink: 'https://amazon.com',
      description: 'Essential statistical methods for data science practitioners.',
      tags: ['Statistics', 'Data Science']
    }
  ];

  // Categories
  const categories = [
    { value: 'all', label: 'All Categories', icon: FiBook },
    { value: 'Machine Learning', label: 'Machine Learning', icon: FiTrendingUp },
    { value: 'Deep Learning', label: 'Deep Learning', icon: FiAward },
    { value: 'Data Science', label: 'Data Science', icon: FiFilter }
  ];

  // Filter and Sort Books
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'under40' && book.price < 40) ||
                          (priceRange === '40-60' && book.price >= 40 && book.price <= 60) ||
                          (priceRange === 'over60' && book.price > 60);
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviews - a.reviews;
      return 0; // featured (default order)
    });

  // Recommendations (featured books)
  const recommendations = books.filter(book => book.featured).slice(0, 3);

  // Toggle Favorite
  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CoursesBooksHero isVisible={isVisible} />
      
      <CoursesBooksFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        filteredBooks={filteredBooks}
      />
      
      <CoursesBooksRecommendations recommendations={recommendations} />
      
      <CoursesBooksGrid
        filteredBooks={filteredBooks}
        isVisible={isVisible}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      
      <CoursesBooksCTA />
    </div>
  );
};

export default CoursesBooks;