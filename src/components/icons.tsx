import React from 'react'
type P = React.SVGProps<SVGSVGElement> & { size?: number }
const S = (p:P)=>({ width:p.size??24, height:p.size??24, ...p })

/* Ana karo ikonları */
export const IcNav = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M12 3l6.5 16.5L12 17l-6.5 2.5L12 3Z" fill="#02b0ff" opacity=".9"/>
    <circle cx="12" cy="12" r="3" fill="#0b0f16" stroke="#9db4cf"/>
  </svg>
)
export const IcPhone = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="#9db4cf" strokeWidth="2"/>
    <circle cx="12" cy="17" r="1" fill="#9db4cf"/>
    <rect x="9" y="6" width="6" height="8" rx="1" fill="#02b0ff" opacity=".9"/>
  </svg>
)
export const IcAudio = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M9 17a2 2 0 1 1-2-2 2 2 0 0 1 2 2Zm10-2a2 2 0 1 1-2 2 2 2 0 0 1 2-2Z" fill="#02b0ff"/>
    <path d="M9 15V6l10-2v9" stroke="#9db4cf" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)
export const IcVideo = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="10" rx="3" fill="#ff3b3b"/>
    <path d="M11 10.5v3l3-1.5-3-1.5Z" fill="#fff"/>
  </svg>
)
export const IcRadio = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="10" rx="2" stroke="#9db4cf" strokeWidth="2"/>
    <path d="M7 13h8" stroke="#02b0ff" strokeWidth="2"/>
    <circle cx="18" cy="13" r="2" fill="#02b0ff"/>
  </svg>
)
export const IcSettings = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#9db4cf" strokeWidth="2"/>
    <path d="M19 12a7 7 0 0 1-.1 1.2l2 1.5-2 3.4-2.3-1a7.5 7.5 0 0 1-2 .9l-.4 2.5h-4l-.4-2.5a7.5 7.5 0 0 1-2-.9l-2.3 1-2-3.4 2-1.5A7 7 0 0 1 5 12a7 7 0 0 1 .1-1.2l-2-1.5 2-3.4 2.3 1a7.5 7.5 0 0 1 2-.9L9.8 2.5h4l.4 2.5a7.5 7.5 0 0 1 2 .9l2.3-1 2 3.4-2 1.5c.1.4.1.8.1 1.2Z" stroke="#3d4a61" strokeWidth="1.2"/>
  </svg>
)
/* ek ikonlar */
export const IcCar = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M4 12l2-5h12l2 5v5a1 1 0 0 1-1 1h-1a2 2 0 1 1 0-4H6a2 2 0 1 1 0 4H5a1 1 0 0 1-1-1v-5Z" stroke="#9db4cf" strokeWidth="2"/>
    <path d="M8 7l1.5-2h5L16 7" stroke="#02b0ff" strokeWidth="2"/>
  </svg>
)
export const IcClimate = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="#9db4cf" strokeWidth="2"/>
    <path d="M12 5v14M5 12h14M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="#02b0ff" strokeWidth="1.6"/>
  </svg>
)
export const IcApps = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="6" height="6" rx="1" fill="#02b0ff"/><rect x="14" y="4" width="6" height="6" rx="1" fill="#9db4cf"/>
    <rect x="4" y="14" width="6" height="6" rx="1" fill="#9db4cf"/><rect x="14" y="14" width="6" height="6" rx="1" fill="#02b0ff"/>
  </svg>
)

/* Durum çubuğu ikonları */
export const IcWifi = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M3 9a14 14 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 15a6 6 0 0 1 6 0" stroke="#9db4cf" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="18" r="1.6" fill="#02b0ff"/>
  </svg>
)
export const IcGps = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="#9db4cf" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="#02b0ff"/>
  </svg>
)
export const IcBt = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18l6-6-6-6 6-6-6 6-6-6" stroke="#9db4cf" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)

/* Dock ikonları */
export const IcHome = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M3 10 12 3l9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-9Z" stroke="#9db4cf" strokeWidth="2"/>
    <path d="M9 21v-6h6v6" stroke="#02b0ff" strokeWidth="2"/>
  </svg>
)
export const IcBack = (p:P)=>(
  <svg {...S(p)} viewBox="0 0 24 24" fill="none">
    <path d="M11 5 4 12l7 7" stroke="#9db4cf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 12H5" stroke="#02b0ff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
