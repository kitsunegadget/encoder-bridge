const { ipcRenderer } = require("electron");

ipcRenderer.send("request-version");
ipcRenderer.on("get-version", (e, data) => {
    document.getElementById("version").innerHTML = "v" + data;
});