import { dialog } from 'electron';

export const openDialog = async (defalutPath: string) => {
  const result = await dialog.showOpenDialog(undefined, {
    properties: ['openDirectory'],
    title: '选择目录',
    defaultPath: defalutPath,
  })
  return result;
}