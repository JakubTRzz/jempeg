import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IcBack } from './icons'

export default function BackButton(){
  const nav = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  if (isHome) return null
  return (
    <button className="backbtn" title="Geri" onClick={() => nav(-1)}>
      <IcBack width={22} height={22}/>
    </button>
  )
}
