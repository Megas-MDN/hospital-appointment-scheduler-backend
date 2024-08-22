import * as model from "../models/patient.models.js";
import * as handlerPassword from "../utils/handlePassword.js";
import { handlerToken } from "../utils/myJWT.js";
import { STATUS_CODE } from "../utils/StatusCode.js";
import { ERROR_MESSAGE } from "../utils/ErrorMessage.js";
import { validateData } from "../utils/validateData.js";

const patientSchema = {
  patient_name: "string",
  email: "string",
  password: "string",
};

export const findPatientByEmailService = async (email) => {
  return await model.findPatientByEmailModel(email);
};

export const findPatientByIdService = async (id) => {
  return await model.findPatientByIdModel(id);
};

export const createPatientService = async (data) => {
  const oldUser = await findPatientByEmailService(data.email);
  if (oldUser)
    return {
      error: true,
      message: ERROR_MESSAGE.USER_ALREADY_EXISTS,
      status: STATUS_CODE.BAD_REQUEST,
    };
  if (oldUser?.error) return oldUser;
  const isValid = validateData({
    data,
    schema: patientSchema,
  });
  if (isValid.error) return isValid;
  const { patient_name, email, password } = data;
  const hashPassword = await handlerPassword.genHashPassword(password);
  const user = await model.createPatientModel({
    patient_name,
    email,
    passwordHash: hashPassword,
  });
  const genToken = handlerToken();
  const token = genToken.encode({
    id_patient: user.id_patient,
    email,
    patient_name: user.patient_name,
  });
  delete user.password;
  return { token, user };
};

export const patientLoginService = async ({ email, password }) => {
  const isValid = validateData({
    data: { email, password },
    schema: { email: "string", password: "string" },
  });

  if (isValid.error) return isValid;
  const user = await model.findPatientByEmailWithPasswordModel(email);
  if (!user)
    return {
      error: true,
      status: STATUS_CODE.NOT_FOUND,
      message: ERROR_MESSAGE.USER_NOT_FOUND,
    };
  if (user?.error) return user;
  const match = await handlerPassword.compareHashPassword(
    password,
    user.password,
  );
  if (!match)
    return {
      error: true,
      status: STATUS_CODE.BAD_REQUEST,
      message: ERROR_MESSAGE.INVALID_PASSWORD_OR_EMAIL,
    };
  const genToken = handlerToken();
  const token = genToken.encode({
    id_patient: user.id_patient,
    email,
    patient_name: user.patient_name,
  });
  return { token };
};

export const patientUpdateService = async (data, userLogged) => {
  const { id_patient, patient_name, email, password } = data;
  const user = await model.findPatientByIdModel(id_patient);
  if (!user)
    return {
      error: true,
      status: STATUS_CODE.NOT_FOUND,
      message: ERROR_MESSAGE.USER_NOT_FOUND,
    };
  if (user.error) return user;
  if (userLogged?.id_patient !== user.id_patient)
    return {
      error: true,
      status: STATUS_CODE.FORBIDDEN,
      message: ERROR_MESSAGE.FORBIDDEN,
    };
  const isValid = validateData({
    data: { patient_name, email, password },
    schema: patientSchema,
    optional: { all: true },
  });
  if (isValid.error) return isValid;
  const hashPassword = password
    ? await handlerPassword.genHashPassword(password)
    : undefined;
  const response = await model.updatePatientModel({
    id_patient,
    patient_name: patient_name ?? user.patient_name,
    email: email ?? user.email,
    passwordHash: hashPassword,
  });
  if (response.error) return response;
  return response;
};

export const patientDeleteService = async (id, userLogged) => {
  const user = await model.findPatientByIdModel(id);
  if (!user)
    return {
      error: true,
      status: STATUS_CODE.NOT_FOUND,
      message: ERROR_MESSAGE.USER_NOT_FOUND,
    };
  if (user.error) return user;
  if (userLogged?.id_patient !== user.id_patient)
    return {
      error: true,
      status: STATUS_CODE.FORBIDDEN,
      message: ERROR_MESSAGE.FORBIDDEN,
    };
  const response = await model.deletePatientModel(id);
  if (response.error) return response;
  return response;
};

export const getAllPatientsService = async (filter) => {
  const response = await model.getAllPatientsModel(filter);
  if (response.error) return response;
  return response;
};
