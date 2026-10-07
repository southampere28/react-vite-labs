# Rencana Pembelajaran: Hari 7 (Minggu, 4 Oktober 2026)
## Topik: Optimasi Build Produksi, Deployment Mini Project 1 & Portofolio Showcase GitHub

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`  
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`  
Sub-Agent Penanggung Jawab: **Deployment, QA & Portfolio Specialist**

---

### 1. Tujuan Pembelajaran
- Memahami mekanisme *build production* pada Vite (Rollup bundling, minifikasi, tree-shaking, chunk split).
- Memecahkan masalah klasik SPA routing (mengatasi error 404 saat *hard-refresh* URL rute statis pada hosting seperti Vercel atau Netlify).
- Mengonfigurasi file rewrite SPA (`vercel.json` dan `public/_redirects`).
- Menguji hasil bundel produksi secara lokal menggunakan perintah simulasi `npm run preview`.
- Menyusun dokumentasi portofolio repositori GitHub bintang 5 (`README.md`) yang profesional dan memikat penilai/recruiter dunia kerja industri tech.
- Merangkum seluruh pencapaian pembelajaran Minggu 1 (Hari 1 hingga Hari 7) sebagai fondasi kokoh sebelum melangkah ke integrasi backend Laravel di Minggu 2.

---

### 2. Konsep Inti & Arsitektur
- **Development vs Production Mode**:
  - Dev server (`npm run dev`): Menjalankan ES Modules asli browser secara unbundled melalui `esbuild` demi kecepatan HMR instan.
  - Production build (`npm run build`): Melakukan kompilasi tipe TypeScript (`tsc -b`), lalu membundel seluruh modul ke dalam folder `dist/` menggunakan Rollup agar ukuran file seminimal mungkin.
- **Masalah SPA Fallback (Single Page Application Routing)**:
  - Pada browser lokal, navigasi URL ditangani oleh JavaScript (`react-router-dom`).
  - Ketika di-deploy ke server hosting statis (Vercel/Netlify), jika pengguna membuka langsung alamat `/tasks` atau me-refresh browser di halaman tersebut, server mencari file fisik `/tasks.html` yang tidak pernah ada sehingga muncul pesan galat `404 Not Found`.
  - Solusi: Menyediakan konfigurasi rewrite server yang mengarahkan semua rute (`/*`) kembali ke file root entry `/index.html` dengan kode status 200 HTTP.
- **Standardisasi Portofolio Profesional**:
  - Badges status & tech stack (React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router).
  - Tinjauan proyek & cuplikan fitur interaktif (Live Demo, CRUD Task Tracker, Zustand Pointer Game Playground).
  - Peta arsitektur folder & instruksi pemasangan lokal (*Getting Started*).
  - Catatan perjalanan kurikulum 2-Week Intensive Bootcamp.

---

### 3. Rincian Pekerjaan & Langkah Implementasi
- Menyusun berkas panduan teknis mendalam di `docs/progress/minggu-01/MODUL_TEORI_HARI_07.md`.
- Membuat konfigurasi rewrite Vercel di `/home/pramudya/Development/course/react/react-ts/vercel.json`.
- Membuat konfigurasi rewrite Netlify di `/home/pramudya/Development/course/react/react-ts/public/_redirects`.
- Menyusun `README.md` utama repositori di `/home/pramudya/Development/course/react/README.md` berstandar showcase portofolio kerja.
- Memperbarui `react-ts/README.md` dengan deskripsi aplikasi web yang akurat dan instruksi skrip yang lengkap.
- Mengintegrasikan ringkasan materi Hari 7 ke dalam halaman catatan belajar di `react-ts/src/pages/ProgressNotesPage.tsx`.
- Mencatat laporan hasil pencapaian di `docs/progress/minggu-01/PROGRESS_HARI_07.md`.
- Memperbarui status harian di `ROADMAP.md` untuk penutupan resmi Minggu 1.

---

### 4. Kriteria Keberhasilan (Definition of Done)
- Modul teori Hari 7 tersedia lengkap dengan penjelasan mendalam mengenai Rollup, SPA fallback, dan panduan deploy.
- Konfigurasi `vercel.json` dan `_redirects` valid dan siap digunakan untuk deploy satu klik (*zero configuration error*).
- Berkas `README.md` repositori menyajikan tampilan profesional siap pamer untuk rekrutmen / portofolio.
- Build bundle produksi (`npm run build`) dan pengujian preview lokal (`npm run preview`) berhasil tanpa pesan kesalahan.
- Seluruh kode lolos verifikasi TypeScript (`npx tsc --noEmit`) dan ESLint (`npm run lint`).
- Seluruh aturan kedisiplinan Git dipatuhi tanpa melakukan commit/push otomatis.
