// src/pages/admin/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/components/login.css';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailNotFoundErr, setEmailNotFoundErr] = useState('');
  
  const { login, isAuthenticated, user, error, clearError } = useAuth();
  
  const from = location.state?.from?.pathname || '/admin/dashboard';


  // Handle redirect if already authenticated (on component mount)
  useEffect(() => {
    if (isAuthenticated) {
     
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear errors when form data changes
  useEffect(() => {
    clearError();
    setErrors({});
    setEmailNotFoundErr('');
  }, [formData.email, formData.password, clearError]);

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

  // Handle form submission - FIXED VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setEmailNotFoundErr('');

    try {
      console.log('🚀 Attempting login...', formData.email);
      const result = await login(formData.email, formData.password);
      
      console.log('📨 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful, checking localStorage...');
        
        // Check if token and user are stored in localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        console.log('🔑 Token in localStorage:', token ? 'Yes' : 'No');
        console.log('👤 User in localStorage:', userData ? 'Yes' : 'No');
        
        if (token && userData) {
          console.log('🎯 Navigating directly to:', from);
          // Navigate directly since we have the token and user data
          navigate(from, { replace: true });
        } else {
          console.log('❌ Token/user not found in localStorage');
          setEmailNotFoundErr('Login failed - no token received');
        }
      } else {
        console.log('❌ Login failed:', result.message);
        setEmailNotFoundErr(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('💥 Login error:', err);
      setEmailNotFoundErr('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login'>
      <section className="stark-login">
        <form onSubmit={handleSubmit}>	
          <div id="fade-box">
            <input 
              type="email" 
              onChange={handleChange} 
              name="email" 
              id="email" 
              placeholder="Email" 
              value={formData.email}
              disabled={isLoading}
            />
            {errors.email && (
              <p style={{color: 'white', backgroundColor: 'red', padding: '5px', margin: '5px 0', borderRadius: '3px'}}>
                {errors.email}
              </p>
            )}
            {emailNotFoundErr && (
              <p style={{color: 'white', backgroundColor: 'red', padding: '5px', margin: '5px 0', borderRadius: '3px'}}>
                {emailNotFoundErr}
              </p>
            )}
            
            <input 
              type="password" 
              onChange={handleChange}  
              placeholder="Password" 
              name='password' 
              value={formData.password}
              disabled={isLoading}
            />
            {errors.password && (
              <p style={{color: 'white', backgroundColor: 'red', padding: '5px', margin: '5px 0', borderRadius: '3px'}}>
                {errors.password}
              </p>
            )}
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button> 
          </div>
        </form>
        
        <div className="hexagons">
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <br/>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <br/>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span> 
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <br/>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <br/>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
          <span>&#x2B22;</span>
        </div>      
      </section> 
    </div>
  );
}

export default Login;