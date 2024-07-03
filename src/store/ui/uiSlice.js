import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEventModalOpen: false,
    isNewEventModalOpen: false,
    isfetch: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: 
        {
        onEventModalOpen: (state ) => {
            state.isEventModalOpen = true;
        },
        onEventModalClose: (state ) => {
            state.isEventModalOpen = false;
        },
        onNewEventModalOpen: (state ) => {
            state.isNewEventModalOpen = true;
        },
        onNewEventModalClose: (state ) => {
            state.isNewEventModalOpen = false;
        },
        onStartFetch: (state ) => {
            state.isfetch = true;
        },
        onEndtFetch: (state ) => {
            state.isfetch = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onEventModalOpen,onEventModalClose,onNewEventModalOpen,onNewEventModalClose,onStartFetch,onEndtFetch } = uiSlice.actions;