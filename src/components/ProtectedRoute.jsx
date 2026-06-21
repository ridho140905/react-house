import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Ambil data user dari localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Jika tidak ada user (belum login), arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada allowedRoles (contoh: hanya admin yang boleh), kita bisa cek role
  // Jika tidak diisi allowedRoles-nya, berarti rute ini cuma butuh login saja (semua role)
  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    // Jika role tidak sesuai, arahkan ke error 403 atau dashboard sesuai role
    return <Navigate to="/error-403" replace />;
  }

  // Jika lolos semua pengecekan, render halaman yang dituju (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
