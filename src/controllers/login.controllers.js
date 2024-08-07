import * as service from "../services/login.services.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

export const homeLoginController = (_req, res) => {
  const home = service.homeLoginService();

  return res.sendFile(home.home, home.root);
};

export const goLoginController = async (req, res, next) => {
  const { userEmail, password } = req.body;
  const userToken = await service.goLoginService({ userEmail, password });
  if (userToken.error) return next(userToken);

  return res.status(STATUS_CODE.OK).json(userToken);
};
