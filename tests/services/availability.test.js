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

  it("should return error message AVAILABILITY_NOT_FOUND", async () => {
    const {
      getAvailabilityByIdModel,
    } = require("../../src/models/availability.models");
    getAvailabilityByIdModel.mockResolvedValue(null);

    const response = await service.updateAvailabilityService(availability);

    expect(response.message).toBe("Availability not found");
  });
});
