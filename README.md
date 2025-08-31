# Headunit Starter (Electron + React)

Bu, araç içi multimedya/baş ünite projemiz için **modern** bir başlangıç iskeleti.
- **Electron**: masaüstü kabuğu (kiosk/frameless destekli)
- **React (TypeScript)**: ön yüz
- **IPC katmanı**: oynatıcı/uygulama yönetimi için arayüz
- **Modüler sayfalar**: Home, Spotify, YouTube, Radio (şimdilik stub)
- **Now Playing bar**: global komponent (stub)

> CAN-GUI projesi **ayrı** kalacak; burası ana headunit uygulaması.

## Başlangıç
1) Klasörü aç:
```
pnpm install
```
2) Geliştirme:
```
pnpm dev
```
3) Build (Windows):
```
pnpm build
```
> İlk sürüm "Spotify/YouTube/Radio" sayfaları **placeholder**. Spotify entegrasyonu için daha sonra API anahtarları ve auth akışını ekleyeceğiz.

## Klasör Yapısı
```
headunit-starter/
├─ package.json
├─ electron/
│  ├─ main.ts
│  └─ preload.ts
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ components/
│  │  ├─ NowPlayingBar.tsx
│  │  └─ TopBar.tsx
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ Spotify.tsx
│  │  ├─ YouTube.tsx
│  │  └─ Radio.tsx
│  └─ styles.css
├─ index.html
├─ tsconfig.json
├─ vite.config.ts
└─ .gitignore
```

## Notlar
- **Kiosk** modunu açmak için `electron/main.ts` içinde `KIOSK=true` yapabilirsin.
- Pencere boyutu 1024x600 (aracımız için tipik); istersen değiştir.
- IPC kanalları: `player:play/pause/next/prev` (stub), `app:navigate`.