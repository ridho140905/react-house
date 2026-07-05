import { useState, useEffect } from "react";
import PageHeader from "../components/Page.Header";
import { FaSearch, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Asumsi tabel `orders` memiliki kolom: id, user_id, total_price, points_earned, status, created_at
      // Kita join dengan tabel `profiles` untuk mendapatkan full_name pelanggan
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id ( full_name )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase.rpc('update_order_status', { p_id: id, p_status: newStatus });
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      alert("Gagal mengupdate status: " + err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return "text-green-600 bg-green-50";
      case 'processed': return "text-blue-600 bg-blue-50";
      default: return "text-orange-600 bg-orange-50"; // pending
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = order.profiles?.full_name || "Unknown";
    return customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           order.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <PageHeader title="Manajemen Pesanan" breadcrumb={["Orders"]} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-500 text-sm">
            Total <span className="text-[#4F45B6] font-bold">{orders.length}</span> pesanan masuk.
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari ID / Nama Pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 flex justify-center items-center text-gray-400">
              <FaSpinner className="animate-spin text-[#4F45B6] text-2xl" />
              <span className="ml-3 font-medium">Memuat pesanan...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 tracking-wider font-bold">
                  <th className="py-4 px-4">ID Transaksi</th>
                  <th className="py-4 px-4">Pelanggan</th>
                  <th className="py-4 px-4">Tanggal</th>
                  <th className="py-4 px-4">Total</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#4F45B6]">{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-4 font-semibold text-gray-800">{order.profiles?.full_name || "Unknown User"}</td>
                      <td className="py-4 px-4 text-gray-500">{formatDate(order.created_at)}</td>
                      <td className="py-4 px-4 font-bold text-gray-800">Rp {(order.total_price || 0).toLocaleString("id-ID")}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyle(order.status)}`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center space-x-2">
                          {(order.status === 'pending' || !order.status) && (
                            <button onClick={() => handleUpdateStatus(order.id, 'processed')} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" title="Proses Pesanan">
                              <FaCheck size={12} />
                            </button>
                          )}
                          {order.status === 'processed' && (
                            <button onClick={() => handleUpdateStatus(order.id, 'completed')} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors" title="Selesaikan Pesanan">
                              <FaCheck size={12} />
                            </button>
                          )}
                          {(order.status !== 'completed') && (
                            <button onClick={() => handleUpdateStatus(order.id, 'cancelled')} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors" title="Batalkan Pesanan">
                              <FaTimes size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-gray-400">
                      Tidak ada pesanan yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
