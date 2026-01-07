import api from "./api";

export const courseService = {
  /**
   * Get all courses with filters and pagination
   */
  getAll: async (filters = {}) => {
    // Clean up filters - remove 'all' values
    const cleanFilters = { ...filters };
    Object.keys(cleanFilters).forEach((key) => {
      if (
        cleanFilters[key] === "all" ||
        cleanFilters[key] === "" ||
        cleanFilters[key] === null
      ) {
        delete cleanFilters[key];
      }
    });

    const response = await api.get("/courses", { params: cleanFilters });
    return response.data;
  },

  /**
   * Get featured courses
   */
  getFeatured: async () => {
    const response = await api.get("/courses/featured");
    return response.data;
  },

  /**
   * Get course categories
   */
  getCategories: async () => {
    try {
      const response = await api.get("/courses/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Return empty array as fallback
      return { success: false, data: [] };
    }
  },

  /**
   * Search courses
   */
  search: async (query, filters = {}) => {
    const params = { q: query, ...filters };

    // Clean up filters
    Object.keys(params).forEach((key) => {
      if (params[key] === "all" || params[key] === "" || params[key] === null) {
        delete params[key];
      }
    });

    const response = await api.get("/courses/search", { params });
    return response.data;
  },

  /**
   * Get single course by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new course (admin only)
   */
  create: async (courseData) => {
    try {
      // Format data for backend
      const formattedData = {
        ...courseData,
        // Ensure numeric fields are properly formatted
        price: parseFloat(courseData.price) || 0,
        original_price: courseData.original_price
          ? parseFloat(courseData.original_price)
          : null,
        rating: courseData.rating ? parseFloat(courseData.rating) : 0,
        reviews: parseInt(courseData.reviews) || 0,
        reviews_count: parseInt(courseData.reviews) || 0,
        pages: parseInt(courseData.pages) || null,
        year: parseInt(courseData.year) || new Date().getFullYear(),
        publication_year: parseInt(courseData.year) || new Date().getFullYear(),
        // Ensure arrays are properly formatted
        tags: Array.isArray(courseData.tags) ? courseData.tags : [],
        why_recommend: Array.isArray(courseData.why_recommend)
          ? courseData.why_recommend
          : [],
      };

      const response = await api.post("/courses", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  /**
   * Update course (admin only)
   */
  update: async (id, courseData) => {
    try {
      // Format data for backend
      const formattedData = {
        ...courseData,
        // Ensure numeric fields are properly formatted
        price:
          courseData.price !== undefined
            ? parseFloat(courseData.price)
            : undefined,
        original_price:
          courseData.original_price !== undefined
            ? parseFloat(courseData.original_price)
            : undefined,
        rating:
          courseData.rating !== undefined
            ? parseFloat(courseData.rating)
            : undefined,
        reviews:
          courseData.reviews !== undefined
            ? parseInt(courseData.reviews)
            : undefined,
        pages:
          courseData.pages !== undefined
            ? parseInt(courseData.pages)
            : undefined,
        year:
          courseData.year !== undefined ? parseInt(courseData.year) : undefined,
        // Ensure arrays are properly formatted
        tags:
          courseData.tags !== undefined
            ? Array.isArray(courseData.tags)
              ? courseData.tags
              : []
            : undefined,
        why_recommend:
          courseData.why_recommend !== undefined
            ? Array.isArray(courseData.why_recommend)
              ? courseData.why_recommend
              : []
            : undefined,
      };

      const response = await api.put(`/courses/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete course (admin only)
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course ${id}:`, error);
      throw error;
    }
  },

  /**
   * Toggle featured status (admin only)
   */
  toggleFeatured: async (id) => {
    try {
      const response = await api.put(`/courses/${id}/toggle-featured`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling featured status for course ${id}:`, error);
      throw error;
    }
  },

  /**
   * Track Amazon link click
   */
  trackClick: async (id) => {
    try {
      const response = await api.post(`/courses/${id}/click`);
      return response.data;
    } catch (error) {
      console.error(`Error tracking click for course ${id}:`, error);
      // Don't throw error for tracking - it shouldn't break the user experience
      return { success: false, message: "Click tracking failed" };
    }
  },

  /**
   * Get course statistics (admin only)
   */
  getStats: async () => {
    try {
      const response = await api.get("/courses/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching course stats:", error);
      // Return empty stats as fallback
      return {
        success: false,
        data: {
          total: 0,
          featured: 0,
          bestsellers: 0,
          total_clicks: 0,
          categories: 0,
          avg_price: 0,
          avg_rating: 0,
        },
      };
    }
  },

  /**
   * Get levels
   */
  getLevels: async () => {
    try {
      const response = await api.get("/courses/levels");
      return response.data;
    } catch (error) {
      console.error("Error fetching levels:", error);
      // Return default levels as fallback
      return {
        success: false,
        data: ["beginner", "intermediate", "advanced", "expert"],
      };
    }
  },

  /**
   * Get recommendations
   */
  getRecommendations: async (limit = 3) => {
    try {
      const response = await api.get("/courses/recommendations", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Return empty array as fallback
      return { success: false, data: [] };
    }
  },

  /**
   * Get courses by category
   */
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/courses/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching courses for category ${category}:`, error);
      throw error;
    }
  },

  /**
   * Bulk create courses (admin only - for seeding)
   */
  bulkCreate: async (coursesData) => {
    try {
      const response = await api.post("/courses/bulk", {
        courses: coursesData,
      });
      return response.data;
    } catch (error) {
      console.error("Error bulk creating courses:", error);
      throw error;
    }
  },

  /**
   * Validate course data before submission
   */
  validateCourse: (courseData) => {
    const errors = {};

    if (!courseData.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!courseData.author?.trim()) {
      errors.author = "Author is required";
    }

    if (!courseData.category?.trim()) {
      errors.category = "Category is required";
    }

    if (!courseData.description?.trim()) {
      errors.description = "Description is required";
    }

    if (
      courseData.price === undefined ||
      courseData.price === null ||
      courseData.price < 0
    ) {
      errors.price = "Valid price is required";
    }

    if (courseData.rating && (courseData.rating < 0 || courseData.rating > 5)) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (courseData.reviews && courseData.reviews < 0) {
      errors.reviews = "Reviews count cannot be negative";
    }

    if (!courseData.amazon_link?.trim()) {
      errors.amazon_link = "Amazon link is required";
    } else if (!courseData.amazon_link.startsWith("http")) {
      errors.amazon_link = "Please enter a valid URL";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Format course for display
   */
  formatForDisplay: (course) => {
    return {
      id: course.id,
      title: course.title,
      author: course.author,
      category: course.category,
      level: course.level,
      price: parseFloat(course.price) || 0,
      originalPrice: course.original_price
        ? parseFloat(course.original_price)
        : null,
      rating: parseFloat(course.rating) || 0,
      reviews: course.reviews || course.reviews_count || 0,
      image: course.cover_image,
      amazonLink: course.amazon_link,
      description: course.description,
      short_description: course.short_description,
      featured: course.featured || false,
      bestseller: course.bestseller || false,
      tags: course.tags || [],
      pages: course.pages,
      year: course.year || course.publication_year,
      priority: course.priority || "Recommended",
      personal_insight: course.personal_insight,
      time_to_read: course.time_to_read || "2-3 weeks",
      why_recommend: course.why_recommend || [],
      publisher: course.publisher,
      language: course.language || "English",
      isbn: course.isbn,
      clicks_count: course.clicks_count || 0,
      created_at: course.created_at,
      updated_at: course.updated_at,
    };
  },
};

export default courseService;
