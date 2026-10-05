# Modul Pembelajaran Teori & Praktik Mandiri: Hari 8 (Senin, 5 Oktober 2026)
## Topik: Integrasi Backend Laravel REST API, Konfigurasi CORS, Autentikasi Sanctum Token, Axios Interceptor & Protected Routes

Sumber Kebenaran Tunggal: `/home/pramudya/Development/course/react/AGENTS.md`  
Roadmap Utama: `/home/pramudya/Development/course/react/ROADMAP.md`  
Sub-Agent Penanggung Jawab: **Fullstack & Laravel Integration Specialist**

---

### Bagian 1: Konsep Fundamental Fullstack Decoupled (React + Laravel)

Selamat datang di Minggu 2! Hari ini kita beralih dari aplikasi frontend mandiri (*frontend-only*) menjadi arsitektur **Fullstack Decoupled (Terpisah)** kelas industri:

```
[Browser / Klien]
        │
        ├──▶ (1. Render UI Statis) ──▶ [Vercel CDN / Localhost:5173] (React 19)
        │
        └──▶ (2. Request HTTP JSON) ─▶ [Cloudflare Tunnel / Armbian:8000] (Laravel)
             Header: Authorization: Bearer <token>
             Header: Accept: application/json
```

#### 1. Mengapa Token Bearer (Sanctum Personal Access Token), Bukan Session Cookie?
- **Cookie Session**: Membutuhkan domain yang sama persis atau *subdomain sharing* rumit dengan pengaturan `SameSite` dan `Secure`. Sering bermasalah ketika frontend berada di Vercel (`.vercel.app`) sedangkan backend berada di domain lain (`api.domainku.com`).
- **Token Bearer (Sanctum PAT)**: Bersifat *stateless*. Server tidak perlu menyimpan session di memori server. Server hanya memvalidasi apakah tanda tangan kriptografi token yang dikirimkan klien valid di database. Ini sangat fleksibel, tahan banting, dan standar industri untuk SPA & Mobile App.

#### 2. Membedah Misteri CORS & Preflight Request (`OPTIONS`)
- **Same-Origin Policy (SOP)**: Fitur keamanan di browser yang melarang script dari Origin A (`http://localhost:5173`) mengakses data dari Origin B (`http://localhost:8000` atau `https://api.domainku.com`).
- **Preflight Request**: Sebelum browser mengirim request yang mengubah data (seperti `POST`, `PUT`, `DELETE`, atau request yang membawa header `Authorization`), browser akan secara diam-diam mengirimkan request percobaan berjenis **`OPTIONS`**.
- Jika server Laravel tidak merespons request `OPTIONS` dengan header `Access-Control-Allow-Origin: *` (atau domain spesifik) dan status HTTP `200/204`, browser akan langsung memblokir komunikasi tersebut dan memunculkan galat merah terkenal: *"CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."*

---

### Bagian 2: Panduan Backend (Laravel di Armbian / Mesin Lokal)

Kamu bisa mempraktikkan bagian ini langsung di perangkat **Armbian (Flashdisk)** atau di terminal laptop lokal kamu.

#### Langkah 2.1: Inisialisasi Proyek Laravel (Non-Root User)
Masuk ke direktori penyimpanan kamu (misal di mount flashdisk):
```bash
# 1. Pindah ke direktori kerja
cd /path/ke/flashdisk/

# 2. Buat proyek Laravel baru (Laravel 12 / 10)
composer create-project laravel/laravel backend-api

# 3. Masuk ke direktori proyek
cd backend-api
```

#### Langkah 2.2: Setup Database SQLite (Sangat Direkomendasikan untuk Armbian)
SQLite adalah pilihan terbaik untuk Armbian karena tidak membebani RAM sama sekali:
```bash
# 1. Buat file database kosong
touch database/database.sqlite

# 2. Edit berkas .env
# Ubah bagian DB_* menjadi:
# DB_CONNECTION=sqlite
```

#### Langkah 2.3: Konfigurasi CORS di Laravel
Di Laravel 12, CORS sudah tertangani secara otomatis via middleware bawaan. Namun kita perlu memastikan domain frontend diizinkan.

Buka berkas `config/cors.php` (jika belum ada di Laravel 12, terbitkan dengan `php artisan config:publish cors`):
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://*.vercel.app', // Izinkan domain Vercel kamu
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // false untuk Token Bearer murni
];
```

#### Langkah 2.4: Setup Laravel Sanctum & Migrasi
Di Laravel 12, jalankan perintah aktivasi API:
```bash
# Aktifkan rute API dan Sanctum
php artisan install:api

# Jalankan migrasi tabel database (termasuk tabel personal_access_tokens)
php artisan migrate
```
*(Catatan: Pastikan di model `app/Models/User.php` sudah ada trait `use Laravel\Sanctum\HasApiTokens;`).*

#### Langkah 2.5: Pembuatan `AuthController.php`
Buat controller autentikasi khusus API:
```bash
php artisan make:controller Api/AuthController
```

Buka berkas `app/Http/Controllers/Api/AuthController.php` dan tulis kode berikut:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // 1. Registrasi Akun Baru
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Buat Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil!',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // 2. Login & Dapatkan Token
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial email atau password tidak sesuai.'],
            ]);
        }

        // Hapus token lama jika ingin single-session, atau biarkan multi-device
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil!',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    // 3. Ambil Profil User yang Sedang Login
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    // 4. Logout (Cabut Token Saat Ini)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Berhasil logout dan token dicabut.',
        ]);
    }
}
```

#### Langkah 2.6: Daftarkan Rute di `routes/api.php`
Buka berkas `routes/api.php` dan daftarkan endpoint:
```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public Endpoints (Bisa diakses tanpa token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Endpoints (Wajib membawa header Authorization: Bearer <token>)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
```

#### Langkah 2.7: Menjalankan Laravel dengan PM2 & Cloudflare Tunnel
Di terminal Armbian kamu:
```bash
# 1. Jalankan Laravel lewat PM2
pm2 start "php artisan serve --host=0.0.0.0 --port=8000" --name "laravel-api"

# 2. Jalankan Cloudflare Tunnel ke port 8000
pm2 start "cloudflared tunnel run armbian-api" --name "tunnel-api"

# 3. Kunci status PM2 agar auto-start saat reboot
pm2 save
```
Sekarang backend kamu sudah aktif 24/7 dan bisa diakses via `https://api.domainkamu.com/api` (atau `http://localhost:8000/api` jika lokal)!


---

### Bagian 3: Panduan Frontend (React 19 + TypeScript + Vite)

Sekarang kita beralih ke folder proyek React kamu (`react-ts/`).

#### Langkah 3.1: Pasang Pustaka Axios
Buka terminal laptop di folder `react-ts`:
```bash
cd /home/pramudya/Development/course/react/react-ts
npm install axios
```

#### Langkah 3.2: Buat Variabel Lingkungan `.env`
Buat berkas `.env` di folder `react-ts/.env`:
```env
# Ganti dengan URL Cloudflare Tunnel kamu atau localhost
VITE_API_BASE_URL=http://localhost:8000/api
# Atau jika via Cloudflare: VITE_API_BASE_URL=https://api.domainkamu.com/api
```
*(Catatan: Di Vite, variabel lingkungan wajib diawali prefix `VITE_` agar dapat diakses via `import.meta.env`).*

#### Langkah 3.3: Arsitektur Axios HTTP Client & Interceptors
Buat berkas `src/services/api.ts`. Berkas ini menjadi gerbang tunggal seluruh komunikasi HTTP ke backend:

```typescript
import axios from 'axios'

// 1. Buat instance axios dengan konfigurasi dasar
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout jika server tidak merespon
})

// 2. Request Interceptor: Otomatis sisipkan Bearer Token dari localStorage
apiClient.interceptors.request.use(
  (config) => {
    // Ambil auth token yang tersimpan di localStorage
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      try {
        const parsed = JSON.parse(authData)
        const token = parsed?.state?.token
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (e) {
        console.error('Gagal membaca token auth:', e)
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 3. Response Interceptor: Tangani error 401 Unauthorized secara global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Sesi login telah berakhir atau token tidak valid.')
      // Opsional: Hapus sesi jika 401
      localStorage.removeItem('auth-storage')
    }
    return Promise.reject(error)
  }
)
```

#### Langkah 3.4: Arsitektur Zustand Auth Store (`useAuthStore.ts`)
Buat berkas `src/store/useAuthStore.ts`. Store ini mengelola state user, token, dan fungsi login/register/logout:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../services/api'

export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setAuth: (user: User, token: string) => void
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        })
      },

      fetchUser: async () => {
        const { token } = get()
        if (!token) return

        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.get('/me')
          set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (err: any) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: err.response?.data?.message || 'Sesi tidak valid',
          })
        }
      },

      logout: async () => {
        try {
          // Panggil API logout di Laravel untuk mencabut token
          await apiClient.post('/logout')
        } catch (err) {
          console.warn('Logout API warning:', err)
        } finally {
          // Bersihkan state lokal apa pun yang terjadi
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // Kunci di localStorage
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
```


#### Langkah 3.5: Membuat Komponen Auth Guard (`ProtectedRoute.tsx`)
Buat berkas `src/components/auth/ProtectedRoute.tsx`:

```tsx
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Alihkan ke halaman login, simpan lokasi rute tujuan agar bisa diarahkan kembali setelah login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

#### Langkah 3.6: Mendaftarkan Rute Privat di `src/router/index.tsx`
Contoh pembungkusan rute di React Router:
```tsx
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { DashboardPage } from '../pages/DashboardPage'

// Di dalam rute router:
{
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
}
```

---

### Bagian 4: Lembar Checklist Uji Coba Mandiri (Step-by-Step Testing Checklist)

Ikuti tahapan pengujian ini satu per satu untuk memastikan integrasi berjalan sempurna:

- [ ] **1. Jalankan Backend Laravel**:
  - Di Armbian/Lokal: jalankan `php artisan serve --host=0.0.0.0 --port=8000` (atau lewat PM2).
  - Cek di terminal laptop dengan cURL:
    ```bash
    curl -I http://localhost:8000/api/me
    ```
    Respon harus `401 Unauthorized` dengan header JSON (artinya endpoint Sanctum sudah aktif mengunci rute!).

- [ ] **2. Uji Registrasi Akun Baru**:
  - Kirim request POST ke `/api/register` dengan body `{ "name": "Pramudya", "email": "test@example.com", "password": "password123" }`.
  - Pastikan mendapatkan respon `201 Created` beserta string `token` panjang (`1|abcdef...`).

- [ ] **3. Uji Login Akun**:
  - Kirim request POST ke `/api/login` dengan email & password yang tadi didaftarkan.
  - Respon harus `200 OK` dan menghasilkan token baru.

- [ ] **4. Uji Endpoint Terproteksi `/api/me`**:
  - Kirim request GET ke `/api/me` dengan menyertakan header:
    `Authorization: Bearer <token_dari_langkah_3>`
  - Respon harus mengembalikan data user lengkap milikmu.

- [ ] **5. Uji di Sisi React (Frontend)**:
  - Buka halaman login di browser.
  - Masukkan kredensial dan tekan Submit.
  - Periksa tab Application di DevTools (`F12`) $\rightarrow$ `Local Storage`. Pastikan kunci `auth-storage` telah terisi data user dan token.
  - Buka halaman `/dashboard` yang diproteksi. Halaman harus berhasil terbuka!

- [ ] **6. Uji Session Persistence**:
  - Di halaman `/dashboard`, tekan tombol **F5 / Refresh Browser**.
  - Sesi login tidak boleh hilang! Zustand `persist` akan langsung me-restore token dan user dari LocalStorage tanpa melemparmu kembali ke halaman login.

- [ ] **7. Uji Logout**:
  - Klik tombol Logout. Token di Laravel akan dicabut dan `auth-storage` di LocalStorage terhapus.
  - Jika mencoba membuka halaman `/dashboard` secara manual, kamu akan otomatis ditolak dan diarahkan ke `/login`.

---

### 🚨 Panduan Mengatasi Kendala Umum (Troubleshooting)

- **Masalah 1: `CORS policy: No 'Access-Control-Allow-Origin' header`**:
  - *Penyebab*: URL frontend kamu belum terdaftar di `allowed_origins` pada berkas `config/cors.php` di Laravel.
  - *Solusi*: Masukkan port frontend kamu (misal `http://localhost:5173` atau `https://*.vercel.app`) dan jalankan `php artisan config:clear` di Laravel.

- **Masalah 2: `419 CSRF Token Mismatch` / `Page Expired`**:
  - *Penyebab*: Kamu memanggil rute di `routes/web.php` bukan di `routes/api.php`. Rute web membutuhkan cookie CSRF token, sedangkan rute API bersifat stateless.
  - *Solusi*: Pastikan rute auth kamu berada di `routes/api.php`.

- **Masalah 3: `Mixed Content: The page was loaded over HTTPS, but requested an insecure XMLHttpRequest`**:
  - *Penyebab*: Frontend di Vercel menggunakan `https://`, tetapi memanggil backend via `http://`.
  - *Solusi*: Gunakan Cloudflare Tunnel untuk memberikan subdomain HTTPS gratis ke Armbian kamu (`https://api.domainkamu.com`).

