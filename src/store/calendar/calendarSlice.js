import { createSlice } from '@reduxjs/toolkit';

const initialState={
    activeEvent: {},
    events: []
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setActiveEvent: (state,action) => {
            state.activeEvent = action.payload;
        },
        exitActiveEvent: (state) => {
            state.activeEvent = {}
        },
        setNewEvent: (state,action) => {
            state.events.push(action.payload);
            state.activeEvent = {};
        },
        deleteEvent: (state,action) => {
            const indexNote = state.events.findIndex( (eventNote) => eventNote.id == action.payload.id );
            state.events.splice(indexNote,1);
            state.activeEvent = {};
        }
    }
});

export const { setActiveEvent,exitActiveEvent,setNewEvent,deleteEvent } = calendarSlice.actions;