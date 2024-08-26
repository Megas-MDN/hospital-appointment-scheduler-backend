const availability = require("../../src/models/availability.models");

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

describe("Availability", () => {
  it("should return error createAvailabilityModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.createAvailabilityModel({});

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error getAllAvailabilitiesModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.getAllAvailabilitiesModel({});

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error deleteAvailabilityModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.deleteAvailabilityModel(1);

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error updateAvailabilityModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.updateAvailabilityModel({});

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error findAvailabilityByIdDoctorIdDayOfWeekModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response =
      await availability.findAvailabilityByIdDoctorIdDayOfWeekModel(1, 1);

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error getAvailabilityByIdModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.getAvailabilityByIdModel(1);

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error getAllNotRecorrentAvailabilitiesModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.getAllNotRecorrentAvailabilitiesModel();

    expect(response).toEqual({ error: true, message: "Internal server error" });
  });

  it("should return error deleteExpiredAvailabilitiesModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Internal server error" });

    const response = await availability.deleteExpiredAvailabilitiesModel([{}]);

    expect(response[0]).toEqual({
      error: true,
      message: "Internal server error",
    });
  });
});
