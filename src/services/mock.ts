export type PlayerState = {
  title: string
  artist: string
  position: number
  duration: number
  isPlaying: boolean
  coverUrl?: string
}

export type VehicleState = {
  speedKph: number
  ambientTempC: number   // dış sıcaklık °C
}

type Fn<T> = (v: T) => void
function createBus<T>(state: T) {
  const subs = new Set<Fn<T>>()
  return {
    get: () => state,
    set: (patch: Partial<T>) => {
      Object.assign(state, patch)
      subs.forEach(fn => fn({ ...state }))
    },
    on: (fn: Fn<T>) => {
      subs.add(fn)
      fn({ ...state })
      return () => { subs.delete(fn) }
    },
  }
}

const playerInit: PlayerState = {
  title: 'Demo Parça',
  artist: 'Demo Sanatçı',
  position: 202,
  duration: 240,
  isPlaying: true,
  coverUrl:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
         <defs><linearGradient id="g" x1="0" x2="1">
           <stop offset="0" stop-color="#151b26"/><stop offset="1" stop-color="#0f141d"/>
         </linearGradient></defs>
         <rect width="100%" height="100%" fill="url(#g)"/>
         <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
               font-family="Inter, Arial" font-size="28" fill="#02b0ff">♪</text>
       </svg>`
    ),
}

const vehicleInit: VehicleState = {
  speedKph: 62,
  ambientTempC: 24
}

const playerBus = createBus<PlayerState>(playerInit)
const vehicleBus = createBus<VehicleState>(vehicleInit)

/* süre/hız/sıcaklık animasyonu */
setInterval(() => {
  const p = playerBus.get()
  if (p.isPlaying) playerBus.set({ position: Math.min(p.duration, p.position + 1) })

  const v = vehicleBus.get()
  const t = Date.now()/1000
  const wobble = 2 * Math.sin(t/3)
  const tempWobble = 0.15 * Math.sin(t/10)
  vehicleBus.set({
    speedKph: Math.max(0, v.speedKph + wobble),
    ambientTempC: v.ambientTempC + tempWobble
  })
}, 1000)

export const mock = {
  get player() { return playerBus.get() },
  get vehicle() { return vehicleBus.get() },
  onPlayer: { on: playerBus.on },
  onVehicle: { on: vehicleBus.on },
  play()  { playerBus.set({ isPlaying: true }) },
  pause() { playerBus.set({ isPlaying: false }) },
  next()  { const p = playerBus.get(); playerBus.set({ position: Math.min(p.duration, p.position + 15) }) },
  prev()  { const p = playerBus.get(); playerBus.set({ position: Math.max(0, p.position - 15) }) },
}
