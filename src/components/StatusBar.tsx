import React, { useEffect, useState } from 'react'
import { IcWifi, IcGps, IcBt } from './icons'

export default function StatusBar(){
  const [now,setNow]=useState(new Date())
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[])
  const time = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})

  return (
    <div className="statusbar">
      <div className="badge" style={{display:'flex',gap:10,alignItems:'center'}}>
        <span className="mono">{time}</span><span>•</span>
        <span className="mono">{now.toLocaleDateString()}</span>
      </div>
      <div className="status-right">
        <IcWifi className="stat-ico"/><IcGps className="stat-ico"/><IcBt className="stat-ico"/>
      </div>
    </div>
  )
}
