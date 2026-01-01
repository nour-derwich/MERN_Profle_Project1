import api from "./api";

export const messageService = {
  /**
   * Send contact message (public)
   */
  send: async (messageData) => {
    const response = await api.post("/messages", messageData);
    return response.data;
  },

  /**
   * Get all messages (admin only)
   */
  getAll: async (filters = {}) => {
    const response = await api.get("/messages", { params: filters });
    return response.data;
  },

  /**
   * Get single message by ID (admin only)
   */
  getById: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  },

  /**
   * Update message status (admin only)
   */
  updateStatus: async (id, status) => {
    const response = await api.patch(`/messages/${id}/status`, { status });
    return response.data;
  },

  /**
   * Reply to message (admin only)
   */
  reply: async (id, replyData) => {
    const response = await api.post(`/messages/${id}/reply`, replyData);
    return response.data;
  },

  /**
   * Delete message (admin only)
   */
  delete: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },

  /**
   * Get message statistics (admin only)
   */
  getStats: async () => {
    const response = await api.get("/messages/stats");
    return response.data;
  },
};

export default messageService;
