const controller = require("../../src/controllers/patient.controllers");

jest.mock("../../src/services/patient.services");

describe("Patient Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        id_patient: 1,
        patient_name: "Patient Test",
        id_specialty: 5,
        email: "test@test.com",
        created_date: "2024-07-28 20:05:53.174331",
        updated_date: "2024-07-28 20:05:53.174331",
        deleted_date: null,
      },
      params: {
        id_patient: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call patientUpdateController", async () => {
    const {
      patientUpdateService,
    } = require("../../src/services/patient.services");

    patientUpdateService.mockResolvedValue({ error: true });
    await controller.patientUpdateController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call patientUpdateController success", async () => {
    const {
      patientUpdateService,
    } = require("../../src/services/patient.services");

    patientUpdateService.mockResolvedValue({ error: false });
    await controller.patientUpdateController(req, res, next);
    expect(res.json).toBeCalled();
  });

  it("should call patientDeleteController", async () => {
    const {
      patientDeleteService,
    } = require("../../src/services/patient.services");

    patientDeleteService.mockResolvedValue({ error: true });
    await controller.patientDeleteController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call patientDeleteController success", async () => {
    const {
      patientDeleteService,
    } = require("../../src/services/patient.services");

    patientDeleteService.mockResolvedValue({ error: false });
    await controller.patientDeleteController(req, res, next);
    expect(res.json).toBeCalled();
  });

  it("should call findPatientByIdController", async () => {
    const {
      findPatientByIdService,
    } = require("../../src/services/patient.services");

    findPatientByIdService.mockResolvedValue({ error: true });
    await controller.findPatientByIdController(req, res, next);
    expect(next).toBeCalled();
  });

  it("should call findPatientByIdController success", async () => {
    const {
      findPatientByIdService,
    } = require("../../src/services/patient.services");

    findPatientByIdService.mockResolvedValue({ error: false });
    await controller.findPatientByIdController(req, res, next);
    expect(res.json).toBeCalled();
  });
});
