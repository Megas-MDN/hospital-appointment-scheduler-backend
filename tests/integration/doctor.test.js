const supertest = require("supertest");
const { app } = require("../../src/app.js");

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

describe("Doctor", () => {
  it("should return 200", async () => {
    const mockDoctors = [
      {
        id_doctor: 1,
        doctor_name: "Doctor Tuffy",
        id_specialty: 5,
        email: "test@test2.com",
      },
    ];
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockDoctors);
    const response = await supertest(app).get("/api/v1/doctor");
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDoctors);
    expect(db.query).toHaveBeenCalled();
  });
});
