import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Homecomponent.css";
// import { StyledComponent } from "styled-components";

const Homecomponent = () => {
  return (
    <>
      <div className="sidenav">
        {/* <Sidenav> */}
        <Navbar />
        {/* </Sidenav> */}
      </div>

      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element="" />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/trading" element={<Formcomponent2 />} /> */}
            {/* <Route path="/aboddddutme" element={<About />} /> */}
            {/* <Route path="/details" element={<Displaycomponent2 />} /> */}
            {/* <Route path="/proloss" element={<Card />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default Homecomponent;
