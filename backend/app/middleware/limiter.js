const rateLimit = require("express-rate-limit");

const createOrderLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // limit each IP to 3 requests per windowMs
  message: "You have made too many requests ",
  headers: true,
});

module.exports = createOrderLimiter;
