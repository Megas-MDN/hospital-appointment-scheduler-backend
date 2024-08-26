const model = require("../models/appointment.models.js");

const getNextAvailableAppointmentsService = async ({
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
    id_availability: response.id_availability,
  };
};

const scheduleAppointmentService = async ({
  user = {},
  specialty,
  doctor,
  symptoms,
} = {}) => {
  const availability = await getNextAvailableAppointmentsService({
    specialty,
    doctor,
  });

  if (availability.error) return availability;

  const appointment = {
    id_availability: availability.id_availability,
    id_doctor: availability.id_doctor,
    id_patient: user.id_patient,
    doctor_name: availability.doctor_name,
    patient_name: user.patient_name,
    symptoms,
    date: availability.date,
    time: availability.time,
  };

  return await model.scheduleAppointmentModel(appointment);
};

module.exports = {
  getNextAvailableAppointmentsService,
  scheduleAppointmentService,
};
