import axios from 'axios'

// 1. Buat instance axios dengan konfigurasi dasar
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    'ngrok-skip-browser-warning': 'true', // update param
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