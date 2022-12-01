import React from "react";
import ReactDOM from "react-dom/client";
import MiniDrawer from "./Components/Dashboard/Dashboard";
// import Header from "./Components/Header/Header";
// import Homecomponent from "./Components/Homecomponent/Homecomponent";
// import PersistentDrawerLeft from "./Components/Dashboard/Dashbord.jsx";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Header /> */}
    <MiniDrawer />
    {/* <Homecomponent /> */}
  </React.StrictMode>
);
