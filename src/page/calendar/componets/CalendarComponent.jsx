import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import mx, { name } from 'dayjs/locale/es-mx'
import dayjs from 'dayjs'
import { CalendarEvent } from './CalendarEvent'
import { useDispatch, useSelector } from 'react-redux'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { onEventModalOpen, onNewEventModalOpen } from '../../../store/ui/uiSlice'
import { useState } from 'react'
import { setActiveEvent } from '../../../store/calendar/calendarSlice'


dayjs.locale(mx)

export const CalendarApp = (props) => {  

  const dispatch = useDispatch();
  const {events} = useSelector( (state) => state.calendar );

  const [calendarView] = useState(localStorage.getItem('calendarView') || 'month');

  const localizer = dayjsLocalizer(dayjs);

  const messages = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
  };

  const onNewEvent = (event) => {

    const activeEvent = {
      title: '',
      start: event.start,
      end: event.end,
      notes: ''
    }

    dispatch( setActiveEvent(activeEvent) );
    dispatch( onNewEventModalOpen() );

  }
  
  const onClickEvent = (event) => {

    const activeEvent = {
      ...event,
      start: event.start,
      end: event.end,
    }

    dispatch( setActiveEvent(activeEvent) );
    dispatch( onEventModalOpen() );

  }

  const onViewCalendar = (event) => {
    localStorage.setItem('calendarView',event);
  }

  return (
    <Calendar 
    localizer={localizer}
    events={events}
    defaultView={calendarView}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    messages={messages}
    components={{
      event: CalendarEvent
    }}
    onSelectEvent={onClickEvent}
    onView={onViewCalendar}
    onSelectSlot={onNewEvent}
    selectable
     />
  )
}