# Progress Belajar: Hari 3 (Rabu, 30 September 2026)

Dokumentasi pencapaian, implementasi kode mandiri, dan hasil evaluasi materi Side Effects, Siklus Hidup Render, Hook `useEffect`, AbortController, REST API Fetching & Derived State.

---

## 1. Identitas Sesi & Topik

- **Tanggal Pelaksanaan**: Rabu, 30 September 2026
- **Topik Pembelajaran**: Side Effects, Lifecycle (`useEffect`), Data Fetching API Publik, CORS Policy, AbortController & Derived State
- **Workspace Proyek**: `/home/pramudya/Development/course/react/react-ts`
- **Status Sesi**: Selesai (Completed & Verified 100%)

---

## 2. Ringkasan Pencapaian & Konsep yang Dikuasai

- **Mental Model Side Effect di React**:
  - Memahami perbedaan antara fungsi render murni (*pure rendering logic*) dengan efek samping (*side effects*).
  - Mengisolasi pemanggilan REST API eksternal dan manipulasi luar di dalam hook `useEffect`.

- **Aturan Emas Dependency Array**:
  - Memahami bahwa dependency array kosong `[]` berperan seperti siklus inisialisasi awal (*onInit* di GetX / constructor lifecycle) yang hanya dieksekusi satu kali saat komponen di-*mount*.

- **Penerapan AbortController & Cleanup Function**:
  - Mengimplementasikan `const abortController = new AbortController()` dan mengaitkan sinyal pembatalan `{ signal: abortController.signal }` pada request `fetch`.
  - Mengembalikan fungsi pembersih (*cleanup function*) `return () => abortController.abort()` untuk membatalkan proses asinkron yang belum selesai saat komponen di-unmount.
  - Berhasil mengatasi isu React StrictMode development dengan memfilter error khusus:
    `if (error.name === 'AbortError') return`.

- **Troubleshooting Nyata Masalah CORS (Cross-Origin Resource Sharing)**:
  - Mengidentifikasi langsung error pemblokiran browser `CORS Policy: No 'Access-Control-Allow-Origin' header` saat mengakses `jsonplaceholder.org`.
  - Mengalihkan endpoint ke penyedia publik yang mendukung CORS: `https://jsonplaceholder.typicode.com/users`.
  - Memahami pentingnya konfigurasi CORS backend (yang akan diterapkan pada modul Laravel di Minggu 2).

- **Data Mapping & Strict Type Safety Tanpa `any`**:
  - Mendefinisikan antarmuka TypeScript `interface ApiUser` (`id`, `name`, `company: { name, bs }`).
  - Mengubah (*mapping*) data mentah API menjadi format prop kartu `StudentCardProps[]` secara dinamis.
  - Memastikan seluruh kode bebas dari tipe `any` demi keamanan runtime.

- **Pola Arsitektur React Modern: Derived State (Nilai Turunan)**:
  - Memahami paradigma penting *"You Might Not Need an Effect"*.
  - Menghilangkan `useState` berlebih dan `useEffect` redundant untuk fitur pencarian, menggantikannya dengan kalkulasi instan di badan render:
    `const filteredStudents = studentsState.filter(...)`.
  - Menghindari render beruntun (*cascading re-renders*) dan membuat aplikasi berjalan ultra cepat.

- **Urutan Anatomi Komponen Standar Industri**:
  - Menata alur kode komponen secara terstruktur:
    1. Hook State Primitif & Objek (`useState`)
    2. Nilai Turunan (*Derived State*)
    3. Event Handlers & Logika Aksi
    4. Side Effects & Lifecycle (`useEffect`)
    5. Proteksi Render Awal (*Early Returns / Guards*: `isLoading`, `apiError`)
    6. Struktur Visual Utama JSX

---

## 3. Hasil Pengujian & Verifikasi Kode

- **Pemeriksaan Kompilasi TypeScript**:
  - Perintah: `npx tsc --noEmit`
  - Hasil: Sukses 100% tanpa kesalahan tipe data (`0 errors`).

- **Pemeriksaan Linter ESLint**:
  - Perintah: `npm run lint`
  - Hasil: Bersih total tanpa pelanggaran aturan hooks (`0 warnings, 0 errors`).

- **Pengujian Fungsionalitas Browser**:
  - Indikator `Loading...` muncul saat request berlangsung.
  - Data 10 peserta dari JSONPlaceholder berhasil diambil dan dirender menjadi kartu.
  - Live search nama mahasiswa bekerja secara instan tanpa lag dan tanpa glitch.
  - Penambahan mahasiswa baru dan penghapusan kartu tetap berjalan lancar berdampingan dengan data hasil fetch API.

---

## 4. Evaluasi Mandiri & Refleksi

- **Evaluasi**:
  - Memahami hubungan erat konsep *reactive state* dan *lifecycle* dengan analogi framework lain (seperti GetX mobile).
  - Mampu mendeteksi dan menyelesaikan komplain linter tingkat lanjut terkait pemanggilan `setState` di dalam efek samping.

- **Kesiapan Sesi Berikutnya**:
  - Siap melangkah ke **Hari 4 (Kamis, 1 Oktober 2026)**: *Routing & Navigasi Modern* menggunakan `react-router-dom` v6/v7 (`createBrowserRouter`, `RouterProvider`, `useNavigate`, `useParams`, dynamic routes, dan nested layout `<Outlet />`).
