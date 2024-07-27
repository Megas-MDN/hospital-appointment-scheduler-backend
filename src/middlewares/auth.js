import { handlerToken } from "../utils/myJWT.js";
import { ERROR_MESSAGE } from "../utils/ErrorMessage.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

export const auth = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return next({
      error: true,
      status: STATUS_CODE.UNAUTHORIZED,
      message: ERROR_MESSAGE.UNAUTHORIZED,
    });

  const token = authorization.split(" ")[1];
  if (!token) return next({ error: true, message: ERROR_MESSAGE.UNAUTHORIZED });

  const genToken = handlerToken();
  const user = genToken.decode(token);
  if (!user) return next({ error: true, message: ERROR_MESSAGE.UNAUTHORIZED });

  req.user = user;
  next();
};
