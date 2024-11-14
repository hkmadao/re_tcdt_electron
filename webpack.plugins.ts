import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const CopyPluginInstance = new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, './public/'),
      to: path.resolve(__dirname, './.webpack/public/')
    },
    {
      from: path.resolve(__dirname, './renderer/conf_window/index.css'),
      to: path.resolve(__dirname, './.webpack/renderer/conf_window/index.css')
    },
    {
      from: path.resolve(__dirname, './renderer/welcome_window/index.css'),
      to: path.resolve(__dirname, './.webpack/renderer/welcome_window/index.css')
    },
  ]
});

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  CopyPluginInstance,
];
