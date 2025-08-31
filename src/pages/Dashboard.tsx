import React, { useEffect, useState } from 'react'
import Tile from '../components/Tile'
import { mock, PlayerState } from '../services/mock'
import { IcCar, IcAudio, IcWifi, IcGps, IcBt, IcClimate } from '../components/icons'

export default function Dashboard(){
  const [speed, setSpeed] = useState<number>(mock.vehicle.speedKph)
  const [tempC, setTempC] = useState<number>(mock.vehicle.ambientTempC)
  const [player, setPlayer] = useState<PlayerState>(mock.player)

  useEffect(() => {
    const offV = mock.onVehicle.on(v => {
      setSpeed(v.speedKph)
      setTempC(v.ambientTempC)
    })
    const offP = mock.onPlayer.on(p => setPlayer(p))
    return () => { offV(); offP() }
  }, [])

  return (
    <div className="page">
      <div className="h1">Gösterge Paneli</div>

      <div className="tiles">
        <Tile
          icon={<IcCar size={40} />}
          title="Araç"
          subtitle="Durum & Trip"
          live={`${speed.toFixed(0)} km/s • ${Math.round(tempC)}°C`}
          onClick={() => location.assign('/car')}
        />

        <Tile
          icon={<IcAudio size={40} />}
          title="Müzik"
          subtitle="Şu an çalan"
          live={`${player.artist} — ${player.title}`}
          onClick={() => location.assign('/web/spotify')}
        />

        <Tile
          icon={<IcClimate size={40} />}
          title="İklim"
          subtitle="Dış ortam"
          live={`${Math.round(tempC)}°C`}
          onClick={() => location.assign('/climate')}
        />

        <Tile
          icon={
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <IcWifi size={22}/><IcGps size={22}/><IcBt size={22}/>
            </div>
          }
          title="Bağlantı"
          subtitle="Durum"
          live={'Wi-Fi • GPS • BT'}
          onClick={() => location.assign('/settings')}
        />
      </div>
    </div>
  )
}
