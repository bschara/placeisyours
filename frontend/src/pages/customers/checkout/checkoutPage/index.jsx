import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../cart/cartContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./checkoutPage.css";

const CheckoutPage = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [buyerPhoneNumber, setPhoneNumber] = useState("");
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");
  const [items, setItems] = useState([]);
  const [cost, setCost] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const deleviry = 3;

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
              `http://192.168.1.9:8081/api/items/itemById/${itemId}`
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

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      await Promise.all(
        items.map(async (item) => {
          console.log(item.ID);
          await axios.post(`http://192.168.1.9:8081/api/orders`, {
            itemName: item.itemName,
            category: item.category,
            mainImage: item.mainImage,
            buyerEmail: buyerEmail,
            buyerPhoneNumber: buyerPhoneNumber,
            buyerFullName: buyerFullName,
            buyerLocation: buyerLocation,
            itemPrice: item.price,
            itemID: item.ID,
            recaptchaToken: recaptchaToken,
          });
        })
      );

      alert("Thank you for your order!");
    } catch (error) {
      console.error("Error during checkout process:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="items">
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.mainImageUrl} alt={item.name} />
                  <p>
                    {item.size}, ${item.price}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="input-fields">
          <p>Total: ${cost + deleviry}</p>
          <div className="delivery-text">
            <p>*including delivery</p>
          </div>
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
                value={buyerLocation}
                onChange={(e) => setBuyerLocation(e.target.value)}
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
            <div className="form-group">
              <ReCAPTCHA
                sitekey="6Ld5IhYqAAAAAGn702U3hBmnURZNaxX2mOmBq6zE"
                onChange={handleRecaptchaChange}
              />
            </div>
            <button type="submit" className="submit-button">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
