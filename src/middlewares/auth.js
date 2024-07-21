import { handlerToken } from "../utils/myJWT.js";

export const auth = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return next({ error: true, status: 401, message: "Unauthorized" });

  const token = authorization.split(" ")[1];
  if (!token)
    return next({ error: true, status: 401, message: "Unauthorized" });

  const genToken = handlerToken();
  const user = genToken.decode(token);
  if (!user) return next({ error: true, status: 401, message: "Unauthorized" });
  req.user = user;
  next();
};
