# Modul Teori Hari 4: Routing & Navigasi Modern (React Router v6/v7)

Panduan konseptual mendalam mengenai arsitektur perutean sisi klien (*Client-Side Routing*), evolusi Data Router, tata letak bersarang (*Nested Layouts*), dan navigasi programatik pada ekosistem React modern.

---

## 1. Fondasi: SPA Routing vs Website Multi-Page Tradisional

### 1.1. Alur Web Tradisional (Multi-Page Application / MPA)
- Pada web konvensional (PHP standar, HTML statis):
  1. Pengguna mengklik tautan `<a href="/profil.html">`.
  2. Browser mengirim request HTTP GET baru ke server web.
  3. Server meracik dan mengirimkan kembali seluruh dokumen HTML yang baru.
  4. Layar browser berkedip putih (*white flash*), seluruh state di memori JavaScript musnah, dan aset (CSS/JS) di-parse ulang.
  5. Pengalaman pengguna terasa lambat dan terputus-putus.

### 1.2. Alur Single Page Application (SPA)
- Pada aplikasi React modern (SPA):
  1. Browser hanya memuat satu file HTML awal (`index.html`) beserta bundel JavaScript.
  2. Saat pengguna berpindah halaman, browser **tidak mengirim request dokumen HTML baru ke server**.
  3. React Router mencegat klik tautan, memanipulasi URL bar peramban menggunakan **HTML5 History API** (`window.history.pushState`), dan mendeteksi perubahan path URL.
  4. Komponen antarmuka yang bersangkutan langsung ditukar di memori RAM dan di-render ke layar secara instan dalam hitungan milidetik.
  5. **State aplikasi tetap terjaga**, navigasi secepat kilat tanpa kedipan layar sama sekali.

### 1.3. Analogi Mobile (GetX / Flutter)
- Jika di GetX kamu berpindah antar-screen menggunakan `Get.to(() => DetailScreen())`, di React web kita mengarahkan URL path browser:
  - `Get.toNamed('/detail/10')` $\approx$ `<Link to="/detail/10">` atau `navigate('/detail/10')`.
  - Bedanya, di web rute direpresentasikan sebagai string path di address bar browser yang bisa di-bookmark atau di-copy-paste oleh pengguna.

---

## 2. Arsitektur Data Router (`createBrowserRouter` & `RouterProvider`)

React Router mengalami evolusi besar dari versi deklaratif lama (JSX tags `<BrowserRouter><Routes><Route>`) menuju paradigma modern **Data Router** (v6.4+ dan v7).

### 2.1. Mengapa Standar Modern Beralih ke Data Router?
1. **Konfigurasi Terpusat (*Single Source of Truth*)**: Seluruh peta rute aplikasi didefinisikan sebagai struktur data JavaScript (Array of Route Objects).
2. **Kinerja & Pre-fetching Data**: Mendukung fitur *loaders* (mengambil data sebelum komponen dirender) dan *actions* (penanganan mutasi form).
3. **Penanganan Error Terisolasi**: Error pada satu sub-halaman dapat ditangkap oleh `errorElement` tanpa merusak navbar utama.

### 2.2. Pola Penulisan Standar:
```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Induk tata letak (Navbar, Header)
    errorElement: <NotFoundPage />, // Fallback jika terjadi error
    children: [
      {
        index: true, // Rute default ketika path '/' diakses
        element: <HomePage />
      },
      // rute anak lainnya...
    ]
  }
])

export function App() {
  return <RouterProvider router={router} />
}
```

---

## 3. Komponen Navigasi: Mengapa Dilarang Pakai Tag `<a>`?

Di aplikasi React Router, terdapat aturan tegas: **Jangan gunakan tag `<a href="...">` untuk navigasi internal aplikasi.**

- Tag `<a>` akan memicu reload penuh browser (*full page refresh*), membunuh seluruh state React di memori.
- Gunakan komponen bawaan React Router:

### 3.1. Komponen `<Link to="...">`
- Pengganti tag `<a>` untuk navigasi internal SPA tanpa reload:
```tsx
import { Link } from 'react-router-dom'

<Link to="/about">Tentang Kami</Link>
```

### 3.2. Komponen `<NavLink to="...">`
- Varian spesial dari `<Link>` yang dirancang khusus untuk menu navigasi (*Navbar/Sidebar*).
- Memiliki callback pintar `({ isActive, isPending })` untuk memberikan gaya styling yang berbeda jika URL halaman tersebut sedang aktif dibuka:
```tsx
import { NavLink } from 'react-router-dom'

<NavLink
  to="/notes"
  style={({ isActive }) => ({
    color: isActive ? '#38bdf8' : '#cbd5e1',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #38bdf8' : 'none'
  })}
>
  📖 Catatan Belajar
</NavLink>
```

---

## 4. Tata Letak Bersarang (*Nested Layouts*) & Komponen `<Outlet />`

Salah satu fitur paling kuat di web modern adalah kemampuan menyusun tata letak bersarang.

### 4.1. Masalah Desain Antarmuka:
- Hampir semua aplikasi web memiliki bagian yang **tetap diam** di posisinya (Navbar atas, Jam Header, Footer, Sidebar).
- Sangat tidak efisien dan kotor jika kita harus meng-copy-paste `<Navbar />` dan `<Header />` di setiap file halaman.

### 4.2. Solusi: Komponen `<Outlet />`
- Komponen `<Outlet />` diimpor dari `react-router-dom`.
- Berfungsi sebagai **"jendela dinamis"** (*placeholder*) di dalam komponen Layout induk.
- Komponen halaman anak (*children*) yang sedang aktif akan otomatis disuntikkan ke dalam posisi `<Outlet />` tersebut.

```tsx
// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function RootLayout() {
  return (
    <div>
      <Navbar /> {/* Tetap diam di atas */}

      <main style={{ padding: '1.5rem' }}>
        <Outlet /> {/* Di sinilah Home, Detail, atau Notes bergantian tampil! */}
      </main>

      <footer>Hak Cipta 2026</footer> {/* Tetap diam di bawah */}
    </div>
  )
}
```

---

## 5. Rute Dinamis (*Dynamic Routing*) & Hook `useParams()`

### 5.1. Kebutuhan Rute Berparameter:
- Bayangkan kita memiliki 1.000 mahasiswa atau 10.000 produk di e-commerce. Kita tidak mungkin membuat 1.000 file rute satu per satu!
- Kita mendefinisikan rute dengan placeholder parameter bertanda titik dua (`:paramName`):
```tsx
{
  path: 'students/:id', // :id adalah variabel dinamis
  element: <StudentDetailPage />
}
```

### 5.2. Membaca Parameter dengan `useParams()`:
- Hook `useParams()` mengekstrak nilai variabel dari URL browser:
```tsx
import { useParams } from 'react-router-dom'

export function StudentDetailPage() {
  // Jika URL yang diakses adalah /students/5
  const params = useParams<{ id: string }>()
  console.log(params.id) // Output: "5" (string)

  // Catatan: Nilai dari URL selalu bertipe string.
  // Gunakan Number(params.id) jika membutuhkan angka.
  return <h2>Detail Mahasiswa ID: {params.id}</h2>
}
```

---

## 6. Navigasi Programatik (*Programmatic Navigation*) dengan Hook `useNavigate()`

Terkadang navigasi tidak terjadi karena pengguna mengklik sebuah link, melainkan dipicu oleh logika JavaScript.

### 6.1. Contoh Kasus Nyata:
- Pengguna mengklik tombol "Kembali ke Halaman Sebelumnya".
- Pengguna berhasil mengisi form pendaftaran, lalu otomatis dialihkan (*redirect*) ke halaman daftar mahasiswa.
- Pengguna belum login, lalu sistem otomatis melempar ke halaman `/login`.

### 6.2. Penggunaan Hook `useNavigate`:
```tsx
import { useNavigate } from 'react-router-dom'

export function FormTambah() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    // 1. Simpan data ke server/state
    // ...

    // 2. Arahkan pengguna ke halaman home secara otomatis:
    navigate('/')

    // Atau jika ingin aksi tombol "Back" peramban:
    // navigate(-1) // Mundur 1 langkah di history browser
  }

  return <button onClick={handleSubmit}>Kirim & Kembali</button>
}
```

---

## 7. Penanganan Rute Wildcard / 404 Not Found (`path: '*'`)

Pengguna sering kali salah mengetik URL di browser. Agar aplikasi tidak menampilkan layar kosong putih atau crash:

- Tambahkan rute dengan path bintang (`*`) di baris paling akhir hirarki rute.
- Tanda bintang mencocokkan URL apa pun yang tidak terdaftar di rute sebelumnya:
```tsx
{
  path: '*',
  element: <NotFoundPage />
}
```

---

## 8. Ringkasan Peta Mental Hari 4

| Fitur / Konsep | Hook / Komponen | Fungsi Utama |
| :--- | :--- | :--- |
| **Inisialisasi Router** | `createBrowserRouter` | Mendefinisikan hierarki dan peta rute secara terpusat. |
| **Penyedia Router** | `<RouterProvider router={...} />` | Menghubungkan konfigurasi router ke root React. |
| **Tautan Navigasi Biasa** | `<Link to="...">` | Berpindah halaman tanpa me-refresh browser. |
| **Tautan Menu Navigasi** | `<NavLink to="...">` | Tautan navigasi yang tahu status aktif (`isActive`). |
| **Wadah Tata Letak** | `<Outlet />` | Tempat disuntikkannya komponen anak di dalam layout. |
| **Baca Variabel URL** | `useParams()` | Membaca URL dinamis seperti `/students/:id`. |
| **Navigasi Logika Kode** | `useNavigate()` | Berpindah halaman via kode JS (redirect, tombol back). |
| **Rute Tak Ditemukan** | `path: '*'` | Menangkap URL salah dan menampilkan halaman 404. |
