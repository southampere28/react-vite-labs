import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, User, LogIn, UserPlus } from "lucide-react"

export const RootLayout = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. Navbar Navigasi dengan NavLink Adaptif & Auth Status */}
      <nav className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-xs">
        <div className="flex flex-wrap items-center gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            🏠 Beranda & Mahasiswa
          </NavLink>

          <NavLink
            to="/playground"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            🎮 Zustand Playground
          </NavLink>

          <NavLink
            to="/forms"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            📝 Form Studio (Hari 9)
          </NavLink>

          <NavLink
            to="/performance"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            ⚡ Performa (Hari 10)
          </NavLink>

          <NavLink
            to="/nextjs-intro"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            ▲ Next.js (Hari 11)
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            🎯 Task Tracker (Mini Project 1)
          </NavLink>

          {/* <NavLink
            to="/notes"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`
            }
          >
            📖 Catatan Belajar
          </NavLink> */}

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`
              }
            >
              📊 Dashboard API
            </NavLink>
          )}
        </div>

        {/* Auth Section di kanan */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="max-w-[120px] truncate">{user?.name || "Profil"}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                title="Keluar / Logout"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white font-semibold shadow-xs"
                      : "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                  }`
                }
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

