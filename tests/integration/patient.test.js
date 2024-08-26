const supertest = require("supertest");
const { app } = require("../../src/app.js");
const { API_VERSION } = require("../../src/utils/apiVersionsEnpoint.js");
const { ROOT_PATH } = require("../../src/utils/basePathHash.js");
const { handlerToken } = require("../../src/utils/myJWT.js");

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.PATIENT;

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

describe("Patient", () => {
  beforeAll(() => {
    const genToken = handlerToken();
    token = genToken.encode({
      id_patient: 1,
      patient_name: "Patient Lorem",
      email: "patient_lorem@email.com",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should all patients return 200", async () => {
    const mockPatients = [
      {
        id_patient: 1,
        patient_name: "Patient Tuffy",
        id_specialty: 5,
        email: "test@test2.com",
      },
    ];
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockPatients);
    const response = await supertest(app)
      .get("/api/v1/patient")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPatients);
    expect(db.query).toHaveBeenCalled();
  });

  it("should return 200 when login", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce([
      {
        id_patient: 1,
        patient_name: "Patient Test",
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
    db.query.mockResolvedValueOnce([
      {
        id_patient: 1,
        patient_name: "Patient Lorem",
        email: "patient_lorem@email.com",
        created_date: "2024-08-03 18:17:59.784075",
        updated_date: "2024-08-03 18:17:59.784075",
        deleted_date: null,
      },
    ]);
    const response = await supertest(app).post(`${BASE_PATH}`).send({
      patient_name: "Patient Test New",
      email: "test@test.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(db.query).toHaveBeenCalled();
    expect(response.body.user).toHaveProperty("id_patient", 1);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 not authorized", async () => {
    const mockPatients = [
      {
        id_patient: 1,
        patient_name: "Patient Tuffy",
        id_specialty: 5,
        email: "test@test2.com",
      },
    ];
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockPatients);
    const response = await supertest(app).get("/api/v1/patient");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  it("should return 401 not authorized without token", async () => {
    const mockPatients = [
      {
        id_patient: 1,
        patient_name: "Patient Tuffy",
        id_specialty: 5,
        email: "test@test2.com",
      },
    ];
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockPatients);
    const response = await supertest(app).get("/api/v1/patient").set({
      Authorization: "Bearer ",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  it("should return 401 not authorized without expired token", async () => {
    const mockPatients = [
      {
        id_patient: 1,
        patient_name: "Patient Tuffy",
        id_specialty: 5,
        email: "test@test2.com",
      },
    ];
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockPatients);

    const genToken = handlerToken(undefined, -1);
    const expiredToken = genToken.encode({
      id_patient: 1,
      patient_name: "Patient Lorem",
      email: "patient_lorem@email.com",
    });
    const response = await supertest(app)
      .get("/api/v1/patient")
      .set({
        Authorization: "Bearer " + expiredToken,
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});
