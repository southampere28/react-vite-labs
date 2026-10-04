import { useState } from "react"
import { PlusCircle, ChevronDown, ChevronUp } from "lucide-react"
import type { TaskCategory, TaskPriority } from "../../types/task"
import { useTaskStore } from "../../store/useTaskStore"
import { Button } from "../ui/Button"

const CATEGORIES: TaskCategory[] = [
  "React Core",
  "Hooks",
  "Routing",
  "Styling",
  "State Management",
  "General"
]

export function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask)

  const [isOpen, setIsOpen] = useState(true)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<TaskCategory>("React Core")
  const [priority, setPriority] = useState<TaskPriority>("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title,
      description,
      category,
      priority
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-xs mb-6 transition-all">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-blue-500" />
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Tambah Tugas Belajar Baru
          </h3>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3.5">
          {/* Judul Tugas */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Judul Tugas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Selesaikan latihan Zustand Persist Middleware"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Catatan / Deskripsi (Opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Detail materi atau tautan referensi..."
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Kategori & Prioritas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Kategori Modul
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Tingkat Prioritas
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["low", "medium", "high"] as TaskPriority[]).map((p) => {
                  const labels = { low: "Rendah", medium: "Sedang", high: "Tinggi" }
                  const isSelected = priority === p
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`text-xs font-medium py-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? p === "high"
                            ? "bg-red-50 dark:bg-red-950/50 border-red-500 text-red-600 dark:text-red-400 font-bold"
                            : p === "medium"
                            ? "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-600 dark:text-amber-400 font-bold"
                            : "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      {labels[p]}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Simpan Tugas ke Store
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
