import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./specialCheckout.css";

const SpecialCheckoutPage = () => {
  const location = useLocation();
  const [buyerPhoneNumber, setPhoneNumber] = useState("");
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");
  const [item, setItem] = useState(null);
  const [cost, setCost] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const delivery = "*delivery is calculated based on location";

  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get("items");
  const size = queryParams.get("size");

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const response = await axios.get(
            `http://192.168.1.9:8081/api/items/findSpecialItemById/${itemId}`
          );
          console.log(response.data);
          setItem(response.data);
          setCost(response.data.price);
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      }
    };

    fetchItem();
  }, [itemId]);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    if (item) {
      try {
        await axios.post(`http://192.168.1.9:8081/api/orders/specialOrder`, {
          itemName: item.itemName,
          category: item.category,
          mainImage: item.mainImage,
          buyerEmail: buyerEmail,
          buyerPhoneNumber: buyerPhoneNumber,
          buyerFullName: buyerFullName,
          buyerLocation: buyerLocation,
          itemPrice: item.price,
          itemID: item.ID,
          itemSize: size,
          recaptchaToken: recaptchaToken,
        });

        alert("Thank you for your order!");
      } catch (error) {
        console.error("Error during checkout process:", error);
        alert("There was an error processing your order. Please try again.");
      }
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        {item && (
          <div className="item">
            <img src={item.mainImageUrl} alt={item.itemName} />
          </div>
        )}
        <div className="input-fields">
          <p>
            {" "}
            ${cost}, {size}
          </p>
          <div className="delivery-text">
            <p>{delivery}</p>
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

export default SpecialCheckoutPage;
