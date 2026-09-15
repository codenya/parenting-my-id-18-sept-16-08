import React from 'react';
import { IklanBarisItem } from '../types';
import { Building2, Phone, Sparkles, MapPin, Tag } from 'lucide-react';

interface NewspaperClassifiedGridProps {
  dynamicAds?: IklanBarisItem[];
  onSelectCategory?: (kategori: string) => void;
  onOpenForm?: () => void;
  siteName?: string;
}

// Authentic Newspaper Reference Ad Data matching print newspaper layout (Kompas / Kedaulatan Rakyat style)
const AUTHENTIC_NEWSPAPER_ADS: Record<string, Array<{ text: string; ref: string; isHot?: boolean }>> = {
  'MOBIL DISEWAKAN': [
    { text: 'Kurmia Trans.0816683885/540013/540014 Jakal Km.5,6 Pandega Duta II/3F (Xenia,New Avanza,March,Inova)', ref: '3/05400/0715' },
    { text: 'Dy-Ar: Mbl-Spr-Bbm 300rb/hrEsps Xna Avnz,APV,Inva,Prgo.Et.bus 081328110612/087838812423/085643236367', ref: '3/08021/0715', isHot: true },
    { text: 'NCR Nanda Car Rental.stock banyak Amplaz Carrefour ketimur&masuk ke utara 500m.Tlp 4.333.333', ref: '3/08022/0715' },
    { text: 'Hiace Commuter 14p Sapr,BBM,Wifi Bulan Promosi Diskon 200rb/hari Mayang 0877-0877-8929,081125-8929', ref: '3/08024/0715' },
    { text: 'Minibus isuzu elf 11,17seat medium bis 31seat,Inova,Avanz,dll Greska 6644666/08122747666/Pin 7435cafe', ref: '3/08029/0715' },
    { text: 'Termurah Sewa Pick Up Harian/Mingguan/Bulanan Hub 0853 2622 3505', ref: '3/08029/0715' },
    { text: 'gallerytransport.com Er3,Inova,Terios,Avanza,Xenia,Jazz,Yaris,Pu.Prego 0817270203,082243444315', ref: '3/08037/0715' },
    { text: 'Anas Rent Mbl.Mtr ConCat 887836/08121560634JakalKm14.5087736799100/0878380781616At.JpdtgTrpSopr', ref: '3/08047/0715' },
    { text: 'Aselia:NewAvanz,NewInnova,New Jazz Aselia:Yaris,Xenia,Luxury Apv; Aselia:GM pickUp.GM Box.ELF,Luxio Aselia:Travello,TY.Kipmuk.Truck.Prs Aselia:EngkelBox.Fortuner.Alphard Aselia:Siap antar 386765,7114321', ref: '7/08064/0715' },
    { text: 'Travello 11 seat,ELF 12 seat, Elf Long 16,19 seat AC,TV,Audio Elita Transport 0817422743', ref: '3/08070/0715' },
    { text: 'Garuda 9872100 New Avanza 15/G Livina15/Ertiga14/Kjg Inova/Travelo /Xenia/APV/G Max.Lmt/L.Kota/Drop', ref: '3/08071/0715' },
    { text: 'Garuda 9182918 Xenia+Sopr=185. APV+Spr=10J+Emas. Travello 12Seat+Sopr=300 Kjg Innova+Sopr=12J+285', ref: '3/08071/0715' },
    { text: 'Rental Mobil Xenia;All New 2014 Mobil sopir bensin tarif biasa hub 087839401840/085743160845', ref: '3/09608/0715' },
  ],
  'OPER KREDIT': [
    { text: 'Jual OV KDT new civic 01 AB pjk 1 th cklat muda on hg 28jt ang 2,7 jt.ngo 081228057772', ref: '3/08040/0715' },
    { text: 'Pickup SS120 2014 hitam Rp20jt kurang 36bln/2450rb An.sendiri Hub 0813291970/085701120070', ref: '3/10270/0715' },
  ],
  'OPTIK': [
    { text: 'Naufal Optik,Termurah DiJogja Per-sediaan Kmpltd.Kualitas Prima Kir Ditempat.Jl.Mataram 36 T.524860.', ref: '3/08046/0715' },
  ],
  'PARABOLA': [
    { text: 'Psg Serv.Parabola,Orange,Topas,Ant TV,CCTV,MATV,u/Ht,Rmh,H.Dsb Jl.Jend Suprapto 125 T 0274562631/123889/0811259815', ref: '3/08015/0715' },
    { text: 'OX Parabola Agen Resmi Smua TV Berlanggann Sdia CCTV Peralatan MATV Hotel dll.T.563850,0811283040', ref: '3/08054/0715' },
  ],
  'PELUANG USAHA': [
    { text: 'Kounter Usaha Kuliner Gratis di Pasar Kuliner Sleman(Foodcourt) Bakso,Soto,Gudeg dll. Potongan Omset Nego 081578803458, BB 281E1842', ref: '4/08037/0715' },
    { text: 'Karir 2015 Marketing Asuransi Anak BUMN. Gaji prestasi,komisi &Bonus reward. Hub 0852 9000 2809', ref: '3/08081/0715' },
    { text: 'Bantuan Modal Usaha 100jt-5M Syarat Ringan Nego Hub 081238004716', ref: '6/10136/0715' },
  ],
  'PEMBERITAHUAN': [
    { text: 'Puji Syukur Atas Terkabulnya Doa Novena 3X Salam Maria dan Rosario Edita Sta C.', ref: '3/09280/0715' },
    { text: 'Saksikan Pemeran Batu Mulia dan Akik 28 Jul-02 Agst.di Taman Kuliner Condongcatur.barat Terminal', ref: '3/10277/0715' },
  ],
  'PERCETAKAN': [
    { text: 'Specialis cetak fulcolour(offset) cepat&aman Hub:Perk.Ngeksigondo 0274-386016,085100694642 buktikan', ref: '3/08025/0715' },
  ],
  'PERHIASAN': [
    { text: 'TokoMas GadjahMas J1.Ketandan10Yk 555533/517584 membli emas hrgTggi trma pengembalian tk lain koleksi ikp.TKN.prmai jual beli berlian.Butuh uang tunai kami siap membantu', ref: '5/08065/0715' },
    { text: 'Tokomas LogamMulia J1.A.Yani92Yk 515757 hanya kami yg utamakan kwalitas,dijamin pengembaliannya kol eksi lengkap,menjual paling mrh membeli dengan harga tinggi.Trma barang kembalian dari Toko lain', ref: '6/08065/0715' },
    { text: 'Sedia Rangka Cincin dan Perhiasan Perak,Stock Lngkap Gallery SilverJ. Lor Psr Brgharjo No55(Brt Bca)', ref: '23/09227/0715' },
  ],
  'PERUMAHAN': [
    { text: 'Pesona Nrmala 2 Lok barat IKIP PGRI Sonopakis,design Mdrn, KPR DP 0% Hrg 370 Proses Mudah&Cpt.Hub:087739677155,065643395092,382170', ref: '5/08073/0715' },
    { text: 'Dijkontrakan Ruko di Sekitar Psr Kotagede Lokasi Strategis No SMS Hub:087736101283', ref: '3/08033/0715' },
    { text: 'Dswkn Tmpt Ush Salon fas lkp,siap pake,3Kmr,TV,Kukas.RrTmrKtgd.4jt/bl,081226116th.085329191557', ref: '3/08037/0715' },
    { text: 'LB 60 3KT 1KM di Wiyoro bisa KPR Hub 081328519535,087738855135', ref: '3/08025/0715' },
    { text: 'Type 45/162 dua muka bisa utk Usaha 5mnt dr Band Adisucipto lok Berbah hrg 400 jt Hub 08122764021', ref: '3/02582/0715' },
    { text: 'Rumah Bersubsidi Jalur Bandara Baru 1.Brimob Sentolo 2.SMP1 Sentolo 3.Polres Wates 4.Puskesmas Pengasih 5.STMN Wates 6.Kecamatan Temon 08567819858', ref: '5/04607/0715' },
    { text: 'Cluster Strategis Depan Kampus Terpadu UII (Pinggir Jalan Kaliurang Km 14.8) 9 Unit Hrg Perdana 900jt-an Hub 081325392508', ref: '4/05643/0715' },
    { text: 'Rumah Hrg 580jt luas tanah 174m2 SHM Dlm Permahan Dekat Rmh Makan Jimbaran&Hi Hyatt H:087833265903', ref: '3/08021/0715' },
    { text: 'Djl Kost 16 Kmr PogungRejo,Bngun an baru,Kmd.Air nis,SHMP.Parkir 7 mtr,Mtk bnyk.3,6M Ng 0818292069', ref: '3/08030/0715' },
    { text: 'Rmh 2Lt Lingkgn Tenang di Pogung tapan LB100 LT264 KT3 KM3 Carport 2Mbl Harga Nego Hub 087738836376', ref: '3/08033/0715' },
    { text: 'Rmh Dkt UGMUI Kaliurang,Lt,Palagan,type 70/120 hg: 570jt,LT3kt,2Km) H:082225154625/087832224482', ref: '3/08034/0715' },
    { text: 'Rmh Siap Bangun dkt Pemda Sleman / Jombor 2Kt1Dr.Nyaman Strategis 365Jt H:08222514625-087832224482', ref: '3/08034/0715' },
    { text: 'Jual RUMAH SHM LT211m2,LB70m2 LD:13m.2KT,1KM,Grs.Lok.Pogung Lor dkt UGM,HRG 1.2M,H:0878 3956 5812', ref: '3/08035/0715' },
    { text: 'Rmh Baru ber IMB T42/72 Jl Bantul Km 9 Blkg Mes Persiba 235Jt Bisa KPR 0817227477', ref: '3/08035/0715' },
    { text: 'Djl Rmh utr GreenHill,Type 60/109 3Krdr,2Kmd,530jt Nego Bns TV/AC/Canopy Carport 08114161416', ref: '3/08035/0715' },
    { text: '1unit rmh mewah siap huni 135/138m 5kav siap bangun@125m di J Wates depan Candi Pura.Bisa kerjasama bangun jual.081578803458, BB 281E1842', ref: '3/08038/0715' },
    { text: 'Rmh baru mewah Jakal Km 7 dkt UGM,LT105m LB65m 7KT1KmRmg.Tmn.Hal Ls.Mobil Pmrk.081215663959', ref: '3/08039/0715' },
    { text: 'Asal Laku Aja Hgl Dlm Kota L732m SHM 12Kt BS Bangun 3-10Lt Hg Nego Bnget&Murah Skali 087774888230 TP', ref: '3/08046/0715' },
    { text: 'Djl/Disewa Rmh Perum Hyarta LT180 m2 LB221m2 Kamar 4+1 Listrik 2200 Hub Pemilik 0878 3900 5000 No Sms', ref: '3/08047/0715' },
    { text: 'Rumah siap huni 2kt lokasi Jakal LB/LT 157/143Jegal.KPK,PRM,SHM,HP 082225152599/087738384482', ref: '5/09195/0715' },
    { text: 'Dijual Rmh Siap Huni Type 60/127,Lok J Wales Km.8,5 Sedayu (dr Jl Wates Masuk 200m) SHM&IMB Bsi KPR H.085228134549/087738283338', ref: '3/10284/0715' },
    { text: 'Lokasi Sidoarjo Gamping SHM 450jt Hub:08562511177/0817268506', ref: '3/09180/0715' },
    { text: 'Rumah Baru Type70/120 lokasi Sidoarjo Kalasan SHM hook 480jt hub:08562511177/0817268506', ref: '3/09181/0715' },
    { text: 'Rmh New 2unit Kotamadya LT119,LB 75,3KL,2KM.Carport,KPR.Hpr.H575jt Hub 082242626456,081804000600', ref: '3/09441/0715' },
    { text: 'Rmh Cluster TP70/129 3KT 2Km CpTgl 2rmh SHM+IMB 300m lmr Sdr Sidoan Rmagjo Sleman Hb:087838904546', ref: '3/09551/0715' },
    { text: 'BsrFsjart-Kokoh Bgtn-Kotagede,Lt+ 340/ 260m 5Kt3Kwh,Grs3mbl, 3AC,Klt;Ut,Wg0812.Inves 081227700444', ref: '3/09592/0715' },
    { text: 'Rumah SHM LT105/LB 80 IMB Baru Renovasi dkt Indomart Sidoarjo Godean 395jt nego 08122798645', ref: '3/09781/0715' },
    { text: 'Prm Jambusari CondongCatur T45(9x10) SHM-IMB Jl Jngk5m-12m dkt Kmpus STIM,pjam,396t TP 08156856284', ref: '3/09794/0715' },
    { text: 'Rmh Mewah,sgt Jls Mewah*Tdk Perlu Dijelaskan*Lok CasaGrande,Cluster Terbaik Barcelona.LT360/LB300(2Lt) hal luas bisa uk+Renang,BU (SHM, IMB,DoK)Hub:085643972572 TP', ref: '5/09801/0715' },
    { text: 'Rumah kos 6kt 5km Garasi dapur di jual murah lok Prambanan baru garu H.875jtrego hub:0817278856', ref: '3/09990/0715' },
    { text: 'Rumah Jual LT 124 LB 60 SHM Jl.Palagan Km10 Perum Grya Gama Mandiri hub 081916453222', ref: '3/10016/0715' },
    { text: 'Rmh Wiyoro,Bantul,dkt RingRoad LT/LB 119/100,4KT,2KM,AC,Heater,Garasi Mobil.H479Jt H:081392321910', ref: '3/10018/0715' },
    { text: 'Rumah baru di Sidoarjo LT180/LB 140 3KT 2KM Carport hal bkg msh sisa full garant&jati 0817457299 TP', ref: '3/10023/0715' },
    { text: 'Br.100 J Magelang Km11 dkt Pemda Sleman Lt/Lb 67/119,3Kt-2Km,Carport mbl msk.330jt 085643686590', ref: '3/10087/0715' },
    { text: 'Jual Rmh baru Type 36 luas tanah 200m2 SHM Harga rp185jt nego alamat Gondangdia Wates tlp 0822420 15368,087839379426,0274 896187', ref: '4/10115/0715' },
    { text: 'Rmh 1,5LI 12Kt 3KM Rtamu Dpr lok 50m dr kampus Sanata Darma Mrican H:0852851605 No SMS', ref: '3/10150/0715' },
    { text: 'Rmh stn Hyatt luas 405m2 9kt 9km Parkir luas cck u kos2an hrg 1,7M hub 081802653600/082138221107', ref: '3/10193/0715' },
    { text: 'Potorono J Wonosari Baru L1123/60 3kt2Kmac Jalt hal Jl Lebar 5m 15mnt kota hub 08175458800', ref: '3/10219/0715' },
    { text: 'Barat UMY Terpadu,SHM,Luas 300m, LD 15m luas bangunan 200,siap dtingkat,0812 285 1323', ref: '3/10268/0715' },
    { text: 'BU dijual Rmh Purwomartani Kalasan LT 170 Kmr 3 SHM an sendiri TP TP 08159796148', ref: '3/10284/0715' },
    { text: 'Dikontr Bangunan Tempo Dulu dg sentuhan modernlok,luas pas utk cocok utk acare2 Keluarga,Wedding,utah,Gathering Hub 081219192557', ref: '4/10356/0715' },
    { text: 'Lb200m Lhal 125m 2Kt KMdalam RTrk lok Dpn Bale RW Gendengan Kalasan hub 06179496866 TP Carport msk', ref: '3/10369/0715' },
    { text: 'Dikontrak Rmh 3Kt 3Km Fulkeramik lok Brt Sinduaprk dkt TVRI UTY MMTC Hub 087838685324 / 081227717426', ref: '3/10437/0715' },
    { text: 'Disewakan Apartemen Full FurnishDi Seturan dkl Kampus STIE,UPN, Atmajaya bs Bln/Thn Yokie0816770577', ref: '3/10675/0715' },
  ],
  'RUANG USAHA': [
    { text: 'Disewakan/jual Tanah kosong dan bang baru/Luxury/rangka baja/lok tepi Jn Raya Jakal Km 8(Dayu)Lebar +50m(View)sungai cocok u/villa+ Restaurant/SHM/Hub 0811268434', ref: '5/09195/0715' },
    { text: 'Disewakan ruang usaha tepi jalan Am Sangaji batas kota 8x8m 1Lt,listrik 2200Watt hub 085729690996', ref: '3/09239/0715' },
    { text: 'Disewakan Kios Utk Mie Ayam Prngk 08', ref: '3/09280/0715' },
  ],
  'SALON': [
    { text: 'Perawatan Thb Di Queen Spa Rlex.Sehat, Bugar, Terapis Pnglmn. Jl. Laksda Ad Sucipto Km 8 T 9597872', ref: '3/08025/0715' },
    { text: 'Princess Spa salon menghadirkan perawatan yg sempurna utk memanja kan tubuh anda 43634190rsconhfg', ref: '3/08044/0715' },
    { text: 'Rilexkan tbh dg prwtn di Kanti SPA,terapis br/pnglmn.Jl Candi Sambisari,utr Psr Samping 0857997874', ref: '3/08066/0715' },
    { text: 'Kenssa Spa,Pijat,Lulur,Spa.Yg Cantk,Trampil Siap Bikin Nikmat Jl SdoKm14 Kalasan YkT085106030300', ref: '3/08030300/0715' },
    { text: 'Belia Anjani Spa Promo Baru dgn Theraps bani hrg terjangkau semu yang anda inginkan ada DeLang buk bkan!! Ruko Sumber Baru Land Barat Fly Over Jombor Tlp 087738554882 BB 54BE857A', ref: '6/09500/0715' },
  ],
  'SERVIS': [
    { text: 'Aneka Servis Elektronik 1Jam Jadi Mesi,Cuci,TV,LCD,Kulkas,AC,Tape. Hub 081915555071/085101666932', ref: '3/04291/0715' },
    { text: 'Servis TV Kilat Tlp:0274-4361652 Supr.Cek TV=Gratis,Bbm=10rb,Siap TV=2Jam,LNGS Jadim=085878282940 T-As=085100870070 XL=087838724179', ref: '4/08020/0715' },
    { text: 'Audio-Video Mobil Anda Rusak,Kami Ahlinya H 082135022539 JIRRsel 22 Krapyak Ygk,Agen Kami JmptLke Rmh', ref: '3/08071/0715' },
    { text: 'Bermasalah dgn Mobil atau Motor Matic Anda,Kami Ahlinya H.0821350 22539 Jl RR Sel 22 Krapyak Ygk', ref: '3/08071/0715' },
    { text: 'Kulkas,Kulkas.! Spesialis Servs kulkas Panggilan(Grs) Tlp: 6584084, 081804198271, 085102584084', ref: '3/09796/0715' },
    { text: 'Yogya Servis Panggilan TV,LCD,DVD Tape,Audio,AC,Kulkas,Mcuci,Water-HK Gas,Alat2RT,DLL,Hp 085102408378', ref: '3/09904/0715' },
    { text: 'Mega Servis AC Kulkas Mci Wheater Kgas dl Pnggl Bergr Hub:0274-7685501085729270423/081392062999', ref: '3/09947/0715' },
  ],
};

export default function NewspaperClassifiedGrid({
  dynamicAds = [],
  onSelectCategory,
  onOpenForm,
  siteName = 'Parenting',
}: NewspaperClassifiedGridProps) {

  // Group dynamic ads by category
  const groupedDynamicAds: Record<string, IklanBarisItem[]> = dynamicAds.reduce((acc, item) => {
    const katKey = (item.kategori || 'LAIN-LAIN').toUpperCase();
    if (!acc[katKey]) acc[katKey] = [];
    acc[katKey].push(item);
    return acc;
  }, {} as Record<string, IklanBarisItem[]>);

  // Combine categories
  const allCategoryKeys = Array.from(
    new Set([...Object.keys(AUTHENTIC_NEWSPAPER_ADS), ...Object.keys(groupedDynamicAds)])
  );

  return (
    <div className="newspaper-classified-container bg-white text-black p-2 sm:p-4 border-2 border-black rounded-sm font-serif select-text shadow-xl">
      
      {/* NEWSPAPER MASTHEAD HEADER */}
      <div className="border-b-4 border-black pb-2 mb-3 text-center">
        <div className="flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider border-b border-black pb-1 mb-1">
          <span>LEMBARAN IKLAN BARIS & DISPLAY</span>
          <span>• KORAN CETAK EDISI DIGITAL •</span>
          <span>EDISI: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-1">
          <div className="text-left">
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter leading-none font-serif">
              IKLAN BARIS {siteName.toUpperCase()}
            </h2>
            <span className="text-[10px] font-sans font-bold text-gray-700 uppercase tracking-widest block">
              OTOMOTIF • PROPERTI • LOWONGAN • SALON • SERVIS • PERCETAKAN
            </span>
          </div>

          {onOpenForm && (
            <button
              onClick={onOpenForm}
              className="px-3 py-1 bg-black text-white text-[10px] font-sans font-black uppercase tracking-wider hover:bg-gray-800 transition-colors border border-black flex items-center gap-1 shrink-0"
            >
              <Tag className="w-3 h-3 text-yellow-400" />
              + Pasang Iklan Baris Cetak
            </button>
          )}
        </div>
      </div>

      {/* MULTI-COLUMN DENSE PRINT NEWSPAPER GRID */}
      <div className="newspaper-columns text-black">

        {/* FEATURED DISPLAY BOX AD 1: SUMBER BARU LAND (Top Left Display Ad) */}
        <div className="newspaper-block border-2 border-black p-1.5 bg-gray-100 text-center mb-2 shadow-sm">
          <div className="bg-black text-white text-[11px] font-black uppercase tracking-tight py-0.5 px-1 mb-1">
            SUMBER BARU LAND
          </div>
          <p className="text-[9.5px] font-black leading-tight uppercase font-sans">
            GEDUNG SUMBER AUTO LT.2
          </p>
          <p className="text-[9px] leading-tight font-sans">
            Jl. Magelang Km. 5,8 Yogyakarta
          </p>
          <div className="my-1 border-t border-b border-black py-0.5 font-bold text-[10.5px]">
            TELP. (0274) 587799
          </div>
          <div className="bg-white border border-black p-1 mt-1 text-[8.5px] leading-tight text-left">
            <span className="font-bold block text-[9px] uppercase border-b border-gray-400">SBL SQUARE</span>
            Jl. Ringroad Utara (Jombor) Depan UTY, Sleman, Yogyakarta<br />
            <span className="font-bold">Telp. 0274-888838 / 9807000</span>
          </div>
        </div>

        {/* CATEGORY & AD BLOCKS FLOW */}
        {allCategoryKeys.map((catName) => {
          const authenticList = AUTHENTIC_NEWSPAPER_ADS[catName] || [];
          const dynamicList = groupedDynamicAds[catName] || [];

          return (
            <div key={catName} className="newspaper-block mb-2">
              {/* CATEGORY HEADER BANNER (SOLID BLACK, INVERTED WHITE TEXT) */}
              <div 
                onClick={() => onSelectCategory && onSelectCategory(catName)}
                className="newspaper-cat-header cursor-pointer hover:bg-gray-900 transition-colors"
              >
                {catName}
              </div>

              {/* DYNAMIC API USER ADS (RENDERED FIRST IF AVAILABLE) */}
              {dynamicList.map((item) => (
                <div key={item.id} className="newspaper-ad-item bg-amber-50/60 font-sans border-l-2 border-l-black pl-1 my-0.5">
                  <span className="font-bold text-[9px] uppercase bg-black text-white px-1 py-0.2 mr-1">
                    [BARU]
                  </span>
                  <span className="font-medium">
                    {item.keteranganBarang} Hrg: <span className="font-bold">{item.harga}</span>. Hub: <span className="font-bold">{item.phone}</span> ({item.nama} • {item.kota})
                  </span>
                  <span className="newspaper-ref-code text-[8.5px] text-right font-mono font-bold block text-gray-600 mt-0.5">
                    1/{String(item.id).padStart(5, '0')}/2026
                  </span>
                </div>
              ))}

              {/* AUTHENTIC PRINT NEWSPAPER TEXT ADS */}
              {authenticList.map((ad, idx) => (
                <div key={idx} className={`newspaper-ad-item ${ad.isHot ? 'bg-yellow-50 font-semibold' : ''}`}>
                  <span>{ad.text}</span>
                  <span className="newspaper-ref-code text-[8.5px] text-right font-mono text-gray-600 block mt-0.5">
                    {ad.ref}
                  </span>
                </div>
              ))}

              {/* DISPLAY BOX AD EMBEDDED IN PERUMAHAN SECTION */}
              {catName === 'PERUMAHAN' && (
                <>
                  <div className="newspaper-block border-2 border-black p-1 bg-white text-center my-2">
                    <div className="bg-black text-white font-black text-[10px] uppercase py-0.5">
                      Pondok Permai GIWANGAN
                    </div>
                    {/* SVG House Illustration Placeholder */}
                    <div className="my-1 border border-black p-1 bg-gray-50 flex items-center justify-center gap-1">
                      <Building2 className="w-5 h-5 text-black" />
                      <div className="text-left leading-none">
                        <span className="text-[10px] font-black block">HUNIAN EKSKLUSIF</span>
                        <span className="text-[8px] font-bold text-gray-700">DI UTARA KOTA YOGYAKARTA</span>
                      </div>
                    </div>
                    <div className="text-[11px] font-black text-black">
                      2.5 JT/THN • KPR DP 0%
                    </div>
                    <div className="text-[9px] font-bold font-mono border-t border-black mt-0.5 pt-0.5">
                      HUB: 0274-587799 / 081227018983
                    </div>
                  </div>

                  <div className="newspaper-block border-2 border-black p-1 bg-gray-50 text-center my-2">
                    <div className="border border-black p-1">
                      <span className="text-[10px] font-black uppercase tracking-tight block border-b border-black pb-0.5">
                        Pondok Permai KALIURANG 2
                      </span>
                      <p className="text-[8.5px] py-1 font-bold">
                        Fasilitas Lengkap: Swimming Pool, Club House, One Gate System 24 Jam.
                      </p>
                      <div className="bg-black text-white text-[10px] font-black py-0.5">
                        SUMBER BARU LAND
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* DISPLAY BOX AD EMBEDDED IN RUANG USAHA SECTION */}
              {catName === 'RUANG USAHA' && (
                <div className="newspaper-block border-2 border-black p-1.5 bg-yellow-100/70 text-center my-2">
                  <div className="text-[10px] font-black uppercase border-b-2 border-black pb-0.5">
                    LAGUNA SPRING JOGJA
                  </div>
                  <p className="text-[8.5px] py-1 font-semibold">
                    Rumah Mewah Modern Tropis + Private Club House. Lokasi Strategis Ringroad Selatan.
                  </p>
                  <div className="text-[10px] font-black font-mono">
                    TELP. 0274-587799
                  </div>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* FOOTER NOTICE */}
      <div className="border-t-2 border-black pt-2 mt-4 text-[9px] font-sans flex flex-col sm:flex-row items-center justify-between text-gray-700 gap-1">
        <span>* Seluruh iklan cetak diperiksa tim Editor Redaksi. Tanda rujukan contoh: (3/08025/0715).</span>
        <span className="font-bold">HARIAN TEKS DIGITAL • HAK CIPTA DILINDUNGI</span>
      </div>
    </div>
  );
}
