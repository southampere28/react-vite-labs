import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  User,
  Mail,
  Calendar,
  Key,
  LogOut,
  RefreshCw,
  CheckCircle,
  Copy
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, token, logout, fetchUser, isLoading } = useAuthStore()
  const [copied, setCopied] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [refreshSuccess, setRefreshSuccess] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleRefresh = async () => {
    await fetchUser()
    setRefreshSuccess(true)
    setTimeout(() => setRefreshSuccess(false), 2000)
  }

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 1. Header Banner */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Sesi Aktif • Sanctum Guard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Selamat Datang, {user?.name || 'Pengguna'}! 👋
            </h1>
            <p className="mt-1 text-blue-100 text-sm max-w-xl">
              Anda berhasil login ke dashboard terproteksi. Akses ke halaman ini dijaga oleh ProtectedRoute dan token otentikasi Bearer di REST API Laravel.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/20 transition-all font-medium text-sm cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <LogOut className="w-4 h-4 text-red-300" />
            <span>Keluar (Logout)</span>
          </button>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. Kartu Informasi Pengguna */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Informasi Akun Anda
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{refreshSuccess ? 'Data Terkini!' : 'Cek Status (/me)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700/60">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                Nama Lengkap
              </span>
              <p className="text-base font-bold text-gray-900 dark:text-black">
                {user?.name || '-'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700/60">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                Alamat Email
              </span>
              <p className="text-base font-bold text-gray-900 dark:text-fuchsia-400 truncate flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{user?.email || '-'}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700/60">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                ID Database Pengguna
              </span>
              <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                #{user?.id || '-'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700/60">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                Terdaftar Sejak
              </span>
              <p className="text-base font-bold text-gray-900 dark:text-black flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Hari ini'}
              </p>
            </div>
          </div>

          {/* Token Display Box */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                Personal Access Token (Sanctum)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {showToken ? 'Sembunyikan' : 'Perlihatkan'}
                </button>
                <button
                  onClick={handleCopyToken}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                >
                  {copied ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
            <div className="p-3 bg-gray-900 text-gray-200 rounded-xl font-mono text-xs break-all border border-gray-700">
              {showToken ? token : token ? `${token.substring(0, 16)}••••••••••••••••••••••••••••••••` : 'Tidak ada token'}
            </div>
          </div>
        </div>

        {/* 3. Panel Status & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Status Integrasi
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Backend: <strong>Laravel 11 REST API</strong></span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Driver API: <strong>Laravel Sanctum</strong></span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Storage: <strong>Zustand Persist</strong></span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Interceptors: <strong>Bearer Header Otomatis</strong></span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50">
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
              Endpoint Terhubung
            </h4>
            <div className="space-y-1.5 text-xs text-blue-800 dark:text-blue-300/80 font-mono">
              <p>POST /api/login</p>
              <p>POST /api/register</p>
              <p>GET  /api/me</p>
              <p>POST /api/logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
