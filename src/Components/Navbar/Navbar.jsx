import { BrowserRouter as Router, Link } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
const Navbar = () => {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
  }
  return (
    <>
      <React.StrictMode>
        <Header />
        <Router>
          <Link to={{ pathname: "/dashboard" }} onClick={refreshPage}>
            DASHBOARD
          </Link>
          <Link to={{ pathname: "/users" }} onClick={refreshPage}>
            USERS
          </Link>
          <Link to={{ pathname: "/memberships" }} onClick={() => refreshPage()}>
            MEMBERSHIPS
          </Link>

          {/* <a href="#">Link</a> */}
        </Router>
      </React.StrictMode>
    </>
  );
};

export default Navbar;
