import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi"
import { setEvent, setNewEvent } from "../store/calendar/calendarSlice";
import { convertToDateEvents } from "../helpers/convertToDateEvents";

export const useCalendarStore = () => {

    const { user } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const startGetEvents = async() => {

        try{

            const resp = await calendarApi.get('event/');

            const { eventos } = resp.data;

            const events = convertToDateEvents( eventos );

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

    return {

        startNewEvent,
        startGetEvents

    }
}