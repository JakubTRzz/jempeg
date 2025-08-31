import React, { useState } from 'react'
import { mock } from '../services/mock'

export default function Settings() {
  const [kiosk, setKiosk] = useState(false)
  const [dark, setDark] = useState(true)

  return (
    <div>
      <div className="h1" style={{marginBottom:12}}>Ayarlar</div>
      <div className="card" style={{display:'grid', gap:12}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="mono">Kiosk Modu</div>
            <div className="badge">Tam ekran - çerçevesiz</div>
          </div>
          <input type="checkbox" checked={kiosk} onChange={e=>setKiosk(e.target.checked)} />
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="mono">Koyu Tema</div>
            <div className="badge">Arayüz renk düzeni</div>
          </div>
          <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} />
        </div>
        <div>
          <button className="btn" onClick={()=> mock.toggleDemo(false)}>Demo: Durdur</button>
          <button className="btn" onClick={()=> mock.toggleDemo(true)} style={{marginLeft:8}}>Demo: Başlat</button>
        </div>
      </div>
    </div>
  )
}