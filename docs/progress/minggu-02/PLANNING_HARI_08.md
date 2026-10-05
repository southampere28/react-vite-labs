# Rencana Pembelajaran: Hari 8 (Senin, 5 Oktober 2026)
## Topik: Integrasi Backend Laravel REST API, Konfigurasi CORS, Autentikasi Sanctum Token, Axios Interceptor & Protected Routes

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`  
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`  
Sub-Agent Penanggung Jawab: **Fullstack & Laravel Integration Specialist**

---

### 1. Tujuan Pembelajaran
- Memahami arsitektur *decoupled fullstack* antara Client SPA (React 19 + Vite) dan Server API Stateless (Laravel).
- Memahami konsep Same-Origin Policy (SOP), mekanisme Cross-Origin Resource Sharing (CORS), dan preflight request `OPTIONS`.
- Mengonfigurasi backend Laravel agar dapat diakses aman oleh frontend React (baik via LAN lokal, Cloudflare Tunnel, maupun live domain Vercel).
- Mengimplementasikan alur otentikasi berbasis token API (Laravel Sanctum Personal Access Token).
- Membangun Axios HTTP Client terpusat di React dengan Interceptor otomatis (`Authorization: Bearer <token>` dan penanganan error 401 Unauthorized).
- Mengintegrasikan state autentikasi ke dalam Zustand Store dengan persistensi LocalStorage.
- Membangun komponen Auth Guard (`ProtectedRoute`) pada React Router DOM v7 untuk membatasi akses halaman privat.

---

### 2. Konsep Inti & Arsitektur

- **Stateless Authentication (Token Bearer vs Cookie Session)**:
  - Pada aplikasi web tradisional monolitik (Laravel Blade), autentikasi mengandalkan Cookie Session berbasis browser.
  - Pada arsitektur SPA terpisah (React di Vercel, Laravel di Armbian/Cloudflare), autentikasi yang paling andal dan bebas kendala domain silang adalah **Token Bearer (Laravel Sanctum)**.
  - Alur: Pengguna login $\rightarrow$ Laravel memverifikasi password $\rightarrow$ Laravel mencetak string token unik $\rightarrow$ React menyimpan token di `localStorage` $\rightarrow$ Setiap request API berikutnya menyertakan header `Authorization: Bearer <token>`.

- **Cross-Origin Resource Sharing (CORS)**:
  - Peramban secara default memblokir JavaScript di domain A (misal `http://localhost:5173` atau `https://project.vercel.app`) yang mencoba mengambil data dari domain B (misal `https://api.domainku.com`).
  - Laravel harus mengirimkan header respon `Access-Control-Allow-Origin` dan menangani request `OPTIONS` (preflight) agar peramban mengizinkan pembacaan respon JSON.

- **Axios Interceptor**:
  - **Request Interceptor**: Sebelum request keluar dari browser, interceptor secara otomatis menyisipkan token auth tanpa perlu kita ketik manual di setiap fungsi `fetch`.
  - **Response Interceptor**: Jika server merespons dengan status `401 Unauthorized` (misal token kadaluwarsa), interceptor otomatis menghapus token lokal dan mengarahkan pengguna ke halaman login.

- **Protected Routes (Auth Guard)**:
  - Memanfaatkan komponen pembungkus `<ProtectedRoute />` yang mengecek status login. Jika belum login, rute otomatis dialihkan (`<Navigate to="/login" replace />`).

---

### 3. Rincian Pekerjaan & Langkah Pembelajaran Praktis
- **Bagian A: Persiapan Backend Laravel (di Armbian atau Mesin Lokal)**:
  - Instalasi / inisialisasi Laravel menggunakan user non-root.
  - Setup database (SQLite atau MariaDB).
  - Konfigurasi CORS pada `config/cors.php` (izinkan origin frontend).
  - Setup Laravel Sanctum dan pembuatan controller autentikasi (`AuthController.php` dengan method `register`, `login`, `logout`, dan `me`).
  - Uji coba endpoint via cURL atau Postman/Thunder Client.
  - Menjalankan Laravel via PM2 & Cloudflare Tunnel.
- **Bagian B: Pembangunan Integrasi di Frontend React**:
  - Instalasi pustaka `axios`.
  - Pembuatan konfigurasi variabel lingkungan `.env` (`VITE_API_BASE_URL`).
  - Pembuatan service HTTP client terpusat (`src/services/api.ts`) lengkap dengan request/response interceptor.
  - Pembuatan auth store Zustand (`src/store/useAuthStore.ts`) untuk mengelola user, token, status login, dan method action.
  - Pembuatan komponen form login & register interaktif.
  - Pembuatan komponen `ProtectedRoute.tsx` dan integrasinya di `src/router/index.tsx`.
- **Bagian C: Uji Coba End-to-End**:
  - Melakukan pendaftaran akun baru dari form React.
  - Melakukan login, verifikasi penyimpanan token di LocalStorage.
  - Mengakses halaman dashboard rahasia yang terproteksi.
  - Melakukan pengujian refresh browser untuk memastikan sesi tetap bertahan (*session persistence*).
  - Melakukan logout dan memastikan akses ke dashboard kembali diblokir.

---

### 4. Kriteria Keberhasilan (Definition of Done)
- Modul panduan langkah demi langkah (`MODUL_TEORI_HARI_08.md`) tersedia lengkap dan dapat dipraktikkan secara mandiri oleh pembelajar.
- Endpoint API Laravel berhasil merespons registrasi, login, dan profil user tanpa kendala CORS.
- Klien Axios di React berhasil berkomunikasi dengan backend dan mengirimkan header Bearer token secara konsisten.
- Proteksi rute (`ProtectedRoute`) di React berfungsi sempurna menolak akses pengguna tidak berwenang.
- Kode React bebas dari error tipe data TypeScript (`npx tsc --noEmit`) dan lolos linter (`npm run lint`).
