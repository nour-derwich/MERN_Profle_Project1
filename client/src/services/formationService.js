import api from "./api";

export const formationService = {
  /**
   * Get all formations
   */
  getAll: async (filters = {}) => {
    const response = await api.get("/formations", { params: filters });
    return response.data;
  },

  /**
   * Get single formation by ID
   */
  getById: async (id) => {
    const response = await api.get(`/formations/${id}`);
    return response.data;
  },

  /**
   * Create new formation (admin only)
   */
  create: async (formationData) => {
    const response = await api.post("/formations", formationData);
    return response.data;
  },

  /**
   * Update formation (admin only)
   */
  update: async (id, formationData) => {
    const response = await api.put(`/formations/${id}`, formationData);
    return response.data;
  },

  /**
   * Delete formation (admin only)
   */
  delete: async (id) => {
    const response = await api.delete(`/formations/${id}`);
    return response.data;
  },

  /**
   * Get formation statistics (admin only)
   */
  getStats: async () => {
    const response = await api.get("/formations/stats/overview");
    return response.data;
  },

  /**
   * Upload formation image (admin only)
   */
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post("/formations/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Get featured formations
   */
  getFeatured: async () => {
    const response = await api.get("/formations/featured");
    return response.data;
  },

  /**
   * Search formations
   */
  search: async (query, filters = {}) => {
    const response = await api.get("/formations/search", {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  /**
   * Get formation categories
   */
  getCategories: async () => {
    const response = await api.get("/formations/categories");
    return response.data;
  },
};

export default formationService;
