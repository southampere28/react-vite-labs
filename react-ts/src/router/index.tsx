import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'
import { ProgressNotesPage } from '../pages/ProgressNotesPage'
import { StudentDetailPage } from '../pages/StudentDetailPage'
import { TaskManagerPage } from '../pages/TaskManagerPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaygroundPage } from '../pages/PlaygroundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'playground',
        element: <PlaygroundPage />
      },
      {
        path: 'tasks',
        element: <TaskManagerPage />
      },
      {
        path: 'notes',
        element: <ProgressNotesPage />
      },
      {
        path: 'students/:id',
        element: <StudentDetailPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])

