import { useState } from "react";
import PageHeader from "../components/Page.Header";
import { FaSearch, FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const ordersList = [
    {
      id: "TRX-88291",
      customer: "Rizky Ridho",
      product: "Nordic Minimalist Sofa",
      date: "12 Jun 2026",
      total: "Rp 4.500.000",
      status: "Dikirim",
      statusColor: "text-blue-600 bg-blue-50"
    },
    {
      id: "TRX-88154",
      customer: "Siti Aminah",
      product: "Ergo Lounge Chair",
      date: "05 Jun 2026",
      total: "Rp 2.100.000",
      status: "Selesai",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: "TRX-87902",
      customer: "Budi Santoso",
      product: "Aesthetic TV Cabinet",
      date: "28 Mei 2026",
      total: "Rp 1.850.000",
      status: "Selesai",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: "TRX-88301",
      customer: "Andi Wijaya",
      product: "Queen Size Bed Frame",
      date: "20 Jun 2026",
      total: "Rp 5.500.000",
      status: "Diproses",
      statusColor: "text-orange-600 bg-orange-50"
    },
    {
      id: "TRX-88305",
      customer: "Ratna Sari",
      product: "Wooden Dining Table",
      date: "21 Jun 2026",
      total: "Rp 3.200.000",
      status: "Menunggu Pembayaran",
      statusColor: "text-red-600 bg-red-50"
    }
  ];

  const filteredOrders = ordersList.filter((item) =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Manajemen Pesanan" breadcrumb={["Orders"]} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-500 text-sm">
            Total <span className="text-[#4F45B6] font-bold">{ordersList.length}</span> pesanan bulan ini.
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari ID / Nama Pelanggan..."
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
                <th className="py-4 px-4">ID Transaksi</th>
                <th className="py-4 px-4">Pelanggan</th>
                <th className="py-4 px-4">Produk Utama</th>
                <th className="py-4 px-4">Tanggal</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#4F45B6]">{order.id}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{order.customer}</td>
                    <td className="py-4 px-4 text-gray-600">{order.product}</td>
                    <td className="py-4 px-4 text-gray-500">{order.date}</td>
                    <td className="py-4 px-4 font-bold text-gray-800">{order.total}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <button className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors" title="Terima Pesanan">
                          <FaCheck size={12} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors" title="Batalkan Pesanan">
                          <FaTimes size={12} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <FaEllipsisV size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    Tidak ada pesanan yang sesuai dengan pencarian.
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
