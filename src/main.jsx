import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import Layout from '@/Layout.jsx'
import VerifyPage from '@/Pages/Verify.jsx'
import DashboardPage from '@/Pages/Dashboard.jsx'
import TrendingAlertsPage from '@/Pages/TrendingAlerts.jsx'
import HistoryPage from '@/Pages/History.jsx'
import UserProfilePage from '@/Pages/UserProfile.jsx'
import { createPageUrl } from '@/utils'

function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <VerifyPage /> },
      { path: createPageUrl('Verify'), element: <VerifyPage /> },
      { path: createPageUrl('Dashboard'), element: <DashboardPage /> },
      { path: createPageUrl('TrendingAlerts'), element: <TrendingAlertsPage /> },
      { path: createPageUrl('History'), element: <HistoryPage /> },
      { path: createPageUrl('UserProfile'), element: <UserProfilePage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
