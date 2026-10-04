# ⚛️ React 19 + TypeScript + Vite Application
### Interactive Study & Task Tracker + High-Frequency Zustand Playground

Bagian frontend utama dari ekosistem pembelajaran intensif React modern. Aplikasi ini memadukan **React 19**, **TypeScript**, **Zustand**, dan **Tailwind CSS**.

---

## 🚀 Fitur yang Diterapkan

- **Task Manager & Study Tracker**:
  - Operasi CRUD lengkap dengan persistensi `localStorage` otomatis melalui middleware `persist` Zustand.
  - Selektor atomik performa tinggi guna mencegah re-render yang tidak perlu.
  - Filter kategori dinamis (Vite, State, Routing, Styling, Backend) dan status pencarian instan.
  - Penghitungan statistik pembelajaran otomatis (*derived values*).
- **Zustand High-Frequency Playground**:
  - Arena 1: Pelacakan koordinat pointer mouse horizontal real-time 60 FPS.
  - Arena 2: Pengubah umur reaktif dengan transformasi avatar dan label kategori umur otomatis.
- **Routing Multi-Halaman Modern**:
  - Berbasis `react-router-dom` v7 (`/`, `/playground`, `/tasks`, `/notes`, `/students/:id`).
  - Layout terpusat (`RootLayout`) dengan indikator rute aktif otomatis.
- **Kesiapan Deployment Produksi**:
  - Konfigurasi `vercel.json` dan `public/_redirects` untuk penanganan SPA routing fallback (mencegah error 404 pada saat hard refresh).

---

## 🛠️ Perintah Pengujian & Eksekusi

```bash
# Jalankan server pengembang lokal (HMR instan)
npm run dev

# Pemeriksaan tipe data TypeScript
npx tsc --noEmit

# Pemeriksaan linter ESLint
npm run lint

# Kompilasi build produksi (Rollup minified di dist/)
npm run build

# Pratinjau lokal hasil build produksi
npm run preview
```
