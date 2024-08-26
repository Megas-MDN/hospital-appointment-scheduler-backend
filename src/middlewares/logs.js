const logs = (req, _res, next) => {
  console.log(`${req.method} - ${req.url}\n`);
  Object.entries(req.body).length > 0 &&
    console.log(
      `Body Sended::\n${JSON.stringify(req.body, null, 2)}\n--------------\n`,
    );
  next();
};

module.exports = { logs };
