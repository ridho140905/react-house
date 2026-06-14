import React from 'react';
import { FiTarget, FiFeather } from 'react-icons/fi';

const CompanyProfile = () => {
  return (
    <div className="space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-xs font-bold uppercase tracking-wider mb-2">
          Profil Perusahaan
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Tentang Furnitureku</h2>
        <p className="text-gray-500 text-lg">
          Kami berdedikasi untuk menghadirkan furniture modern berkualitas tinggi, estetik, dan fungsional untuk memperindah setiap sudut rumah Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#F4F2FF] text-[#4F45B6] rounded-2xl flex items-center justify-center mb-6">
            <FiTarget className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Visi Kami</h3>
          <p className="text-gray-500 leading-relaxed">
            Menjadi brand furniture terkemuka di Indonesia yang mengintegrasikan desain elegan, material premium berkelanjutan, dan pelayanan prima untuk mewujudkan rumah impian masyarakat.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#F4F2FF] text-[#4F45B6] rounded-2xl flex items-center justify-center mb-6">
            <FiFeather className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Misi Kami</h3>
          <p className="text-gray-500 leading-relaxed">
            Menyediakan furniture dengan kualitas rakitan terbaik, memberikan konsultasi interior gratis yang solutif, serta menghadirkan kemudahan transaksi digital yang responsif dan aman.
          </p>
        </div>
      </div>

      <div className="pt-10">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">Tim Profesional Kami</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { initial: 'ID', name: 'Ido Siregar', role: 'Lead Interior Designer', desc: 'Berpengalaman lebih dari 10 tahun merancang interior rumah minimalis modern.' },
            { initial: 'RF', name: 'Ridho Prasetyo', role: 'Head of Product', desc: 'Ahli dalam riset ergonomi dan inovasi fungsionalitas furniture ruang sempit.' },
            { initial: 'AW', name: 'Alfiq Debrilliant', role: 'Woodcraft Specialist', desc: 'Memastikan setiap potongan kayu diproses dengan presisi tingkat tinggi.' },
          ].map((member, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#F4F2FF] text-[#4F45B6] flex items-center justify-center text-2xl font-black mb-4">
                {member.initial}
              </div>
              <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
              <p className="text-sm font-semibold text-[#4F45B6] mb-3">{member.role}</p>
              <p className="text-sm text-gray-500">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
