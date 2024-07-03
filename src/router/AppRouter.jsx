import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CalendarPage } from '../page/calendar/pages/CalendarPage'
import { LoginPage } from '../page/auth/pages/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import {CheckingAuth} from '../components/CheckingAuth'

export const AppRouter = () => {

const {status,checkAuthToken} = useAuthStore();

useEffect(() => {
  checkAuthToken();
}, [])


const router = createBrowserRouter(
  status == 'authenticated'
  ?  
  [
    {
        path: "/",
        element: <CalendarPage />,
    },
    {
      path: "/event",
      element: <h1>Evento</h1>,
    },
  ]: status === "checking"
  ?[
    {
      path: "*",
      element: <CheckingAuth />,
    },
  ]
  :[
    {
        path: "/",
        element: <LoginPage />,
    }
  ]
)  


  return (
    <RouterProvider router={router} />
  )
}