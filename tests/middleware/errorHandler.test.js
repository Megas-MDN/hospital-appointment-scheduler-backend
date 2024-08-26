const { errorHandler } = require("../../src/middlewares/errorHandler");

describe("errorHandler", () => {
  it("should return error message", () => {
    expect(errorHandler).toBeDefined();
  });

  it("should return error message", () => {
    const err = {};
    const res = {
      status: (status) => ({ json: (message) => ({ body: message, status }) }),
    };
    const response = errorHandler(err, {}, res, () => {});

    expect(response).toEqual({
      body: { message: "Internal server error" },
      status: 500,
    });
  });
});
