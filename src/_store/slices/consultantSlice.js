import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultantData: null,
  profileStatus: null,
  consultantType: null,
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
    setConsultantType: (state, action) => {
      state.consultantType = action.payload;
      console.log("state.consultantType", state.consultantType);
    },
  },
});

export const {
  setCurrentConsultant,
  setCurrentProfileStatus,
  setConsultantType,
} = consultantSlice.actions;

export default consultantSlice.reducer;
