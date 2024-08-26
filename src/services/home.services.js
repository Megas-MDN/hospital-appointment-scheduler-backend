const model = require("../models/home.models.js");

const homeService = () => {
  return model.homeModel();
};

module.exports = { homeService };
