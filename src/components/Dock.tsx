import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IcBack, IcHome, IcSettings } from './icons'

export default function Dock(){
  const nav = useNavigate()
  const btns:{icon:JSX.Element,label:string,act:()=>void}[] = [
    { icon:<IcBack className="ico"/>, label:'Back', act:()=>nav(-1) },
    { icon:<IcHome className="ico"/>, label:'Home', act:()=>nav('/') },
    { icon:<IcSettings className="ico"/>, label:'Ayarlar', act:()=>nav('/settings') },
  ]
  return (
    <div className="dock">
      {btns.map((b,i)=>(
        <button key={i} className="dockbtn" onClick={b.act}>
          {b.icon}<span className="lbl">{b.label}</span>
        </button>
      ))}
    </div>
  )
}
