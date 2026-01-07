import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import DataTable from '../../components/admin/DataTable';
import {
  FiPlus, FiSearch, FiFilter, FiDownload,
  FiEye, FiEdit, FiTrash2, FiRefreshCw,
  FiBook, FiUsers, FiDollarSign, FiTrendingUp
} from 'react-icons/fi';
import formationService from '../../services/formationService';

const AdminFormations = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [stats, setStats] = useState({
    total_formations: 0,
    published_formations: 0,
    draft_formations: 0,
    total_participants: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);

  useEffect(() => {
    loadFormations();
    loadStats();
  }, [filterStatus, filterCategory]);

  const loadFormations = async () => {
    try {
      setLoading(true);
      const filters = { admin: true }; // Add admin flag to see all formations
      if (filterStatus !== 'all') filters.status = filterStatus;
      if (filterCategory !== 'all') filters.category = filterCategory;

      const data = await formationService.getAll(filters);
      console.log('📚 Formations loaded:', data);
      setFormations(data.data || []);
    } catch (error) {
      console.error('Error loading formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await formationService.getStats();
      console.log('📊 Stats loaded:', data);
      setStats(data.data || {});
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDelete = async (formation) => {
    setSelectedFormation(formation);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await formationService.delete(selectedFormation.id);
      setShowDeleteModal(false);
      loadFormations();
      loadStats();
    } catch (error) {
      console.error('Error deleting formation:', error);
    }
  };

  const handleEdit = (formation) => {
    navigate(`/admin/formations/edit/${formation.id}`);
  };



  const handleExport = async () => {
    try {
      console.log('Exporting formations...');
      const data = await formationService.exportToCSV({ status: filterStatus, category: filterCategory });
      // Create blob and download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `formations-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting formations:', error);
    }
  };

  const filteredFormations = formations.filter(formation => {
    const searchLower = searchTerm.toLowerCase();
    return (
      formation.title?.toLowerCase().includes(searchLower) ||
      formation.category?.toLowerCase().includes(searchLower) ||
      formation.description?.toLowerCase().includes(searchLower) ||
      formation.instructor_name?.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    {
      key: 'image',
      title: 'Image',
      render: (item) => (
        <img
          src={item.cover_image || 'https://via.placeholder.com/50'}
          alt={item.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )
    },
    { key: 'title', title: 'Title' },
    {
      key: 'category',
      title: 'Category',
      render: (item) => (
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
          {item.category}
        </span>
      )
    },
    {
      key: 'level',
      title: 'Level',
      render: (item) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
          {item.level}
        </span>
      )
    },
    {
      key: 'duration_hours',
      title: 'Duration',
      render: (item) => `${item.duration_hours || 0} hours`
    },
    {
      key: 'price',
      title: 'Price',
      render: (item) => (
        <span className="font-bold text-green-600">
          ${item.price || 0}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'published'
            ? 'bg-green-100 text-green-800'
            : item.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'current_participants',
      title: 'Enrollments',
      render: (item) => (
        <span className="font-semibold text-indigo-600">
          {item.current_participants || 0}
        </span>
      )
    }
  ];

  const tableActions = [
   
    {
      label: 'Edit',
      handler: handleEdit,
      color: 'bg-indigo-500 text-white hover:bg-indigo-600'
    },
    {
      label: 'Delete',
      handler: handleDelete,
      color: 'bg-red-500 text-white hover:bg-red-600'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
                Manage Formations
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your training formations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadFormations}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
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
                onClick={() => navigate('/admin/formations/new')}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiPlus size={20} />
                <span className="font-medium">Add Formation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Formations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total_formations || 0}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiBook className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Published</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.published_formations || 0}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FiTrendingUp className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Participants</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total_participants || 0}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Draft</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.draft_formations || 0}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FiEdit className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search formations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="enrolling">Enrolling</option>
                <option value="upcoming">Upcoming</option>
                <option value="full">Full</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="AI Engineering">AI Engineering</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Formations Table */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : filteredFormations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <FiBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Formations Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Get started by creating your first formation'}
            </p>
            {!searchTerm && filterStatus === 'all' && filterCategory === 'all' && (
              <button
                onClick={() => navigate('/admin/formations/new')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiPlus size={20} />
                <span className="font-medium">Create First Formation</span>
              </button>
            )}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredFormations}
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
                Delete Formation
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete "{selectedFormation?.title}"? This action cannot be undone.
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

export default AdminFormations;