import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Review from "./pages/Review";

// Lazy imports disesuaikan dengan kebutuhan Furni House
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
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
const User = React.lazy(() => import("./pages/User"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail")); // Tambahkan ini
const FiturBaru = React.lazy(() => import("./pages/FiturBaru"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Rute Halaman Utama */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fitur-baru" element={<FiturBaru />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/analytic" element={<Analytic />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/review" element={<Review />} />
            <Route path="/user" element={<User />} />

            {/* RUTE ERROR (400, 401, 403) bawaan praktikum kamu */}
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
          </Route>

          {/* Rute Autentikasi */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
