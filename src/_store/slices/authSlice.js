import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  permissions: {},
  prod: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
        // console.log("Previous state:", JSON.parse(JSON.stringify(state)));
      console.log("Action payload:", action.payload);
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
      state.prod = action.payload.prod || false; // <-- NEW
      state.token = action.payload.token; // <-- NEW
      console.log("New state:", JSON.parse(JSON.stringify(state)));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.permissions = {};
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
