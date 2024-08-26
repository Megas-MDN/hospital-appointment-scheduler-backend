const { validateData } = require("../../src/utils/validateData");

describe("validateData", () => {
  it("should return error message", () => {
    const data = { name: "John" };
    const schema = { name: "string", age: "number" };
    const isValid = validateData({ data, schema });
    expect(isValid).toEqual({
      error: true,
      message: "Missing age field",
      status: 400,
    });
  });

  it("should return error message", () => {
    const data = { name: "John", age: "string" };
    const schema = { name: "string", age: "number" };
    const isValid = validateData({ data, schema });
    expect(isValid).toEqual({
      error: true,
      message: "Invalid age field",
      status: 400,
    });
  });

  it("should return error message", () => {
    const data = { name: "John", age: 25 };
    const schema = { name: "string", age: "number" };
    const isValid = validateData({ data, schema });
    expect(isValid).toEqual({ error: false });
  });
});
