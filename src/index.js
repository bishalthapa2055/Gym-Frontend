import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App1 from "./App1.jsx";
import App from "./App";
import Redux from "./Redux";
import store from "./store";
import { Provider } from "react-redux";

store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={6}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          {/* <App1 /> */}
          {/* <Redux /> */}
        </Provider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
