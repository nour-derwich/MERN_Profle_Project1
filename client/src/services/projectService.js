import api from "./api";

export const projectService = {
  /**
   * Upload project image with enhanced error handling
   */
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      console.log("📤 Uploading image:", imageFile.name, imageFile.size);

      const response = await api.post("/projects/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 60 seconds for file uploads
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`📊 Upload progress: ${progress}%`);
        },
      });

      console.log("✅ Image upload successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Image upload failed:", error);

      // Provide more specific error messages
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Cannot connect to server. Please check if the backend is running and try again."
        );
      } else if (error.response?.status === 413) {
        throw new Error("File too large. Please choose a smaller image.");
      } else if (error.response?.status === 415) {
        throw new Error(
          "Unsupported file type. Please use JPEG, PNG, or WebP."
        );
      } else {
        throw new Error(
          error.message || "Image upload failed. Please try again."
        );
      }
    }
  },

  // ... rest of your methods remain the same
  getAll: async (filters = {}) => {
    const response = await api.get("/projects", { params: filters });
    return response.data;
  },

  getAllAdmin: async () => {
    const response = await api.get("/projects/admin/all");
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get("/projects/featured");
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/projects/categories");
    return response.data;
  },

  search: async (query, filters = {}) => {
    const response = await api.get("/projects/search", {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (projectData) => {
    const response = await api.post("/projects", projectData);
    return response.data;
  },

  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/projects/${id}/status`, { status });
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/projects/${id}/featured`);
    return response.data;
  },

  reorder: async (projectIds) => {
    const response = await api.put("/projects/reorder", { projectIds });
    return response.data;
  },

  incrementViews: async (id) => {
    const response = await api.post(`/projects/${id}/view`);
    return response.data;
  },
};

export default projectService;
