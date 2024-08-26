const { Router } = require("express");
const controller = require("../controllers/doctor.controllers.js");
const { ROOT_PATH } = require("../utils/basePathHash.js");
const { auth } = require("../middlewares/auth.js");

const BASE_PATH = ROOT_PATH.DOCTOR;
const doctorRoutes = Router();

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

module.exports = { doctorRoutes };
