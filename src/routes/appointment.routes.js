import { Router } from "express";
import * as controller from "../controllers/appointment.controllers.js";
import { ROOT_PATH } from "../utils/basePathHash.js";
import { auth } from "../middlewares/auth.js";

const BASE_PATH = ROOT_PATH.APPOINTMENT;
export const appointmentRoutes = Router();

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
