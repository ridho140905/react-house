import React, { useState, useEffect } from "react";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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
        console.error("Error fetching reviews:", error);
      }
    };
    
    fetchReviews();
  }, []);

  const approvedReviews = reviews;

  return (
    <section className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">User Reviews</h3>
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          {approvedReviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between"
            >
              <p className="text-sm text-gray-600 leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-sm font-bold text-gray-900">
                  {rev.name}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      className={
                        i < rev.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Panah Kanan */}
        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5D5FEF] border border-[#D0CAFF] hover:bg-purple-50 transition-colors shrink-0">
          <FiArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default UserReviews;
