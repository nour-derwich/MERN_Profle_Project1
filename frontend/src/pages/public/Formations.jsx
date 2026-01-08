import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import FormationsHero from "../../components/formations/FormationsHero";
import FormationsFilters from "../../components/formations/FormationsFilters";
import FormationsGrid from "../../components/formations/FormationsGrid";
import FormationDetail from "../../components/formations/FormationDetail";
import RegistrationModal from "../../components/formations/RegistrationModal";
import { formationService } from "../../services/formationService";
import { registrationService } from "../../services/registrationService";

const Formations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({
    formation_id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    current_role: "",
    message: "",
    terms: false,
  });

  // New state for API data
  const [formations, setFormations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [totalFormations, setTotalFormations] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 6;

  // Wrap the fetch functions in useCallback
  const fetchFormations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        level: selectedLevel !== "all" ? selectedLevel : undefined,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
        searchQuery: searchQuery || undefined,
        sortBy,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      };

      // Remove undefined filters
      Object.keys(filters).forEach((key) => {
        if (filters[key] === undefined) {
          delete filters[key];
        }
      });

      const response = await formationService.getAll(filters);

      if (response.success) {
        // Transform API data to match frontend structure
        const transformedData = response.data.map((formation) => ({
          id: formation.id,
          title: formation.title,
          description: formation.description,
          short_description: formation.short_description,
          full_description: formation.full_description,
          cover_image: formation.cover_image,
          category: formation.category,
          level: formation.level,
          duration_hours: formation.duration_hours,
          weeks_duration: formation.weeks_duration,
          hours_per_week: formation.hours_per_week,
          max_participants: formation.max_participants,
          current_participants: formation.current_participants,
          start_date: formation.start_date,
          end_date: formation.end_date,
          schedule: formation.schedule,
          format: formation.format || "Online",
          location: formation.location || "Online",
          live_sessions: formation.live_sessions,
          status: formation.status,
          featured: formation.featured || false,
          instructor_name: formation.instructor_name,
          instructor_title: formation.instructor_title,
          instructor_bio: formation.instructor_bio,
          instructor_photo: formation.instructor_photo,
          instructor_rating: formation.instructor_rating,
          instructor_reviews: formation.instructor_reviews,
          instructor_students: formation.instructor_students,
          instructor_verified: formation.instructor_verified,
          rating: formation.rating,
          reviews_count: formation.reviews_count,
          views_count: formation.views_count,
          spots_left:
            formation.spots_left ||
            formation.max_participants - formation.current_participants,
          // Handle array/JSON fields
          program:
            typeof formation.program === "string"
              ? JSON.parse(formation.program)
              : formation.program || [],
          modules:
            typeof formation.modules === "string"
              ? JSON.parse(formation.modules)
              : formation.modules || [],
          testimonials:
            typeof formation.testimonials === "string"
              ? JSON.parse(formation.testimonials)
              : formation.testimonials || [],
          features: Array.isArray(formation.features) ? formation.features : [],
          highlights: Array.isArray(formation.highlights)
            ? formation.highlights
            : [],
          learning_objectives: Array.isArray(formation.learning_objectives)
            ? formation.learning_objectives
            : [],
          tags: Array.isArray(formation.tags) ? formation.tags : [],
          prerequisites: formation.prerequisites || "",
          created_at: formation.created_at,
          updated_at: formation.updated_at,
        }));

        setFormations(transformedData);
        setTotalFormations(response.count || transformedData.length);
      } else {
        setError(response.message || "Failed to load formations");
      }
    } catch (err) {
      console.error("Error fetching formations:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load formations. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedCategory,
    selectedLevel,
    selectedStatus,
    searchQuery,
    sortBy,
    currentPage,
  ]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await formationService.getCategories();
      if (response.success) {
        const categoriesData = response.data || [];
        setCategories([
          {
            value: "all",
            label: "All Categories",
            color: "from-gray-600 to-gray-800",
          },
          ...categoriesData.map((cat) => ({
            value: cat.category.toLowerCase().replace(/ /g, "-"),
            label: cat.category,
            color: getCategoryColor(cat.category),
            count: cat.count,
          })),
        ]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback categories if API fails
      setCategories([
        {
          value: "all",
          label: "All Categories",
          color: "from-gray-600 to-gray-800",
        },
        {
          value: "web-dev",
          label: "Web Development",
          color: "from-blue-500 to-cyan-600",
        },
        {
          value: "data-science",
          label: "Data Science",
          color: "from-green-500 to-emerald-600",
        },
        {
          value: "design",
          label: "UI/UX Design",
          color: "from-purple-500 to-pink-600",
        },
        {
          value: "business",
          label: "Business",
          color: "from-orange-500 to-amber-600",
        },
      ]);
    }
  }, []);

  const fetchLevels = useCallback(async () => {
    try {
      const response = await formationService.getLevels();
      if (response.success) {
        const levelsData = response.data || [];
        setLevels([
          {
            value: "all",
            label: "All Levels",
            color: "from-gray-600 to-gray-800",
          },
          ...levelsData.map((level) => ({
            value: level.level,
            label: formatLevelLabel(level.level),
            color: getLevelColor(level.level),
            count: level.count,
          })),
        ]);
      }
    } catch (err) {
      console.error("Error fetching levels:", err);
      // Fallback levels if API fails
      setLevels([
        {
          value: "all",
          label: "All Levels",
          color: "from-gray-600 to-gray-800",
        },
        {
          value: "beginner",
          label: "Beginner",
          color: "from-green-500 to-emerald-600",
        },
        {
          value: "intermediate",
          label: "Intermediate",
          color: "from-blue-500 to-cyan-600",
        },
        {
          value: "advanced",
          label: "Advanced",
          color: "from-purple-500 to-pink-600",
        },
      ]);
    }
  }, []);

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "from-blue-500 to-cyan-600",
      "Data Science": "from-green-500 to-emerald-600",
      "UI/UX Design": "from-purple-500 to-pink-600",
      Business: "from-orange-500 to-amber-600",
      Marketing: "from-yellow-500 to-amber-600",
      "Machine Learning": "from-primary-500 to-blue-600",
      "Deep Learning": "from-indigo-500 to-purple-600",
      "AI Engineering": "from-red-500 to-orange-600",
      default: "from-gray-500 to-gray-700",
    };
    return colors[category] || colors.default;
  };

  // Helper function to format level label
  const formatLevelLabel = (level) => {
    const labels = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    };
    return labels[level] || level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Helper function to get level color
  const getLevelColor = (level) => {
    const colors = {
      beginner: "from-green-500 to-emerald-600",
      intermediate: "from-blue-500 to-cyan-600",
      advanced: "from-purple-500 to-pink-600",
      default: "from-gray-500 to-gray-700",
    };
    return colors[level] || colors.default;
  };

  // Initialize component
  useEffect(() => {
    setIsVisible(true);
    fetchFormations();
    fetchCategories();
    fetchLevels();

    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [fetchFormations, fetchCategories, fetchLevels]); // Add the functions to dependency array

  // Update formations when filters change
  useEffect(() => {
    fetchFormations();
  }, [
    selectedCategory,
    selectedLevel,
    selectedStatus,
    sortBy,
    currentPage,
    searchQuery,
    fetchFormations,
  ]);

  // Status options
  const statuses = [
    { value: "all", label: "All Statuses", color: "from-gray-600 to-gray-800" },
    {
      value: "published",
      label: "Published",
      color: "from-green-500 to-emerald-600",
    },
    {
      value: "enrolling",
      label: "Enrolling",
      color: "from-blue-500 to-cyan-600",
    },
    {
      value: "upcoming",
      label: "Upcoming",
      color: "from-purple-500 to-pink-600",
    },
    { value: "full", label: "Full", color: "from-red-500 to-orange-600" },
    {
      value: "completed",
      label: "Completed",
      color: "from-gray-600 to-gray-800",
    },
  ];

  // ... rest of the component remains the same
  // Filter formations client-side for better UX
  const filteredFormations = formations.filter((formation) => {
    const matchesSearch =
      !searchQuery ||
      formation.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (Array.isArray(formation.tags) &&
        formation.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCategory =
      selectedCategory === "all" ||
      formation.category?.toLowerCase().replace(/ /g, "-") === selectedCategory;

    const matchesLevel =
      selectedLevel === "all" ||
      formation.level?.toLowerCase() === selectedLevel;

    const matchesStatus =
      selectedStatus === "all" ||
      formation.status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  // Sort formations
  const sortedFormations = [...filteredFormations].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (
          (b.views_count || b.reviews_count || b.current_participants || 0) -
          (a.views_count || a.reviews_count || a.current_participants || 0)
        );
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "recent":
        return (
          new Date(b.created_at || b.start_date || 0) -
          new Date(a.created_at || a.start_date || 0)
        );
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleFavorite = (formationId) => {
    setFavorites((prev) =>
      prev.includes(formationId)
        ? prev.filter((id) => id !== formationId)
        : [...prev, formationId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFormation) {
      alert("No formation selected");
      return;
    }

    if (!formData.terms_accepted) {
      alert("You must accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare registration data for API - MATCHING BACKEND EXPECTATIONS
      const registrationData = {
        formation_id: selectedFormation.id,
        full_name: formData.full_name || formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role || "student",
        current_role: formData.current_role || formData.job_title || "",
        message: formData.motivation || formData.message || "",
        terms_accepted: formData.terms_accepted || formData.terms,
      };

      // Remove empty fields
      Object.keys(registrationData).forEach((key) => {
        if (
          registrationData[key] === "" ||
          registrationData[key] === null ||
          registrationData[key] === undefined
        ) {
          delete registrationData[key];
        }
      });

      console.log("Sending registration data:", registrationData);

      const response = await registrationService.create(registrationData);

      if (response.success) {
        setRegistrationSuccess(true);

        // Reset form
        setFormData({
          formation_id: "",
          full_name: "",
          email: "",
          phone: "",
          role: "",
          current_role: "",
          motivation: "",
          experience_level: "beginner",
          terms_accepted: false,
        });

        // Refresh formations to update participant count
        fetchFormations();

        // Show success message for 3 seconds
        setTimeout(() => {
          setShowRegistrationModal(false);
          setRegistrationSuccess(false);
        }, 3000);
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error submitting registration:", err);
      console.error("Error details:", err.response?.data);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedStatus("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const handleQuickView = (formation) => {
    setSelectedFormation(formation);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedFormation.title,
          text: `Check out this amazing formation: ${selectedFormation.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Handle formation selection for detail view
  const handleSelectFormation = async (formation) => {
    try {
      // Fetch full formation details
      const response = await formationService.getById(formation.id);
      if (response.success) {
        // Transform the API data
        const formationData = {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          short_description: response.data.short_description,
          full_description: response.data.full_description,
          cover_image: response.data.cover_image,
          category: response.data.category,
          level: response.data.level,
          duration_hours: response.data.duration_hours,
          weeks_duration: response.data.weeks_duration,
          hours_per_week: response.data.hours_per_week,
          max_participants: response.data.max_participants,
          current_participants: response.data.current_participants,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          schedule: response.data.schedule,
          format: response.data.format || "Online",
          location: response.data.location || "Online",
          live_sessions: response.data.live_sessions,
          status: response.data.status,
          featured: response.data.featured || false,
          instructor_name: response.data.instructor_name,
          instructor_title: response.data.instructor_title,
          instructor_bio: response.data.instructor_bio,
          instructor_photo: response.data.instructor_photo,
          instructor_rating: response.data.instructor_rating,
          instructor_reviews: response.data.instructor_reviews,
          instructor_students: response.data.instructor_students,
          instructor_verified: response.data.instructor_verified,
          rating: response.data.rating,
          reviews_count: response.data.reviews_count,
          views_count: response.data.views_count,
          spots_left:
            response.data.spots_left ||
            response.data.max_participants - response.data.current_participants,
          // Handle array/JSON fields
          program:
            typeof response.data.program === "string"
              ? JSON.parse(response.data.program)
              : response.data.program || [],
          modules:
            typeof response.data.modules === "string"
              ? JSON.parse(response.data.modules)
              : response.data.modules || [],
          testimonials:
            typeof response.data.testimonials === "string"
              ? JSON.parse(response.data.testimonials)
              : response.data.testimonials || [],
          features: Array.isArray(response.data.features)
            ? response.data.features
            : [],
          highlights: Array.isArray(response.data.highlights)
            ? response.data.highlights
            : [],
          learning_objectives: Array.isArray(response.data.learning_objectives)
            ? response.data.learning_objectives
            : [],
          tags: Array.isArray(response.data.tags) ? response.data.tags : [],
          prerequisites: response.data.prerequisites || "",
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        };

        setSelectedFormation(formationData);
      } else {
        setSelectedFormation(formation);
      }
    } catch (err) {
      console.error("Error fetching formation details:", err);
      setSelectedFormation(formation);
    }
  };

  // ... rest of the component (return statement) remains exactly the same
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
          isLoading={isSubmitting}
          registrationSuccess={registrationSuccess}
          onSuccessClose={() => {
            setShowRegistrationModal(false);
            setRegistrationSuccess(false);
          }}
        />
      </>
    );
  }

  // Show loading state on initial load
  if (isLoading && formations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading formations...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && formations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 rounded-xl bg-red-900/20 border border-red-700/30 max-w-md">
          <div className="text-5xl text-red-500 mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchFormations}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main Formations List View
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <FormationsHero isVisible={isVisible} totalFormations={totalFormations} />

      <FormationsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        levels={levels}
        statuses={statuses}
        filteredFormations={filteredFormations}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center p-8 rounded-xl bg-red-900/20 border border-red-700/30 max-w-md">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchFormations}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <FormationsGrid
          filteredFormations={sortedFormations}
          isVisible={isVisible}
          setSelectedFormation={handleSelectFormation}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onQuickView={handleQuickView}
          viewMode={viewMode}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onViewModeChange={setViewMode}
          isLoading={isLoading}
          totalFormations={totalFormations}
          totalFiltered={filteredFormations.length}
        />
      )}

      {/* Display message when no formations found */}
      {!isLoading && !error && filteredFormations.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            No formations found
          </h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Formations;
