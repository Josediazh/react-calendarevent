import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEventModalOpen: false,
    isNewEventModalOpen: false,
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
    }
});


// Action creators are generated for each case reducer function
export const { onEventModalOpen,onEventModalClose,onNewEventModalOpen,onNewEventModalClose } = uiSlice.actions;