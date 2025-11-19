import axios from "axios";
const base = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const api = axios.create({ baseURL: base });

export async function listModels() {
  const r = await api.get("/api/models");
  return r.data.rows;
}
export async function getMetrics(modelId) {
  const r = await api.get(`/api/metrics/${modelId}`);
  return r.data.rows;
}
export async function pushMetric(modelId, payload) {
  const r = await api.post(`/api/metrics/${modelId}`, payload);
  return r.data;
}
export async function deployVersion(modelId, version) {
  const r = await api.post(`/api/models/${modelId}/deploy`, { version });
  return r.data.model;
}
export async function createModel(name) {
  const r = await api.post(`/api/models`, { name });
  return r.data.model;
}
