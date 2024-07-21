import { Router } from "express";
import { redirectRoutes } from "./redirect.routes.js";

export const routes = Router();

routes.use(redirectRoutes);
