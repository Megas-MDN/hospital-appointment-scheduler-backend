import { Router } from "express";
import * as controller from "../controllers/doctor.controllers.js";
import { ROOT_PATH } from "../utils/basePathHash.js";
import { auth } from "../middlewares/auth.js";

const BASE_PATH = ROOT_PATH.DOCTOR;
export const doctorRoutes = Router();

doctorRoutes.get(`${BASE_PATH}`, controller.getAllDoctorsController);
doctorRoutes.get(
  `${BASE_PATH}/:id_doctor`,
  controller.findDoctorByIdController,
);
doctorRoutes.patch(
  `${BASE_PATH}/:id_doctor`,
  auth,
  controller.doctorUpdateController,
);
doctorRoutes.delete(
  `${BASE_PATH}/:id_doctor`,
  auth,
  controller.doctorDeleteController,
);
doctorRoutes.post(`${BASE_PATH}/login`, controller.doctorLoginController);
doctorRoutes.post(`${BASE_PATH}`, controller.createDoctorController);
