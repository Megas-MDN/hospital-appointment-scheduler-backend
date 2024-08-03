import { db } from "../database/connection.js";
import { makeCaseSql } from "../utils/reorderDaysUtil.js";

export const createAvailabilityModel = async (data) => {
  const {
    id_doctor,
    id_day_of_week,
    start_time,
    end_time,
    appointment_time,
    recurrent,
  } = data;
  try {
    const [response] = await db.query(
      "INSERT INTO availability (id_doctor, id_day_of_week, start_time, end_time, appointment_time, recurrent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_availability",
      [
        id_doctor,
        id_day_of_week,
        start_time,
        end_time,
        appointment_time,
        recurrent,
      ],
    );
    return { ...data, id_availability: response.id_availability };
  } catch (error) {
    console.log(error, "Error from createAvailabilityModel");
    return { error: true, message: error.message };
  }
};

export const getAllAvailabilitiesModel = async (filter = {}) => {
  const limit = filter.limit || 5;
  const page = filter.page || 0;
  const specialty = filter.specialty || "";
  const doctor = filter.doctor || "";
  const offset = page * limit;
  try {
    const response = await db.query(
      `SELECT a.id_availability, a.id_doctor, a.id_day_of_week, a.start_time, a.end_time, a.appointment_time, a.recurrent, 
       d.doctor_name, d.email, ms.specialty, dow.day 
      FROM availability a
      LEFT JOIN doctor d ON d.id_doctor = a.id_doctor
      LEFT JOIN medical_specialties ms ON ms.id_specialty = d.id_specialty
      LEFT JOIN day_of_week dow ON dow.id_day_of_week = a.id_day_of_week
      WHERE a.deleted_date IS NULL
      AND d.deleted_date IS NULL
      AND ms.deleted_date IS NULL
      ${
        Number(doctor)
          ? `AND a.id_doctor = $6`
          : `AND LOWER(d.doctor_name) LIKE LOWER($4)`
      }
      ${
        Number(specialty)
          ? `AND d.id_specialty = $5`
          : `AND LOWER(ms.specialty) LIKE LOWER($3)`
      }
      AND a.start_time + (a.appointment_time || ' minutes')::INTERVAL <= a.end_time
      ORDER BY
      ${makeCaseSql()}
      LIMIT $1 OFFSET $2;
      `,
      [
        limit,
        offset,
        `%${specialty}%`,
        `%${doctor}%`,
        Number(specialty),
        Number(doctor),
      ],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllAvailabilitiesModel");
    return { error: true, message: error.message };
  }
};

export const deleteAvailabilityModel = async (id_availability) => {
  try {
    const [response] = await db.query(
      "UPDATE availability SET deleted_date = NOW(), updated_date = NOW() WHERE id_availability = $1 RETURNING *",
      [id_availability],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from deleteAvailabilityModel");
    return { error: true, message: error.message };
  }
};

export const updateAvailabilityModel = async (data) => {
  const { id_availability, start_time, end_time, appointment_time, recurrent } =
    data;
  try {
    const [response] = await db.query(
      "UPDATE availability SET start_time = $1, end_time = $2, appointment_time = $3, recurrent = $4, updated_date = NOW() WHERE id_availability = $5 RETURNING *",
      [start_time, end_time, appointment_time, recurrent, id_availability],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from updateAvailabilityModel");
    return { error: true, message: error.message };
  }
};

export const findAvailabilityByIdDoctorIdDayOfWeekModel = async (
  id_doctor,
  id_day_of_week,
) => {
  try {
    const [response] = await db.query(
      "SELECT * FROM availability WHERE id_doctor = $1 AND id_day_of_week = $2 AND deleted_date IS NULL",
      [id_doctor, id_day_of_week],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findAvailabilityByIdDoctorIdDayOfWeekModel");
    return { error: true, message: error.message };
  }
};

export const getAvailabilityByIdModel = async (id_availability) => {
  try {
    const [response] = await db.query(
      "SELECT * FROM availability WHERE id_availability = $1 AND deleted_date IS NULL",
      [id_availability],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAvailabilityByIdModel");
    return { error: true, message: error.message };
  }
};

export const deleteExpiredAvailabilitiesModel = async (availabilities) => {
  try {
    return await Promise.all(
      availabilities.map((availability) => {
        return deleteAvailabilityModel(availability.id_availability);
      }),
    );
  } catch (error) {
    console.log(error, "Error from deleteExpiredAvailabilitiesModel");
    return { error: true, message: error.message };
  }
};

export const getAllNotRecorrentAvailabilitiesModel = async () => {
  try {
    const response = await db.query(
      `SELECT * 
       FROM availability 
       WHERE (recurrent = false OR recurrent IS NULL)
       AND deleted_date IS NULL
       AND created_date < CURRENT_DATE;`,
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllNotRecorrentAvailabilitiesModel");
    return { error: true, message: error.message };
  }
};
