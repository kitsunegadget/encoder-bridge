const {app, BrowserWindow, Notification} = require('electron');
const path = require('path');
const process = require("process");
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

// app setup
app.setAppUserModelId("net.kitunegadget.encoderbridge");
app.setAsDefaultProtocolClient("encoderbridge");
//console.log(Notification.isSupported());
//console.log(app.getPath("userData"));

app.on("ready", () => {
    const modalPath = path.join('file://', __dirname, '/index.html');
    mainWindow = new BrowserWindow({
        width: 600, 
        height: 650,
        minWidth: 550,
        minHeight: 650
    });

    mainWindow.on('closed', () => { mainWindow = null });
    mainWindow.loadURL(modalPath);
    //mainWindow.show()
    //new Notification("test notify");
});

app.on('window-all-closed', () => {
    app.quit();
});

require("./main-ipc-on");