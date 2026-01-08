import { useEffect, useState } from "react";
import { FiEye, FiPlus, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import Sidebar from "../../components/admin/Sidebar";
import { projectService } from "../../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllAdmin();
      setProjects(response.data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        await projectService.delete(project.id);
        setProjects((prev) => prev.filter((p) => p.id !== project.id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const response = await projectService.toggleFeatured(project.id);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, featured: response.data.featured } : p
        )
      );
    } catch (error) {
      console.error("Error toggling featured status:", error);
      alert("Failed to update project");
    }
  };

  const handleStatusChange = async (project, status) => {
    try {
      const response = await projectService.updateStatus(project.id, status);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, status: response.data.status } : p
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update project status");
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedProjects.length === 0) {
      alert("Please select projects first");
      return;
    }

    if (action === "delete") {
      if (
        !window.confirm(
          `Are you sure you want to delete ${selectedProjects.length} projects?`
        )
      ) {
        return;
      }
    }

    try {
      if (action === "delete") {
        // Delete selected projects
        for (const projectId of selectedProjects) {
          await projectService.delete(projectId);
        }
        setProjects((prev) =>
          prev.filter((p) => !selectedProjects.includes(p.id))
        );
        setSelectedProjects([]);
      }
      // Add more bulk actions as needed
    } catch (error) {
      console.error("Error performing bulk action:", error);
      alert("Failed to perform bulk action");
    }
  };

  const columns = [
    {
      key: "title",
      title: "Project",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={item.cover_image}
            alt={item.title}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/48/48";
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{item.title}</p>
            <p className="text-sm text-gray-500 truncate">
              {item.short_description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Category",
      render: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {item.category}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (item) => (
        <select
          value={item.status}
          onChange={(e) => handleStatusChange(item, e.target.value)}
          className={`text-xs font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-offset-2 ${
            item.status === "published"
              ? "bg-green-100 text-green-800 focus:ring-green-500"
              : item.status === "draft"
                ? "bg-yellow-100 text-yellow-800 focus:ring-yellow-500"
                : "bg-gray-100 text-gray-800 focus:ring-gray-500"
          }`}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      ),
    },
    {
      key: "featured",
      title: "Featured",
      render: (item) => (
        <button
          onClick={() => handleToggleFeatured(item)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            item.featured
              ? "bg-purple-100 from-blue-500/50 hover:bg-purple-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.featured ? "Featured" : "Standard"}
        </button>
      ),
    },
    {
      key: "views_count",
      title: "Views",
      render: (item) => item.views_count || 0,
    },
    {
      key: "created_at",
      title: "Created",
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  const tableActions = [
    {
      label: "Edit",
      handler: (project) =>
        (window.location.href = `/admin/projects/edit/${project.id}`),
      color: "bg-indigo-500 text-white hover:bg-indigo-600",
    },
    {
      label: "Delete",
      handler: (project) => handleDelete(project),
      color: "bg-red-500 text-white hover:bg-red-600",
    },
  ];

  if (error) {
    return (
      <div className="flex-1 ml-64 p-8">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load Projects
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadProjects}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <FiRefreshCw />
            <span className="font-medium">Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 p-8">
      <Sidebar />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
              Projects Management
            </h1>
            <p className="text-gray-600">
              Manage your portfolio projects, update status, and feature
              important work.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Bulk Actions */}
            {selectedProjects.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedProjects.length} selected
                </span>
                <select
                  onChange={(e) => handleBulkAction(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Bulk Actions</option>
                  <option value="delete">Delete Selected</option>
                </select>
              </div>
            )}

            <Link
              to="/admin/projects/new"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span className="font-medium">New Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <FiEye className="text-indigo-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Published</p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "published").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="text-green-600 text-xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Featured</p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.filter((p) => p.featured).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <span className=" from-blue-900 via-blue-800 to-blue-700  text-xl">
                ⭐
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">
                {projects.reduce(
                  (total, project) => total + (project.views_count || 0),
                  0
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-blue-600 text-xl">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <DataTable
        title="All Projects"
        columns={columns}
        data={projects}
        actions={tableActions}
        searchable={true}
        exportable={true}
        selectable={true}
        loading={loading}
        onSelectionChange={setSelectedProjects}
        keyField="id"
      />
    </div>
  );
};

export default Projects;
