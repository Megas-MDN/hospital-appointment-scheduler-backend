const { Router } = require("express");
const controller = require("../controllers/appointment.controllers.js");
const { ROOT_PATH } = require("../utils/basePathHash.js");
const { auth } = require("../middlewares/auth.js");

const BASE_PATH = ROOT_PATH.APPOINTMENT;
const appointmentRoutes = Router();

appointmentRoutes.get(
  `${BASE_PATH}`,
  controller.getNextAvailableAppointmentsController,
);

appointmentRoutes.post(
  `${BASE_PATH}/doctor/:id_doctor`,
  auth,
  controller.scheduleAppointmentByDoctorController,
);

appointmentRoutes.post(
  `${BASE_PATH}/specialty/:id_specialty`,
  auth,
  controller.scheduleAppointmentBySpecialtyController,
);

module.exports = { appointmentRoutes };
