import { Loader2 } from "lucide-react";

export default function UserForm({ formData, onChange, onSubmit, onCancelEdit, editingId, actionLoading }) {
    if (!editingId) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sticky top-6 text-center text-gray-500">
                <p className="text-sm">Silakan pilih pengguna dari tabel untuk mengedit Role atau Tier mereka.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
                Edit Profil Pengguna
            </h2>
            <p className="text-xs text-gray-400 mb-6">
                Perbarui Role dan Tier pengguna yang dipilih
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                    <input
                        type="text"
                        value={formData.full_name || ""}
                        disabled
                        className="w-full px-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={onChange}
                        disabled={actionLoading}
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-colors text-sm text-gray-800 appearance-none"
                    >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Membership Tier</label>
                    <select
                        name="tier"
                        value={formData.tier || ""}
                        onChange={onChange}
                        disabled={actionLoading}
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-colors text-sm text-gray-800 appearance-none"
                    >
                        <option value="">None (Tanpa Tier)</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                    <button
                        type="submit"
                        disabled={actionLoading}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#4F45B6] hover:bg-[#3c348f] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Simpan Perubahan
                    </button>
                    
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        disabled={actionLoading}
                        className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}
