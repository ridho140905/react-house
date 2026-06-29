import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import LoginInput from "../../components/login/Logininput";
import LoginButton from "../../components/login/Loginbutton";
import LoginDivider from "../../components/login/Logindivider";
import SocialLoginButton from "../../components/login/Socialloginbutton";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signIn(dataForm.email, dataForm.password);

      if (error) {
        setError(error.message);
        return;
      }

      // Ambil role dari tabel profiles untuk menentukan arah redirect
      if (data?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const userRole = profileData?.role?.toLowerCase() || 'member';

        if (userRole === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/member-dashboard");
        }
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Cairo']">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">LOGIN</h1>
        <p className="text-sm text-gray-400">Masuk ke akun Anda untuk melanjutkan</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-100 p-4 text-sm font-medium text-red-600 rounded-2xl flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 text-lg shrink-0" />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mb-4 bg-[#F4F2FF] p-4 text-sm font-medium text-[#5D5FEF] rounded-2xl flex items-center">
          <ImSpinner2 className="mr-2 animate-spin shrink-0" />
          Mohon Tunggu...
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <LoginInput type="text" name="email" placeholder="Email Address" icon="user" value={dataForm.email} onChange={handleChange} />
        <LoginInput type="password" name="password" placeholder="Password" icon="lock" value={dataForm.password} onChange={handleChange} />
        <div className="pt-1">
          <LoginButton label={loading ? "Loading..." : "Login Now"} type="submit" fullWidth disabled={loading} />
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-[#5D5FEF] hover:text-[#4a4cc7]">
            Daftar di sini
          </Link>
        </p>
        <LoginDivider />
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="facebook" />
      </form>
    </div>
  );
}