import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { KharchaProvider } from './context/KharchaContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Expenses from './pages/Expenses'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
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
])

export default function App() {
  return (
    <KharchaProvider>
      <RouterProvider router={router} />
    </KharchaProvider>
  )
}
