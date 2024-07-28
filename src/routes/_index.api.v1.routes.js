import { Router } from "express";
import { doctorRoutes } from "./doctor.routes.js";
import { homeRoutes } from "./home.routes.js";
import { patientRoutes } from "./patient.routes.js";
import { availabilityRoutes } from "./availability.routes.js";

export const routesApiV1 = Router();

routesApiV1.use(doctorRoutes);
routesApiV1.use(patientRoutes);
routesApiV1.use(availabilityRoutes);
routesApiV1.use(homeRoutes);
