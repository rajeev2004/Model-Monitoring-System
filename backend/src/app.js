import express from "express";
import cors from "cors";

import modelsRouter from "./routes/models.js";
import metricsRouter from "./routes/metrics.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, service: "model-monitoring-backend" }));

app.use("/api/models", modelsRouter);
app.use("/api/metrics", metricsRouter);

export default app;
