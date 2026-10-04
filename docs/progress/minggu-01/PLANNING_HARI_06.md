# Rencana Pembelajaran: Hari 6 (Sabtu, 3 Oktober 2026)

Panduan terstruktur pelaksanaan materi **Global State Management Modern dengan Zustand**, Integrasi Persistensi **Web Storage API (`localStorage`)**, dan Pembangunan **Mini Project 1: Interactive Study & Task Tracker (CRUD Penuh)** pada ekosistem React 19 / 18 + Vite + TypeScript.

---

## 1. Sasaran Utama & Hasil yang Diharapkan

- **Tujuan Pembelajaran**:
  - Memahami batasan *Local Component State* dan fenomena *Prop Drilling* dalam aplikasi berskala menengah ke atas.
  - Membandingkan *Context API* vs *Zustand* (alasan industri memilih Zustand: zero-boilerplate, tanpa provider wrapper, fine-grained selector re-rendering, dan ekosistem middleware bawaan).
  - Menguasai pembuatan *Centralized Store* menggunakan `create()` dari Zustand dengan dukungan *Strict TypeScript Types*.
  - Mengimplementasikan middleware bawaan `persist` dari `zustand/middleware` untuk sinkronisasi otomatis ke `localStorage`.
  - Membangun **Mini Project 1: Study & Task Tracker Pro** dengan fitur CRUD (Create, Read, Update, Delete), filter status tab, indikator prioritas (*High, Medium, Low*), kategori modul belajar, live search, dan ringkasan statistik persentase progres.
  - Mengintegrasikan reusable UI primitives (`Button`, `Badge`) dan styling adaptif Tailwind CSS v4 dari Hari 5.

- **Kriteria Keberhasilan**:
  - Dependensi `zustand` dan `lucide-react` terpasang tanpa konflik.
  - Berkas store terisolasi rapi di `src/store/useTaskStore.ts` dengan interface state & actions yang type-safe.
  - CRUD beroperasi lancar:
    - Menambah task baru dengan judul, deskripsi, prioritas, dan kategori modul.
    - Menandai selesai / belum selesai (toggle complete).
    - Menghapus task satuan dan membersihkan seluruh task selesai (*clear completed*).
    - Mengedit judul / deskripsi task.
  - Data tetap tersimpan secara persisten di `localStorage` peramban saat halaman direfresh atau browser ditutup.
  - Antarmuka adaptif penuh (*Light Mode* & *Dark Mode*) dan responsif di smartphone maupun desktop.
  - Lolos typechecking TypeScript (`tsc -b`), linting ESLint (`npm run lint`), dan lolos build produksi (`npm run build`).

---

## 2. Peta Konsep & Mental Model

- **Local State vs Global State**:
  - *Local State (`useState`)*: Terikat pada siklus hidup satu komponen. Jika komponen di-unmount, state lenyap.
  - *Lifting State Up*: Solusi sementara menaikkan state ke parent terdekat, namun memicu *Prop Drilling* bertingkat-tingkat jika komponen anak berada jauh di bawah pohon DOM.
  - *Global State (Store)*: Data berada di luar pohon komponen React (*external state*). Komponen mana pun dapat berlangganan (*subscribe*) langsung ke data atau memicu aksi (*dispatch action*) tanpa melalui parent.

- **Mengapa Zustand Mengungguli Context API**:
  - *Context API*: Memerlukan pembungkus `<Provider>` di root. Setiap kali nilai context berubah, SEMUA komponen consumer akan re-render, kecuali dioptimasi secara manual dengan rumit.
  - *Zustand*: Berbasis model pub/sub (*publish-subscribe*). Komponen hanya me-render ulang jika nilai spesifik yang dipilih via *selector* (`state => state.activeTasks`) mengalami perubahan.

- **Immutability & State Setter di Zustand**:
  - Fungsi `set()` dari Zustand secara otomatis melakukan penggabungan shallow (*shallow merge*) pada tingkat atas.
  - Untuk array atau objek tersarang (*nested*), prinsip immutability tetap wajib dijaga menggunakan spread operator (`...`) atau helper fungsional (`map`, `filter`).

---

## 3. Rencana Arsitektur & Struktur Berkas

- **Struktur Folder & Penempatan File**:
  - `src/types/task.ts`: Interface domain entitas `Task`, `TaskPriority`, `TaskCategory`, dan `TaskFilter`.
  - `src/store/useTaskStore.ts`: Zustand store terpusat dengan middleware `persist` dan aksi CRUD lengkap.
  - `src/pages/TaskManagerPage.tsx`: Halaman utama Mini Project 1 menampung layout, form input, statistik cards, tab filter, dan daftar kartu tugas.
  - `src/components/tasks/TaskItem.tsx`: Komponen kartu task modular dengan checkbox toggle, badge prioritas, tombol edit, dan tombol hapus.
  - `src/components/tasks/TaskStats.tsx`: Kartu ringkasan statistik (Total tugas, tugas selesai, sisa tugas, persentase progres).
  - `src/router/index.tsx`: Mendaftarkan route `/tasks` dan tautan navigasi di `RootLayout.tsx`.

---

## 4. Alur Kerja & Langkah Pelaksanaan Sesi

1. **Persiapan Dependensi**:
   - Menjalankan `npm install zustand lucide-react` di folder `react-ts`.
2. **Penyusunan Modul Teori**:
   - Menulis `MODUL_TEORI_HARI_06.md` yang mengupas tuntas arsitektur state management modern, Zustand mechanics, selector optimization, dan persist middleware.
3. **Penyusunan Domain Types & Zustand Store**:
   - Membuat `src/types/task.ts` dan `src/store/useTaskStore.ts`.
4. **Pembangunan Komponen Antarmuka Mini Project 1**:
   - Membuat komponen `TaskStats.tsx` dan `TaskItem.tsx`.
   - Mengembangkan halaman `TaskManagerPage.tsx` dengan form interaktif, pencarian, dan tabs filter.
5. **Pembaruan Navigasi & Router**:
   - Menambahkan menu "🎯 Task Tracker (Mini Project 1)" di `RootLayout.tsx` dan route `/tasks` di `router/index.tsx`.
6. **Verifikasi & QA**:
   - Menguji persistensi `localStorage`, fungsionalitas CRUD, responsivitas layar mobile/desktop, serta mode light/dark.
   - Menjalankan `npm run build` dan `npm run lint`.
