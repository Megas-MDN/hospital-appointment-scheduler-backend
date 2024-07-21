import { Router } from "express";
import { loginRoutes } from "./login.routes.js";
import { homeRoutes } from "./home.routes.js";

export const routesApiV1 = Router();

routesApiV1.use(homeRoutes);
routesApiV1.use(loginRoutes);
