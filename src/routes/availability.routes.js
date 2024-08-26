const { Router } = require("express");
const controller = require("../controllers/availability.controllers.js");
const { ROOT_PATH } = require("../utils/basePathHash.js");
const { auth } = require("../middlewares/auth.js");

const BASE_PATH = ROOT_PATH.AVAILABILITY;
const availabilityRoutes = Router();

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

module.exports = { availabilityRoutes };
