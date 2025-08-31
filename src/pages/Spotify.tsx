import React from 'react'

export default function Spotify() {
  return (
    <div>
      <div className="h1" style={{marginBottom:12}}>Spotify</div>
      <p>Buraya Spotify Web API/OAuth akışı eklenecek. (stub)</p>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" onClick={() => window.api?.player.play()}>Play</button>
        <button className="btn" onClick={() => window.api?.player.pause()}>Pause</button>
        <button className="btn" onClick={() => window.api?.player.next()}>Next</button>
      </div>
    </div>
  )
}