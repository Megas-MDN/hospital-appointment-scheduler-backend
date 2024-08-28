const service = require("../../src/services/availability.services");

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});
jest.mock("../../src/models/availability.models");
jest.mock("../../src/models/dayOfWeek.models");
const availability = {
  id_availability: 1,
  id_doctor: 1,
  id_day_of_week: 1,
  start_time: "string",
  end_time: "string",
  appointment_time: 10,
  recurrent: true,
  created_date: "2024-05-28 20:47:06.408904",
};

describe("Availability", () => {
  it("should return error message AVAILABILITY_ALREADY_EXISTS", async () => {
    const {
      findAvailabilityByIdDoctorIdDayOfWeekModel,
    } = require("../../src/models/availability.models");
    findAvailabilityByIdDoctorIdDayOfWeekModel.mockResolvedValue(availability);
    const response = await service.createAvailabilityService(availability);

    expect(response.message).toBe("Availability already exists");
  });

  it("should return error message DAY_OF_WEEK_NOT_FOUND", async () => {
    const {
      findAvailabilityByIdDoctorIdDayOfWeekModel,
      deleteAvailabilityModel,
    } = require("../../src/models/availability.models");
    findAvailabilityByIdDoctorIdDayOfWeekModel.mockResolvedValue({
      ...availability,
      recurrent: false,
    });
    const {
      findDayOfWeekByIdModel,
    } = require("../../src/models/dayOfWeek.models");
    deleteAvailabilityModel.mockResolvedValue(null);
    findDayOfWeekByIdModel.mockResolvedValue(null);
    const response = await service.createAvailabilityService(availability);

    expect(response.message).toBe("Day of week not found");
  });

  it("should return error message DAY_OF_WEEK_NOT_FOUND 2", async () => {
    const {
      findAvailabilityByIdDoctorIdDayOfWeekModel,
      deleteAvailabilityModel,
    } = require("../../src/models/availability.models");
    findAvailabilityByIdDoctorIdDayOfWeekModel.mockResolvedValue({
      ...availability,
      recurrent: false,
      created_date: "3000-05-28 20:47:06.408904",
    });
    const {
      findDayOfWeekByIdModel,
    } = require("../../src/models/dayOfWeek.models");
    deleteAvailabilityModel.mockResolvedValue(null);
    findDayOfWeekByIdModel.mockResolvedValue(null);
    const response = await service.createAvailabilityService(availability);

    expect(response.message).toBe("Day of week not found");
  });

  it("should return error message AVAILABILITY_NOT_FOUND", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");
    getAvailabilityByIdModel.mockResolvedValue(null);

    const response = await service.updateAvailabilityService(availability);

    expect(response.message).toBe("Availability not found");
  });

  it("should return error message FORBIDDEN", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");
    getAvailabilityByIdModel.mockResolvedValue({ error: false, id_doctor: 2 });

    const response = await service.updateAvailabilityService(availability, {
      id_doctor: 1,
    });

    expect(response.message).toBe("Forbidden");
  });

  it("should return error message DAY_OF_WEEK_NOT_FOUND", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");
    getAvailabilityByIdModel.mockResolvedValue({ error: false, id_doctor: 1 });

    const response = await service.updateAvailabilityService(
      { ...availability, created_date: new Date(), recurrent: true },
      {
        id_doctor: 1,
      },
    );

    expect(response.message).toBe("Day of week not found");
  });

  it("should handle errors and return an error message", async () => {
    const {
      getAllNotRecorrentAvailabilitiesModel,
      getAllAvailabilitiesModel,
    } = require("../../src/models/availability.models");

    getAllAvailabilitiesModel.mockResolvedValue(null);
    getAllNotRecorrentAvailabilitiesModel.mockRejectedValue({
      message: "Database error",
    });

    const response = await service.getAllAvailabilitiesService();

    expect(response).toMatchObject({
      error: true,
      message: "Database error",
    });
  });

  it("should return an error if deleteExpiredAvailabilitiesModel fails", async () => {
    const {
      getAllNotRecorrentAvailabilitiesModel,
      deleteExpiredAvailabilitiesModel,
      getAllAvailabilitiesModel,
    } = require("../../src/models/availability.models");

    const availabilities = [
      {
        id_availability: 1,
        id_doctor: 1,
        id_day_of_week: 1,
        start_time: "string",
        end_time: "string",
        appointment_time: 10,
        recurrent: false,
        created_date: "2024-05-28 20:47:06.408904",
      },
    ];
    getAllNotRecorrentAvailabilitiesModel.mockResolvedValue(availabilities);
    getAllAvailabilitiesModel.mockResolvedValue(null);

    deleteExpiredAvailabilitiesModel.mockRejectedValue({
      message: "Failed to delete expired availabilities",
    });

    const response = await service.getAllAvailabilitiesService();

    expect(response).toMatchObject({
      error: true,
      message: "Failed to delete expired availabilities",
    });
  });

  it("should return an error if getAllAvailabilitiesModel fails", async () => {
    const {
      getAllNotRecorrentAvailabilitiesModel,
      deleteExpiredAvailabilitiesModel,
      getAllAvailabilitiesModel,
    } = require("../../src/models/availability.models");

    const availabilities = [
      {
        id_availability: 1,
        id_doctor: 1,
        id_day_of_week: 1,
        start_time: "string",
        end_time: "string",
        appointment_time: 10,
        recurrent: false,
        created_date: "2024-05-28 20:47:06.408904",
      },
    ];
    getAllNotRecorrentAvailabilitiesModel.mockResolvedValue(availabilities);
    deleteExpiredAvailabilitiesModel.mockResolvedValue(true);

    getAllAvailabilitiesModel.mockRejectedValue({
      message: "Failed to retrieve availabilities",
    });

    const response = await service.getAllAvailabilitiesService();

    expect(response).toMatchObject({
      error: true,
      message: "Failed to retrieve availabilities",
    });
  });

  it("should return AVAILABILITY_NOT_FOUND if the availability does not exist", async () => {
    const {
      getAvailabilityByIdModel,
      deleteAvailabilityModel,
    } = require("../../src/models/availability.models");

    getAvailabilityByIdModel.mockResolvedValue(null);
    deleteAvailabilityModel.mockResolvedValue(null);

    const response = await service.deleteAvailabilityService(1, {
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Availability not found",
      status: 404,
    });
  });

  it("should return an error if there is an error in finding the availability", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");

    // Mocking an error for getAvailabilityByIdModel
    getAvailabilityByIdModel.mockResolvedValue({
      error: true,
      message: "Error retrieving availability",
    });

    const response = await service.deleteAvailabilityService(1, {
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Error retrieving availability",
    });
  });

  it("should return FORBIDDEN if the user is not authorized to delete the availability", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");

    getAvailabilityByIdModel.mockResolvedValue({
      id_availability: 1,
      id_doctor: 2,
    });

    const response = await service.deleteAvailabilityService(1, {
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Forbidden",
      status: 403,
    });
  });

  it("should return an error if the deletion fails", async () => {
    const {
      getAvailabilityByIdModel,
      deleteAvailabilityModel,
    } = require("../../src/models/availability.models");

    getAvailabilityByIdModel.mockResolvedValue({
      id_availability: 1,
      id_doctor: 1,
    });

    // Mocking an error for deleteAvailabilityModel
    deleteAvailabilityModel.mockResolvedValue({
      error: true,
      message: "Error deleting availability",
    });

    const response = await service.deleteAvailabilityService(1, {
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Error deleting availability",
    });
  });

  it("should return the availability if the deletion is successful", async () => {
    const {
      getAvailabilityByIdModel,
      deleteAvailabilityModel,
    } = require("../../src/models/availability.models");

    const availability = { id_availability: 1, id_doctor: 1 };

    getAvailabilityByIdModel.mockResolvedValue(availability);
    deleteAvailabilityModel.mockResolvedValue(true);

    const response = await service.deleteAvailabilityService(1, {
      id_doctor: 1,
    });

    expect(response).toMatchObject(availability);
  });
});
