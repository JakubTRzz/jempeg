import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  navigate: (path: string) => ipcRenderer.invoke('app:navigate', path),
  onNavigate: (cb: (p: string) => void) => {
    const handler = (_: any, p: string) => cb(p)
    ipcRenderer.on('app:navigate', handler)
    return () => ipcRenderer.removeListener('app:navigate', handler)
  },
  window: {
    close: () => ipcRenderer.invoke('app:close'),
    minimize: () => ipcRenderer.invoke('app:minimize'),
    toggleFull: () => ipcRenderer.invoke('app:toggleFull')
  }
})
