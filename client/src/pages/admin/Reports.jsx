import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import {
  FiTrendingUp, FiUsers, FiMail, FiBook,
  FiEye, FiDollarSign, FiBarChart2, FiCalendar,
  FiDownload, FiRefreshCw
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import the analytics service (make sure this is in a separate file)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [overview, setOverview] = useState({
    total_views: 0,
    total_registrations: 0,
    total_messages: 0,
    total_formations: 0
  });
  const [formationAnalytics, setFormationAnalytics] = useState([]);
  const [trafficData, setTrafficData] = useState({
    daily_views: [],
    top_pages: [],
    top_referrers: []
  });
  const [conversionData, setConversionData] = useState({
    formation_conversions: [],
    top_course_clicks: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllAnalytics();
  }, [period]);

  const loadAllAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const [overviewRes, formationsRes, trafficRes, conversionsRes] = await Promise.all([
        fetch(`${API_URL}/analytics/overview`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_URL}/analytics/formations`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_URL}/analytics/traffic?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_URL}/analytics/conversions`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      // Check if all responses are OK
      if (!overviewRes.ok || !formationsRes.ok || !trafficRes.ok || !conversionsRes.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const [overviewData, formationsData, trafficDataRes, conversionsData] = await Promise.all([
        overviewRes.json(),
        formationsRes.json(),
        trafficRes.json(),
        conversionsRes.json()
      ]);

      // Set data from API responses
      setOverview(overviewData.data || {});
      setFormationAnalytics(formationsData.data || []);
      setTrafficData(trafficDataRes.data || { daily_views: [], top_pages: [], top_referrers: [] });
      setConversionData(conversionsData.data || { formation_conversions: [], top_course_clicks: [] });
    } catch (error) {
      console.error('Error loading analytics:', error);
      setError('Failed to load analytics data. Please try again.');

      // Set default empty data to prevent crashes
      setOverview({
        total_views: 0,
        total_registrations: 0,
        total_messages: 0,
        total_formations: 0
      });
      setFormationAnalytics([]);
      setTrafficData({
        daily_views: [],
        top_pages: [],
        top_referrers: []
      });
      setConversionData({
        formation_conversions: [],
        top_course_clicks: []
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const exportReport = () => {
    const reportData = {
      overview,
      formationAnalytics,
      trafficData,
      conversionData,
      generatedAt: new Date().toISOString(),
      period: `${period} days`
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format data for charts
  const formatDailyViews = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      date: item.date ? new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : '',
      views: parseInt(item.views) || 0
    })).reverse(); // Reverse to show chronological order
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent mb-2">
                Analytics & Reports
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into your portfolio performance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button
                onClick={loadAllAnalytics}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiDownload />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={loadAllAnalytics}
                className="mt-2 text-red-700 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Total Views</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_views?.toLocaleString() || 0}</h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">All time page views</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiEye className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Registrations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_registrations?.toLocaleString() || 0}</h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">Total course registrations</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Messages</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_messages?.toLocaleString() || 0}</h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">Contact form messages</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-xl">
                <FiMail className="text-2xl text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Formations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_formations?.toLocaleString() || 0}</h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">Published courses</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FiBook className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Traffic</h2>
              <p className="text-gray-600 text-sm mt-1">Page views over the last {period} days</p>
            </div>
            <FiTrendingUp className="text-3xl text-purple-600" />
          </div>
          {trafficData.daily_views && trafficData.daily_views.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formatDailyViews(trafficData.daily_views)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} views`, 'Views']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  name="Page Views"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <p>No traffic data available for the selected period</p>
            </div>
          )}
        </div>

        {/* Formation Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Formation Performance</h2>
                <p className="text-gray-600 text-sm mt-1">Registrations by formation</p>
              </div>
              <FiBarChart2 className="text-3xl text-blue-600" />
            </div>
            {formationAnalytics && formationAnalytics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formationAnalytics.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="title"
                    stroke="#666"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 11 }}
                    interval={0}
                  />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}`, 'Registrations']}
                    labelFormatter={(label) => `Formation: ${label}`}
                  />
                  <Bar
                    dataKey="registrations_count"
                    name="Registrations"
                    fill="#8b5cf6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>No formation analytics data available</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Formation Revenue</h2>
                <p className="text-gray-600 text-sm mt-1">Potential revenue by formation</p>
              </div>
              <FiDollarSign className="text-3xl text-green-600" />
            </div>
            {formationAnalytics && formationAnalytics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={formationAnalytics.slice(0, 5).filter(f => f.total_revenue > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ title, total_revenue }) => `${title}: ${parseFloat(total_revenue).toLocaleString('fr-FR', { style: 'currency', currency: 'TND' })}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="total_revenue"
                    nameKey="title"
                  >
                    {formationAnalytics.slice(0, 5).filter(f => f.total_revenue > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${parseFloat(value).toLocaleString('fr-FR', { style: 'currency', currency: 'TND' })}`, 'Revenue']}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>No revenue data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Pages and Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Pages</h2>
            <div className="space-y-3">
              {trafficData.top_pages && trafficData.top_pages.length > 0 ? (
                trafficData.top_pages.slice(0, 5).map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-900 font-medium truncate">{page.page_url || 'Unknown page'}</span>
                    </div>
                    <span className="text-gray-600 font-semibold ml-4">{page.views || 0} views</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No page view data available</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Referrers</h2>
            <div className="space-y-3">
              {trafficData.top_referrers && trafficData.top_referrers.length > 0 ? (
                trafficData.top_referrers.slice(0, 5).map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-900 font-medium truncate">{referrer.referrer || 'Direct'}</span>
                    </div>
                    <span className="text-gray-600 font-semibold ml-4">{referrer.count || 0} visits</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No referrer data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Conversion Rates */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Conversion Rates</h2>
              <p className="text-gray-600 text-sm mt-1">Formation view to registration conversion</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            {conversionData.formation_conversions && conversionData.formation_conversions.length > 0 ? (
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Formation</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Views</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Registrations</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionData.formation_conversions.slice(0, 8).map((formation, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium truncate max-w-xs">{formation.title}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{formation.views_count || 0}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{formation.registrations || 0}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${parseFloat(formation.conversion_rate || 0) > 10
                            ? 'bg-green-100 text-green-800'
                            : parseFloat(formation.conversion_rate || 0) > 5
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                          {parseFloat(formation.conversion_rate || 0).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-4">No conversion data available</p>
            )}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Summary Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase mb-2">Average Conversion</p>
              <p className="text-4xl font-bold">
                {conversionData.formation_conversions?.length > 0
                  ? (conversionData.formation_conversions.reduce((acc, f) => acc + parseFloat(f.conversion_rate || 0), 0) / conversionData.formation_conversions.length).toFixed(2)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase mb-2">Total Potential Revenue</p>
              <p className="text-4xl font-bold">
                {formationAnalytics.reduce((acc, f) => acc + parseFloat(f.total_revenue || 0), 0).toLocaleString('fr-FR', { style: 'currency', currency: 'TND' })}
              </p>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase mb-2">Avg. Daily Views</p>
              <p className="text-4xl font-bold">
                {trafficData.daily_views?.length > 0
                  ? Math.round(trafficData.daily_views.reduce((acc, d) => acc + parseInt(d.views || 0), 0) / trafficData.daily_views.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;