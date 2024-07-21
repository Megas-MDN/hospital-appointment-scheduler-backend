import bcrypt from "bcrypt";

const genHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const compareHashPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { genHashPassword, compareHashPassword };
