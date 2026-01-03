import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { 
  FiSave, FiX, FiUpload, FiImage, 
  FiInfo, FiDollarSign, FiStar, FiExternalLink,
  FiBook, FiUser, FiTag, FiClock, FiTrendingUp,
  FiCheck, FiAlertCircle, FiHash, FiBookOpen
} from 'react-icons/fi';
import courseService from '../../services/courseService';

const AdminCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [whyRecommend, setWhyRecommend] = useState([]);
  const [whyRecommendInput, setWhyRecommendInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    short_description: '',
    category: '',
    level: 'beginner',
    price: '',
    original_price: '',
    rating: '',
    reviews: '',
    reviews_count: '',
    priority: 'Recommended',
    personal_insight: '',
    time_to_read: '2-3 weeks',
    year: new Date().getFullYear(),
    pages: '',
    cover_image: '',
    amazon_link: '',
    publisher: '',
    language: 'English',
    bestseller: false,
    featured: false,
    clicks_count: 0,
    isbn: '',
    publication_year: new Date().getFullYear()
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Machine Learning', 'Deep Learning', 'Data Science', 
    'Python Programming', 'Mathematics', 'Statistics',
    'AI Ethics', 'Research Papers', 'Programming',
    'Web Development', 'Mobile Development', 'Design',
    'Business', 'Marketing', 'DevOps', 'Databases'
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const priorities = [
    'Essential', 'Foundational', 'Advanced', 
    'Practical', 'Theoretical', 'Recommended'
  ];

  const whyRecommendOptions = [
    'Career', 'Practical', 'Foundation', 'Reference',
    'Research', 'Quick Start', 'Comprehensive'
  ];

  useEffect(() => {
    if (isEditMode) {
      loadCourse();
    }
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await courseService.getById(id);
      const data = response.data;
      
      setFormData(data);
      
      if (data.cover_image) {
        setImagePreview(data.cover_image);
      }
      
      if (data.tags) {
        setTags(Array.isArray(data.tags) ? data.tags : []);
      }
      
      if (data.why_recommend) {
        setWhyRecommend(Array.isArray(data.why_recommend) ? data.why_recommend : []);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, cover_image: 'Please select an image file' }));
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, cover_image: 'Image size should be less than 20MB' }));
      return;
    }

    // For now, just create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData(prev => ({ ...prev, cover_image: previewUrl }));
    setErrors(prev => ({ ...prev, cover_image: '' }));
  };

  const handleTagAdd = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleWhyRecommendAdd = (reason) => {
    if (!whyRecommend.includes(reason)) {
      setWhyRecommend([...whyRecommend, reason]);
    }
  };

  const handleWhyRecommendRemove = (reasonToRemove) => {
    setWhyRecommend(whyRecommend.filter(reason => reason !== reasonToRemove));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.level) {
      newErrors.level = 'Level is required';
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    if (formData.reviews && formData.reviews < 0) {
      newErrors.reviews = 'Reviews count cannot be negative';
    }
    if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear())) {
      newErrors.year = 'Please enter a valid year';
    }
    if (formData.pages && formData.pages < 0) {
      newErrors.pages = 'Page count cannot be negative';
    }
    if (!formData.amazon_link.trim()) {
      newErrors.amazon_link = 'Amazon link is required';
    } else if (!formData.amazon_link.startsWith('http')) {
      newErrors.amazon_link = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Prepare data for submission
      const submissionData = {
        ...formData,
        tags,
        why_recommend: whyRecommend,
        publication_year: formData.year || formData.publication_year,
        reviews_count: formData.reviews || formData.reviews_count || 0
      };

      if (isEditMode) {
        await courseService.update(id, submissionData);
      } else {
        await courseService.create(submissionData);
      }

      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: error.response?.data?.message || 'Failed to save course. Please try again.' 
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {isEditMode ? 'Edit Course' : 'Add New Course/Book'}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? 'Update book details' : 'Add a new book recommendation for AI/ML learning'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/courses')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <FiX />
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiInfo className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Book Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="e.g., Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="e.g., Aurélien Géron"
                      />
                    </div>
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                    )}
                  </div>

                  {/* Publisher */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="e.g., O'Reilly Media"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Publication Year *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className={`w-full px-4 py-3 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                    )}
                  </div>

                  {/* Pages */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pages
                    </label>
                    <input
                      type="number"
                      name="pages"
                      value={formData.pages}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-4 py-3 border ${errors.pages ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.pages && (
                      <p className="mt-1 text-sm text-red-600">{errors.pages}</p>
                    )}
                  </div>

                  {/* ISBN */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="978-1492032649"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.level ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Level</option>
                      {levels.map(lvl => (
                        <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                      ))}
                    </select>
                    {errors.level && (
                      <p className="mt-1 text-sm text-red-600">{errors.level}</p>
                    )}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Recommendation Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Spanish">Spanish</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiBookOpen className="text-purple-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Descriptions</h2>
                </div>

                <div className="space-y-4">
                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      rows={2}
                      className={`w-full px-4 py-3 border ${errors.short_description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Brief summary of the book (max 500 characters)"
                      maxLength={500}
                    />
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {formData.short_description?.length || 0}/500 characters
                      </p>
                      {errors.short_description && (
                        <p className="text-sm text-red-600">{errors.short_description}</p>
                      )}
                    </div>
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Detailed description of what makes this book valuable..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  {/* Personal Insight */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Personal Insight
                    </label>
                    <textarea
                      name="personal_insight"
                      value={formData.personal_insight}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Why you personally recommend this book..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Share your personal experience with this book
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing & Metrics */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiDollarSign className="text-green-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Pricing & Metrics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Price ($) *
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`w-full pl-12 pr-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="59.99"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="original_price"
                        value={formData.original_price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="79.99"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                    <div className="relative">
                      <FiStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        max="5"
                        className={`w-full pl-12 pr-4 py-3 border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="4.7"
                      />
                    </div>
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                    )}
                  </div>

                  {/* Reviews */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reviews Count
                    </label>
                    <input
                      type="number"
                      name="reviews"
                      value={formData.reviews}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-4 py-3 border ${errors.reviews ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="2834"
                    />
                    {errors.reviews && (
                      <p className="mt-1 text-sm text-red-600">{errors.reviews}</p>
                    )}
                  </div>

                  {/* Time to Read */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time to Read
                    </label>
                    <div className="relative">
                      <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="time_to_read"
                        value={formData.time_to_read}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2-3 weeks"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Links */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FiHash className="text-orange-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Tags & Links</h2>
                </div>

                <div className="space-y-6">
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add tags (Python, ML, etc.)"
                      />
                      <button
                        type="button"
                        onClick={handleTagAdd}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          <FiTag size={12} />
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {tags.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No tags added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Why Recommend */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Why Recommend This Book?
                    </label>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {whyRecommendOptions.map(reason => (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => handleWhyRecommendAdd(reason)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${whyRecommend.includes(reason) 
                              ? 'bg-green-100 text-green-800 border border-green-300' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            {whyRecommend.includes(reason) && <FiCheck className="inline mr-1" />}
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {whyRecommend.map((reason, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          <FiTrendingUp size={12} />
                          {reason}
                          <button
                            type="button"
                            onClick={() => handleWhyRecommendRemove(reason)}
                            className="ml-1 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {whyRecommend.length === 0 && (
                        <p className="text-sm text-gray-500 italic">Select reasons above</p>
                      )}
                    </div>
                  </div>

                  {/* Amazon Link */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amazon Link *
                    </label>
                    <div className="relative">
                      <FiExternalLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        name="amazon_link"
                        value={formData.amazon_link}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.amazon_link ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="https://www.amazon.com/..."
                      />
                    </div>
                    {errors.amazon_link && (
                      <p className="mt-1 text-sm text-red-600">{errors.amazon_link}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Use Amazon affiliate link if available to earn commissions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <FiImage className="text-pink-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Book Cover</h2>
                </div>

                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, cover_image: '' }));
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all hover:bg-blue-50">
                        <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-600">
                          Click to upload book cover
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 20MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  {uploading && (
                    <p className="text-sm text-blue-600 text-center">Uploading...</p>
                  )}
                  {errors.cover_image && (
                    <p className="text-sm text-red-600 text-center">{errors.cover_image}</p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Use high-quality book cover image (800×1200 recommended)
                  </p>
                </div>
              </div>

              {/* Status Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Status Settings</h2>
                
                <div className="space-y-4">
                  {/* Featured */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Mark as Featured
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Featured books appear in recommendations
                      </p>
                    </div>
                  </div>

                  {/* Bestseller */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="bestseller"
                      name="bestseller"
                      checked={formData.bestseller}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <div>
                      <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Mark as Bestseller
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Display bestseller badge
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-600">
                      <FiAlertCircle />
                      <p className="text-sm font-medium">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSave />
                    <span>{loading ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/admin/courses')}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <FiBook className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Tips for Success</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li className="flex items-start gap-1">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Use Amazon affiliate links for commissions</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Add specific tags for better searchability</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Include personal insights for authenticity</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Feature your most important recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCourseForm;