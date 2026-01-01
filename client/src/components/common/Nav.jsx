import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUser, FiBookOpen, FiBriefcase, FiAward, FiMail } from 'react-icons/fi';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/skills', label: 'Skills', icon: FiAward },
    { path: '/qualification', label: 'Qualification', icon: FiUser },
    { path: '/services', label: 'Services', icon: FiBriefcase },
    { path: '/projects', label: 'Projects', icon: FiBriefcase },
    { path: '/formations', label: 'Training', icon: FiBookOpen },
    { path: '/courses', label: 'Courses', icon: FiBookOpen },
    { path: '/contact', label: 'Contact', icon: FiMail }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-primary-600' : 'text-white'
            }`}
          >
            MyPortfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${
                    scrolled
                      ? isActive
                        ? 'text-white bg-primary-600'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      : isActive
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white hover:bg-white/10 backdrop-blur-sm'
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-gray-700 hover:bg-primary-50'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen mt-4' : 'max-h-0'
          }`}
        >
          <div
            className={`py-4 rounded-xl ${
              scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-6 py-3 font-medium transition-colors
                    ${
                      isActive
                        ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }
                  `}
                >
                  <Icon className="text-xl" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
