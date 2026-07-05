import { useState, useEffect } from "react";
import PageHeader from "../components/Page.Header";
import { FaSearch, FaCheck, FaTimes, FaImage, FaToolbox, FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";

export default function WarrantyAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk modal foto
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fetch data from Supabase
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('warranty_claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error("Error fetching warranty tickets:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Update status in Supabase via RPC to bypass PATCH block
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .rpc('update_warranty_status', { p_id: id, p_status: newStatus });

      if (error) throw error;

      // Update local state to reflect changes instantly
      setTickets(tickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      ));
    } catch (error) {
      console.error("Error updating status:", error.message);
      alert("Gagal mengupdate status tiket: " + error.message);
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    (ticket.trx_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (ticket.customer_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selesai':
      case 'Disetujui':
        return 'text-green-600 bg-green-50';
      case 'Ditolak':
        return 'text-red-600 bg-red-50';
      case 'Diproses Teknisi':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div>
      <PageHeader title="Klaim Garansi" breadcrumb={["After-Sales", "Warranty"]} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <FaToolbox className="text-[#4F45B6]" />
            Total <span className="text-[#4F45B6] font-bold">{tickets.length}</span> tiket garansi bulan ini.
          </div>
          <div className="relative w-full md:w-72 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Cari No. TRX / Nama Pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            </div>
            <button 
              onClick={fetchTickets}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
              title="Refresh Data"
            >
              <FaSpinner className={`${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 tracking-wider font-bold">
                <th className="py-4 px-4">Tanggal</th>
                <th className="py-4 px-4">No. Transaksi</th>
                <th className="py-4 px-4">Pelanggan</th>
                <th className="py-4 px-4 w-1/3">Detail Masalah</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Bukti Foto</th>
                <th className="py-4 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    Memuat data tiket garansi...
                  </td>
                </tr>
              ) : filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-500 whitespace-nowrap">
                      {new Date(ticket.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#4F45B6]">{ticket.trx_id}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{ticket.customer_name}</td>
                    <td className="py-4 px-4 text-gray-600 line-clamp-2">{ticket.issue}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {ticket.photo_url ? (
                        <button 
                          onClick={() => setSelectedPhoto(ticket.photo_url)}
                          className="text-[#4F45B6] bg-[#F4F2FF] p-2 rounded-lg mx-auto flex justify-center hover:bg-[#EBE9FE] transition-colors" 
                          title="Lihat Foto"
                        >
                          <FaImage size={14} />
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        {ticket.status !== 'Disetujui' && ticket.status !== 'Selesai' && (
                          <button 
                            onClick={() => handleUpdateStatus(ticket.id, 'Disetujui')}
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors" 
                            title="Setujui Klaim"
                          >
                            <FaCheck size={12} />
                          </button>
                        )}
                        {ticket.status !== 'Ditolak' && (
                          <button 
                            onClick={() => handleUpdateStatus(ticket.id, 'Ditolak')}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors" 
                            title="Tolak Klaim"
                          >
                            <FaTimes size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    Tidak ada tiket garansi yang sesuai pencarian atau tabel masih kosong.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Foto */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex justify-center items-center">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 md:-right-12 text-white hover:text-gray-300 bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <FiX className="w-6 h-6" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Bukti Foto Klaim" 
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
