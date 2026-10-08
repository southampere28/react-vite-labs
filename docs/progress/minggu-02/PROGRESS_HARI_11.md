# Laporan Progres Pembelajaran: Hari 11 (Kamis, 8 Oktober 2026)
## Pengenalan Dasar Next.js & App Router: Paradigma SSR/SSG/ISR/CSR, React Server Components (RSC) vs Client Components, dan Hydration Lifecycle

---

### 1. Ringkasan Eksekutif Hasil Belajar & Implementasi

Hari 11 berfokus pada pemahaman komprehensif mengenai pergeseran paradigma dari *Single Page Application* (SPA Client-Side Rendering via Vite) menuju arsitektur modern fullstack web berbasis **React Server Components (RSC)** dan **Next.js App Router**.

Seluruh target tercapai dengan status: **SELESAI & TERVALIDASI (100% Passed: tsc, lint, build)**.

---

### 2. Berkas yang Dibuat & Diperbarui

- **Modul Teori & Perencanaan**:
  - `/home/pramudya/Development/course/react/docs/progress/minggu-02/PLANNING_HARI_11.md`: Dokumen perencanaan modul Hari 11.
  - `/home/pramudya/Development/course/react/docs/progress/minggu-02/MODUL_TEORI_HARI_11.md`: Modul teori mendalam perbandingan strategi rendering, arsitektur `app/` router, mental model RSC, direktif `'use client'`, dan hidrasi.

- **Komponen Laboratorium Interaktif**:
  - `/home/pramudya/Development/course/react/react-ts/src/components/nextjs/RenderingParadigmSection.tsx`: Simulator komparasi 4 strategi rendering (CSR, SSR, SSG, ISR) lengkap dengan metrik TTFB, FCP, JS Bundle size, skor SEO, dan visualisasi timeline transmisi jaringan.
  - `/home/pramudya/Development/course/react/react-ts/src/components/nextjs/AppRouterExplorerSection.tsx`: File tree explorer interaktif direktori `app/` (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `[id]/page.tsx`) dengan simulasi layout nesting persisten.
  - `/home/pramudya/Development/course/react/react-ts/src/components/nextjs/RscVsClientSection.tsx`: Asisten diagnosis kebutuhan arsitektur penentu kapan wajib menggunakan `'use client'` vs tetap RSC murni (0 KB bundle).
  - `/home/pramudya/Development/course/react/react-ts/src/components/nextjs/HydrationVisualizerSection.tsx`: Visualisator 3 tahap siklus hidrasi (Server HTML -> Browser Paint -> Hydrated) dan pencegahan error *Hydration Mismatch*.

- **Halaman Studio & Navigasi**:
  - `/home/pramudya/Development/course/react/react-ts/src/pages/NextjsStudioPage.tsx`: Halaman agregator Next.js Architecture Studio.
  - `/home/pramudya/Development/course/react/react-ts/src/router/index.tsx`: Registrasi rute `/nextjs-intro`.
  - `/home/pramudya/Development/course/react/react-ts/src/layouts/RootLayout.tsx`: Penambahan tab navigasi `▲ Next.js (Hari 11)`.
  - `/home/pramudya/Development/course/react/README.md`: Pembaruan status kurikulum Hari 11.

---

### 3. Poin Kunci & Mental Model yang Dikuasai

- **Perbandingan Paradigma Rendering**:
  - **CSR (SPA Vite)**: Server hanya mengirim HTML kosong (`<div id="root"></div>`). Render seluruh UI ditunda sampai bundle JS besar berhasil diunduh dan di-parse di browser pengguna.
  - **SSR (Server-Side Rendering)**: Server Node.js meng-query data dan menghasilkan HTML matang seketika untuk setiap request masuk. Sangat baik untuk SEO dan data real-time.
  - **SSG (Static Site Generation)**: Halaman di-render sekali saat waktu kompilasi (`npm run build`) dan disimpan di Edge CDN global untuk performa super instan (TTFB < 20ms).
  - **ISR (Incremental Static Regeneration)**: Mengombinasikan kecepatan SSG dengan auto-update cache secara periodik di background tanpa perlu rebuild seluruh website.

- **Mental Model React Server Components (RSC)**:
  - Di Next.js App Router, semua komponen secara *default* adalah **Server Component**.
  - RSC dieksekusi secara eksklusif di server, tidak menyumbang ukuran file JavaScript ke browser (0 KB JS bundle), dan aman mengakses database atau API key rahasia tanpa kebocoran keamanan.
  - Direktif `'use client'` bukan berarti komponen hanya jalan di client, melainkan penanda batas (*boundary*) bahwa komponen ini membutuhkan akses ke siklus hidup browser (`useState`, `useEffect`, event listener, browser APIs).

- **Leaf Component Pattern**:
  - Hindari menaruh `'use client'` di level atas (`page.tsx` atau `layout.tsx`).
  - Taruh `'use client'` hanya pada komponen daun paling ujung (*leaf components*) seperti tombol like, form interaktif, atau modal dialog.

- **Siklus Hidrasi & Mitigasi Mismatch**:
  - Hidrasi adalah proses saat React di browser membaca HTML kiriman server dan melampirkan *event listener* serta *reconciliation state*.
  - Terjadinya ketidakcocokan data antara hasil render server dan render awal browser (misal `localStorage` atau waktu komputer client) akan menyebabkan error `Hydration Mismatch`. Solusinya adalah menunda rendering data khusus klien setelah `useEffect` atau `useSyncExternalStore` terpanggil.

---

### 4. Hasil Validasi QA Otomatis

- `npx tsc --noEmit`: ✅ **0 Errors (Strict TypeScript Passed)**
- `npm run lint`: ✅ **0 Errors & 0 Warnings (ESLint Clean)**
- `npm run build`: ✅ **0 Errors (Vite & Rollup Build Production Success)**

---

### 5. Rencana Sesi Berikutnya: Hari 12 & 13 (Slicing Dashboard Admin & Mini Project 2 Fullstack)

- **Hari 12 (Jumat, 9 Okt)**:
  - Slicing layout antarmuka Admin modern untuk Main Showcase.
  - Komponen layout: Responsive collapsible sidebar, top navigation bar, profil avatar dropdown.
  - Tampilan data: Statistik KPI cards, responsive datatable transaksi/katalog dengan badge status, pagination, dan live search.

- **Hari 13 (Sabtu, 10 Okt)**:
  - Pembangunan Mini Project 2: Fullstack Dashboard terhubung ke REST API Laravel end-to-end.
  - Form validasi React Hook Form + Zod, alert notifikasi toast, state synchronization, dan loading skeletons.
