'use strict';

const {app, BrowserWindow, Menu, Tray} = require('electron');

var CalenTray = require('./modules/tray');

let win;

function createWindow() {
    win = new BrowserWindow({
        // transparent: true,
        frame: false
    });

    win.loadURL('file://${__dirname}/index.html');

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
    console.log(process.platform);
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});