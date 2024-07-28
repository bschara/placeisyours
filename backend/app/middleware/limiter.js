const rateLimit = require("express-rate-limit");

const createOrderLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // limit each IP to 3 requests per windowMs
  message: "You have made too many requests ",
  headers: true,
});
const addAnswerLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1, // limit each IP to 3 requests per windowMs
  message: "You have made too many requests ",
  headers: true,
});

module.exports = { createOrderLimiter, addAnswerLimit };
