import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    // If not authenticated or not an admin, redirect to the home page.
    return <Navigate to="/" replace />;
  }

  // If authenticated and an admin, render the protected content.
  return <>{children}</>;
};

export default AdminProtectedRoute;
