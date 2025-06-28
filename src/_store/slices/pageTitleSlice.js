import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: 'Flute Admin Panel'
};
const pageTitleSlice = createSlice({
    name: 'pageTitle',
    initialState,
    reducers: {
        setPageTitle: (state, action)=> {
            state.title = action.payload;
        }
    }
});

export const {setPageTitle} = pageTitleSlice.actions;
export default pageTitleSlice.reducer;