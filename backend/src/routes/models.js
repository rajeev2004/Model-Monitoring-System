import express from "express";
import { createModel, listModels, getModel, deployNewVersion } from "../store.js";
const router = express.Router();

// list
router.get("/", (req, res) => {
  const rows = listModels();
  res.json({ rows });
});

// create
router.post("/", (req, res) => {
  const { name, version, meta } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  const model = createModel({ name, version, meta });
  res.status(201).json({ model });
});

// get
router.get("/:id", (req, res) => {
  const m = getModel(req.params.id);
  if (!m) return res.status(404).json({ error: "not found" });
  res.json({ model: m });
});

// deploy new version
router.post("/:id/deploy", (req, res) => {
  const { version } = req.body;
  const m = deployNewVersion(req.params.id, version || `v${Math.floor(Math.random()*10)}.${Math.floor(Math.random()*10)}`);
  if (!m) return res.status(404).json({ error: "not found" });
  res.json({ model: m });
});

export default router;
