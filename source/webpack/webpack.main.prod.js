/*eslint-disable*/
var webpack = require('webpack');
const { merge } = require('webpack-merge');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const common = require('./webpack.common.js');
const createStage = require('./createStage.js');
var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);

  return merge(webpackConfig, {
    mode: 'production',
    target: 'electron-main',
    entry: path.resolve(__dirname, '../', 'electron', 'main.js'),
    output: {
      path: path.resolve(__dirname, '../', '../', 'build'),
      filename: 'background.min.js',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(webappStageConfig),
      new GitRevisionPlugin(),
    ],
  });
};
