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

const doctor = {
  id_doctor: 1,
  doctor_name: "Doctor Lorem",
  id_specialty: 1,
  email: "doctor_lorem@email.com",
  password: "123456",
};

const user = {
  id_doctor: 1,
  doctor_name: "Doctor Test",
  id_specialty: 5,
  email: "doctor_lorem@email.com",
};

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

  it("should be doctorUpdateService User not found", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue(null);

    const response = await service.doctorUpdateService(doctor, user);

    expect(response.message).toBe("User not found");
  });

  it("should be doctorUpdateService User error", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      error: true,
      message: "User error",
    });

    const response = await service.doctorUpdateService(doctor, user);

    expect(response.message).toBe("User error");
  });

  it("should be doctorUpdateService User Forbidden", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
    });

    const response = await service.doctorUpdateService(doctor, {
      ...user,
      id_doctor: 2,
    });

    expect(response.message).toBe("Forbidden");
  });

  it("should be doctorUpdateService Invalid doctor_name field", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
      id_doctor: 1,
    });

    const response = await service.doctorUpdateService(
      { ...doctor, doctor_name: false },
      user,
    );
    expect(response.message).toBe("Invalid doctor_name field");
  });

  it("should be doctorUpdateService Specialty not found", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    const {
      findSpecialtyByIdModel,
    } = require("../../src/models/specialty.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
      id_doctor: 1,
    });
    findSpecialtyByIdModel.mockResolvedValue(null);
    const response = await service.doctorUpdateService({ ...doctor }, user);

    expect(response.message).toBe("Specialty not found");
  });

  it("should be doctorUpdateService Error from findSpecialtyByIdModel", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    const {
      findSpecialtyByIdModel,
    } = require("../../src/models/specialty.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
      id_doctor: 1,
    });
    findSpecialtyByIdModel.mockResolvedValue({
      error: true,
      message: "Error from findSpecialtyByIdModel",
    });
    const response = await service.doctorUpdateService({ ...doctor }, user);

    expect(response.message).toBe("Error from findSpecialtyByIdModel");
  });

  it("should be doctorUpdateService Error from updateDoctorModel", async () => {
    const {
      findDoctorByIdModel,
      updateDoctorModel,
    } = require("../../src/models/doctor.models");
    const {
      findSpecialtyByIdModel,
    } = require("../../src/models/specialty.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
      id_doctor: 1,
    });
    findSpecialtyByIdModel.mockResolvedValue({
      error: false,
    });
    const { genHashPassword } = require("../../src/utils/handlePassword");
    genHashPassword.mockResolvedValue("password");
    updateDoctorModel.mockResolvedValue({
      error: true,
      message: "Error from updateDoctorModel",
    });
    const response = await service.doctorUpdateService({ ...doctor }, user);

    expect(response.message).toBe("Error from updateDoctorModel");
  });

  it("should be doctorUpdateService Error from updateDoctorModel", async () => {
    const {
      findDoctorByIdModel,
      updateDoctorModel,
    } = require("../../src/models/doctor.models");
    const {
      findSpecialtyByIdModel,
    } = require("../../src/models/specialty.models");
    findDoctorByIdModel.mockResolvedValue({
      error: false,
      id_doctor: 1,
    });
    findSpecialtyByIdModel.mockResolvedValue({
      error: false,
    });
    const { genHashPassword } = require("../../src/utils/handlePassword");
    genHashPassword.mockResolvedValue("password");
    updateDoctorModel.mockResolvedValue({
      error: false,
      message: "updateDoctorModel",
    });
    const response = await service.doctorUpdateService({ ...doctor }, user);

    expect(response.message).toBe("updateDoctorModel");
  });

  it("should return 'User not found' if the doctor does not exist", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue(null);

    const response = await service.doctorDeleteService(1, user);

    expect(response).toMatchObject({
      error: true,
      status: 404,
      message: "User not found",
    });
  });

  it("should return the user object if there is an error in finding the doctor", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      error: true,
      message: "Error finding doctor",
    });

    const response = await service.doctorDeleteService(1, user);

    expect(response).toMatchObject({
      error: true,
      message: "Error finding doctor",
    });
  });

  it("should return 'Forbidden' if the logged user is not the same as the doctor to be deleted", async () => {
    const { findDoctorByIdModel } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      id_doctor: 1,
      doctor_name: "Doctor Lorem",
    });

    const response = await service.doctorDeleteService(1, {
      ...user,
      id_doctor: 2,
    });

    expect(response).toMatchObject({
      error: true,
      status: 403,
      message: "Forbidden",
    });
  });

  it("should return an error response if the deletion fails", async () => {
    const {
      findDoctorByIdModel,
      deleteDoctorModel,
    } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      id_doctor: 1,
      doctor_name: "Doctor Lorem",
    });
    deleteDoctorModel.mockResolvedValue({
      error: true,
      message: "Deletion error",
    });

    const response = await service.doctorDeleteService(1, {
      ...user,
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Deletion error",
    });
  });

  it("should return a successful response if the deletion is successful", async () => {
    const {
      findDoctorByIdModel,
      deleteDoctorModel,
    } = require("../../src/models/doctor.models");
    findDoctorByIdModel.mockResolvedValue({
      id_doctor: 1,
      doctor_name: "Doctor Lorem",
    });
    deleteDoctorModel.mockResolvedValue({
      error: false,
      message: "Doctor deleted successfully",
    });

    const response = await service.doctorDeleteService(1, {
      ...user,
      id_doctor: 1,
    });

    expect(response).toMatchObject({
      error: false,
      message: "Doctor deleted successfully",
    });
  });
});
