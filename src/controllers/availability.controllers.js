const service = require("../services/availability.services.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

const createAvailabilityController = async (req, res, next) => {
  const data = req.body;
  const response = await service.createAvailabilityService({
    ...data,
    id_doctor: req.user.id_doctor,
  });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.CREATED).json(response);
};

const updateAvailabilityController = async (req, res, next) => {
  const { id_availability } = req.params;
  const data = req.body;
  const response = await service.updateAvailabilityService(
    {
      ...data,
      id_availability: Number(id_availability),
    },
    req.user,
  );
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const deleteAvailabilityController = async (req, res, next) => {
  const { id_availability } = req.params;

  const response = await service.deleteAvailabilityService(
    Number(id_availability),
    req.user,
  );
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const getAllAvailabilitiesController = async (req, res, next) => {
  const { limit, page, specialty, doctor } = req.query;
  const filter = {
    limit,
    page,
    specialty: isNaN(+specialty) ? specialty : Number(specialty),
    doctor: isNaN(+doctor) ? doctor : Number(doctor),
  };
  const response = await service.getAllAvailabilitiesService(filter);
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

module.exports = {
  createAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
  getAllAvailabilitiesController,
};
