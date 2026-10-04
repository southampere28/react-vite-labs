# Modul Pembelajaran Teori & Praktik: Hari 7 (Minggu, 4 Oktober 2026)
## Topik: Optimasi Build Produksi, Deployment Mini Project 1 & Portofolio Showcase GitHub

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`  
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`  
Sub-Agent Penanggung Jawab: **Deployment, QA & Portfolio Specialist**

---

### 1. Membedah Siklus Build Produksi Frontend pada Vite

Banyak pengembang pemula mengira perintah `npm run build` hanya menyalin folder `src` ke folder `dist`. Di balik layar, Vite menjalankan serangkaian proses rekayasa perangkat lunak tingkat tinggi:

- **Alur Pipa Kompilasi (Build Pipeline)**:
  - **Langkah 1 (TypeScript Check)**: `tsc -b` memeriksa keabsahan seluruh tipe data secara ketat. Jika ada kesalahan tipe, proses dihentikan sebelum kompilasi aset dimulai.
  - **Langkah 2 (Rollup Engine)**: Melakukan *tree-shaking* untuk membuang fungsi atau library yang tidak diimpor.
  - **Langkah 3 (Code Splitting & Chunking)**: Memecah bundel JavaScript dan CSS menjadi bagian-bagian terpisah agar peramban dapat mengunduh aset secara paralel.
  - **Langkah 4 (Minifikasi & Kompresi)**: Menghapus spasi, komentar, serta memperpendek nama variabel untuk menghemat *bandwidth*.
  - **Langkah 5 (Content Hashing)**: Menambahkan hash unik pada nama berkas (misal `index-ColUS7bQ.js`) untuk mekanisme *cache busting* otomatis pada peramban pengguna.

- **Dev Server (`npm run dev`) vs Production Build (`npm run build`)**:
  - `npm run dev`: Memanfaatkan `esbuild` berbasis Go untuk pra-bundling dependensi kilat dan menyajikan modul via native ESM browser (*instant HMR*).
  - `npm run build`: Memanfaatkan `Rollup` untuk menghasilkan berkas statis siap saji di folder `dist/` dengan rasio kompresi maksimal.

---

### 2. Masalah Klasik SPA Routing di Hosting Statis (Jebakan 404 Not Found)

Salah satu masalah utama yang sering membingungkan developer React saat pertama kali deploy ke server statis (seperti Vercel, Netlify, atau GitHub Pages) adalah galat 404 pada rute sekunder.

- **Penyebab Masalah**:
  - Aplikasi kita adalah **Single Page Application (SPA)**. Pada server fisik hosting, berkas HTML yang ada sebenarnya **HANYA SATU**, yaitu `index.html`.
  - Saat berpindah rute di peramban (misal klik menu `/tasks`), navigasi ditangani secara internal oleh JavaScript (`react-router-dom`) via HTML5 History API tanpa memuat ulang server.
  - Namun, ketika pengguna menekan tombol **Refresh (F5)** pada alamat `https://domain.vercel.app/tasks`, peramban meminta file fisik `/tasks` ke server. Karena file `/tasks.html` tidak ada di server, server mengembalikan respon **404 Not Found**.

- **Solusi: Server Rewrite ke `index.html`**:
  - Konfigurasi server hosting wajib diinstruksikan untuk meneruskan semua permintaan rute kembali ke `index.html` dengan status HTTP 200, sehingga React Router di browser yang akan menentukan tampilan halamannya.

---

### 3. Konfigurasi Deployment Siap Pakai

#### A. Konfigurasi untuk Vercel (`vercel.json`)
Diletakkan di direktori proyek `react-ts/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### B. Konfigurasi untuk Netlify (`public/_redirects`)
Diletakkan di folder aset publik `react-ts/public/_redirects` agar otomatis disalin ke root `dist/`:
```
/*    /index.html   200
```

---

### 4. Menguji Hasil Build Secara Nyata di Mesin Lokal (`npm run preview`)

Sebelum melakukan deployment ke internet publik, pengembang profesional selalu melakukan uji simulasi server statis lokal:

- **Perintah Eksekusi**:
  ```bash
  npm run build
  npm run preview
  ```
- **Fungsi `npm run preview`**:
  - Vite akan menyalakan server HTTP statis lokal (biasanya pada port 4173).
  - Server ini membaca berkas hasil kompilasi asli dari folder `dist/` (bukan dari folder `src/`).
  - Ini memastikan bahwa aplikasi tidak memiliki galat impor, file path rusak, atau CSS hilang yang sering kali tersembunyi saat berada di server pengembang `npm run dev`.

---

### 5. Standar Dokumentasi Portofolio GitHub Bintang 5

Untuk menarik perhatian rekruter industri atau reviewer program magang (seperti Maganghub / Kampus Merdeka), repositori GitHub wajib memiliki dokumentasi yang terstruktur rapi:

- **Hero Title & Badges**: Identitas proyek, status build, versi React (React 19), TypeScript, Vite, Tailwind CSS, dan Zustand.
- **Tinjauan Aplikasi (Overview)**: Latar belakang aplikasi, kegunaan utama, serta target capaian kurikulum.
- **Cuplikan Fitur Utama (*Feature Highlights*)**:
  - Interactive Study & Task Tracker (CRUD penuh dengan dialog edit modal).
  - Persistensi data lokal otomatis menggunakan middleware `persist` LocalStorage.
  - Interactive Playground (60 FPS pointer tracker & game modifier umur dengan reaktivitas instan).
  - Navigasi adaptif multi-halaman dengan React Router DOM v7.
- **Tautan Live Demo**: URL langsung yang dapat dicoba oleh penilai tanpa perlu clone kode ke laptop.
- **Arsitektur Direktori (*Directory Structure*)**: Peta susunan folder berbasis fitur (*feature-driven*) yang rapi dan bersih.
- **Petunjuk Instalasi & Menjalankan (*Getting Started*)**: Perintah instalasi dependensi, dev server, dan build produksi.

---

### 6. Rekapitulasi Pembelajaran Minggu 1 & Kesiapan Minggu 2

Minggu 1 telah membekali pengembang dengan fondasi frontend modern yang sangat kokoh:
- **Hari 1**: Fondasi Vite, JSX, modularitas komponen, Virtual DOM reconciliation.
- **Hari 2**: Penguasaan immutability state, synthetic events, controlled components.
- **Hari 3**: Side effects, cleanup functions, REST API consumption, handling error.
- **Hari 4**: Perutean dinamis, layout bersarang (`Outlet`), URL params, navigation hooks.
- **Hari 5**: Desain antarmuka Tailwind CSS modern, sistem tema, pembuatan UI primitives terisolasi.
- **Hari 6**: Arsitektur state global Zustand, selektor atomik, persistensi LocalStorage, dan Mini Project 1.
- **Hari 7**: Standar build produksi Rollup, penanganan SPA fallback 404, serta showcase portofolio kerja.

Fondasi ini menjadi pijakan sempurna sebelum memasuki **Minggu 2: Integrasi Backend Nyata (Laravel REST API, JWT/Sanctum Authentication, Protected Routes, Advanced Forms Zod, dan Dashboard Showcase)**.

