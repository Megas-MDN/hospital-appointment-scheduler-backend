const supertest = require("supertest");
const { app } = require("../../src/app.js");
const { API_VERSION } = require("../../src/utils/apiVersionsEnpoint.js");
const { ROOT_PATH } = require("../../src/utils/basePathHash.js");
const { handlerToken } = require("../../src/utils/myJWT.js");

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AVAILABILITY;

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

const availabilityNotRecurrent = {
  id_availability: 6,
  id_doctor: 2,
  id_day_of_week: 2,
  start_time: "09:00:00",
  end_time: "18:00:00",
  appointment_time: 30,
  recurrent: false,
  created_date: "2024-07-28 20:47:06.408904",
  updated_date: "2024-07-28 20:47:06.408904",
  deleted_date: null,
};

const availabilityMock = [
  {
    id_availability: 5,
    id_doctor: 3,
    id_day_of_week: 3,
    start_time: "09:00:00",
    end_time: "18:00:00",
    appointment_time: 15,
    recurrent: true,
    doctor_name: "Doctor Tey",
    email: "test@tey.com",
    specialty: "Urology",
    day: "Tuesday",
  },
];

const dayOfWeek = {
  id_day_of_week: 5,
  day: "Thursday",
  created_date: "2024-07-28 01:55:18.221748",
  updated_date: "2024-07-28 01:55:18.221748",
  deleted_date: null,
};

let token;
describe("Appointment", () => {
  beforeAll(async () => {
    const genToken = handlerToken();
    token = genToken.encode({
      id_doctor: 1,
      doctor_name: "Doctor Test",
      id_specialty: 5,
      email: "test@test.com",
    });
  });

  it.skip("GET - getAllAvailabilitiesController", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce([availabilityNotRecurrent]);
    db.query.mockResolvedValueOnce([]);
    db.query.mockResolvedValueOnce(availabilityMock);

    const response = await supertest(app)
      .get(`${BASE_PATH}`)
      .set("Authorization", `Bearer ${token}`)
      .query({});

    expect(response.status).toBe(200);
  });

  it("POST - createAvailabilityController", async () => {
    const { db } = require("../../src/database/connection.js");

    db.query.mockResolvedValueOnce([]);
    db.query.mockResolvedValueOnce([dayOfWeek]);
    db.query.mockResolvedValueOnce([
      {
        id_availability: 10,
        id_doctor: 1,
        id_day_of_week: 5,
        start_time: "09:00:00",
        end_time: "18:00:00",
        appointment_time: 20,
        recurrent: true,
      },
    ]);

    const response = await supertest(app)
      .post(`${BASE_PATH}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        id_day_of_week: 5,
        start_time: "09:00:00",
        end_time: "18:00:00",
        appointment_time: 20,
        recurrent: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_availability", 10);
  });
  it("PATCH - updateAvailabilityController", async () => {});
  it("DELETE - deleteAvailabilityController", async () => {});
});

/*

availabilityRoutes.get(
  `${BASE_PATH}`,
  controller.getAllAvailabilitiesController,
);

availabilityRoutes.post(
  `${BASE_PATH}`,
  auth,
  controller.createAvailabilityController,
);

availabilityRoutes.patch(
  `${BASE_PATH}/:id_availability`,
  auth,
  controller.updateAvailabilityController,
);

availabilityRoutes.delete(
  `${BASE_PATH}/:id_availability`,
  auth,
  controller.deleteAvailabilityController,
);

*/
