// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

// Public Components
import Nav from "./components/common/Nav";
import Footer from "./components/common/Footer";
 //import ScrollToTop from "./components/common/ScrollToTop";

// Public Pages

import Home from "./pages/public/Home";
import Skills from "./pages/public/Skills";
import Qualification from "./pages/public/Qualification";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import ProjectDetail from "./pages/public/ProjectDetail";
import Formations from "./pages/public/Formations";
import FormationDetail from "./pages/public/FormationDetail";
import Courses from "./pages/public/Courses";
import Contact from "./pages/public/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminProjectForm from "./pages/admin/ProjectForm";
import AdminFormations from "./pages/admin/Formations";
import AdminFormationForm from "./pages/admin/FormationForm";
import AdminCourses from "./pages/admin/Courses";
import AdminCourseForm from "./pages/admin/CourseForm";
import AdminRegistrations from "./pages/admin/Registrations";
import AdminMessages from "./pages/admin/Messages";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute";
// Styles
import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              {/* <ScrollToTop /> */}

              {/* Public Routes */}
              <Routes>
                {/* Public routes with navigation */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Nav />
                      <main className="min-h-screen">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/skills" element={<Skills />} />
                          <Route
                            path="/qualification"
                            element={<Qualification />}
                          />
                          <Route path="/services" element={<Services />} />
                          <Route path="/projects" element={<Projects />} />
                          <Route
                            path="/projects/:id"
                            element={<ProjectDetail />}
                          />
                          <Route path="/formations" element={<Formations />} />
                          <Route
                            path="/formations/:id"
                            element={<FormationDetail />}
                          />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/contact" element={<Contact />} />

                          {/* 404 Page */}
                          <Route
                            path="*"
                            element={
                              <div className="container mx-auto px-4 py-16 text-center">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                  404 - Page Not Found
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                  The page you're looking for doesn't exist.
                                </p>
                                <a
                                  href="/"
                                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  Go Back Home
                                </a>
                              </div>
                            }
                          />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />

                {/* Admin Login (no navigation) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Routes (protected) */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="projects" element={<AdminProjects />} />
                        <Route
                          path="projects/new"
                          element={<AdminProjectForm />}
                        />
                        <Route
                          path="projects/edit/:id"
                          element={<AdminProjectForm />}
                        />
                        <Route
                          path="formations"
                          element={<AdminFormations />}
                        />
                        <Route
                          path="formations/new"
                          element={<AdminFormationForm />}
                        />
                        <Route
                          path="formations/edit/:id"
                          element={<AdminFormationForm />}
                        />
                        <Route path="courses" element={<AdminCourses />} />
                        <Route
                          path="courses/new"
                          element={<AdminCourseForm />}
                        />
                        <Route
                          path="courses/edit/:id"
                          element={<AdminCourseForm />}
                        />
                        <Route
                          path="registrations"
                          element={<AdminRegistrations />}
                        />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="reports" element={<AdminReports />} />
                        <Route path="settings" element={<AdminSettings />} />

                        {/* Redirect to dashboard for admin root */}
                        <Route
                          path="/admin/dashboard"
                          element={
                            <ProtectedRoute>
                              <AdminDashboard />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
