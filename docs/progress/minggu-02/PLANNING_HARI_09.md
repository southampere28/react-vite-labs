# Rencana Pembelajaran: Hari 9 (Selasa, 6 Oktober 2026)
## Topik: Advanced Forms dengan React Hook Form, Validasi Skema Runtime Zod, & Komponen UI Modern (Shadcn UI Pattern)

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **UI/UX, Styling & Form Specialist**

---

### 1. Tujuan Pembelajaran
- Memahami perbedaan fundamental performa antara **Controlled Forms** (`useState` per-field) vs **Uncontrolled Forms** (React Hook Form berbasis `ref`).
- Menguasai ekosistem React Hook Form v7: hook `useForm`, pendaftaran input via `register()`, penanganan event `handleSubmit`, pemantauan status `formState` (`errors`, `isSubmitting`, `isDirty`, `isValid`, `touchedFields`).
- Memahami validasi runtime data menggunakan **Zod v4/v3** dan integrasinya ke React Hook Form melalui `@hookform/resolvers/zod`.
- Menguasai teknik validasi Zod lanjutan: konversi tipe otomatis (`z.coerce.number()`), validasi cross-field menggunakan `.refine()`, enumerasi (`z.enum()`), dan inferensi otomatis tipe TypeScript (`z.infer<typeof Schema>`).
- Membangun antarmuka form siap pakai berstandar industri dengan pola **Shadcn UI primitives** menggunakan Tailwind CSS v4 yang modular, aksesibel, dan konsisten (Input, Select, Textarea, Checkbox, Button, Card, Badge, Alert).
- Membangun halaman interaktif **Form Studio** yang menyajikan 2 studi kasus form nyata: Form Transaksi & Inventaris Produk E-Commerce serta Form Profil & Pendaftaran DevTalent Career.

---

### 2. Konsep Inti & Arsitektur

- **Masalah Performa Controlled Form Tradisional**:
  - Pada pendekatan umum dengan `useState`, setiap satu huruf diketik di input memicu re-render seluruh komponen form beserta anak-anaknya.
  - Untuk form dengan 10–30 field, hal ini menimbulkan latensi ketik (*input lag*), pemborosan cycle CPU, dan struktur kode yang redundan (puluhan handler `onChange`).

- **Solusi React Hook Form**:
  - Memanfaatkan `ref` DOM browser asli (uncontrolled component pattern).
  - React tidak me-render ulang form saat pengguna mengetik, kecuali status validasi atau state tertentu diobservasi secara selektif.
  - Skalabilitas tinggi, memori hemat, dan kompatibel penuh dengan HTML5 form attributes.

- **Validasi Runtime Zod vs Compile-Time TypeScript**:
  - TypeScript hanya melindungi kode selama tahap kompilasi (*compile-time*); begitu kode berjalan di peramban pengguna (*runtime*), tipe TypeScript terhapus (*type erasure*).
  - Zod bertindak sebagai validator runtime yang menginspeksi data masukan pengguna secara nyata, menolak data abnormal, dan memformat pesan kesalahan yang deskriptif.
  - Prinsip *Single Source of Truth*: Definisikan skema Zod satu kali, lalu turunkan interface TypeScript-nya secara otomatis melalui `z.infer<typeof schema>`.

- **Pola Komponen Reusable UI (Shadcn UI Pattern)**:
  - Mengedepankan arsitektur *copy-and-own* di mana komponen UI berada langsung di direktori proyek kita (`src/components/ui/`), bukan sebagai black-box npm package.
  - Menggunakan `React.forwardRef` agar elemen HTML input tetap dapat di-hook oleh `register` React Hook Form tanpa merusak aksesibilitas.
  - Styling fleksibel berbasis Tailwind CSS v4 dengan varian visual yang jelas (`primary`, `outline`, `destructive`, `ghost`).

---

### 3. Rencana Berkas & Struktur Kode yang Akan Dibangun

- **Dokumentasi & Modul**:
  - `docs/progress/minggu-02/PLANNING_HARI_09.md`: Dokumen perencanaan ini.
  - `docs/progress/minggu-02/MODUL_TEORI_HARI_09.md`: Modul teori komprehensif panduan Zod & React Hook Form.
  - `docs/progress/minggu-02/PROGRESS_HARI_09.md`: Log hasil implementasi, pengujian, dan catatan evaluasi.

- **Komponen UI Primitives (`src/components/ui/`)**:
  - `Input.tsx`: Input field teks/angka/email dengan label, helper, pesan error, dan slot ikon.
  - `Select.tsx`: Dropdown pilihan dengan label dan status error.
  - `Textarea.tsx`: Multi-line text input responsif.
  - `Checkbox.tsx`: Elemen centang kustom dengan deskripsi.
  - `Button.tsx`: Tombol serbaguna dengan dukungan state loading/spinner.
  - `Card.tsx`: Komponen kartu wadah kontainer form yang rapi.
  - `Badge.tsx`: Penanda status visual (Draft, Published, Valid, Dirty).

- **Skema Validasi Zod (`src/schemas/`)**:
  - `productSchema.ts`: Skema validasi inventaris produk & transaksi (SKU, nama, harga beli vs jual, stok, garansi).
  - `applicantSchema.ts`: Skema pendaftaran pelamar kerja / program karir (cross-field password confirmation, URL portfolio).

- **Halaman Form Studio (`src/pages/FormStudioPage.tsx`)**:
  - Showcase interaktif dengan tab switcher antara Form Produk dan Form Pendaftaran Program Karir.
  - Panel Form State Debugger (menampilkan `isDirty`, `isValid`, `errors`, dan live payload JSON).
  - Simulasi submission asinkron dengan visual loading state dan toast/alert dialog.

- **Router & Navigasi**:
  - Mendaftarkan rute `/forms` di `src/router/index.tsx`.
  - Menambahkan tautan navigasi di `src/layouts/RootLayout.tsx`.

---

### 4. Kriteria Keberhasilan & QA
- Dependensi `react-hook-form`, `zod`, dan `@hookform/resolvers` terinstal dan bekerja tanpa error.
- Validasi Zod berhasil mendeteksi input yang salah dan menampilkan pesan error bahasa Indonesia.
- Komponen input menggunakan `forwardRef` dan terhubung sempurna ke `register()` React Hook Form.
- Cross-field validation (misal konfirmasi password dan perbandingan harga jual $\ge$ harga beli) berjalan akurat.
- Pemeriksaan tipe TypeScript (`npx tsc --noEmit`) dan ESLint (`npm run lint`) lulus dengan 0 error.
