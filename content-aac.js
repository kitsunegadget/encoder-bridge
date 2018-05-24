const { execFile, spawn } = require("child_process");
const { ipcRenderer } = require("electron");
const fs = require("fs");

// load before status (might as well move to page-init.js?)
document.getElementById("nav-aac").style.color = "#fff";
document.getElementById("nav-aac").style.backgroundColor = "#325088";
document.getElementById("nav-aac").style.borderBottomWidth = "0px";

// start encode function
function AAC_startEncode() {
    let executePath = ipcRenderer.sendSync("get-qaacPath");
    let parameter = [];
    let inputPaths = ipcRenderer.sendSync("get-inputPaths");
    let outPath = ipcRenderer.sendSync("get-outputPath");

    let n = document.getElementById("aac-radio");
    let radio = n["aac-input"];
    let mode = 0;

    if(radio.value === "TrueVBR"){
        mode = 0;
    }

    if(inputPaths === "") {
        document.getElementById("info-line").innerHTML = "Input File not Selected.";
        return;
    }

    document.getElementById("info-line").innerHTML = "";

    // start encoding
    document.getElementsByClassName("dummy")[0].style.zIndex = 10;
    document.getElementsByClassName("dummy")[0].classList.toggle("dummy-toggle");

    // check file exist
    let override = true;
    f = inputPaths[0].split("\\");
    fname = f[f.length-1];
    let pathName = outPath + "\\" + fname;
    try {
        fs.accessSync(pathName + ".m4a");
        pathexist = true;
    } catch(err) {
        pathexist = false;
    }
    if(pathexist) {
        if(confirm(pathName + ".m4a is alredy exist. override?")){
            override = true;
        } else {
            override = false;
        };
    };

    if(!override) {
        document.getElementsByClassName("dummy")[0].style.zIndex = 1;
        document.getElementsByClassName("dummy")[0].classList.toggle("dummy-toggle");
        return;
    };

    if(mode == 0){
        let val = document.getElementsByName("aac-TVBRslide")[0].value;
        parameter = parameter.concat("-V"+val, inputPaths[0], "-o", pathName+".m4a");

        sp = spawn(executePath, parameter);
        sp.stdout.on('data', (data) => {
            //console.log("stdout: " + data.toString());
            document.getElementById("info-line").innerHTML += data.toString() + '<br>';
        });

        sp.stderr.on('data', (data) => {
            //console.log('stderr: ' + data.toString());
            document.getElementById("info-line").innerHTML += data.toString() + '<br>';
            document.getElementById("info-line").scrollTop = document.getElementById("info-line").scrollHeight;
        });
        
        sp.on('exit', (code) => {
            console.log('child process exited with code ' + code.toString());
            document.getElementsByClassName("dummy")[0].style.zIndex = 1;
            document.getElementsByClassName("dummy")[0].classList.toggle("dummy-toggle");
        });
        /*
        execFile(executePath, parameter, (error, stdout, stderr)=>{
            if(error){
                document.getElementById("info-line").innerHTML = error;
                throw error;
                return;
            }
            console.log(stdout);
            document.getElementById("info-line").innerHTML = "";
        });
        */
    };
};

// change tabs
document.getElementById("nav-aac").onclick = (e) => {
    //console.log("change tab aac");
    let aac_inside = document.getElementById("aac-inside");
    if( aac_inside.style.display === "" || aac_inside.style.display === "none"){
        aac_inside.style.display = "block";
        e.toElement.style.backgroundColor = "#325088";
        e.toElement.style.color = "#fff";
        e.toElement.style.borderBottomWidth = "0px";
        document.getElementById("nav-mp3").style.color = "#fff";
        document.getElementById("nav-mp3").style.backgroundColor = "";
        document.getElementById("nav-mp3").style.borderBottomWidth = "1px";
        document.getElementById("mp3-inside").style.display = "none";
    };
};

// slider change
let slider = document.getElementsByName("aac-TVBRslide")[0];
function changeSlide(slider){
    return function(event){
        let slidervalue = document.getElementById("aac_sliderValue");
        slidervalue.innerHTML = slider.value;
    };
};
slider.addEventListener("input", changeSlide(slider));

// start encode button
let start_button = document.getElementById("aac-start");
start_button.onclick = AAC_startEncode;