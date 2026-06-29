import React, { useState } from 'react';
import { FiTarget, FiFeather } from 'react-icons/fi';
import FotoRidho from '../../assets/foto.jpeg';

const MemberAvatar = ({ member }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative bg-[#F4F2FF] flex items-center justify-center shadow-sm">
      {!imgError && member.image ? (
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover" 
          onError={() => setImgError(true)} 
        />
      ) : (
        <div className="w-full h-full bg-[#F4F2FF] text-[#4F45B6] flex items-center justify-center text-3xl font-black">
          {member.initial}
        </div>
      )}
    </div>
  );
};

const CompanyProfile = () => {
  return (
    <div className="space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#F4F2FF] text-[#4F45B6] text-xs font-bold uppercase tracking-wider mb-2">
          Profil Perusahaan
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Tentang FurnitureQ</h2>
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
            { initial: 'ID', name: 'Ido Siregar', role: 'Lead Interior Designer', desc: 'Berpengalaman lebih dari 10 tahun merancang interior rumah minimalis modern.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
            { initial: 'RF', name: 'Ridho Prasetyo', role: 'Head of Product', desc: 'Ahli dalam riset ergonomi dan inovasi fungsionalitas furniture ruang sempit.', image: FotoRidho },
            { initial: 'AW', name: 'Alfiq Debrilliant', role: 'Woodcraft Specialist', desc: 'Memastikan setiap potongan kayu diproses dengan presisi tingkat tinggi.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
          ].map((member, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <MemberAvatar member={member} />
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
