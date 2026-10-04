import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Task, TaskPriority, TaskCategory, FilterStatus } from '../types/task'

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Pelajari Fondasi Vite, JSX, dan Virtual DOM',
    description: 'Pahami perbedaan esbuild vs bundler lama serta aturan JSX/TSX.',
    priority: 'high',
    category: 'React Core',
    isCompleted: true,
    createdAt: '2026-09-28T09:00:00.000Z'
  },
  {
    id: 'task-2',
    title: 'Kuasai useState, Immutability & Form Interaktif',
    description: 'Update state objek via spread operator dan synthetic form events.',
    priority: 'high',
    category: 'Hooks',
    isCompleted: true,
    createdAt: '2026-09-29T09:00:00.000Z'
  },
  {
    id: 'task-3',
    title: 'Integrasi Side Effects, useEffect & AbortController',
    description: 'Konsumsi REST API publik dengan cleanups dan state loading/error.',
    priority: 'medium',
    category: 'Hooks',
    isCompleted: true,
    createdAt: '2026-09-30T09:00:00.000Z'
  },
  {
    id: 'task-4',
    title: 'Setup Client-Side Routing v7 & Nested Layouts',
    description: 'Gunakan createBrowserRouter, Outlet, Link, dan dynamic params :id.',
    priority: 'high',
    category: 'Routing',
    isCompleted: true,
    createdAt: '2026-10-01T09:00:00.000Z'
  },
  {
    id: 'task-5',
    title: 'Styling Modern Tailwind CSS v4 & Reusable Primitives',
    description: 'Bangun Button.tsx dan Badge.tsx dengan dukungan varian & Dark Mode.',
    priority: 'medium',
    category: 'Styling',
    isCompleted: true,
    createdAt: '2026-10-02T09:00:00.000Z'
  },
  {
    id: 'task-6',
    title: 'Mini Project 1: Zustand Store & LocalStorage Persistence',
    description: 'Bangun Task Tracker interaktif dengan sinkronisasi state global.',
    priority: 'high',
    category: 'State Management',
    isCompleted: false,
    createdAt: '2026-10-03T09:00:00.000Z'
  }
]

interface TaskStoreState {
  tasks: Task[]
  searchQuery: string
  filterStatus: FilterStatus
  selectedCategory: string

  // Actions CRUD
  addTask: (input: {
    title: string
    description?: string
    priority: TaskPriority
    category: TaskCategory
  }) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  clearCompleted: () => void
  resetToDefault: () => void

  // Actions Filter & Search
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: FilterStatus) => void
  setSelectedCategory: (category: string) => void
}

export const useTaskStore = create<TaskStoreState>()(
  persist(
    (set) => ({
      tasks: INITIAL_TASKS,
      searchQuery: '',
      filterStatus: 'all',
      selectedCategory: 'all',

      addTask: (input) =>
        set((state) => ({
          tasks: [
            {
              id: `task-${Date.now()}`,
              title: input.title.trim(),
              description: input.description?.trim() || undefined,
              priority: input.priority,
              category: input.category,
              isCompleted: false,
              createdAt: new Date().toISOString()
            },
            ...state.tasks
          ]
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          )
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          )
        })),

      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.isCompleted)
        })),

      resetToDefault: () =>
        set({
          tasks: INITIAL_TASKS
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterStatus: (status) => set({ filterStatus: status }),
      setSelectedCategory: (category) => set({ selectedCategory: category })
    }),
    {
      name: 'react-course-study-tasks',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
)
