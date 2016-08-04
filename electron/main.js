'use strict';

const {app, BrowserWindow, Menu, Tray} = require('electron');

var CalenTray = require('./modules/tray');

let win;

function createWindow() {
    win = new BrowserWindow({
        // frame: false
        width: 2560,
        height: 1600
    });

    win.loadURL(`file://${__dirname}/views/index.html`);
    win.on('closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}

app.on('ready', () => {
    createWindow();
    CalenTray.create(app);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});