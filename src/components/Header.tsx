import React, { useEffect, useState } from 'react'
import { IcWifi, IcGps, IcBt } from './icons'
import { mock } from '../services/mock'

export default function Header(){
  const [now, setNow] = useState(new Date())
  const [tempC, setTempC] = useState<number>(mock.vehicle.ambientTempC ?? 22)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    const off = mock.onVehicle.on(v => setTempC(v.ambientTempC ?? tempC))
    return () => { clearInterval(t); off() }
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const weekday = now.toLocaleDateString(undefined, { weekday: 'long' })
  const date = now.toLocaleDateString()

  return (
    <div className="header">
      <div /> {/* solda boş spacer — ortayı korur */}
      <div className="clock">
        <span className="time">{time}</span>
        <span className="date">{weekday} • {date}</span>
      </div>
      <div className="right">
        <span className="temp">{Math.round(tempC)}°C</span>
        <IcWifi className="stat-ico"/>
        <IcGps className="stat-ico"/>
        <IcBt className="stat-ico"/>
      </div>
    </div>
  )
}
