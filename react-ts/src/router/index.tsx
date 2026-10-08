import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'
import { ProgressNotesPage } from '../pages/ProgressNotesPage'
import { StudentDetailPage } from '../pages/StudentDetailPage'
import { TaskManagerPage } from '../pages/TaskManagerPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaygroundPage } from '../pages/PlaygroundPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { FormStudioPage } from '../pages/FormStudioPage'
import { PerformanceStudioPage } from '../pages/PerformanceStudioPage'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'forms',
        element: <FormStudioPage />,
      },
      {
        path: 'performance',
        element: <PerformanceStudioPage />,
      },
      {
        path: 'playground',
        element: <PlaygroundPage />,
      },
      {
        path: 'tasks',
        element: <TaskManagerPage />,
      },
      {
        path: 'notes',
        element: <ProgressNotesPage />,
      },
      {
        path: 'students/:id',
        element: <StudentDetailPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])




