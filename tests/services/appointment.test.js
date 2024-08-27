const service = require("../../src/services/appointment.services");

jest.mock("../../src/models/appointment.models");

describe("Appointment", () => {
  it("getNextAvailableAppointmentsService", async () => {
    const {
      getNextAvailableAppointmentsModel,
    } = require("../../src/models/appointment.models");
    getNextAvailableAppointmentsModel.mockResolvedValue({
      error: true,
    });
    const response = await service.getNextAvailableAppointmentsService();
    expect(response).toMatchObject({
      error: true,
    });
  });

  it("scheduleAppointmentService", async () => {
    const {
      getNextAvailableAppointmentsModel,
    } = require("../../src/models/appointment.models");
    getNextAvailableAppointmentsModel.mockResolvedValue({
      error: true,
    });
    const response = await service.scheduleAppointmentService();
    expect(response).toMatchObject({
      error: true,
    });
  });
});
