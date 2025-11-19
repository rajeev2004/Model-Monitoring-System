import express from "express";
import { addMetric, getMetrics, getModel } from "../store.js";
const router = express.Router();

// push metric (simulate agent or sidecar posting)
router.post("/:modelId", (req, res) => {
  const { modelId } = req.params;
  const m = getModel(modelId);
  if (!m) return res.status(404).json({ error: "model not found" });
  const ts = Date.now();
  const payload = {
    ts,
    latency: req.body.latency ?? Math.round(60 + Math.random() * 200),
    throughput: req.body.throughput ?? Math.round(5 + Math.random() * 200),
    errorRate: req.body.errorRate ?? +((Math.random()*2).toFixed(2))
  };
  addMetric(modelId, payload);
  res.json({ ok: true, point: payload });
});

// get metrics, optional since epoch ms
router.get("/:modelId", (req, res) => {
  const { modelId } = req.params;
  const since = req.query.since ? parseInt(req.query.since) : 0;
  const arr = getMetrics(modelId, since);
  res.json({ rows: arr });
});

export default router;
