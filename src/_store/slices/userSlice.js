import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
