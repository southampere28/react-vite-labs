# Catatan Kemajuan: Hari 6 (Sabtu, 3 Oktober 2026)

Dokumentasi implementasi nyata arsitektur **Global State Management Modern dengan Zustand**, Mekanisme **Pub/Sub Subscriptions & Atomic Selectors**, Persistensi Otomatis **Web Storage API (`localStorage`)**, dan Pembangunan **Mini Project 1: Interactive Study & Task Tracker (CRUD Lengkap)** pada ekosistem React 19 / 18 + Vite + TypeScript.

---

## 1. Ringkasan Aktivitas & Capaian Pembelajaran

Pada sesi Hari 6 ini, pembelajaran difokuskan pada penguasaan manajemen state lintas komponen dan pembangunan proyek mini pertama yang utuh dan persisten:

- **Instalasi & Setup Ekosistem State Management**:
  - Mengintegrasikan paket `zustand` (< 1.5 kB) dan `lucide-react` ke dalam proyek `react-ts`.
  - Mengonfigurasi store terpusat tanpa pembungkus `<Provider>` pohon DOM.

- **Desain Type-Safe State & Domain Model**:
  - Menyusun definisi interface TypeScript di `src/types/task.ts`: `Task`, `TaskPriority`, `TaskCategory`, dan `FilterStatus`.
  - Menerapkan strict type checking untuk seluruh payload aksi di store.

- **Pembangunan Centralized Zustand Store dengan Middleware Persist**:
  - Membangun `src/store/useTaskStore.ts` yang mengelola data tugas (`tasks`), kata kunci pencarian (`searchQuery`), filter status (`filterStatus`), dan filter kategori (`selectedCategory`).
  - Mengonfigurasi middleware `persist` dari `zustand/middleware` dengan driver `localStorage` sehingga data tugas tetap tersimpan saat tab browser ditutup atau di-refresh.
  - Menerapkan `partialize` agar hanya data `tasks` yang disimpan permanen, sedangkan state UI sementara (seperti kata kunci pencarian) tetap bersih.

- **Pengembangan Komponen Modular Mini Project 1**:
  - `src/components/tasks/TaskStats.tsx`: Kartu statistik real-time yang menghitung Total Tugas, Tugas Selesai, Tugas Berjalan, serta persentase capaian progress bar adaptif.
  - `src/components/tasks/TaskItem.tsx`: Kartu tugas interaktif dengan fungsionalitas toggle centang selesai, inline edit mode (judul & deskripsi), badge prioritas & kategori modul, dan hapus tugas.
  - `src/components/tasks/TaskForm.tsx`: Formulir input tugas baru responsif dengan validasi required, pemilih kategori modul, dan pemilih tombol prioritas (*Rendah, Sedang, Tinggi*).
  - `src/pages/TaskManagerPage.tsx`: Halaman utama penampung Mini Project 1 dengan live search, tab filter status (*Semua, Belum Selesai, Selesai*), filter dropdown kategori, aksi massal *Clear Completed*, dan *Reset Demo Data*.

- **Peningkatan Reusable UI Primitives**:
  - Menambahkan varian warna `ghost` pada komponen `Button.tsx`.
  - Menambahkan varian warna `purple` dan `danger` serta prop `size` pada komponen `Badge.tsx`.

---

## 2. Poin Kunci & Mental Model Zustand

- **Atomic Selectors vs Destructuring Massal**:
  - Memanggil `const tasks = useTaskStore(state => state.tasks)` memastikan komponen hanya re-render jika data `tasks` berubah.
  - Komponen yang hanya memanggil aksi (misalnya `const addTask = useTaskStore(state => state.addTask)`) tidak akan pernah me-render ulang saat data tugas bertambah.

- **Immutability pada State Update**:
  - Menambah tugas: `[newTask, ...state.tasks]`
  - Menghapus tugas: `state.tasks.filter(t => t.id !== id)`
  - Memperbarui tugas: `state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)`

- **Persistensi Otomatis**:
  - Middleware `persist` mengeliminasi kebutuhan menulis `localStorage.setItem` dan `localStorage.getItem` secara manual di dalam `useEffect`.

---

## 3. Hasil Pengujian & Validasi Kualitas Kode

- **Type Checking TypeScript**:
  - Menjalankan `tsc -b` menghasilkan status **0 error**. Seluruh inferensi tipe pada store, komponen, dan event handlers berjalan sinkron.
- **Linting ESLint**:
  - Menjalankan `eslint .` menghasilkan status **0 warning / error**.
- **Build Produksi Vite**:
  - Menjalankan `npm run build` berhasil memproduksi bundle teroptimasi di direktori `dist/` tanpa kendala.
