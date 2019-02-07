import 'reflect-metadata';
import { container } from './container';
import { Webpack } from './services/Webpack';

const webpack = container.get(Webpack);
module.exports = [
  webpack.getClientConfig().getConfig(),
  webpack.getServerConfig().getConfig(),
  webpack.getAppConfig().getConfig(),
];
