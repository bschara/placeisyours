import React from "react";
import { NavLink } from "react-router-dom";
import "./customerNavbar.css";
import Logo from "../logo";
import CartIcon from "../../pages/customers/checkout/cart";

const CustomerNavbar = () => {
  return (
    <nav className="customerNavbar">
      <div className="logo-image">
        <NavLink to="/drops_page" className="active">
          <Logo />
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="active">
            Home
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
        <li>
          <NavLink to="/dreamPage" className="active">
            ?
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
