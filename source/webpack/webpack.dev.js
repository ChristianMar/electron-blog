/*eslint-disable*/
var webpack = require('webpack');
const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const common = require('./webpack.common.js');
const createStage = require('./createStage.js');
var path = require('path');
const { spawn } = require('child_process');

module.exports = (env, options) => {
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);
  var rootPath = path.join(__dirname, '..', '..');

  return merge(webpackConfig, {
    entry: path.join(rootPath, 'source', 'app', 'webapp', 'src', 'index.tsx'),
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'electron-main',
    devServer: {
      static: {
        directory: path.join(rootPath, 'source', 'app', 'webapp', 'src'),
      },
      compress: true,
      port: 9000,
      // contentBase: path.join(rootPath, 'source', 'app', 'webapp', 'src'),
      // port: 8080,
      // watchContentBase: true,
      // compress: true,
      // public: 'console.local.com:8080',
      https: true,
      // disableHostCheck: true,
      // historyApiFallback: true,
      // inline: true,
      // disable hot reload
      liveReload: false,
      hot: false,
      onListening: () => {
        spawn('electron', ['.'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', (code) => process.exit(0))
          .on('error', (spawnError) => console.error(spawnError));
      },
    },
    plugins: [
      new webpack.EnvironmentPlugin(webappStageConfig),
      new GitRevisionPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        APP_NAME: webappStageConfig.APP_NAME,
        template: path.join(
          rootPath,
          'source',
          'app',
          'webapp',
          'src',
          'index.html'
        ),
        filename: './index.html',
      }),
    ],
  });
};
