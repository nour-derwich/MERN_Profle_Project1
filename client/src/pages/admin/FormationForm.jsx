import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { 
  FiSave, FiX, FiUpload, FiImage, 
  FiInfo, FiDollarSign, FiClock, FiBook,
  FiUsers, FiCalendar
} from 'react-icons/fi';
import formationService from '../../services/formationService';

const AdminFormationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    cover_image: '',
    category: '',
    level: 'beginner',
    duration_hours: '',
    price: '',
    max_participants: '',
    start_date: '',
    end_date: '',
    schedule: '',
    status: 'draft',
    featured: false,
    learning_objectives: [''],
    prerequisites: [''],
    program: [''],
    instructor_name: '',
    instructor_bio: '',
    instructor_photo: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      loadFormation();
    }
  }, [id]);

  const loadFormation = async () => {
    try {
      setLoading(true);
      const response = await formationService.getById(id);
      const data = response.data;
      
      setFormData({
        ...data,
        learning_objectives: Array.isArray(data.learning_objectives) ? data.learning_objectives : [''],
        prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [''],
        program: Array.isArray(data.program) ? data.program : ['']
      });
      
      if (data.cover_image) {
        setImagePreview(data.cover_image);
      }
    } catch (error) {
      console.error('Error loading formation:', error);
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

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
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

    try {
      setUploading(true);
      const data = await formationService.uploadImage(file);
      setFormData(prev => ({ ...prev, cover_image: data.url }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, cover_image: '' }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, cover_image: 'Failed to upload image' }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
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
    if (!formData.duration_hours || formData.duration_hours <= 0) {
      newErrors.duration_hours = 'Valid duration is required';
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.max_participants || formData.max_participants < 1) {
      newErrors.max_participants = 'Max participants must be at least 1';
    }
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }
    if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
      newErrors.end_date = 'End date must be after start date';
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
      
      // Clean up array fields (remove empty strings)
      const cleanedData = {
        ...formData,
        learning_objectives: formData.learning_objectives.filter(item => item.trim()),
        prerequisites: formData.prerequisites.filter(item => item.trim()),
        program: formData.program.filter(item => item.trim())
      };

      if (isEditMode) {
        await formationService.update(id, cleanedData);
      } else {
        await formationService.create(cleanedData);
      }

      navigate('/admin/formations');
    } catch (error) {
      console.error('Error saving formation:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: error.response?.data?.message || 'Failed to save formation. Please try again.' 
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
                {isEditMode ? 'Edit Formation' : 'Create New Formation'}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? 'Update formation details' : 'Fill in the details to create a new formation'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/formations')}
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
                      Formation Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="e.g., Full Stack Web Development"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

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
                      className={`w-full px-4 py-3 border ${errors.short_description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Brief overview for cards (1-2 sentences)"
                    />
                    {errors.short_description && (
                      <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Detailed description of what students will learn..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  {/* Category and Level */}
                  <div className="grid grid-cols-2 gap-4">
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
                        <option value="web-development">Web Development</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Level *
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  {/* Duration, Price, and Max Participants */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration (hours) *
                      </label>
                      <div className="relative">
                        <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="duration_hours"
                          value={formData.duration_hours}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.duration_hours ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="40"
                          min="1"
                        />
                      </div>
                      {errors.duration_hours && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration_hours}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (TND) *
                      </label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="299"
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
                        Max Students *
                      </label>
                      <div className="relative">
                        <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="max_participants"
                          value={formData.max_participants}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.max_participants ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="25"
                          min="1"
                        />
                      </div>
                      {errors.max_participants && (
                        <p className="mt-1 text-sm text-red-600">{errors.max_participants}</p>
                      )}
                    </div>
                  </div>

                  {/* Dates and Schedule */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        />
                      </div>
                      {errors.start_date && (
                        <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Date *
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        />
                      </div>
                      {errors.end_date && (
                        <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                      )}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Schedule
                    </label>
                    <input
                      type="text"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Mon-Fri 9:00 AM - 5:00 PM"
                    />
                  </div>
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiBook className="text-green-600" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Learning Objectives</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('learning_objectives')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium"
                  >
                    + Add Objective
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.learning_objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleArrayChange('learning_objectives', index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={`Objective ${index + 1}`}
                      />
                      {formData.learning_objectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('learning_objectives', index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Prerequisites</h2>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('prerequisites')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium"
                  >
                    + Add Prerequisite
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={prerequisite}
                        onChange={(e) => handleArrayChange('prerequisites', index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={`Prerequisite ${index + 1}`}
                      />
                      {formData.prerequisites.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('prerequisites', index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Program/Syllabus */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Program Outline</h2>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('program')}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm font-medium"
                  >
                    + Add Module
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.program.map((module, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={module}
                        onChange={(e) => handleArrayChange('program', index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={`Module ${index + 1}`}
                      />
                      {formData.program.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem('program', index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Instructor Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      name="instructor_name"
                      value={formData.instructor_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instructor Bio
                    </label>
                    <textarea
                      name="instructor_bio"
                      value={formData.instructor_bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Brief biography..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instructor Photo URL
                    </label>
                    <input
                      type="url"
                      name="instructor_photo"
                      value={formData.instructor_photo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
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
                        className="w-full h-48 object-cover rounded-xl"
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
                </div>
              </div>

              {/* Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Publication</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5  from-blue-900 via-blue-800 to-blue-700  border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                      Mark as featured
                    </label>
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
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                  >
                    <FiSave />
                    <span>{loading ? 'Saving...' : isEditMode ? 'Update Formation' : 'Create Formation'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/admin/formations')}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormationForm;