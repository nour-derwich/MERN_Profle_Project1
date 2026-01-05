import api from "./api";

const formationService = {
  /**
   * Get all formations with optional filters
   */
  getAll: async (filters = {}) => {
    try {
      // Don't force admin view for public pages
      const params = { ...filters };

      // Remove undefined filters
      Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === "") {
          delete params[key];
        }
      });

      const response = await api.get("/formations", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching formations:", error);
      // Return fallback structure for offline/dev mode
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch formations",
        data: [],
        count: 0,
      };
    }
  },

  /**
   * Get single formation by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/formations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching formation ${id}:`, error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch formation",
        data: null,
      };
    }
  },

  /**
   * Create new formation (admin only)
   */
  create: async (formationData) => {
    try {
      // Ensure proper data formatting for arrays/JSON
      const formattedData = {
        ...formationData,
        duration_hours: formationData.duration_hours
          ? parseInt(formationData.duration_hours)
          : null,
        max_participants: formationData.max_participants
          ? parseInt(formationData.max_participants)
          : 20, // Default
        current_participants: 0,
        // Handle array fields
        learning_objectives: Array.isArray(formationData.learning_objectives)
          ? formationData.learning_objectives
          : (formationData.learning_objectives || "")
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item),
        features: Array.isArray(formationData.features)
          ? formationData.features
          : (formationData.features || "")
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item),
        highlights: Array.isArray(formationData.highlights)
          ? formationData.highlights
          : (formationData.highlights || "")
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item),
        tags: Array.isArray(formationData.tags)
          ? formationData.tags
          : (formationData.tags || "")
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item),
        // Handle JSON fields
        program: formationData.program || [],
        modules: formationData.modules || [],
        testimonials: formationData.testimonials || [],
      };

      const response = await api.post("/formations", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating formation:", error);
      throw error;
    }
  },

  /**
   * Update formation (admin only)
   */
  update: async (id, formationData) => {
    try {
      const formattedData = {
        ...formationData,
        ...(formationData.duration_hours !== undefined && {
          duration_hours: parseInt(formationData.duration_hours),
        }),
        ...(formationData.max_participants !== undefined && {
          max_participants: parseInt(formationData.max_participants),
        }),
        ...(formationData.current_participants !== undefined && {
          current_participants: parseInt(formationData.current_participants),
        }),
      };

      const response = await api.put(`/formations/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete formation (admin only)
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/formations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get formation statistics
   */
  getStats: async () => {
    try {
      const response = await api.get("/formations/stats/overview");
      return response.data;
    } catch (error) {
      console.error("Error fetching formation stats:", error);
      return {
        success: true,
        data: {
          total_formations: 0,
          published_formations: 0,
          draft_formations: 0,
          featured_formations: 0,
          total_participants: 0,
          total_capacity: 0,
          total_views: 0,
        },
      };
    }
  },

  /**
   * Upload formation image
   */
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  /**
   * Get featured formations
   */
  getFeatured: async () => {
    try {
      const response = await api.get("/formations", {
        params: {
          featured: true,
          status: "published",
          limit: 6,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching featured formations:", error);
      return {
        success: true,
        data: [],
        count: 0,
      };
    }
  },

  /**
   * Search formations
   */
  search: async (query, filters = {}) => {
    try {
      const response = await api.get("/formations", {
        params: {
          searchQuery: query,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching formations:", error);
      return {
        success: false,
        message: "Search failed",
        data: [],
      };
    }
  },

  /**
   * Get formation categories
   */
  getCategories: async () => {
    try {
      const response = await api.get("/formations/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: true,
        data: [
          { category: "Web Development", count: 0 },
          { category: "Data Science", count: 0 },
          { category: "UI/UX Design", count: 0 },
          { category: "Business", count: 0 },
          { category: "Machine Learning", count: 0 },
        ],
      };
    }
  },

  /**
   * Get formation levels
   */
  getLevels: async () => {
    try {
      const response = await api.get("/formations/levels");
      return response.data;
    } catch (error) {
      console.error("Error fetching levels:", error);
      return {
        success: true,
        data: [
          { level: "beginner", count: 0 },
          { level: "intermediate", count: 0 },
          { level: "advanced", count: 0 },
        ],
      };
    }
  },

  /**
   * Get formation statuses
   */
  getStatuses: async () => {
    try {
      const response = await api.get("/formations/statuses");
      return response.data;
    } catch (error) {
      console.error("Error fetching statuses:", error);
      return {
        success: true,
        data: [
          { status: "draft", count: 0 },
          { status: "published", count: 0 },
          { status: "enrolling", count: 0 },
          { status: "full", count: 0 },
          { status: "completed", count: 0 },
        ],
      };
    }
  },

  /**
   * Update formation participants
   */
  updateParticipants: async (id, count) => {
    try {
      const response = await api.patch(`/formations/${id}/participants`, {
        count: parseInt(count),
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating participants for formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Toggle formation featured status
   */
  toggleFeatured: async (id, featured) => {
    try {
      const response = await api.patch(`/formations/${id}/featured`, {
        featured: !!featured,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error toggling featured status for formation ${id}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Change formation status
   */
  changeStatus: async (id, status) => {
    try {
      const response = await api.patch(`/formations/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error(`Error changing status for formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get formation enrollments
   */
  getEnrollments: async (id) => {
    try {
      const response = await api.get(`/formations/${id}/enrollments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollments for formation ${id}:`, error);
      return {
        success: true,
        data: [],
      };
    }
  },

  /**
   * Get formation reviews
   */
  getReviews: async (id) => {
    try {
      const response = await api.get(`/formations/${id}/reviews`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for formation ${id}:`, error);
      return {
        success: true,
        data: [],
      };
    }
  },

  /**
   * Export formations to CSV
   */
  exportToCSV: async (filters = {}) => {
    try {
      const response = await api.get("/formations/export", {
        params: filters,
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting formations:", error);
      throw error;
    }
  },

  /**
   * Bulk update formations
   */
  bulkUpdate: async (ids, updates) => {
    try {
      const response = await api.patch("/formations/bulk-update", {
        ids,
        updates,
      });
      return response.data;
    } catch (error) {
      console.error("Error bulk updating formations:", error);
      throw error;
    }
  },

  /**
   * Bulk delete formations
   */
  bulkDelete: async (ids) => {
    try {
      const response = await api.delete("/formations/bulk-delete", {
        data: { ids },
      });
      return response.data;
    } catch (error) {
      console.error("Error bulk deleting formations:", error);
      throw error;
    }
  },

  /**
   * Get formation by slug (optional)
   */
  getBySlug: async (slug) => {
    try {
      const response = await api.get(`/formations/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching formation by slug ${slug}:`, error);
      return {
        success: false,
        message: "Formation not found",
        data: null,
      };
    }
  },

  /**
   * Increment formation views
   */
  incrementViews: async (id) => {
    try {
      const response = await api.post(`/formations/${id}/views`);
      return response.data;
    } catch (error) {
      console.error(`Error incrementing views for formation ${id}:`, error);
      // Don't throw error for this - it's not critical
    }
  },
};

export { formationService };
export default formationService;
