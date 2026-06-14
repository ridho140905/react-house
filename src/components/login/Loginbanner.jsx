import React from "react";
import furniture from "../../assets/furniture.jpg";

const LoginBanner = () => {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      {/* Gambar furniture memenuhi seluruh area */}
      <img
        src={furniture}
        alt="Furniture Store"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay gelap tipis agar teks mudah dibaca */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Teks di atas gambar */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <h2
          className="text-white font-bold leading-tight font-['Cairo'] text-5xl mb-4"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          Temukan<br />Furnitur<br />Terbaik
        </h2>
        <p className="text-white/80 text-lg font-['Cairo']">
          Koleksi furnitur premium untuk hunian impian Anda.
        </p>
      </div>
    </div>
  );
};

export default LoginBanner;