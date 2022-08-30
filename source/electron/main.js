const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 768,
    minHeight: 560,
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      paintWhenInitiallyHidden: true,
      webSecurity: true,
      plugins: true,
      javascript: true,
    },
  });

  console.log('argv', process.argv);

  mainWindow.loadURL(
    isDev
      ? 'https://localhost:9000'
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.on('close', () => {
    mainWindow.webContents.send('close_window');
  });

  mainWindow.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.on(
  'certificate-error',
  function (event, webContents, url, error, certificate, callback) {
    event.preventDefault();
    callback(true);
  }
);

app.on('ready', () => {
  createWindow();
});

app.whenReady().then(() => {
  // https://github.com/electron/electron/issues/18397
  app.allowRendererProcessReuse = false;
});

ipcMain.handle('closeWindow', () => {
  mainWindow.close();
});
