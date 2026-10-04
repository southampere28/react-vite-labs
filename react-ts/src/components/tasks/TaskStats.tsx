import { CheckCircle2, ListTodo, BarChart3, Clock } from 'lucide-react'
import { useTaskStore } from '../../store/useTaskStore'

export function TaskStats() {
  // Gunakan Atomic Selector agar komponen hanya re-render saat `tasks` berubah
  const tasks = useTaskStore((state) => state.tasks)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.isCompleted).length
  const remainingTasks = totalTasks - completedTasks
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
      {/* 1. Total Tugas */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider">Total Tugas</span>
          <ListTodo className="w-4 h-4 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalTasks}</p>
      </div>

      {/* 2. Selesai */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider">Selesai</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completedTasks}</p>
      </div>

      {/* 3. Masih Berjalan */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider">Belum Selesai</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{remainingTasks}</p>
      </div>

      {/* 4. Progres */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider">Tingkat Capaian</span>
          <BarChart3 className="w-4 h-4 text-purple-500" />
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {percentage}%
            </span>
            <span className="text-[11px] text-gray-400">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
