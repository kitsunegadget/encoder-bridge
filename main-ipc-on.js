const {app, ipcMain, dialog} = require('electron')
const storage = require("electron-json-storage");

// get version
ipcMain.on("request-version", (e) => {
    e.sender.send("get-version", app.getVersion());
});

// get exePath from storage
ipcMain.on("request-exePath", (e) => {
    storage.getMany(["qaacDir", "lameDir"], (err, data) => {
        if (err) throw err;
        e.sender.send("get-exePath", data);
    });
});

// set exePath to storage
ipcMain.on("save-qaacPath", (e, path) => {
    storage.set("qaacDir", {qaacDir: path}, (err) => {
        console.log(path);
        if (err) throw err;
    });
});

ipcMain.on("save-lamePath", (e, path) => {
    storage.set("lameDir", {lameDir: path}, (err) => {
        if (err) throw err;
    });
});

// Set Dialog Main process reciever (wish duplicated file after)
ipcMain.on("open-file-dialog", (event) => {
    const options = {
        title: "Select an AudioFile",
        filters: [
            {name: 'Audios', extensions: ['wav', 'mp3', 'mp4', "m4a"]},
            {name: 'All Files', extensions: ['*']}
        ],
        properties: ["openFile"]
    }
    dialog.showOpenDialog(options, (files) => {
        event.sender.send("opened-file", files)
    });
});

ipcMain.on("open-output-dir", (e) => {
    const options = {
        title: "Select Output Directory",
        properties: ["openDirectory"]
    }
    dialog.showOpenDialog(options, (dir) => {
        e.sender.send("send-output-dir", dir);
    });
});

ipcMain.on("open-exe-qaac-dialog", (e) => {
    const options = {
        title: "Select qaac.exe file",
        filters: [
            {name: "EXE", extensions: ["exe"]}
        ],
        properties: ["openFile"]
    }
    dialog.showOpenDialog(options, (files) => {
        e.sender.send("open-exe-qaac", files);
    });
});

ipcMain.on("open-exe-lame-dialog", (e) => {
    const options = {
        title: "Select lame.exe file",
        filters: [
            {name: "EXE", extensions: ["exe"]}
        ],
        properties: ["openFile"]
    }
    dialog.showOpenDialog(options, (files) => {
        e.sender.send("open-exe-lame", files);
    });
});
