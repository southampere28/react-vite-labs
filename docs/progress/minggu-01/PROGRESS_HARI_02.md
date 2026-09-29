# Progress Belajar: Hari 2 (Selasa, 29 September 2026)

Dokumentasi pencapaian, implementasi kode mandiri, dan hasil evaluasi materi State Fundamental, Immutability & Interaktivitas (`useState`).

---

## 1. Identitas Sesi & Topik

- **Tanggal Pelaksanaan**: Selasa, 29 September 2026
- **Topik Pembelajaran**: State Fundamental, Immutability Pattern, Controlled Components & Interaktivitas (`useState`)
- **Workspace Proyek**: `/home/pramudya/Development/course/react/react-ts`
- **Status Sesi**: Selesai (Completed & Verified 100%)

---

## 2. Ringkasan Pencapaian & Konsep yang Dikuasai

- **Mental Model React State vs Variabel Biasa**:
  - Memahami bahwa variabel JavaScript biasa (`let`/`const`) tidak memicu siklus render ulang (*re-render*) antarmuka saat nilainya dimutasi.
  - Memahami fungsi `useState` sebagai mekanisme pendaftaran state lokal ke React Fiber yang mengembalikan pasangan nilai terkini (*current value*) dan fungsi pembaru (*setter function*).

- **State Primitif & Functional Updater Pattern**:
  - Mengimplementasikan fitur UI Toggle visibilitas (`showDetails`) menggunakan updater fungsional `setShowDetails(prev => !prev)`.
  - Mengimplementasikan fitur Counter interaktif menggunakan pola `setCounter(prev => prev + 1)` untuk menghindari *stale state*.

- **Controlled Components (Form Inputs)**:
  - Mengisolasi input tunggal menggunakan controlled state `nameInput` (`value` dan `onChange`).
  - Memahami bahwa data antarmuka sepenuhnya disinkronkan dan dikendalikan oleh single source of truth di React state.

- **Complex State (Object) & Aturan Immutability**:
  - Mendefinisikan tipe data form menggunakan TypeScript `interface formDataShape` (`name`, `role`, `batch`, `skills`).
  - Menerapkan prinsip *immutability* dengan aman menggunakan object spread operator (`setFormData(prev => ({ ...prev, [field]: value }))`).

- **Penanganan Input Number & String Parsing**:
  - Mengatasi kendala angka `0` terkunci pada input number dengan conditional parsing:
    `e.target.value == '' ? '' : Number(e.target.value)` serta tipe union `number | ''`.
  - Mengimplementasikan transformasi dua arah antara string dan array untuk list keahlian (`skills.join(',')` ke `.split(',')`).

- **Operasi CRUD pada State Array (`studentsState`)**:
  - **Create (Tambah Data)**: Menambahkan mahasiswa baru ke daftar menggunakan array spread operator `setStudentsState(prev => [...prev, newStudent])` tanpa memutasi array lama.
  - **Delete (Hapus Data)**: Menghapus data mahasiswa secara reaktif menggunakan metode fungsional murni `prev.filter(student => student.name !== name)`.

- **Komposisi Komponen Tingkat Lanjut**:
  - Memanfaatkan prop `children` pada `<StudentCard>` untuk menyematkan tombol interaktif `<button onClick={() => handleDeleteStudent(student.name)}>Delete</button>` secara dinamis dan fleksibel.

---

## 3. Hasil Pengujian & Verifikasi Kode

- **Pemeriksaan Kompilasi TypeScript**:
  - Perintah: `npx tsc --noEmit`
  - Hasil: Sukses 100% tanpa kesalahan tipe data (`0 errors`).

- **Pemeriksaan Linter ESLint**:
  - Perintah: `npm run lint`
  - Hasil: Bersih tanpa pelanggaran konvensi kode (`0 warnings, 0 errors`).

- **Pengujian Fungsionalitas Browser**:
  - Toggle tampilkan/sembunyikan deskripsi berfungsi responsif.
  - Counter bertambah tanpa lag.
  - Form input merespons ketikan secara real-time.
  - Data peserta baru berhasil dimasukkan ke daftar kartu (Card List).
  - Tombol hapus menghapus item secara instan tanpa perlu me-reload halaman web.

---

## 4. Evaluasi Mandiri & Refleksi

- **Evaluasi**:
  - Pengerjaan latihan interaktivitas berhasil diselesaikan secara mandiri tanpa kendala logika.
  - Pemahaman alur data satu arah (*one-way data binding*) dan *immutability* sudah sangat solid.

- **Kesiapan Sesi Berikutnya**:
  - Siap melangkah ke **Hari 3 (Rabu, 30 September 2026)**: *Side Effects & Data Fetching API* menggunakan hook `useEffect`, cleanup function, dan konsumsi REST API publik.
