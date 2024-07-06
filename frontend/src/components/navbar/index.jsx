import React from "react";
import { NavLink } from "react-router-dom";
import "./customerNavbar.css";
import Logo from "../logo";
import CartIcon from "../../pages/customers/checkout/cart";

const CustomerNavbar = () => {
  return (
    <nav className="customerNavbar">
      <div className="logo-image">
        <Logo />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="active">
            Home Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/customersStore" className="active">
            Store
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutPage" className="active">
            About
          </NavLink>
        </li>
      </ul>
      <div className="cart-icon">
        <CartIcon />
      </div>
    </nav>
  );
};

export default CustomerNavbar;
