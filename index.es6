'use strict';

const electron = require('electron');
var app = require('app');
var BrowserWindow = require('browser-window');
var win = null;
var externaldisplay = null;
const globalShortcut = electron.globalShortcut;

app.on('ready', function() {
    var screen = require('screen');
    var displays = screen.getAllDisplays();
    var externalDisplay = null;
    for (var i in displays) {
        if (displays[i].bounds.x > 0 || displays[i].bounds.y > 0) {
            externalDisplay = displays[i];
            break;
        }
    }

    if (externalDisplay) {

        // Should be calculated by box(dimensions).
        externaldisplay = new BrowserWindow({
            x: externalDisplay.bounds.x + ((externalDisplay.bounds.x + 200) / 2),
            y: externalDisplay.bounds.y + ((externalDisplay.bounds.y + 900 / 2)),
            show: false,
            width: 400,
            frame: false,
            transparent: true,
            resizable: false
        });

        externaldisplay.setAlwaysOnTop(true);
        externaldisplay.loadURL('file://' + __dirname + '/index.html');
    }

    win = new BrowserWindow({
        show: false,
        width: 400,
        frame: false,
        transparent: true,
        resizable: false
    });

    win.setAlwaysOnTop(true);
    win.loadURL('file://' + __dirname + '/index.html');

    // Register closing window shortcut listener.
    var ret = globalShortcut.register('ctrl+alt+x', function() {
        if (externaldisplay && externaldisplay.isVisible()) {
            console.log(`global shortcut hide window:${externaldisplay.isVisible()}`);
            externaldisplay.hide();
        }

        if (win && win.isVisible()) {
            win.hide();
        }
    });

    if (!ret) {
        console.log('registration failed ctrl+alt+x');
        process.exit();
    }

    // Register closing application shortcut.
    var ret = globalShortcut.register('ctrl+alt+q', function() {
        console.log(`global shortcut close application`);
        app.exit(0);
    });

    if (!ret) {
        console.log('registration failed ctrl+alt+q');
        process.exit();
    }
});
