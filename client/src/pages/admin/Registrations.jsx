import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import DataTable from '../../components/admin/DataTable';
import { 
  FiSearch, FiFilter, FiDownload, FiRefreshCw,
  FiUsers, FiCheckCircle, FiClock, FiXCircle,
  FiDollarSign, FiMail, FiTrash2, FiEye
} from 'react-icons/fi';
import registrationService from '../../services/registrationService';

const AdminRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [stats, setStats] = useState({
    total_registrations: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    paid: 0,
    total_revenue: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadRegistrations();
    loadStats();
  }, [filterStatus, filterPaymentStatus]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      
      const data = await registrationService.getAll(filters);
      setRegistrations(data.data || []);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await registrationService.getStats();
      setStats(data.data || {});
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleStatusChange = async (registration) => {
    setSelectedRegistration(registration);
    setNewStatus(registration.status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    try {
      await registrationService.updateStatus(selectedRegistration.id, newStatus);
      setShowStatusModal(false);
      loadRegistrations();
      loadStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (registration) => {
    setSelectedRegistration(registration);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await registrationService.delete(selectedRegistration.id);
      setShowDeleteModal(false);
      loadRegistrations();
      loadStats();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  const handleView = (registration) => {
    navigate(`/admin/registrations/${registration.id}`);
  };

  const handleExport = async () => {
    try {
      const blob = await registrationService.exportToCSV();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting registrations:', error);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = filterPaymentStatus === 'all' || reg.payment_status === filterPaymentStatus;
    return matchesSearch && matchesPayment;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns = [
    { 
      key: 'full_name', 
      title: 'Name',
      render: (item) => (
        <div>
          <div className="font-semibold text-gray-900">{item.full_name}</div>
          <div className="text-xs text-gray-500">{item.email}</div>
        </div>
      )
    },
    { 
      key: 'phone', 
      title: 'Phone',
      render: (item) => (
        <span className="text-gray-700">{item.phone || '-'}</span>
      )
    },
    { 
      key: 'formation_title', 
      title: 'Formation',
      render: (item) => (
        <span className="text-gray-900 font-medium">{item.formation_title || 'N/A'}</span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(item);
          }}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            item.status === 'confirmed' 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : item.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          {item.status}
        </button>
      )
    },
    { 
      key: 'payment_status', 
      title: 'Payment',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          item.payment_status === 'paid' 
            ? 'bg-green-100 text-green-800' 
            : item.payment_status === 'pending'
            ? 'bg-orange-100 text-orange-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {item.payment_status}
        </span>
      )
    },
    { 
      key: 'amount_paid', 
      title: 'Amount',
      render: (item) => (
        <span className="font-bold text-green-600">
          {item.amount_paid ? `${item.amount_paid} TND` : '-'}
        </span>
      )
    },
    { 
      key: 'registration_date', 
      title: 'Date',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {formatDate(item.registration_date || item.created_at)}
        </span>
      )
    }
  ];

  const tableActions = [
    {
      label: 'View',
      handler: handleView,
      color: 'bg-blue-500 text-white hover:bg-blue-600'
    },
    {
      label: 'Change Status',
      handler: handleStatusChange,
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 bg-clip-text text-transparent mb-2">
                Formation Registrations
              </h1>
              <p className="text-gray-600">
                Manage and track all formation registrations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadRegistrations}
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
                <span className="font-medium">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Total</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total_registrations || 0}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiUsers className="text-lg  from-blue-900 via-blue-800 to-blue-700 " />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Confirmed</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.confirmed || 0}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="text-lg text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Pending</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pending || 0}</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="text-lg text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Cancelled</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.cancelled || 0}</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <FiXCircle className="text-lg text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Paid</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.paid || 0}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiDollarSign className="text-lg text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">Revenue</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{stats.total_revenue || 0} TND</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiDollarSign className="text-lg text-green-600" />
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
                  placeholder="Search by name, email, or phone..."
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <select
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Payments</option>
                <option value="pending">Payment Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <FiUsers className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No registrations found</h3>
            <p className="text-gray-600">Registrations will appear here when students enroll</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredRegistrations}
            onRowClick={handleView}
            actions={tableActions}
          />
        )}

        {/* Status Change Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Change Registration Status
              </h3>
              <p className="text-gray-600 mb-4">
                Update status for <strong>{selectedRegistration?.full_name}</strong>
              </p>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-6"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <FiTrash2 className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Delete Registration
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete the registration for "{selectedRegistration?.full_name}"? This action cannot be undone.
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

export default AdminRegistrations;