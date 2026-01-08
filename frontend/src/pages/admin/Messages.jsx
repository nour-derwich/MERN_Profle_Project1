import { useEffect, useState, useCallback } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaBolt, FaCode, FaEnvelopeOpen, FaRobot } from "react-icons/fa";
import {
  FiAlertCircle,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiDollarSign,
  FiGlobe,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiSend,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import DataTable from "../../components/admin/DataTable";
import Sidebar from "../../components/admin/Sidebar";
import messageService from "../../services/messageService";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    project_inquiries: 0,
    contact_messages: 0,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterStatus !== "all") filters.status = filterStatus;
      if (filterType !== "all") filters.message_type = filterType;

      const data = await messageService.getAll(filters);
      setMessages(data.data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType]); // Add filter dependencies

  // Wrap loadStats in useCallback
  const loadStats = useCallback(async () => {
    try {
      const data = await messageService.getStats();
      setStats(data.data?.summary || {});
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  }, []); // No dependencies needed

  useEffect(() => {
    loadMessages();
    loadStats();
  }, [loadMessages, loadStats]);

  const handleView = async (message) => {
    try {
      const data = await messageService.getById(message.id);
      setSelectedMessage(data.data);
      setShowViewModal(true);
      // Reload to update unread count
      if (data.data.status === "unread") {
        loadMessages();
        loadStats();
      }
    } catch (error) {
      console.error("Error loading message:", error);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyText("");
    setShowReplyModal(true);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSending(true);
      await messageService.reply(selectedMessage.id, {
        reply_message: replyText,
      });
      setShowReplyModal(false);
      setReplyText("");
      loadMessages();
      loadStats();
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await messageService.delete(selectedMessage.id);
      setShowDeleteModal(false);
      loadMessages();
      loadStats();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleMarkAsRead = async (message) => {
    try {
      await messageService.updateStatus(message.id, "read");
      loadMessages();
      loadStats();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleMarkAsUnread = async (message) => {
    try {
      await messageService.updateStatus(message.id, "unread");
      loadMessages();
      loadStats();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case "project":
        return <AiOutlineStar className="text-yellow-500" />;
      case "contact":
      default:
        return <FiMail className="text-blue-500" />;
    }
  };

  const getMessageTypeLabel = (type) => {
    switch (type) {
      case "project":
        return "Project Inquiry";
      case "contact":
      default:
        return "Contact Message";
    }
  };

  const getProjectTypeIcon = (projectType) => {
    switch (projectType) {
      case "ML Solutions":
        return <FaRobot className="text-cyan-500" />;
      case "AI Integration":
        return <AiOutlineStar className="text-purple-500" />;
      case "Data Pipelines":
        return <FaCode className="text-emerald-500" />;
      case "Web Apps":
        return <FaBolt className="text-orange-500" />;
      default:
        return <FiCode className="text-gray-500" />;
    }
  };

  const columns = [
    {
      key: "status",
      title: "",
      render: (item) => (
        <div className="flex items-center gap-2">
          {getMessageTypeIcon(item.message_type)}
          {item.status === "unread" && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
      ),
    },
    {
      key: "full_name",
      title: "From",
      render: (item) => (
        <div>
          <div className="font-semibold text-gray-900">{item.full_name}</div>
          <div className="text-xs text-gray-500">{item.email}</div>
          <div className="text-xs text-gray-400 mt-1">
            {getMessageTypeLabel(item.message_type)}
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      title: "Subject",
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.subject}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">
            {item.message?.substring(0, 60)}...
          </div>
        </div>
      ),
    },
    {
      key: "status_badge",
      title: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "unread"
              ? "bg-blue-100 text-blue-800"
              : item.status === "read"
                ? "bg-gray-100 text-gray-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "created_at",
      title: "Date",
      render: (item) => (
        <div className="text-gray-600 text-sm">
          <div>{formatDate(item.created_at)}</div>
          {item.message_type === "project" && item.project_type && (
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              {getProjectTypeIcon(item.project_type)}
              <span>{item.project_type}</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  const tableActions = [
    {
      label: "View",
      handler: handleView,
      color: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      label: "Reply",
      handler: handleReply,
      color: "bg-green-500 text-white hover:bg-green-600",
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
                Contact Messages
              </h1>
              <p className="text-gray-600">
                View and respond to messages from visitors
              </p>
            </div>
            <button
              onClick={loadMessages}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Total Messages
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total || 0}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiMail className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Unread
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.unread || 0}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiMail className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Read
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.read || 0}
                </h3>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">
                <FaEnvelopeOpen className="text-2xl text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Replied
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.replied || 0}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FiCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Project Inquiries
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.project_inquiries || 0}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <AiOutlineStar className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Contact Messages
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.contact_messages || 0}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiMail className="text-2xl text-blue-600" />
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
                  placeholder="Search messages by name, email, or subject..."
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
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>

            {/* Message Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="contact">Contact Messages</option>
                <option value="project">Project Inquiries</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <FiMail className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              Messages from your contact form will appear here
            </p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredMessages}
            onRowClick={handleView}
            actions={tableActions}
          />
        )}

        {/* View Message Modal */}
        {showViewModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Message Details
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedMessage.message_type === "project"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedMessage.message_type === "project"
                        ? "Project Inquiry"
                        : "Contact Message"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Sender Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FiUser className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          From
                        </p>
                        <p className="text-gray-900 font-semibold">
                          {selectedMessage.full_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FiMail className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FiCalendar className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          Date
                        </p>
                        <p className="text-gray-900">
                          {formatDate(selectedMessage.created_at)}
                        </p>
                      </div>
                    </div>

                    {selectedMessage.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <FiPhone className="text-teal-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Phone
                          </p>
                          <a
                            href={`tel:${selectedMessage.phone}`}
                            className="text-gray-900 hover:text-teal-600 transition-colors"
                          >
                            {selectedMessage.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {selectedMessage.company && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <FiBriefcase className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Company
                          </p>
                          <p className="text-gray-900">
                            {selectedMessage.company}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedMessage.website && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <FiGlobe className="text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Website
                          </p>
                          <a
                            href={selectedMessage.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-indigo-600 transition-colors truncate"
                          >
                            {selectedMessage.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details - Only for project inquiries */}
                {selectedMessage.message_type === "project" && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <AiOutlineStar className="text-yellow-500" />
                      Project Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedMessage.project_type && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            {getProjectTypeIcon(selectedMessage.project_type)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                              Project Type
                            </p>
                            <p className="text-blue-900 font-semibold">
                              {selectedMessage.project_type}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedMessage.timeline && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FiClock className="text-green-500" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                              Timeline
                            </p>
                            <p className="text-blue-900 font-semibold">
                              {selectedMessage.timeline}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedMessage.budget_range && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FiDollarSign className="text-emerald-500" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                              Budget Range
                            </p>
                            <p className="text-blue-900 font-semibold">
                              {selectedMessage.budget_range}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Subject
                  </p>
                  <p className="text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {selectedMessage.subject}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Message
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Technical Info */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Technical Information
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">IP Address:</p>
                      <p className="text-gray-900 font-mono">
                        {selectedMessage.ip_address || "Not available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status:</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedMessage.status === "unread"
                            ? "bg-blue-100 text-blue-800"
                            : selectedMessage.status === "read"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedMessage.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reply if exists */}
                {selectedMessage.reply_message && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <FiCheckCircle className="text-green-500" />
                      Your Reply
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-green-800">
                          Reply Sent
                        </p>
                        <p className="text-xs text-green-600">
                          {formatDate(selectedMessage.replied_at)}
                        </p>
                      </div>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedMessage.reply_message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  {selectedMessage.status === "unread" && (
                    <button
                      onClick={() => {
                        handleMarkAsRead(selectedMessage);
                        setShowViewModal(false);
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium"
                    >
                      <FaEnvelopeOpen />
                      <span>Mark as Read</span>
                    </button>
                  )}

                  {selectedMessage.status === "read" && (
                    <button
                      onClick={() => {
                        handleMarkAsUnread(selectedMessage);
                        setShowViewModal(false);
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-medium"
                    >
                      <FiAlertCircle />
                      <span>Mark as Unread</span>
                    </button>
                  )}

                  {selectedMessage.status !== "replied" && (
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleReply(selectedMessage);
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      <FiSend />
                      <span>Reply</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleDelete(selectedMessage);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => setShowViewModal(false)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    <FiX />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Reply to Message
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedMessage.message_type === "project"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedMessage.message_type === "project"
                        ? "Project Inquiry"
                        : "Contact Message"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-1">
                    <strong className="text-gray-900">To:</strong>{" "}
                    {selectedMessage.full_name} ({selectedMessage.email})
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Subject:</strong>{" "}
                    {selectedMessage.subject}
                  </p>
                  {selectedMessage.message_type === "project" &&
                    selectedMessage.project_type && (
                      <p className="text-sm text-gray-700 mt-1">
                        <strong className="text-gray-900">Project Type:</strong>{" "}
                        {selectedMessage.project_type}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Type your reply here... Be professional and helpful. Consider including:
- Thank them for reaching out
- Address their specific inquiry
- Ask clarifying questions if needed
- Provide next steps
- Include your contact info"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Your reply will be sent via email and saved in the message
                    history.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={!replyText.trim() || sending}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend />
                    <span>{sending ? "Sending..." : "Send Reply"}</span>
                  </button>
                </div>
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
                Delete Message
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this message from "
                {selectedMessage?.full_name}"? This action cannot be undone.
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

export default AdminMessages;
