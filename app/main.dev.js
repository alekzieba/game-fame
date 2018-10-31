/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { google } from 'googleapis';
import http from 'http';
import querystring from 'querystring';
import url from 'url';
import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

// Sign in with Google
ipcMain.on('signin:google', () => {
  let oAuth2Client;

  const server = http
    .createServer(async (req, res) => {
      if (req.url.indexOf('/oauth2callback') > -1) {
        // acquire the code from the querystring, and close the web server.
        const qs = querystring.parse(url.parse(req.url).query);
        console.log(`Code is ${qs.code}`);
        res.end('Authentication successful! Please return to the console.');
        server.close();
        // authWindow.close();

        // Now that we have the code, use that to acquire tokens.
        const r = await oAuth2Client.getToken(qs.code);
        // Make sure to set the credentials on the OAuth2 client.
        // oAuth2Client.setCredentials(r.tokens);
        console.log(r.tokens);
        mainWindow.webContents.send('signin:google', r);
        // resolve(oAuth2Client);
      }
    })
    .listen(0, () => {
      // open the browser to the authorize url to start the workflow
      const redirectUri = `http://localhost:${
        server.address().port
      }/oauth2callback`;
      oAuth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        redirectUri
      });
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'https://www.googleapis.com/auth/contacts.readonly']
      });

      // Load URL in web browser
      shell.openExternal(authorizeUrl);

      // authWindow = new BrowserWindow({
      //   width: 500,
      //   height: 500
      // });
      // authWindow.loadURL(authorizeUrl);
      // authWindow.on('closed', () => {
      //   authWindow = null;
      //   server.close();
      // });
    });
});
