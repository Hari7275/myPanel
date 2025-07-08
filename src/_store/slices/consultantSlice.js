import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultantData: null,
  profileStatus: null,
};

console.log("initial consultantData...", initialState.consultantData);

const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {
    setCurrentConsultant: (state, action) => {
      state.consultantData = action.payload;
      console.log("Updated consultantData in slice:", state.consultantData);
    },

    setCurrentProfileStatus: (state, action) => {
      state.profileStatus = action.payload;
      console.log("state.profileStatus", state.profileStatus);
    },
  },
});

export const { setCurrentConsultant, setCurrentProfileStatus } =
  consultantSlice.actions;

export default consultantSlice.reducer;
