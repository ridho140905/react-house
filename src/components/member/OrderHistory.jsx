import React from 'react';
import { FaHistory, FaStar } from 'react-icons/fa';

const OrderHistory = ({ orders }) => {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mt-4 mb-6 flex items-center gap-3">
        <FaHistory className="text-[#4F45B6]" /> Histori Pesanan Anda
      </h2>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FaHistory className="text-5xl text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium text-lg">Belum ada histori pesanan.</p>
            <p className="text-gray-400 text-sm">Ayo mulai berbelanja dan kumpulkan poin Anda!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F4F2FF]">
                <tr>
                  <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Order ID</th>
                  <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Tanggal</th>
                  <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Total Harga</th>
                  <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Poin Didapat</th>
                  <th className="py-5 px-8 font-black text-[#4F45B6] text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-5 px-8 text-sm font-bold text-gray-600 group-hover:text-[#4F45B6]">#{o.id.slice(0,8)}</td>
                    <td className="py-5 px-8 text-sm text-gray-500 font-medium">{new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td className="py-5 px-8 font-black text-gray-900 text-lg">Rp {o.total_price.toLocaleString()}</td>
                    <td className="py-5 px-8">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-sm flex items-center gap-1 w-max">
                        <FaStar className="w-3 h-3" /> +{o.points_earned}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <span className={`px-4 py-1.5 text-xs font-black uppercase rounded-xl tracking-wider ${
                        o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-[#F4F2FF] text-[#4F45B6]'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
