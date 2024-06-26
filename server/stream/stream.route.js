//express
const express = require("express");
const route = express.Router();

//multer
const multer = require("multer");
const storage = require("../../util/multer");
const upload = multer({ storage });

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//Controller
const streamController = require("./stream.controller");

//create channel by admin if isIptvAPI switch on (true)
route.post("/create", checkAccessWithSecretKey(), streamController.Store);

//create manual channel by admin
route.post("/manualCreate", checkAccessWithSecretKey(), upload.single("channelLogo"), streamController.manualStore);

//get channel related data added by admin if isIptvAPI switch on (true)
route.get("/", checkAccessWithSecretKey(), streamController.get);

//update channel
route.patch("/update", checkAccessWithSecretKey(), upload.single("channelLogo"), streamController.update);

//delete channel
route.delete("/delete", checkAccessWithSecretKey(), streamController.destroy);

module.exports = route;
