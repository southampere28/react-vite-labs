# Progress Belajar: Hari 4 (Kamis, 1 Oktober 2026)

Dokumentasi implementasi nyata, arsitektur routing modern, migrasi modularisasi halaman, dan penguasaan `react-router-dom` v7 pada ekosistem React + TypeScript.

---

## 1. Identitas Sesi & Topik

- **Tanggal Pelaksanaan**: Kamis, 1 Oktober 2026
- **Topik Pembelajaran**: Client-Side Routing (SPA), `react-router-dom` v7, Data Router (`createBrowserRouter`), Nested Layouts (`<Outlet />`), Navigasi Deklaratif (`<NavLink>`, `<Link>`), Dynamic Routing (`:id` & `useParams`), Navigasi Programatik (`useNavigate`), dan Halaman 404
- **Workspace Proyek**: `/home/pramudya/Development/course/react/react-ts`
- **Status Sesi**: Selesai (Completed & Verified 100%)

---

## 2. Ringkasan Pencapaian & Arsitektur yang Dibangun

- **Restrukturisasi Direktori Berbasis Halaman & Layout (Standard Production)**:
  - Berhasil memisahkan komponen `App.tsx` monolitik menjadi modul-modul halaman terisolasi:
    - `src/layouts/RootLayout.tsx`: Kerangka layout bersama (Navbar + Header + `<Outlet />`).
    - `src/pages/HomePage.tsx`: Dashboard daftar mahasiswa, interaktivitas, pencarian live (*derived state*), dan penambahan data.
    - `src/pages/StudentDetailPage.tsx`: Halaman detail data mahasiswa berdasarkan ID dinamis.
    - `src/pages/ProgressNotesPage.tsx`: Halaman arsip dokumentasi progres belajar mandiri.
    - `src/pages/NotFoundPage.tsx`: Halaman fallback error 404 untuk menangani URL yang tidak terdaftar.
    - `src/router/index.tsx`: Konfigurasi peta rute terpusat menggunakan `createBrowserRouter`.

- **Penerapan Data Router Engine (`createBrowserRouter` & `RouterProvider`)**:
  - Mengonfigurasi router modern React Router v7 secara deklaratif terpusat.
  - Komponen `App.tsx` menjadi sangat ramping dan bersih (hanya membungkus `<RouterProvider router={router} />`).

- **Pola Tata Letak Bersarang (*Nested Routing*) dengan `<Outlet />`**:
  - Memahami fungsi komponen `<Outlet />` sebagai slot dinamis untuk merender rute anak tanpa memicu render ulang (*unmount/mount*) pada Navbar atau Header.

- **Navigasi Deklaratif Berbasis SPA**:
  - Menggantikan tag `<a href>` dengan `<NavLink>` pada menu navigasi untuk memberikan indikasi styling visual link aktif (`isActive`).
  - Menggunakan `<Link to="...">` untuk tautan cepat antar-halaman tanpa memicu reload browser.

- **Dynamic Routing & Ekstraksi Parameter URL**:
  - Menerapkan rute dinamis `students/:id`.
  - Menggunakan hook `useParams<{ id: string }>()` untuk mengambil ID dari address bar dan melakukan fetch detail data spesifik dari REST API JSONPlaceholder (`/users/${id}`).

- **Navigasi Programatik (*Programmatic Navigation*)**:
  - Menggunakan hook `useNavigate()` untuk menangani aksi kembali ke halaman sebelumnya (`navigate(-1)`).

---

## 3. Catatan Konseptual Mendalam: Perbedaan `key` vs Field/Prop Biasa

Dalam sesi ini, diidentifikasi perbedaan esensial antara properti khusus `key` dan prop/field biasa:

- **Prop / Field Biasa (`name`, `role`, `id`)**:
  - **Tujuan**: Konsumsi komponen untuk ditampilkan ke antarmuka pengguna (UI).
  - **Aksesibilitas**: Diterima langsung oleh fungsi komponen melalui argumen `props`.
  - **Tindakan**: Bisa dicetak ke layar, di-style, atau diolah di dalam JSX.

- **Properti Khusus `key` (Reserved Property)**:
  - **Tujuan**: Identifikasi internal untuk mesin perbandingan React (*Virtual DOM Reconciliation / Fiber Engine*).
  - **Aksesibilitas**: **TIDAK BISA** diakses oleh komponen. Menulis `props.key` akan menghasilkan peringatan dari React bahwa `key` bukan prop publik.
  - **Peran Kritis**: Sebagai sidik jari unik (*fingerprint*) tiap elemen dalam array. Dengan `key` yang stabil dan unik (bukan index array acak), React dapat mengetahui secara presisi elemen mana yang ditambah, dihapus, atau dipindah posisinya tanpa perlu me-render ulang seluruh daftar dari awal.

---

## 4. Hasil Pengujian & Verifikasi Kode

- **Pemeriksaan Kompilasi TypeScript**:
  - Perintah: `npx tsc --noEmit`
  - Hasil: Sukses 100% tanpa kesalahan tipe data (`0 errors`).

- **Pemeriksaan Linter ESLint**:
  - Perintah: `npm run lint`
  - Hasil: Bersih total (`0 warnings, 0 errors`).

- **Pengujian Fungsionalitas Browser**:
  - Navigasi antar-tab Beranda dan Catatan Belajar berlangsung instan tanpa kedipan reload (*zero white flash*).
  - Mengklik tombol "Lihat Detail" pada kartu mahasiswa berhasil membuka halaman profil spesifik sesuai ID di URL.
  - Tombol "Kembali" pada halaman detail berhasil mengembalikan pengguna ke halaman daftar mahasiswa sebelumnya.
  - Mengetik URL yang tidak terdaftar menampilkan halaman 404 Not Found dengan tombol kembali yang berfungsi.

---

## 5. Evaluasi Mandiri & Kesiapan Sesi Berikutnya

- **Evaluasi**:
  - Arsitektur proyek telah naik kelas dari prototipe komponen tunggal menjadi struktur aplikasi berskala industri (*feature & page based architecture*).
- **Rencana Hari 5 (Jumat, 2 Oktober 2026)**:
  - Styling Antarmuka Modern menggunakan Tailwind CSS (v4 / v3 via `@tailwindcss/vite`).
  - Pembuatan komponen UI primitives yang reusable (Button, Badge, Card, Modal dialog).
