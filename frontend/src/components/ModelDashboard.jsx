import React, { useEffect, useState, useRef } from "react";
import { getMetrics, pushMetric, deployVersion } from "../api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

export default function ModelDashboard({ model }) {
  const [series, setSeries] = useState([]);
  const [live, setLive] = useState(false);
  const timerRef = useRef(null);

  useEffect(()=>{ if(model) load(); return ()=>stopLive(); }, [model]);

  async function load(){
    if(!model) return;
    const data = await getMetrics(model.id);
    setSeries(data.map(p => ({ ts: new Date(p.ts).toLocaleTimeString(), latency: p.latency, throughput: p.throughput, errorRate: p.errorRate })));
  }

  async function push() {
    if(!model) return;
    await pushMetric(model.id, {});
    await load();
  }

  async function goLive(){
    setLive(true);
    timerRef.current = setInterval(async ()=>{ await push(); }, 3000);
  }
  function stopLive(){ setLive(false); if(timerRef.current) clearInterval(timerRef.current); }

  async function deploy(){
    await deployVersion(model.id, `v${Math.floor(Math.random()*10)}.${Math.floor(Math.random()*100)}`);
    // reload model page (simple approach: reload metrics)
    await load();
  }

  if(!model) return <div className="card"><div>Select a model to view metrics</div></div>;

  return (
    <div className="card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h3>{model.name}</h3>
          <div className="small">version {model.version} • deployed {new Date(model.deployedAt).toLocaleString()}</div>
        </div>

        <div style={{display:"flex",gap:8}}>
          <button className="btn" onClick={deploy}>Deploy New Version</button>
          {!live ? <button className="btn-ghost" onClick={goLive}>Start Live</button> : <button className="btn-ghost" onClick={stopLive}>Stop Live</button>}
          <button className="btn-ghost" onClick={push}>Push Metric</button>
        </div>
      </div>

      <div style={{height:320, marginTop:12}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#ff7300" dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="throughput" stroke="#8884d8" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#ff0000" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
