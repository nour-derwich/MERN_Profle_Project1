// src/pages/admin/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLogIn, FiHexagon } from 'react-icons/fi';
import { FaTerminal } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Add this import
import '../../styles/components/login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth(); // Get auth functions from context
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(''); // Renamed from emailNotFoundErr
  const [showPassword, setShowPassword] = useState(false);
  const [binaryText] = useState(generateBinary());
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Generate binary text for background
  function generateBinary() {
    let binary = '';
    for (let i = 0; i < 200; i++) {
      binary += Math.random() > 0.5 ? '1' : '0';
      if (i % 40 === 0 && i !== 0) binary += '\n';
    }
    return binary;
  }

  // Clear errors when form data changes
  useEffect(() => {
    setErrors({});
    setApiError('');
  }, [formData.email, formData.password]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');
    setLoginAttempts(prev => prev + 1);

    try {
      console.log('🔐 Login attempt:', formData.email);
      
      // Use the actual login function from AuthContext
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login successful');
        navigate(from, { replace: true });
      } else {
        // Handle API error response
        setApiError(result.message || 'Login failed. Check your credentials.');
        console.error('💥 Login failed:', result.message);
      }
    } catch (err) {
      // Handle unexpected errors
      console.error('💥 Unexpected login error:', err);
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#80808012_1px,transparent_1px),linear-gradient(180deg,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Binary Code Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <pre className="font-mono text-xs text-primary-400/20 absolute top-0 left-0 w-full h-full animate-binary-scroll">
            {binaryText}
          </pre>
        </div>
        
        {/* Floating Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Scanning Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-scan" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/30 backdrop-blur-sm">
            <FiLock className="text-3xl text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SYSTEM ACCESS
          </h1>
          <p className="text-gray-400 text-lg">Enter credentials to access admin panel</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="group relative">
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
              
              {/* Terminal Header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/50">
                <FaTerminal className="text-primary-400 text-xl" />
                <div className="flex-1">
                  <div className="text-white font-mono text-sm">admin@naceur-dev:~$</div>
                  <div className="text-gray-500 text-xs">secure login terminal</div>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-primary-400" />
                      <span>EMAIL ADDRESS</span>
                    </div>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 pl-12 py-3.5 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all duration-300"
                        placeholder="admin@naceur-dev.com"
                        autoComplete="username"
                      />
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2 animate-shake">
                      <span className="w-2 h-2 bg-red-400 rounded-full" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-8">
                  <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">
                    <div className="flex items-center gap-2">
                      <FiLock className="text-primary-400" />
                      <span>PASSWORD</span>
                    </div>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 pl-12 pr-12 py-3.5 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all duration-300"
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-400 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2 animate-shake">
                      <span className="w-2 h-2 bg-red-400 rounded-full" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {apiError && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <div className="text-sm text-red-300">{apiError}</div>
                    </div>
                    {loginAttempts > 2 && (
                      <div className="mt-2 text-xs text-red-400/70">
                        Attempt #{loginAttempts} • Reset password if needed
                      </div>
                    )}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>ACCESSING SYSTEM...</span>
                      </>
                    ) : (
                      <>
                        <FiLogIn className="text-xl" />
                        <span>INITIATE LOGIN SEQUENCE</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {!isLoading && (
                    <div className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </button>

                {/* Attempt Counter */}
                {loginAttempts > 0 && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/30 rounded-full">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400 font-mono">
                        LOGIN ATTEMPTS: <span className="text-primary-300">{loginAttempts}</span>
                      </span>
                    </div>
                  </div>
                )}
              </form>

              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiHexagon className="text-primary-400/50" />
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>System Secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              For authorized personnel only • Unauthorized access is prohibited
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-600">
              <span>v1.0.0</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span>Last updated: Today</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span>Portfolio Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Hexagon Decoration */}
        <div className="absolute bottom-8 right-8 opacity-10">
          <div className="relative">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-primary-400/20 rounded-full animate-spin-slow"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transform: `scale(${1 + i * 0.2})`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;