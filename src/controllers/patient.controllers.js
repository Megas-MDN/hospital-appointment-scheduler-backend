import * as service from "../services/patient.services.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

export const createPatientController = async (req, res, next) => {
  const data = req.body;
  const response = await service.createPatientService(data);
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const patientLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await service.patientLoginService({ email, password });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const patientUpdateController = async (req, res, next) => {
  const data = req.body;
  const { id_patient } = req.params;
  const user = req.user;
  const response = await service.patientUpdateService(
    { ...data, id_patient },
    user,
  );
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const patientDeleteController = async (req, res, next) => {
  const { id_patient } = req.params;
  const user = req.user;
  const response = await service.patientDeleteService(id_patient, user);
  if (response?.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const getAllPatientsController = async (req, res, next) => {
  const { limit, page, search } = req.query;
  const response = await service.getAllPatientsService({ limit, page, search });
  if (response.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};

export const findPatientByIdController = async (req, res, next) => {
  const { id_patient } = req.params;
  const response = await service.findPatientByIdService(id_patient);
  if (response?.error) return next(response);
  return res.status(STATUS_CODE.OK).json(response);
};
