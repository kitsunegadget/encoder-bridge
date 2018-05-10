const { ipcRenderer } = require("electron");
const storage = require("electron-json-storage");

ipcRenderer.send("request-exePath");
ipcRenderer.on("get-exePath", (e, data) => {
    //console.log(data.qaacDir);
    document.getElementById("qaac-dir").innerHTML = data.qaacDir.qaacDir;
    document.getElementById("lame-dir").innerHTML = data.lameDir.lameDir;
});

document.getElementsByClassName("setting-icon")[0].onclick = (e) => {
    let dummy =  document.getElementsByClassName("dummy");
    let page = document.getElementsByClassName("setting-page");
    let page_inside = document.getElementsByClassName("setting-unit");

    if(e.toElement.innerHTML === "⚙") {
        e.toElement.innerHTML = "✕";
    } else {
        e.toElement.innerHTML = "⚙";
    }
    page[0].classList.toggle("setting-page-toggle");
    page_inside[0].classList.toggle("setting-unit-toggle");
    dummy[0].classList.toggle("dummy-toggle");
};
