import React from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  subtitle?: string
  live?: string
  onClick?: () => void
}

export default function Tile({ icon, title, subtitle, live, onClick }: Props) {
  const hasLive = !!live && live.trim().length > 0
  return (
    <div className={`tile ${hasLive ? 'has-live' : ''}`} onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
      {hasLive && <div className="live">{live}</div>}
    </div>
  )
}
