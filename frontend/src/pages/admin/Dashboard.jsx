import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiDownload,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import DashboardCard from "../../components/admin/DashboardCard";
import Sidebar from "../../components/admin/Sidebar";
import { analyticsService } from "../../services/analyticsService";
import { userService } from "../../services/userService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      activeCourses: 0,
      totalRevenue: 0,
      pendingMessages: 0,
      conversionRate: 0,
      activeSessions: 0,
    },
    recentUsers: [],
    monthlyTrends: [],
    trafficSources: [],
    loading: true,
    refreshing: false,
    error: null,
  });

  // Helper function to format monthly data
  // const formatMonthlyData = (data) => {
  //   if (!Array.isArray(data) || data.length === 0) {
  //     // Return sample data for demo
  //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  //     return months.map((month, index) => ({
  //       month,
  //       users: Math.floor(Math.random() * 100) + 50,
  //       revenue: Math.floor(Math.random() * 10000) + 5000,
  //     }));
  //   }

  //   return data.map((item) => ({
  //     month:
  //       item.month || new Date().toLocaleString("default", { month: "short" }),
  //     users: item.users || 0,
  //     revenue: item.revenue || 0,
  //     pageViews: item.page_views || 0,
  //   }));
  // };

  // Helper function to format traffic sources
  // const formatTrafficSources = (data) => {
  //   if (!Array.isArray(data) || data.length === 0) {
  //     // Return sample data for demo
  //     return [
  //       { name: "Direct", value: 40, color: "#8b5cf6" },
  //       { name: "Google", value: 30, color: "#3b82f6" },
  //       { name: "Social", value: 20, color: "#10b981" },
  //       { name: "Referral", value: 10, color: "#f59e0b" },
  //     ];
  //   }

  //   return data.map((item, index) => ({
  //     name: item.referrer || "Unknown",
  //     value: item.count || 0,
  //     color: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index % 5],
  //   }));
  // };

  // Define loadDashboardData first
  const loadDashboardData = async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch all data with error handling
      const [overviewRes, usersRes, trafficRes, monthlyRes] =
        await Promise.allSettled([
          analyticsService.getOverview(),
          userService.getRecentRegistrations
            ? userService.getRecentRegistrations()
            : Promise.resolve({ data: { users: [] } }),
          analyticsService.getTrafficAnalytics(),
          analyticsService.getMonthlyAnalytics(),
        ]);

      // Process overview data
      let overview = { data: {} };
      if (overviewRes.status === "fulfilled") {
        overview = overviewRes.value;
      }

      // Process user data
      let recentUsers = [];
      if (usersRes.status === "fulfilled") {
        recentUsers = usersRes.value.data?.users || [];
      }

      // Process traffic data
      let trafficSources = [];
      if (trafficRes.status === "fulfilled") {
        const trafficData = trafficRes.value.data || {};
        trafficSources = trafficData.top_referrers || trafficData.sources || [];
      }

      // Process monthly data
      let monthlyTrends = [];
      if (monthlyRes.status === "fulfilled") {
        monthlyTrends = monthlyRes.value.data || [];
      }

      // Get formation analytics for revenue calculation
      let formationAnalytics = [];
      try {
        const formationsRes = await analyticsService.getFormationAnalytics();
        formationAnalytics = formationsRes.data || [];
      } catch (error) {
        console.log("Could not fetch formation analytics:", error);
      }

      // Calculate total potential revenue from formations
      const totalRevenue = formationAnalytics.reduce((acc, formation) => {
        return acc + parseFloat(formation.total_revenue || 0);
      }, 0);

      // Calculate conversion rate
      let conversionRate = 0;
      try {
        const conversionsRes = await analyticsService.getConversionAnalytics();
        const conversions = conversionsRes.data?.formation_conversions || [];
        if (conversions.length > 0) {
          conversionRate =
            conversions.reduce(
              (acc, conv) => acc + parseFloat(conv.conversion_rate || 0),
              0
            ) / conversions.length;
        }
      } catch (error) {
        console.log("Could not fetch conversion analytics:", error);
      }

      setDashboardData((prev) => ({
        ...prev,
        stats: {
          totalUsers:
            overview.data?.total_registrations ||
            overview.data?.totalUsers ||
            0,
          activeCourses:
            overview.data?.total_formations ||
            overview.data?.activeCourses ||
            0,
          totalRevenue: totalRevenue,
          pendingMessages:
            overview.data?.total_messages ||
            overview.data?.pendingMessages ||
            0,
          conversionRate: parseFloat(conversionRate).toFixed(2),
          activeSessions: Math.floor(Math.random() * 50) + 10, // Demo data
        },
        recentUsers: recentUsers,
        monthlyTrends: monthlyTrends,
        trafficSources: trafficSources,
        loading: false,
        refreshing: false,
      }));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setDashboardData((prev) => ({
        ...prev,
        error: "Failed to load dashboard data. Using demo data instead.",
        loading: false,
        refreshing: false,
        stats: {
          totalUsers: 156,
          activeCourses: 8,
          totalRevenue: 12500,
          pendingMessages: 23,
          conversionRate: 12.5,
          activeSessions: 42,
        },
        recentUsers: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            status: "confirmed",
            joined: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            status: "pending",
            joined: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            status: "confirmed",
            joined: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
        monthlyTrends: [],
        trafficSources: [],
      }));
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setDashboardData((prev) => ({ ...prev, refreshing: true }));
    loadDashboardData();
  };

  const handleExport = async () => {
    try {
      // Create CSV content
      const csvContent = [
        ["Metric", "Value", "Timestamp"],
        [
          "Total Users",
          dashboardData.stats.totalUsers,
          new Date().toISOString(),
        ],
        [
          "Active Courses",
          dashboardData.stats.activeCourses,
          new Date().toISOString(),
        ],
        [
          "Total Revenue",
          dashboardData.stats.totalRevenue,
          new Date().toISOString(),
        ],
        [
          "Pending Messages",
          dashboardData.stats.pendingMessages,
          new Date().toISOString(),
        ],
        [
          "Conversion Rate",
          dashboardData.stats.conversionRate + "%",
          new Date().toISOString(),
        ],
        [
          "Active Sessions",
          dashboardData.stats.activeSessions,
          new Date().toISOString(),
        ],
        ["", "", ""],
        ["Recent Users:", "", ""],
        ["Name", "Email", "Status", "Joined Date"],
      ];

      dashboardData.recentUsers.forEach((user) => {
        csvContent.push([
          user.name || "Unknown",
          user.email || "No email",
          user.status || "Unknown",
          user.joined ? new Date(user.joined).toLocaleDateString() : "Unknown",
        ]);
      });

      const csvString = csvContent.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `dashboard-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  const handleUserAction = (action, user) => {
    switch (action) {
      case "view":
        console.log("View user:", user);
        // Navigate to user detail page
        // history.push(`/admin/users/${user.id}`);
        break;
      case "edit":
        console.log("Edit user:", user);
        // Open edit modal
        break;
      case "delete":
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          deleteUser(user.id);
        }
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (userService.deleteUser) {
        await userService.deleteUser(userId);
      }
      // Remove user from local state
      setDashboardData((prev) => ({
        ...prev,
        recentUsers: prev.recentUsers.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

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
            <FiAlertCircle className="text-yellow-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Partial Data Load
            </h2>
            <p className="text-gray-600 mb-4 text-center max-w-md">
              {dashboardData.error}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Some demo data is being used.
            </p>
            <button
              onClick={loadDashboardData}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
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
                <FiRefreshCw
                  className={`${dashboardData.refreshing ? "animate-spin" : ""}`}
                />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
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
            value={`${dashboardData.stats.totalRevenue.toLocaleString("fr-FR", { style: "currency", currency: "TND" })}`}
            icon="revenue"
            trend="+8.2%"
            description="Potential revenue"
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
          {/* Line Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Monthly Growth Trends
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg mb-2">📈 Chart Component Required</div>
                <p className="text-sm">
                  Install recharts or chart.js to visualize data
                </p>
              </div>
            </div>
          </div>

          {/* Doughnut Chart Placeholder */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Traffic Sources
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg mb-2">📊 Chart Component Required</div>
                <p className="text-sm">
                  Install recharts or chart.js to visualize data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics and Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-bold text-indigo-600">
                    {dashboardData.stats.conversionRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Sessions</span>
                  <span className="font-bold text-green-600">
                    {dashboardData.stats.activeSessions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Session Duration</span>
                  <span className="font-bold text-purple-600">4.2m</span>
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
                  <span className="px-2 py-1 bg-green-400 rounded-full text-xs font-bold">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <span className="px-2 py-1 bg-green-400 rounded-full text-xs font-bold">
                    Healthy
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Storage</span>
                  <span className="px-2 py-1 bg-yellow-400 rounded-full text-xs font-bold">
                    78%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recent Registrations
              </h3>
              {dashboardData.recentUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                          Joined Date
                        </th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentUsers.map((user, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.name || "Unknown User"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.email || "No email"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {user.joined
                              ? new Date(user.joined).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "Unknown"}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : user.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : user.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.status || "Unknown"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUserAction("view", user)}
                                className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleUserAction("delete", user)}
                                className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent registrations found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  User Satisfaction
                </h3>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-sm text-purple-100 mt-2">
                  +2.3% from last week
                </p>
              </div>
              <FiTrendingUp className="text-4xl opacity-75" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Course Completion
                </h3>
                <p className="text-3xl font-bold">68%</p>
                <p className="text-sm text-pink-100 mt-2">
                  15% increase this month
                </p>
              </div>
              <FiUsers className="text-4xl opacity-75" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Support Tickets</h3>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-teal-100 mt-2">
                  Avg. response: 2.4h
                </p>
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
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-pulse"
        >
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
