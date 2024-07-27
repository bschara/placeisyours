require("dotenv").config();
const axios = require("axios");
const RECAPTCHA_SECRET_KEY = process.env.RECAP_KEY;

const verifyRecaptcha = async (token) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

module.exports = {
  verifyRecaptcha,
};
