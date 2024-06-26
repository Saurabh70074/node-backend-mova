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
const EpisodeController = require("./episode.controller");

//create episode
route.post(
  "/create",
  checkAccessWithSecretKey(),
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  EpisodeController.store
);

//update episode
route.patch(
  "/update",
  checkAccessWithSecretKey(),
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  EpisodeController.update
);

//get all episode
route.get("/", checkAccessWithSecretKey(), EpisodeController.get);

//delete episode
route.delete("/delete", checkAccessWithSecretKey(), EpisodeController.destroy);

//get season wise episode for admin panel
route.get("/seasonWiseEpisode", checkAccessWithSecretKey(), EpisodeController.seasonWiseEpisode);

//get season wise episode for android
route.get("/seasonWiseEpisodeAndroid", checkAccessWithSecretKey(), EpisodeController.seasonWiseEpisodeAndroid);

//get movie only if category web series
route.get("/series", checkAccessWithSecretKey(), EpisodeController.getSeries);

module.exports = route;
