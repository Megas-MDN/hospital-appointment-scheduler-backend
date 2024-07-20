import { Router } from "express";
import { ROOT_PATH } from "../utils/basePathHash.js";
import * as controller from "../controllers/login.controllers.js";

const BASE_PATH = ROOT_PATH.LOGIN;
export const loginRoutes = Router();

loginRoutes.get(`${BASE_PATH}`, controller.homeLoginController);

loginRoutes.post(`${BASE_PATH}`, controller.goLoginController);
