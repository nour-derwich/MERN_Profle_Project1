import api from "./api";

const formationService = {
  /**
   * Get all formations with optional filters
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get("/formations", {
        params: {
          ...filters,
          admin: filters.admin || true, // Always request admin view
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching formations:", error);
      throw error;
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
      throw error;
    }
  },

  /**
   * Create new formation (admin only)
   */
  create: async (formationData) => {
    try {
      // Format the data properly
      const formattedData = {
        ...formationData,
        price: parseFloat(formationData.price) || 0,
        original_price: formationData.original_price
          ? parseFloat(formationData.original_price)
          : null,
        installment_price: formationData.installment_price
          ? parseFloat(formationData.installment_price)
          : null,
        duration_hours: parseInt(formationData.duration_hours) || 0,
        max_participants: parseInt(formationData.max_participants) || 0,
        current_participants: parseInt(formationData.current_participants) || 0,
        // Ensure arrays are properly formatted
        learning_objectives: Array.isArray(formationData.learning_objectives)
          ? formationData.learning_objectives
          : (formationData.learning_objectives || "")
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item),
        features: Array.isArray(formationData.features)
          ? formationData.features
          : (formationData.features || "")
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item),
        highlights: Array.isArray(formationData.highlights)
          ? formationData.highlights
          : (formationData.highlights || "")
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item),
        tags: Array.isArray(formationData.tags)
          ? formationData.tags
          : (formationData.tags || "")
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item),
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
      // Format the data properly
      const formattedData = {
        ...formationData,
        price:
          formationData.price !== undefined
            ? parseFloat(formationData.price)
            : undefined,
        original_price:
          formationData.original_price !== undefined
            ? formationData.original_price
              ? parseFloat(formationData.original_price)
              : null
            : undefined,
        installment_price:
          formationData.installment_price !== undefined
            ? formationData.installment_price
              ? parseFloat(formationData.installment_price)
              : null
            : undefined,
        duration_hours:
          formationData.duration_hours !== undefined
            ? parseInt(formationData.duration_hours)
            : undefined,
        max_participants:
          formationData.max_participants !== undefined
            ? parseInt(formationData.max_participants)
            : undefined,
        current_participants:
          formationData.current_participants !== undefined
            ? parseInt(formationData.current_participants)
            : undefined,
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
   * Get formation statistics (admin only)
   */
  getStats: async () => {
    try {
      const response = await api.get("/formations/stats/overview");
      return response.data;
    } catch (error) {
      console.error("Error fetching formation stats:", error);
      // Return fallback stats
      return {
        success: false,
        data: {
          total_formations: 0,
          published_formations: 0,
          draft_formations: 0,
          featured_formations: 0,
          total_participants: 0,
          total_capacity: 0,
          average_price: 0,
          total_views: 0,
        },
      };
    }
  },

  /**
   * Upload formation image (admin only)
   */
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post("/formations/upload-image", formData, {
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
      throw error;
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
      throw error;
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
      // Return fallback categories
      return {
        success: false,
        data: [
          { category: "Machine Learning", count: 0 },
          { category: "Deep Learning", count: 0 },
          { category: "Data Science", count: 0 },
          { category: "AI Engineering", count: 0 },
          { category: "Web Development", count: 0 },
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
      // Return fallback levels
      return {
        success: false,
        data: [
          { level: "beginner", count: 0 },
          { level: "intermediate", count: 0 },
          { level: "advanced", count: 0 },
          { level: "expert", count: 0 },
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
      // Return fallback statuses
      return {
        success: false,
        data: [
          { status: "draft", count: 0 },
          { status: "published", count: 0 },
          { status: "enrolling", count: 0 },
          { status: "full", count: 0 },
          { status: "completed", count: 0 },
          { status: "archived", count: 0 },
        ],
      };
    }
  },

  /**
   * Update formation participants
   */
  updateParticipants: async (id, count) => {
    try {
      const response = await api.put(`/formations/${id}/participants`, {
        count,
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
        featured,
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
      const response = await api.patch(`/formations/${id}/status`, { status });
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
      throw error;
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
      throw error;
    }
  },

  /**
   * Get formation analytics
   */
  getAnalytics: async (id, period = "month") => {
    try {
      const response = await api.get(`/formations/${id}/analytics`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching analytics for formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Duplicate formation
   */
  duplicate: async (id) => {
    try {
      const response = await api.post(`/formations/${id}/duplicate`);
      return response.data;
    } catch (error) {
      console.error(`Error duplicating formation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Export formations to CSV
   */
  exportToCSV: async (filters = {}) => {
    try {
      const response = await api.get("/formations/export", {
        params: filters,
        responseType: "blob", // Important for file download
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
      const response = await api.post("/formations/bulk-delete", { ids });
      return response.data;
    } catch (error) {
      console.error("Error bulk deleting formations:", error);
      throw error;
    }
  },
};

export { formationService };
export default formationService;
