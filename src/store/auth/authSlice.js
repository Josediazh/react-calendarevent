import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        checking:( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = null;
        },

        login: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = null;
        },
        logout: (state,action) =>{
            state.status = 'not-authenticated';
            state.user = '';
            state.errorMessage = action.payload; 
        },
        clearMessage: (state) =>{
            state.status = 'not-authenticated';
            state.user = '';
            state.errorMessage = null;
        }
    }
});

export const { checking,login,logout,clearMessage } = authSlice.actions;