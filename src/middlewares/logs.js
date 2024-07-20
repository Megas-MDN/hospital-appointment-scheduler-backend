export const logs = (req, _res, next) => {
  console.log(`${req.method} - ${req.url}\n`);
  Object.entries(req.body).length > 0 &&
    console.log(`${JSON.stringify(req.body, null, 2)}\n`);
  next();
};
