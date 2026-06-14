import { useState, useRef, useEffect } from "react";
import {
  FaBox,
  FaBarcode,
  FaTag,
  FaDollarSign,
  FaWarehouse,
  FaEye, // Ikon mata untuk detail
  FaSearch, // Ikon pencarian
} from "react-icons/fa";
import PageHeader from "../components/Page.Header";
import { dataProducts } from "../data/product"; // Pastikan data furniture ada di sini
import { Link } from "react-router-dom";

export default function Product() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // --- PENERAPAN useState ---
  const [searchKeyword, setSearchKeyword] = useState("");

  // --- PENERAPAN useRef ---
  const titleInputRef = useRef(null);

  // Efek samping untuk otomatis fokus input menggunakan useRef
  useEffect(() => {
    if (isFormOpen) {
      // Tunggu sebentar sampai modal benar-benar di-render, lalu fokuskan
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isFormOpen]);

  // Logika Filter Produk dengan state searchKeyword
  const filteredProducts = dataProducts.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword.toLowerCase())
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
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-hijau shadow-sm w-64 transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-hijau text-white px-5 py-2 rounded-lg hover:bg-green-600 shadow-sm font-semibold transition-all"
          >
            + Add Product
          </button>
        </div>
      </PageHeader>

      {/* TABEL DATA PRODUCTS */}
      <div className="mx-5 p-6 bg-white rounded-2xl shadow-sm mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 uppercase text-xs">
                <th className="pb-4 font-medium">ID</th>
                <th className="pb-4 font-medium">Image</th>
                <th className="pb-4 font-medium">Furniture Name</th>
                <th className="pb-4 font-medium">Code</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium">Stock</th>
                <th className="pb-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-gray-400">#{product.id}</td>
                  <td className="py-4">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100"
                    />
                  </td>
                  <td className="py-4 font-semibold text-gray-800">
                    {product.title}
                  </td>
                  <td className="py-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600">
                      {product.code}
                    </code>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-hijau">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        product.stock > 20
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {/* TOMBOL MATA UNTUK DETAIL */}
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-500 hover:bg-hijau hover:text-white rounded-lg transition-all"
                    >
                      <FaEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-400">
                    Product not found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM (Tetap Menggunakan UI Kamu) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Furniture</h2>
            <form className="flex flex-col space-y-3">
              {/* Tambahkan ref ke input pertama ini */}
              <input 
                ref={titleInputRef}
                type="text" 
                placeholder="Furniture Title" 
                className="border p-2 rounded-md outline-none focus:border-hijau" 
              />
              <input type="text" placeholder="Code" className="border p-2 rounded-md outline-none focus:border-hijau" />
              <input type="text" placeholder="Category" className="border p-2 rounded-md outline-none focus:border-hijau" />
              <input type="number" placeholder="Price" className="border p-2 rounded-md outline-none focus:border-hijau" />
              <input type="number" placeholder="Stock" className="border p-2 rounded-md outline-none focus:border-hijau" />

              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  Cancel
                </button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-hijau text-white rounded-md hover:bg-green-600">
                  Save Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}