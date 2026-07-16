import React, { useState, useEffect } from 'react';
import { FiStar, FiX } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';

const GuestTestimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'Approved')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.comment) return alert('Nama dan Komentar wajib diisi!');
    
    try {
      setIsSubmitting(true);
      const newReview = {
        name: formData.name,
        role: 'Pelanggan Baru',
        product: formData.product,
        rating: formData.rating,
        comment: formData.comment,
        status: 'Pending',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
      };

      const { error } = await supabase.from('reviews').insert([newReview]);
      if (error) throw error;

      alert('Terima kasih! Ulasan Anda berhasil dikirim dan menunggu persetujuan admin.');
      setShowModal(false);
      setFormData({ name: '', product: '', rating: 5, comment: '' });
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim ulasan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const testimonials = reviews;

  return (
    <div>
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Apa Kata Mereka?</h2>
        <p className="text-gray-500 text-lg mb-6">Ribuan pelanggan telah mempercayakan kenyamanan rumahnya kepada kami.</p>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-2.5 bg-[#4F45B6] text-white font-semibold rounded-full hover:bg-purple-700 transition-colors shadow-md"
        >
          Tulis Ulasan Anda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {testimonials.length > 0 ? (
          testimonials.map((testi, idx) => (
            <div key={idx} className="flex flex-col justify-between h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center gap-2 mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < testi.rating ? "fill-current" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic">"{testi.comment}"</p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{testi.name}</h4>
                  <p className="text-sm text-[#4F45B6] font-semibold">{testi.role}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 py-10">Belum ada ulasan yang ditampilkan.</div>
        )}
      </div>

      {/* Modal Form Ulasan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
            >
              <FiX size={24} />
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tulis Ulasan</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F45B6] focus:border-transparent outline-none"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Produk (Opsional)</label>
                  <input 
                    type="text" 
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F45B6] focus:border-transparent outline-none"
                    placeholder="Contoh: Minimalist Sofa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rating *</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <button 
                        type="button" 
                        key={star}
                        onClick={() => setFormData({...formData, rating: star})}
                        className={`text-2xl ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <FiStar className="fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Komentar *</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F45B6] focus:border-transparent outline-none resize-none"
                    placeholder="Bagaimana pendapat Anda tentang pelayanan kami?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#4F45B6] text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-400 mt-2"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestTestimonial;
