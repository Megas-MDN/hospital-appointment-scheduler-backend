const { ERROR_MESSAGE } = require("../utils/ErrorMessage.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, _req, res, _next) => {
  const status = err.status || STATUS_CODE.SERVER_ERROR;
  const message = err.message || ERROR_MESSAGE.SERVER_ERROR;
  return res.status(status).json({ message });
};

module.exports = { errorHandler };
