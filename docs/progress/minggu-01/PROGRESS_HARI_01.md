# Progress Belajar: Hari 1 (Senin, 28 September 2026)

Dokumentasi pencapaian, implementasi kode, dan hasil evaluasi materi fondasi React dan ekosistem Vite.

---

## 1. Identitas Sesi & Topik

- **Tanggal Pelaksanaan**: Senin, 28 September 2026
- **Topik Pembelajaran**: Setup Vite + React, Fondasi Komponen, JSX/TSX, Props, & Dynamic Rendering
- **Workspace Proyek**: `/home/pramudya/Development/course/react/react-ts`
- **Status Sesi**: Selesai (Completed & Verified)

---

## 2. Ringkasan Pencapaian & Konsep yang Dikuasai

- **Setup Lingkungan Vite + React TypeScript**:
  - Berhasil menginisialisasi proyek menggunakan template `react-ts` dengan konfigurasi ESLint standar industri.
  - Memahami struktur arsitektur Vite: `index.html` sebagai root entry point native ES Modules, serta mounting root di `src/main.tsx` via `createRoot`.

- **Aturan Sintaksis JSX / TSX**:
  - Menguasai aturan pembungkus tunggal (*single root element*) menggunakan React Fragment `<> ... </>`.
  - Menerapkan penamaan atribut camelCase (`className`, `htmlFor`, inline styles dengan objek JavaScript).
  - Menyematkan ekspresi dinamis JavaScript di dalam kurung kurawal `{}`.

- **Komponen Modular & Reusable**:
  - Memisahkan komponen ke direktori `src/components/`.
  - Berhasil membuat komponen `Header.tsx` dengan format tanggal lokal Indonesia yang dinamis.
  - Berhasil membuat komponen `StudentCard.tsx` yang bersih dan independen.

- **Props & Type Safety dengan TypeScript**:
  - Mendefinisikan kontrak data menggunakan TypeScript `interface StudentCardProps`.
  - Menerapkan teknik destructuring props langsung pada parameter fungsi komponen.
  - Menggunakan prop khusus `children` (`React.ReactNode`) untuk komposisi konten fleksibel.

- **Penyelesaian Latihan Mandiri (Hands-On Challenges)**:
  - **Latihan 1 (Props Kondisional)**: Berhasil menambahkan prop `rating: number` dan merender badge `"⭐ Top Student"` secara kondisional saat rating bernilai 5.
  - **Latihan 2 (Dynamic List Rendering)**: Berhasil mendefinisikan array data murid bertipe `StudentCardProps[]` dan merendernya secara dinamis menggunakan perulangan array `.map()` lengkap dengan prop `key` unik.

---

## 3. Hasil Pengujian & Verifikasi Kode

- **Pemeriksaan Kompilasi TypeScript**:
  - Perintah: `npx tsc --noEmit`
  - Hasil: Sukses 100% tanpa error tipe data (`0 errors`).

- **Pemeriksaan Linter ESLint**:
  - Perintah: `npm run lint`
  - Hasil: Bersih sempurna (`0 errors, 0 warnings`).

- **Status Server Pengembang**:
  - Dev server aktif di `http://localhost:5173` dengan Fast Refresh / HMR berjalan normal.

---

## 4. Checklist Evaluasi Hari 1

- [x] Inisialisasi Vite + React + TypeScript sukses
- [x] Konfigurasi ESLint terpasang
- [x] Komponen modular `Header` dan `StudentCard` selesai dibuat
- [x] Props destructuring dan interface TypeScript berfungsi
- [x] Children prop diimplementasikan
- [x] Challenge 1 (badge rating kondisional) selesai
- [x] Challenge 2 (dynamic list `.map()`) selesai
- [x] Validasi `tsc` & `eslint` lolos
