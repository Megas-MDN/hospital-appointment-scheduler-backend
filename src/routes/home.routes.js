import { Router } from "express";

import * as controller from "../controllers/home.controllers.js";

const BASE_PATH = "/";
export const homeRoutes = Router();

homeRoutes.get(`${BASE_PATH}`, controller.homeController);
