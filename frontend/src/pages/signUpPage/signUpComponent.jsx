import React, { useState } from "react";
import "./SignUpComponent.css"; // Importing CSS file for styling
import axios from "axios";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.9:8081/api/users/",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="whole-page">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
