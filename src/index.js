import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App1 from "./App1.jsx";

// import Example from "./Components/CRUD/Crud.jsx";
// import Slider from "./Components/Slider/Slider.jsx";
// import DashboardContent from "./Components/Home";
// import Header from "./Components/User/Userheader/index.jsx";
// import DataTable from "./Components/Users/Users.jsx";
// import Userstable from "./Components/Users/Userstable.jsx";
// import Header from "./Components/Header/Header";
// import Homecomponent from "./Components/Homecomponent/Homecomponent";
// import PersistentDrawerLeft from "./Components/Dashboard/Dashbord.jsx";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      {/* <Slider /> */}
      {/* <DashboardContent /> */}
      {/* <Header /> */}
      {/* <DataTable /> */}
      {/* <Userstable /> */}
      {/* <Example /> */}
      <App1 />
      {/* <BasicExample /> */}
    </BrowserRouter>
  </React.StrictMode>
);
