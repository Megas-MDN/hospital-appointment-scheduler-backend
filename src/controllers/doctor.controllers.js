const service = require("../services/doctor.services.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");

const createDoctorController = async (req, res, next) => {
  const data = req.body;
  const response = await service.createDoctorService(data);
  if (response.error) return next(response);
  return res.status(STATUS_CODE.CREATED).json(response);
};

const doctorLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await service.doctorLoginService({ email, password });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const doctorUpdateController = async (req, res, next) => {
  const data = req.body;
  const { id_doctor } = req.params;
  const user = req.user;
  const response = await service.doctorUpdateService(
    { ...data, id_doctor },
    user,
  );
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const doctorDeleteController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const user = req.user;
  const response = await service.doctorDeleteService(id_doctor, user);
  if (response?.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const getAllDoctorsController = async (req, res, next) => {
  const { limit, page, search } = req.query;
  const response = await service.getAllDoctorsService({ limit, page, search });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

const findDoctorByIdController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const response = await service.findDoctorByIdService(id_doctor);
  if (response?.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

module.exports = {
  createDoctorController,
  doctorLoginController,
  doctorUpdateController,
  doctorDeleteController,
  getAllDoctorsController,
  findDoctorByIdController,
};
