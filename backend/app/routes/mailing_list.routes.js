module.exports = (app) => {
  const mailingList = require("../controllers/mailing_list.controller");

  const router = require("express").Router();

  router.post("/", mailingList.addEmail);

  router.get("/", mailingList.getAllEmails);

  router.delete("/", mailingList.removeEmail);

  app.use("/api/mailingList", router);
};
