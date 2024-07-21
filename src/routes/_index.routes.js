import { Router } from "express";
import { logs } from "../middlewares/logs.js";
import { loginRoutes } from "./login.routes.js";
import { homeRoutes } from "./home.routes.js";

export const routes = Router();

routes.use(logs);
routes.use(homeRoutes);
routes.use(loginRoutes);
