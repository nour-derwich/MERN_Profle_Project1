import api from './api';

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
  getTrafficAnalytics: async (period = "30") => {
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
      event_type: "page_view",
      page_url: page,
      referrer,
      metadata: { timestamp: new Date().toISOString() },
    });
  },

  /**
   * Track button click
   */
  trackButtonClick: async (buttonId, page, metadata = {}) => {
    return await analyticsService.trackEvent({
      event_type: "click",
      entity_type: "button",
      entity_id: buttonId,
      page_url: page,
      metadata: { ...metadata, timestamp: new Date().toISOString() },
    });
  },

  /**
   * Track form submission
   */
  trackFormSubmission: async (formId, page, metadata = {}) => {
    return await analyticsService.trackEvent({
      event_type: "form_submission",
      entity_type: "form",
      entity_id: formId,
      page_url: page,
      metadata: { ...metadata, timestamp: new Date().toISOString() },
    });
  },

  /**
   * Track download
   */
  trackDownload: async (fileId, fileName, page) => {
    return await analyticsService.trackEvent({
      event_type: "download",
      entity_type: "file",
      entity_id: fileId,
      page_url: page,
      metadata: { file_name: fileName, timestamp: new Date().toISOString() },
    });
  },
};

export default analyticsService;