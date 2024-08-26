const { handlerToken } = require("../../src/utils/myJWT");

describe("myJWT", () => {
  it("should return false when jwt is invalid", () => {
    const genToken = handlerToken();
    expect(genToken.decode("invalid.jwt.token")).toBe(false);
  });

  it("should return false when jwt is expired", async () => {
    const genToken = handlerToken("JWT_SECRET", 1);
    const token = genToken.encode({
      user_id: 1,
    });

    jest.spyOn(Math, "floor").mockReturnValue(new Date().getTime() / 1000 + 1);
    expect(genToken.decode(token)).toBe(false);
  });

  it("should return valid token", async () => {
    const genToken = handlerToken();
    const token = genToken.encode({
      user_id: 1,
    });

    expect(genToken.decode(token)).toHaveProperty("user_id", 1);
  });

  it("should return valid token", async () => {
    const genToken = handlerToken("secret", 0);
    const token = genToken.encode({
      user_id: 1,
    });

    expect(genToken.decode(token)).toHaveProperty("user_id", 1);
  });
});
