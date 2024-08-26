const controller = require("../../src/controllers/doctor.controllers");

jest.mock("../../src/services/doctor.services");

describe("Doctor Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        id_doctor: 1,
        doctor_name: "Doctor Test",
        id_specialty: 5,
        email: "test@test.com",
        created_date: "2024-07-28 20:05:53.174331",
        updated_date: "2024-07-28 20:05:53.174331",
        deleted_date: null,
      },
      params: {
        id_doctor: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call doctorUpdateController", async () => {
    const {
      doctorUpdateService,
    } = require("../../src/services/doctor.services");

    doctorUpdateService.mockResolvedValue({ error: true });
    await controller.doctorUpdateController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call doctorUpdateController success", async () => {
    const {
      doctorUpdateService,
    } = require("../../src/services/doctor.services");

    doctorUpdateService.mockResolvedValue({ error: false });
    await controller.doctorUpdateController(req, res, next);
    expect(res.json).toBeCalled();
  });

  it("should call doctorDeleteController", async () => {
    const {
      doctorDeleteService,
    } = require("../../src/services/doctor.services");

    doctorDeleteService.mockResolvedValue({ error: true });
    await controller.doctorDeleteController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call doctorDeleteController success", async () => {
    const {
      doctorDeleteService,
    } = require("../../src/services/doctor.services");

    doctorDeleteService.mockResolvedValue({ error: false });
    await controller.doctorDeleteController(req, res, next);
    expect(res.json).toBeCalled();
  });

  it("should call findDoctorByIdController", async () => {
    const {
      findDoctorByIdService,
    } = require("../../src/services/doctor.services");

    findDoctorByIdService.mockResolvedValue({ error: true });
    await controller.findDoctorByIdController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call findDoctorByIdController success", async () => {
    const {
      findDoctorByIdService,
    } = require("../../src/services/doctor.services");

    findDoctorByIdService.mockResolvedValue({ error: false });
    await controller.findDoctorByIdController(req, res, next);
    expect(res.json).toBeCalled();
  });
});
