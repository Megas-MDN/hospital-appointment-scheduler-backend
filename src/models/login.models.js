export const homeLoginModel = () => {
  return {
    home: "login.html",
    root: { root: "public" },
  };
};

export const goLoginModel = async ({ userEmail }) => {
  return {
    user_id: 1,
    userEmail,
    passwordHash:
      "$2b$12$SylWWxOOgp0sSS7Vis0mt.EF12XmrAfgRk9MSVm/uUPJ43sqHTHF.", // password123
  };
};
