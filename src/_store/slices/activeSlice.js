import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: null,
};

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    resetActiveTab: (state) => {
      state.activeTab = null; // Reset state to null
    },
  },
});

export const { setActiveTab, resetActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
