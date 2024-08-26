const supertest = require("supertest");
const { app } = require("../../src/app.js");
const { API_VERSION } = require("../../src/utils/apiVersionsEnpoint.js");
const { ROOT_PATH } = require("../../src/utils/basePathHash.js");
const { handlerToken } = require("../../src/utils/myJWT.js");

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.APPOINTMENT;

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});

const mockReturn = [
  {
    id_availability: 3,
    id_doctor: 1,
    id_day_of_week: 3,
    start_time: "09:20:00",
    end_time: "18:00:00",
    appointment_time: 20,
    recurrent: true,
    doctor_name: "Doctor Test",
    email: "test@test.com",
    specialty: "Generalist",
    day: "Tuesday",
  },
];

const availabilityMock = [
  {
    id_availability: 3,
    id_doctor: 1,
    id_day_of_week: 3,
    start_time: "09:20:00",
    end_time: "18:00:00",
    appointment_time: 20,
    recurrent: true,
    created_date: "2024-07-28 20:42:47.928289",
    updated_date: "2024-08-20 14:17:37.975622",
    deleted_date: null,
  },
];

const appointmentMock = {
  id_appointment: 5,
  id_doctor: 1,
  id_patient: 1,
  doctor_name: "Doctor Test",
  patient_name: "Patient Lorem",
  symptoms:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "2024-08-29T00:00:00.000Z",
  time: "09:20:00",
  created_date: "2024-08-26T17:26:15.834Z",
  updated_date: "2024-08-26T17:26:15.834Z",
  deleted_date: null,
};

let token;
describe("Appointment", () => {
  beforeAll(async () => {
    const genToken = handlerToken();
    token = genToken.encode({
      id_patient: 1,
      patient_name: "Patient Lorem",
      email: "patient_lorem@email.com",
    });
  });

  it("GET - getNextAvailableAppointmentsController", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockReturn);
    const response = await supertest(app).get(BASE_PATH);

    const today = new Date();
    const appointmentDay = mockReturn[0].id_day_of_week;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + appointmentDay);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id_doctor: 1,
      doctor_name: "Doctor Test",
      specialty: "Generalist",
      date: nextDate.toISOString().split("T")[0],
      time: "09:20:00",
      id_availability: 3,
    });
    expect(db.query).toHaveBeenCalled();
  });

  it("POST - scheduleAppointmentByDoctorController", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockReturn);
    db.query.mockResolvedValueOnce(availabilityMock);
    db.query.mockResolvedValueOnce(availabilityMock);
    db.query.mockResolvedValueOnce([appointmentMock]);

    const response = await supertest(app)
      .post(`${BASE_PATH}/doctor/1`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({ symptoms: "Lorem ipsum" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_appointment");
    expect(db.query).toHaveBeenCalled();
  });

  it("POST - scheduleAppointmentBySpecialtyController", async () => {
    const { db } = require("../../src/database/connection.js");
    db.query.mockResolvedValueOnce(mockReturn);
    db.query.mockResolvedValueOnce(availabilityMock);
    db.query.mockResolvedValueOnce(availabilityMock);
    db.query.mockResolvedValueOnce([appointmentMock]);

    const response = await supertest(app)
      .post(`${BASE_PATH}/specialty/5`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({ symptoms: "Lorem ipsum" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id_appointment");
    expect(db.query).toHaveBeenCalled();
  });
});
