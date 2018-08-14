

// tslint:disable-next-line
const find = require('find-up');
require('dotenv-extended').config({
  path: find.sync('.env'),
  defaults: find.sync('.env.defaults'),
});

import electron from 'electron';
import debug from 'electron-debug';
import isDev from 'electron-is-dev';
import http from 'http';
import next from 'next';
import path from 'path';
import url from 'url';
import startServer from './server';

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

const isWindows = process.platform === 'win32';

debug({ enabled: true, showDevTools: true });

const appUrl = async () => {
  if (!isDev) {
    return url.format({
      pathname: 'index.html',
      protocol: 'file:',
      slashes: true,
    });
  }

  const app = next({
    dev: true,
    // TODO: Figure out the proper path.
    dir: path.resolve('...'),
  });

  await app.prepare();

  const server = http.createServer(app.getRequestHandler());

  server.listen(3000, () => {
    // Make sure to stop the server when the app closes
    // Otherwise it keeps running on its own
    electron.app.on('before-quit', () => server.close());
  });
};

let mainWindow;
const restoreMainWindow = async () => {
  await startServer();

  // Create the Application's main menu
  const template = [
    {
      label: 'Application',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            electron.app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      ],
    },
  ];

  electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));

  mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  const handleRedirect = (e, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      e.preventDefault();
      require('electron').shell.openExternal(url);
    }
  };

  mainWindow.webContents.on('will-navigate', handleRedirect);
  mainWindow.webContents.on('new-window', handleRedirect);

  mainWindow.loadURL(await appUrl());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

electron.app.on('window-all-closed', () => {
  electron.app.quit();
});

electron.app.on('activate', () => {
  if (!mainWindow) {
    restoreMainWindow();
  }
});

electron.app.on('ready', () => {
  if (!isDev) {
    electron.protocol.interceptFileProtocol('file', (request, callback) => {
      const reqUrl = request.url.substr(isWindows ? 8 : 7);
      const reqUrlFinal = isWindows
        ? reqUrl.replace(path.parse(reqUrl).root, '')
        : reqUrl;

      callback(path.normalize(path.join(__dirname, reqUrlFinal)));
    });

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }

  restoreMainWindow();
});
