const { Router } = require("express"); //const { Router } = require("express");
const controller = require("../controllers/redirect.controllers.js");

const BASE_PATH = "/";
const redirectRoutes = Router();

redirectRoutes.get(`${BASE_PATH}`, controller.redirectHomeController);

module.exports = { redirectRoutes };
