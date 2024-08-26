const { Router } = require("express");

const controller = require("../controllers/home.controllers.js");

const BASE_PATH = "/";
const homeRoutes = Router();

homeRoutes.get(`${BASE_PATH}`, controller.homeController);

module.exports = { homeRoutes };
