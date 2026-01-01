import api from "./api";

export const courseService = {
  /**
   * Get all courses
   */
  getAll: async (filters = {}) => {
    const response = await api.get("/courses", { params: filters });
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
    const response = await api.get("/courses/categories");
    return response.data;
  },

  /**
   * Search courses
   */
  search: async (query, filters = {}) => {
    const response = await api.get("/courses/search", {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  /**
   * Get single course by ID
   */
 
  getById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  /**
   * Create new course (admin only)
   */
  create: async (courseData) => {
    const response = await api.post("/courses", courseData);
    return response.data;
  },
  /**
   * Update course (admin only)
   */


  update: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },
  /**
   * Delete course (admin only)
   */

  delete: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/courses/${id}/featured`);
    return response.data;
  },

  trackClick: async (id) => {
    const response = await api.post(`/courses/${id}/click`);
    return response.data;
  },
  /**
   * Track Amazon link click
   */
  trackClick: async (id) => {
    const response = await api.post(`/courses/${id}/click`);
    return response.data;
  },

  /**
   * Get course statistics (admin only)
   */
  getStats: async () => {
    const response = await api.get("/courses/admin/stats");
    return response.data;
  },
};

export default courseService;
