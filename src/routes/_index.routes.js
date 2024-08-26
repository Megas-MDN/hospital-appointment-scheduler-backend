const { Router } = require("express");
const { redirectRoutes } = require("./redirect.routes.js");

const routes = Router();

routes.use(redirectRoutes);

module.exports = { routes };
