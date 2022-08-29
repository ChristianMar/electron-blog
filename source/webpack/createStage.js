const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
var path = require('path');
const os = require('os');

module.exports = (env, options) => {
  process.env.STAGE = env;
  var gitRevisionPlugin = new GitRevisionPlugin();
  var rootPath = path.join(__dirname, '..', '..');

  var webappConfig = require(path.join(
    rootPath,
    'source',
    'data',
    'config.webapp'
  ));
  var webappDevConfig = require(path.join(
    rootPath,
    'source',
    'data',
    'dev.config'
  ));
  var webappProdConfig = require(path.join(
    rootPath,
    'source',
    'data',
    'prod.config'
  ));

  var webappStageConfig = {
    dev: JSON.stringify(webappDevConfig),
    prod: JSON.stringify(webappProdConfig),
    NODE_ENV: options.mode,
    STAGE: process.env.STAGE,
    BUILD_TIMESTAMP: Date.now(),
    OS: os.type(),
    DEV_TOOL: env === 'dev' ? options.devtool !== false : false,
  };

  webappConfig.VERSION = gitRevisionPlugin.version();
  webappConfig.COMMIT = gitRevisionPlugin.commithash();
  webappConfig.BRANCH = gitRevisionPlugin.branch();

  Object.assign(webappStageConfig, webappConfig);

  console.log('webappStageConfig', webappStageConfig);

  return webappStageConfig;
};
