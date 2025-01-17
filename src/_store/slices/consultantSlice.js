import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultantData: null,
};

const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {
    setCurrentConsultant: (state, action) => {
      state.consultantData = action.payload;
    },
  },
});

export const { setCurrentConsultant } = consultantSlice.actions;

export default consultantSlice.reducer;
