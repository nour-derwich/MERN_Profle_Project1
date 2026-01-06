import React, { useState, useEffect } from 'react';
import {
  FiBook,
  FiTrendingUp,
  FiAward,
  FiFilter
} from 'react-icons/fi';
import axios from 'axios';

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
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setIsVisible(true);
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, selectedLevel, priceRange, sortBy, searchQuery, currentPage]);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/courses', {
        params: {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          level: selectedLevel !== 'all' ? selectedLevel : undefined,
          priceRange: priceRange !== 'all' ? priceRange : undefined,
          sortBy: sortBy,
          search: searchQuery,
          page: currentPage,
          limit: 9
        }
      });
      
      const booksData = response.data.data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        level: book.level,
        price: parseFloat(book.price),
        originalPrice: book.original_price ? parseFloat(book.original_price) : null,
        rating: parseFloat(book.rating),
        reviews: book.reviews || book.reviews_count || 0,
        image: book.cover_image && !book.cover_image.startsWith('blob:') 
        ? book.cover_image 
        : `https://placehold.co/400x600/1e293b/60a5fa?text=${encodeURIComponent(book.title || 'Book')}`,
        amazonLink: book.amazon_link,
        description: book.description,
        short_description: book.short_description,
        featured: book.featured,
        bestseller: book.bestseller,
        tags: book.tags || [],
        pages: book.pages,
        year: book.year || book.publication_year,
        priority: book.priority,
        personal_insight: book.personal_insight,
        time_to_read: book.time_to_read,
        why_recommend: book.why_recommend || []
      }));
      
      setBooks(booksData);
      setFilteredBooks(booksData);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setFilteredBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/courses/categories');
      const categoriesData = response.data.data || [];
      
      // Format categories for frontend
      const formattedCategories = [
        { value: 'all', label: 'All Categories', icon: FiBook },
        ...categoriesData.map(cat => ({
          value: cat,
          label: cat,
          icon: FiTrendingUp
        }))
      ];
      
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories
      setCategories([
        { value: 'all', label: 'All Categories', icon: FiBook },
        { value: 'Machine Learning', label: 'Machine Learning', icon: FiTrendingUp },
        { value: 'Deep Learning', label: 'Deep Learning', icon: FiAward },
        { value: 'Data Science', label: 'Data Science', icon: FiFilter }
      ]);
    }
  };

  // Fetch featured recommendations
  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('/api/courses/recommendations');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };

  // Toggle Favorite
  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optional: Scroll to top
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleQuickView = (book) => {
    // Implement quick view modal logic here
    console.log('Quick view:', book);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setPriceRange('all');
    setSortBy('featured');
    setSearchQuery('');
    setCurrentPage(1);
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
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        filteredBooks={filteredBooks}
        onClearFilters={handleClearFilters}
      />
      
      <CoursesBooksRecommendations 
        fetchRecommendations={fetchRecommendations}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      
      <CoursesBooksGrid
        filteredBooks={filteredBooks}
        isVisible={isVisible}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        viewMode={viewMode}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onQuickView={handleQuickView}
        isLoading={loading}
      />
      
      <CoursesBooksCTA />
    </div>
  );
};

export default CoursesBooks;