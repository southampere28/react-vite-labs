# Log Progres Pembelajaran - Hari 8: Integrasi Backend Laravel REST API & Otentikasi Sanctum

Tanggal: 5 Oktober 2026  
Status: Selesai (Completed)  
Fokus: Setup REST API Laravel 12 (Sanctum), Axios HTTP Client dengan Interceptors, Zustand Auth Store Persist, Protected Routes, UI Login, Register & Protected Dashboard.

---

## 1. Ringkasan Implementasi Backend (Laravel 12)

- Driver Database: SQLite (`database/database.sqlite`), optimal untuk beban dev tanpa service RAM background.
- Paket Otentikasi: Laravel Sanctum (`composer require laravel/sanctum` & `php artisan install:api`).
- Model User: Ditambahkan trait `Laravel\Sanctum\HasApiTokens`.
- Controller: `App\Http\Controllers\Api\AuthController` dengan 4 aksi:
  - `register(Request $request)`: Validasi name, email unik, min 6 char password, hash bcrypt, issue token Sanctum.
  - `login(Request $request)`: Validasi kredensial email & password via `Hash::check()`, issue token Sanctum.
  - `me(Request $request)`: Mengembalikan data user yang sedang login (`$request->user()`).
  - `logout(Request $request)`: Mencabut token saat ini via `$request->user()->currentAccessToken()->delete()`.
- Rute API (`routes/api.php`):
  - `POST /api/register` (Public)
  - `POST /api/login` (Public)
  - `GET /api/me` & `GET /api/user` (Protected `auth:sanctum`)
  - `POST /api/logout` (Protected `auth:sanctum`)

---

## 2. Ringkasan Implementasi Frontend (React + Vite + TypeScript)

- Environment:
  - File `.env` dikonfigurasi dengan `VITE_API_BASE_URL=http://localhost:8000/api`.
- Axios HTTP Client (`src/services/api.ts`):
  - Instance dengan timeout 10s dan `Accept: application/json`.
  - Request Interceptor: Otomatis membaca token dari `localStorage` (`auth-storage`) dan menyematkan header `Authorization: Bearer <token>`.
  - Response Interceptor: Menangkap status code 401 Unauthorized secara global untuk membersihkan sesi jika token kadaluarsa atau dicabut.
- State Management Auth (`src/store/useAuthStore.ts`):
  - Menggunakan Zustand dengan middleware `persist` (`auth-storage`).
  - Actions terintegrasi: `login()`, `register()`, `fetchUser()`, `logout()`, dan `clearError()`.
  - Error handling dengan preservasi tipe Axios dan `cause`.
- Auth Guard Route (`src/components/auth/ProtectedRoute.tsx`):
  - Memeriksa flag `isAuthenticated`.
  - Jika belum login, mengalihkan pengguna ke `/login` dengan menyimpan state lokasi asal (`state={{ from: location }}`).
- Halaman Login (`src/pages/LoginPage.tsx`):
  - Form email & password dengan animasi loading, feedback error, dan auto-redirect kembali ke halaman asal / dashboard.
- Halaman Registrasi (`src/pages/RegisterPage.tsx`):
  - Form pendaftaran nama, email, password, dan konfirmasi password.
  - Langsung mengautentikasi dan mengarahkan ke dashboard begitu sukses.
- Halaman Dashboard Terproteksi (`src/pages/DashboardPage.tsx`):
  - Menampilkan banner selamat datang terautentikasi.
  - Kartu profil: Nama lengkap, email, ID pengguna, dan tanggal bergabung.
  - Panel Personal Access Token Sanctum: Masking token, tombol toggle tampilkan/sembunyikan, dan tombol salin ke clipboard.
  - Tombol uji live "Cek Status (/me)" untuk memvalidasi token langsung ke backend.
  - Tombol Logout untuk mencabut token di server dan mengosongkan state lokal.
- Navigasi Adaptif (`src/layouts/RootLayout.tsx`):
  - Menampilkan tombol Masuk / Daftar jika berstatus tamu.
  - Menampilkan badge nama pengguna, link Dashboard, dan tombol Logout jika berstatus terautentikasi.

---

## 3. Hasil Validasi & Pengujian

- Pengujian Backend via Curl:
  - Login berhasil menghasilkan token Sanctum `plainTextToken`.
  - Endpoint `GET /api/me` dengan `Authorization: Bearer <token>` mengembalikan status 200 OK beserta profil JSON.
  - Endpoint `POST /api/logout` berhasil mencabut token.
  - Akses ulang `GET /api/me` pasca-logout terverifikasi ditolak dengan respons `401 Unauthorized`.
- Pengujian Frontend:
  - Typecheck TypeScript (`npx tsc --noEmit`): 0 error.
  - Linter ESLint (`npm run lint`): 0 error, 0 warning.
  - Build bundle produksi Vite (`npm run build`): Sukses terkompilasi.


---

## 4. Catatan Troubleshooting & Solusi: Laravel 12 API JSON Enforcement

- Kendala Terdeteksi:
  - Pada Laravel 12, jika klien HTTP mengirimkan permintaan tanpa header `Accept: application/json`, kegagalan validasi (`ValidationException`) atau unauthenticated exception secara bawaan dialihkan (*302 redirect*) ke halaman web/root (`/` atau view Blade), menghasilkan respons HTML alih-alih JSON.
  - Hal ini menyebabkan frontend React menerima respons HTML atau error parsing JSON saat validasi gagal atau kredensial salah.
- Solusi Komprehensif:
  - Dibuat custom middleware `App\Http\Middleware\ForceJsonResponse` yang secara otomatis menetapkan header `$request->headers->set('Accept', 'application/json')` untuk seluruh rute API.
  - Didaftarkan pada grup middleware `api` di `bootstrap/app.php` menggunakan `$middleware->prependToGroup('api', [ForceJsonResponse::class])`.
  - Dikonfigurasi `$middleware->redirectGuestsTo(fn ($request) => $request->is('api/*') ? null : '/')` sehingga pengecualian autentikasi pada API tidak mencari named route `login`.
  - Dikonfigurasi `$exceptions->shouldRenderJsonWhen(fn ($request, $e) => $request->is('api/*') ? true : $request->expectsJson())` agar semua exception pada `/api/*` selalu di-render sebagai respons JSON murni.
  - Pada frontend React, Axios instance di `src/services/api.ts` juga dikonfigurasi secara eksplisit mengirimkan `Accept: 'application/json'`.
