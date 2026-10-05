import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { apiClient } from '../services/api'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setAuth: (user: User, token: string) => void
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
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

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.post('/login', { email, password })
          const { user, token } = res.data
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (err: unknown) {
          let errorMessage = 'Gagal melakukan login. Periksa koneksi atau kredensial.'
          if (axios.isAxiosError(err)) {
            const data = err.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined
            if (data?.errors) {
              const firstKey = Object.keys(data.errors)[0]
              if (firstKey && data.errors[firstKey]?.length) {
                errorMessage = data.errors[firstKey][0]
              }
            } else if (data?.message) {
              errorMessage = data.message
            } else if (err.message) {
              errorMessage = err.message
            }
          }
          set({
            isLoading: false,
            error: errorMessage,
          })
          throw new Error(errorMessage, { cause: err })
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.post('/register', { name, email, password })
          const { user, token } = res.data
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (err: unknown) {
          let errorMessage = 'Gagal melakukan registrasi.'
          if (axios.isAxiosError(err)) {
            const data = err.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined
            if (data?.errors) {
              const firstKey = Object.keys(data.errors)[0]
              if (firstKey && data.errors[firstKey]?.length) {
                errorMessage = data.errors[firstKey][0]
              }
            } else if (data?.message) {
              errorMessage = data.message
            } else if (err.message) {
              errorMessage = err.message
            }
          }
          set({
            isLoading: false,
            error: errorMessage,
          })
          throw new Error(errorMessage, { cause: err })
        }
      },

      fetchUser: async () => {
        const { token } = get()
        if (!token) return

        set({ isLoading: true, error: null })
        try {
          const res = await apiClient.get('/me')
          set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (err: unknown) {
          let errorMessage = 'Sesi login tidak valid atau telah berakhir.'
          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || errorMessage
          }
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
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
