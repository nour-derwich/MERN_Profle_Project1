import api from "./api";

export const userService = {
  /**
   * Get recent users
   */
  getRecentUsers: async (limit = 10) => {
    const response = await api.get("/users/recent", {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  /**
   * Get all users
   */
  getAll: async (filters = {}) => {
    const response = await api.get("/users", { params: filters });
    return response.data;
  },

  /**
   * Get user by ID
   */
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  create: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  /**
   * Update user
   */
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
};

export default userService;
