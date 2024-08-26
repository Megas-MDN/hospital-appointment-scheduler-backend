const { Router } = require("express");
const { ROOT_PATH } = require("../utils/basePathHash.js");
const controller = require("../controllers/login.controllers.js");

const BASE_PATH = ROOT_PATH.LOGIN;
const loginRoutes = Router();

loginRoutes.get(`${BASE_PATH}`, controller.homeLoginController);

loginRoutes.post(`${BASE_PATH}`, controller.goLoginController);

module.exports = { loginRoutes };
