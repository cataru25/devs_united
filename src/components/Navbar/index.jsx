import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-buttons">
      {/* <Link className="navbar-brand" to="/"></Link> */}
      <NavLink to="/user" exact>
        USERNAME
      </NavLink>
      <NavLink to="/" exact>
        <div className="logout-logo">LOGOUT</div>
      </NavLink>
    </div>
  );
};

export default Navbar;
