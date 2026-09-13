import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Copy, 
  CheckCircle, 
  Trash, 
  Edit3, 
  Plus, 
  X, 
  ExternalLink,
  ChevronLeft,
  DollarSign,
  Maximize2
} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  whatsappNumber: string;
  qrisImageUrl?: string;
  status: 'available' | 'sold';
  createdAt?: string;
}

interface InteractiveProductSaleProps {
  isAdmin?: boolean;
  currentUser?: any;
}

export default function InteractiveProductSale({ isAdmin = false, currentUser }: InteractiveProductSaleProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout States
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [buyerNotes, setBuyerNotes] = useState<string>('');
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment'>('details');
  const [copiedPrice, setCopiedPrice] = useState<boolean>(false);

  // Admin Modal States
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formSlug, setFormSlug] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formImageUrl, setFormImageUrl] = useState<string>('');
  const [formWhatsappNumber, setFormWhatsappNumber] = useState<string>('');
  const [formQrisImageUrl, setFormQrisImageUrl] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'available' | 'sold'>('available');
  const [formError, setFormError] = useState<string>('');

  // Fetch Products on Mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormTitle('');
    setFormSlug('');
    setFormDescription('');
    setFormPrice(0);
    setFormImageUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80');
    setFormWhatsappNumber('628123456789');
    setFormQrisImageUrl('https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&h=400&q=80');
    setFormStatus('available');
    setFormError('');
    setShowAdminModal(true);
  };

  const handleOpenEditModal = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormSlug(product.slug);
    setFormDescription(product.description);
    setFormPrice(product.price);
    setFormImageUrl(product.imageUrl);
    setFormWhatsappNumber(product.whatsappNumber);
    setFormQrisImageUrl(product.qrisImageUrl || '');
    setFormStatus(product.status);
    setFormError('');
    setShowAdminModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle || !formSlug || !formDescription || !formPrice || !formImageUrl || !formWhatsappNumber) {
      setFormError('Semua kolom bertanda bintang (*) wajib diisi.');
      return;
    }

    const payload = {
      title: formTitle,
      slug: formSlug,
      description: formDescription,
      price: Number(formPrice),
      imageUrl: formImageUrl,
      whatsappNumber: formWhatsappNumber,
      qrisImageUrl: formQrisImageUrl,
      status: formStatus
    };

    const token = localStorage.getItem('cms_token') || localStorage.getItem('session_token') || '';

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setShowAdminModal(false);
        fetchProducts();
      } else {
        setFormError(data.error || 'Gagal menyimpan produk.');
      }
    } catch (err) {
      setFormError('Gangguan jaringan. Silakan coba kembali.');
    }
  };

  const handleDeleteProduct = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk lukisan ini?')) return;

    const token = localStorage.getItem('cms_token') || localStorage.getItem('session_token') || '';

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchProducts();
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Nama Lengkap dan Nomor WhatsApp Anda wajib diisi.');
      return;
    }

    if (!selectedProduct) return;

    // Compose custom WhatsApp message
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedProduct.price);
    const textMessage = `Halo, saya tertarik dengan karya lukisan Anda:\n\n` +
      `🎨 *${selectedProduct.title}*\n` +
      `💰 Harga: ${formattedPrice}\n\n` +
      `Berikut rincian pemesan saya:\n` +
      `👤 *Nama:* ${buyerName}\n` +
      `📱 *No. HP/WhatsApp:* ${buyerPhone}\n` +
      `📝 *Catatan:* ${buyerNotes || '-'}\n\n` +
      `Saya akan melakukan pembayaran menggunakan QRIS yang tertera di halaman jualan. Tolong bantu konfirmasi ketersediaan dan pengiriman. Terima kasih!`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${selectedProduct.whatsappNumber.replace(/[^0-9]/g, '')}&text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Advance to payment step
    setCheckoutStep('payment');
  };

  const copyPriceToClipboard = () => {
    if (!selectedProduct) return;
    navigator.clipboard.writeText(selectedProduct.price.toString());
    setCopiedPrice(true);
    setTimeout(() => setCopiedPrice(false), 2000);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-br from-slate-900 to-rose-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-300 font-bold uppercase tracking-wider">
            🎨 Galeri Seni Eksklusif
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Miliki Karya Lukisan Orisinal &amp; Bernilai Tinggi
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Setiap lukisan merupakan karya seni otentik satu-satunya (one-of-a-kind) yang dibuat dengan dedikasi artistik mendalam. Didukung pembayaran instan QRIS dan koordinasi pengiriman aman via WhatsApp.
          </p>
          
          {isAdmin && (
            <button
              onClick={handleOpenAddModal}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Koleksi Lukisan</span>
            </button>
          )}
        </div>
        <div className="w-full md:w-80 h-48 bg-slate-800/40 rounded-2xl border border-white/10 p-2 flex items-center justify-center relative overflow-hidden shrink-0 group">
          <img 
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80" 
            alt="Artwork" 
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-widest">Premium Art Collection</span>
          </div>
        </div>
      </div>

      {/* PRODUCT DISPLAY & DETAIL */}
      {selectedProduct ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BACK TO GALLERY ROW */}
          <div className="lg:col-span-12">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setCheckoutStep('details');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Galeri Lukisan</span>
            </button>
          </div>

          {/* LEFT: ARTWORK PREVIEW */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4.5 space-y-4 shadow-sm">
            <div className="relative aspect-4/3 md:aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 dark:border-slate-800">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-full h-full object-contain hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                selectedProduct.status === 'available'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-600 text-white'
              }`}>
                {selectedProduct.status === 'available' ? 'Tersedia' : 'Terjual'}
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedProduct.title}
              </h2>
              <div className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
                {formatRupiah(selectedProduct.price)}
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-sm">
                {selectedProduct.description}
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE CHECKOUT & QRIS PANEL */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
            {checkoutStep === 'details' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Form Kontak Pemesan</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sistem akan menyusun pesan WhatsApp secara otomatis dan membuka QRIS pembayaran setelah Anda menekan tombol kirim.
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Cth: Budi Santoso"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Nomor HP/WhatsApp Anda *
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="Cth: 081234567890"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Catatan Pengiriman / Pesan Khusus
                    </label>
                    <textarea
                      value={buyerNotes}
                      onChange={(e) => setBuyerNotes(e.target.value)}
                      placeholder="Masukkan alamat pengiriman, request khusus packing kayu, atau penawaran."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                    />
                  </div>

                  {selectedProduct.status === 'available' ? (
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md shadow-rose-600/20"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Hubungi &amp; Tampilkan QRIS</span>
                    </button>
                  ) : (
                    <div className="p-4 text-center bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-xl font-bold text-sm">
                      Lukisan ini telah Terjual (Sold Out)
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tautan WhatsApp Terbuka</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Silakan selesaikan pesan di tab WhatsApp yang baru terbuka. Selanjutnya, lakukan pembayaran scan QRIS di bawah ini:
                  </p>
                </div>

                {/* QRIS FRAME */}
                {selectedProduct.qrisImageUrl ? (
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 max-w-xs mx-auto space-y-3 shadow-2xs">
                    <div className="bg-white p-2 rounded-xl flex items-center justify-center aspect-square border border-slate-200">
                      <img 
                        src={selectedProduct.qrisImageUrl} 
                        alt="QRIS QR Code" 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                      QRIS MANDIRI / GOPAY / DANA
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-100 dark:bg-slate-950 rounded-2xl text-slate-400 text-xs">
                    Kode QRIS belum diunggah oleh admin.
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Jumlah Transfer</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {formatRupiah(selectedProduct.price)}
                    </span>
                  </div>
                  <button
                    onClick={copyPriceToClipboard}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/[0.02] flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPrice ? 'Tersalin!' : 'Salin Angka Nominal'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-left border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Petunjuk Pembayaran:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Pindai QR Code di atas menggunakan dompet digital atau mobile banking Anda.</li>
                    <li>Masukkan nominal transfer persis senilai angka yang tersalin di atas.</li>
                    <li>Kirimkan tangkapan layar (screenshot) bukti transaksi ke kontak WhatsApp yang telah terbuka.</li>
                  </ol>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Kembali ke Form
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setCheckoutStep('details');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-950 dark:hover:bg-slate-750 text-white font-bold text-xs transition-colors"
                  >
                    Selesai &amp; Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PRODUCT CATALOG GRID */
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
              <p className="text-xs text-slate-500">Memuat koleksi lukisan terbaik...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Belum Ada Koleksi Lukisan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Koleksi jualan lukisan orisinal belum diunggah. Silakan masuk sebagai administrator untuk menambahkan karya seni lukis pertama Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-rose-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 bg-slate-950 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      product.status === 'available'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-600 text-white'
                    }`}>
                      {product.status === 'available' ? 'Tersedia' : 'Terjual'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="font-black text-sm text-slate-900 dark:text-white">
                        {formatRupiah(product.price)}
                      </div>
                      
                      {isAdmin && (
                        <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleOpenEditModal(product, e)}
                            className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProduct(product.id, e)}
                            className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADMIN ADD/EDIT MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Lukisan Koleksi' : 'Tambah Lukisan Koleksi Baru'}
              </h3>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    Judul Lukisan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingProduct) {
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                      }
                    }}
                    placeholder="Cth: Senja di Hamparan Sawah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    Slug Link (ID Unik) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                    placeholder="cth: senja-sawah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                  Kisah / Filosofi Seni &amp; Spesifikasi Detail *
                </label>
                <textarea
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ceritakan tentang inspirasi di balik lukisan ini, media (cat minyak di atas kanvas), ukuran, dan detail bingkai."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    Harga Jual (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice || ''}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    placeholder="Cth: 15000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    Status Produk *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as 'available' | 'sold')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  >
                    <option value="available">Tersedia (Available)</option>
                    <option value="sold">Terjual (Sold Out)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    Nomor WhatsApp Penjual (Format: 628...) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formWhatsappNumber}
                    onChange={(e) => setFormWhatsappNumber(e.target.value)}
                    placeholder="Cth: 628123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    URL Gambar QRIS
                  </label>
                  <input
                    type="text"
                    value={formQrisImageUrl}
                    onChange={(e) => setFormQrisImageUrl(e.target.value)}
                    placeholder="URL gambar QR Code QRIS Anda"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                  URL Gambar Lukisan *
                </label>
                <input
                  type="text"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="URL gambar lukisan resolusi tinggi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
