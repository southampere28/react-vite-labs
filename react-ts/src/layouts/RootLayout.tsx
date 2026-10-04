import { NavLink, Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. Navbar Navigasi dengan NavLink Adaptif */}
      <nav className="flex items-center gap-6 px-6 py-3.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-xs">
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

        <NavLink
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
        </NavLink>
      </nav>

      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}
