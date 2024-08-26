const model = require("../models/availability.models.js");
const dayOfWeek = require("../models/dayOfWeek.models.js");
const { STATUS_CODE } = require("../utils/StatusCode.js");
const { ERROR_MESSAGE } = require("../utils/ErrorMessage.js");
const { validateData } = require("../utils/validateData.js");

const availabilitySchema = {
  id_doctor: "number",
  id_day_of_week: "number",
  start_time: "string",
  end_time: "string",
  appointment_time: "number",
  recurrent: "boolean",
};

const createAvailabilityService = async (data) => {
  const isValid = validateData({
    data,
    schema: availabilitySchema,
  });
  if (isValid.error) return isValid;
  const oldAvailability =
    await model.findAvailabilityByIdDoctorIdDayOfWeekModel(
      data.id_doctor,
      data.id_day_of_week,
    );
  if (oldAvailability?.error) return oldAvailability;
  if (oldAvailability && oldAvailability.recurrent)
    return {
      error: true,
      message: ERROR_MESSAGE.AVAILABILITY_ALREADY_EXISTS,
      status: STATUS_CODE.BAD_REQUEST,
    };
  if (isExpiredAvailability(oldAvailability)) {
    await model.deleteAvailabilityModel(oldAvailability.id_availability);
  }
  const dayOfWeekData = await dayOfWeek.findDayOfWeekByIdModel(
    data.id_day_of_week,
  );
  if (!dayOfWeekData)
    return {
      error: true,
      message: ERROR_MESSAGE.DAY_OF_WEEK_NOT_FOUND,
      status: STATUS_CODE.NOT_FOUND,
    };
  if (dayOfWeekData?.error) return dayOfWeekData;
  const {
    id_doctor,
    id_day_of_week,
    start_time,
    end_time,
    appointment_time,
    recurrent,
  } = data;
  const availability = await model.createAvailabilityModel({
    id_doctor,
    id_day_of_week,
    start_time,
    end_time,
    appointment_time,
    recurrent,
  });
  return availability;
};

const isExpiredAvailability = (availability) => {
  if (!availability) return false;
  const today = new Date();
  const avDate = new Date(availability.created_date);
  const appointmentDay = availability.id_day_of_week;
  const nextDate = new Date(avDate);
  nextDate.setDate(avDate.getDate() + appointmentDay);

  if (!availability.recurrent) {
    if (nextDate < today) return true;
    return false;
  }
  return false;
};

const updateAvailabilityService = async (data, userLogged) => {
  const oldAvailability = await model.getAvailabilityByIdModel(
    data.id_availability,
  );
  if (oldAvailability?.error) return oldAvailability;
  if (!oldAvailability)
    return {
      error: true,
      message: ERROR_MESSAGE.AVAILABILITY_NOT_FOUND,
      status: STATUS_CODE.NOT_FOUND,
    };

  if (oldAvailability.id_doctor !== userLogged.id_doctor)
    return {
      error: true,
      message: ERROR_MESSAGE.FORBIDDEN,
      status: STATUS_CODE.FORBIDDEN,
    };
  if (isExpiredAvailability(oldAvailability)) {
    await model.deleteAvailabilityModel(oldAvailability.id_availability);
    return {
      error: true,
      message: ERROR_MESSAGE.AVAILABILITY_EXPIRED,
      status: STATUS_CODE.BAD_REQUEST,
    };
  }
  const isValid = validateData({
    data,
    schema: availabilitySchema,
    optional: { all: true },
  });
  if (isValid.error) return isValid;
  if (data.id_day_of_week) {
    const dayOfWeekData = await dayOfWeek.findDayOfWeekByIdModel(
      data.id_day_of_week,
    );
    if (!dayOfWeekData)
      return {
        error: true,
        message: ERROR_MESSAGE.DAY_OF_WEEK_NOT_FOUND,
        status: STATUS_CODE.NOT_FOUND,
      };
    if (dayOfWeekData?.error) return dayOfWeekData;
  }

  const {
    id_availability,
    id_doctor,
    id_day_of_week,
    start_time,
    end_time,
    appointment_time,
    recurrent,
  } = data;
  const availability = await model.updateAvailabilityModel({
    id_availability: id_availability ?? oldAvailability.id_availability,
    id_doctor: id_doctor ?? oldAvailability.id_doctor,
    id_day_of_week: id_day_of_week ?? oldAvailability.id_day_of_week,
    start_time: start_time ?? oldAvailability.start_time,
    end_time: end_time ?? oldAvailability.end_time,
    appointment_time: appointment_time ?? oldAvailability.appointment_time,
    recurrent: recurrent ?? oldAvailability.recurrent,
  });
  return availability;
};
const getAllAvailabilitiesService = async (filter = {}) => {
  try {
    const notRecorrent = await model.getAllNotRecorrentAvailabilitiesModel();
    const expireds = notRecorrent.filter((av) => isExpiredAvailability(av));
    await model.deleteExpiredAvailabilitiesModel(expireds);
    const response = await model.getAllAvailabilitiesModel(filter);
    return response;
  } catch (error) {
    console.log(error, "Error from getAllAvailabilitiesService");
    return { error: true, message: error.message };
  }
};

const deleteAvailabilityService = async (id_availability, userLogged) => {
  const availability = await model.getAvailabilityByIdModel(id_availability);
  if (availability?.error) return availability;
  if (!availability)
    return {
      error: true,
      message: ERROR_MESSAGE.AVAILABILITY_NOT_FOUND,
      status: STATUS_CODE.NOT_FOUND,
    };
  if (availability.id_doctor !== userLogged.id_doctor)
    return {
      error: true,
      message: ERROR_MESSAGE.FORBIDDEN,
      status: STATUS_CODE.FORBIDDEN,
    };

  const res = await model.deleteAvailabilityModel(id_availability);
  if (res?.error) return res;
  return availability;
};

module.exports = {
  createAvailabilityService,
  getAllAvailabilitiesService,
  deleteAvailabilityService,
  updateAvailabilityService,
};
