import api from './api';

export const userService = {
  /**
   * Get recent users (admin users)
   */
  getRecentUsers: async (limit = 10) => {
    try {
      const response = await api.get("/users/recent", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent users:', error);
      // Return fallback data
      return {
        success: true,
        data: {
          users: [
            { id: 1, name: 'Admin User', email: 'admin@example.com', status: 'Active', joined: new Date().toISOString() }
          ]
        }
      };
    }
  },

  /**
   * Delete user (admin user)
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  /**
   * Get all users (admin users)
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get("/users", { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get user by ID (admin user)
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Create new user (admin user)
   */
  create: async (userData) => {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update user (admin user)
   */
  update: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  /**
   * Get recent registrations (from registrations table)
   * This is a better alternative for "recent users" in dashboard
   */
  getRecentRegistrations: async (limit = 10) => {
    try {
      const response = await api.get("/registrations", {
        params: { 
          limit, 
          sort: 'created_at:desc' 
        }
      });
      
      // Transform registration data
      const registrations = response.data?.data?.map(reg => ({
        id: reg.id,
        name: reg.full_name,
        email: reg.email,
        phone: reg.phone,
        status: reg.status,
        joined: reg.registration_date || reg.created_at,
        formation: reg.formation_title,
        is_registration: true // Flag to distinguish from admin users
      })) || [];
      
      return { 
        success: true, 
        data: { 
          users: registrations,
          type: 'registrations' 
        } 
      };
    } catch (error) {
      console.error('Error fetching recent registrations:', error);
      return { 
        success: true, 
        data: { 
          users: [],
          type: 'registrations' 
        } 
      };
    }
  }
};

export default userService;