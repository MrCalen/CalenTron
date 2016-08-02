'use strict';

let tray = null;
const path = require('path');
const electron = require('electron');

exports.create = (app) => {

    const iconPath = __dirname + '/../assets/logo.png';
    console.log(iconPath);
    tray = new electron.Tray(iconPath);
    const contextMenu = electron.Menu.buildFromTemplate([]);
    tray.setToolTip('Calen Processing');
    tray.setContextMenu(contextMenu);
};