import { Router } from "express";
import { logs } from "../middlewares/logs.js";
import { loginRoutes } from "./login.routes.js";

export const routes = Router();

routes.use(logs);
routes.get("/", (_req, res) => {
  return res.sendFile("home.html", { root: "public" });
});

routes.use(loginRoutes);
