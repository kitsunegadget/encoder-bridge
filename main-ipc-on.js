const {app, ipcMain, dialog} = require('electron')
const storage = require("electron-json-storage");

let qaacPath = "";
let lamePath = "";
let inputPath = "";
let outputDir = __dirname;
let outputName = "";

// get version
ipcMain.on("request-version", (e) => {
    e.sender.send("get-version", app.getVersion());
});

// get exePath from storage
ipcMain.on("request-exePath", (e) => {
    storage.getMany(["qaacDir", "lameDir"], (err, data) => {
        if (err) throw err;
        qaacPath = data.qaacDir.qaacDir[0];
        lamePath = data.lameDir.lameDir[0];
        e.sender.send("get-exePath", data);
    });
});

// set exePath to storage
ipcMain.on("save-qaacPath", (e) => {
    storage.set("qaacDir", {qaacDir: qaacPath}, (err) => {
        console.log(qaacPath);
        if (err) throw err;
    });
});

ipcMain.on("save-lamePath", (e) => {
    storage.set("lameDir", {lameDir: lamePath}, (err) => {
        if (err) throw err;
    });
});

// Set Dialog Main process reciever
ipcMain.on("open-exe-qaac-dialog", (e) => {
    const options = {
        title: "Select qaac.exe file",
        filters: [
            {name: "EXE", extensions: ["exe"]}
        ],
        properties: ["openFile"]
    }
    dialog.showOpenDialog(options, (files) => {
        qaacPath = files;
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
        lamePath = files;
        e.sender.send("open-exe-lame", files);
    });
});

ipcMain.on("open-inputfile-dialog", (event) => {
    const options = {
        title: "Select an AudioFile",
        filters: [
            {name: 'Audios', extensions: ['wav', 'mp3', 'mp4', "m4a"]},
            {name: 'All Files', extensions: ['*']}
        ],
        properties: ["openFile"]
    }
    dialog.showOpenDialog(options, (files) => {
        inputPath = files;
        event.sender.send("opened-inputfile", files)
    });
});

ipcMain.on("open-output-dir", (e) => {
    const options = {
        title: "Select Output Directory",
        properties: ["openDirectory"]
    }
    dialog.showOpenDialog(options, (dir) => {
        outputDir = dir;
        e.sender.send("send-output-dir", dir);
    });
});

// sendSync send path. ex. when start enc
ipcMain.on("get-qaacPath", (e) => {
    //console.log(qaacPath);
    e.returnValue = qaacPath;
});

ipcMain.on("get-lamePath", (e) => {
    //console.log(lamePath);
    e.returnValue = lamePath;
});

ipcMain.on("get-inputPath", (e) => {
    //console.log(inputPath);
    e.returnValue = inputPath;
});

ipcMain.on("get-outputPath", (e) => {
    console.log(outputDir);
    e.returnValue = outputDir;
});