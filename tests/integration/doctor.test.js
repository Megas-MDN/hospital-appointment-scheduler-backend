const supertest = require("supertest");
const { app } = require("../../src/app.js");
const { API_VERSION } = require("../../src/utils/apiVersionsEnpoint.js");
const { ROOT_PATH } = require("../../src/utils/basePathHash.js");

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.DOCTOR;

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

const specialty = [
  {
    id_specialty: 5,
    specialty: "Generalist",
    created_date: "2024-07-28 01:55:18.221748",
    updated_date: "2024-07-28 01:55:18.221748",
    deleted_date: null,
  },
];

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

  it("should return 200 when login", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce([
      {
        id_doctor: 1,
        doctor_name: "Doctor Test",
        id_specialty: 5,
        email: "test@test.com",
        password:
          "$2b$12$qri5.qocIfwxmuOq0M3k5u5lGCL5by5DvJ.2RkGooKhJUEn9BQIXC",
        created_date: "2024-07-28 20:05:53.174331",
        updated_date: "2024-07-28 20:05:53.174331",
        deleted_date: null,
      },
    ]);
    const response = await supertest(app).post(`${BASE_PATH}/login`).send({
      email: "test@test.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(db.query).toHaveBeenCalled();
    expect(response.body).toHaveProperty("token");
  });

  it("should return 201", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce([]);
    db.query.mockResolvedValueOnce(specialty);
    db.query.mockResolvedValueOnce([
      {
        id_doctor: 1,
        doctor_name: "Doctor Test New",
        id_specialty: 5,
        email: "test@test.com",
        created_date: "2024-07-28 20:05:53.174331",
        updated_date: "2024-07-28 20:05:53.174331",
        deleted_date: null,
      },
    ]);
    const response = await supertest(app).post(`${BASE_PATH}`).send({
      doctor_name: "Doctor Test New",
      id_specialty: 5,
      email: "test@test.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(db.query).toHaveBeenCalled();
    expect(response.body.user).toHaveProperty("id_doctor", 1);
    expect(response.body).toHaveProperty("token");
  });

  // it("should update doctor", async () => {
  //   const { db } = require("../../src/database/connection.js");
  //   db.query.mockResolvedValueOnce([]);
  // });
});
