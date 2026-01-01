import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import { LineChart, BarChart, DoughnutChart } from '../../components/admin/Charts';
import DataTable from '../../components/admin/DataTable';
import { 
  FiRefreshCw, 
  FiDownload, 
  FiFilter, 
  FiUsers,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { analyticsService } from '../../services/analyticsService';
import { userService } from '../../services/userService';
import { formatMonthlyData, formatTrafficSources } from '../../utils/chartDataFormatters';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      activeCourses: 0,
      totalRevenue: 0,
      pendingMessages: 0,
      conversionRate: 0,
      activeSessions: 0
    },
    recentUsers: [],
    monthlyTrends: {},
    trafficSources: [],
    loading: true,
    refreshing: false,
    error: null
  });

  // Define loadDashboardData first
  const loadDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch all data in parallel
      const [overview, users, traffic, monthly] = await Promise.all([
        analyticsService.getOverview(),
        userService.getRecentUsers(),
        analyticsService.getTrafficAnalytics(),
        analyticsService.getMonthlyAnalytics()
      ]);

      setDashboardData(prev => ({
        ...prev,
        stats: {
          totalUsers: overview.data?.totalUsers || overview.data?.users || 0,
          activeCourses: overview.data?.activeCourses || overview.data?.courses || 0,
          totalRevenue: overview.data?.totalRevenue || overview.data?.revenue || 0,
          pendingMessages: overview.data?.pendingMessages || overview.data?.messages || 0,
          conversionRate: overview.data?.conversionRate || 0,
          activeSessions: overview.data?.activeSessions || 0
        },
        recentUsers: users.data?.users || users.data || [],
        monthlyTrends: monthly.data || {},
        trafficSources: traffic.data?.sources || traffic.data || [],
        loading: false,
        refreshing: false
      }));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setDashboardData(prev => ({
        ...prev,
        error: 'Failed to load dashboard data',
        loading: false,
        refreshing: false
      }));
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setDashboardData(prev => ({ ...prev, refreshing: true }));
    loadDashboardData();
  };

  const handleExport = async () => {
    try {
      const blob = await analyticsService.exportDashboardData();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data');
    }
  };

  const handleUserAction = (action, user) => {
    switch (action) {
      case 'view':
        // Navigate to user detail page
        console.log('View user:', user);
        break;
      case 'edit':
        // Open edit modal
        console.log('Edit user:', user);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          deleteUser(user.id);
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      // Remove user from local state
      setDashboardData(prev => ({
        ...prev,
        recentUsers: prev.recentUsers.filter(user => user.id !== userId)
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  // Chart data configurations
  const lineChartData = formatMonthlyData(dashboardData.monthlyTrends);

  const barChartData = {
    labels: ['Users', 'Courses', 'Revenue', 'Messages'],
    datasets: [
      {
        label: 'Current Month',
        data: [
          dashboardData.stats.totalUsers,
          dashboardData.stats.activeCourses,
          dashboardData.stats.totalRevenue / 1000, // Scale down for better visualization
          dashboardData.stats.pendingMessages
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderRadius: 8
      }
    ]
  };

  const trafficChartData = formatTrafficSources(dashboardData.trafficSources);

  const userColumns = [
    { 
      key: 'name', 
      title: 'Name',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {item.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name || 'Unknown User'}</p>
            <p className="text-xs text-gray-500">{item.email || 'No email'}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'joined', 
      title: 'Joined Date',
      render: (item) => item.joined 
        ? new Date(item.joined).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'Unknown'
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (item) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          item.status === 'Active' ? 'bg-green-100 text-green-800' :
          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {item.status || 'Unknown'}
        </span>
      )
    },
    {
      key: 'lastActive',
      title: 'Last Active',
      render: (item) => item.lastActive 
        ? new Date(item.lastActive).toLocaleDateString()
        : 'Never'
    }
  ];

  const tableActions = [
    {
      label: 'View',
      handler: (user) => handleUserAction('view', user),
      color: 'bg-blue-500 text-white hover:bg-blue-600'
    },
    {
      label: 'Edit',
      handler: (user) => handleUserAction('edit', user),
      color: 'bg-indigo-500 text-white hover:bg-indigo-600'
    },
    {
      label: 'Delete',
      handler: (user) => handleUserAction('delete', user),
      color: 'bg-red-500 text-white hover:bg-red-600'
    }
  ];

  // Loading skeleton
  if (dashboardData.loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (dashboardData.error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="flex flex-col items-center justify-center h-96">
            <FiAlertCircle className="text-red-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Dashboard</h2>
            <p className="text-gray-600 mb-6">{dashboardData.error}</p>
            <button
              onClick={loadDashboardData}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <FiRefreshCw />
              <span className="font-medium">Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500/50 to-blue-600/50 to-pink-600 bg-clip-text text-transparent mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={dashboardData.refreshing}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50"
              >
                <FiRefreshCw className={`${dashboardData.refreshing ? 'animate-spin' : ''}`} />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiDownload />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Users" 
            value={dashboardData.stats.totalUsers.toLocaleString()} 
            icon="users" 
            trend="+12.5%"
            description="Registered users"
          />
          <DashboardCard 
            title="Active Courses" 
            value={dashboardData.stats.activeCourses} 
            icon="courses" 
            trend="+5"
            description="Published courses"
          />
          <DashboardCard 
            title="Total Revenue" 
            value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`} 
            icon="revenue" 
            trend="+8.2%"
            currency="USD"
            description="This month"
          />
          <DashboardCard 
            title="Pending Messages" 
            value={dashboardData.stats.pendingMessages} 
            icon="messages" 
            trend="+3"
            description="Require response"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LineChart 
              title="Monthly Growth Trends" 
              data={lineChartData}
              height={320}
            />
          </div>
          <div className="lg:col-span-1">
            <DoughnutChart 
              title="Traffic Sources" 
              data={trafficChartData}
              height={320}
            />
          </div>
        </div>

        {/* Additional Metrics and Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-bold text-indigo-600">{dashboardData.stats.conversionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Sessions</span>
                  <span className="font-bold text-green-600">{dashboardData.stats.activeSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Session Duration</span>
                  <span className="font-bold  from-blue-900 via-blue-800 to-blue-700 ">4.2m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bounce Rate</span>
                  <span className="font-bold text-red-600">32.1%</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>API Status</span>
                  <span className="px-2 py-1 bg-green-400 rounded-full text-xs font-bold">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <span className="px-2 py-1 bg-green-400 rounded-full text-xs font-bold">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Storage</span>
                  <span className="px-2 py-1 bg-yellow-400 rounded-full text-xs font-bold">78%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="lg:col-span-2">
            <DataTable 
              title="Recent Users"
              columns={userColumns} 
              data={dashboardData.recentUsers} 
              onRowClick={(user) => handleUserAction('view', user)}
              actions={tableActions}
              searchable={true}
              exportable={true}
              selectable={true}
              loading={dashboardData.loading}
            />
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">User Satisfaction</h3>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-sm text-purple-100 mt-2">+2.3% from last week</p>
              </div>
              <FiTrendingUp className="text-4xl opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Course Completion</h3>
                <p className="text-3xl font-bold">68%</p>
                <p className="text-sm text-pink-100 mt-2">15% increase this month</p>
              </div>
              <FiUsers className="text-4xl opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Support Tickets</h3>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-teal-100 mt-2">Avg. response: 2.4h</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center">
      <div>
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>
      <div className="flex space-x-3">
        <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
        <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
      <div className="lg:col-span-1 h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
    </div>

    {/* Table Skeleton */}
    <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
  </div>
);

export default Dashboard;