import { useEffect, useState } from "react"

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Belajar React
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
          ⏱️ {currentTime}
        </p>
      </div>
    </header>
  )
}
