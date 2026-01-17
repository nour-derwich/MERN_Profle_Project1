import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiHome, FiUser, FiBookOpen, FiBriefcase,
  FiAward, FiMail, FiCode,
  FiChevronDown, FiExternalLink
} from 'react-icons/fi';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiPytorch } from 'react-icons/si';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    {
      path: '/',
      label: 'Home',
      icon: FiHome,
      highlight: false
    },
    {
      path: '/skills',
      label: 'Skills',
      icon: FiAward,
      highlight: true
    },
    {
      path: '/qualification',
      label: 'Qualification',
      icon: FiUser,
      highlight: false
    },
    {
      path: '/formations',
      label: 'Training',
      icon: FiBriefcase,
      highlight: false
    },
    {
      path: '/projects',
      label: 'Projects',
      icon: FiCode,
      highlight: true
    },
    {
      path: '/courses',
      label: 'Courses',
      icon: FiBookOpen,
      highlight: false
    },
    {
      path: '/contact',
      label: 'Contact',
      icon: FiMail,
      highlight: true
    }
  ];

  const techIcons = [FaPython, SiPytorch, FaReact];

  return (
    <>
      {/* Nav Background Blur */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 py-2"
            : "bg-gradient-to-b from-gray-900/90 to-transparent py-4"
        }`}
      >
        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with Animation */}
            <Link to="/" className="relative group">
              <div className="flex items-center gap-3">
                {/* Refined Logo Container */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full group-hover:bg-primary-500/40 transition-all duration-500" />

                  {/* The Logo Image */}
                  <div className="relative z-10 p-1.5 bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl group-hover:border-primary-500/50 transition-all duration-300">
                    <img
                      src="logo.png"
                      alt="NK Logo"
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tighter text-white">
                    NACEUR
                  </span>
                  <span className="text-[10px] text-primary-400 font-bold uppercase tracking-[0.2em]">
                    AI & Automation
                  </span>
                </div>
              </div>

              {/* Hover Underline Effect */}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;

                if (link.dropdown) {
                  return (
                    <div
                      key={link.path}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(link.path)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`
                        relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                        ${
                          location.pathname === link.path ||
                          location.pathname.startsWith(link.path + "/")
                            ? "text-white bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }
                      `}
                      >
                        <Icon
                          className={`${link.highlight ? "text-primary-400" : ""}`}
                        />
                        <span>{link.label}</span>
                        <FiChevronDown
                          className={`transition-transform duration-300 ${
                            activeDropdown === link.path ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`
                        absolute top-full left-0 mt-2 min-w-[200px] transition-all duration-300 origin-top
                        ${
                          activeDropdown === link.path
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }
                      `}
                      >
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden">
                          {link.dropdown.map((item) => {
                            const DropdownIcon = item.icon;
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 border-b border-gray-700/50 last:border-b-0 group/item"
                              >
                                <DropdownIcon className="text-primary-400 group-hover/item:scale-110 transition-transform" />
                                <span>{item.label}</span>
                                <FiExternalLink className="ml-auto text-xs opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink key={link.path} to={link.path}>
                    {({ isActive }) => (
                      <div
                        className={`
                    relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 group
                    ${
                      isActive
                        ? "text-white bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                      >
                        <Icon
                          className={`
                      ${link.highlight ? "text-primary-400 group-hover:scale-110 transition-transform" : ""}
                    `}
                        />
                        <span>{link.label}</span>

                        {/* Animated Dot */}
                        <div
                          className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300
                      ${
                        isActive
                          ? "bg-primary-400"
                          : "bg-transparent group-hover:bg-primary-400/50"
                      }
                    `}
                        />
                      </div>
                    )}
                  </NavLink>
                );
              })}

              {/* CTA Button */}
              <Link
                to="/contact"
                className="ml-2 group relative overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <span>Get in Touch</span>
                  <FiMail className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden p-3 rounded-xl backdrop-blur-sm transition-all duration-300 relative overflow-hidden
                ${
                  scrolled
                    ? "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-primary-500/30"
                    : "bg-gray-800/30 border border-gray-700/30 text-white"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              {isOpen ? (
                <FiX className="relative z-10" size={20} />
              ) : (
                <FiMenu className="relative z-10" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out
            ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <div
            className={`
              absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800/50
              transform transition-transform duration-500 ease-out
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-xl">
                  <FiCode className="text-primary-400 text-2xl" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Navigation</div>
                  <div className="text-sm text-gray-400">
                    Explore the portfolio
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Links */}
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;

                return (
                  <React.Fragment key={link.path}>
                    <NavLink
                      to={link.path}
                      className={`
                        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative
                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-primary-500/20 to-blue-500/20"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon
                        className={link.highlight ? "text-primary-400" : ""}
                      />
                      <span className="font-medium">{link.label}</span>

                      {isActive && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-400 rounded-full" />
                      )}
                    </NavLink>

                    {/* Dropdown Items */}
                    {link.dropdown && (
                      <div className="ml-4 pl-4 border-l border-gray-800/50 space-y-1">
                        {link.dropdown.map((item) => {
                          const DropdownIcon = item.icon;
                          const isDropdownActive =
                            location.pathname === item.path;

                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                                ${
                                  isDropdownActive
                                    ? "text-primary-300 bg-primary-500/10"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
                                }
                              `}
                              onClick={() => setIsOpen(false)}
                            >
                              <DropdownIcon className="text-xs" />
                              <span className="text-sm">{item.label}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Mobile CTA */}
              <Link
                to="/contact"
                className="block mt-6 mx-4 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                  <span>Start a Project</span>
                  <FiMail className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800/50">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">
                  Available for work
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="text-sm text-green-400 font-medium">
                    Open to Opportunities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-blue-500 transition-all duration-300"
          style={{
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
          }}
        />
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(90deg);
          }
          50% {
            transform: translateY(0) rotate(180deg);
          }
          75% {
            transform: translateY(5px) rotate(270deg);
          }
        }
        
        .animate-float {
          animation: float-icon 20s ease-in-out infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Nav;