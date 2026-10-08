# Modul Pembelajaran Teori: Hari 11
## Pengenalan Dasar Next.js, App Router, Paradigma SSR/SSG/ISR, dan React Server Components (RSC)

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`
Sub-Agent Penanggung Jawab: **Next.js & Modern SSR Specialist**

---

### 1. Mengapa Industri Beralih ke Next.js? (Keterbatasan SPA Murni)

Sepanjang Hari 1 s.d. Hari 10, kita membangun aplikasi menggunakan **React + Vite** yang menganut paradigma **Single Page Application (SPA / Client-Side Rendering - CSR)**. 

Meskipun SPA sangat hebat untuk aplikasi berbasis dashboard internal (aplikasi di balik halaman login), arsitektur SPA memiliki kelemahan inheren untuk aplikasi web publik yang mengutamakan kecepatan awal dan jangkauan pencarian:

#### A. Masalah 1: "Layar Putih Kosong" (*Blank White Flash*) & Bundle JS Gemuk
Pada SPA Vite:
1. Browser meminta URL `https://toko.com/produk/123`.
2. Server hanya mengirimkan berkas HTML mini berukuran ~500 byte yang isinya kosong:
   ```html
   <div id="root"></div>
   <script src="/assets/index.js"></script>
   ```
3. Layar browser pengguna **kosong putih melompong (*blank screen*)** selama beberapa detik sampai peramban selesai mengunduh, membaca, dan mengeksekusi berkas JavaScript (yang sering kali berukuran ratusan kilobyte hingga megabyte).
4. Setelah JavaScript jalan, komponen React baru menyalakan `useEffect` untuk memanggil API backend (`fetch('/api/produk/123')`).
5. Setelah API membalas, barulah gambar dan harga produk digambar ke layar.
> **Akibat**: *First Contentful Paint (FCP)* dan *Largest Contentful Paint (LCP)* sangat lambat pada koneksi 3G/4G atau perangkat ponsel hemat daya.

#### B. Masalah 2: SEO (*Search Engine Optimization*) & Social Media Preview Card
- Bot peramban mesin pencari (Googlebot, Bingbot) atau bot media sosial (WhatsApp, Twitter/X, Facebook, LinkedIn) saat membaca tautan produk kamu hanya akan melihat `<div id="root"></div>`.
- Bot media sosial **tidak mengeksekusi JavaScript**. Hasilnya, kartu *preview link* (Open Graph: judul, gambar cover, deskripsi harga) akan kosong atau hanya menampilkan judul default web.

---

### 2. Spektrum Paradigma Rendering Web: CSR vs SSR vs SSG vs ISR

Next.js hadir sebagai framework React tingkat produksi (*production-grade framework*) yang memungkinkan kamu memilih strategi rendering yang paling tepat untuk setiap halaman:

```
[ Waktu Kompilasi / Build Time ] ───────────► [ Waktu Request Pengguna / Request Time ]
               ▲                                                ▲
               │                                                │
       Static Site Generation (SSG)                   Server-Side Rendering (SSR)
  Incremental Static Regeneration (ISR)             Client-Side Rendering (CSR / SPA)
```

#### 1. Client-Side Rendering (CSR / SPA Murni)
- **Kapan dirender**: 100% di browser pengguna setelah JavaScript selesai diunduh.
- **Kelebihan**: Navigasi antar-halaman secepat kilat tanpa refresh server, murah di sisi server hosting (cukup hosting statis seperti S3/Vercel/Netlify).
- **Kekurangan**: SEO buruk, waktu muat awal (*initial load*) lambat.
- **Cocok untuk**: Dashboard admin, SaaS app di balik login, panel kasir POS.

#### 2. Server-Side Rendering (SSR)
- **Kapan dirender**: Di server Node.js **setiap kali ada pengguna yang meminta URL (*on-demand per request*)**.
- **Cara Kerja**: Server Node.js mengambil data dari database/API, menyusun HTML lengkap di server, lalu mengirimkan HTML matang siap baca ke browser.
- **Kelebihan**: SEO luar biasa bagus, FCP instan, data selalu *up-to-date* detik itu juga.
- **Kekurangan**: Beban CPU server lebih tinggi, TTFB (*Time to First Byte*) bergantung pada kecepatan database server.
- **Cocok untuk**: Halaman detail produk marketplace dinamis, feed media sosial, halaman hasil pencarian tiket penerbangan.

#### 3. Static Site Generation (SSG)
- **Kapan dirender**: Sekali saja di server pada saat perintah **`npm run build`** dijalankan.
- **Cara Kerja**: Seluruh halaman diubah menjadi file `.html` statis murni sebelum aplikasi dideploy.
- **Kelebihan**: Kecepatan *Time to First Byte* secepat kilat (bisa di-cache di seluruh CDN dunia / Cloudflare), beban server nyaris 0, SEO sempurna.
- **Kekurangan**: Jika ada jutaan artikel atau data sering berubah tiap detik, proses build bisa memakan waktu lama.
- **Cocok untuk**: Blog artikel, dokumentasi teknis, landing page pemasaran, halaman FAQ, profil perusahaan.

#### 4. Incremental Static Regeneration (ISR)
- **Kombinasi Terbaik SSG + SSR**: Halaman dibuat secara statis (cepat ala SSG), namun memiliki masa kedaluwarsa cache (misal: `revalidate: 60`).
- **Cara Kerja**: Jika ada request masuk setelah 60 detik, Next.js menyajikan cache lama sekejap, lalu secara diam-diam me-render ulang halaman di latar belakang untuk memperbarui cache berikutnya (*Stale-While-Revalidate*).


---

### 3. Anatomi Konvensi File Next.js App Router (Direktori `app/`)

Next.js versi 13 ke atas memperkenalkan arsitektur **App Router** (menggantikan Pages Router lama) yang berbasis sistem berkas (*file-system based routing*) di dalam direktori `app/`:

```
app/
├── layout.tsx          # Root Layout (Wajib: Membungkus <html> dan <body>)
├── page.tsx            # Halaman utama root ("/")
├── loading.tsx         # Skeleton loading otomatis berbasis React Suspense
├── error.tsx           # Fallback penanganan error runtime ('use client')
├── not-found.tsx       # Tampilan halaman 404
├── global.css          # Styling CSS global
│
├── dashboard/
│   ├── layout.tsx      # Nested Layout khusus dashboard (Sidebar + Topbar)
│   ├── page.tsx        # Halaman "/dashboard"
│   └── settings/
│       └── page.tsx    # Halaman "/dashboard/settings"
│
├── products/
│   ├── page.tsx        # Halaman katalog produk ("/products")
│   └── [id]/
│       └── page.tsx    # Dynamic Route: "/products/123", "/products/abc"
│
└── (auth)/             # Route Group: Folder dibungkus tanda kurung TIDAK masuk URL
    ├── login/
    │   └── page.tsx    # Halaman "/login" (bukan "/(auth)/login")
    └── register/
        └── page.tsx    # Halaman "/register"
```

#### Peran Berkas Khusus yang Wajib Dipahami:
- **`layout.tsx` (Nested & Persistent Layout)**:
  - Komponen shell yang membungkus `children`.
  - **Sifat Istimewa**: Saat berpindah dari `/dashboard` ke `/dashboard/settings`, `layout.tsx` dashboard **TIDAK PERNAH di-unmount atau di-render ulang**. State sidebar atau input di layout tetap aman terjaga (*State preservation*).
- **`page.tsx`**:
  - Konten utama yang unik untuk setiap URL.
- **`loading.tsx`**:
  - Next.js otomatis membungkus `page.tsx` di dalam `<Suspense fallback={<Loading />}>`. Saat data di server sedang di-fetch, tampilan skeleton langsung muncul tanpa kamu perlu mengelola `if (loading)` manual.
- **`error.tsx`**:
  - Otomatis membungkus rute dengan React *Error Boundary*. **Wajib menggunakan direktif `'use client'`** karena harus menangkap error runtime interaktif dan menyediakan tombol `reset()`.

---

### 4. Revolusi React Server Components (RSC) vs Client Components

Di Next.js App Router, **seluruh komponen di dalam folder `app/` secara default adalah React Server Component (RSC)**, kecuali kamu secara eksplisit menambahkan baris `'use client'` di baris paling atas file.

#### A. Karakteristik React Server Component (RSC - Default)
1. **Berjalan 100% di Server**: Kode JavaScript komponen ini dieksekusi di server dan **TIDAK PERNAH dikirim ke bundle peramban pengguna** (*0 KB JavaScript bundle impact*).
2. **Fetch Data Langsung (*Direct Async/Await*)**: Tidak butuh `useEffect`, `useState`, atau Axios instance! Kamu bisa menulis `async function` langsung:
   ```tsx
   // Ini komponen SERVER murni:
   export default async function ProductDetailPage({ params }: { params: { id: string } }) {
     // Panggilan database atau API langsung tanpa useEffect!
     const res = await fetch(`https://api.laravel-backend.test/api/products/${params.id}`)
     const product = await res.json()

     return (
       <div>
         <h1>{product.name}</h1>
         <p>Harga: Rp {product.price.toLocaleString('id-ID')}</p>
       </div>
     )
   }
   ```
3. **Aman Menyimpan Rahasia**: Kamu bisa mengakses `process.env.DB_PASSWORD` atau secret API key langsung di komponen tanpa takut bocor ke browser client.

#### B. Karakteristik Client Component (`'use client'`)
Komponen yang harus berjalan di peramban pengguna untuk menangani interaktivitas.

Kamu **WAJIB** menambahkan `'use client'` jika komponen tersebut:
- Menggunakan React State atau Lifecycle hooks (`useState`, `useEffect`, `useReducer`, `useRef`).
- Menggunakan Event Listener (`onClick`, `onChange`, `onSubmit`, `onKeyDown`).
- Mengakses API browser asli (`window`, `document`, `localStorage`, `navigator.geolocation`).
- Menggunakan Custom Hooks berbasis state (misal Zustand store, React Hook Form).

```tsx
'use client' // Wajib di baris paling pertama!

import { useState } from 'react'

export function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ Suka ({likes})
    </button>
  )
}
```

---

### 5. Matriks Keputusan: Server Component vs Client Component

- **Mengambil data dari Database / REST API**:
  - Server Component: ✅ Rekomendasi Utama (async/await langsung).
  - Client Component: ⚠️ Bisa, tapi butuh useEffect / SWR / TanStack Query.
- **Mengakses Private API Key / Secret Token**:
  - Server Component: ✅ Sangat aman (dieksekusi di backend).
  - Client Component: ❌ Dilarang (bocor ke browser pengguna).
- **Mengimpor library berat (misal parser Markdown 500KB)**:
  - Server Component: ✅ 0 KB dikirim ke browser (hanya HTML hasil parse yang dikirim).
  - Client Component: ❌ Menambah ukuran bundle JS pengguna.
- **Tombol klik interaktif (`onClick`, `onSubmit`)**:
  - Server Component: ❌ Tidak bisa (server tidak menerima interaksi klik).
  - Client Component: ✅ Wajib.
- **Mengelola form state (`useState`, React Hook Form)**:
  - Server Component: ❌ Tidak bisa.
  - Client Component: ✅ Wajib.
- **Mengakses `localStorage` atau `window`**:
  - Server Component: ❌ Tidak bisa (Server tidak punya DOM/Window).
  - Client Component: ✅ Wajib (di dalam `useEffect`).

#### Pola Arsitektur Emas: *Leaf Component Pattern*
Letakkan komponen `'use client'` sejauh mungkin di daun terluar (*leaf nodes*) dari pohon komponen. Biarkan halaman induk (`page.tsx` dan `layout.tsx`) tetap menjadi Server Component yang bertugas mengambil data, lalu oper datanya sebagai props ke komponen Client kecil yang hanya menangani interaksi klik.

---

### 6. Memahami Proses Hydration & Menghindari *Hydration Mismatch*

- **Langkah 1 (Server Render)**: Server menghasilkan HTML murni dan mengirimkannya ke browser.
- **Langkah 2 (Paint)**: Browser menampilkan teks dan gambar secara visual (User sudah bisa membaca artikel, tapi tombol belum bisa diklik).
- **Langkah 3 (Hydration)**: File JavaScript React tiba di browser. React membaca HTML yang sudah ada, lalu "menyuntikkan" *event listener* (`onClick`) dan state ke dalam node DOM tersebut. Sekarang aplikasi menjadi hidup dan interaktif penuh!

#### Apa itu *Hydration Mismatch Error*?
Error ini terjadi jika **HTML yang dihasilkan Server BERBEDA dengan HTML yang dihasilkan oleh Client saat render pertama kali**.

**Penyebab Klasik**:
```tsx
// ❌ BAHAYA HYDRATION MISMATCH:
function WaktuKunjungan() {
  // Di Server di-render pada jam 10:00:00 UTC
  // Di Client browser Indonesia di-render pada jam 17:00:00 WIB
  return <p>Waktu sekarang: {new Date().toLocaleTimeString()}</p>
}
```

**Solusi Standar Industri**:
Pastikan data yang bergantung pada browser hanya di-render setelah komponen selesai me-mount di sisi klien menggunakan `useEffect`:
```tsx
// ✅ AMAN:
function WaktuKunjungan() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <p>Memuat waktu...</p>

  return <p>Waktu sekarang: {new Date().toLocaleTimeString()}</p>
}
```

