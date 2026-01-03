const User = require("../models/user.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user.id);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, full_name } = req.body;

  // Check if user exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  const user = await User.create({ username, email, password, full_name });
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt:', { email });

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  // Find user
  const user = await User.findByEmail(email);
  
  if (!user) {
    console.log('❌ User not found:', email);
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  console.log('✅ User found:', {
    id: user.id,
    email: user.email,
    password_hash_present: !!user.password_hash,
    password_hash_sample: user.password_hash ? user.password_hash.substring(0, 30) + '...' : 'none'
  });

  // Check password - IMPORTANT: Try different methods
  let isMatch = false;
  
  try {
    // Method 1: If User model has verifyPassword static method
    if (User.verifyPassword) {
      console.log('🔑 Using User.verifyPassword static method');
      isMatch = await User.verifyPassword(password, user.password_hash);
    }
    // Method 2: If user instance has checkPassword method
    else if (user.checkPassword) {
      console.log('🔑 Using user.checkPassword instance method');
      isMatch = await user.checkPassword(password);
    }
    // Method 3: Direct bcrypt compare
    else {
      console.log('🔑 Using direct bcrypt.compare');
      const bcrypt = require("bcrypt");
      isMatch = await bcrypt.compare(password, user.password_hash);
    }
    
    console.log('✅ Password match result:', isMatch);
    
  } catch (error) {
    console.error('❌ Password comparison error:', error.message);
    return next(new ErrorResponse("Authentication error", 500));
  }

  if (!isMatch) {
    console.log('❌ Password does not match');
    
    // Debug: Check if password is stored in plain text (temporary for debugging)
    if (user.password_hash === password) {
      console.log('⚠️  WARNING: Password is stored in PLAIN TEXT!');
      console.log('⚠️  Please run the password reset script to fix this.');
    }
    
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  console.log('🎉 Login successful for:', email);

  // Check if user is active
  if (user.is_active === false) {
    console.log('❌ User account is inactive');
    return next(new ErrorResponse("Your account has been deactivated", 401));
  }

  // Update last login
  if (User.updateLastLogin) {
    await User.updateLastLogin(user.id);
  }

  // Generate token
  const token = generateToken(user.id);

  // Remove password from response
  user.password_hash = undefined;

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },
  });
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByEmail(req.user.email);
  const isMatch = await User.verifyPassword(
    currentPassword,
    user.password_hash
  );

  if (!isMatch) {
    return next(new ErrorResponse("Current password is incorrect", 401));
  }

  // Update password logic here...

  sendTokenResponse(user, 200, res);
});
