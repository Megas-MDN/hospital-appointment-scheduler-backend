import { Router } from "express";
import * as controller from "../controllers/redirect.controllers.js";

const BASE_PATH = "/";
export const redirectRoutes = Router();

redirectRoutes.get(`${BASE_PATH}`, controller.redirectHomeController);
