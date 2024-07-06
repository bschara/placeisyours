import React from "react";
import { NavLink } from "react-router-dom";
import "./adminNavbar.css";
import Logo from "../logo";

const AdminNavbar = () => {
  return (
    <nav className="adminNavbar">
      <div className="logo-image">
        <Logo />
      </div>
      <ul>
        <div className="linksPages">
          <li>
            <NavLink to="/dashboard" className="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminPostItems" className="active">
              Post Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/handleOrders" className="active">
              Handle Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminStore" className="active">
              Admin Store
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
