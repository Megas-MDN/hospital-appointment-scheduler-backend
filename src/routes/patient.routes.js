import { Router } from "express";
import * as controller from "../controllers/patient.controllers.js";
import { ROOT_PATH } from "../utils/basePathHash.js";
import { auth } from "../middlewares/auth.js";

const BASE_PATH = ROOT_PATH.PATIENT;
export const patientRoutes = Router();

patientRoutes.get(`${BASE_PATH}`, controller.getAllPatientsController);
patientRoutes.get(
  `${BASE_PATH}/:id_patient`,
  controller.findPatientByIdController,
);
patientRoutes.patch(
  `${BASE_PATH}/:id_patient`,
  auth,
  controller.patientUpdateController,
);
patientRoutes.delete(
  `${BASE_PATH}/:id_patient`,
  auth,
  controller.patientDeleteController,
);
patientRoutes.post(`${BASE_PATH}/login`, controller.patientLoginController);
patientRoutes.post(`${BASE_PATH}`, controller.createPatientController);
