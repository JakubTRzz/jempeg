import React, { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import BackButton from './components/BackButton'
import NowPlayingBar from './components/NowPlayingBar'

declare global { interface Window { api?: any } }

export default function App(){
  const navigate = useNavigate()

  // Electron yönlendirme kanalı (varsa)
  useEffect(()=>{
    const off = window.api?.onNavigate?.((p:string)=>navigate(p))
    return ()=>{ if(typeof off==='function') off() }
  },[navigate])

  // === Home jesti: alttan edge-swipe (80px yukarı) => '/'
  const startY = useRef<number|null>(null)
  const startT = useRef<number>(0)
  useEffect(()=>{
    function onDown(e:PointerEvent){
      const y = e.clientY
      if (y >= window.innerHeight - 24){ // alt kenara yakın başladıysa
        startY.current = y
        startT.current = performance.now()
      }
    }
    function onMove(e:PointerEvent){
      if (startY.current==null) return
      const dy = (startY.current - e.clientY)
      const dt = performance.now() - startT.current
      if (dy > 80 && dt < 800){ // 80px yukarı sürükleme, 0.8sn içinde
        startY.current = null
        navigate('/')
      }
    }
    function onUp(){ startY.current = null }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return ()=>{
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  },[navigate])

  return (
    <div style={{height:'100vh', display:'flex', flexDirection:'column'}}>
      <div className="bg" />
      <Header />
      <BackButton />
      <div style={{flex:1, position:'relative', overflow:'hidden'}}>
        <div className="page">
          <Outlet />
        </div>
      </div>
      <NowPlayingBar />
    </div>
  )
}
