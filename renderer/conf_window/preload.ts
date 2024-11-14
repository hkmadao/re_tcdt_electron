import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('tcdtAPI', {
  fetchClientConf: () => ipcRenderer.invoke('tcdt:fetchClientConf', []),
  saveClientConf: (confData: any) => ipcRenderer.invoke('tcdt:saveClientConf', [confData]),
  resetClientConf: () => ipcRenderer.invoke('tcdt:resetClientConf', []),
  selectPath: (defalutPath: string) => ipcRenderer.invoke('tcdt:selectPath', [defalutPath]),
});
