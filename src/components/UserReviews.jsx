import React from "react";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { reviewData } from "../data/reviewData";

const UserReviews = () => {
  const reviews = reviewData.filter(rev => rev.status === "Approved").slice(0, 3);

  return (
    <section className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">User Reviews</h3>
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className={
                      i < rev.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-800">
                  {rev.name}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {rev.comment}
              </p>
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
