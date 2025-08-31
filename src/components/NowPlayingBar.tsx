import React, { useEffect, useState } from 'react'
import { mock, PlayerState } from '../services/mock'

function fmt(sec:number){
  const m = Math.floor(sec/60).toString()
  const s = Math.floor(sec%60).toString().padStart(2,'0')
  return `${m}:${s}`
}

export default function NowPlayingBar(){
  const [p,setP]=useState<PlayerState>(mock.player)

  useEffect(()=>{
    const off = mock.onPlayer.on(setP)
    return () => { off() }          // cleanup void döner
  },[])

  const k = Math.min(100, Math.max(0, (p.position / Math.max(1, p.duration)) * 100))

  return (
    <div className="nowplaying">
      <div className="np-thumb">
        {p.coverUrl
          ? <img src={p.coverUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          : <div style={{fontSize:22}}>🎵</div>}
      </div>

      <div className="np-meta">
        <div className="np-title">{p.title}</div>
        <div className="np-artist">{p.artist}</div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:10,marginLeft:16,minWidth:360}}>
        <div className="np-artist">{fmt(p.position)}</div>
        <div className="progress"><div style={{width:`${k}%`}}/></div>
        <div className="np-artist">{fmt(p.duration)}</div>
      </div>

      <div className="np-ctrls">
        <button className="np-btn" onClick={()=>mock.prev()}>⏮</button>
        {p.isPlaying
          ? <button className="np-btn" onClick={()=>mock.pause()}>⏸</button>
          : <button className="np-btn" onClick={()=>mock.play()}>▶</button>}
        <button className="np-btn" onClick={()=>mock.next()}>⏭</button>
      </div>
    </div>
  )
}
