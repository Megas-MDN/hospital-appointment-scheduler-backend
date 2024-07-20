import { ROOT_PATH } from "../utils/basePathHash.js";

export const notImplemented = (req, res) => {
  const { authorization } = req.headers;
  return res.status(501).send({
    message: "Route not implemented",
    url: req.url,
    method: req.method,
    authorization,
    root_options: ROOT_PATH,
  });
};
