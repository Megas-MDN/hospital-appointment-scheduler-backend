import { Router } from "express";
import * as controller from "../controllers/availability.controllers.js";
import { ROOT_PATH } from "../utils/basePathHash.js";
import { auth } from "../middlewares/auth.js";

const BASE_PATH = ROOT_PATH.AVAILABILITY;
export const availabilityRoutes = Router();

availabilityRoutes.get(
  `${BASE_PATH}`,
  controller.getAllAvailabilitiesController,
);

availabilityRoutes.post(
  `${BASE_PATH}`,
  auth,
  controller.createAvailabilityController,
);

availabilityRoutes.patch(
  `${BASE_PATH}/:id_availability`,
  auth,
  controller.updateAvailabilityController,
);

availabilityRoutes.delete(
  `${BASE_PATH}/:id_availability`,
  auth,
  controller.deleteAvailabilityController,
);
