# Rencana Pembelajaran: Hari 11 (Kamis, 8 Oktober 2026)
## Pengenalan Dasar Next.js & App Router: Paradigma SPA vs SSR/SSG & Server vs Client Components

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **Next.js & Modern SSR Specialist**

---

### 1. Tujuan Pembelajaran

Hari 11 bertujuan membawa pembelajar memahami pergeseran paradigma dari aplikasi *Single Page Application* (SPA murni berbasis Vite) ke ekosistem fullstack modern berbasis React Server Components dan Next.js App Router.

Setelah menyelesaikan modul ini, pembelajar diharapkan mampu:
- Menjelaskan perbedaan fundamental antara **Client-Side Rendering (CSR/SPA)**, **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, dan **Incremental Static Regeneration (ISR)**.
- Memahami metrik performa web modern (*Web Vitals*): TTFB (*Time to First Byte*), FCP (*First Contentful Paint*), LCP (*Largest Contentful Paint*), dan dampaknya terhadap SEO (*Search Engine Optimization*).
- Memahami struktur hirarki berbasis konvensi file pada **Next.js App Router** (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`).
- Menguasai mental model **React Server Components (RSC)** secara *default* dan mengetahui kapan wajib menyematkan direktif `'use client'`.
- Memahami konsep dan siklus **Hydration** serta cara menghindari *Hydration Mismatch Error*.

---

### 2. Silabus & Rincian Topik

- **Topik 1: Evolusi Rendering Web Modern**:
  - Kelemahan arsitektur SPA murni: bundle JS berukuran besar di awal, layar putih kosong (*blank white flash*), dan keterbatasan pengindeksan bot mesin pencari (SEO).
  - Solusi SSR & SSG: server mengirimkan HTML matang siap baca ke browser sebelum JavaScript selesai diunduh.
  - Perbandingan matriks karakteristik: CSR vs SSR vs SSG vs ISR.

- **Topik 2: Struktur Konvensi File Next.js App Router (Direktori `app/`)**:
  - Konvensi folder sebagai segmen URL (`app/dashboard/settings/page.tsx` $\to$ `/dashboard/settings`).
  - Peran berkas khusus:
    - `layout.tsx`: Shell UI yang persisten antar navigasi (tidak me-render ulang saat pindah sub-halaman).
    - `page.tsx`: Antarmuka unik untuk rute tersebut.
    - `loading.tsx`: Tampilan fallback otomatis berbasis React `Suspense`.
    - `error.tsx`: Penanganan error runtime berbasis React `ErrorBoundary` (wajib Client Component).
    - `not-found.tsx`: UI halaman 404 khusus.
  - Dynamic Routes (`[id]`, `[...slug]`, `[[...slug]]`) dan Route Groups `(groupName)`.

- **Topik 3: React Server Components (RSC) vs Client Components**:
  - Filosofi RSC: Komponen berjalan 100% di server, menghasilkan streaming payload ringan, dan tidak mengirimkan library berat ke bundle JavaScript browser.
  - Kemampuan RSC: Fetch data langsung tanpa `useEffect`, akses database/env rahasia secara aman, zero bundle size untuk dependencies.
  - Client Components (`'use client'`): Kapan wajib dipakai? (Event listener `onClick`, browser APIs `window/localStorage`, hooks `useState`/`useEffect`/`useRef`, custom context).
  - Komposisi Arsitektur: *Server-to-Client leaf pattern* (menjaga client components sedekat mungkin ke ujung rantai komponen).

- **Topik 4: Memahami Proses Hydration & Troubleshooting**:
  - Apa itu Hydration: Proses React browser menempelkan event listener dan state logic ke atas HTML statis yang dikirim dari server.
  - Hydration Mismatch: Penyebab umum (penggunaan `localStorage`, `Math.random()`, atau tanggal `new Date()` langsung di badan render sebelum mount).

---

### 3. Rencana Komponen Laboratorium Interaktif (`NextjsStudioPage.tsx`)

Laboratorium akan dibangun di dalam aplikasi React + Vite saat ini dengan mensimulasikan arsitektur dan paradigma Next.js:

1. **Rendering Paradigm Simulator (`RenderingParadigmSection.tsx`)**:
   - Visualisasi alur transmisi jaringan (Browser $\leftrightarrow$ Server) untuk CSR, SSR, dan SSG secara interaktif.
   - Metrik perbandingan visual: Ukuran JS bundle, waktu FCP, skor SEO, dan beban CPU server.
2. **App Router File-Tree Explorer (`AppRouterExplorerSection.tsx`)**:
   - Visualisasi pohon direktori `app/` interaktif.
   - Klik berkas (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`) untuk melihat struktur hirarki pembungkus (*nested layout wrapping*) dan simulasi render UI.
3. **Server vs Client Component Inspector (`RscVsClientSection.tsx`)**:
   - Alat bantu penentu arsitektur: Checklist kebutuhan fitur untuk menentukan apakah suatu komponen harus bertipe RSC atau Client Component.
   - Interactive Component Tree: Demonstrasi *Server-Client Composition* yang benar.
4. **Hydration Lifecycle Visualizer (`HydrationVisualizerSection.tsx`)**:
   - Simulasi 3 langkah visual: (1) Server mengirim HTML $\to$ (2) User melihat konten statis (FCP cepat) $\to$ (3) React Hydration selesai (UI menjadi interaktif penuh).

---

### 4. Kriteria Keberhasilan & Validasi

- [ ] File `MODUL_TEORI_HARI_11.md` tersusun rapi dengan penjelasan mendalam, analogi, dan diagram teks.
- [ ] Komponen lab `/nextjs-intro` berhasil diimplementasikan dengan interaksi penuh tanpa error.
- [ ] Rute `/nextjs-intro` terdaftar di React Router dan navbar `RootLayout.tsx`.
- [ ] Lolos typecheck TypeScript (`tsc --noEmit`), ESLint linting bersih, dan Vite build sukses.
- [ ] File log `PROGRESS_HARI_11.md` dan tautan di `ROADMAP.md` terbarui.
