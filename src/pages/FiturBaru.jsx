import React from "react";
import PageHeader from "../components/Page.Header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ================= IMPORT COMPONENT COMBOBOX START =================
// Impor komponen Combobox dari folder UI
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
// ================= IMPORT COMPONENT COMBOBOX END =================

// Data Mockup untuk Invoice
const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Google Pay", amount: "$450.00" },
];

export default function FiturBaru() {
  // ================= STATE & LOGIC FILTER COMBOBOX START =================
  // State untuk menyimpan filter status (default: "All Status")
  const [selectedStatus, setSelectedStatus] = React.useState("All Status");

  // Memfilter data invoice berdasarkan pilihan di Combobox
  const filteredInvoices = invoices.filter((inv) => {
    if (selectedStatus === "All Status" || !selectedStatus) return true;
    return inv.status.toLowerCase() === selectedStatus.toLowerCase();
  });
  // ================= STATE & LOGIC FILTER COMBOBOX END =================

  return (
    <div id="fitur-baru-container" className="pb-10 relative bg-[#fafafa] min-h-screen">
      {/* Page Header */}
      <PageHeader title="Fitur Baru" breadcrumb={["Dashboard", "Fitur Baru"]} />

      <div className="mx-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Daftar Invoice Terbaru</h2>
            <p className="text-xs text-gray-400">Kelola dan filter invoice pembayaran Anda</p>
          </div>

          {/* ================= CALL COMPONENT COMBOBOX START ================= */}
          {/* Komponen Combobox untuk memfilter status invoice */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Filter Status:</span>
            <Combobox value={selectedStatus} onValueChange={(val) => setSelectedStatus(val || "All Status")}>
              <ComboboxInput 
                placeholder="Pilih status..." 
                className="w-44 bg-white text-xs border-gray-200" 
                showClear={selectedStatus !== "All Status"}
              />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxItem value="All Status">All Status</ComboboxItem>
                  <ComboboxItem value="Paid">Paid</ComboboxItem>
                  <ComboboxItem value="Pending">Pending</ComboboxItem>
                  <ComboboxItem value="Unpaid">Unpaid</ComboboxItem>
                  <ComboboxEmpty>Status tidak ditemukan</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          {/* ================= CALL COMPONENT COMBOBOX END ================= */}
        </div>

        {/* Tabel Utama */}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Menampilkan {filteredInvoices.length} invoice.</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[120px] font-bold text-gray-600">Invoice</TableHead>
                <TableHead className="font-bold text-gray-600">Status</TableHead>
                <TableHead className="font-bold text-gray-600">Method</TableHead>
                <TableHead className="text-right font-bold text-gray-600">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((inv) => (
                <TableRow key={inv.invoice} className="hover:bg-gray-50/40 transition-colors">
                  <TableCell className="font-medium text-gray-900">{inv.invoice}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      inv.status === "Paid" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : inv.status === "Pending"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-rose-50 text-rose-700 border-rose-100"
                    }`}>
                      {inv.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">{inv.method}</TableCell>
                  <TableCell className="text-right font-bold text-gray-900">{inv.amount}</TableCell>
                </TableRow>
              ))}
              {filteredInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-400 text-sm">
                    Tidak ada invoice dengan status "{selectedStatus}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
