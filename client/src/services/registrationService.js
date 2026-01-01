import api from "./api";

export const registrationService = {
  /**
   * Create new registration
   */
  create: async (registrationData) => {
    const response = await api.post("/registrations", registrationData);
    return response.data;
  },

  /**
   * Get all registrations (admin only)
   */
  getAll: async (filters = {}) => {
    const response = await api.get("/registrations", { params: filters });
    return response.data;
  },

  /**
   * Get registration statistics (admin only)
   */
  getStats: async () => {
    const response = await api.get("/registrations/stats");
    return response.data;
  },

  /**
   * Get registrations by formation (admin only)
   */
  getByFormation: async (formationId) => {
    const response = await api.get(`/registrations/formation/${formationId}`);
    return response.data;
  },

  /**
   * Export registrations to CSV (admin only)
   */
  exportToCSV: async () => {
    const response = await api.get("/registrations/export", {
      responseType: "blob",
    });
    return response.data;
  },

  /**
   * Get single registration by ID (admin only)
   */
  getById: async (id) => {
    const response = await api.get(`/registrations/${id}`);
    return response.data;
  },

  /**
   * Update registration status (admin only)
   */
  updateStatus: async (id, status) => {
    const response = await api.patch(`/registrations/${id}/status`, { status });
    return response.data;
  },

  /**
   * Update payment status (admin only)
   */
  updatePaymentStatus: async (id, paymentStatus) => {
    const response = await api.patch(`/registrations/${id}/payment`, {
      payment_status: paymentStatus,
    });
    return response.data;
  },

  /**
   * Confirm registration (admin only)
   */
  confirm: async (id) => {
    const response = await api.post(`/registrations/${id}/confirm`);
    return response.data;
  },

  /**
   * Send reminder email (admin only)
   */
  sendReminder: async (id) => {
    const response = await api.post(`/registrations/${id}/send-reminder`);
    return response.data;
  },

  /**
   * Update registration details (admin only)
   */
  update: async (id, registrationData) => {
    const response = await api.put(`/registrations/${id}`, registrationData);
    return response.data;
  },

  /**
   * Delete registration (admin only)
   */
  delete: async (id) => {
    const response = await api.delete(`/registrations/${id}`);
    return response.data;
  },

  /**
   * Bulk actions on registrations (admin only)
   */
  bulkAction: async (action, registrationIds) => {
    const response = await api.post("/registrations/bulk-action", {
      action,
      registration_ids: registrationIds,
    });
    return response.data;
  },

  /**
   * Cancel registration (public)
   */
  cancel: async (id, email) => {
    const response = await api.post(`/registrations/${id}/cancel`, { email });
    return response.data;
  },

  /**
   * Verify registration email
   */
  verifyEmail: async (token) => {
    const response = await api.get(`/registrations/verify/${token}`);
    return response.data;
  },
};

export default registrationService;
