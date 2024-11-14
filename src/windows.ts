import { BrowserWindow, Menu, } from 'electron';
import { fetchClientConf } from './conf';
import { tcdtMenu, conMenu, defalutMenu } from './menu';
import log from 'electron-log/main';

//根据forge.config.js配置而来
declare const WELCOME_WINDOW_WEBPACK_ENTRY: string;
declare const WELCOME_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const TCDT_WINDOW_WEBPACK_ENTRY: string;
declare const TCDT_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const CONF_WINDOW_WEBPACK_ENTRY: string;
declare const CONF_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWelcomeWindow = (): void => {
  const welcomeWindow = new BrowserWindow({
    height: 900,
    width: 1440,
    show: false,
    webPreferences: {
      preload: WELCOME_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  const menu = Menu.buildFromTemplate(defalutMenu);
  welcomeWindow.setMenu(menu);
  welcomeWindow.loadFile(`${__dirname}/../renderer/welcome_window/index.html`);

  welcomeWindow.on('ready-to-show', () => {
    welcomeWindow.show();
    log.info('BrowserWindow ready-to-show:', welcomeWindow.id);
  });

  welcomeWindow.on('close', () => {
    log.info('BrowserWindow close:', welcomeWindow.id);
  });
};

export const createConfWindow = (parent: BrowserWindow): void => {
  const confWindow = new BrowserWindow({
    // autoHideMenuBar: true,
    parent: parent,
    modal: true,
    height: 900,
    width: 1440,
    show: false,
    title: 'TCTD',
    icon: `${__dirname}/../public/favicon.png`,
    webPreferences: {
      preload: CONF_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  const menu = Menu.buildFromTemplate(conMenu);
  confWindow.setMenu(menu);
  confWindow.loadFile(`${__dirname}/../renderer/conf_window/index.html`);

  confWindow.on('ready-to-show', () => {
    confWindow.show();
    log.info('BrowserWindow ready-to-show:', confWindow.id);
  });

  confWindow.on('close', () => {
    log.info('BrowserWindow close:', confWindow.id);
  });
};

export const createTcdtWindow = (): void => {
  const modelDriveWindow = new BrowserWindow({
    height: 900,
    width: 1440,
    show: false,
    title: 'TCTD',
    icon: `${__dirname}/../public/favicon.png`,
    webPreferences: {
      preload: TCDT_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  const menu = Menu.buildFromTemplate(tcdtMenu);
  modelDriveWindow.setMenu(menu);

  const clientConf = fetchClientConf();
  if (clientConf.fgLocal) {
    modelDriveWindow.loadFile(`${__dirname}/../renderer/tcdt_window/index.html`);
  } else {
    modelDriveWindow.loadURL(clientConf.tcdtUrl);
  }

  log.info('createCftWindow:', modelDriveWindow.id);

  modelDriveWindow.on('ready-to-show', () => {
    modelDriveWindow.maximize();
    modelDriveWindow.show();
    log.info('BrowserWindow ready-to-show:', modelDriveWindow.id);
  });

  modelDriveWindow.on('close', () => {
    log.info('BrowserWindow close:', modelDriveWindow.id);
  });
  // Open the DevTools.
  // modelDriveWindow.webContents.openDevTools();
};

