import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'node:path'

const KIOSK = false
let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    frame: false,           // kendi topbar'ımız
    kiosk: KIOSK,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true      // <webview> için gerekli
      // win.webContents.openDevTools({ mode: 'detach' })
    }
  })

  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) win.loadURL(devUrl)
  else win.loadFile(path.join(process.cwd(), 'dist', 'index.html'))

  // debug istersen:
  // win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/** pencere kontrolleri */
ipcMain.handle('app:close', () => { win?.close() })
ipcMain.handle('app:minimize', () => { win?.minimize() })
ipcMain.handle('app:toggleFull', () => {
  if (!win) return
  win.setFullScreen(!win.isFullScreen())
})

/** yönlendirme (renderer tarafındaki router'a) */
ipcMain.handle('app:navigate', (_evt, route: string) => {
  win?.webContents.send('app:navigate', route)
})
