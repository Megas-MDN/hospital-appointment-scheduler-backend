const { db } = require("../database/connection.js");

const createPatientModel = async (data) => {
  const { patient_name, email, passwordHash } = data;
  try {
    const [response] = await db.query(
      "INSERT INTO patient (patient_name, email, password) VALUES ($1, $2, $3) RETURNING id_patient, patient_name, email",
      [patient_name, email, passwordHash],
    );

    return response;
  } catch (error) {
    console.log(error, "Error = require(createPatientModel");
    return { error: true, message: error.message };
  }
};

const findPatientByEmailModel = async (email) => {
  try {
    const [response] = await db.query(
      "SELECT id_patient, patient_name, email = require(patient WHERE email = $1 AND deleted_date IS NULL",
      [email],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(findPatientByEmailModel");
    return { error: true, message: error.message };
  }
};

const findPatientByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT id_patient, patient_name, email = require(patient WHERE id_patient = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(findPatientByIdModel");
    return { error: true, message: error.message };
  }
};

const updatePatientModel = async (data) => {
  const { id_patient, patient_name, email, passwordHash } = data;

  try {
    const [response] = await db.query(
      `UPDATE patient SET patient_name = $1, email = $2${
        passwordHash ? ", password = $3" : ""
      }, updated_date = NOW() WHERE id_patient = $4 AND deleted_date IS NULL RETURNING id_patient, patient_name, email`,
      [patient_name, email, passwordHash, id_patient],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(updatePatientModel");
    return { error: true, message: error.message };
  }
};

const deletePatientModel = async (id) => {
  try {
    const [response] = await db.query(
      "UPDATE patient SET deleted_date = NOW(), updated_date = NOW() WHERE id_patient = $1 AND deleted_date IS NULL RETURNING id_patient, patient_name, email",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(deletePatientModel");
    return { error: true, message: error.message };
  }
};

const getAllPatientsModel = async (filter) => {
  const limit = filter.limit || 5;
  const page = filter.page || 0;
  const search = filter.search || "";
  const offset = page * limit;
  try {
    const response = await db.query(
      `SELECT id_patient, patient_name, email = require(patient WHERE LOWER(patient_name) LIKE LOWER($3) AND deleted_date IS NULL LIMIT $1 OFFSET $2`,
      [limit, offset, `%${search}%`],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(getAllPatientsModel");
    return { error: true, message: error.message };
  }
};

const findPatientByEmailWithPasswordModel = async (email) => {
  try {
    const [response] = await db.query(
      "SELECT id_patient, password, patient_name, email = require(patient WHERE email = $1 AND deleted_date IS NULL",
      [email],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(findPatientByEmailWithPasswordModel");
    return { error: true, message: error.message };
  }
};

module.exports = {
  createPatientModel,
  findPatientByEmailModel,
  findPatientByIdModel,
  updatePatientModel,
  deletePatientModel,
  getAllPatientsModel,
  findPatientByEmailWithPasswordModel,
};
