import { useEffect, useState, useCallback } from "react";
import {
  FiBook,
  FiDownload,
  FiMousePointer,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiStar,
  FiTrash2,
  FiTrendingUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import Sidebar from "../../components/admin/Sidebar";
import courseService from "../../services/courseService";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    totalClicks: 0,
    categories: 0,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

 

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterCategory !== "all") filters.category = filterCategory;

      const data = await courseService.getAll(filters);
      setCourses(data.data || []);
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

   const loadStats = useCallback(async () => {
    try {
      const data = await courseService.getStats();
      setStats(data.data || {});
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  }, []);

   useEffect(() => {
     loadCourses();
     loadStats();
   }, [loadCourses, loadStats]); 

  const handleDelete = async (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await courseService.delete(selectedCourse.id);
      setShowDeleteModal(false);
      loadCourses();
      loadStats();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = (course) => {
    navigate(`/admin/courses/edit/${course.id}`);
  };

  const handleToggleFeatured = async (course) => {
    try {
      await courseService.toggleFeatured(course.id);
      loadCourses();
      loadStats();
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
  };

  const handleExport = () => {
    console.log("Exporting courses...");
    // Add export logic here
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "cover_image",
      title: "Cover",
      render: (item) => (
        <img
          src={item.cover_image || "https://via.placeholder.com/50"}
          alt={item.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    {
      key: "title",
      title: "Title",
      render: (item) => (
        <div>
          <div className="font-semibold text-gray-900">{item.title}</div>
          <div className="text-xs text-gray-500">by {item.author}</div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Category",
      render: (item) => (
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
          {item.category}
        </span>
      ),
    },
    {
      key: "price",
      title: "Price",
      render: (item) => (
        <span className="font-bold text-green-600">${item.price}</span>
      ),
    },
    {
      key: "rating",
      title: "Rating",
      render: (item) => (
        <div className="flex items-center space-x-1">
          <FiStar className="text-yellow-500 fill-current" size={14} />
          <span className="font-semibold text-gray-900">
            {item.rating || 0}
          </span>
          <span className="text-xs text-gray-500">({item.reviews || 0})</span>
        </div>
      ),
    },
    {
      key: "featured",
      title: "Featured",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFeatured(item);
          }}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            item.featured
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.featured ? "⭐ Featured" : "Not Featured"}
        </button>
      ),
    },
    {
      key: "clicks",
      title: "Clicks",
      render: (item) => (
        <div className="flex items-center space-x-1 text-indigo-600 font-semibold">
          <FiMousePointer size={14} />
          <span>{item.clicks || 0}</span>
        </div>
      ),
    },
  ];

  const tableActions = [
    {
      label: "Edit",
      handler: handleEdit,
      color: "bg-indigo-500 text-white hover:bg-indigo-600",
    },
    {
      label: "Delete",
      handler: handleDelete,
      color: "bg-red-500 text-white hover:bg-red-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
                Manage Courses & Books
              </h1>
              <p className="text-gray-600">
                Add, edit, and manage recommended courses and books
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadCourses}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <FiDownload />
                <span className="font-medium">Export</span>
              </button>
              <button
                onClick={() => navigate("/admin/courses/new")}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiPlus size={20} />
                <span className="font-medium">Add Course</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Total Courses
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total || 0}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiBook className="text-2xl  from-blue-900 via-blue-800 to-blue-700 " />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Featured
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.featured || 0}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FiStar className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Total Clicks
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalClicks || 0}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiMousePointer className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Categories
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.categories || 0}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FiTrendingUp className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses by title, author, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="data-science">Data Science</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <FiBook className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first course or book
            </p>
            <button
              onClick={() => navigate("/admin/courses/new")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span>Add Course</span>
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredCourses}
            actions={tableActions}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <FiTrash2 className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Delete Course
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete "{selectedCourse?.title}"? This
                action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
