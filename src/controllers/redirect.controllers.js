const { API_VERSION } = require("../utils/apiVersionsEnpoint.js");

const redirectHomeController = (_req, res) => {
  return res.redirect(API_VERSION.MAIN);
};

module.exports = { redirectHomeController };
