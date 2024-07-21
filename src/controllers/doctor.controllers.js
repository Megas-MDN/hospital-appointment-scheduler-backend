import * as service from "../services/doctor.services.js";

export const createDoctorController = async (req, res, next) => {
  const data = req.body;
  const response = await service.createDoctorService(data);
  if (response.error) return next(response);
  res.status(201).json(response);
};

export const doctorLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await service.doctorLoginService({ email, password });
  if (response.error) return next(response);
  res.status(200).json(response);
};

export const doctorUpdateController = async (req, res, next) => {
  const data = req.body;
  const { id_doctor } = req.params;
  const user = req.user;
  const response = await service.doctorUpdateService(
    { ...data, id_doctor },
    user,
  );
  if (response.error) return next(response);
  res.status(200).json(response);
};

export const doctorDeleteController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const user = req.user;
  const response = await service.doctorDeleteService(id_doctor, user);
  if (response?.error) return next(response);
  res.status(200).json(response);
};

export const getAllDoctorsController = async (req, res, next) => {
  const { limit, page, search } = req.query;
  const response = await service.getAllDoctorsService({ limit, page, search });
  if (response.error) return next(response);
  res.status(200).json(response);
};

export const findDoctorByIdController = async (req, res, next) => {
  const { id_doctor } = req.params;
  const response = await service.findDoctorByIdService(id_doctor);
  if (response.error) return next(response);
  res.status(200).json(response);
};
