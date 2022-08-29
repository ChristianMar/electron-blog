/*eslint-disable*/
var path = require('path');

module.exports = (env, options) => {
  var rootPath = path.join(__dirname, '..', '..');

  var PATHS = {
    ROOT: rootPath,
    MAIN: path.join(rootPath, 'source', 'app', 'main'),
    WEBAPP: path.join(rootPath, 'source', 'app', 'webapp'),
    UI: path.join(rootPath, 'source', 'app', 'ui'),
  };

  return {
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          include: PATHS.ROOT,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?(\?[a-zA-Z0-9]{1,})?$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'],
      modules: [
        path.resolve(path.join(PATHS.ROOT, 'node_modules')),
        path.resolve(path.join(PATHS.WEBAPP, 'node_modules')),
        path.resolve(path.join(PATHS.MAIN, 'node_modules')),
        path.resolve(path.join(PATHS.UI, 'node_modules')),
      ],
      alias: {
        '@ui': path.resolve(PATHS.UI, 'src'),
        '@main': path.resolve(PATHS.MAIN, 'src'),
      },
    },
  };
};
