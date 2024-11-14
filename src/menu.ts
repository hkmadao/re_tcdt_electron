import { BrowserWindow, MenuItemConstructorOptions, MessageBoxOptions, app, dialog, shell } from 'electron'
import { createTcdtWindow, createConfWindow, createWelcomeWindow } from './windows'
import log from 'electron-log/main';

export const defalutMenu: MenuItemConstructorOptions[] = [
  {
    label: '文件',
    submenu: [
      {
        label: '打开',
        accelerator: 'Ctrl+O',
        click() {
          log.info("open")
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [{
      label: '撤销',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: '重做',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: '剪切',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: '复制',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: '粘贴',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: '全选',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectAll'
    }]
  },
  {
    label: '查看',
    submenu: [
      {
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (browserWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            browserWindow.reload()
          }
        }
      },
      {
        label: '切换全屏',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            browserWindow.setFullScreen(!browserWindow.isFullScreen())
          }
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        role: 'toggleDevTools',
      },
      {
        type: 'separator'
      },
      {
        label: '应用程序菜单演示',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            const options: MessageBoxOptions = {
              type: 'info',
              title: '应用程序菜单演示',
              buttons: ['好的'],
              message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
            }
            dialog.showMessageBox(browserWindow, options).then((res) => {
              log.info(res);
            });
          }
        }
      },
    ]
  },
  {
    label: '视图',
    role: 'window',
    submenu: [
      {
        label: '欢迎窗口',
        click: function (item, focusedWindow) {
          createWelcomeWindow();
        }
      },
      {
        label: '新窗口',
        // icon: `${__dirname}/../public/favicon.png`,
        click: function (item, focusedWindow) {
          createTcdtWindow();
        }
      },
      {
        label: '配置',
        icon: '',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          createConfWindow(browserWindow);
        }
      },
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        type: 'separator'
      }, {
        label: '重新打开窗口',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        id: 'reopenMenuItem',
        click: function () {
          app.emit('activate')
        }
      }
    ]
  }, 
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '学习更多',
        click: function () {
          shell.openExternal('http://electron.atom.io')
        }
      }
    ]
  }
]

export const tcdtMenu: MenuItemConstructorOptions[] = [
  {
    label: '查看',
    submenu: [
      {
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (browserWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            browserWindow.reload()
          }
        }
      },
      {
        label: '切换全屏',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            browserWindow.setFullScreen(!browserWindow.isFullScreen())
          }
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        role: 'toggleDevTools',
      },
    ]
  },
  {
    label: '视图',
    role: 'window',
    submenu: [
      {
        label: '新窗口',
        // icon: `${__dirname}/../public/favicon.png`,
        click: function (item, focusedWindow) {
          createTcdtWindow();
        }
      },
      {
        label: '配置',
        icon: '',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          createConfWindow(browserWindow);
        }
      },
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '学习更多',
        click: function () {
          shell.openExternal('http://electron.atom.io')
        }
      }
    ]
  }
]

export const conMenu: MenuItemConstructorOptions[] = [
  {
    label: '查看',
    submenu: [
      {
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (browserWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            browserWindow.reload()
          }
        }
      },
      {
        label: '切换全屏',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          let browserWindow = focusedWindow as BrowserWindow;
          if (browserWindow) {
            browserWindow.setFullScreen(!browserWindow.isFullScreen())
          }
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        role: 'toggleDevTools',
      },
    ]
  },
]