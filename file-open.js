const {ipcRenderer} = require('electron');

// open audio flie
const selectDirBtn = document.getElementById('button-selectfile');

selectDirBtn.addEventListener("click", (event) => {
    ipcRenderer.send("open-inputfile-dialog");
});

ipcRenderer.on("opened-inputfile", (event, path) => {
    if (path) document.getElementById('selected-file').innerHTML = `${path}`;
});

// default output dir
const outputDir = document.getElementById("output-text");
outputDir.innerHTML = __dirname;

// open output dir
const selectOutDirBtn = document.getElementById("button-fileout");

selectOutDirBtn.onclick = () => {
    ipcRenderer.send("open-output-dir");
};

ipcRenderer.on("send-output-dir", (e, dir) => {
    if (dir) outputDir.innerHTML = dir;
});

// open encoder exe file
const selectEncDirBtnQaac = document.getElementById("button-select-qaac");
const selectEncDirBtnLame = document.getElementById("button-select-lame");

selectEncDirBtnQaac.onclick = () => {
    ipcRenderer.send("open-exe-qaac-dialog");
};

ipcRenderer.on("open-exe-qaac", (e, path) => {
    if (path) {
        document.getElementById("qaac-dir").innerHTML = `${path}`
        ipcRenderer.send("save-qaacPath");
    };
});

selectEncDirBtnLame.onclick = () => {
    ipcRenderer.send("open-exe-lame-dialog");
};

ipcRenderer.on("open-exe-lame", (e, path) => {
    if (path) {
        document.getElementById("lame-dir").innerHTML = `${path}`
        ipcRenderer.send("save-lamePath");
    };
});