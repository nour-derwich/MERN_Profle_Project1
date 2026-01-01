import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiSave, 
  FiArrowLeft, 
  FiUpload, 
  FiX,
  FiEye,
  FiCode,
  FiLink,
  FiTag,
  FiAlertCircle
} from 'react-icons/fi';
import { projectService } from '../../services/projectService';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [backendStatus, setBackendStatus] = useState('checking');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    category: '',
    technologies: [],
    demo_url: '',
    github_url: '',
    enverment: '',
    video: '',
    status: 'draft',
    featured: false,
    cover_image: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [techInput, setTechInput] = useState('');
  const [categories] = useState([
    'Web Development',
    'Mobile Development',
    'Desktop Application',
    'E-commerce',
    'CMS',
    'API Development',
    'Database Design',
    'DevOps',
    'Machine Learning',
    'Data Analysis',
    'Game Development',
    'Other'
  ]);

  // Check backend connection on mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  useEffect(() => {
    if (isEdit) {
      loadProject();
    }
  }, [id]);

  const checkBackendConnection = async () => {
    try {
      console.log('🔍 Checking backend connection...');
      const response = await fetch('http://localhost:5000/api/projects/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log('✅ Backend is connected!');
        setBackendStatus('connected');
      } else {
        console.log('⚠️ Backend responded but with error');
        setBackendStatus('error');
      }
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      setBackendStatus('disconnected');
      setError('Cannot connect to backend server. Please ensure the server is running on http://localhost:5000');
    }
  };

  const validateImageUrl = async (url) => {
    if (!url) {
      setImagePreview('');
      return;
    }

    try {
      // Test if image URL is accessible
      const img = new Image();
      img.onload = () => {
        console.log('✅ Image URL is valid:', url);
        setImagePreview(url);
      };
      img.onerror = () => {
        console.error('❌ Image URL is broken:', url);
        setImagePreview('');
        setError(`The saved image URL is no longer accessible: ${url.substring(0, 50)}...`);
      };
      img.src = url;
    } catch (error) {
      console.error('Error validating image:', error);
      setImagePreview('');
    }
  };

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await projectService.getById(id);
      const project = response.data;
      
      setFormData({
        title: project.title || '',
        description: project.description || '',
        short_description: project.short_description || '',
        category: project.category || '',
        technologies: project.technologies || [],
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        enverment: project.enverment || '',
        video: project.video || '',
        status: project.status || 'draft',
        featured: project.featured || false,
        cover_image: project.cover_image || ''
      });

      if (project.cover_image) {
        // Validate the image URL before setting preview
        validateImageUrl(project.cover_image);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      setError('Failed to load project: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check backend connection first
    if (backendStatus !== 'connected') {
      alert('Backend server is not running. Please start the server and try again.');
      await checkBackendConnection();
      return;
    }

    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Please log in first');
      navigate('/admin/login');
      return;
    }

    console.log('🔐 Token exists:', !!token);
    console.log('📁 File to upload:', file.name, file.size, file.type);

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > maxSize) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Preview image immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      setLoading(true);
      setUploadProgress(0);
      setError(null);
      
      console.log('🔄 Starting upload process...');
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      
      // Manual fetch call with better error handling
      const response = await fetch('http://localhost:5000/api/projects/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Upload response:', result);
      
      setFormData(prev => ({
        ...prev,
        cover_image: result.url || result.data?.url
      }));

      setUploadProgress(100);
      alert('Image uploaded successfully!');
      
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      
      // Clear preview on error
      setImagePreview('');
      
      // Detailed error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError('Cannot connect to server. Please ensure:\n1. Backend server is running on http://localhost:5000\n2. No firewall is blocking the connection\n3. CORS is properly configured');
        setBackendStatus('disconnected');
        alert('Backend server is not responding. Please check if the server is running.');
      } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
        setError('Session expired. Please log in again.');
        alert('Session expired. Please log in again.');
        navigate('/admin/login');
      } else if (error.message.includes('413')) {
        setError('File is too large. Maximum size is 5MB.');
        alert('File is too large. Please select an image under 5MB.');
      } else {
        setError(error.message || 'Failed to upload image. Please try again.');
        alert(error.message || 'Failed to upload image. Please try again.');
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      if (isEdit) {
        await projectService.update(id, formData);
      } else {
        await projectService.create(formData);
      }
      
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project: ' + (error.response?.data?.message || error.message));
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !uploadProgress) {
    return (
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/projects')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <FiArrowLeft />
              <span>Back to Projects</span>
            </button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
              {isEdit ? 'Edit Project' : 'Create New Project'}
            </h1>
            <p className="text-gray-600">
              {isEdit ? 'Update your project details' : 'Add a new project to your portfolio'}
            </p>
          </div>
        </div>
      </div>

      {/* Backend Status Alert */}
      {backendStatus === 'disconnected' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <FiAlertCircle className="text-red-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-2">Backend Server Not Connected</h3>
              <p className="text-red-700 text-sm mb-3">
                Cannot connect to the backend server. Please ensure:
              </p>
              <ul className="text-red-700 text-sm space-y-1 list-disc list-inside mb-3">
                <li>Backend server is running on <code className="bg-red-100 px-1 rounded">http://localhost:5000</code></li>
                <li>No firewall is blocking the connection</li>
                <li>CORS is properly configured in the backend</li>
              </ul>
              <button
                onClick={checkBackendConnection}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && backendStatus !== 'disconnected' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">!</span>
            </div>
            <p className="text-red-800 whitespace-pre-line">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-blue-800">Uploading image... {uploadProgress}%</p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Brief description (max 500 characters)"
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.short_description.length}/500 characters
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Detailed project description..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Technologies & Tools</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add technology (e.g., React, Node.js)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-indigo-100 text-indigo-800 rounded-lg text-sm"
                    >
                      <FiTag size={14} />
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links & Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Links & Media</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiLink className="inline mr-2" />
                    Demo URL
                  </label>
                  <input
                    type="url"
                    name="demo_url"
                    value={formData.demo_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://demo.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCode className="inline mr-2" />
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiEye className="inline mr-2" />
                    Video URL (Demo/Showcase)
                  </label>
                  <input
                    type="url"
                    name="video"
                    value={formData.video}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Image</h3>
              
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('❌ Failed to load image preview');
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        setError('Image preview failed to load. The image URL may be broken.');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, cover_image: '' }));
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">Max 5MB • JPEG, PNG, WebP</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={backendStatus !== 'connected'}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Project Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Settings</h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Environment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Development Environment
                  </label>
                  <input
                    type="text"
                    name="enverment"
                    value={formData.enverment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., VS Code, WebStorm, etc."
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Feature this project
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <FiSave />
                  <span>{saving ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;