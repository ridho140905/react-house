import { useState, useEffect } from "react";
import PageHeader from "../components/Page.Header";
import { FaSearch, FaStar, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Review() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    if(window.confirm("Setujui ulasan ini?")) {
      try {
        const { error } = await supabase.rpc('update_review_status', { p_id: id, p_status: 'Approved' });
        if (error) throw error;
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
      } catch (error) {
        alert("Gagal menyetujui ulasan: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Hapus ulasan ini?")) {
      try {
        const { error } = await supabase.rpc('delete_review', { p_id: id });
        if (error) throw error;
        setReviews(reviews.filter(r => r.id !== id));
      } catch (error) {
        alert("Gagal menghapus ulasan: " + error.message);
      }
    }
  };

  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = (rev.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (rev.product || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || rev.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <PageHeader title="Review" subtitle="Manage and monitor customer reviews" />

      {/* Bagian Search Bar dan Tools */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-gray-500 text-sm">
          Menampilkan <span className="text-purple-600 font-bold">{filteredReviews.length}</span> ulasan pelanggan.
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Cari nama atau produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-all shadow-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none text-gray-700 bg-white focus:border-purple-500 transition-colors shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Grid Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-16 flex flex-col items-center justify-center text-gray-400">
            <FaSpinner className="animate-spin text-purple-600 mb-2" size={24} />
            <p>Memuat data ulasan...</p>
          </div>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-gray-50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header Review */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Product Name */}
                <div className="text-xs text-gray-500 mb-2">
                  Produk: <span className="text-purple-600 font-semibold">{item.product || 'Umum'}</span>
                </div>

                {/* Rating Bintang */}
                <div className="flex items-center text-yellow-400 text-sm mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {Array.from({ length: 5 - item.rating }).map((_, i) => (
                    <FaStar key={i} className="text-gray-200" />
                  ))}
                  <span className="text-gray-400 text-xs ml-2">({item.rating}.0)</span>
                </div>

                {/* Komentar */}
                <p className="text-gray-600 text-sm italic border-l-2 border-purple-200 pl-3 py-1 bg-gray-50 rounded-r-lg">
                  "{item.comment}"
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end space-x-2 mt-5 pt-3 border-t border-gray-100">
                {item.status === 'Pending' && (
                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                  >
                    <FaCheck size={12} /> Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <FaTimes size={12} /> Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center text-gray-400">
            Ulasan yang dicari tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}