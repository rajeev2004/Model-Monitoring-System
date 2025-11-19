import { nanoid } from "nanoid";

/**
 * store = {
 *   models: { id: { id, name, version, deployedAt, status, meta } },
 *   metrics: { modelId: [{ ts: epoch_ms, latency, throughput, errorRate }, ...] }
 * }
 */
const store = {
  models: {},
  metrics: {}
};

export function createModel({ name, version = "v1", meta = {} }) {
  const id = nanoid(8);
  const model = { id, name, version, deployedAt: Date.now(), status: "deployed", meta };
  store.models[id] = model;
  store.metrics[id] = store.metrics[id] || generateInitialTimeseries();
  return model;
}

export function listModels() {
  return Object.values(store.models).sort((a,b) => b.deployedAt - a.deployedAt);
}

export function getModel(id) {
  return store.models[id] || null;
}

export function addMetric(modelId, point) {
  if (!store.metrics[modelId]) store.metrics[modelId] = generateInitialTimeseries();
  store.metrics[modelId].push(point);
  // keep last 288 points (~24h @5min) trim
  if (store.metrics[modelId].length > 1000) store.metrics[modelId].shift();
  return point;
}

export function getMetrics(modelId, since = 0) {
  const arr = store.metrics[modelId] || [];
  if (!since) return arr;
  return arr.filter(p => p.ts >= since);
}

export function deployNewVersion(modelId, version) {
  const m = store.models[modelId];
  if (!m) return null;
  m.version = version;
  m.deployedAt = Date.now();
  m.status = "deployed";
  // optionally seed metrics with baseline shift
  store.metrics[modelId] = generateInitialTimeseries(1 + Math.random()*0.3);
  return m;
}

function generateInitialTimeseries(scale = 1) {
  // generate last 48 points (simulate 1 point per 30 minutes ~ 24h)
  const res = [];
  const now = Date.now();
  for (let i = 48; i > 0; i--) {
    const ts = now - i * 30 * 60 * 1000;
    res.push({
      ts,
      latency: Math.round((50 + Math.random() * 200) * scale),
      throughput: Math.round((5 + Math.random() * 200) * scale),
      errorRate: +(Math.random() * 2).toFixed(2)
    });
  }
  return res;
}

// create some demo models on startup
createModel({ name: "fraud-detect", version: "v1.0" });
createModel({ name: "invoice-ocr", version: "v2.1" });
createModel({ name: "reco-ranker", version: "v1.2" });

export default store;
