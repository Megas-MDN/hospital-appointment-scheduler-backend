const { Router } = require("express");
const { doctorRoutes } = require("./doctor.routes.js");
const { patientRoutes } = require("./patient.routes.js");
const { availabilityRoutes } = require("./availability.routes.js");
const { appointmentRoutes } = require("./appointment.routes.js");

const routesApiV1 = Router();

routesApiV1.use(doctorRoutes);
routesApiV1.use(patientRoutes);
routesApiV1.use(availabilityRoutes);
routesApiV1.use(appointmentRoutes);

module.exports = { routesApiV1 };
