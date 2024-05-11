//express
const express = require("express");
const route = express.Router();

//multer
const multer = require("multer");
const storage = require("../../util/multer");
const upload = multer({ storage });

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const NotificationController = require("./notification.controller");

//handle user notification
route.post("/userNotification", checkAccessWithSecretKey(), NotificationController.handleNotification);

//get notification list
route.get("/list", checkAccessWithSecretKey(), NotificationController.getNotificationList);

//send notification by admin
route.post("/send", checkAccessWithSecretKey(), upload.single("image"), NotificationController.sendNotifications);

module.exports = route;
