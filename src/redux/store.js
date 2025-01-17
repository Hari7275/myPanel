/* this is the main file of the store */
import { configureStore } from "@reduxjs/toolkit";
import { listenersSlice } from "./slice/ListenersSlice";
import { apiSlice } from "./slice/apiSlice";
import imageSlice from "./slice/imageSlice";
import modalSlice from "./slice/modalSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    image: imageSlice,
    modal: modalSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
