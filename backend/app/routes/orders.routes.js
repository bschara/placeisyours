module.exports = (app) => {
  const orders = require("../controllers/orders.controller");

  const router = require("express").Router();

  // Create a new Order
  router.post("/", orders.create);

  //get all orders (no conditions)
  router.get("/", orders.findAll);

  router.get("/orderByPhoneNumber", orders.findOrdersByPhoneNumber);

  router.get("/orderByFullName", orders.findOrdersByFullName);

  router.get("/orderByEmail", orders.findOrdersByEmail);

  router.get("/ordersPendingProcessing", orders.findOrdersPendingProcessing);

  router.get("/ordersPendingPayment", orders.findOrdersPendingPayment);

  router.put("/handlePendingPayment", orders.handlePendingPayment);

  router.put("/handlePendingProcessing", orders.handlePendingProcessing);

  router.put("/handleCancelOrder", orders.handleCancel);

  app.use("/api/orders", router);
};
