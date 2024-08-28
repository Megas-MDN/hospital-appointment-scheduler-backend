const service = require("../../src/services/patient.services.js");

jest.mock("../../src/utils/handlePassword");
jest.mock("../../src/models/patient.models");

const patient = {
  id_patient: 1,
  patient_name: "string",
  id_user: 1,
};

const user = {
  id_patient: 1,
  patient_name: "Patient Lorem",
  email: "patient_lorem@email.com",
};

describe("Patient", () => {
  it("should be findPatientByIdService", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");

    findPatientByIdModel.mockResolvedValue(patient);

    const response = await service.findPatientByIdService();

    expect(response).toMatchObject(patient);
  });

  it("should be createPatientService USER_ALREADY_EXISTS", async () => {
    const {
      findPatientByEmailModel,
    } = require("../../src/models/patient.models");

    findPatientByEmailModel.mockResolvedValue(patient);

    const response = await service.createPatientService(patient);

    expect(response).toMatchObject({
      error: true,
      message: "User already exists",
      status: 400,
    });
  });

  it("should be patientLoginService USER_NOT_FOUND", async () => {
    const {
      findPatientByEmailWithPasswordModel,
    } = require("../../src/models/patient.models");

    findPatientByEmailWithPasswordModel.mockResolvedValue(null);

    const response = await service.patientLoginService({
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      message: "User not found",
      status: 404,
    });
  });

  it("should be patientLoginService INVALID_PASSWORD_OR_EMAIL", async () => {
    const {
      findPatientByEmailWithPasswordModel,
    } = require("../../src/models/patient.models");

    findPatientByEmailWithPasswordModel.mockResolvedValue({
      password: "string2",
    });
    const { compareHashPassword } = require("../../src/utils/handlePassword");
    compareHashPassword.mockResolvedValue(false);
    const response = await service.patientLoginService({
      email: "string",
      password: "string",
    });

    expect(response).toMatchObject({
      error: true,
      message: "Invalid password or email",
      status: 400,
    });
  });

  it("should return 'User not found' if the patient does not exist", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(null);

    const response = await service.patientUpdateService(patient, user);

    expect(response).toMatchObject({
      error: true,
      status: 404,
      message: "User not found",
    });
  });

  it("should return the user object if there is an error in finding the patient", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue({
      error: true,
      message: "Error finding patient",
    });

    const response = await service.patientUpdateService(patient, user);

    expect(response).toMatchObject({
      error: true,
      message: "Error finding patient",
    });
  });

  it("should return 'Forbidden' if the logged user is not the same as the patient to be updated", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);

    const response = await service.patientUpdateService(patient, {
      ...user,
      id_patient: 2,
    });

    expect(response).toMatchObject({
      error: true,
      status: 403,
      message: "Forbidden",
    });
  });

  it("should return validation error if the data is invalid", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);

    const response = await service.patientUpdateService(
      { ...patient, email: 1 },
      user,
    );

    expect(response).toMatchObject({
      error: true,
      message: "Invalid email field",
    });
  });

  it("should return an error response if the update fails", async () => {
    const {
      findPatientByIdModel,
      updatePatientModel,
    } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);
    updatePatientModel.mockResolvedValue({
      error: true,
      message: "Update error",
    });

    const response = await service.patientUpdateService(patient, user);

    expect(response).toMatchObject({
      error: true,
      message: "Update error",
    });
  });

  it("should return a successful response if the update is successful", async () => {
    const {
      findPatientByIdModel,
      updatePatientModel,
    } = require("../../src/models/patient.models");
    const { genHashPassword } = require("../../src/utils/handlePassword");

    findPatientByIdModel.mockResolvedValue(patient);
    genHashPassword.mockResolvedValue("hashed_password");
    updatePatientModel.mockResolvedValue({
      error: false,
      message: "Patient updated successfully",
    });

    const response = await service.patientUpdateService(patient, user);

    expect(response).toMatchObject({
      error: false,
      message: "Patient updated successfully",
    });
  });

  it("should return 'User not found' if the patient does not exist", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(null);

    const response = await service.patientDeleteService(1, user);

    expect(response).toMatchObject({
      error: true,
      status: 404,
      message: "User not found",
    });
  });

  it("should return the user object if there is an error in finding the patient", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue({
      error: true,
      message: "Error finding patient",
    });

    const response = await service.patientDeleteService(1, user);

    expect(response).toMatchObject({
      error: true,
      message: "Error finding patient",
    });
  });

  it("should return 'Forbidden' if the logged user is not the same as the patient to be deleted", async () => {
    const { findPatientByIdModel } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);

    const response = await service.patientDeleteService(1, {
      ...user,
      id_patient: 2,
    });

    expect(response).toMatchObject({
      error: true,
      status: 403,
      message: "Forbidden",
    });
  });

  it("should return an error response if the deletion fails", async () => {
    const {
      findPatientByIdModel,
      deletePatientModel,
    } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);
    deletePatientModel.mockResolvedValue({
      error: true,
      message: "Deletion error",
    });

    const response = await service.patientDeleteService(1, {
      ...user,
      id_patient: 1,
    });

    expect(response).toMatchObject({
      error: true,
      message: "Deletion error",
    });
  });

  it("should return a successful response if the deletion is successful", async () => {
    const {
      findPatientByIdModel,
      deletePatientModel,
    } = require("../../src/models/patient.models");
    findPatientByIdModel.mockResolvedValue(patient);
    deletePatientModel.mockResolvedValue({
      error: false,
      message: "Patient deleted successfully",
    });

    const response = await service.patientDeleteService(1, {
      ...user,
      id_patient: 1,
    });

    expect(response).toMatchObject({
      error: false,
      message: "Patient deleted successfully",
    });
  });
});
