import { db } from "../database/connection.js";

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

export const getAllAvailabilitiesModel = async () => {
  try {
    const response = await db.query(
      "SELECT * FROM availability WHERE deleted_date IS NULL ",
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllAvailabilitiesModel");
    return { error: true, message: error.message };
  }
};

export const deleteAvailabilityModel = async (id_availability) => {
  try {
    const response = await db.query(
      "UPDATE availability SET deleted_date = NOW()updated_date = NOW() WHERE id_availability = $1",
      [id_availability],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from deleteAvailabilityModel");
    return { error: true, message: error.message };
  }
};

export const updateAvailabilityModel = async (data) => {
  const {
    id_availability,
    id_doctor,
    id_day_of_week,
    start_time,
    end_time,
    appointment_time,
    recurrent,
  } = data;
  try {
    const response = await db.query(
      "UPDATE availability SET id_doctor = $1, id_day_of_week = $2, start_time = $3, end_time = $4, appointment_time = $5, recurrent = $6, updated_date = NOW() WHERE id_availability = $7",
      [
        id_doctor,
        id_day_of_week,
        start_time,
        end_time,
        appointment_time,
        recurrent,
        id_availability,
      ],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from updateAvailabilityModel");
    return { error: true, message: error.message };
  }
};
