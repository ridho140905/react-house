import { useState, useRef, useEffect } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/Page.Header";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isFormOpen) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isFormOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenForm = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name || product.title || "",
        code: product.code || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || ""
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", code: "", category: "", price: "", stock: "", image: "" });
    }
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        code: formData.code,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image
      };

      if (editingId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingId);
        if (error) throw error;
        alert("Produk berhasil diperbarui!");
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
        alert("Produk berhasil ditambahkan!");
      }
      setIsFormOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Gagal menyimpan produk: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        fetchProducts();
      } catch (err) {
        alert("Gagal menghapus produk: " + err.message);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.name || product.title || "").toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div id="product-container" className="pb-10 relative">
      <PageHeader title="Furniture List" breadcrumb={["Dashboard", "Products"]}>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search product..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#4F45B6] shadow-sm w-64 transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="bg-[#4F45B6] text-white px-5 py-2 rounded-lg hover:bg-[#3c348f] shadow-sm font-semibold transition-all"
          >
            + Add Product
          </button>
        </div>
      </PageHeader>

      <div className="mx-5 p-6 bg-white rounded-2xl shadow-sm mt-4">
        {loading ? (
          <div className="py-8 text-center text-gray-500 font-bold">Memuat data produk...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 uppercase text-xs">
                  <th className="pb-4 font-medium">Image</th>
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Code</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Stock</th>
                  <th className="pb-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                      </td>
                      <td className="py-4 font-semibold text-gray-800">{product.name || product.title}</td>
                      <td className="py-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600">{product.code || 'N/A'}</code>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{product.category || 'General'}</span>
                      </td>
                      <td className="py-4 font-bold text-[#4F45B6]">Rp {(product.price || 0).toLocaleString("id-ID")}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${(product.stock || 0) > 20 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          {product.stock || 0} units
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => handleOpenForm(product)} className="p-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-lg transition-all" title="Edit Product">
                            <FaEdit size={14} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete Product">
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-gray-900">{editingId ? "Edit Furniture" : "Add New Furniture"}</h2>
            <form onSubmit={handleSave} className="flex flex-col space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                <input ref={titleInputRef} type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Contoh: Sofa Minimalis" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Product Code</label>
                  <input type="text" name="code" value={formData.code} onChange={handleChange} required placeholder="FRN-001" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Living Room" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Price (Rp)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="5000000" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Stock</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required placeholder="50" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="https://images.unsplash.com/..." className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#4F45B6] transition-colors" />
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 font-bold bg-[#4F45B6] text-white rounded-xl hover:bg-[#3c348f] transition-colors">
                  {editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}