import React, { useEffect, useRef, useState } from 'react'

const isElectron =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Electron')

type Props = { url: string }

export default function WebApp({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    if (!isElectron) return
    const webview = ref.current?.querySelector('webview') as any
    if (webview) {
      webview.addEventListener('dom-ready', () => {
        // webview.openDevTools() // istersen
      })
    }
  }, [])

  if (!isElectron) {
    // Tarayıcı tarafı: iframe fallback (çerçeve engellenirse mesaj göster)
    return (
      <div style={{position:'absolute', inset:0}}>
        {!blocked ? (
          <iframe
            src={url}
            style={{border:'none', width:'100%', height:'100%'}}
            onError={() => setBlocked(true)}
          />
        ) : (
          <div style={{display:'grid', placeItems:'center', height:'100%', color:'#8a94a8'}}>
            Bu içerik tarayıcıda gömülü açılamıyor.
            <div style={{marginTop:8}}>Lütfen bu sayfayı <b>Electron uygulamasından</b> kullanın.</div>
          </div>
        )}
      </div>
    )
  }

  // Electron tarafı: webview
  return (
    <div ref={ref} style={{position:'absolute', inset:0}}>
      <webview
        src={url}
        partition="persist:apps"
        allowpopups
        style={{display:'inline-flex', width:'100%', height:'100%'}}
      />
    </div>
  )
}
