import { API_VERSION } from "../utils/apiVersionsEnpoint.js";

export const redirectHomeController = (_req, res) => {
  return res.redirect(API_VERSION.MAIN);
};
