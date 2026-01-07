// src/pages/public/NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-700"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          {/* Logo glow effect */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative">
              {/* NK Logo from your loading screen */}
              <div className="relative mb-8">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
                <div className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  NK
                </div>
              </div>

              {/* 404 Number with gradient */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
                <h1 className="relative text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                  404
                </h1>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-300/80 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry—let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Home button */}
            <a
              href="/"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700"></div>
              {/* Button shine effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Return Home
              </span>
            </a>

            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-700 hover:border-gray-600 bg-gray-900/50 backdrop-blur-sm"
            >
              <span className="relative flex items-center gap-3 text-gray-300 group-hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </span>
            </button>
          </div>

          {/* Search suggestion */}
          <div className="mt-12 p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 max-w-md mx-auto">
            <p className="text-gray-400 mb-4">
              Looking for something specific?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search my portfolio..."
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-10">
            <p className="text-gray-500 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "Projects", path: "/projects" },
                { label: "Skills", path: "/skills" },
                { label: "Formations", path: "/formations" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  className="px-5 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 border border-gray-800 hover:border-gray-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Decorative line */}
          <div className="mt-12 relative">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-gray-900">
              <span className="text-gray-600 text-sm">404 Error</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI/ML elements (matches your theme) */}
      <div className="absolute top-10 right-10 opacity-10">
        <div className="text-2xl font-mono">{"{ }"}</div>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="text-xl font-mono">AI/ML</div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default NotFound;
