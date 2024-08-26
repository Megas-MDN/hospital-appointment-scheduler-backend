const model = require("../models/doctor.models.js");
const modelSpecialty = require("../models/specialty.models.js");
const handlerPassword = require("../utils/handlePassword.js");
const { handlerToken } = require("../utils/myJWT.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");
const { ERROR_MESSAGE } = require("../utils/ErrorMessage.js");
const { validateData } = require("../utils/validateData.js");

const doctorSchema = {
  doctor_name: "string",
  id_specialty: "number",
  email: "string",
  password: "string",
};

const findDoctorByEmailService = async (email) => {
  return await model.findDoctorByEmailModel(email);
};

const findDoctorByIdService = async (id) => {
  return await model.findDoctorByIdModel(id);
};

const createDoctorService = async (data) => {
  const oldUser = await findDoctorByEmailService(data.email);
  if (oldUser)
    return {
      error: true,
      message: ERROR_MESSAGE.USER_ALREADY_EXISTS,
      status: STATUS_CODE.BAD_REQUEST,
    };
  if (oldUser?.error) return oldUser;
  const isValid = validateData({
    data,
    schema: doctorSchema,
  });
  if (isValid.error) return isValid;
  const specialty = await modelSpecialty.findSpecialtyByIdModel(
    data.id_specialty,
  );
  if (!specialty)
    return {
      error: true,
      message: ERROR_MESSAGE.SPECIALTY_NOT_FOUND,
      status: STATUS_CODE.NOT_FOUND,
    };
  if (specialty?.error) return specialty;
  const { doctor_name, id_specialty, email, password } = data;
  const hashPassword = await handlerPassword.genHashPassword(password);
  const user = await model.createDoctorModel({
    doctor_name,
    id_specialty,
    email,
    passwordHash: hashPassword,
  });
  const genToken = handlerToken();
  const token = genToken.encode({ id_doctor: user.id_doctor, email });
  delete user.password;
  return { token, user };
};

const doctorLoginService = async ({ email, password }) => {
  const isValid = validateData({
    data: { email, password },
    schema: { email: "string", password: "string" },
  });

  if (isValid.error) return isValid;
  const user = await model.findDoctorByEmailWithPasswordModel(email);
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
  const token = genToken.encode({ id_doctor: user.id_doctor, email });
  return { token };
};

const doctorUpdateService = async (data, userLogged) => {
  const { id_doctor, doctor_name, id_specialty, email, password } = data;
  const user = await model.findDoctorByIdModel(id_doctor);
  if (!user)
    return {
      error: true,
      status: STATUS_CODE.NOT_FOUND,
      message: ERROR_MESSAGE.USER_NOT_FOUND,
    };
  if (user.error) return user;
  if (userLogged?.id_doctor !== user.id_doctor)
    return { error: true, status: STATUS_CODE.FORBIDDEN, message: "Forbidden" };
  const isValid = validateData({
    data: { doctor_name, id_specialty, email, password },
    schema: doctorSchema,
    optional: { all: true },
  });
  if (isValid.error) return isValid;
  if (id_specialty) {
    const specialty = await modelSpecialty.findSpecialtyByIdModel(id_specialty);
    if (specialty?.error) return specialty;
    if (!specialty)
      return {
        error: true,
        message: ERROR_MESSAGE.SPECIALTY_NOT_FOUND,
        status: STATUS_CODE.NOT_FOUND,
      };
  }
  const hashPassword = password
    ? await handlerPassword.genHashPassword(password)
    : undefined;
  const response = await model.updateDoctorModel({
    id_doctor,
    doctor_name: doctor_name ?? user.doctor_name,
    id_specialty: id_specialty ?? user.id_specialty,
    email: email ?? user.email,
    passwordHash: hashPassword,
  });
  if (response.error) return response;
  return response;
};

const doctorDeleteService = async (id, userLogged) => {
  const user = await model.findDoctorByIdModel(id);
  if (!user)
    return {
      error: true,
      status: STATUS_CODE.NOT_FOUND,
      message: ERROR_MESSAGE.USER_NOT_FOUND,
    };
  if (user.error) return user;
  if (userLogged?.id_doctor !== user.id_doctor)
    return { error: true, status: STATUS_CODE.FORBIDDEN, message: "Forbidden" };
  const response = await model.deleteDoctorModel(id);
  if (response.error) return response;
  return response;
};

const getAllDoctorsService = async (filter) => {
  const response = await model.getAllDoctorsModel(filter);
  if (response.error) return response;
  return response;
};

module.exports = {
  createDoctorService,
  findDoctorByIdService,
  doctorLoginService,
  doctorUpdateService,
  doctorDeleteService,
  getAllDoctorsService,
};
