import { Search, Loader2, Edit, Trash2 } from "lucide-react";

export default function UserTable({ users, loading, actionLoading, onEdit, onDelete, searchTerm, setSearchTerm, filterRole, setFilterRole, totalUsers }) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-800">Daftar Pengguna</h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all appearance-none cursor-pointer"
                    >
                        <option value="all">Semua Role</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>

                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Cari pengguna..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto p-0">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin text-[#4F45B6] mb-4" />
                        <p className="text-sm font-medium">Memuat data...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400 p-6 text-center">
                        <Search className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm font-medium text-gray-500">Tidak ada pengguna ditemukan.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Tier</th>
                                <th className="px-6 py-4">Points</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#4F45B6] font-bold text-xs flex-shrink-0 border border-blue-100">
                                                {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div className="font-semibold text-gray-700 text-sm">
                                                {user.full_name || "Tanpa Nama"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                            ${user.role === 'admin' 
                                                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                                            }`}
                                        >
                                            {user.role || "Member"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider
                                            ${user.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                                              user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                                              user.tier === 'Silver' ? 'bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-400'
                                            }`}
                                        >
                                            {user.tier || "None"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                        {user.total_points || 0} pts
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-1.5">
                                            <button
                                                onClick={() => onEdit(user)}
                                                disabled={actionLoading}
                                                className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                                                title="Edit Pengguna"
                                            >
                                                <Edit className="w-[18px] h-[18px]" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(user.id)}
                                                disabled={actionLoading}
                                                className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                title="Hapus Profil"
                                            >
                                                <Trash2 className="w-[18px] h-[18px]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
