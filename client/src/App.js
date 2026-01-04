// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

// Public Components
import Nav from "./components/common/Nav";
import Footer from "./components/common/Footer";
import NotFound from "./pages/public/NotFound";

// import ScrollToTop from "./components/common/ScrollToTop";

// Public Pages
import Home from "./pages/public/Home";
import Skills from "./pages/public/Skills";
import Qualification from "./pages/public/Qualification";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import ProjectDetail from "./pages/public/ProjectDetail";
import Formations from "./pages/public/Formations";
// import FormationDetail from "./pages/public/FormationDetail";
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

// Layout Components
const PublicLayout = () => (
  <>
    <Nav />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

const AdminLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              {/* <ScrollToTop /> */}

              <Routes>
                {/* Public routes with layout */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/qualification" element={<Qualification />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/formations" element={<Formations />} />
                  {/* <Route path="/formations/:id" element={<FormationDetail />} /> */}
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Login (no layout) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin routes with protected layout */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route
                    path="/admin/projects/new"
                    element={<AdminProjectForm />}
                  />
                  <Route
                    path="/admin/projects/edit/:id"
                    element={<AdminProjectForm />}
                  />
                  <Route
                    path="/admin/formations"
                    element={<AdminFormations />}
                  />
                  <Route
                    path="/admin/formations/new"
                    element={<AdminFormationForm />}
                  />
                  <Route
                    path="/admin/formations/edit/:id"
                    element={<AdminFormationForm />}
                  />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route
                    path="/admin/courses/new"
                    element={<AdminCourseForm />}
                  />
                  <Route
                    path="/admin/courses/edit/:id"
                    element={<AdminCourseForm />}
                  />
                  <Route
                    path="/admin/registrations"
                    element={<AdminRegistrations />}
                  />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />

                  {/* Redirect admin root to dashboard */}
                  <Route
                    path="/admin"
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                </Route>
              </Routes>
            </div>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
