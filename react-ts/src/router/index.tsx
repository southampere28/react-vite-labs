import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'
import { ProgressNotesPage } from '../pages/ProgressNotesPage'
import { StudentDetailPage } from '../pages/StudentDetailPage'
import { NotFoundPage } from '../pages/NotFoundPage'

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
