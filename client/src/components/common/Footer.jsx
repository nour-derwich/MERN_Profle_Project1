import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/qualification', label: 'Qualification' },
    { path: '/services', label: 'Services' }
  ];

  const resources = [
    { path: '/projects', label: 'Projects' },
    { path: '/formations', label: 'Training' },
    { path: '/courses', label: 'Courses' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: FiFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MyPortfolio</h3>
            <p className="text-primary-200 mb-4 leading-relaxed">
              Full Stack Developer passionate about creating modern and high-performance web experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-primary-200">
                <FiMail className="text-xl mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@example.com" className="hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-primary-200">
                <FiPhone className="text-xl mt-0.5 flex-shrink-0" />
                <a href="tel:+21612345678" className="hover:text-white transition-colors">
                  +216 12 345 678
                </a>
              </li>
              <li className="flex items-start space-x-3 text-primary-200">
                <FiMapPin className="text-xl mt-0.5 flex-shrink-0" />
                <span>Tunis, Tunisia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-200 text-sm text-center md:text-left">
              © {currentYear} MyPortfolio. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-primary-200 text-sm">
              <span>Made with</span>
              <FiHeart className="text-red-400 animate-pulse" />
              <span>in Tunisia</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-200 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-primary-200 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
