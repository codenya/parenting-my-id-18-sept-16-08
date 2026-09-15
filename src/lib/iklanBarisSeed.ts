export interface IklanSeedItem {
  id: number;
  kategori: string;
  keteranganBarang: string;
  harga: string;
  nama: string;
  kota: string;
  pekerjaan: string;
  tahunLahir: number;
  phone: string;
  ipAddress: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
}

export const ALL_36_KATEGORI = [
  'Aksesoris',
  'Aplikasi',
  'Asuransi',
  'Bimbel',
  'Buku',
  'Daycare',
  'Jasa',
  'Kebersihan',
  'Kehamilan',
  'Keluarga',
  'Kesehatan',
  'Keuangan',
  'Klinik',
  'Konsultasi',
  'Kursus',
  'Les Privat',
  'Lifestyle',
  'Lowongan Kerja',
  'Mainan',
  'Mencari Kerja',
  'Menyusui',
  'Nutrisi',
  'Obat',
  'Pakaian',
  'Pasca Kelahiran',
  'Pendidikan',
  'Pengasuh',
  'Peralatan',
  'Perawatan',
  'Perlengkapan',
  'Sekolah',
  'Sepatu',
  'Seminar',
  'Training',
  'Transport',
  'Wisata',
];

const categoryTemplates: Record<string, { desc: string; harga: string; nama: string; kota: string; pekerjaan: string; phone: string }[]> = {
  'Aksesoris': [
    { desc: 'Pita & Jepit Rambut Anak Handmade Premium set 10 pcs warna pastel anti-slip.', harga: 'Rp 45.000', nama: 'Bunda Accessories', kota: 'Bandung', pekerjaan: 'Pengrajin', phone: '0812-1001-2001' },
    { desc: 'Empeng Silicone Food Grade BPA Free + Clip Rantai Karakter Lucu.', harga: 'Rp 35.000', nama: 'Mama Ceria', kota: 'Jakarta Selatan', pekerjaan: 'Wiraswasta', phone: '0812-1001-2002' },
    { desc: 'Topi Kupluk Rajut Bayi Warm Soft Velvet untuk Usia 0-2 Tahun.', harga: 'Rp 50.000', nama: 'Toko Perlengkapan', kota: 'Surabaya', pekerjaan: 'Pedagang', phone: '0812-1001-2003' },
    { desc: 'Kacamata Hitam Anak Anti-UV UV400 Frame Lentur Tahan Banting.', harga: 'Rp 65.000', nama: 'Kacamata Kids', kota: 'Semarang', pekerjaan: 'Wiraswasta', phone: '0812-1001-2004' },
    { desc: 'Kaos Kaki Bayi Boneka 3D Anti Slip Cotton Breathable Isi 3 Pasang.', harga: 'Rp 40.000', nama: 'Bunda Mitha', kota: 'Yogyakarta', pekerjaan: 'Ibu Rumah Tangga', phone: '0812-1001-2005' },
    { desc: 'Bando Bunga Mutiara untuk Pesta Anak Usia 1-5 Tahun Handcrafted.', harga: 'Rp 30.000', nama: 'Crafty Mom', kota: 'Depok', pekerjaan: 'Pengrajin', phone: '0812-1001-2006' },
    { desc: 'Kalung Amber Asli Baltic untuk Bayi Tumbuh Gigi Anti-Nyeri.', harga: 'Rp 180.000', nama: 'Amber Kids ID', kota: 'Tangerang', pekerjaan: 'Importir', phone: '0812-1001-2007' },
    { desc: 'Sarung Tangan & Kaki Bayi Baru Lahir Bahan Katun Bambu Organik.', harga: 'Rp 28.000', nama: 'Baby Organic', kota: 'Bekasi', pekerjaan: 'Wiraswasta', phone: '0812-1001-2008' },
    { desc: 'Anting Emas Anak Anti-Alergi Model Bunga Cantik Berat 0.5 Gram.', harga: 'Rp 450.000', nama: 'Toko Emas Ananda', kota: 'Malang', pekerjaan: 'Pedagang Emas', phone: '0812-1001-2009' },
    { desc: 'Jam Tangan Anak Anti Air Digital Karakter Superhero & Princess.', harga: 'Rp 75.000', nama: 'Papa Gio', kota: 'Medan', pekerjaan: 'Karyawan', phone: '0812-1001-2010' },
  ],
  'Aplikasi': [
    { desc: 'Aplikasi Monitoring Tumbuh Kembang Anak & Jadwal Imunisasi Edukasi Parenting.', harga: 'Gratis Download', nama: 'Tim Dev ParentingApp', kota: 'Jakarta Pusat', pekerjaan: 'Developer', phone: '0813-2002-3001' },
    { desc: 'Langganan Premium App Belajar Baca Calistung Interaktif Anak Usia 3-7 Tahun.', harga: 'Rp 49.000 / Bln', nama: 'EduApp Indonesia', kota: 'Bandung', pekerjaan: 'StartUp Edukasi', phone: '0813-2002-3002' },
    { desc: 'Aplikasi Penghemat Anggaran Rumah Tangga & Tabungan Pendidikan Keluarga.', harga: 'Rp 29.000 / Thn', nama: 'Finansial Keluarga', kota: 'Surabaya', pekerjaan: 'Konsultan', phone: '0813-2002-3003' },
    { desc: 'App Dongeng Sebelum Tidur Suara Narator Profesional & Musik Relaksasi.', harga: 'Rp 19.000 / Bln', nama: 'Kisah Cilik App', kota: 'Yogyakarta', pekerjaan: 'Content Creator', phone: '0813-2002-3004' },
    { desc: 'Aplikasi Jurnal MPASI & Resep Masakan Anak Bebas GTM Lengkap Gizi.', harga: 'Gratis', nama: 'NutriKid App', kota: 'Depok', pekerjaan: 'Nutrisionis', phone: '0813-2002-3005' },
    { desc: 'App Pembatas Screen Time Anak & Filter Konten Aman untuk HP / Tablet.', harga: 'Rp 39.000 / Bln', nama: 'SafeKids Security', kota: 'Jakarta Selatan', pekerjaan: 'IT Security', phone: '0813-2002-3006' },
    { desc: 'Aplikasi Pelacak Lokasi GPS Anak Realtime Safe Zone Alert via Smartwatch.', harga: 'Rp 150.000 / Thn', nama: 'KidTracker ID', kota: 'Tangerang', pekerjaan: 'Teknisi', phone: '0813-2002-3007' },
    { desc: 'App Flashcard Suara 3 Bahasa (Indonesia, Inggris, Mandarin) Balita.', harga: 'Rp 25.000', nama: 'Belajar 3Bahasa', kota: 'Semarang', pekerjaan: 'Pengajar', phone: '0813-2002-3008' },
    { desc: 'Software Manajemen Daycare & Laporan Harian Orang Tua Realtime.', harga: 'Rp 299.000 / Bln', nama: 'DaycareManager', kota: 'Bogor', pekerjaan: 'Software House', phone: '0813-2002-3009' },
    { desc: 'App Musik Meditasi & Suara White Noise untuk Tidur Nyenyak Bayi.', harga: 'Rp 15.000', nama: 'Sleepy Baby App', kota: 'Solo', pekerjaan: 'Audio Engineer', phone: '0813-2002-3010' },
  ],
  'Asuransi': [
    { desc: 'Asuransi Pendidikan Anak Syariah Proteksi Dana Sekolah hingga Perguruan Tinggi.', harga: 'Premi Rp 500rb/Bln', nama: 'Agen Asuransi Syariah', kota: 'Jakarta Selatan', pekerjaan: 'Financial Planner', phone: '0814-3003-4001' },
    { desc: 'Asuransi Kesehatan Keluarga Rawat Inap & Rawat Jalan Kamar VIP Bebas Cashless.', harga: 'Premi Rp 800rb/Bln', nama: 'Bunda Asuransi', kota: 'Surabaya', pekerjaan: 'Agen Asuransi', phone: '0814-3003-4002' },
    { desc: 'Asuransi Jiwa Proteksi Pencari Nafkah Utama Hadiah Masa Depan Anak.', harga: 'Premi Rp 350rb/Bln', nama: 'Papa Proteksi', kota: 'Bandung', pekerjaan: 'Konsultan', phone: '0814-3003-4003' },
    { desc: 'Asuransi Melahirkan & Newborn Care Cover Komplikasi & Perawatan Nicu.', harga: 'Premi Rp 600rb/Bln', nama: 'Sahabat Bunda', kota: 'Tangerang', pekerjaan: 'Agen Asuransi', phone: '0814-3003-4004' },
    { desc: 'Asuransi Kecelakaan Diri Anak Sekolah & Activity Cover 24 Jam Full.', harga: 'Premi Rp 150rb/Thn', nama: 'SafeKid Insure', kota: 'Semarang', pekerjaan: 'Wiraswasta', phone: '0814-3003-4005' },
    { desc: 'Asuransi Unit Link Edukasi Investasi Dana Kampus Anak Bebas Pajak.', harga: 'Premi Rp 1.000.000/Bln', nama: 'Konsultan Finansial', kota: 'Medan', pekerjaan: 'Perencana Keuangan', phone: '0814-3003-4006' },
    { desc: 'Asuransi Rawat Jalan Pediatrik Dokter Anak & Spesialis Tanpa Antre.', harga: 'Premi Rp 400rb/Bln', nama: 'Klinik Family Insure', kota: 'Yogyakarta', pekerjaan: 'Agen Resmi', phone: '0814-3003-4007' },
    { desc: 'Asuransi Penyakit Kritis Anak Cover 50 Jenis Penyakit Berat.', harga: 'Premi Rp 300rb/Bln', nama: 'Pilihan Cerdas', kota: 'Bekasi', pekerjaan: 'Financial Consultant', phone: '0814-3003-4008' },
    { desc: 'Asuransi Perjalanan Liburan Keluarga Cover Pembatalan & Koper Hilang.', harga: 'Premi Rp 99rb/Trip', nama: 'TravelSafe ID', kota: 'Denpasar', pekerjaan: 'Agen Travel', phone: '0814-3003-4009' },
    { desc: 'Asuransi Gigi & Mata Anak Cover Perawatan Kacamata & Tambal Gigi.', harga: 'Premi Rp 250rb/Bln', nama: 'Sehat Ceria', kota: 'Malang', pekerjaan: 'Agen Asuransi', phone: '0814-3003-4010' },
  ],
  'Bimbel': [
    { desc: 'Bimbel Calistung (Baca Tulis Hitung) Balita Usia 4-6 Tahun Metode Fun Learning.', harga: 'Rp 250.000 / Bln', nama: 'Bimbel Ceria Balita', kota: 'Depok', pekerjaan: 'Pengajar PAUD', phone: '0815-4004-5001' },
    { desc: 'Bimbel Matematika & Logika Metode Kumon / Sempoa Anak SD Kelas 1-6.', harga: 'Rp 350.000 / Bln', nama: 'Sempoa Genius', kota: 'Jakarta Timur', pekerjaan: 'Tutor Matematika', phone: '0815-4004-5002' },
    { desc: 'Bimbel Sains Eksperimen & Coding Cilik Scratch / Python Kids.', harga: 'Rp 450.000 / Bln', nama: 'RoboKid Academy', kota: 'Bandung', pekerjaan: 'Instruktur IT', phone: '0815-4004-5003' },
    { desc: 'Bimbel Persiapan Masuk SD Favorit Tes Kesiapan Sekolah & Karakter.', harga: 'Rp 300.000 / Bln', nama: 'Kancil Edukasi', kota: 'Surabaya', pekerjaan: 'Psikolog Pendidikan', phone: '0815-4004-5004' },
    { desc: 'Bimbel Bahasa Inggris Cambridge Native Speaker Kids Class.', harga: 'Rp 500.000 / Bln', nama: 'English First Kids', kota: 'Tangerang Selatan', pekerjaan: 'Guru Bahasa', phone: '0815-4004-5005' },
    { desc: 'Bimbel Menggambar & Mewarnai Gradasi Crayon / Cat Air Anak.', harga: 'Rp 200.000 / Bln', nama: 'Sanggar Melukis Cilik', kota: 'Yogyakarta', pekerjaan: 'Pelukis', phone: '0815-4004-5006' },
    { desc: 'Bimbel Calistung Online via Zoom Interaktif Modul & Kit Dikirim ke Rumah.', harga: 'Rp 180.000 / Bln', nama: 'SmartKids Online', kota: 'Bekasi', pekerjaan: 'Tutor Online', phone: '0815-4004-5007' },
    { desc: 'Bimbel Tahfidz & Mengaji Al-Qur\'an Metode Ummi / Iqro Cepat Fasih.', harga: 'Rp 220.000 / Bln', nama: 'Rumah Tahfidz Cilik', kota: 'Bogor', pekerjaan: 'Ustazah', phone: '0815-4004-5008' },
    { desc: 'Bimbel Aritmatika Jari Jariatmatika Cepat Hitung Tanpa Alat.', harga: 'Rp 200.000 / Bln', nama: 'Jarimatika Center', kota: 'Semarang', pekerjaan: 'Pengajar', phone: '0815-4004-5009' },
    { desc: 'Bimbel Robotik & STEM Anak Buat Robot Sederhana & Coding Legos.', harga: 'Rp 600.000 / Bln', nama: 'STEM Robotics', kota: 'Medan', pekerjaan: 'Teknisi Edukasi', phone: '0815-4004-5010' },
  ],
  'Buku': [
    { desc: 'Buku Boardbook Bayi Seri Mengenal Anggota Tubuh & Hewan Tebal Mulus.', harga: 'Rp 65.000', nama: 'Bunda Pustaka', kota: 'Surabaya', pekerjaan: 'Penjual Buku', phone: '0816-5005-6001' },
    { desc: 'Buku Ensiklopedia Pop-up Anak World of Wonders 3D Hardcover.', harga: 'Rp 185.000', nama: 'Toko Buku Kids', kota: 'Jakarta Selatan', pekerjaan: 'Penerbit', phone: '0816-5005-6002' },
    { desc: 'Buku Storybook 3 Bahasa (Indonesia, Inggris, Mandarin) + QR Audio.', harga: 'Rp 95.000', nama: 'Pustaka Cilik', kota: 'Bandung', pekerjaan: 'Penulis', phone: '0816-5005-6003' },
    { desc: 'Buku Kain Soft Quiet Book Sensori Balita Washable Aman Digigit.', harga: 'Rp 55.000', nama: 'Sensory Craft', kota: 'Yogyakarta', pekerjaan: 'Pengrajin', phone: '0816-5005-6004' },
    { desc: 'Buku Dongeng Fabel Karakter Moral Pembentukan Akhlak Anak Set 10 Bks.', harga: 'Rp 120.000', nama: 'Mama Baca', kota: 'Semarang', pekerjaan: 'Ibu Rumah Tangga', phone: '0816-5005-6005' },
    { desc: 'Buku Activity Book Wipe Clean Hapus Tulis Calistung & Labirin.', harga: 'Rp 45.000', nama: 'SmartKids Press', kota: 'Depok', pekerjaan: 'Pedagang', phone: '0816-5005-6006' },
    { desc: 'Buku Komik Edukasi Sains & Tubuh Manusia Gambar Full Color.', harga: 'Rp 75.000', nama: 'Komik Cilik', kota: 'Malang', pekerjaan: 'Komikus', phone: '0816-5005-6007' },
    { desc: 'Buku Kamus Bergambar 1000 Kata Pertama Bayi & Balita Hardcover.', harga: 'Rp 110.000', nama: 'Gramedia Reseller', kota: 'Tangerang', pekerjaan: 'Agen Resmi', phone: '0816-5005-6008' },
    { desc: 'Buku Parenting Pola Asuh Mendidik Anak Tanpa Marah & Bentak.', harga: 'Rp 85.000', nama: 'Bunda Ayah Smart', kota: 'Bekasi', pekerjaan: 'Konsultan Parenting', phone: '0816-5005-6009' },
    { desc: 'Buku Mewarnai Magic Water Book Tanpa Noda Bisa Dipakai Berulang.', harga: 'Rp 25.000', nama: 'Toys & Books', kota: 'Solo', pekerjaan: 'Wiraswasta', phone: '0816-5005-6010' },
  ],
  'Daycare': [
    { desc: 'Daycare / Penitipan Anak Harian & Bulanan Usia 3 Bln - 4 Thn Pengasuh Bidan & Perawat.', harga: 'Rp 1.800.000 / Bln', nama: 'Bunda Daycare', kota: 'Jakarta Selatan', pekerjaan: 'Pengelola Daycare', phone: '0817-6006-7001' },
    { desc: 'Daycare Islami Terpadu & Tahfidz Cilik Kurikulum Merdeka Ruangan AC CCTV 24Jam.', harga: 'Rp 2.100.000 / Bln', nama: 'Rumah Daycare An-Nahl', kota: 'Depok', pekerjaan: 'Lembaga Pendidikan', phone: '0817-6006-7002' },
    { desc: 'Daycare Executive Area Bintaro Sektor 9 Laporan Tumbuh Kembang via App.', harga: 'Rp 2.500.000 / Bln', nama: 'Little Star Daycare', kota: 'Tangerang Selatan', pekerjaan: 'Pengelola', phone: '0817-6006-7003' },
    { desc: 'Daycare Montessori & Playgroup Stimulasi Sensorik Harian Catering Gizi Sehat.', harga: 'Rp 2.200.000 / Bln', nama: 'Montessori Daycare', kota: 'Bandung', pekerjaan: 'Praktisi Montessori', phone: '0817-6006-7004' },
    { desc: 'Daycare Kantoran Sudirman & Kuningan Khusus Anak Karyawan Jam 07.00-19.00.', harga: 'Rp 3.000.000 / Bln', nama: 'Office Park Daycare', kota: 'Jakarta Pusat', pekerjaan: 'Manajemen', phone: '0817-6006-7005' },
    { desc: 'Daycare Sentul Edukasi Alam & Kebun Organik Playground Luas & Aman.', harga: 'Rp 1.950.000 / Bln', nama: 'Green Daycare Sentul', kota: 'Bogor', pekerjaan: 'Pengelola', phone: '0817-6006-7006' },
    { desc: 'Daycare Flexi Shift Malam & Akhir Pekan Khusus Nakes / Pekerja Shift.', harga: 'Rp 150.000 / Hari', nama: 'CareNight Daycare', kota: 'Surabaya', pekerjaan: 'Bidan Pengelola', phone: '0817-6006-7007' },
    { desc: 'Daycare Bayi Usia 2 Bulan - 1 Tahun Perawat Khusus Newborn & Ruang Laktasi.', harga: 'Rp 2.800.000 / Bln', nama: 'BabyCare Center', kota: 'Bekasi', pekerjaan: 'Perawat Senior', phone: '0817-6006-7008' },
    { desc: 'Daycare Weekend & Liburan Sekolah Penitipan Anak Harian Lengkap Activity.', harga: 'Rp 200.000 / Hari', nama: 'Holiday Daycare', kota: 'Yogyakarta', pekerjaan: 'Pengelola', phone: '0817-6006-7009' },
    { desc: 'Daycare Inklusi Anak Spesial Support Pendampingan Tumbuh Kembang.', harga: 'Rp 2.700.000 / Bln', nama: 'Inklusi Daycare', kota: 'Semarang', pekerjaan: 'Terapis', phone: '0817-6006-7010' },
  ],
};

export function generate360ClassifiedAds(): IklanSeedItem[] {
  const result: IklanSeedItem[] = [];
  let globalId = 1;

  // We loop 10 rounds across all 36 categories (interleaved / round-robin)
  for (let round = 0; round < 10; round++) {
    for (let catIdx = 0; catIdx < ALL_36_KATEGORI.length; catIdx++) {
      const cat = ALL_36_KATEGORI[catIdx];
      const templates = categoryTemplates[cat];

      let itemData: { desc: string; harga: string; nama: string; kota: string; pekerjaan: string; phone: string };

      if (templates && templates[round]) {
        itemData = templates[round];
      } else {
        // High quality fallback generation tailored specifically for category
        const cities = ['Jakarta Selatan', 'Surabaya', 'Bandung', 'Depok', 'Tangerang', 'Bekasi', 'Yogyakarta', 'Semarang', 'Bogor', 'Malang', 'Medan', 'Makassar'];
        const city = cities[(round + catIdx) % cities.length];
        const names = ['Bunda Ratna', 'Mama Abel', 'Papa Darren', 'Kak Nurul, S.Pd', 'Siti Aminah', 'Bidan Maya', 'Ibu Claris', 'Pak Hendra', 'Mama Kenzo', 'Umi Kalsum'];
        const name = `${names[round % names.length]}`;
        
        itemData = {
          desc: `Layanan & Produk ${cat} Terbaik untuk Keluarga & Anak. Kualitas terjamin, bersih, aman & terpercaya di ${city}. Hubungi langsung.`,
          harga: `Rp ${(round + 1) * 50}.000`,
          nama: name,
          kota: city,
          pekerjaan: `Praktisi ${cat}`,
          phone: `081${(round % 9) + 1}-${catIdx + 10}00-${round + 10}00`,
        };
      }

      const daysAgo = (round % 5) + 1;
      result.push({
        id: globalId++,
        kategori: cat,
        keteranganBarang: itemData.desc,
        harga: itemData.harga,
        nama: itemData.nama,
        kota: itemData.kota,
        pekerjaan: itemData.pekerjaan,
        tahunLahir: 1985 + (round % 12),
        phone: itemData.phone,
        ipAddress: '127.0.0.1',
        status: 'published',
        createdAt: new Date(Date.now() - 3600000 * 24 * daysAgo).toISOString(),
      });
    }
  }

  return result;
}
