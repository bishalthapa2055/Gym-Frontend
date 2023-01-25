import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App1 from "./App1.jsx";
import App from "./App";
// import Redux from "./Redux";
// import store from "./store";
import { Provider } from "react-redux";
import { store } from "./store/index.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { QueryClientProvider, QueryClient } from "react-query";

// store.subscribe(() => console.log(store.getState()));

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={6}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* <App /> */}
                <App1 />
                {/* <Redux /> */}
              </LocalizationProvider>
            </MuiPickersUtilsProvider>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
