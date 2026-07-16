import React, { useState, useEffect } from "react";
import PageHeader from "../components/Page.Header";
import { supabase } from "../lib/supabaseClient";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomFurnitureAdmin() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_furniture')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    
    // Realtime subscription agar otomatis update saat ada pesanan baru
    const channel = supabase
      .channel('custom_furniture_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_furniture' }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleUpdateStatus = async (req, newStatus) => {
    if (!window.confirm(`Yakin ingin mengubah status pesanan menjadi ${newStatus}?`)) return;
    
    try {
      // Workaround: Menggunakan upsert (POST) alih-alih update (PATCH) 
      // karena beberapa Antivirus lokal sering memblokir request PATCH (Failed to fetch).
      const { error } = await supabase
        .from('custom_furniture')
        .upsert({ ...req, status: newStatus });
        
      if (error) throw error;
      
      // Update local state untuk responsivitas instan
      setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: newStatus } : r));
      alert(`Pesanan berhasil di-${newStatus.toLowerCase()}!`);
    } catch (err) {
      console.error("Gagal mengubah status:", err);
      alert("Terjadi kesalahan: " + (err.message || err.details || "Gagal update ke database"));
    }
  };

  return (
    <div className="pb-10 relative bg-[#fafafa] min-h-screen">
      <PageHeader title="Pesanan Custom Furniture" breadcrumb={["Dashboard", "Custom Furniture"]} />

      <div className="mx-5 mt-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="mb-6 pb-5 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Daftar Permintaan Custom Furniture</h2>
            <p className="text-xs text-gray-500 mt-1">Kelola dan tinjau pesanan kustomisasi furnitur dari pelanggan</p>
          </div>
          <div className="bg-[#F4F2FF] px-4 py-2 rounded-xl border border-[#E0DDF7] text-sm text-[#4F45B6] font-semibold flex items-center gap-2">
            <FiClock /> Total {requests.filter(r => r.status === 'Pending').length} Pending
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Memuat data pesanan...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-xl">
              Belum ada pesanan custom furniture yang masuk.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="font-bold text-gray-600 w-[200px]">Pelanggan</TableHead>
                  <TableHead className="font-bold text-gray-600">Spesifikasi</TableHead>
                  <TableHead className="font-bold text-gray-600">Catatan</TableHead>
                  <TableHead className="font-bold text-gray-600 text-center">Status</TableHead>
                  <TableHead className="font-bold text-gray-600 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-gray-50/40 transition-colors group">
                    {/* Pelanggan */}
                    <TableCell>
                      <p className="font-semibold text-gray-900">{req.name}</p>
                      <p className="text-xs text-gray-500">{req.email}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{new Date(req.created_at).toLocaleDateString()}</p>
                    </TableCell>
                    
                    {/* Spesifikasi */}
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 w-fit">{req.category}</span>
                        <span className="text-xs text-gray-600">Mat: <b>{req.material}</b></span>
                        <span className="text-xs text-gray-600">Col: <b>{req.color}</b></span>
                      </div>
                    </TableCell>
                    
                    {/* Catatan Khusus */}
                    <TableCell className="max-w-xs">
                      <p className="text-xs text-gray-500 truncate" title={req.details || '-'}>
                        {req.details || <span className="italic text-gray-300">Tidak ada catatan</span>}
                      </p>
                    </TableCell>
                    
                    {/* Status */}
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
                        req.status === 'Accepted' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : req.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </TableCell>
                    
                    {/* Aksi */}
                    <TableCell className="text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => handleUpdateStatus(req, 'Accepted')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 font-bold text-xs hover:bg-emerald-600 hover:text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                            title="Terima Pesanan"
                          >
                            <FiCheck className="w-4 h-4" /> Terima
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req, 'Rejected')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-700 font-bold text-xs hover:bg-rose-600 hover:text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                            title="Tolak Pesanan"
                          >
                            <FiX className="w-4 h-4" /> Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">Selesai</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
