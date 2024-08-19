import * as model from "../models/appointment.models.js";

export const getNextAvailableAppointmentsService = async ({
  specialty,
  doctor,
} = {}) => {
  const response = await model.getNextAvailableAppointmentsModel({
    specialty,
    doctor,
  });

  if (response.error) return response;
  const today = new Date();
  const appointmentDay = response.id_day_of_week;

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + appointmentDay);

  return {
    id_doctor: response.id_doctor,
    doctor_name: response.doctor_name,
    specialty: response.specialty,
    date: nextDate.toISOString().split("T")[0],
    time: response.start_time,
  };
};

export const scheduleAppointmentService = async ({
  user = {},
  specialty,
  doctor,
  symptoms,
} = {}) => {
  return await model.scheduleAppointmentModel({
    user,
    symptoms,
    specialty,
    doctor,
  });
};
