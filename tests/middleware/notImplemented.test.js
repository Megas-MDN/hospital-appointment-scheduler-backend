const { notImplemented } = require("../../src/middlewares/notImplemented");

describe("notImplemented", () => {
  it("should return error message", () => {
    const err = {};
    const res = {
      status: (status) => ({ send: (message) => ({ body: message, status }) }),
    };
    const response = notImplemented(
      { headers: { authorization: "token" } },
      res,
    );

    expect(response.status).toEqual(501);
    expect(response.body.message).toEqual("Route not implemented");
  });
});
