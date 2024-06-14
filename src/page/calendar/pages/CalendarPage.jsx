import { CalendarApp } from '../componets/CalendarComponent'
import { NavBar } from '../componets/NavBar'

import '../assets/calendarstyle.css'
import { CalendarModal } from '../componets/CalendarModal'
import { CalendarNewEventModal } from '../componets/CalendarNewEventModal'

export const CalendarPage = () => {
  return (
    <>
      <NavBar />
      <CalendarApp />
      <CalendarModal />
      <CalendarNewEventModal />
    </>
  )
}