import { db } from "../database/connection.js";

export const createDoctorModel = async (data) => {
  const { doctor_name, id_specialty, email, passwordHash } = data;
  try {
    const [response] = await db.query(
      "INSERT INTO doctor (doctor_name, id_specialty, email, password) VALUES ($1, $2, $3, $4) RETURNING id_doctor, doctor_name, id_specialty, email",
      [doctor_name, id_specialty, email, passwordHash],
    );

    return response;
  } catch (error) {
    console.log(error, "Error from createDoctorModel");
    return { error: true, message: error.message };
  }
};

export const findDoctorByEmailModel = async (email) => {
  try {
    const [response] = await db.query(
      "SELECT id_doctor, doctor_name, id_specialty, email FROM doctor WHERE email = $1 AND deleted_date IS NULL",
      [email],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findDoctorByEmailModel");
    return { error: true, message: error.message };
  }
};

export const findDoctorByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT id_doctor, doctor_name, id_specialty, email FROM doctor WHERE id_doctor = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findDoctorByIdModel");
    return { error: true, message: error.message };
  }
};

export const updateDoctorModel = async (data) => {
  const { id_doctor, doctor_name, id_specialty, email, passwordHash } = data;

  try {
    const [response] = await db.query(
      `UPDATE doctor SET doctor_name = $1, id_specialty = $2, email = $3${
        passwordHash ? ", password = $4" : ""
      }, updated_date = NOW() WHERE id_doctor = $5 AND deleted_date IS NULL RETURNING id_doctor, doctor_name, id_specialty, email`,
      [doctor_name, id_specialty, email, passwordHash, id_doctor],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from updateDoctorModel");
    return { error: true, message: error.message };
  }
};

export const deleteDoctorModel = async (id) => {
  try {
    const [response] = await db.query(
      "UPDATE doctor SET deleted_date = NOW(), updated_date = NOW() WHERE id_doctor = $1 AND deleted_date IS NULL RETURNING id_doctor, doctor_name, id_specialty, email",
      [id],
    );
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getAllDoctorsModel = async (filter) => {
  const limit = filter.limit || 5;
  const page = filter.page || 0;
  const search = filter.search || "";
  const offset = page * limit;

  try {
    const response = await db.query(
      `SELECT id_doctor, doctor_name, id_specialty, email FROM doctor WHERE LOWER(doctor_name) LIKE LOWER($3) AND deleted_date IS NULL LIMIT $1 OFFSET $2`,
      [limit, offset, `%${search}%`],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllDoctorsModel");
    return { error: true, message: error.message };
  }
};

export const findDoctorByEmailWithPasswordModel = async (email) => {
  try {
    const [response] = await db.query(
      "SELECT id_doctor, password FROM doctor WHERE email = $1 AND deleted_date IS NULL",
      [email],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findDoctorByEmailWithPasswordModel");
    return { error: true, message: error.message };
  }
};
