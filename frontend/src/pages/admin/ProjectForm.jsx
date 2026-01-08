import { useEffect, useState, useCallback } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiBarChart2,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiDatabase,
  FiEye,
  FiLayers,
  FiLink,
  FiPlus,
  FiSave,
  FiTag,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { projectService } from "../../services/projectService";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [backendStatus, setBackendStatus] = useState("checking");

  // Expanded form state to match new model
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    short_description: "",
    description: "",
    full_description: "",

    // URLs & Media
    cover_image: "",
    demo_url: "",
    github_url: "",
    documentation_url: "",
    article_url: "",
    video: "",

    // Categorization
    category: "",
    technologies: [],
    complexity: "Intermediate",

    // Status & Display
    status: "draft",
    featured: false,
    display_order: 0,

    // Statistics
    views_count: 0,
    stars: 0,
    forks: 0,
    contributors: 1,

    // Project Details
    environment: "",
    development_time: "",
    dataset_size: "",
    team_size: "",
    duration: "",

    // Project Content (Arrays)
    goals: [],
    features: [],
    challenges: [],
    results: [],
    metrics: {},

    // Architecture & Technical
    architecture: "",

    // Metadata
    tags: [],
    meta_description: "",
    meta_keywords: "",

    // Availability Flags
    live_demo_available: false,
    source_code_available: false,
    documentation_available: false,
    api_available: false,
    open_source: false,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [techInput, setTechInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [resultInput, setResultInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [metricInput, setMetricInput] = useState({ key: "", value: "" });
  const [challengeInput, setChallengeInput] = useState({
    description: "",
    solution: "",
  });

  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    content: false,
    tech: true,
    links: false,
    stats: false,
    advanced: false,
  });

  const categories = [
    "AI Finance",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Web Apps",
    "APIs",
    "Automation",
    "Dashboards",
    "Data Science",
    "AI Security",
    "Machine Learning",
    "Cloud Infrastructure",
    "Mobile Development",
    "Blockchain",
    "IoT",
  ];

  const complexityOptions = [
    {
      value: "Beginner",
      label: "Beginner",
      color: "from-green-500 to-emerald-600",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
      color: "from-blue-500 to-cyan-600",
    },
    {
      value: "Advanced",
      label: "Advanced",
      color: "from-purple-500 to-pink-600",
    },
    { value: "Expert", label: "Expert", color: "from-red-500 to-orange-600" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft", color: "gray" },
    { value: "published", label: "Published", color: "green" },
    { value: "archived", label: "Archived", color: "red" },
  ];

  // Check backend connection on mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      console.log("🔍 Checking backend connection...");

      const response = await fetch("/projects/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("✅ Backend is connected!");
        setBackendStatus("connected");
      } else {
        console.log("⚠️ Backend responded but with error");
        setBackendStatus("error");
      }
    } catch (error) {
      console.error("❌ Backend connection failed:", error);
      setBackendStatus("disconnected");
      setError(
        "Cannot connect to backend server. Please ensure the server is running on http://localhost:5000"
      );
    }
  };

  const loadProject = useCallback(async () => {
    try {
      setLoading(true);
      const response = await projectService.getById(id);
      const project = response.data;

      // Map backend data to form state
      setFormData({
        // Basic Information
        title: project.title || "",
        short_description: project.short_description || "",
        description: project.description || "",
        full_description: project.full_description || "",

        // URLs & Media
        cover_image: project.cover_image || "",
        demo_url: project.demo_url || "",
        github_url: project.github_url || "",
        documentation_url: project.documentation_url || "",
        article_url: project.article_url || "",
        video: project.video || "",

        // Categorization
        category: project.category || "",
        technologies: project.technologies || [],
        complexity: project.complexity || "Intermediate",

        // Status & Display
        status: project.status || "draft",
        featured: project.featured || false,
        display_order: project.display_order || 0,

        // Statistics
        views_count: project.views_count || 0,
        stars: project.stars || 0,
        forks: project.forks || 0,
        contributors: project.contributors || 1,

        // Project Details
        environment: project.environment || "",
        development_time: project.development_time || "",
        dataset_size: project.dataset_size || "",
        team_size: project.team_size || "",
        duration: project.duration || "",

        // Project Content (Arrays)
        goals: project.goals || [],
        features: project.features || [],
        challenges: project.challenges || [],
        results: project.results || [],
        metrics: project.metrics || {},

        // Architecture & Technical
        architecture: project.architecture || "",

        // Metadata
        tags: project.tags || [],
        meta_description: project.meta_description || "",
        meta_keywords: project.meta_keywords || "",

        // Availability Flags
        live_demo_available: project.live_demo_available || false,
        source_code_available: project.source_code_available || false,
        documentation_available: project.documentation_available || false,
        api_available: project.api_available || false,
        open_source: project.open_source || false,
      });

      // Set image preview
      if (project.cover_image) {
        setImagePreview(project.cover_image);
      }
    } catch (error) {
      console.error("Error loading project:", error);
      setError(
        "Failed to load project: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  }, [id]); // Add id as dependency since it's used in the API call

  useEffect(() => {
    if (isEdit) {
      loadProject();
    }
  }, [isEdit, loadProject]); 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleTextAreaChange = (name, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Array input handlers
  const handleAddToArray = (field, value, setValueFunc) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setValueFunc("");
    }
  };

  const handleRemoveFromArray = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Technologies
  const handleAddTechnology = () =>
    handleAddToArray("technologies", techInput, setTechInput);
  const handleRemoveTechnology = (index) =>
    handleRemoveFromArray("technologies", index);

  // Goals
  const handleAddGoal = () =>
    handleAddToArray("goals", goalInput, setGoalInput);
  const handleRemoveGoal = (index) => handleRemoveFromArray("goals", index);

  // Features
  const handleAddFeature = () =>
    handleAddToArray("features", featureInput, setFeatureInput);
  const handleRemoveFeature = (index) =>
    handleRemoveFromArray("features", index);

  // Results
  const handleAddResult = () =>
    handleAddToArray("results", resultInput, setResultInput);
  const handleRemoveResult = (index) => handleRemoveFromArray("results", index);

  // Tags
  const handleAddTag = () => handleAddToArray("tags", tagInput, setTagInput);
  const handleRemoveTag = (index) => handleRemoveFromArray("tags", index);

  // Metrics
  const handleAddMetric = () => {
    if (metricInput.key.trim() && metricInput.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          [metricInput.key]: metricInput.value,
        },
      }));
      setMetricInput({ key: "", value: "" });
    }
  };

  const handleRemoveMetric = (key) => {
    const newMetrics = { ...formData.metrics };
    delete newMetrics[key];
    setFormData((prev) => ({
      ...prev,
      metrics: newMetrics,
    }));
  };

  // Challenges
  const handleAddChallenge = () => {
    if (challengeInput.description.trim() && challengeInput.solution.trim()) {
      setFormData((prev) => ({
        ...prev,
        challenges: [...prev.challenges, { ...challengeInput }],
      }));
      setChallengeInput({ description: "", solution: "" });
    }
  };

  const handleRemoveChallenge = (index) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check backend connection first
    if (backendStatus !== "connected") {
      alert(
        "Backend server is not running. Please start the server and try again."
      );
      await checkBackendConnection();
      return;
    }

    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      navigate("/admin/login");
      return;
    }

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    if (file.size > maxSize) {
      alert("Image size should be less than 20MB");
      return;
    }

    // Preview image immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to server using the projectService
    try {
      setLoading(true);
      setUploadProgress(0);
      setError(null);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Use the projectService.uploadImage method
      const result = await projectService.uploadImage(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Update form data with the uploaded image URL
      setFormData((prev) => ({
        ...prev,
        cover_image: result.url || result.data?.url || result.imageUrl,
      }));

      // Check if we got a valid URL back
      const imageUrl = result.url || result.data?.url || result.imageUrl;
      if (imageUrl) {
        console.log("✅ Image uploaded successfully. URL:", imageUrl);
        alert("Image uploaded successfully!");
      } else {
        console.warn("⚠️ Upload successful but no URL returned:", result);
        alert("Image uploaded but no URL returned. Please check the response.");
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);

      // Clear preview if upload fails
      setImagePreview("");

      // Handle specific error types
      if (
        error.message.includes("Cannot connect to server") ||
        error.message.includes("NetworkError") ||
        error.message.includes("ERR_NETWORK")
      ) {
        setError(
          "Cannot connect to server. Please ensure:\n1. Backend server is running on http://localhost:5000\n2. No firewall is blocking the connection"
        );
        setBackendStatus("disconnected");
      } else if (
        error.message.includes("401") ||
        error.message.includes("unauthorized")
      ) {
        setError("Session expired. Please log in again.");
        navigate("/admin/login");
      } else if (
        error.message.includes("too large") ||
        error.message.includes("413")
      ) {
        setError("File is too large. Maximum size is 20MB.");
      } else if (
        error.message.includes("Unsupported file type") ||
        error.message.includes("415")
      ) {
        setError("Unsupported file type. Please use JPEG, PNG, or WebP.");
      } else {
        setError(error.message || "Failed to upload image. Please try again.");
      }

      // Also show alert for immediate feedback
      alert(`Upload failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      alert(
        "Please fill in all required fields (Title, Description, Category)"
      );
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

      navigate("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      setError(
        "Failed to save project: " +
          (error.response?.data?.message || error.message)
      );
      alert("Failed to save project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Render expandable section
  const renderSection = (title, sectionKey, icon, children) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {expandedSections[sectionKey] ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      <div
        className={`px-6 pb-6 ${expandedSections[sectionKey] ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );

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
              onClick={() => navigate("/admin/projects")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <FiArrowLeft />
              <span>Back to Projects</span>
            </button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
              {isEdit ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-gray-600">
              {isEdit
                ? "Update your project details"
                : "Add a new project to your portfolio"}
            </p>
          </div>
        </div>
      </div>

      {/* Backend Status Alert */}
      {backendStatus === "disconnected" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <FiAlertCircle className="text-red-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-2">
                Backend Server Not Connected
              </h3>
              <p className="text-red-700 text-sm mb-3">
                Cannot connect to the backend server. Please ensure:
              </p>
              <ul className="text-red-700 text-sm space-y-1 list-disc list-inside mb-3">
                <li>
                  Backend server is running on{" "}
                  <code className="bg-red-100 px-1 rounded">
                    http://localhost:5000
                  </code>
                </li>
                <li>No firewall is blocking the connection</li>
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
      {error && backendStatus !== "disconnected" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">!</span>
            </div>
            <p className="text-red-800 whitespace-pre-line">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        {renderSection(
          "Basic Information",
          "basic",
          <FiEye className="text-blue-600" />,
          <div className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Detailed project description..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extended Description (Optional)
              </label>
              <textarea
                name="full_description"
                value={formData.full_description}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Extended project details for the detailed view..."
              />
            </div>
          </div>
        )}

        {/* Content Section - Goals, Features, Results */}
        {renderSection(
          "Project Content",
          "content",
          <FiLayers className="text-green-600" />,
          <div className="space-y-8">
            {/* Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Project Goals
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddGoal())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add a project goal"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-2">
                {formData.goals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <FiCheckCircle className="text-green-500" />
                      <span>{goal}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Key Features
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddFeature())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a key feature"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <FiCheckCircle className="text-blue-500" />
                      <span>{feature}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Project Results
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddResult())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a project result"
                />
                <button
                  type="button"
                  onClick={handleAddResult}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-2">
                {formData.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <FiTrendingUp className="text-purple-500" />
                      <span>{result}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveResult(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Challenges & Solutions
              </label>
              <div className="space-y-4 mb-3">
                <input
                  type="text"
                  value={challengeInput.description}
                  onChange={(e) =>
                    setChallengeInput({
                      ...challengeInput,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Challenge description"
                />
                <textarea
                  value={challengeInput.solution}
                  onChange={(e) =>
                    setChallengeInput({
                      ...challengeInput,
                      solution: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Solution"
                />
                <button
                  type="button"
                  onClick={handleAddChallenge}
                  className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  Add Challenge
                </button>
              </div>
              <div className="space-y-3">
                {formData.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-4 bg-orange-50 rounded-lg border border-orange-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <FiAlertCircle className="text-orange-500" />
                        <span className="font-semibold">
                          Challenge {index + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveChallenge(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Problem:</strong> {challenge.description}
                      </p>
                      <p className="text-sm">
                        <strong>Solution:</strong> {challenge.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Performance Metrics
              </label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={metricInput.key}
                  onChange={(e) =>
                    setMetricInput({ ...metricInput, key: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Metric name (e.g., ROI)"
                />
                <input
                  type="text"
                  value={metricInput.value}
                  onChange={(e) =>
                    setMetricInput({ ...metricInput, value: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Value (e.g., 28.5%)"
                />
              </div>
              <button
                type="button"
                onClick={handleAddMetric}
                className="w-full mb-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Add Metric
              </button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(formData.metrics).map(([key, value], index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-indigo-600 font-medium">
                          {key}
                        </div>
                        <div className="text-lg font-bold text-indigo-800">
                          {value}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMetric(key)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technologies Section */}
        {renderSection(
          "Technologies & Tools",
          "tech",
          <FiCode className="text-indigo-600" />,
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexity Level
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {complexityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        complexity: option.value,
                      }))
                    }
                    className={`px-4 py-3 rounded-xl transition-all ${
                      formData.complexity === option.value
                        ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used *
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddTechnology())
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add technology (e.g., React, Node.js)"
                  required
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors"
                >
                  Add
                </button>
              </div>

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
                      onClick={() => handleRemoveTechnology(index)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Tags
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add tag (e.g., ai, web, ml)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Links & Media Section */}
        {renderSection(
          "Links & Media",
          "links",
          <FiLink className="text-blue-600" />,
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image *
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, cover_image: "" }));
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Max 20MB • JPEG, PNG, WebP
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={backendStatus !== "connected"}
                  />
                </label>
              )}
            </div>

            {/* URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                name="demo_url"
                value={formData.demo_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documentation URL
              </label>
              <input
                type="url"
                name="documentation_url"
                value={formData.documentation_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="https://docs.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article/Case Study URL
              </label>
              <input
                type="url"
                name="article_url"
                value={formData.article_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://blog.example.com/case-study"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (Demo/Showcase)
              </label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        )}

        {/* Stats & Details Section */}
        {renderSection(
          "Project Details & Stats",
          "stats",
          <FiBarChart2 className="text-green-600" />,
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Development Environment
              </label>
              <input
                type="text"
                name="environment"
                value={formData.environment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., VS Code, WebStorm, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Development Time
              </label>
              <input
                type="text"
                name="development_time"
                value={formData.development_time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 6 months, 3 weeks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size
              </label>
              <input
                type="text"
                name="team_size"
                value={formData.team_size}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 3 members, Solo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 4 months, Ongoing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dataset Size (if applicable)
              </label>
              <input
                type="text"
                name="dataset_size"
                value={formData.dataset_size}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 500GB, 1M records"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Stars
              </label>
              <input
                type="number"
                name="stars"
                value={formData.stars}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Forks
              </label>
              <input
                type="number"
                name="forks"
                value={formData.forks}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contributors
              </label>
              <input
                type="number"
                name="contributors"
                value={formData.contributors}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
                min="1"
              />
            </div>
          </div>
        )}

        {/* Advanced Settings Section */}
        {renderSection(
          "Advanced Settings",
          "advanced",
          <FiDatabase className="text-purple-600" />,
          <div className="space-y-6">
            {/* Architecture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Architecture
              </label>
              <textarea
                name="architecture"
                value={formData.architecture}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe the system architecture, design patterns, and infrastructure..."
              />
            </div>

            {/* Status & Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Availability Flags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Availability Flags
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="live_demo_available"
                    checked={formData.live_demo_available}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Live Demo</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="source_code_available"
                    checked={formData.source_code_available}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Source Code</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="documentation_available"
                    checked={formData.documentation_available}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Documentation</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="api_available"
                    checked={formData.api_available}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">API Available</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="open_source"
                    checked={formData.open_source}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Open Source</label>
                </div>
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="text-lg font-medium text-gray-700">
                Feature this project on homepage
              </label>
            </div>

            {/* SEO Metadata */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description for search engines (max 300 characters)"
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_description.length}/300 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords (SEO)
              </label>
              <input
                type="text"
                name="meta_keywords"
                value={formData.meta_keywords}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Comma-separated keywords (e.g., ai, machine learning, web app)"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-lg font-semibold"
            >
              <FiSave />
              <span>
                {saving
                  ? "Saving..."
                  : isEdit
                    ? "Update Project"
                    : "Create Project"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
