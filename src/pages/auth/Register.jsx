import { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
// Import ikon yang serasi dari lucide-react
import { User, Mail, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";

const API_URL = "https://ldjlujubthlehyhruqfp.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_Ax35tbMkLxWTxZF1H0jddA_kwjDao2g";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // State untuk sembunyikan/tampilkan password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    role: "Guest",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!dataForm.name || !dataForm.email || !dataForm.role || !dataForm.password || !dataForm.confirmPassword) {
      setError("Semua kolom wajib diisi.");
      setLoading(false);
      return;
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const checkResponse = await axios.get(
        `${API_URL}?email=eq.${encodeURIComponent(dataForm.email)}&select=*`,
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (checkResponse.data && checkResponse.data.length > 0) {
        setError("Email sudah terdaftar. Silakan gunakan email lain.");
        setLoading(false);
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dataForm.password, salt);

      const newUser = {
        name: dataForm.name,
        email: dataForm.email,
        role: dataForm.role,
        password: hashedPassword,
      };

      await axios.post(API_URL, newUser, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
      });

      setSuccess("Pendaftaran berhasil! Mengalihkan ke halaman login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Cairo']">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">REGISTER</h1>
        <p className="text-sm text-gray-400">Buat akun baru Anda </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 bg-red-100 p-4 text-sm font-medium text-red-600 rounded-2xl flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 text-lg shrink-0" />
          {error}
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-4 bg-green-100 p-4 text-sm font-medium text-green-600 rounded-2xl flex items-center">
          <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {/* Loading State */}
      {loading && !success && (
        <div className="mb-4 bg-[#F4F2FF] p-4 text-sm font-medium text-[#5D5FEF] rounded-2xl flex items-center">
          <ImSpinner2 className="mr-2 animate-spin shrink-0" />
          Memproses pendaftaran...
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input
              type="text"
              id="name"
              name="name"
              value={dataForm.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
        </div>

        {/* Input Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input
              type="type"
              id="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
        </div>

        {/* Input Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
            Role
          </label>
          <div className="relative flex items-center">
            <ShieldCheck className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <select
              id="role"
              name="role"
              value={dataForm.role}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 cursor-pointer appearance-none"
              disabled={loading}
            >
              <option value="Guest">Guest</option>
              <option value="Admin">Admin</option>
            </select>
            {/* Custom arrow untuk select agar tidak bertabrakan dengan teks */}
            <div className="pointer-events-none absolute right-4 text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Input Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal"
              placeholder="********"
              disabled={loading}
            />
            {/* Tombol intip password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-[#5D5FEF] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Input Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal"
              placeholder="********"
              disabled={loading}
            />
            {/* Tombol intip confirm password */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 text-gray-400 hover:text-[#5D5FEF] transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Button Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5D5FEF] hover:bg-[#4a4cc7] disabled:bg-[#a5a6f6] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md transform active:scale-[0.99]"
          >
            {loading ? "Loading..." : "Register Now"}
          </button>
        </div>

        {/* Link Kembali ke Login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-[#5D5FEF] hover:text-[#4a4cc7]">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}