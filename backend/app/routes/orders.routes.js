const { createOrderLimiter } = require("../middleware/limiter");
const verifyToken = require("../middleware/token-middlware");

module.exports = (app) => {
  const orders = require("../controllers/orders.controller");

  const router = require("express").Router();

  router.post("/", createOrderLimiter, orders.create);

  router.post("/specialOrder", createOrderLimiter, orders.createSpecialItem);

  router.get("/", verifyToken, orders.findAll);

  router.get(
    "/orderByPhoneNumber",
    verifyToken,
    orders.findOrdersByPhoneNumber
  );

  router.get("/orderByFullName", verifyToken, orders.findOrdersByFullName);

  router.get("/orderByEmail", verifyToken, orders.findOrdersByEmail);

  router.get(
    "/ordersPendingProcessing",
    verifyToken,
    orders.findOrdersPendingProcessing
  );

  router.get(
    "/ordersPendingPayment",
    verifyToken,
    orders.findOrdersPendingPayment
  );

  router.get(
    "/specialOrdersPendingProcessing",
    verifyToken,
    orders.findSpecialOrdersPendingProcessing
  );

  router.get(
    "/specialOrdersPendingPayment",
    verifyToken,
    orders.findSpecialOrdersPendingPayment
  );

  router.put("/handlePendingPayment", verifyToken, orders.handlePendingPayment);

  router.put(
    "/handlePendingProcessing",
    verifyToken,
    orders.handlePendingProcessing
  );

  router.put(
    "/handleSpecialPendingPayment",
    verifyToken,
    orders.handleSpecialPendingPayment
  );

  router.put(
    "/handleSpecialPendingProcessing",
    verifyToken,
    orders.handleSpecialPendingProcessing
  );

  router.put("/handleCancelOrder", verifyToken, orders.handleCancel);

  router.put(
    "/handleSpecialCancelOrder",
    verifyToken,
    orders.handleSpecialCancel
  );

  app.use("/api/orders", router);
};
