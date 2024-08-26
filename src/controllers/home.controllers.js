const service = require("../services/home.services.js");

const homeController = (_req, res) => {
  const home = service.homeService();

  return res.sendFile(home.home, home.root);
};

module.exports = { homeController };
