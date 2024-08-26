const service = require("../services/appointment.services.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

const getNextAvailableAppointmentsController = async (req, res, next) => {
  const { specialty, doctor } = req.query;
  const response = await service.getNextAvailableAppointmentsService({
    specialty,
    doctor,
  });

  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const scheduleAppointmentByDoctorController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const user = req.user;
  const { symptoms } = req.body;
  const response = await service.scheduleAppointmentService({
    user,
    symptoms,
    doctor: Number(id_doctor),
  });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.CREATED).json(response);
};

const scheduleAppointmentBySpecialtyController = async (req, res, next) => {
  const { id_specialty } = req.params;
  const user = req.user;
  const { symptoms } = req.body;
  const response = await service.scheduleAppointmentService({
    user,
    symptoms,
    specialty: Number(id_specialty),
  });
  if (response?.error) return next(response);
  return res.status(STATUS_CODE.CREATED).json(response);
};

module.exports = {
  getNextAvailableAppointmentsController,
  scheduleAppointmentByDoctorController,
  scheduleAppointmentBySpecialtyController,
};
