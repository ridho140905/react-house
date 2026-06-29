import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { User, Mail, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    role: "member", // Default role
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
      const { data, error: signUpError } = await signUp(dataForm.email, dataForm.password, dataForm.name);

      if (signUpError) {
        throw signUpError;
      }

      // Supabase trigger automatically creates the profile as 'member'.
      // If user selected 'admin', we manually update it here (only for development/testing).
      if (data?.user && dataForm.role === 'admin') {
         await supabase.from('profiles').update({ role: 'admin' }).eq('id', data.user.id);
      }

      setSuccess("Pendaftaran berhasil! Silakan login dengan akun baru Anda.");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Cairo']">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">REGISTER</h1>
        <p className="text-sm text-gray-400">Buat akun baru Anda </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 p-4 text-sm font-medium text-red-600 rounded-2xl flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 text-lg shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 p-4 text-sm font-medium text-green-600 rounded-2xl flex items-center">
          <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {loading && !success && (
        <div className="mb-4 bg-[#F4F2FF] p-4 text-sm font-medium text-[#5D5FEF] rounded-2xl flex items-center">
          <ImSpinner2 className="mr-2 animate-spin shrink-0" />
          Memproses pendaftaran...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <div className="relative flex items-center">
            <User className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input type="text" id="name" name="name" value={dataForm.name} onChange={handleChange} className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal" placeholder="John Doe" disabled={loading} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input type="email" id="email" name="email" value={dataForm.email} onChange={handleChange} className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal" placeholder="you@example.com" disabled={loading} />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
          <div className="relative flex items-center">
            <ShieldCheck className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <select id="role" name="role" value={dataForm.role} onChange={handleChange} className="w-full pl-12 pr-4 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 cursor-pointer appearance-none" disabled={loading}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute right-4 text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={dataForm.password} onChange={handleChange} className="w-full pl-12 pr-12 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal" placeholder="********" disabled={loading} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-400 hover:text-[#5D5FEF] transition-colors">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-[#5D5FEF]" strokeWidth={2.5} />
            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={dataForm.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-12 py-2.5 bg-[#F4F2FF]/50 border border-gray-100 rounded-xl shadow-sm outline-none focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] font-semibold text-sm text-gray-700 placeholder-gray-400 placeholder:font-normal" placeholder="********" disabled={loading} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 text-gray-400 hover:text-[#5D5FEF] transition-colors">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={loading} className="w-full bg-[#5D5FEF] hover:bg-[#4a4cc7] disabled:bg-[#a5a6f6] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md transform active:scale-[0.99]">{loading ? "Loading..." : "Register Now"}</button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">Sudah punya akun?{' '}<Link to="/login" className="font-semibold text-[#5D5FEF] hover:text-[#4a4cc7]">Login di sini</Link></p>
      </form>
    </div>
  );
}