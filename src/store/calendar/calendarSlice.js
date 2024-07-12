import { createSlice } from '@reduxjs/toolkit';

const initialState={
    activeEvent: {},
    events: []
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setEvent: (state,action) => {
            state.events = action.payload;
            state.activeEvent = {};
        },
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
        },
        clearEvents: (state,action) => {
            state.events = [];
            state.activeEvent = {};
        },
    }
});

export const { setActiveEvent,exitActiveEvent,setNewEvent,deleteEvent,setEvent,clearEvents } = calendarSlice.actions;