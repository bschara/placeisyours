import React, { useState } from "react";
import { useCart } from "./cartContext/index";
import "./cartIcon.css";
import { useNavigate } from "react-router-dom";
import CartImg from "../../../../components/cart";

const CartIcon = () => {
  const { cart, removeFromCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-icon" onClick={toggleDropdown}>
      <CartImg /> {/* Icon displayed here */}
      <span className="item-count">{cart.length}</span>{" "}
      {/* Item count displayed here */}
      {showDropdown && (
        <div className="cart-dropdown">
          {cart.map((item) => {
            return (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.itemName} />
                {/* <span>{item.itemName}</span> */}
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            );
          })}
          <div className="check-button">
            {cart.length > 0 && (
              <button onClick={goToCheckout}>Go to Checkout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
