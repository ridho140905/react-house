import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Review from "./pages/Review";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute baru

// Lazy imports disesuaikan dengan kebutuhan Furni House
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Product = React.lazy(() => import("./pages/Product"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Sale = React.lazy(() => import("./pages/Sale"));

// 1. TAMBAHKAN LAZY IMPORT UNTUK CHAT DAN ANALYTIC DI SINI
const Analytic = React.lazy(() => import("./pages/Analytic"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Orders = React.lazy(() => import("./pages/Orders"));
const MembershipAdmin = React.lazy(() => import("./pages/MembershipAdmin"));
const WarrantyAdmin = React.lazy(() => import("./pages/WarrantyAdmin"));
const User = React.lazy(() => import("./pages/User"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail")); // Tambahkan ini
const CustomFurnitureAdmin = React.lazy(() => import("./pages/CustomFurnitureAdmin"));
const GuestDashboard = React.lazy(() => import("./pages/GuestDashboard"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const Membership = React.lazy(() => import("./pages/Membership")); 
const MyMembership = React.lazy(() => import("./pages/MyMembership")); 
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Redirect root ( / ) langsung ke Jalur Publik (Guest) secara default */}
          <Route path="/" element={<Navigate to="/guest-dashboard" replace />} />

          {/* =========================================
              1. JALUR PUBLIK (Akses Bebas Tanpa Login)
              ========================================= */}
          <Route element={<GuestLayout />}>
            <Route path="/guest-dashboard" element={<GuestDashboard />} />
            {/* Halaman Membership juga bisa diakses publik (sebagai landing penawaran) */}
            <Route path="/membership" element={<Membership />} />
            <Route path="/my-membership" element={<MyMembership />} /> {/* Rute baru untuk klaim */}
          </Route>

          {/* =========================================
              2. JALUR PROTEKSI (Harus Login Dulu)
              ========================================= */}
          <Route element={<ProtectedRoute />}>
            {/* Layout khusus Admin (Sidebar + Navigation) */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/custom-furniture" element={<CustomFurnitureAdmin />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/analytic" element={<Analytic />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/membership-admin" element={<MembershipAdmin />} />
              <Route path="/warranty-admin" element={<WarrantyAdmin />} />
              <Route path="/review" element={<Review />} />
              <Route path="/user" element={<User />} />
            </Route>

            {/* Layout khusus Member (Hanya Navigation atas, tanpa Sidebar Admin) */}
            <Route element={<MemberLayout />}>
              <Route path="/member-dashboard" element={<MemberDashboard />} />
            </Route>
          </Route>

          {/* =========================================
              3. JALUR AUTENTIKASI
              ========================================= */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* =========================================
              4. RUTE ERROR (400, 401, 403, 404)
              ========================================= */}
          <Route
            path="/error-400"
            element={
              <ErrorPage
                kodeError="400"
                deskripsiError="Bad Request! Ada yang salah dengan permintaanmu."
                gambarError="https://illustrations.popsy.co/blue/crashed-error.svg"
              />
            }
          />
          <Route
            path="/error-401"
            element={
              <ErrorPage
                kodeError="401"
                deskripsiError="Unauthorized! Kamu harus login dulu."
                gambarError="https://illustrations.popsy.co/blue/web-design.svg"
              />
            }
          />
          <Route
            path="/error-403"
            element={
              <ErrorPage
                kodeError="403"
                deskripsiError="Forbidden! Akses ditolak masuk ke halaman ini."
                gambarError="https://illustrations.popsy.co/blue/surreal-hourglass.svg"
              />
            }
          />
          {/* Rute * (Bintang) untuk 404 Not Found. Taruh di paling bawah! */}
          <Route
            path="*"
            element={
              <ErrorPage
                kodeError="404"
                deskripsiError="Halaman Tidak Ditemukan. Sepertinya link yang kamu tuju sudah pindah atau tidak ada."
                gambarError="https://illustrations.popsy.co/blue/web-design.svg"
              />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
