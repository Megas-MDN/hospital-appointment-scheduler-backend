const service = require("../../src/services/doctor.services");

jest.mock("../../src/database/connection.js", () => {
  return {
    createTables: jest.fn(),
    db: {
      query: jest.fn(),
    },
  };
});
jest.mock("../../src/models/doctor.models");
jest.mock("../../src/models/specialty.models.js");
jest.mock("../../src/utils/handlePassword");

describe("Doctor", () => {
  it("should be createDoctorService Specialty not found", async () => {
    const {
      findDoctorByEmailModel,
    } = require("../../src/models/doctor.models");

    findDoctorByEmailModel.mockResolvedValue(false);
    const {
      findSpecialtyByIdModel,
    } = require("../../src/models/specialty.models");

    findSpecialtyByIdModel.mockResolvedValue(false);
    const response = await service.createDoctorService({
      doctor_name: "string",
      id_specialty: 1,
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      message: "Specialty not found",
      status: 404,
    });
  });

  it("should be createDoctorService User already exists", async () => {
    const {
      findDoctorByEmailModel,
    } = require("../../src/models/doctor.models");

    findDoctorByEmailModel.mockResolvedValue(true);

    const response = await service.createDoctorService({
      doctor_name: "string",
      id_specialty: 1,
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      message: "User already exists",
      status: 400,
    });
  });

  it("should be createDoctorService Error from findDoctorByEmailModel", async () => {
    const {
      findDoctorByEmailModel,
    } = require("../../src/models/doctor.models");

    findDoctorByEmailModel.mockResolvedValue({ error: true });

    const response = await service.createDoctorService({
      doctor_name: "string",
      id_specialty: 1,
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      message: "User already exists",
      status: 400,
    });
  });

  it("should be findDoctorByIdService Specialty not found", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({ error: false });
    const response = await service.findDoctorByIdService(1);

    expect(response).toMatchObject({ error: false });
  });

  it("should be doctorLoginService", async () => {
    const {
      findDoctorByEmailWithPasswordModel,
    } = require("../../src/models/doctor.models");
    findDoctorByEmailWithPasswordModel.mockResolvedValue(false);
    const response = await service.doctorLoginService({
      email: "string",
      password: "string",
    });
    console.log(response);

    expect(response).toMatchObject({ error: true });
  });

  it("should be doctorLoginService password incorrect", async () => {
    const {
      findDoctorByEmailWithPasswordModel,
    } = require("../../src/models/doctor.models");
    findDoctorByEmailWithPasswordModel.mockResolvedValue({});
    const { compareHashPassword } = require("../../src/utils/handlePassword");
    compareHashPassword.mockResolvedValue(false);
    const response = await service.doctorLoginService({
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      status: 400,
      message: "Invalid password or email",
    });
  });

  it.todo("should be doctorUpdateService");
});
