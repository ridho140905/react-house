import React from "react";
import PageHeader from "../components/Page.Header";

export default function FiturBaru() {
  return (
    <div id="fitur-baru-container" className="pb-10 relative">
      {/* Page Header */}
      <PageHeader title="Fitur Baru" breadcrumb={["Dashboard", "Fitur Baru"]} />

      {/* Konten Utama Kosong */}
      <div className="mx-5 p-8 bg-white rounded-2xl shadow-sm mt-4 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-bold text-gray-700">Konten Belum Tersedia</h2>
          <p className="text-gray-500 text-sm">
            Ini adalah halaman fitur baru yang masih kosong. Anda dapat menambahkan modul, grafik, atau tabel di bagian ini nanti.
          </p>
        </div>
      </div>
    </div>
  );
}
