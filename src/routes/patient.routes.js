const { Router } = require("express");
const controller = require("../controllers/patient.controllers.js");
const { ROOT_PATH } = require("../utils/basePathHash.js");
const { auth } = require("../middlewares/auth.js");

const BASE_PATH = ROOT_PATH.PATIENT;
const patientRoutes = Router();

patientRoutes.get(`${BASE_PATH}`, auth, controller.getAllPatientsController);
patientRoutes.get(
  `${BASE_PATH}/:id_patient`,
  auth,
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

module.exports = { patientRoutes };
