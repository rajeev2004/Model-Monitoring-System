import React, { useState } from "react";
import ModelList from "./components/ModelList";
import ModelDashboard from "./components/ModelDashboard";

export default function App(){
  const [selected, setSelected] = useState(null);
  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Model Monitoring — Mini</h1>
          <div className="small">Simulated model metrics, live push, and version deploy</div>
        </div>
        <div className="legend">
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
            <div className="small">Demo for TrueFoundry</div>
            <div className="small">Rajeev</div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div>
          <ModelList onSelect={m=>setSelected(m)} />
        </div>
        <div>
          <ModelDashboard model={selected} />
        </div>
      </div>
    </div>
  );
}
