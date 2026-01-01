import api from "./api";

export const analyticsService = {
  /**
   * Track user events (public)
   */
  trackEvent: async (eventData) => {
    const response = await api.post("/analytics/track", eventData);
    return response.data;
  },

  /**
   * Get overview analytics (admin only)
   */
  getOverview: async () => {
    const response = await api.get("/analytics/overview");
    return response.data;
  },

  /**
   * Get formation analytics (admin only)
   */
  getFormationAnalytics: async () => {
    const response = await api.get("/analytics/formations");
    return response.data;
  },

  /**
   * Get traffic analytics (admin only)
   */
  getTrafficAnalytics: async (period = "30d") => {
    const response = await api.get("/analytics/traffic", {
      params: { period },
    });
    return response.data;
  },

  /**
   * Get conversion analytics (admin only)
   */
  getConversionAnalytics: async () => {
    const response = await api.get("/analytics/conversions");
    return response.data;
  },

  /**
   * Get monthly analytics (admin only)
   */
  getMonthlyAnalytics: async (year = new Date().getFullYear()) => {
    const response = await api.get("/analytics/monthly", {
      params: { year },
    });
    return response.data;
  },

  /**
   * Track page view
   */
  trackPageView: async (page, referrer = null) => {
    return await analyticsService.trackEvent({
      type: "page_view",
      page,
      referrer,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Track button click
   */
  trackButtonClick: async (buttonId, page, metadata = {}) => {
    return await analyticsService.trackEvent({
      type: "button_click",
      button_id: buttonId,
      page,
      metadata,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Track form submission
   */
  trackFormSubmission: async (formId, page, metadata = {}) => {
    return await analyticsService.trackEvent({
      type: "form_submission",
      form_id: formId,
      page,
      metadata,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Track download
   */
  trackDownload: async (fileId, fileName, page) => {
    return await analyticsService.trackEvent({
      type: "download",
      file_id: fileId,
      file_name: fileName,
      page,
      timestamp: new Date().toISOString(),
    });
  },
};

export default analyticsService;
