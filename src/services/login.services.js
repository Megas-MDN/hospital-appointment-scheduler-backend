import * as model from "../models/login.models.js";
import bcrypt from "bcrypt";
import { handlerToken } from "../utils/myJWT.js";
import { validateData } from "../utils/validateData.js";

export const homeLoginService = () => {
  return model.homeLoginModel();
};

const genHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const compareHashPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const goLoginService = async ({ userEmail, password }) => {
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
