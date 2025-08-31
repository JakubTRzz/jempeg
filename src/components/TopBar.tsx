import React from 'react'

declare global { interface Window { api?: any } }

export default function TopBar(){
  return (
    <div className="topbar">
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <div style={{width:10,height:10,borderRadius:20,background:'var(--accent)'}} />
        <span className="badge" style={{fontWeight:700,letterSpacing:.3}}>Headunit</span>
      </div>
      <div style={{display:'flex',gap:6,marginLeft:'auto'}}>
        <button className="btn" onClick={()=>window.api?.window.minimize()}>—</button>
        <button className="btn" onClick={()=>window.api?.window.toggleFull()}>⤢</button>
        <button className="btn" onClick={()=>window.api?.window.close()}>✕</button>
      </div>
    </div>
  )
}
