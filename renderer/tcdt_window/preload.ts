/**需要在webpack.renderer.config.ts中定义'@'符号 */
import { TCodeGenerateConfig } from '../../src/conf'
import { contextBridge, ipcRenderer } from 'electron'

export type GenerateType = keyof TCodeGenerateConfig;

contextBridge.exposeInMainWorld('tcdtAPI', {
  generateEntityFull: (url: string) => generate(url, 'entityFullPaths'),
  generateEntityPart: (url: string) => generate(url, 'entityPartPaths'),
  generateComponentEnumPart: (url: string) => generate(url, 'componentEnumPartPaths'),
  generateComponentEnumFull: (url: string) => generate(url, 'componentEnumFullPaths'),
  generateComponentCombination: (url: string) => generate(url, 'componentCombinationPaths'),
  generateComponentSingle: (url: string) => generate(url, 'componentSinglePaths'),
  generateInputFull: (url: string) => generate(url, 'dtoInputFullPaths'),
  generateInputPart: (url: string) => generate(url, 'dtoInputPartPaths'),
  generateOutputFull: (url: string) => generate(url, 'dtoOutputFullPaths'),
  generateOutputPart: (url: string) => generate(url, 'dtoOutputPartPaths'),
  generateBillForm: (url: string) => generate(url, 'uiFactoryPaths'),
  singleComponentBatchGenerate: (params: { url: string; name: string; }[],) => generateBatch(params, 'componentSinglePaths'),
  enumComponentBatchGenerate: (params: { url: string; name: string; }[],) => generateBatch(params, 'componentEnumPartPaths'),
  combinationComponentBatchGenerate: (params: { url: string; name: string; }[],) => generateBatch(params, 'componentCombinationPaths'),
  fetchConf: () => ipcRenderer.invoke('tcdt:fetchConf', []),
  saveConf: (confData: any) => ipcRenderer.invoke('tcdt:saveConf', [confData]),
  resetConf: () => ipcRenderer.invoke('tcdt:resetConf', []),
  removeConf: (confData: any) => ipcRenderer.invoke('tcdt:removeConf', [confData]),
  selectPath: (defalutPath: string) => ipcRenderer.invoke('tcdt:selectPath', [defalutPath]),
  findDbTables: (param: any) => ipcRenderer.invoke('tcdt:findDbTables', [param]),
  executeSql: (param: any) => ipcRenderer.invoke('tcdt:executeSql', [param]),
});

const generate = (url: string, generateType: GenerateType) => {
  ipcRenderer.invoke('tcdt:generate', [url, generateType]);
}

const generateBatch = (params: { url: string; name: string; }[], generateType: GenerateType) => {
  ipcRenderer.invoke('tcdt:componentBatchGenerate', [params, generateType]);
}
