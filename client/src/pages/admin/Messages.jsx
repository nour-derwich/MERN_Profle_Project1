import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import DataTable from '../../components/admin/DataTable';
import { 
  FiSearch, FiRefreshCw, FiMail,
  FiTrash2, FiSend, FiX, FiClock, FiCheckCircle
} from 'react-icons/fi';
import { FaEnvelopeOpen } from 'react-icons/fa';

import messageService from '../../services/messageService';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadMessages();
    loadStats();
  }, [filterStatus]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      
      const data = await messageService.getAll(filters);
      setMessages(data.data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await messageService.getStats();
      setStats(data.data || {});
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleView = async (message) => {
    try {
      const data = await messageService.getById(message.id);
      setSelectedMessage(data.data);
      setShowViewModal(true);
      // Reload to update unread count
      loadMessages();
      loadStats();
    } catch (error) {
      console.error('Error loading message:', error);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyText('');
    setShowReplyModal(true);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSending(true);
      await messageService.reply(selectedMessage.id, { reply_message: replyText });
      setShowReplyModal(false);
      setReplyText('');
      loadMessages();
      loadStats();
    } catch (error) {
      console.error('Error sending reply:', error);
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
      console.error('Error deleting message:', error);
    }
  };

  const handleMarkAsRead = async (message) => {
    try {
      await messageService.updateStatus(message.id, 'read');
      loadMessages();
      loadStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    { 
      key: 'status', 
      title: '',
      render: (item) => (
        <div className="flex items-center">
          {item.status === 'unread' ? (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          ) : item.status === 'replied' ? (
            <FiCheckCircle className="text-green-500" />
          ) : (
           <FaEnvelopeOpen className="text-gray-400" />
          )}
        </div>
      )
    },
    { 
      key: 'full_name', 
      title: 'From',
      render: (item) => (
        <div>
          <div className="font-semibold text-gray-900">{item.full_name}</div>
          <div className="text-xs text-gray-500">{item.email}</div>
        </div>
      )
    },
    { 
      key: 'subject', 
      title: 'Subject',
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.subject}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">
            {item.message?.substring(0, 60)}...
          </div>
        </div>
      )
    },
    { 
      key: 'status_badge', 
      title: 'Status',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          item.status === 'unread' 
            ? 'bg-blue-100 text-blue-800' 
            : item.status === 'read'
            ? 'bg-gray-100 text-gray-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {item.status}
        </span>
      )
    },
    { 
      key: 'created_at', 
      title: 'Date',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {formatDate(item.created_at)}
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
      label: 'Reply',
      handler: handleReply,
      color: 'bg-green-500 text-white hover:bg-green-600'
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
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              <span className="font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Messages</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.total || 0}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiMail className="text-2xl  from-blue-900 via-blue-800 to-blue-700 " />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Unread</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.unread || 0}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiMail className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Read</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.read || 0}</h3>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">
                <FaEnvelopeOpen className="text-2xl text-gray-600" />              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Replied</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.replied || 0}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FiCheckCircle className="text-2xl text-green-600" />
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">Messages from your contact form will appear here</p>
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
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Message Details</h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Sender Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">From</p>
                      <p className="text-gray-900 font-semibold">{selectedMessage.full_name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                      <p className="text-gray-900">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Date</p>
                    <p className="text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Subject</p>
                  <p className="text-lg font-bold text-gray-900">{selectedMessage.subject}</p>
                </div>

                {/* Message */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Message</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Reply if exists */}
                {selectedMessage.reply_message && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Your Reply</p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.reply_message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Replied on {formatDate(selectedMessage.replied_at)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleReply(selectedMessage);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
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
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <FiTrash2 />
                    <span>Delete</span>
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
                  <h3 className="text-2xl font-bold text-gray-900">Reply to Message</h3>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>To:</strong> {selectedMessage.full_name} ({selectedMessage.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Re:</strong> {selectedMessage.subject}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Type your reply here..."
                  />
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
                    <span>{sending ? 'Sending...' : 'Send Reply'}</span>
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
                Are you sure you want to delete this message from "{selectedMessage?.full_name}"? This action cannot be undone.
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