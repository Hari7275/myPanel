import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coverPhoto: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setCoverPhoto: (state, action) => { 
      state.coverPhoto = action.payload;
    },
  },
});

export const { setCoverPhoto } = imageSlice.actions;

export default imageSlice.reducer; 
