# Rencana Pembelajaran: Hari 4 (Kamis, 1 Oktober 2026)

Panduan terstruktur pelaksanaan materi Routing & Navigasi Modern menggunakan `react-router-dom` v6/v7 (Data Router Engine: `createBrowserRouter` & `RouterProvider`).

---

## 1. Sasaran Utama & Hasil yang Diharapkan

- **Tujuan Pembelajaran**:
  - Memahami konsep dasar SPA (*Single Page Application*) routing vs Multi-Page tradisional (*SSR full reload*).
  - Memasang dan mengonfigurasi `react-router-dom` menggunakan pola modern Data Router (`createBrowserRouter` & `<RouterProvider />`).
  - Menguasai navigasi deklaratif menggunakan `<Link />` dan `<NavLink />` (dengan indikator link aktif).
  - Mengimplementasikan navigasi programatik menggunakan hook `useNavigate()`.
  - Menerapkan rute dinamis (*dynamic routing*) `/students/:id` dan membaca parameter URL menggunakan hook `useParams()`.
  - Membangun tata letak bersarang (*nested layout*) menggunakan komponen pembungkus `<RootLayout />` dan `<Outlet />`.
  - Menangani rute tidak ditemukan (*404 Not Found*) dengan rute wildcard `*`.

- **Kriteria Keberhasilan**:
  - Paket `react-router-dom` terpasang dengan versi yang kompatibel dan bebas konflik.
  - Struktur folder rapi mengikuti arsitektur: `src/layouts/`, `src/pages/`, dan `src/router/`.
  - Pindah halaman berlangsung instan tanpa reload browser.
  - Halaman detail mahasiswa menampilkan detail data spesifik berdasarkan parameter ID di URL.
  - Lolos pemeriksaan tipe data TypeScript (`npx tsc --noEmit`) dan linter (`npm run lint`) tanpa error/warning.

---

## 2. Peta Konsep & Mental Model

- **SPA Routing (Client-Side Routing)**:
  - Pada web konvensional, mengklik link `<a>` meminta file HTML baru ke server (layar putih/reload).
  - Pada SPA, browser mencegat klik link, mengubah path di URL bar (`history.pushState`), lalu React mengganti komponen di layar secara instan di memori tanpa me-refresh halaman.

- **Data Router (`createBrowserRouter`)**:
  - Standar modern React Router (v6.4+ / v7) yang memisahkan konfigurasi route sebagai data array objek, mendukung loaders, nested layouts, dan error boundaries terisolasi.

- **`<Outlet />` & Nested Layout**:
  - Komponen wadah dinamis tempat komponen anak (*child route*) akan dirender di dalam layout induk tanpa merusak Navbar/Header.

- **`useParams` & Dynamic Route (`:id`)**:
  - Mekanisme membaca variabel dari URL (misal: `/students/1` $\to$ `{ id: "1" }`).

- **`useNavigate` (Programmatic Navigation)**:
  - Melakukan navigasi lewat kode JavaScript (misal: tombol kembali "Back", atau redirect setelah form submit).

---

## 3. Rencana Langkah Kerja Praktik (Step-by-Step)

- **Langkah 1: Instalasi Dependensi**:
  - Jalankan `npm install react-router-dom` di direktori `/home/pramudya/Development/course/react/react-ts`.

- **Langkah 2: Restrukturisasi Direktori Berbasis Halaman & Layout**:
  - Membuat folder `src/layouts` untuk `RootLayout.tsx` (Navbar + `<Outlet />`).
  - Membuat folder `src/pages` untuk:
    - `src/pages/HomePage.tsx`: Daftar mahasiswa, search bar, dan input tambah mahasiswa.
    - `src/pages/StudentDetailPage.tsx`: Halaman detail per mahasiswa dengan `useParams` & tombol kembali `useNavigate`.
    - `src/pages/ProgressNotesPage.tsx`: Wadah dokumentasi markdown progres belajar (Hari 1, 2, 3).
    - `src/pages/NotFoundPage.tsx`: Halaman error 404 jika URL tidak cocok.

- **Langkah 3: Konfigurasi Router Terpusat**:
  - Membuat `src/router/index.tsx` mendefinisikan seluruh struktur rute.
  - Menghubungkan router ke `src/main.tsx` atau `src/App.tsx`.

- **Langkah 4: Validasi & Pengujian**:
  - Menguji klik navigasi antar menu (Home, Catatan Belajar, Detail).
  - Menguji tombol detail di tiap kartu mahasiswa untuk masuk ke `/students/:id`.
  - Menguji tombol Back pada halaman detail.
  - Menjalankan `npx tsc --noEmit` dan `npm run lint`.
