import React from "react";
import { useNavigate } from "react-router-dom";
import { membershipTiers } from "../data/membershipData";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Pastikan react-icons sudah terinstall

const Membership = () => {
  const navigate = useNavigate();

  const handleSelectTier = (tierId) => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    // Simpan pilihan tier ke localStorage
    localStorage.setItem("selectedTier", tierId);
    // Arahkan pengguna ke halaman klaim benefit
    navigate("/my-membership");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-['Cairo']">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-base font-semibold tracking-wide text-[#5D5FEF] uppercase">
          Membership
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Pilih Tier Sesuai Kebutuhan Anda
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Dapatkan lebih banyak keuntungan, poin reward berlipat, dan layanan prioritas dengan meningkatkan tingkat keanggotaan Anda.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 lg:gap-x-8">
        {membershipTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative p-8 border rounded-2xl shadow-sm flex flex-col ${
              tier.color
            } ${tier.isPopular ? "scale-105 shadow-xl border-yellow-400" : "border-gray-200 bg-white"}`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                <span className="inline-flex rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold tracking-wider text-yellow-900 uppercase">
                  Paling Diminati
                </span>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className={`mt-2 text-sm ${tier.id === "tier-3" ? "text-gray-300" : "text-gray-500"}`}>
                {tier.description}
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-4xl font-extrabold">
                {tier.price}
              </p>
              <p className={`mt-2 font-medium ${tier.id === "tier-3" ? "text-gray-300" : "text-[#5D5FEF]"}`}>
                Benefit: {tier.pointMultiplier}
              </p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    {benefit.included ? (
                      <FaCheckCircle className={`h-6 w-6 ${tier.id === "tier-3" ? "text-white" : "text-green-500"}`} />
                    ) : (
                      <FaTimesCircle className={`h-6 w-6 ${tier.id === "tier-3" ? "text-gray-600" : "text-gray-300"}`} />
                    )}
                  </div>
                  <p className={`ml-3 text-base ${
                    !benefit.included 
                      ? (tier.id === "tier-3" ? "text-gray-500 line-through" : "text-gray-400 line-through")
                      : (tier.id === "tier-3" ? "text-gray-100" : "text-gray-700")
                  }`}>
                    {benefit.text}
                  </p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectTier(tier.id)}
              className={`mt-auto w-full py-3 px-4 rounded-xl font-bold text-center transition-colors duration-200 ${tier.buttonColor}`}
            >
              Pilih {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
