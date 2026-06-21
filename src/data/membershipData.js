export const membershipTiers = [
  {
    id: "tier-1",
    name: "Silver",
    price: "Gratis",
    pointMultiplier: "1x Poin Pembelian",
    description: "Cocok untuk Anda yang baru mulai mengisi rumah impian.",
    color: "bg-gray-200 text-gray-800", // Tailwind class untuk card/badge header
    buttonColor: "bg-gray-800 hover:bg-gray-700 text-white",
    benefits: [
      { text: "Gratis Perakitan Furniture Kecil", included: true, cost: 200 },
      { text: "Voucher Diskon Sofa 5%", included: true, cost: 500 },
      { text: "Gratis Ongkir (Maks 20km)", included: false, cost: 0 },
      { text: "Konsultasi Desain Interior", included: false, cost: 0 },
      { text: "Akses Preview Koleksi Baru", included: false, cost: 0 },
    ],
  },
  {
    id: "tier-2",
    name: "Gold",
    price: "Rp 99.000 / bln",
    pointMultiplier: "2x Poin Pembelian",
    description: "Pilihan favorit untuk penikmat interior dengan layanan ekstra.",
    color: "bg-yellow-100 text-yellow-800 border border-yellow-300 shadow-yellow-100", // Styling kontras
    buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-white",
    isPopular: true, // Untuk menampilkan label "Paling Diminati"
    benefits: [
      { text: "Gratis Perakitan Semua Furniture", included: true, cost: 300 },
      { text: "Voucher Diskon Sofa 15%", included: true, cost: 800 },
      { text: "Gratis Ongkir Seluruh Kota", included: true, cost: 600 },
      { text: "Konsultasi Desain Interior", included: false, cost: 0 },
      { text: "Akses Preview Koleksi Baru", included: false, cost: 0 },
    ],
  },
  {
    id: "tier-3",
    name: "Platinum",
    price: "Rp 249.000 / bln",
    pointMultiplier: "5x Poin Pembelian",
    description: "Pengalaman VIP maksimal untuk mewujudkan rumah mewah Anda.",
    color: "bg-gradient-to-r from-gray-800 to-black text-white", // Desain premium dengan gradient
    buttonColor: "bg-white hover:bg-gray-100 text-black",
    benefits: [
      { text: "Layanan Teknisi Standby 24/7", included: true, cost: 500 },
      { text: "Voucher Diskon Semua Item 25%", included: true, cost: 1500 },
      { text: "Gratis Ongkir Antar Provinsi", included: true, cost: 1000 },
      { text: "Konsultasi Desain Interior 3D", included: true, cost: 2000 },
      { text: "Undangan Launching Furniture Eksklusif", included: true, cost: 800 },
    ],
  },
];
