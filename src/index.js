import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// import App1 from "./App1.jsx";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={6}>
      <BrowserRouter>
        <App />

        {/* <App1 /> */}
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
