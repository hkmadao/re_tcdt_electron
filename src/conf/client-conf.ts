import Store from 'electron-store';
import { dialog } from 'electron';
import { TClientConfig, TCodeGenerateConfig } from './model';

export enum E_NodeEnv {
    DEV = 'dev',
    PROD = 'prod',
}

const cilentDefaultConf: TClientConfig = {
    fgLocal: false,
    tcdtUrl: 'http://127.0.0.1:8800/tcdt/index.html#/devmanager/ComponentData',
    downloadCachePath: "d:\\temp\\cftDownload\\",
}

const store = new Store();
const appDefaultConf: TCodeGenerateConfig = {
    id: 'BGSkOHlXPvZns4Q2DzCsx',
    name: 'conf-1',
    fgActive: true,
    entityFullPaths: [
        {
            id: 'TptnynIL8l8oEovhTRZq1',
            sourceDir: null,
            targetDir: 'd:\\temp\\entityFull\\target',
        }
    ],
    entityPartPaths: [
        {
            id: 'CknDHweKywdp9zVUKyeLg',
            sourceDir: null,
            targetDir: 'd:\\temp\\entityPart\\target',
        }
    ],
    componentCombinationPaths: [
        {
            id: 'ZbNMlfGMvSBL08gxSygkV',
            sourceDir: null,
            targetDir: 'd:\\temp\\componentFull\\target',
        }
    ],
    componentSinglePaths: [
        {
            id: 'mhWTiXocFdTPFLpz44UFI',
            sourceDir: 'org/hkmadao/tcdt/modules/*/*/web',
            targetDir: 'D:\\temp\\componentPart',
        },
        {
            id: '7iGIUJ9NQs8kBpcvhy50m',
            sourceDir: 'org/hkmadao/tcdt/modules/*/*/*.json',
            targetDir: 'D:\\temp\\componentPart',
        },
        {
            id: '9hHTjmG91y8JLdKvLy3lL',
            sourceDir: null,
            targetDir: 'd:\\temp\\componentPart\\target',
        }
    ],
    componentEnumFullPaths: [
        {
            id: 'Ka2ZbCAMDqn7leWrIjFZC',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOFull\\target',
        }
    ],
    componentEnumPartPaths: [
        {
            id: 'b-yRs_cPTVSn-wZ9E1hNa',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOFull\\target',
        }
    ],
    dtoInputFullPaths: [
        {
            id: 'KEAmZC-mL7GHtPnyAKEdG',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOFull\\target',
        }
    ],
    dtoInputPartPaths: [
        {
            id: '2y_cEtWcAug4wXmfpyFyZ',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOPart\\target',
        }
    ],
    dtoOutputFullPaths: [
        {
            id: 'CRxHcqn6BuOXDY79-q_oL',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOFull\\target',
        }
    ],
    dtoOutputPartPaths: [
        {
            id: 'LBcaQnCsQK_1z-8Hb89E0',
            sourceDir: null,
            targetDir: 'd:\\temp\\dtoVOPart\\target',
        }
    ],
    uiFactoryPaths: [
        {
            id: 'kzpJw2A5BflZky0CRCIcv',
            sourceDir: null,
            targetDir: 'd:\\temp\\uiFactory\\target',
        }
    ],
}

export const fetchCodeGenerateConf: () => TCodeGenerateConfig[] = () => {
    if (!store.get("codeGenerateConfList") || (store.get("codeGenerateConfList") as TCodeGenerateConfig[]).length === 0) {
        store.set({ "codeGenerateConfList": [{ ...appDefaultConf, fgActive: true }] });
    }
    return store.get("codeGenerateConfList") as TCodeGenerateConfig[];
}

export const saveCodeGenerateConf: (codeGenerateConf: TCodeGenerateConfig) => TCodeGenerateConfig = (codeGenerateConf) => {
    let confList: TCodeGenerateConfig[] = [];
    if (store.get("codeGenerateConfList")) {
        confList = store.get("codeGenerateConfList") as TCodeGenerateConfig[];
    }
    if (codeGenerateConf.fgActive) {
        confList.forEach(conf => conf.fgActive = false);
    }
    const index = confList.findIndex(conf => conf.id === codeGenerateConf.id);
    if (index === -1) {
        store.set({ "codeGenerateConfList": [...confList, codeGenerateConf] });
        dialog.showMessageBox({ type: 'info', message: "添加配置成功！" });
    } else {
        confList.splice(index, 1, codeGenerateConf);
        store.set({ "codeGenerateConfList": confList });
        dialog.showMessageBox({ type: 'info', message: "保存配置成功！" });
    }
    return codeGenerateConf;
}

export const resetCodeGenerateConf: () => TCodeGenerateConfig[] = () => {
    const defalutConfList: TCodeGenerateConfig[] = [{ ...appDefaultConf, fgActive: true }];
    store.set({ "codeGenerateConfList": defalutConfList });
    dialog.showMessageBox({ type: 'info', message: "恢复默认配置成功！" })
    return defalutConfList;
}

export const removeCodeGenerateConf: (codeGenerateConf: TCodeGenerateConfig) => TCodeGenerateConfig[] = (codeGenerateConf) => {
    let confList: TCodeGenerateConfig[] = [];
    if (store.get("codeGenerateConfList")) {
        confList = store.get("codeGenerateConfList") as TCodeGenerateConfig[];
    }
    const removeConf = confList.find(conf => conf.id === codeGenerateConf.id);
    if (removeConf && removeConf.fgActive) {
        dialog.showErrorBox("删除错误", "不能删除当前激活配置");
        throw new Error("couldn't remove active configuration");
    }
    store.set({ "codeGenerateConfList": confList.filter(conf => conf.id !== codeGenerateConf.id) });
    dialog.showMessageBox({ type: 'info', message: "删除配置成功！" });
    return store.get("codeGenerateConfList") as TCodeGenerateConfig[];
}

export const fetchClientConf: () => TClientConfig = () => {
    if (!store.get("clientConf")) {
        return cilentDefaultConf;
    }
    return store.get("clientConf") as TClientConfig;
}

export const saveClientConf: (clientConfig: TClientConfig, fgReOpen: boolean) => void = (clientConfig: TClientConfig, fgReOpen: boolean) => {
    store.set({ "clientConf": clientConfig });
    if (!fgReOpen) {
        dialog.showMessageBox({ type: 'info', message: "保存配置成功！" })
    }
}

export const resetClientConf: () => TClientConfig = () => {
    store.set({ "clientConf": cilentDefaultConf });
    dialog.showMessageBox({ type: 'info', message: "恢复默认配置成功！" })
    return cilentDefaultConf;
}

export const fetchConf = () => {
    let clientConf: TClientConfig;
    if (!store.get("clientConf")) {
        clientConf = cilentDefaultConf;
    } else {
        clientConf = store.get("clientConf") as TClientConfig;
    }
    let codeGenerateConfList: TCodeGenerateConfig[];
    if (!store.get("codeGenerateConfList")) {
        codeGenerateConfList = [appDefaultConf];
    } else {
        codeGenerateConfList = store.get("codeGenerateConfList") as TCodeGenerateConfig[];
    }
    return {
        clientConf,
        codeGenerateConfList,
    }
}