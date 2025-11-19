import React, { useEffect, useState } from "react";
import { listModels, createModel } from "../api";

export default function ModelList({ onSelect }) {
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");

  useEffect(()=>{ load(); }, []);

  async function load(){
    const r = await listModels();
    setRows(r);
  }

  async function add(){
    if(!name) return;
    await createModel(name);
    setName("");
    load();
  }

  return (
    <div className="card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3>Models</h3>
      </div>

      <div style={{marginTop:10, marginBottom:8}}>
        <input placeholder="New model name" value={name} onChange={e=>setName(e.target.value)} style={{width:"100%",padding:8,borderRadius:6,border:"1px solid #e5e7eb"}} />
        <div style={{marginTop:8,display:"flex",gap:8}}>
          <button className="btn" onClick={add}>Create</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        {rows.map(m => (
          <div className="model-row" key={m.id}>
            <div>
              <div style={{fontWeight:600}}>{m.name}</div>
              <div className="small">version {m.version} • {new Date(m.deployedAt).toLocaleString()}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <button className="btn-ghost" onClick={()=>onSelect(m)}>Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
