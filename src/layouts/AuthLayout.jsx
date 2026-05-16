import { Outlet } from "react-router-dom";
import LoginBanner from "../components/login/Loginbanner";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen font-['Cairo']">
      {/* Kiri: Form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-sm px-8">
          <Outlet />
        </div>
      </div>

      {/* Kanan: Banner — sticky agar full tinggi */}
      <div className="hidden lg:block w-[55%] sticky top-0 h-screen">
        <LoginBanner />
      </div>
    </div>
  );
}