const { execFile, spawn } = require("child_process");
const { ipcRenderer } = require("electron");

// start encode function
function MP3_startEncode() {
    let executePath = ipcRenderer.sendSync("get-lamePath");
    let parameter = [];
    let inputPath = ipcRenderer.sendSync("get-inputPath");
    let outPath = ipcRenderer.sendSync("get-outputPath");

    let n = document.getElementById("mp3-radio");
    let radio = n["mp3-input"];
    let mode = 0;

    if(radio.value === "CBR"){
        mode = 0;
    }

    if(inputPath === "") {
        document.getElementById("info-line").innerHTML = "Input File not Selected.";
        return;
    }

    document.getElementById("info-line").innerHTML = "";

    // start encoding
    document.getElementsByClassName("dummy")[0].style.zIndex = 10;
    document.getElementsByClassName("dummy")[0].classList.toggle("dummy-toggle");
    if(mode == 0){
        let val = document.getElementsByName("mp3-CBRslide")[0].value;
        parameter = parameter.concat("-b", val, inputPath, outPath+"\\_enc.mp3");

        sp = spawn(executePath, parameter);
        sp.stdout.on('data', (data) => {
            console.log("stdout: " + data.toString());
            document.getElementById("info-line").innerHTML += data.toString() + '<br>';
        });

        sp.stderr.on('data', (data) => {
            //console.log('stderr: ' + data.toString());
            document.getElementById("info-line").innerHTML = data.toString();
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
document.getElementById("nav-mp3").onclick = (e) => {
    //console.log("change tab mp3");
    let mp3_inside = document.getElementById("mp3-inside");
    if( mp3_inside.style.display === "" || mp3_inside.style.display === "none"){
        mp3_inside.style.display = "block";
        e.toElement.style.backgroundColor = "#325088";
        e.toElement.style.color = "#fff";
        e.toElement.style.borderBottomWidth = "0px";
        document.getElementById("nav-aac").style.color = "#fff";
        document.getElementById("nav-aac").style.backgroundColor = "";
        document.getElementById("nav-aac").style.borderBottomWidth = "1px";
        document.getElementById("aac-inside").style.display = "none";
    };
};

// slider change
let slider = document.getElementsByName("mp3-CBRslide")[0];
function changeSlide(slider){
    return function(event){
        let slidervalue = document.getElementById("mp3_sliderValue");
        slidervalue.innerHTML = slider.value;
    };
};
slider.addEventListener("input", changeSlide(slider));

// start encode button
let start_button = document.getElementById("mp3-start");
start_button.onclick = MP3_startEncode;