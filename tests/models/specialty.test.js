const specialty = require("../../src/models/specialty.models");

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

describe("Specialty", () => {
  it("should return error findSpecialtyByIdModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Not found" });

    const response = await specialty.findSpecialtyByIdModel(1);

    expect(response).toEqual({ error: true, message: "Not found" });
  });

  it("should return error getAllSpecialtyByIdModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockRejectedValueOnce({ message: "Not found" });

    const response = await specialty.getAllSpecialtyByIdModel({});

    expect(response).toEqual({ error: true, message: "Not found" });
  });

  it("should return the specialtyByIdModel", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce({
      id_specialty: 5,
      specialty: "Generalist",
      created_date: "2024-07-28 01:55:18.221748",
      updated_date: "2024-07-28 01:55:18.221748",
      deleted_date: null,
    });

    const response = await specialty.getAllSpecialtyByIdModel({});

    expect(response).toHaveProperty("id_specialty", 5);
  });
});
