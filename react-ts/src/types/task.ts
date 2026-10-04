export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskCategory =
  | 'React Core'
  | 'Hooks'
  | 'Routing'
  | 'Styling'
  | 'State Management'
  | 'General'

export type FilterStatus = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  category: TaskCategory
  isCompleted: boolean
  createdAt: string
}
