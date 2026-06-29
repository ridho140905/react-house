import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/Page.Header";
import UserForm from "../components/user/UserForm";
import UserTable from "../components/user/UserTable";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Search & Filter
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    const [formData, setFormData] = useState({
        full_name: "",
        role: "member",
        tier: ""
    });
    const [editingId, setEditingId] = useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            setError("Gagal memuat data pengguna: " + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showMessage = (setter, msg) => {
        setter(msg);
        setTimeout(() => setter(""), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            setActionLoading(true);
            setError("");
            setSuccess("");

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: formData.role, tier: formData.tier || null })
                .eq('id', editingId);

            if (updateError) throw updateError;

            showMessage(setSuccess, "Data pengguna berhasil diperbarui!");
            setFormData({ full_name: "", role: "member", tier: "" });
            setEditingId(null);
            loadUsers();
        } catch (err) {
            showMessage(setError, `Terjadi kesalahan: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            full_name: user.full_name || "",
            role: user.role || "member",
            tier: user.tier || ""
        });
        setEditingId(user.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData({ full_name: "", role: "member", tier: "" });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus profil pengguna ini? (Aksi ini tidak menghapus akun Auth secara permanen, namun menghapus profil dari sistem).")) return;

        try {
            setActionLoading(true);
            const { error: deleteError } = await supabase.from('profiles').delete().eq('id', id);
            if (deleteError) throw deleteError;

            showMessage(setSuccess, "Profil pengguna berhasil dihapus!");
            loadUsers();
        } catch (err) {
            showMessage(setError, `Gagal menghapus pengguna: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchSearch = (user.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchRole = filterRole === "all" || (user.role || "member").toLowerCase() === filterRole.toLowerCase();
        return matchSearch && matchRole;
    });

    return (
        <div className="p-6 md:p-8 font-['Cairo'] bg-[#FAFAFA] min-h-screen">
            <div className="w-full space-y-6">

                <PageHeader 
                    title="User Management" 
                    breadcrumb={["Dashboard", "Users"]}
                >
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                        <span>Total Users: <strong className="text-[#4F45B6]">{users.length}</strong></span>
                    </div>
                </PageHeader>

                {/* Notifications */}
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg animate-in slide-in-from-top-4 fade-in duration-300">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg animate-in slide-in-from-top-4 fade-in duration-300">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{success}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Form Section */}
                    <div className="lg:col-span-4">
                        <UserForm
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancelEdit={handleCancelEdit}
                            editingId={editingId}
                            actionLoading={actionLoading}
                        />
                    </div>

                    {/* Data Section */}
                    <div className="lg:col-span-8">
                        <UserTable
                            users={filteredUsers}
                            totalUsers={users.length}
                            loading={loading}
                            actionLoading={actionLoading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filterRole={filterRole}
                            setFilterRole={setFilterRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
