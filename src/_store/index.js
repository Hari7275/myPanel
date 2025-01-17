import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import slices and api
import apiSlice from "./api/api";
import modalSlice from "./slices/modalSlice";
import imageSlice from "./slices/imageSlice";
import userSlice from "./slices/userSlice";
import consultantSlice from "./slices/consultantSlice";
import activeTabSlice from "./slices/activeSlice";

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  modal: modalSlice,
  image: imageSlice,
  user: userSlice,
  consultant: consultantSlice,
  activeTab: activeTabSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "consultant", "activeTab"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

// Set up listeners for the store
setupListeners(store.dispatch);

// Export the persistor
export const persistor = persistStore(store);

// Export actions from the slices (if needed elsewhere)
export * from "./slices/modalSlice";
export * from "./slices/imageSlice";
