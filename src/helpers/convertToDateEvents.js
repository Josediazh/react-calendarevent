import dayjs from "dayjs";


export const convertToDateEvents = (events = []) => {

    return events.map ( (event) => {

        event.start = dayjs(event.start).toDate()
        event.end = dayjs(event.end).toDate()
        event.user = event.usr

        delete(event.usr)

        return event;
    } ) 
 
}
