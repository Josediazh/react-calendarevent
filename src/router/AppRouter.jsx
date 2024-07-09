import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CalendarPage } from '../page/calendar/pages/CalendarPage'
import { LoginPage } from '../page/auth/pages/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import {CheckingAuth} from '../components/CheckingAuth'
import { useCalendarStore } from '../hook/useCalendarStore'
import { CalendarEdit } from '../page/calendar/pages/CalendarEdit'

export const AppRouter = () => {

const {status,checkAuthToken} = useAuthStore();
const { startGetEvents } = useCalendarStore();

useEffect(() => {
  checkAuthToken();
}, [])

useEffect(() => {

  if(status == 'authenticated' ){
    startGetEvents();
  }
  
}, [status])

const router = createBrowserRouter(
  status == 'authenticated'
  ?  
  [
    {
        path: "/",
        element: <CalendarPage />,
    },
    {
      path: "/event/:id",
      element: <CalendarEdit />
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