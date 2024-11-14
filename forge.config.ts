import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'Template Code Design Tools',
    icon: '',
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({
    setupIcon: '',
  }), new MakerZIP({}, ['darwin']), new MakerRpm({
    options: {
      icon: '',
    }
  }), new MakerDeb({
    options: {
      icon: '',
    }
  })],
  plugins: [
    new WebpackPlugin({
      port: 3001,
      loggerPort: 9000,
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './renderer/welcome_window/index.html',
            js: './renderer/welcome_window/renderer.ts',
            name: 'welcome_window',
            preload: {
              js: './renderer/welcome_window/preload.ts',
            },
          },
          {
            html: './renderer/tcdt_window/index.html',
            js: './renderer/tcdt_window/renderer.ts',
            name: 'tcdt_window',
            preload: {
              js: './renderer/tcdt_window/preload.ts',
            },
          },
          {
            html: './renderer/conf_window/index.html',
            js: './renderer/conf_window/renderer.ts',
            name: 'conf_window',
            preload: {
              js: './renderer/conf_window/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
