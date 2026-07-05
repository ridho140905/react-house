import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { FaArrowLeft, FaBox } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Ambil data produk dari Supabase berdasarkan ID
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#4F45B6] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-semibold font-['Cairo']">Memuat detail produk...</p>
      </div>
    );
  }

  // Jika data tidak ditemukan
  if (!product) {
    return (
      <div className="p-10 text-center min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 font-['Cairo']">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Product Not Found!</h2>
        <p className="text-gray-500 font-medium mb-6">Produk yang Anda cari tidak ada atau sudah dihapus dari sistem.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-3 bg-[#4F45B6] text-white rounded-xl font-bold shadow-md hover:bg-[#3c348f] transition-colors"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 min-h-screen bg-gray-50 font-['Cairo']">
      {/* Tombol Back */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-[#4F45B6] mb-8 transition-all font-bold"
      >
        <FaArrowLeft /> Kembali
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Bagian Visual - Menampilkan Gambar Produk */}
        <div className="md:w-1/2 bg-[#F4F2FF] flex items-center justify-center p-8 relative shrink-0 min-h-[300px]">
           <img 
             src={product.image_url || product.image || "https://via.placeholder.com/400?text=No+Image"} 
             alt={product.name || product.title}
             className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/50"
           />
        </div>

        {/* Bagian Informasi */}
        <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-[#4F45B6] rounded-full text-[10px] font-black uppercase tracking-wider">
                {product.category || "FURNITURE"}
              </span>
            </div>

            <h2 className="text-4xl font-black text-gray-900 mb-4">{product.name || product.title}</h2>
            
            <div className="mb-8">
              <p className="text-xs uppercase text-gray-400 font-bold mb-2 tracking-widest">Deskripsi Produk</p>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                {product.description || "Tidak ada deskripsi yang tersedia untuk produk ini."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Stok Tersedia</p>
              <p className="text-xl font-black text-gray-800 flex items-center gap-2">
                <FaBox size={16} className="text-[#4F45B6]" /> {product.stock || 0} <span className="text-xs font-bold text-gray-400">units</span>
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Harga Unit</p>
              <p className="text-xl font-black text-[#4F45B6]">
                Rp {(product.price || 0).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}