import express from "express";
import cors from "cors";
import { routes } from "./routes/_index.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notImplemented } from "./middlewares/notImplemented.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.static("public"));
app.use(routes);
app.use(notImplemented);
app.use(errorHandler);

export { app };
