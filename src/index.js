import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/_store";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./_context/ThemeContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ThemeProvider>
          <Toaster />
          <App />
        </ThemeProvider>
      </Router>
    </PersistGate>
  </Provider>,
);
