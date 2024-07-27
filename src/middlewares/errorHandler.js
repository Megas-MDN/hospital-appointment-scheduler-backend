import { ERROR_MESSAGE } from "../utils/ErrorMessage.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || STATUS_CODE.SERVER_ERROR;
  const message = err.message || ERROR_MESSAGE.SERVER_ERROR;
  return res.status(status).json({ message });
};
