import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { userAPI } from "../services/userAPI";
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
        name: "",
        email: "",
        password: "",
        role: "guest"
    });
    const [editingId, setEditingId] = useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await userAPI.fetchUsers();
            setUsers(data || []);
        } catch (err) {
            setError("Gagal memuat data pengguna.");
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
        try {
            setActionLoading(true);
            setError("");
            setSuccess("");

            const payload = { ...formData };
            if (payload.password) {
                const passwordValue = typeof payload.password === "string" ? payload.password : String(payload.password);
                payload.password = /^\$2[aby]\$/.test(passwordValue)
                    ? passwordValue
                    : bcrypt.hashSync(passwordValue, 10);
            }
            if (editingId && !payload.password) {
                delete payload.password;
            }

            if (editingId) {
                await userAPI.updateUser(editingId, payload);
                showMessage(setSuccess, "Data pengguna berhasil diperbarui!");
            } else {
                await userAPI.createUser(payload);
                showMessage(setSuccess, "Pengguna baru berhasil ditambahkan!");
            }

            setFormData({ name: "", email: "", password: "", role: "guest" });
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
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            role: user.role || "guest"
        });
        setEditingId(user.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData({ name: "", email: "", password: "", role: "guest" });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.")) return;

        try {
            setActionLoading(true);
            await userAPI.deleteUser(id);
            showMessage(setSuccess, "Pengguna berhasil dihapus!");
            loadUsers();
        } catch (err) {
            showMessage(setError, `Gagal menghapus pengguna: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchSearch = (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchRole = filterRole === "all" || (user.role || "guest").toLowerCase() === filterRole.toLowerCase();
        return matchSearch && matchRole;
    });

    return (
        <div className="p-6 md:p-8 font-['Cairo'] bg-white min-h-screen">
            <div className="w-full space-y-6">

                <PageHeader 
                    title="User List" 
                    breadcrumb={["Dashboard", "Users"]}
                >
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                        <span>Total Users: <strong className="text-emerald-600">{users.length}</strong></span>
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
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg animate-in slide-in-from-top-4 fade-in duration-300">
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
