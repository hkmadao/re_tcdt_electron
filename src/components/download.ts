import { BrowserWindow, dialog } from 'electron';
import { unzip } from './ziputil';
import download from 'download';
import { GenerateType, TSubPath, fetchConf } from '../conf';
import { copyDirectory } from './fileutil';
import path, { sep } from 'path';
import fs from 'fs';
import log from 'electron-log/main';

export function downloadZip(url: string, generateType: GenerateType) {
    // Download the file
    (async () => {
        const { clientConf, codeGenerateConfList } = fetchConf();
        const activeConf = codeGenerateConfList.find(conf => conf.fgActive);
        const oldWins = BrowserWindow.getAllWindows();
        const focusWin = oldWins.find(w => w.isFocused());
        if (!activeConf) {
            dialog.showErrorBox("找不到代码下载配置错误", "找不到激活的配置");
            return;
        }
        const paths = activeConf[generateType] as TSubPath[];
        if (paths) {
            let msg: string;
            if (paths.length === 1) {
                msg = '代码解压到以下目录：\r\n' + paths[0].targetDir;
            } else {
                msg = '代码解压配置多个目录，详情请查看项目配置页面：\r\n' + JSON.stringify(paths, undefined, 2);
            }
            const result = await dialog.showMessageBox(focusWin, {
                buttons: ['取消', '确定'],
                cancelId: 0,
                type: 'info',
                title: '下载提示',
                message: msg,
            });
            if (result.response === 0) {
                return;
            }
        }

        const nowDate = new Date();
        const timeM = nowDate.getTime();
        const downloadZipFileName = timeM + '.zip';
        try {
            await download(url, clientConf.downloadCachePath, { filename: downloadZipFileName });
            unzip(clientConf.downloadCachePath + sep + downloadZipFileName, clientConf.downloadCachePath + sep + timeM);
        } catch (e) {
            log.error(`文件：${clientConf.downloadCachePath + sep + downloadZipFileName}, url: ${url}, error: ${e}`);
            dialog.showErrorBox("下载或解压错误", `文件：${clientConf.downloadCachePath + sep + downloadZipFileName}, error: ${e}`);
            return;
        }

        const toCopyFile = clientConf.downloadCachePath + sep + timeM;
        paths.forEach(confPath => {
            if (confPath.sourceDir) {
                const regExp = confPath.sourceDir
                    .replaceAll('\\', '/') // 文件分隔符转为“/”, 防止与正则表达式“\”造成混乱
                    .replaceAll('.', '\\.')
                    .replaceAll('*', '[A-z|0-9|_|-]{1,}'); // 只支持*号表达式
                copyDirectory(toCopyFile, confPath.targetDir, regExp);
                return;
            }
            copyDirectory(toCopyFile, confPath.targetDir, undefined)
        });
        //删除临时文件
        fs.rmSync(toCopyFile, { force: true, recursive: true })
        dialog.showMessageBox(focusWin, { type: 'info', message: '生成代码成功！' })
    })();
}

/**组件类型 */
export enum EnumComponentType {
    Single = 'Single',
    Combination = 'Combination',
    Enum = 'Enum',
}

export function componentBatchDownloadZip(params: { url: string; name: string; }[], generateType: GenerateType) {
    // Download the file
    (async () => {
        const { clientConf, codeGenerateConfList } = fetchConf();
        const activeConf = codeGenerateConfList.find(conf => conf.fgActive);
        const oldWins = BrowserWindow.getAllWindows();
        const focusWin = oldWins.find(w => w.isFocused());
        if (!activeConf) {
            dialog.showErrorBox("找不到代码下载配置错误", "找不到激活的配置");
            return;
        }
        const paths = activeConf[generateType] as TSubPath[];
        if (paths) {
            let msg: string;
            if (paths.length === 1) {
                msg = '代码解压到以下目录：\r\n' + paths[0].targetDir;
            } else {
                msg = '代码解压配置多个目录，详情请查看项目配置页面：\r\n' + JSON.stringify(paths, undefined, 2);
            }
            const result = await dialog.showMessageBox(focusWin, {
                buttons: ['取消', '确定'],
                cancelId: 0,
                type: 'info',
                title: '下载提示',
                message: msg,
            });
            if (result.response === 0) {
                return;
            }
        }

        const errorList: string[] = [];

        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            const nowDate = new Date();
            const timeM = nowDate.getTime() + "_" + Math.floor(Math.random() * 1000);
            const downloadZipFileName = timeM + '.zip';
            try {
                await download(param.url, clientConf.downloadCachePath, { filename: downloadZipFileName });
                unzip(clientConf.downloadCachePath + sep + downloadZipFileName, clientConf.downloadCachePath + sep + timeM);
            } catch (e) {
                log.error(`文件：${clientConf.downloadCachePath + sep + downloadZipFileName}, url: ${param.url}, error: ${e}`);
                errorList.push(`下载或解压错误, 文件：${clientConf.downloadCachePath + sep + downloadZipFileName}, error: ${e}`)
                continue;
            }

            const toCopyFile = clientConf.downloadCachePath + sep + timeM;
            paths.forEach(confPath => {
                if (confPath.sourceDir) {
                    const regExp = confPath.sourceDir
                        .replaceAll('\\', '/') // 文件分隔符转为“/”, 防止与正则表达式“\”造成混乱
                        .replaceAll('.', '\\.')
                        .replaceAll('*', '[A-z|0-9|_|-]{1,}'); // 只支持*号表达式
                    copyDirectory(toCopyFile, confPath.targetDir, regExp);
                    return;
                }
                copyDirectory(toCopyFile, confPath.targetDir, undefined)
            });
            //删除临时文件
            fs.rmSync(toCopyFile, { force: true, recursive: true })
        }
        if (errorList.length > 0) {
            dialog.showErrorBox("错误信息", errorList.join(";"));
        } else {
            dialog.showMessageBox(focusWin, { type: 'info', message: '生成代码成功！' });
        }
    })();
}