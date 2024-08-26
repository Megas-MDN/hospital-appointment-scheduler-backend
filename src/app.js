const express = require("express");
const cors = require("cors");

const { logs } = require("./middlewares/logs.js");
const { routes } = require("./routes/_index.routes.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
const { notImplemented } = require("./middlewares/notImplemented.js");
const { routesApiV1 } = require("./routes/_index.api.v1.routes.js");
const { API_VERSION } = require("./utils/apiVersionsEnpoint.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static("public"));
app.use(logs);
app.use(API_VERSION.V1, routesApiV1);
app.use(routes);
app.use(notImplemented);
app.use(errorHandler);

module.exports = { app };
