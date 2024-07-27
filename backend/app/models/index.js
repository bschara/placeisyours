const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model.js")(mongoose);
db.orders = require("./orders.model.js")(mongoose);
db.items = require("./items.model.js")(mongoose);
db.mailing_list = require("./mailingList.model.js")(mongoose);
db.sItem = require("./sItem.model.js")(mongoose);
db.specialOrder = require("./specialOrders.model.js");

module.exports = db;
