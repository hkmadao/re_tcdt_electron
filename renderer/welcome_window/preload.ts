import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('electronAPI', {
  generatePart: (url: string) => ipcRenderer.invoke('component:generatePart', url)
})
