import { useState } from "react"
import { CheckCircle2, Circle, Trash2, Edit2, Check, X, Calendar } from "lucide-react"
import type { Task, TaskPriority, TaskCategory } from "../../types/task"
import { useTaskStore } from "../../store/useTaskStore"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"

interface TaskItemProps {
  task: Task
}

const PRIORITY_MAP: Record<TaskPriority, { variant: "danger" | "warning" | "success"; label: string }> = {
  high: { variant: "danger", label: "Tinggi" },
  medium: { variant: "warning", label: "Sedang" },
  low: { variant: "success", label: "Rendah" }
}

const CATEGORY_MAP: Record<TaskCategory, { variant: "purple" | "info" | "warning" | "neutral"; label: string }> = {
  "React Core": { variant: "info", label: "React Core" },
  Hooks: { variant: "purple", label: "Hooks" },
  Routing: { variant: "warning", label: "Routing" },
  Styling: { variant: "neutral", label: "Styling" },
  "State Management": { variant: "purple", label: "State Mgmt" },
  General: { variant: "neutral", label: "General" }
}

export function TaskItem({ task }: TaskItemProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const updateTask = useTaskStore((state) => state.updateTask)

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description || "")

  const handleSave = () => {
    if (!editTitle.trim()) return
    updateTask(task.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || undefined
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDesc(task.description || "")
    setIsEditing(false)
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short"
  })

  return (
    <div
      className={`group relative rounded-xl border p-4 transition-all duration-200 ${
        task.isCompleted
          ? "bg-gray-50/70 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 opacity-75"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xs hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => toggleTask(task.id)}
          className="mt-0.5 text-gray-400 hover:text-emerald-500 transition-colors shrink-0 cursor-pointer"
          title={task.isCompleted ? "Tandai belum selesai" : "Tandai selesai"}
        >
          {task.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5 hover:text-emerald-500" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-sm font-semibold bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Judul tugas..."
                autoFocus
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={2}
                className="w-full text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deskripsi tugas (opsional)..."
              />
              <div className="flex items-center gap-2 mt-1">
                <Button variant="primary" size="sm" onClick={handleSave}>
                  <Check className="w-3.5 h-3.5 mr-1" /> Simpan
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-3.5 h-3.5 mr-1" /> Batal
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant={CATEGORY_MAP[task.category]?.variant || "neutral"} size="sm">
                  {CATEGORY_MAP[task.category]?.label || task.category}
                </Badge>
                <Badge variant={PRIORITY_MAP[task.priority]?.variant || "neutral"} size="sm">
                  {PRIORITY_MAP[task.priority]?.label || task.priority}
                </Badge>
                <span className="flex items-center gap-1 text-[11px] text-gray-400 ml-auto">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              </div>

              <h4
                className={`text-sm font-semibold transition-all ${
                  task.isCompleted
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {task.title}
              </h4>

              {task.description && (
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    task.isCompleted
                      ? "line-through text-gray-400 dark:text-gray-600"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors cursor-pointer"
              title="Edit tugas"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
              title="Hapus tugas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
