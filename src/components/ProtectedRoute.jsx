import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Jika tidak ada session (belum login), arahkan ke halaman login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada allowedRoles (contoh: hanya admin yang boleh), kita bisa cek role
  if (allowedRoles && profile && !allowedRoles.includes(profile.role?.toLowerCase())) {
    // Jika role tidak sesuai, arahkan ke error 403 atau dashboard sesuai role
    return <Navigate to="/error-403" replace />;
  }

  // Jika lolos semua pengecekan, render halaman yang dituju (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
