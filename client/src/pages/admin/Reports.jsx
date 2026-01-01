import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { 
  FiTrendingUp, FiUsers, FiMail, FiBook, 
  FiEye, FiDollarSign, FiBarChart2, FiCalendar,
  FiDownload, FiRefreshCw
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import analyticsService from '../../services/analyticsService';

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

  useEffect(() => {
    loadAllAnalytics();
  }, [period]);

  const loadAllAnalytics = async () => {
    try {
      setLoading(true);
      const [overviewRes, formationsRes, trafficRes, conversionsRes] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getFormationAnalytics(),
        analyticsService.getTrafficAnalytics(period),
        analyticsService.getConversionAnalytics()
      ]);

      setOverview(overviewRes.data || {});
      setFormationAnalytics(formationsRes.data || []);
      setTrafficData(trafficRes.data || {});
      setConversionData(conversionsRes.data || {});
    } catch (error) {
      console.error('Error loading analytics:', error);
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
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
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
              <h1 className="text-4xl font-bold bg-gradient-to-r  from-blue-900 via-blue-800 to-blue-700  bg-clip-text text-transparent mb-2">
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
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button
                onClick={loadAllAnalytics}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
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
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Total Views</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_views?.toLocaleString() || 0}</h3>
                <p className="text-sm text-green-600 mt-2 font-medium">📈 +12% from last period</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiEye className="text-2xl  from-blue-900 via-blue-800 to-blue-700 " />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Registrations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_registrations || 0}</h3>
                <p className="text-sm text-green-600 mt-2 font-medium">📈 +8% from last period</p>
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
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_messages || 0}</h3>
                <p className="text-sm text-green-600 mt-2 font-medium">📈 +15% from last period</p>
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
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{overview.total_formations || 0}</h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">📚 Active formations</p>
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
              <p className="text-gray-600 text-sm mt-1">Page views over time</p>
            </div>
            <FiTrendingUp className="text-3xl  from-blue-900 via-blue-800 to-blue-700 " />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData.daily_views}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formationAnalytics.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="title" stroke="#666" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="registrations_count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Formation Revenue</h2>
                <p className="text-gray-600 text-sm mt-1">Total revenue by formation</p>
              </div>
              <FiDollarSign className="text-3xl text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formationAnalytics.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.title}: ${entry.total_revenue} TND`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="total_revenue"
                >
                  {formationAnalytics.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages and Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Pages</h2>
            <div className="space-y-3">
              {trafficData.top_pages?.slice(0, 5).map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className=" from-blue-900 via-blue-800 to-blue-700  font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-900 font-medium truncate">{page.page_url}</span>
                  </div>
                  <span className="text-gray-600 font-semibold ml-4">{page.views} views</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Referrers</h2>
            <div className="space-y-3">
              {trafficData.top_referrers?.slice(0, 5).map((referrer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-900 font-medium truncate">{referrer.referrer}</span>
                  </div>
                  <span className="text-gray-600 font-semibold ml-4">{referrer.count} visits</span>
                </div>
              ))}
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Formation</th>
                  <th className="text-center py-3 px-4 text-gray-700 font-semibold">Views</th>
                  <th className="text-center py-3 px-4 text-gray-700 font-semibold">Registrations</th>
                  <th className="text-center py-3 px-4 text-gray-700 font-semibold">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {conversionData.formation_conversions?.slice(0, 5).map((formation, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{formation.title}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{formation.views_count}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{formation.registrations}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        parseFloat(formation.conversion_rate) > 10 
                          ? 'bg-green-100 text-green-800' 
                          : parseFloat(formation.conversion_rate) > 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {formation.conversion_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-gradient-to-r  from-blue-900 via-blue-800 to-blue-700  rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Summary Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase mb-2">Average Conversion</p>
              <p className="text-4xl font-bold">
                {conversionData.formation_conversions?.length > 0
                  ? (conversionData.formation_conversions.reduce((acc, f) => acc + parseFloat(f.conversion_rate || 0), 0) / conversionData.formation_conversions.length).toFixed(2)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase mb-2">Total Revenue</p>
              <p className="text-4xl font-bold">
                {formationAnalytics.reduce((acc, f) => acc + parseFloat(f.total_revenue || 0), 0).toLocaleString()} TND
              </p>
            </div>
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase mb-2">Avg. Daily Views</p>
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