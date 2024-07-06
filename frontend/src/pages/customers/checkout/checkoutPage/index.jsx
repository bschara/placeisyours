import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../cart/cartContext";
import axios from "axios";
import "./checkoutPage.css";

const CheckoutPage = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [buyerPhoneNumber, setPhoneNumber] = useState("");
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [items, setItems] = useState([]);
  const [cost, setCost] = useState(0);

  const queryParams = new URLSearchParams(location.search);
  const itemIdsFromURL = queryParams.has("items")
    ? queryParams.get("items").split(",")
    : [];

  const itemIdsFromCart = cart.map((item) => item.id);

  const allItemIds = [...new Set([...itemIdsFromURL, ...itemIdsFromCart])];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await Promise.all(
          allItemIds.map(async (itemId) => {
            const response = await axios.get(
              `http://192.168.1.9:8081/api/items/itemById/`,
              {
                params: { id: itemId },
              }
            );
            return response.data;
          })
        );
        setItems(fetchedItems);
        const totalCost = fetchedItems.reduce(
          (acc, item) => acc + item.price,
          0
        );
        setCost(totalCost);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        items.map(async (item) => {
          console.log(item.ID);
          await axios.put(
            "http://192.168.1.9:8081/api/items/updateItemStatus",
            null,
            {
              params: { id: item.ID },
            }
          );

          await axios.post(`http://192.168.1.9:8081/api/orders`, {
            itemName: item.itemName,
            category: item.category,
            mainImage: item.mainImage,
            buyerEmail: buyerEmail,
            buyerPhoneNumber: buyerPhoneNumber,
            buyerFullName: buyerFullName,
            itemPrice: item.price,
            itemID: item.ID,
          });
        })
      );

      alert("Order successfully placed!");
    } catch (error) {
      console.error("Error during checkout process:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="items">
          <ul>
            {items.map((item) => {
              const filePath = item.mainImage;
              const pathComponents = filePath.split("\\");
              const fileName = pathComponents[pathComponents.length - 1];
              return (
                <li key={item.id}>
                  <img
                    src={`http://192.168.1.9:8081/${fileName}`}
                    alt={item.name}
                  />
                  <p>
                    {item.size}, ${item.price}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="input-fields">
          <h1>Checkout</h1>
          <p>Total Cost: ${cost}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={buyerFullName}
                onChange={(e) => setBuyerFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={buyerFullName}
                onChange={(e) => setBuyerFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={buyerPhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email (optional)</label>
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
