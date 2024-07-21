import express from "express";
import cors from "cors";
import { logs } from "./middlewares/logs.js";
import { routes } from "./routes/_index.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notImplemented } from "./middlewares/notImplemented.js";
import { routesApiV1 } from "./routes/_index.api.v1.routes.js";
import { API_VERSION } from "./utils/apiVersionsEnpoint.js";
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

export { app };
