# 🚀 React Intensive Bootcamp (2-Week Mastery)
### Fondasi React Modern, Hooks, Global State Management & Fullstack Laravel Integration

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-443e38?style=for-the-badge&logo=react&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Repositori pusat pembelajaran intensif selama 2 minggu (28 September – 11 Oktober 2026) yang dirancang untuk menguasai arsitektur antarmuka modern **React + Vite + TypeScript**, pengelolaan state reaktif berkecepatan tinggi, hingga integrasi *end-to-end* dengan backend REST API Laravel.

---

## 🌟 Showcase Mini Project 1 (Minggu 1)

Aplikasi **Interactive Study & Task Tracker + 60 FPS Zustand Playground** yang dibangun dengan arsitektur berbasis fitur (*feature-driven architecture*):

- **Fitur Utama**:
  - **CRUD Tugas Lengkap**: Tambah tugas baru, penandaan status selesai via checkbox, pengeditan langsung dengan modal dialog responsif, dan penghapusan tugas dengan konfirmasi aman.
  - **Sinkronisasi Otomatis (*Persistent State*)**: Menggunakan Zustand `persist` middleware ke `localStorage` browser sehingga data tidak hilang saat halaman di-refresh.
  - **Filter Cepat & Pencarian Real-Time**: Pencarian instan berdasarkan judul, filter kategori topik (Vite, State, Routing, Styling, Backend), dan filter status (Semua, Selesai, Tertunda).
  - **Kalkulasi Statistik Otomatis (*Derived State*)**: Metrik ringkas tugas aktif, persentase keberhasilan belajar, dan *progress bar* visual.
  - **🎮 High-Frequency Game Playground**: Eksperimen reaktivitas state Zustand 60 FPS (Arena 1: pelacak pointer kursor horizontal real-time; Arena 2: pengubah umur reaktif dengan transformasi avatar otomatis tanpa jeda render).
  - **Sistem Desain UI Primitives**: Komponen modular reusable (`Button`, `Badge`, `Card`, `Modal`) dengan dukungan dark mode dan Tailwind CSS utility.

---

## 🛠️ Tech Stack & Ekosistem Utama

- **Frontend Core**: React 19, TypeScript, Vite
- **Perutean (*Routing*)**: React Router DOM v7 (`createBrowserRouter`, `Outlet`, `useParams`, `useNavigate`)
- **State Management**: Zustand v5 (Atomic Selectors, `persist` middleware, Zero Provider Hell)
- **Styling & Icons**: Tailwind CSS v4, Lucide React Icons
- **Backend Readiness (Minggu 2)**: Laravel REST API (Sanctum/JWT Token, CORS, Axios HTTP Interceptor)
- **Tooling & QA**: ESLint 9, TypeScript Strict Compiler (`tsc -b`), Vitest
- **Hosting & Deploy**: Vercel (`vercel.json`) & Netlify (`_redirects`)

---

## 📅 Roadmap Kurikulum & Progres 2 Minggu

### Minggu 1: Fondasi React, Hooks & Ekosistem (Selesai ✅)
- **Hari 1 (Senin, 28 Sep)**: Setup Vite + React TS, JSX syntax rules, komponen modular, props & Virtual DOM reconciliation.
- **Hari 2 (Selasa, 29 Sep)**: `useState` primitif & objek, immutability pattern, form input interaktif, list rendering key prop.
- **Hari 3 (Rabu, 30 Sep)**: `useEffect` siklus hidup render, cleanup function, konsumsi REST API publik, handling state loading/error.
- **Hari 4 (Kamis, 1 Okt)**: `react-router-dom` modern, multi-page layout bersarang (`Outlet`), dynamic routes, dan hook navigasi.
- **Hari 5 (Jumat, 2 Okt)**: Desain antarmuka Tailwind CSS modern, sistem responsive breakpoints, pembuatan UI primitives.
- **Hari 6 (Sabtu, 3 Okt)**: State global Zustand, selektor atomik, persistensi LocalStorage, dan Mini Project 1 (Task Tracker).
- **Hari 7 (Minggu, 4 Okt)**: Optimasi build produksi Rollup, penanganan SPA routing fallback (Vercel/Netlify), pengujian lokal `npm run preview`, dan dokumentasi showcase.

### Minggu 2: Integration, Fullstack Prep & Portofolio Ready (Akan Datang ⏳)
- **Hari 8 (Senin, 5 Okt)**: Integrasi Backend Laravel REST API (CORS, Sanctum/JWT token, Axios interceptor, Protected Routes).
- **Hari 9 (Selasa, 6 Okt)**: Advanced Forms (React Hook Form), validasi skema runtime TypeScript (Zod), Shadcn UI / DaisyUI.
- **Hari 10 (Rabu, 7 Okt)**: Optimasi performa render (`useMemo`, `useCallback`, `React.memo`), `useRef`, dan concurrent updates.
- **Hari 11 (Kamis, 8 Okt)**: Pengenalan dasar Next.js App Router (SSR vs SSG vs SPA, Server Components vs Client Components).
- **Hari 12 (Jumat, 9 Okt)**: Slicing Dashboard Admin profesional (Sidebar responsif, statistik cards, datatable, search & pagination).
- **Hari 13 (Sabtu, 10 Okt)**: Mini Project 2: Fullstack Dashboard terhubung REST API Laravel end-to-end.
- **Hari 14 (Minggu, 11 Okt)**: Final UI polish, build produksi, deploy live Vercel, dan persiapan portofolio lamaran Maganghub.

---

## 📁 Struktur Direktori Proyek

```text
react/
├── docs/progress/              # Dokumentasi terpusat (Perencanaan, Modul Teori, & Log Progres)
│   ├── minggu-01/             # Catatan lengkap Hari 1 hingga Hari 7
│   └── minggu-02/             # Modul lanjutan backend & fullstack
├── react-ts/                  # Aplikasi Web Utama (React + Vite + TypeScript)
│   ├── public/
│   │   └── _redirects         # Konfigurasi SPA rewrite untuk hosting Netlify
│   ├── src/
│   │   ├── components/        # Komponen UI global (Button, Badge, Card, Modal, tasks)
│   │   ├── layouts/           # Wrapper tata letak utama (RootLayout dengan NavLink)
│   │   ├── pages/             # Halaman rute (HomePage, TaskManagerPage, PlaygroundPage, dll)
│   │   ├── router/            # Konfigurasi React Router DOM v7
│   │   ├── store/             # Global state management Zustand (useTaskStore)
│   │   ├── types/             # Deklarasi antarmuka domain TypeScript
│   │   ├── App.tsx            # Root component penampung RouterProvider
│   │   └── main.tsx           # Entry point ReactDOM
│   ├── vercel.json            # Konfigurasi SPA rewrite untuk hosting Vercel
│   ├── package.json           # Dependensi modul npm
│   └── vite.config.ts         # Konfigurasi Vite bundler
├── AGENTS.md                  # Panduan tunggal standar teknis arsitektur AI Agent
└── ROADMAP.md                 # Peta jalan kurikulum intensif 2 minggu
```

---

## ⚡ Panduan Menjalankan Proyek Secara Lokal

### 1. Prasyarat Sistem
- Node.js versi 20+ LTS (disarankan v22.x)
- npm versi 10+

### 2. Kloning & Pemasangan Dependensi
```bash
# Masuk ke direktori aplikasi frontend
cd react-ts

# Pasang seluruh dependensi proyek
npm install
```

### 3. Menjalankan Server Pengembang Lokal
```bash
npm run dev
```
Buka peramban di `http://localhost:5173`.

### 4. Menjalankan Kompilasi Build & Pratinjau Produksi
```bash
# Menjalankan type-check dan bundling Rollup
npm run build

# Menjalankan simulasi server produksi lokal
npm run preview
```
Buka peramban di `http://localhost:4173`.

---

## 🚀 Panduan Deployment ke Vercel

Aplikasi ini telah dilengkapi dengan berkas `vercel.json` sehingga dapat langsung di-deploy tanpa galat rute 404:

1. Buka [Vercel Dashboard](https://vercel.com/) dan buat proyek baru (*Add New Project*).
2. Hubungkan repositori GitHub ini.
3. Atur konfigurasi root directory ke: `react-ts`.
4. Build command: `npm run build` dan Output directory: `dist`.
5. Klik **Deploy** dan aplikasi web kamu siap diakses secara publik di seluruh dunia!

