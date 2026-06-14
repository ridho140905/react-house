import { Loader2 } from "lucide-react";

export default function UserForm({ formData, onChange, onSubmit, onCancelEdit, editingId, actionLoading }) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
                {editingId ? "Edit Pengguna" : "Tambah Pengguna"}
            </h2>
            <p className="text-xs text-gray-400 mb-6">
                {editingId ? "Perbarui informasi pengguna yang dipilih" : "Masukkan detail untuk membuat akun baru"}
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        disabled={actionLoading}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        disabled={actionLoading}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required={!editingId}
                        disabled={actionLoading}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role / Peran</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={onChange}
                        disabled={actionLoading}
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm text-gray-800 appearance-none"
                    >
                        <option value="guest">Guest</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                    <button
                        type="submit"
                        disabled={actionLoading}
                        className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingId ? "Simpan Perubahan" : "Tambah Pengguna"}
                    </button>
                    
                    {editingId && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            disabled={actionLoading}
                            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
