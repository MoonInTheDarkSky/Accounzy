import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboard from './pages/ClientDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import BillScanner from './pages/BillScanner';
import PrivacyCenter from './pages/PrivacyCenter';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'client':
        return <Navigate to="/client/dashboard" replace />;
      case 'accountant':
        return <Navigate to="/accountant/dashboard" replace />;
      case 'super_admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/scan"
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <BillScanner />
                </ProtectedRoute>
              }
            />

            {/* Accountant Routes */}
            <Route
              path="/accountant/dashboard"
              element={
                <ProtectedRoute allowedRoles={['accountant']}>
                  <AccountantDashboard />
                </ProtectedRoute>
              }
            />

            {/* Super Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Shared Routes */}
            <Route
              path="/privacy"
              element={
                <ProtectedRoute>
                  <PrivacyCenter />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
