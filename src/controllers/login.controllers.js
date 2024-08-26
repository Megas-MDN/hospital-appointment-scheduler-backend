const service = require("../services/login.services.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

const homeLoginController = (_req, res) => {
  const home = service.homeLoginService();

  return res.sendFile(home.home, home.root);
};

const goLoginController = async (req, res, next) => {
  const { userEmail, password } = req.body;
  const userToken = await service.goLoginService({ userEmail, password });
  if (userToken.error) return next(userToken);

  return res.status(STATUS_CODE.OK).json(userToken);
};

module.exports = { homeLoginController, goLoginController };
