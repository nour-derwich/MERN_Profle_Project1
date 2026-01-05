import api from "./api";

class MessageService {
  /**
   * Send contact message (public)
   * @param {Object} messageData - Message data
   * @param {string} messageData.full_name - Sender's full name
   * @param {string} messageData.email - Sender's email
   * @param {string} messageData.subject - Message subject
   * @param {string} messageData.message - Message content
   * @param {string} [messageData.message_type='contact'] - Message type: 'contact' or 'project'
   * @param {string} [messageData.project_type] - Project type (for project inquiries)
   * @param {string} [messageData.timeline] - Project timeline (for project inquiries)
   * @param {string} [messageData.budget_range] - Budget range (for project inquiries)
   * @param {string} [messageData.phone] - Phone number
   * @param {string} [messageData.company] - Company name
   * @param {string} [messageData.website] - Website URL
   * @returns {Promise<Object>} Response data
   */
  async send(messageData) {
    try {
      // Set default message type if not provided
      const data = {
        message_type: "contact",
        ...messageData,
      };

      const response = await api.post("/messages", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to send message",
        details: error.response?.data,
      };
    }
  }

  /**
   * Send project inquiry (convenience method)
   * @param {Object} projectData - Project inquiry data
   */
  async sendProjectInquiry(projectData) {
    return this.send({
      ...projectData,
      message_type: "project",
      subject:
        projectData.subject ||
        `Project Inquiry: ${projectData.project_type || "New Project"}`,
    });
  }

  /**
   * Get all messages with filtering (admin only)
   * @param {Object} filters - Filter parameters
   * @param {string} [filters.status] - Filter by status: 'unread', 'read', 'replied', 'archived'
   * @param {string} [filters.message_type] - Filter by type: 'contact' or 'project'
   * @param {string} [filters.search] - Search in name, email, subject, or message
   * @param {string} [filters.startDate] - Start date (YYYY-MM-DD)
   * @param {string} [filters.endDate] - End date (YYYY-MM-DD)
   * @param {number} [filters.limit=50] - Number of results per page
   * @param {number} [filters.offset=0] - Pagination offset
   * @returns {Promise<Object>} Response data
   */
  async getAll(filters = {}) {
    try {
      const response = await api.get("/messages", { params: filters });
      return {
        success: true,
        ...response.data,
      };
    } catch (error) {
      console.error("Error fetching messages:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch messages",
        data: [],
        count: 0,
        total: 0,
      };
    }
  }

  /**
   * Get messages by type (admin only)
   * @param {string} type - Message type: 'contact' or 'project'
   * @param {Object} additionalFilters - Additional filters
   */
  async getByType(type, additionalFilters = {}) {
    return this.getAll({
      message_type: type,
      ...additionalFilters,
    });
  }

  /**
   * Get project inquiries (admin only)
   * @param {Object} filters - Additional filters
   */
  async getProjectInquiries(filters = {}) {
    return this.getByType("project", filters);
  }

  /**
   * Get contact messages (admin only)
   * @param {Object} filters - Additional filters
   */
  async getContactMessages(filters = {}) {
    return this.getByType("contact", filters);
  }

  /**
   * Get unread messages (admin only)
   */
  async getUnreadMessages() {
    return this.getAll({ status: "unread" });
  }

  /**
   * Get single message by ID (admin only)
   * @param {string} id - Message ID
   * @returns {Promise<Object>} Message data
   */
  async getById(id) {
    try {
      const response = await api.get(`/messages/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching message:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch message",
        status: error.response?.status,
      };
    }
  }

  /**
   * Update message status (admin only)
   * @param {string} id - Message ID
   * @param {string} status - New status: 'unread', 'read', 'replied', 'archived'
   * @returns {Promise<Object>} Updated message data
   */
  async updateStatus(id, status) {
    try {
      const validStatuses = ["unread", "read", "replied", "archived"];
      if (!validStatuses.includes(status)) {
        throw new Error(
          `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        );
      }

      const response = await api.patch(`/messages/${id}/status`, { status });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating message status:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update message status",
      };
    }
  }

  /**
   * Mark message as read (admin only)
   * @param {string} id - Message ID
   */
  async markAsRead(id) {
    return this.updateStatus(id, "read");
  }

  /**
   * Mark message as replied (admin only)
   * @param {string} id - Message ID
   */
  async markAsReplied(id) {
    return this.updateStatus(id, "replied");
  }

  /**
   * Archive message (admin only)
   * @param {string} id - Message ID
   */
  async archive(id) {
    return this.updateStatus(id, "archived");
  }

  /**
   * Reply to message (admin only)
   * @param {string} id - Message ID
   * @param {Object} replyData - Reply data
   * @param {string} replyData.reply_message - Reply content
   * @returns {Promise<Object>} Response data
   */
  async reply(id, replyData) {
    try {
      if (!replyData.reply_message?.trim()) {
        throw new Error("Reply message is required");
      }

      const response = await api.post(`/messages/${id}/reply`, replyData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error replying to message:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to send reply",
      };
    }
  }

  /**
   * Delete message (admin only)
   * @param {string} id - Message ID
   * @returns {Promise<Object>} Response data
   */
  async delete(id) {
    try {
      const response = await api.delete(`/messages/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error deleting message:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete message",
      };
    }
  }

  /**
   * Bulk delete messages (admin only)
   * @param {string[]} ids - Array of message IDs
   */
  async bulkDelete(ids) {
    try {
      const promises = ids.map((id) => this.delete(id));
      const results = await Promise.allSettled(promises);

      const successful = results.filter(
        (r) => r.status === "fulfilled" && r.value.success
      );
      const failed = results.filter(
        (r) => r.status === "rejected" || !r.value?.success
      );

      return {
        success: true,
        deletedCount: successful.length,
        failedCount: failed.length,
        results,
      };
    } catch (error) {
      console.error("Error bulk deleting messages:", error);
      return {
        success: false,
        error: "Failed to delete messages",
      };
    }
  }

  /**
   * Get message statistics (admin only)
   * @returns {Promise<Object>} Statistics data
   */
  async getStats() {
    try {
      const response = await api.get("/messages/stats");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching message stats:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch statistics",
        data: {
          summary: {
            total_messages: 0,
            unread_messages: 0,
            project_inquiries: 0,
            contact_messages: 0,
            replied_messages: 0,
            last_7_days: 0,
            last_30_days: 0,
          },
          messageTypes: [],
          recentProjects: [],
        },
      };
    }
  }

  /**
   * Export messages to CSV (admin only)
   * @param {Object} filters - Filter parameters
   */
  async exportToCSV(filters = {}) {
    try {
      const response = await api.get("/messages", {
        params: { ...filters, limit: 1000 },
        responseType: "blob",
        headers: {
          Accept: "text/csv",
        },
      });

      return {
        success: true,
        data: response.data,
        filename: `messages_export_${new Date().toISOString().split("T")[0]}.csv`,
      };
    } catch (error) {
      console.error("Error exporting messages:", error);
      return {
        success: false,
        error: "Failed to export messages",
      };
    }
  }

  /**
   * Get message counts by status (admin only)
   */
  async getCountsByStatus() {
    try {
      const stats = await this.getStats();
      if (!stats.success) {
        return stats;
      }

      const counts = {
        unread: stats.data.summary.unread_messages || 0,
        read:
          (stats.data.summary.total_messages || 0) -
          (stats.data.summary.unread_messages || 0),
        replied: stats.data.summary.replied_messages || 0,
        archived: 0, // You might need to add this to your stats endpoint
      };

      return {
        success: true,
        data: counts,
      };
    } catch (error) {
      console.error("Error getting message counts:", error);
      return {
        success: false,
        error: "Failed to get message counts",
        data: {
          unread: 0,
          read: 0,
          replied: 0,
          archived: 0,
        },
      };
    }
  }

  /**
   * Get recent activity (admin only)
   * @param {number} limit - Number of recent messages to return
   */
  async getRecentActivity(limit = 10) {
    try {
      const response = await api.get("/messages", {
        params: { limit, offset: 0, sort: "created_at:desc" },
      });

      return {
        success: true,
        data: response.data.data || [],
      };
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return {
        success: false,
        error: "Failed to fetch recent activity",
        data: [],
      };
    }
  }
}

// Create and export singleton instance
const messageService = new MessageService();

// Also export the class for testing/mocking purposes
export { MessageService };

export default messageService;
