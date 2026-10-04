import { Search, RotateCcw, Trash2, CheckCheck, Inbox } from "lucide-react"
import { useTaskStore } from "../store/useTaskStore"
import { TaskStats } from "../components/tasks/TaskStats"
import { TaskForm } from "../components/tasks/TaskForm"
import { TaskItem } from "../components/tasks/TaskItem"
import { Button } from "../components/ui/Button"
import type { FilterStatus } from "../types/task"

export function TaskManagerPage() {
  const tasks = useTaskStore((state) => state.tasks)
  const searchQuery = useTaskStore((state) => state.searchQuery)
  const filterStatus = useTaskStore((state) => state.filterStatus)
  const selectedCategory = useTaskStore((state) => state.selectedCategory)

  const setSearchQuery = useTaskStore((state) => state.setSearchQuery)
  const setFilterStatus = useTaskStore((state) => state.setFilterStatus)
  const setSelectedCategory = useTaskStore((state) => state.setSelectedCategory)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)
  const resetToDefault = useTaskStore((state) => state.resetToDefault)

  // Derived filtered tasks
  const filteredTasks = tasks.filter((task) => {
    // 1. Search Query
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))

    // 2. Status Filter
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
        ? task.isCompleted
        : !task.isCompleted

    // 3. Category Filter
    const matchesCategory =
      selectedCategory === "all" ? true : task.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const completedCount = tasks.filter((t) => t.isCompleted).length
  const activeCount = tasks.length - completedCount

  const categories = [
    "all",
    "React Core",
    "Hooks",
    "Routing",
    "Styling",
    "State Management",
    "General"
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Halaman */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              🎯 Study & Task Tracker
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Mini Project 1: Global State Management (Zustand) + LocalStorage Persistence
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              title="Kembalikan data demo bawaan roadmap"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Data Demo
            </Button>
            {completedCount > 0 && (
              <Button
                variant="danger"
                size="sm"
                onClick={clearCompleted}
                title="Hapus semua tugas yang sudah selesai"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Bersihkan Selesai ({completedCount})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Ringkasan Statistik */}
      <TaskStats />

      {/* Form Input Tambah Task */}
      <TaskForm />

      {/* Toolbar Filter & Pencarian */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tugas berdasarkan judul atau catatan..."
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kategori</option>
              {categories.filter((c) => c !== "all").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 overflow-x-auto">
          {(
            [
              { id: "all", label: "Semua", count: tasks.length },
              { id: "active", label: "Belum Selesai", count: activeCount },
              { id: "completed", label: "Selesai", count: completedCount }
            ] as { id: FilterStatus; label: string; count: number }[]
          ).map((tab) => {
            const isActive = filterStatus === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-blue-500 text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                }`}
              >
                {tab.id === "completed" && <CheckCheck className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* List Tugas */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl py-12 px-4 text-center">
            <Inbox className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Tidak ada tugas yang cocok
            </h4>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian, ubah filter kategori, atau tambahkan tugas belajar baru melalui form di atas.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
