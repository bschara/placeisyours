import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemExists = cart.some((cartItem) => cartItem.id === item.ID);

    if (itemExists) {
      alert("Item is already in the cart");
    } else {
      const cartItem = {
        id: item.ID,
        itemName: item.itemName,
        price: item.price,
        image: item.mainImage,
      };
      setCart([...cart, cartItem]);
      alert("item added to cart ");
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
