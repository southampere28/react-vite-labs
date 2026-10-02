# Modul Teori: Hari 5 (Jumat, 2 Oktober 2026)

Panduan konseptual mendalam mengenai arsitektur **Tailwind CSS v4**, filosofi *Utility-First*, prinsip desain *Mobile-First Responsive*, dan pembuatan komponen antarmuka *Reusable UI Primitives*.

---

## 1. Evolusi Styling Web: Mengapa Industri Beralih ke Tailwind CSS?

Dalam perjalanan pengembangan antarmuka web, pendekatan styling telah melewati tiga generasi besar:

### 1.1. Generasi 1: CSS Tradisional & Metodologi BEM (Block Element Modifier)
- **Konsep**: Membuat berkas `.css` terpisah dan memberi nama class yang panjang serta deskriptif pada setiap elemen HTML.
- **Contoh**:
  ```css
  .student-card { background: #1e293b; border-radius: 12px; }
  .student-card__header { display: flex; justify-content: space-between; }
  .student-card__title--active { color: #38bdf8; }
  ```
- **Kelemahan Nyata di Dunia Kerja**:
  - **Naming Fatigue**: Developer menghabiskan energi kreatif hanya untuk memperdebatkan nama class.
  - **CSS File Explosion**: Ukuran berkas CSS terus membengkak seiring bertambahnya fitur.
  - **Takut Menghapus Kode**: Karena CSS bersifat global, menghapus class lama sering kali merusak tampilan halaman lain tanpa disengaja.

### 1.2. Generasi 2: Inline Styles (`style={{ ... }}`)
- **Konsep**: Menempelkan properti objek CSS langsung ke dalam JSX (seperti yang kita gunakan pada Hari 1 - 4).
- **Kelemahan**:
  - Tidak mendukung pseudo-classes penting: `:hover`, `:active`, `:focus`.
  - Tidak mendukung media queries untuk membuat tampilan responsif mobile/desktop.
  - Menghasilkan markup JSX yang berantakan dan sulit dibaca.

### 1.3. Generasi 3: Tailwind CSS (Utility-First Workflow)
- **Konsep**: Alih-alih membuat satu class raksasa untuk satu komponen, Tailwind menyediakan ribuan class utilitas atomik kecil (*single-purpose utility classes*) yang langsung ditempelkan pada atribut `className`:
  ```tsx
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
    Simpan Data
  </button>
  ```
- **Keunggulan Utama**:
  1. **Zero Context Switching**: Desain dan struktur JSX hidup di tempat yang sama.
  2. **Zero Naming Fatigue**: Tidak perlu pusing memikirkan nama class.
  3. **Ukuran File Produksi Super Kecil**: Mesin kompilasi Tailwind membuang seluruh class yang tidak terpakai (*Purging / Tree-shaking*). File CSS akhir di produksi umumnya hanya berukuran di bawah 10–15 KB!
  4. **Design Token Standar**: Jarak, warna, sudut lengkung, dan font konsisten secara matematis di seluruh proyek.

---

## 2. Arsitektur Modern Tailwind CSS v4 (@tailwindcss/vite)

Pada generasi Tailwind v4, tim pengembang merombak total arsitektur mesin kompilasi:

- **Mesin Kompilasi Oxide (Ditulis dalam Bahasa Rust)**: Kecepatan kompilasi hingga 10x lebih cepat dibanding Tailwind v3.
- **Bebas File Konfigurasi Rumit**: Tidak perlu lagi `tailwind.config.js` atau `postcss.config.js`.
- **Integrasi Penuh dengan Vite**: Menggunakan plugin resmi `@tailwindcss/vite`.
- **Cara Setup di Vite + React**:
  1. Instalasi dependensi:
     ```bash
     npm install tailwindcss @tailwindcss/vite
     ```
  2. Daftarkan di `vite.config.ts`:
     ```ts
     import { defineConfig } from 'vite'
     import react from '@vitejs/plugin-react'
     import tailwindcss from '@tailwindcss/vite'

     export default defineConfig({
       plugins: [
         react(),
         tailwindcss(), // 👈 Cukup tambahkan plugin ini
       ],
     })
     ```
  3. Tambahkan direktif impor di baris paling atas `src/index.css`:
     ```css
     @import "tailwindcss";
     ```

---

## 3. Kamus Kilat Utilitas Tailwind Esensial

Berikut adalah daftar utility class Tailwind yang paling sering digunakan dalam pengembangan web modern:

### 3.1. Tata Letak (Layout & Flexbox/Grid)
- `flex`: Mengaktifkan container flexbox.
- `flex-col`: Mengubah arah flex menjadi vertikal (kolom).
- `items-center`: Menyelaraskan elemen secara vertikal ke tengah (*align-items: center*).
- `justify-between`: Menyebarkan elemen ke ujung kiri dan kanan (*justify-content: space-between*).
- `justify-center`: Menyelaraskan elemen secara horizontal ke tengah.
- `grid`: Mengaktifkan container CSS Grid.
- `grid-cols-1`: Grid 1 kolom.
- `gap-4`: Memberikan jarak seragam 1rem (16px) antar elemen.

### 3.2. Spasi (Spacing: Margin & Padding)
Tailwind menggunakan sistem skala berbasis kelipatan 4px:
- `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px.
- `px-4`: Padding horizontal (kiri dan kanan) 16px.
- `py-2`: Padding vertikal (atas dan bawah) 8px.
- `m-4`: Margin luar 16px.
- `mt-2`: Margin atas 8px.
- `mb-4`: Margin bawah 16px.
- `mx-auto`: Margin horizontal otomatis (memposisikan container tepat di tengah layar).

### 3.3. Tipografi & Warna (Typography & Colors)
- Ukuran Teks: `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px).
- Bobot Huruf: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).
- Warna Teks: `text-slate-100`, `text-slate-400`, `text-blue-400`, `text-emerald-400`, `text-red-400`.
- Warna Latar: `bg-slate-900`, `bg-slate-800`, `bg-blue-600`, `bg-emerald-600`.
- Transparansi Warna: `bg-slate-800/80` (background slate dengan transparansi 80%), `bg-blue-500/10` (transparansi 10%).

### 3.4. Sudut Lengkung, Border & Bayangan (Borders & Shadows)
- Sudut Lengkung: `rounded-md` (6px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-full` (lingkaran penuh / kapsul).
- Garis Batas: `border border-slate-700` (border 1px warna slate-700).
- Bayangan: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.

---

## 4. Filosofi Desain Responsif: "Mobile-First"

Tailwind menerapkan pendekatan **Mobile-First** secara mutlak. Artinya:
> **Setiap class tanpa prefix ditujukan untuk layar terkecil (smartphone). Prefix breakpoint ditambahkan untuk mempercantik layar saat ukuran layar melebar.**

### Tabel Breakpoint Bawaan Tailwind:
| Prefix | Lebar Layar Minimum | Target Perangkat |
| :--- | :--- | :--- |
| *(tanpa prefix)* | `0px` ke atas | Layar Ponsel / Mobile (Default) |
| `sm:` | `640px` ke atas | Ponsel Besar / Tablet Mini |
| `md:` | `768px` ke atas | Tablet / iPad |
| `lg:` | `1024px` ke atas | Laptop / Layar Desktop |
| `xl:` | `1280px` ke atas | Monitor Desktop Lebar |

### Contoh Kasus Grid Responsif:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Di HP (<640px)      : Tampil 1 kolom */}
  {/* Di Tablet (>=640px)  : Otomatis berubah jadi 2 kolom */}
  {/* Di Laptop (>=1024px) : Otomatis berubah jadi 3 kolom */}
</div>
```


---

## 5. Pseudo-Classes & Interaktivitas Visual

Membuat efek interaktif sangat mudah dan deklaratif dengan Tailwind:

- **Hover (Kursor di atas elemen)**:
  `bg-blue-600 hover:bg-blue-700`
- **Active (Saat elemen diklik/ditekan)**:
  `active:scale-95` (memberikan efek sedikit mengecil saat ditekan, mirip tombol HP fisik).
- **Focus Ring (Saat input form aktif)**:
  `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- **Transisi Halus**:
  `transition-all duration-200 ease-in-out` (menghilangkan perubahan kaku dan membuat animasi warna/transformasi terasa lembut).

---

## 6. Pola Pembuatan Reusable UI Primitives dengan TypeScript

Masalah umum developer pemula dengan Tailwind adalah terjadinya pengulangan class panjang (*class duplication*).
Solusi terbaik di React adalah **mengisolasi class tersebut ke dalam Reusable UI Component**.

### 6.1. Komponen `Button.tsx` (`src/components/ui/Button.tsx`)
```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  // 1. Gaya dasar yang selalu dimiliki oleh setiap tombol
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  // 2. Kamus varian warna
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-sm hover:shadow-md',
    outline: 'border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-slate-300 active:scale-95'
  }

  // 3. Kamus varian ukuran
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
```

### 6.2. Komponen `Badge.tsx` (`src/components/ui/Badge.tsx`)
```tsx
import type { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'neutral'
  children: ReactNode
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  const variantClasses = {
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    neutral: 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
```

---

## 7. Refactoring Checklist: Dari Inline Styles ke Tailwind Modern

Saat kamu mengonversi kode di `StudentCard.tsx` atau `HomePage.tsx`:
1. **Ganti Container Card**:
   - Dari: `style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}`
   - Menjadi: `className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-slate-500 hover:shadow-xl transition-all"`
2. **Ganti Form Inputs**:
   - Dari: `style={{ padding: '0.5rem', width: '100%' }}`
   - Menjadi: `className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"`
3. **Ganti List Skills**:
   - Manfaatkan `Badge` dengan varian `info` atau `neutral` agar setiap skill tampak seperti chip modern.

