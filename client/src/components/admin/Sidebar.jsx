import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBriefcase, FiBook, FiUsers, FiMail, 
  FiPieChart, FiSettings, FiChevronDown, FiChevronRight, 
  FiLogOut, FiUser, FiMenu
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      icon: FiHome, 
      label: 'Dashboard' 
    },
    { 
      path: '/admin/projects', 
      icon: FiBriefcase, 
      label: 'Projects' 
    },
    { 
      icon: FiBook,
      label: 'Learning',
      submenu: [
        { path: '/admin/formations', label: 'Formations' },
        { path: '/admin/courses', label: 'Courses' },
        
      ]
    },
    { 
      path: '/admin/registrations', 
      icon: FiUsers, 
      label: 'Registrations' 
    },
    { 
      path: '/admin/messages', 
      icon: FiMail, 
      label: 'Messages',
      badge: 5
    },
    { 
      icon: FiPieChart,
      label: 'Analytics',
      submenu: [
        { path: '/admin/reports', label: 'Reports' },
        
      ]
    },
    { 
      path: '/admin/settings', 
      icon: FiSettings, 
      label: 'Settings' 
    }
  ];

  const toggleSubmenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Admin User';
    return user.name || user.username || user.email || 'Admin User';
  };

  // Get user role
  const getUserRole = () => {
    if (!user) return 'Administrator';
    return user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Administrator';
  };

  // Get initials for avatar
  const getUserInitials = () => {
    if (!user) return 'A';
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 shadow-2xl z-50`}>
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between backdrop-blur-sm">
        {!isCollapsed && (
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xs text-blue-200 mt-1">Management Dashboard</p>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 scale-105' 
                      : 'hover:bg-white/10 hover:translate-x-1'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  {location.pathname === item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 animate-pulse" />
                  )}
                  <div className="flex items-center relative z-10">
                    <item.icon className={`${isCollapsed ? '' : 'mr-3'} text-lg ${
                      location.pathname === item.path ? 'text-white' : 'text-blue-200'
                    }`} />
                    {!isCollapsed && (
                      <span className={`font-medium ${
                        location.pathname === item.path ? 'text-white' : 'text-gray-100'
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg relative z-10">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
                      expandedMenu === item.label ? 'bg-white/10' : 'hover:bg-white/10 hover:translate-x-1'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="flex items-center">
                      <item.icon className={`${isCollapsed ? '' : 'mr-3'} text-lg text-blue-200`} />
                      {!isCollapsed && <span className="font-medium text-gray-100">{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <div className={`transform transition-transform duration-300 ${
                        expandedMenu === item.label ? 'rotate-180' : ''
                      }`}>
                        <FiChevronDown className="text-blue-200" />
                      </div>
                    )}
                  </button>

                  {!isCollapsed && expandedMenu === item.label && (
                    <ul className="mt-2 ml-4 space-y-1 border-l-2 border-blue-400/30 pl-4 animate-slideDown">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`block p-2.5 rounded-lg transition-all duration-200 text-sm ${
                              location.pathname === subItem.path 
                                ? 'bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white font-semibold shadow-lg' 
                                : 'text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mr-2" />
                              {subItem.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - User Profile */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-white/10 space-y-3 backdrop-blur-sm">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-lg border border-white/10">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white/20">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={getUserDisplayName()}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-sm">
                  {getUserInitials()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate text-white">{getUserDisplayName()}</p>
              <p className="text-xs text-blue-200">{getUserRole()}</p>
              {user?.email && (
                <p className="text-xs text-blue-300 truncate">{user.email}</p>
              )}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 hover:text-white transition-all duration-200 font-medium border border-red-400/20 hover:border-red-400/40 group"
          >
            <FiLogOut className="mr-2 group-hover:animate-pulse" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        /* Collapsed state - smaller user info */
        <div className="p-4 border-t border-white/10 flex flex-col items-center space-y-3">
          <div 
            className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white/20 cursor-pointer"
            title={`${getUserDisplayName()} (${getUserRole()})`}
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={getUserDisplayName()}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                {getUserInitials()}
              </span>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-200 hover:text-white transition-colors p-2 hover:bg-red-500/20 rounded-lg"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;