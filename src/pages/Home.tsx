import React, { useEffect, useState } from 'react'
import Tile from '../components/Tile'
import { mock } from '../services/mock'
import {
  IcNav,
  IcPhone,
  IcAudio,     // Müzik
  IcVideo,     // YouTube/Video
  IcRadio,
  IcCar,
  IcClimate,
  IcApps,
  IcSettings   // Ayarlar
} from '../components/icons'

export default function Home(){
  const [speed, setSpeed] = useState(mock.vehicle.speedKph)
  const [player, setPlayer] = useState(mock.player)

  useEffect(() => {
    const off1 = mock.onVehicle.on(v => setSpeed(v.speedKph))
    const off2 = mock.onPlayer.on(p => setPlayer(p))
    return () => { off1(); off2() }
  }, [])

  return (
    <div className="page">
      <div className="h1">Uygulamalar</div>

      <div className="tiles">
        <Tile
          icon={<IcNav size={40} />}
          title="Navigasyon"
          subtitle="Harita"
          live={`${speed.toFixed(0)} km/s`}
          onClick={() => location.assign('/nav')}
        />

        <Tile
          icon={<IcPhone size={40} />}
          title="Telefon"
          subtitle="Arama / Rehber"
          onClick={() => location.assign('/phone')}
        />

        <Tile
          icon={<IcAudio size={40} />}
          title="Müzik"
          subtitle="Spotify / Web"
          live={`${player.artist} — ${player.title}`}
          onClick={() => location.assign('/web/spotify')}
        />

        <Tile
          icon={<IcVideo size={40} />}
          title="Video"
          subtitle="YouTube (Web)"
          onClick={() => location.assign('/web/youtube')}
        />

        <Tile
          icon={<IcRadio size={40} />}
          title="Radyo"
          subtitle="FM / İnternet"
          onClick={() => location.assign('/radio')}
        />

        <Tile
          icon={<IcCar size={40} />}
          title="Araç"
          subtitle="Durum & Trip"
          onClick={() => location.assign('/car')}
        />

        <Tile
          icon={<IcClimate size={40} />}
          title="İklim"
          subtitle="Isı / Fan"
          onClick={() => location.assign('/climate')}
        />

        <Tile
          icon={<IcApps size={40} />}
          title="Uygulamalar"
          subtitle="Kısayollar"
          onClick={() => location.assign('/apps')}
        />

        <Tile
          icon={<IcSettings size={40} />}
          title="Ayarlar"
          subtitle="Tema & Sistem"
          onClick={() => location.assign('/settings')}
        />
      </div>
    </div>
  )
}
