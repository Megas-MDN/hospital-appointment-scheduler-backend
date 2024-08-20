import { db } from "../database/connection.js";
import * as availabilityModel from "./availability.models.js";
import { STATUS_CODE } from "../utils/StatusCode.js";
import { ERROR_MESSAGE } from "../utils/ErrorMessage.js";
import { incrementMinutes } from "../utils/incrementMinutes.js";

export const getNextAvailableAppointmentsModel = async (filter) => {
  const GENERALIST_ID = 5;
  const specialty = filter.specialty || GENERALIST_ID;
  const doctor = filter.doctor || "";
  const response = await availabilityModel.getAllAvailabilitiesModel({
    specialty,
    doctor,
    limit: 1,
  });
  if (response.error) return response;
  return response[0];
};

export const scheduleAppointmentModel = async (data) => {
  const availability = await availabilityModel.getAvailabilityByIdModel(
    data.id_availability,
  );
  if (availability.error) return availability;
  if (!availability)
    return {
      error: true,
      message: ERROR_MESSAGE.AVAILABILITY_NOT_FOUND,
      status: STATUS_CODE.NOT_FOUND,
    };

  const newStartTime = incrementMinutes(
    availability.start_time,
    availability.appointment_time,
  );

  const newAvilability = await availabilityModel.updateAvailabilityModel({
    ...availability,
    start_time: newStartTime,
  });

  if (newAvilability.error) return newAvilability;

  try {
    const [response] = await db.query(
      "INSERT INTO appointment (id_doctor, id_patient, doctor_name, patient_name, symptoms, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data.id_doctor,
        data.id_patient,
        data.doctor_name,
        data.patient_name,
        data.symptoms,
        data.date,
        data.time,
      ],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from scheduleAppointmentModel");
    return { error: true, message: error.message };
  }
};
