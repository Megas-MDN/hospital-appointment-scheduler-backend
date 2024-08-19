import * as service from "../services/appointment.services.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

export const getNextAvailableAppointmentsController = async (
  req,
  res,
  next,
) => {
  const { specialty, doctor } = req.query;
  const response = await service.getNextAvailableAppointmentsService({
    specialty,
    doctor,
  });

  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const scheduleAppointmentByDoctorController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const user = req.user;
  const { symptoms } = req.body;
  const response = await service.scheduleAppointmentService({
    user,
    symptoms,
    doctor: Number(id_doctor),
  });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const scheduleAppointmentBySpecialtyController = async (
  req,
  res,
  next,
) => {
  const { id_specialty } = req.params;
  const user = req.user;
  const { symptoms } = req.body;
  const response = await service.scheduleAppointmentService({
    user,
    symptoms,
    specialty: Number(id_specialty),
  });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};
