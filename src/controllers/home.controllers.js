import * as service from "../services/home.services.js";

export const homeController = (_req, res) => {
  const home = service.homeService();

  return res.sendFile(home.home, home.root);
};
