import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi"
import { deleteEvent, setActiveEvent, setEvent, setNewEvent } from "../store/calendar/calendarSlice";
import { convertToDateEvents } from "../helpers/convertToDateEvents";
import { useState } from "react";

export const useCalendarStore = () => {

    const { user } = useSelector( state => state.auth );
    const { events } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const startGetEvents = async() => {

        try{

            const storageEvents = JSON.parse(localStorage.getItem('events'),function(key, value) {
                if (key == 'user') return JSON.stringify(value);
                return value;
              });

            let events = [];

            if (!storageEvents){

                const resp = await calendarApi.get('event/');
                const { eventos } = resp.data;
                events = convertToDateEvents( eventos );
                localStorage.setItem('events',JSON.stringify(events));

            }else{

                events = convertToDateEvents( storageEvents );

            }

            dispatch( setEvent( events ) );

        }catch(error){

            console.log(error);

        }

    }
  
    const startNewEvent = async({titleevent,startevent,endevent,notesevent}) => {

        try{

            const resp = await calendarApi.post('event/newevent',{
                title: titleevent,
                start: startevent,
                end:  endevent,
                notes: notesevent
              });

            dispatch(setNewEvent({
                title: titleevent,
                start: startevent,
                end:  endevent,
                notes: notesevent,
                user,
                id: resp.data.id
              })); 

        }catch(error){
            console.log(error);
        }

    }

    const startEditEvent = async({id,title,start,end,notes}) => {

        try{

            const resp = await calendarApi.put(`event/updateevent/${id}`,{
                title: title,
                start: start,
                end:  end,
                notes: notes
              });
            localStorage.removeItem('events');
            await startGetEvents();

        }catch(error){
            console.log(error);
        }

    }

    const startDeleteEvent = async({id}) => {

        try{

            const resp = calendarApi.delete(`event/deleteevent/${id}`);
            dispatch( deleteEvent({
                id
            }));
            localStorage.removeItem('events');
            await startGetEvents();

        }catch{
            console.log(error);
        }

    }

    const startGetEvent = ({id}) => {

        const eventEdit = events.find( (event) => event.id == id );

        dispatch( setActiveEvent(eventEdit) );

    }

    return {

        startNewEvent,
        startGetEvents,
        startDeleteEvent,
        startGetEvent,
        startEditEvent

    }
}