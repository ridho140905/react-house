import { useState } from "react";
import PageHeader from "../components/Page.Header";
import { FaSearch, FaCheck, FaTimes, FaImage, FaToolbox } from "react-icons/fa";

export default function WarrantyAdmin() {
  const [searchTerm, setSearchTerm] = useState("");

  const warrantyTickets = [
    {
      id: "TKT-001",
      trxId: "TRX-88291",
      customer: "Budi Santoso",
      issue: "Kaki sofa bagian kiri belakang sedikit goyang saat diduduki.",
      date: "21 Jun 2026",
      status: "Menunggu Peninjauan",
      statusColor: "text-orange-600 bg-orange-50",
      hasPhoto: true
    },
    {
      id: "TKT-002",
      trxId: "TRX-88154",
      customer: "Siti Rahmawati",
      issue: "Lampu tidak menyala walau sudah dicolok ke stop kontak.",
      date: "19 Jun 2026",
      status: "Diproses Teknisi",
      statusColor: "text-blue-600 bg-blue-50",
      hasPhoto: false
    },
    {
      id: "TKT-003",
      trxId: "TRX-87902",
      customer: "Ahmad Wijaya",
      issue: "Engsel pintu lemari agak keras saat ditutup.",
      date: "15 Jun 2026",
      status: "Selesai",
      statusColor: "text-green-600 bg-green-50",
      hasPhoto: true
    }
  ];

  const filteredTickets = warrantyTickets.filter((ticket) =>
    ticket.trxId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Klaim Garansi" breadcrumb={["After-Sales", "Warranty"]} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <FaToolbox className="text-[#4F45B6]" />
            Total <span className="text-[#4F45B6] font-bold">{warrantyTickets.length}</span> tiket garansi bulan ini.
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari No. TRX / Nama Pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#E0DDF7] focus:border-[#4F45B6] transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 tracking-wider font-bold">
                <th className="py-4 px-4">ID Tiket</th>
                <th className="py-4 px-4">No. Transaksi</th>
                <th className="py-4 px-4">Pelanggan</th>
                <th className="py-4 px-4 w-1/3">Detail Masalah</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Bukti Foto</th>
                <th className="py-4 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-800">{ticket.id}</td>
                    <td className="py-4 px-4 font-bold text-[#4F45B6]">{ticket.trxId}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{ticket.customer}</td>
                    <td className="py-4 px-4 text-gray-600 line-clamp-2">{ticket.issue}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${ticket.statusColor}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {ticket.hasPhoto ? (
                        <button className="text-[#4F45B6] bg-[#F4F2FF] p-2 rounded-lg mx-auto flex justify-center hover:bg-[#EBE9FE] transition-colors" title="Lihat Foto">
                          <FaImage size={14} />
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <button className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors" title="Setujui Klaim">
                          <FaCheck size={12} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors" title="Tolak Klaim">
                          <FaTimes size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    Tidak ada tiket garansi yang sesuai pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
