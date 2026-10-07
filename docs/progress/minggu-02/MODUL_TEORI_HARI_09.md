# Modul Teori: Hari 9 (Selasa, 6 Oktober 2026)
## Panduan Komprehensif: React Hook Form, Validasi Skema Runtime Zod & Reusable UI Primitives (Shadcn UI Pattern)

Dokumen ini adalah referensi teoritis resmi untuk mempelajari ekosistem form modern performa tinggi pada React 19 / 18, validasi skema runtime menggunakan Zod, serta perancangan komponen UI berbasis Tailwind CSS v4.

---

## 1. Masalah Performa: Controlled Form vs Uncontrolled Form

### 1.1. Pendekatan Tradisional: Controlled Component (`useState`)
Pada pendekatan tradisional React, nilai setiap elemen input diikat langsung ke state lokal:

```tsx
// Controlled Form Tradisional
const [name, setName] = useState('')
const [email, setEmail] = useState('')

return (
  <input value={name} onChange={(e) => setName(e.target.value)} />
)
```

**Konsekuensi Performa**:
- **Re-render per Ketikan**: Setiap karakter yang ditekan oleh pengguna akan memanggil `setName(e.target.value)`. Hal ini memicu re-render ulang komponen form secara menyeluruh.
- **Form Berukuran Besar**: Jika sebuah form memiliki 20 hingga 50 field (misal formulir checkout, registrasi asuransi, inventaris ERP), peramban akan memproses puluhan Virtual DOM diffing untuk setiap tombol yang diketik. Akibatnya terjadi *input lag* atau jeda ketik yang terasa berat di perangkat mobile.

### 1.2. Pendekatan Modern: Uncontrolled Form dengan React Hook Form
React Hook Form mengadopsi prinsip **Uncontrolled Components** yang dikendalikan melalui `ref` HTML DOM asli:

- User mengetik karakter $\rightarrow$ Browser menangani state input di memori DOM langsung tanpa memicu re-render React.
- Saat submit atau event tertentu dipicu $\rightarrow$ React Hook Form membaca nilai dari registry `ref` dan menjalankan validasi.

**Keuntungan Utama**:
- **Zero-Re-render Typing**: Komponen utama form tidak di-render ulang saat pengguna mengetik.
- **Ukuran Bundle Sangat Kecil**: Library ringan tanpa dependensi berat pihak ketiga.
- **HTML Standard Compliance**: Mendukung atribut validasi standar HTML5 (`required`, `min`, `max`, `pattern`) sekaligus validasi runtime skema modern.

---

## 2. Arsitektur React Hook Form v7

### 2.1. Hook `useForm` dan Return Object Inti
Hook `useForm<T>()` menyediakan fungsi-fungsi esensial berikut:

- `register(name, options)`: Menghubungkan elemen input HTML ke registry React Hook Form via `ref`, `name`, `onChange`, dan `onBlur`.
- `handleSubmit(onValid, onInvalid)`: Membungkus event form `onSubmit`. Secara otomatis mencegah default reload (`e.preventDefault()`), menjalankan seluruh validasi, dan hanya mengeksekusi callback `onValid` jika data 100% valid.
- `formState`: Objek reaktif yang berisi indikator status form:
  - `errors`: Objek peta error validasi per nama field.
  - `isSubmitting`: `true` saat fungsi submit asinkron sedang berjalan.
  - `isDirty`: `true` jika pengguna telah mengubah setidaknya satu nilai dari `defaultValues`.
  - `isValid`: `true` jika semua field lolos validasi tanpa error.
  - `touchedFields`: Objek yang mencatat field mana saja yang sudah pernah disentuh/diklik lalu ditinggalkan (`blur`).
- `watch(name)`: Memantau nilai field tertentu jika kita butuh pembaruan kondisional.
- `reset(newValues)`: Mengosongkan form atau menyetel ulang data form ke nilai awal.
- `setValue(name, value)`: Utilitas untuk memperbarui nilai secara programatis.

---

## 3. Validasi Skema Runtime Menggunakan Zod

### 3.1. Mengapa TypeScript Saja Tidak Cukup?
- **TypeScript adalah Kompilator Statis**: Interface dan tipe data hanya ada saat kita menulis kode di editor dan saat proses `tsc`.
- **Type Erasure**: Begitu kode dikompilasi menjadi JavaScript dan berjalan di peramban pengguna, semua tipe TypeScript terhapus total.
- **Data Input Selalu String**: Tag HTML `<input type="number" />` di DOM aslinya mengembalikan string ("150000"). Tanpa validator runtime, data salah format dapat tembus ke server.

### 3.2. Peran Zod & Prinsip "Parse, Don't Validate"
Zod bertindak sebagai validator runtime yang memverifikasi, membersihkan (*sanitizing*), dan mengonversi tipe data secara nyata:

```ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter').max(100),
  sku: z.string().regex(/^PRD-[A-Z0-9]{4,8}$/, 'Format SKU harus PRD-XXXX'),
  category: z.enum(['electronics', 'fashion', 'food', 'furniture']),
  price: z.coerce.number().positive('Harga jual harus lebih dari 0'),
  stock: z.coerce.number().int().min(0, 'Stok minimal 0'),
  isPublished: z.boolean().default(false),
})

// Inferensi Tipe TypeScript Otomatis (Single Source of Truth)
export type ProductInput = z.infer<typeof productSchema>
```

### 3.3. Integrasi via `@hookform/resolvers/zod`
Dengan `@hookform/resolvers/zod`, kita cukup menghubungkan skema Zod ke `useForm`:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting }
} = useForm<ProductInput>({
  resolver: zodResolver(productSchema),
})
```

### 3.4. Validasi Lanjutan: `.refine()` untuk Cross-Field Dependency
Zod memungkinkan validasi antar dua field yang saling bergantung (misal: konfirmasi password):

```ts
export const applicantSchema = z.object({
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Konfirmasi password tidak cocok dengan password',
  path: ['confirmPassword'],
})
```

---

## 4. Arsitektur Komponen UI Reusable (Pola Shadcn UI)

### 4.1. Filosofi Shadcn UI
- Komponen berada di repositori kode kita sendiri (`src/components/ui/`), bukan di dalam `node_modules` yang tertutup.
- Kode 100% dapat dimodifikasi dan disesuaikan styling Tailwind-nya.
- Menggunakan `React.forwardRef` agar elemen HTML input tetap dapat diakses oleh `register` React Hook Form.

### 4.2. Praktik Terbaik:
1. Gunakan `z.coerce.number()` untuk field bertipe angka agar konversi string ke number berjalan mulus.
2. Pisahkan skema Zod ke dalam direktori terpisah (`src/schemas/`).
3. Selalu beri penanda `disabled={isSubmitting}` dan spinner pada tombol submit untuk mencegah submit ganda.

