const model = require("../models/login.models.js");
const bcrypt = require("bcrypt");
const { handlerToken } = require("../utils/myJWT.js");
const { validateData } = require("../utils/validateData.js");

const homeLoginService = () => {
  return model.homeLoginModel();
};

const compareHashPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const goLoginService = async ({ userEmail, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const isValid = validateData({
    data: { userEmail, password },
    schema: { userEmail: "string", password: "string" },
  });

  if (isValid.error) return isValid;

  const user = await model.goLoginModel({ userEmail });
  if (!user) return { error: true, status: 404, message: "User not found" };

  const match = await compareHashPassword(password, user.passwordHash);
  if (!match)
    return { error: true, status: 400, message: "Invalid email or password" };

  const genToken = handlerToken();
  const token = genToken.encode({ user_id: user.user_id, userEmail });
  return { token };
};

module.exports = { homeLoginService, goLoginService };
