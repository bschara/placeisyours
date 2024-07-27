module.exports = (app) => {
  const users = require("../controllers/users.controller");

  const router = require("express").Router();

  router.post("/", users.create);

  router.post("/login", users.login);

  app.use("/api/users", router);
};
