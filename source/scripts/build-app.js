const builder = require('electron-builder');
const Platform = builder.Platform;
const log = require('./console-colour.js');
const path = require('path');
const describe = require('./describe');
// data that is taken from here can be found and must be the same for all envs
const data = require(`../data/dev.config`);

const linuxTargets = [
  { target: 'deb', arch: ['x64'] },
  { target: 'rpm', arch: ['x64'] },
];
const winTargets = [{ target: 'nsis', arch: ['x64'] }];
const macTargets = [{ target: 'dmg', arch: ['x64'] }];

/*
  flags:
    so: --mac or --win or --linux
    publish: --publish=always or --publish=never
*/
let flags = process.argv;
let version = '';
let shortVersion = '';
let buildTarget = '';
let buildName = '';
let publish = 'never';

for (let flag of flags) {
  if (!flag.includes('/')) {
    if (flag.includes('--publish=')) {
      publish = flag.replace('--publish=', '');
    } else if (flag.includes('--')) {
      buildTarget = flag;
      buildName = flag.replace('--', '');
    }
  }
}

// Set the current working directory to the app's root.
process.chdir(path.resolve(__dirname, '../', '../'));
log.info(`CWD is: ${process.cwd()}`, buildTarget);

if (buildTarget.length === 0) {
  // We need at least one build target, so let's assume the current platform
  switch (process.platform) {
    case 'darwin':
      buildTarget = '--mac';
      break;
    case 'win32':
      buildTarget = '--win';
      break;
    case 'linux':
      buildTarget = '--linux';
      break;
  }
}

log.info(`STARTING BUILD PROCESS`);

describe()
  .then((result) => {
    version = result;
    shortVersion =
      result.search('-') === -1
        ? result
        : result.substring(0, result.search('-'));

    let config = {
      appId: data.PACKAGE,
      productName: `${data.PROJECT}`,
      copyright: `Copyright © ${new Date().getFullYear()} ${
        data.APP_NAME
      }. All rights reserved`,
      buildVersion: buildName === 'win' ? version.replace('v', '') : version,
      files: ['build', 'node_modules', 'package.json'],
      directories: {
        output: `release-${buildName}`,
        buildResources: 'build',
      },
      // extraMetadata: {
      //   main: 'build/background.min.js',
      // },
      linux: {
        target: linuxTargets,
        artifactName: `${data.PROJECT}${'-${arch}.${ext}'}`,
        icon: 'source/icons/linux',
        category: 'Office',
        maintainer: data.PROJECT,
        vendor: data.PROJECT,
      },
      win: {
        target: winTargets,
        artifactName: `${data.PROJECT}${'-${arch}.${ext}'}`,
        icon: 'source/icons/win/icon.ico',
        legalTrademarks: `Copyright © ${new Date().getFullYear()} ${
          data.APP_NAME
        }. All rights reserved`,
      },
      nsis: {
        oneClick: true,
        perMachine: false,
        allowElevation: true,
        uninstallDisplayName: `${data.PROJECT}`,
        installerIcon: 'source/icons/win/icon.ico',
        // license: 'txt'
      },
      mac: {
        category: 'public.app-category.productivity',
        target: macTargets,
        artifactName: `${data.PROJECT}${'-${arch}.${ext}'}`,
        icon: 'source/icons/mac/icon.icns',
        minimumSystemVersion: '10.6.0',
        hardenedRuntime: true,
        // provisioningProfile: ''
        // type: ''
      },
      dmg: {
        icon: 'source/icons/mac/icon.icns',
      },
    };

    runBuilder()
      .then(() => {
        log.success(
          `Build ${
            data.PROJECT
          }, version ${version}, building for: ${buildTarget}, in folder: release-${buildName}, ${
            publish === 'never' ? '' : 'and publishing'
          } COMPLETE!`
        );
      })
      .catch((err) => {
        log.error('Build failed!');
        log.error(err);
        // We have to exit the process with an
        // error signal for correct behaviour on CI
        process.exit(1);
      });

    async function runBuilder() {
      let target;
      let pattern = new RegExp(/^v\d+(\.\d+)+(\.\d+)$/g);
      if (buildTarget === '--mac') target = Platform.MAC.createTarget();
      if (buildTarget === '--win') target = Platform.WINDOWS.createTarget();
      if (buildTarget === '--linux') target = Platform.LINUX.createTarget();
      if (version === '') {
        log.error('Build failed! Version is required.');
        process.exit(1);
      }
      if (!pattern.test(shortVersion)) {
        log.error('Build failed! Version format is v<major>.<minor>.<patch>');
        process.exit(1);
      }
      await builder.build({
        targets: target,
        config: config,
        publish: publish,
      });
    }
  })
  .catch((err) => {
    log.error(`Build failed! ${err}`);
    process.exit(1);
  });
