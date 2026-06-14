import React from 'react';
import { FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

const dummyOrders = [
  { id: "TRX-88291", item: "Nordic Minimalist Sofa", date: "12 Jun 2026", status: "Dikirim", total: "Rp 4.500.000" },
  { id: "TRX-88154", item: "Ergo Lounge Chair", date: "05 Jun 2026", status: "Selesai", total: "Rp 2.100.000" },
  { id: "TRX-87902", item: "Aesthetic TV Cabinet", date: "28 Mei 2026", status: "Selesai", total: "Rp 1.850.000" },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Dikirim':
      return <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold"><FiTruck /><span>Dikirim</span></span>;
    case 'Selesai':
      return <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold"><FiCheckCircle /><span>Selesai</span></span>;
    default:
      return <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold"><FiPackage /><span>Diproses</span></span>;
  }
};

const CustomerOrders = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Riwayat Pesanan Saya</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">ID Transaksi</th>
              <th className="px-6 py-4 font-semibold">Nama Barang</th>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Total Harga</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-[#4F45B6]">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{order.item}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{order.total}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
