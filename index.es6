var app = require('app');
var BrowserWindow = require('browser-window');
var win = null;

app.on('ready', function(){
    win = new BrowserWindow({
        show: false,
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        resizable: false
    });
    win.setAlwaysOnTop(true);
    win.loadURL('file://' + __dirname + '/index.html');
});
