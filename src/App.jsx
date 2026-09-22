import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Expenses from './pages/Expenses'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import Login from './pages/Login'

function ProtectedRoute() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'calendar', element: <Calendar /> },
          { path: 'expenses', element: <Expenses /> },
          { path: 'summary', element: <Insights /> },
          { path: 'history', element: <Insights /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
