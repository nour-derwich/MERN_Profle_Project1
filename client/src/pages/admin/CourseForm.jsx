import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { 
  FiSave, FiX, FiUpload, FiImage, 
  FiInfo, FiDollarSign, FiStar, FiExternalLink,
  FiBook, FiUser
} from 'react-icons/fi';
import courseService from '../../services/courseService';

const AdminCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    rating: '',
    reviews: '',
    cover_image: '',
    amazon_link: '',
    featured: false
  });

  const [errors, setErrors] = useState({});

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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, cover_image: 'Image size should be less than 5MB' }));
      return;
    }

    // For now, just create a preview URL
    // In production, you'd upload to cloud storage
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData(prev => ({ ...prev, cover_image: previewUrl }));
    setErrors(prev => ({ ...prev, cover_image: '' }));
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
    if (!formData.category) {
      newErrors.category = 'Category is required';
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

      if (isEditMode) {
        await courseService.update(id, formData);
      } else {
        await courseService.create(formData);
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
                {isEditMode ? 'Edit Course' : 'Add New Course'}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? 'Update course details' : 'Add a new course or book recommendation'}
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
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiInfo className=" from-blue-900 via-blue-800 to-blue-700 " size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course/Book Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="e.g., Clean Code: A Handbook of Agile Software Craftsmanship"
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
                        className={`w-full pl-12 pr-4 py-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="e.g., Robert C. Martin"
                      />
                    </div>
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Describe what makes this course/book valuable..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
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
                      className={`w-full px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">Select Category</option>
                      <option value="programming">Programming</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">Mobile Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                      <option value="soft-skills">Soft Skills</option>
                      <option value="devops">DevOps</option>
                      <option value="databases">Databases</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>

                  {/* Price, Rating, Reviews */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="29.99"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                      )}
                    </div>

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
                          className={`w-full pl-12 pr-4 py-3 border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="4.5"
                          min="0"
                          max="5"
                          step="0.1"
                        />
                      </div>
                      {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Reviews Count
                      </label>
                      <input
                        type="number"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.reviews ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="1250"
                        min="0"
                      />
                      {errors.reviews && (
                        <p className="mt-1 text-sm text-red-600">{errors.reviews}</p>
                      )}
                    </div>
                  </div>

                  {/* Amazon Link */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amazon/Purchase Link *
                    </label>
                    <div className="relative">
                      <FiExternalLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        name="amazon_link"
                        value={formData.amazon_link}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.amazon_link ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="https://www.amazon.com/..."
                      />
                    </div>
                    {errors.amazon_link && (
                      <p className="mt-1 text-sm text-red-600">{errors.amazon_link}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the full Amazon or purchase URL for this course/book
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
                  <h2 className="text-xl font-bold text-gray-900">Cover Image</h2>
                </div>

                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, cover_image: '' }));
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-all">
                        <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-600">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 5MB
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
                    <p className="text-sm  from-blue-900 via-blue-800 to-blue-700  text-center">Uploading...</p>
                  )}
                  {errors.cover_image && (
                    <p className="text-sm text-red-600">{errors.cover_image}</p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Recommended: Book cover or course thumbnail
                  </p>
                </div>
              </div>

              {/* Featured Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5  from-blue-900 via-blue-800 to-blue-700  border-gray-300 rounded focus:ring-purple-500"
                    />
                    <div>
                      <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Mark as featured
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Featured courses appear prominently on the homepage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSave />
                    <span>{loading ? 'Saving...' : isEditMode ? 'Update Course' : 'Add Course'}</span>
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
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <FiBook className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Tip</h3>
                    <p className="text-sm text-blue-700">
                      Add affiliate links to earn commissions from purchases made through your recommendations.
                    </p>
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