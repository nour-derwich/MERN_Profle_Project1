import { useEffect, useState, useCallback } from "react";
import {
  FiBook,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiGlobe,
  FiImage,
  FiInfo,
  FiPlus,
  FiSave,
  FiTarget,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiUsers,
  FiVideo,
  FiX,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import formationService from "../../services/formationService";

const AdminFormationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    short_description: "",
    full_description: "",
    category: "Machine Learning",
    level: "beginner",
    price: "",
    original_price: "",
    installment_price: "",
    currency: "USD",
    duration_hours: "",
    weeks_duration: "",
    hours_per_week: "",
    max_participants: "",
    current_participants: 0,
    start_date: "",
    end_date: "",
    schedule: "",
    format: "Online",
    location: "Online",
    live_sessions: "Weekly",
    status: "draft",
    featured: false,
    cover_image: "",
    prerequisites: "",
    learning_objectives: [""],
    features: [""],
    highlights: [""],
    modules: [{ title: "", duration: "", topics: [""] }],
    testimonials: [],
    instructor_name: "Naceur Keraani",
    instructor_title: "AI/ML Engineer",
    instructor_bio: "",
    instructor_photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naceur",
    instructor_rating: 4.9,
    instructor_reviews: 0,
    instructor_students: 0,
    instructor_verified: true,
    tags: [],
    meta_description: "",
    meta_keywords: "",
  });

  const [errors, setErrors] = useState({});

  const loadFormation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await formationService.getById(id);
      const data = response.data;

      setFormData({
        ...data,
        learning_objectives: Array.isArray(data.learning_objectives)
          ? data.learning_objectives
          : [""],
        features: Array.isArray(data.features) ? data.features : [""],
        highlights: Array.isArray(data.highlights) ? data.highlights : [""],
        modules: Array.isArray(data.modules)
          ? data.modules
          : [{ title: "", duration: "", topics: [""] }],
        tags: Array.isArray(data.tags) ? data.tags : [],
        testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
      });

      if (data.cover_image) {
        setImagePreview(data.cover_image);
      }
    } catch (error) {
      console.error("Error loading formation:", error);
    } finally {
      setLoading(false);
    }
  }, [id]); // id is the only dependency

  useEffect(() => {
    if (isEditMode) {
      loadFormation();
    }
  }, [isEditMode, loadFormation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleModuleChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) =>
        i === index ? { ...module, [field]: value } : module
      ),
    }));
  };

  const handleModuleTopicChange = (moduleIndex, topicIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) => {
        if (i === moduleIndex) {
          return {
            ...module,
            topics: module.topics.map((topic, j) =>
              j === topicIndex ? value : topic
            ),
          };
        }
        return module;
      }),
    }));
  };

  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: "", duration: "", topics: [""] }],
    }));
  };

  const handleRemoveModule = (index) => {
    if (formData.modules.length > 1) {
      setFormData((prev) => ({
        ...prev,
        modules: prev.modules.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddModuleTopic = (moduleIndex) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) => {
        if (i === moduleIndex) {
          return {
            ...module,
            topics: [...module.topics, ""],
          };
        }
        return module;
      }),
    }));
  };

  const handleRemoveModuleTopic = (moduleIndex, topicIndex) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) => {
        if (i === moduleIndex) {
          return {
            ...module,
            topics: module.topics.filter((_, j) => j !== topicIndex),
          };
        }
        return module;
      }),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        cover_image: "Please select an image file",
      }));
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        cover_image: "Image size should be less than 20MB",
      }));
      return;
    }

    try {
      setUploading(true);
      // For now, create a local URL preview - you'll need to implement actual upload
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, cover_image: imageUrl }));
      setImagePreview(imageUrl);
      setErrors((prev) => ({ ...prev, cover_image: "" }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrors((prev) => ({ ...prev, cover_image: "Failed to upload image" }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.short_description.trim()) {
      newErrors.short_description = "Short description is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.duration_hours || formData.duration_hours <= 0) {
      newErrors.duration_hours = "Valid duration is required";
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.max_participants || formData.max_participants < 1) {
      newErrors.max_participants = "Max participants must be at least 1";
    }
    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }
    if (!formData.end_date) {
      newErrors.end_date = "End date is required";
    }
    if (
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) > new Date(formData.end_date)
    ) {
      newErrors.end_date = "End date must be after start date";
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

      // Prepare data for API
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price
          ? parseFloat(formData.original_price)
          : null,
        installment_price: formData.installment_price
          ? parseFloat(formData.installment_price)
          : null,
        duration_hours: parseInt(formData.duration_hours),
        weeks_duration:
          formData.weeks_duration ||
          `${Math.ceil(formData.duration_hours / 8)} weeks`,
        hours_per_week:
          formData.hours_per_week ||
          `${Math.ceil(formData.duration_hours / (parseInt(formData.duration_hours) > 40 ? 12 : 8))} hours`,
        max_participants: parseInt(formData.max_participants),
        current_participants: parseInt(formData.current_participants),
        // Clean up arrays
        learning_objectives: formData.learning_objectives.filter((item) =>
          item.trim()
        ),
        features: formData.features.filter((item) => item.trim()),
        highlights: formData.highlights.filter((item) => item.trim()),
        tags: formData.tags.filter((item) => item.trim()),
        modules: formData.modules
          .map((module) => ({
            ...module,
            topics: module.topics.filter((topic) => topic.trim()),
          }))
          .filter((module) => module.title.trim() && module.topics.length > 0),
      };

      if (isEditMode) {
        await formationService.update(id, submitData);
      } else {
        await formationService.create(submitData);
      }

      navigate("/admin/formations");
    } catch (error) {
      console.error("Error saving formation:", error);
      setErrors((prev) => ({
        ...prev,
        submit:
          error.response?.data?.message ||
          "Failed to save formation. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "AI Engineering",
    "Web Development",
    "Mobile Development",
    "Design",
    "Business",
    "Marketing",
  ];

  const levels = [
    { value: "beginner", label: "Beginner", color: "green" },
    { value: "intermediate", label: "Intermediate", color: "blue" },
    { value: "advanced", label: "Advanced", color: "purple" },
    { value: "expert", label: "Expert", color: "red" },
  ];

  const formats = [
    { value: "Online", label: "Online", icon: <FiGlobe /> },
    { value: "In-person", label: "In-person", icon: <FiUsers /> },
    { value: "Hybrid", label: "Hybrid", icon: <FiVideo /> },
  ];

  const statuses = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "enrolling", label: "Enrolling" },
    { value: "upcoming", label: "Upcoming" },
    { value: "full", label: "Full" },
    { value: "completed", label: "Completed" },
  ];

  if (loading && isEditMode) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
                {isEditMode ? "Edit Formation" : "Create New Formation"}
              </h1>
              <p className="text-gray-600">
                {isEditMode
                  ? "Update formation details"
                  : "Fill in the details to create a new formation"}
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/formations")}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <FiX />
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiInfo className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Formation Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="e.g., Machine Learning Mastery Bootcamp"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Level *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {levels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "level", value: level.value },
                        })
                      }
                      className={`px-4 py-3 rounded-xl text-center border transition-all ${
                        formData.level === level.value
                          ? `bg-${level.color}-500 text-white border-${level.color}-500`
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-3 border ${errors.short_description ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Brief overview for cards (1-2 sentences)"
                />
                {errors.short_description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.short_description}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Detailed description of what students will learn..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiDollarSign className="text-green-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Pricing & Duration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="899"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Original Price
                </label>
                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1199"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Installment Price
                </label>
                <input
                  type="number"
                  name="installment_price"
                  value={formData.installment_price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="299"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.duration_hours ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="96"
                  min="1"
                />
                {errors.duration_hours && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.duration_hours}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Format
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {formats.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Participants *
                </label>
                <input
                  type="number"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.max_participants ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="15"
                  min="1"
                />
                {errors.max_participants && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.max_participants}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule & Dates */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCalendar className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Schedule & Dates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.start_date ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.end_date ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.end_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Live Sessions
                </label>
                <select
                  name="live_sessions"
                  value={formData.live_sessions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Recorded">Recorded</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Schedule Details
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mon, Wed, Fri - 6:00 PM - 9:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FiTarget className="text-yellow-600" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Learning Objectives
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleAddArrayItem("learning_objectives")}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
              >
                <FiPlus />
                <span>Add Objective</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.learning_objectives.map((objective, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) =>
                        handleArrayChange(
                          "learning_objectives",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Learning objective ${index + 1}`}
                    />
                  </div>
                  {formData.learning_objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("learning_objectives", index)
                      }
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Features</h2>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("features")}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  <FiPlus />
                  <span>Add Feature</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange("features", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Live Interactive Sessions"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("features", index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Highlights</h2>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("highlights")}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                >
                  <FiPlus />
                  <span>Add Highlight</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FiTrendingUp className="text-purple-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        handleArrayChange("highlights", index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Build 10+ ML models from scratch"
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem("highlights", index)
                        }
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FiBook className="text-indigo-600" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Course Modules
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddModule}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
              >
                <FiPlus />
                <span>Add Module</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Module {moduleIndex + 1}
                    </h3>
                    {formData.modules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(moduleIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Module Title
                      </label>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Weeks 1-3: ML Fundamentals"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={module.duration}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 24 hours"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-gray-700">
                        Topics
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddModuleTopic(moduleIndex)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Topic
                      </button>
                    </div>

                    {module.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex-1">
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) =>
                              handleModuleTopicChange(
                                moduleIndex,
                                topicIndex,
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Topic ${topicIndex + 1}`}
                          />
                        </div>
                        {module.topics.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveModuleTopic(moduleIndex, topicIndex)
                            }
                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
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
                        setFormData((prev) => ({ ...prev, cover_image: "" }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-all">
                      <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                      <p className="text-sm font-medium text-gray-600">
                        Click to upload cover image
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
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
                  <p className="text-sm text-blue-600 text-center">
                    Uploading...
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Publication
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "status", value: status.value },
                          })
                        }
                        className={`px-4 py-3 rounded-xl text-center text-sm font-medium border transition-all ${
                          formData.status === status.value
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mark as featured formation
                  </label>
                </div>

                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                >
                  <FiSave />
                  <span>
                    {loading
                      ? "Saving..."
                      : isEditMode
                        ? "Update Formation"
                        : "Create Formation"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormationForm;
