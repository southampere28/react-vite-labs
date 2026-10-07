# Log Progress Belajar: Hari 9 (Selasa, 6 Oktober 2026)
## Topik: Advanced Forms dengan React Hook Form, Validasi Skema Runtime Zod & Reusable UI Primitives (Pola Shadcn UI)

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **UI/UX, Styling & Form Specialist**

---

### 1. Ringkasan Aktivitas & Capaian Belajar

- **Pemahaman Performa Form**:
  - Mengkaji perbandingan teknis antara **Controlled Form** (berbasis `useState` yang memicu re-render menyeluruh pada setiap ketikan tombol) dengan **Uncontrolled Form** (berbasis `ref` HTML DOM asli via React Hook Form yang menghasilkan zero re-render typing).
  - Mengeliminasi *input latency* pada formulir kompleks berukuran besar.

- **Integrasi Library Form & Validasi Modern**:
  - Menginstal dan mengonfigurasi dependensi:
    - `react-hook-form`: Pengelola state form performa tinggi.
    - `zod`: Pustaka skema validasi runtime data berstandar industri dengan inferensi tipe TypeScript otomatis (`z.infer`).
    - `@hookform/resolvers`: Jembatan pengikat antara validasi Zod dan siklus submit React Hook Form (`zodResolver`).

- **Pembangunan Reusable UI Primitives (Pola Shadcn UI)**:
  - Dibuat di direktori internal proyek (`src/components/ui/`) menggunakan Tailwind CSS v4 dan `React.forwardRef`:
    - `Input.tsx`: Mendukung label, teks bantuan (*helper text*), penanda kesalahan (*error message*), dan slot ikon.
    - `Select.tsx`: Dropdown kustom dengan ikon chevron SVG dan opsi bertipe aman.
    - `Textarea.tsx`: Multi-line text input responsif dengan indikator error dinamis.
    - `Checkbox.tsx`: Elemen centang kustom dengan teks label dan deskripsi pendukung.
    - `Button.tsx`: Tombol aksi serbaguna dengan varian warna (`primary`, `secondary`, `outline`, `danger`, `ghost`, `success`) dan animasi spinner saat `isLoading={true}`.
    - `Card.tsx`: Wadah modular (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).

- **Penyusunan Skema Validasi Zod Berstandar Industri**:
  - `src/schemas/productSchema.ts`:
    - Validasi nama produk, regex format SKU (`/^PRD-[A-Z0-9]{4,8}$/`), kategori enum, konversi tipe otomatis (`z.coerce.number()`), stok integer, dan berat.
    - Validasi cross-field menggunakan `.refine()`: Memastikan harga jual tidak boleh lebih rendah dari harga modal.
  - `src/schemas/applicantSchema.ts`:
    - Validasi registrasi DevTalent: Nama lengkap, email, URL portofolio/GitHub, pengalaman, password kuat, kecocokan konfirmasi password via `.refine()`, dan kewajiban centang pakta integritas.

- **Halaman Form Studio (`src/pages/FormStudioPage.tsx`)**:
  - Showcase interaktif dengan tab switcher antara Form Produk dan Form Pendaftaran DevTalent Career.
  - Panel **FormStateDebugger**: Menampilkan metrik status formulir secara realtime (`isDirty`, `isValid`, `isSubmitting`, `submitCount`, daftar pesan error aktif, dan payload JSON yang diobservasi).
  - Tombol utilitas: *Contoh Data (Prefill)*, *Reset Form*, dan *Simulasi Pengiriman Asinkron* dengan feedback dialog sukses.
  - Terhubung ke sistem perutean aplikasi di `/forms` serta tautan navbar adaptif di `RootLayout.tsx`.

---

### 2. Berkas yang Dibuat & Dimodifikasi

- **Dokumentasi & Modul Teori**:
  - `docs/progress/minggu-02/PLANNING_HARI_09.md` (Baru)
  - `docs/progress/minggu-02/MODUL_TEORI_HARI_09.md` (Baru)
  - `docs/progress/minggu-02/PROGRESS_HARI_09.md` (Berkas ini)

- **Skema Validasi Zod**:
  - `src/schemas/productSchema.ts` (Baru)
  - `src/schemas/applicantSchema.ts` (Baru)

- **Komponen UI Primitives**:
  - `src/components/ui/Input.tsx` (Baru)
  - `src/components/ui/Select.tsx` (Baru)
  - `src/components/ui/Textarea.tsx` (Baru)
  - `src/components/ui/Checkbox.tsx` (Baru)
  - `src/components/ui/Card.tsx` (Baru)
  - `src/components/ui/Button.tsx` (Dimutakhirkan: `forwardRef`, `isLoading` spinner, perbaikan helper)

- **Komponen Fitur Form**:
  - `src/components/forms/FormStateDebugger.tsx` (Baru)
  - `src/components/forms/ProductFormSection.tsx` (Baru)
  - `src/components/forms/ApplicantFormSection.tsx` (Baru)
  - `src/pages/FormStudioPage.tsx` (Baru)

- **Perutean & Navigasi**:
  - `src/router/index.tsx` (Mendaftarkan path `/forms`)
  - `src/layouts/RootLayout.tsx` (Menambahkan NavLink "📝 Form Studio (Hari 9)")

---

### 3. Hasil Pengujian & Quality Assurance (QA)

- **Typecheck TypeScript**:
  - Perintah: `npx tsc --noEmit`
  - Hasil: Lulus tanpa error (`0 errors`).
- **Pemeriksaan Linter ESLint**:
  - Perintah: `npm run lint`
  - Hasil: Lulus bersih (`0 errors, 0 warnings`).
- **Build Bundle Produksi**:
  - Perintah: `npm run build`
  - Hasil: Sukses ter-bundle dalam 642ms tanpa kegagalan minifikasi Rollup/Vite.
- **Validasi Runtime Zod**:
  - Teruji menolak SKU tanpa prefix `PRD-`.
  - Teruji menolak harga jual yang lebih rendah dari harga beli dengan pesan: *"Harga jual (Rp) tidak boleh lebih rendah dari harga modal (Rp)"*.
  - Teruji menolak konfirmasi password yang tidak identik dengan password akun.

---

### 4. Rencana Sesi Berikutnya (Double Session: Rabu & Kamis)

- Sesuai arahan pembelajar, sesi berikutnya akan menggabungkan materi Hari 10 & Hari 11:
  - **Hari 10**: Optimasi Performa & Advanced Hooks (`React.memo`, `useMemo`, `useCallback`, `useRef`, concurrent updates `useTransition`).
  - **Hari 11**: Pengenalan Next.js & App Router (Perbandingan SPA Vite vs SSR/SSG Next.js, Server vs Client Components).
