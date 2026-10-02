# Rencana Pembelajaran: Hari 5 (Jumat, 2 Oktober 2026)

Panduan terstruktur pelaksanaan materi **Styling Antarmuka Modern dengan Tailwind CSS v4**, Penerapan Desain *Utility-First*, *Mobile-First Responsive Breakpoints*, dan Pembuatan Komponen *Reusable UI Primitives* (`Button`, `Badge`, `Card`).

---

## 1. Sasaran Utama & Hasil yang Diharapkan

- **Tujuan Pembelajaran**:
  - Memahami filosofi *Utility-First CSS* dan perbandingannya dengan inline styles maupun CSS tradisional (BEM).
  - Mengintegrasikan Tailwind CSS v4 ke dalam proyek React + Vite menggunakan plugin resmi `@tailwindcss/vite`.
  - Menguasai sistem desain *Mobile-First Responsive* menggunakan breakpoint (`sm:`, `md:`, `lg:`).
  - Membangun komponen UI primitif yang dapat dipakai ulang (*reusable UI components*) dengan dukungan varian warna dan ukuran via TypeScript (`Button.tsx`, `Badge.tsx`).
  - Merefaktor seluruh styling inline kaku (`style={{ ... }}`) pada komponen utama (`RootLayout`, `HomePage`, `StudentCard`) menjadi antarmuka modern yang responsif dan berestetika tinggi.

- **Kriteria Keberhasilan**:
  - Paket `tailwindcss` dan `@tailwindcss/vite` terpasang dan terkonfigurasi mulus tanpa error bundler.
  - Komponen UI primitives (`Button`, `Badge`) terisolasi rapi di folder `src/components/ui/`.
  - Tampilan web rapi di berbagai ukuran layar (smartphone, tablet, maupun layar desktop laptop).
  - Mengimplementasikan interaktivitas visual (*hover effect*, *active feedback*, *focus ring*, dan *smooth transition*).
  - Bebas dari error kompilasi TypeScript (`npx tsc --noEmit`), linter (`npm run lint`), dan lolos build produksi (`npm run build`).

---

## 2. Peta Konsep & Mental Model

- **Utility-First Workflow**:
  - Alih-alih menulis class khusus per elemen (seperti `.card-container`), kita menyusun antarmuka menggunakan class-class utilitas atomik kecil (seperti `flex`, `p-4`, `bg-slate-900`, `rounded-xl`).
  - Mempercepat styling tanpa *context-switching* bolak-balik antara file JSX dan CSS.

- **Tailwind v4 Oxide Engine**:
  - Kompiler berbasis bahasa Rust yang bekerja langsung di level ES Module Vite.
  - Tidak memerlukan file konfigurasi kuno (`tailwind.config.js` / `postcss.config.js`). Cukup satu direktif `@import "tailwindcss";` di CSS utama.

- **Mobile-First Paradigm**:
  - Selalu rancang untuk layar HP terkecil tanpa prefix (misal `w-full text-sm`).
  - Tambahkan breakpoint secara progresif untuk layar yang lebih lebar (misal `md:w-1/2 lg:w-1/3`).

- **Component Primitives & Variant Mapping**:
  - Menghindari duplikasi class panjang dengan membungkus elemen dasar ke dalam komponen React bertipe TypeScript kuat.
  - Menggunakan kamus objek (*lookup map*) untuk memetakan varian (`primary`, `secondary`, `danger`, `outline`) ke daftar utility class Tailwind.

---

## 3. Rincian Langkah Kerja Praktik

### Langkah 1: Instalasi & Konfigurasi Tooling Tailwind v4
- Jalankan instalasi dependensi di folder `react-ts`:
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
- Daftarkan plugin `@tailwindcss/vite` pada `vite.config.ts`.
- Tambahkan direktif `@import "tailwindcss";` di bagian paling atas file `src/index.css`.

### Langkah 2: Pembuatan Reusable UI Primitives
- Buat folder baru: `src/components/ui/`.
- Buat komponen `src/components/ui/Button.tsx`:
  - Mendukung properti varian: `primary` (biru), `secondary` (abu-abu/slate), `danger` (merah), `outline` (border transparan).
  - Mendukung properti ukuran: `sm`, `md`, `lg`.
  - Mendukung feedback interaksi: `hover:`, `active:scale-95`, `transition-all`.
- Buat komponen `src/components/ui/Badge.tsx`:
  - Mendukung properti varian status: `success` (hijau), `info` (biru), `warning` (kuning/amber), `neutral` (slate).

### Langkah 3: Modernisasi Layout & Navigasi (`RootLayout.tsx`)
- Bersihkan inline styling di `RootLayout.tsx`.
- Desain navbar modern bergaya *sticky glassmorphism* (`sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800`).
- Terapkan status aktif `<NavLink>` dengan kontras warna yang jelas (`text-blue-400 font-semibold border-b-2 border-blue-400`).

### Langkah 4: Modernisasi Komponen Mahasiswa (`StudentCard.tsx`)
- Ganti border dan inline styles dengan Tailwind card:
  - Efek kartu modern: `bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg hover:border-slate-500 hover:shadow-xl transition-all`.
  - Integrasikan `Badge` untuk menampilkan angkatan (*batch*), status aktif (*enrolled*), dan rating bintang.
  - Gunakan `Button` untuk tombol navigasi "Lihat Detail" dan "Hapus".

### Langkah 5: Modernisasi Dashboard Utama (`HomePage.tsx`)
- Tata letak container utama menggunakan `max-w-6xl mx-auto px-4 py-8`.
- Form tambah mahasiswa dengan input modern berestetika ring focus (`focus:ring-2 focus:ring-blue-500 bg-slate-800 border-slate-700`).
- Input pencarian (search bar) dengan ikon dan layout responsif.
- Grid kartu mahasiswa dinamis:
  - HP: 1 kolom (`grid-cols-1`).
  - Tablet: 2 kolom (`sm:grid-cols-2`).
  - Desktop: 3 kolom (`lg:grid-cols-3`).

---

## 4. Standar Validasi Kualitas

- [ ] Tailwind CSS v4 berhasil dikompilasi oleh Vite tanpa peringatan/warning.
- [ ] Tampilan antarmuka berubah dari inline style kaku menjadi desain modern terpadu.
- [ ] Breakpoint responsif berfungsi saat browser di-resize ke ukuran mobile dan desktop.
- [ ] Pemeriksaan TypeScript: `npx tsc --noEmit` lolos tanpa error (`0 errors`).
- [ ] Pemeriksaan Linter: `npm run lint` lolos (`0 errors`, `0 warnings`).
- [ ] Verifikasi Bundle Produksi: `npm run build` berhasil menghasilkan dist bundle optimal.
