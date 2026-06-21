import React from 'react';
import { FiStar } from 'react-icons/fi';
import { reviewData } from '../../data/reviewData';

const GuestTestimonial = () => {
  // Hanya ambil 3 review teratas untuk di-highlight di halaman depan (yang statusnya Approved)
  const testimonials = reviewData.filter(rev => rev.status === 'Approved').slice(0, 3);

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Apa Kata Mereka?</h2>
        <p className="text-gray-500 text-lg">Ribuan pelanggan telah mempercayakan kenyamanan rumahnya kepada kami.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testi, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < testi.rating ? "fill-current" : "text-gray-200"} />
              ))}
            </div>
            <p className="text-gray-600 mb-8 italic">"{testi.comment}"</p>
            <div className="flex items-center gap-4 mt-auto">
              <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900">{testi.name}</h4>
                <p className="text-sm text-[#4F45B6] font-semibold">{testi.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestTestimonial;
