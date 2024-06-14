import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CalendarPage } from '../page/calendar/pages/CalendarPage'
import { LoginPage } from '../page/auth/pages/LoginPage'

export const AppRouter = () => {

const router = createBrowserRouter([
    {
        path: "/",
        element: <CalendarPage />,
    },
    {
      path: "/event",
      element: <h1>Evento</h1>,
  },
    {
        path: "/login",
        element: <LoginPage />,
    }
])  


  return (
    <RouterProvider router={router} />
  )
}