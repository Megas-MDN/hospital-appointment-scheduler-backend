const { handlerToken } = require("../utils/myJWT.js");
const { ERROR_MESSAGE } = require("../utils/ErrorMessage.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

const auth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return next({
      error: true,
      status: STATUS_CODE.UNAUTHORIZED,
      message: ERROR_MESSAGE.UNAUTHORIZED,
    });

  const token = authorization.split(" ")[1];
  if (!token)
    return next({
      error: true,
      message: ERROR_MESSAGE.UNAUTHORIZED,
      status: STATUS_CODE.UNAUTHORIZED,
    });

  const genToken = handlerToken();
  const user = genToken.decode(token);
  if (!user)
    return next({
      error: true,
      message: ERROR_MESSAGE.UNAUTHORIZED,
      status: STATUS_CODE.UNAUTHORIZED,
    });

  req.user = user;
  next();
};

module.exports = { auth };
