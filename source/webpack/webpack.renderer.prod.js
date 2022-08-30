/*eslint-disable*/
var webpack = require('webpack');
const { merge } = require('webpack-merge');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const createStage = require('./createStage.js');
var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);
  var rootPath = path.join(__dirname, '..', '..');

  return merge(webpackConfig, {
    mode: 'production',
    target: 'electron-preload',
    entry: path.join(rootPath, 'source', 'app', 'webapp', 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, '../', '../', 'build', 'dist'),
      filename: 'app.min.js',
      publicPath: '/',
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
      new HtmlWebpackPlugin({
        inject: true,
        SCRIPT: `<script src="app.min.js"></script>`,
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
