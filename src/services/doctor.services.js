import * as model from "../models/doctor.models.js";
import * as modelSpecialty from "../models/specialty.models.js";
import * as handlerPassword from "../utils/handlePassword.js";
import { handlerToken } from "../utils/myJWT.js";
import { validateData } from "../utils/validateData.js";

const doctorSchema = {
  doctor_name: "string",
  id_specialty: "number",
  email: "string",
  password: "string",
};

export const findDoctorByEmailService = async (email) => {
  return await model.findDoctorByEmailModel(email);
};

export const findDoctorByIdService = async (id) => {
  return await model.findDoctorByIdModel(id);
};

export const createDoctorService = async (data) => {
  const oldUser = await findDoctorByEmailService(data.email);
  if (oldUser)
    return { error: true, message: "User already exists", status: 400 };
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
    return { error: true, message: "Specialty not found", status: 404 };
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

export const doctorLoginService = async ({ email, password }) => {
  const isValid = validateData({
    data: { email, password },
    schema: { email: "string", password: "string" },
  });

  if (isValid.error) return isValid;
  const user = await model.findDoctorByEmailWithPasswordModel(email);
  if (!user) return { error: true, status: 404, message: "User not found" };
  if (user?.error) return user;
  const match = await handlerPassword.compareHashPassword(
    password,
    user.password,
  );
  if (!match)
    return { error: true, status: 400, message: "Invalid email or password" };
  const genToken = handlerToken();
  const token = genToken.encode({ id_doctor: user.id_doctor, email });
  return { token };
};

export const doctorUpdateService = async (data, userLogged) => {
  const { id_doctor, doctor_name, id_specialty, email, password } = data;
  const user = await model.findDoctorByIdModel(id_doctor);
  if (!user) return { error: true, status: 404, message: "User not found" };
  if (user.error) return user;
  if (userLogged?.id_doctor !== user.id_doctor)
    return { error: true, status: 403, message: "Forbidden" };
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
      return { error: true, message: "Specialty not found", status: 404 };
  }
  const hashPassword = !!password
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

export const doctorDeleteService = async (id, userLogged) => {
  const user = await model.findDoctorByIdModel(id);
  if (!user) return { error: true, status: 404, message: "User not found" };
  if (user.error) return user;
  if (userLogged?.id_doctor !== user.id_doctor)
    return { error: true, status: 403, message: "Forbidden" };
  const response = await model.deleteDoctorModel(id);
  if (response.error) return response;
  return response;
};

export const getAllDoctorsService = async (filter) => {
  const response = await model.getAllDoctorsModel(filter);
  if (response.error) return response;
  return response;
};
