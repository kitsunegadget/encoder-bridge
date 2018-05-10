const { execFile } = require("child_process");

// start encode function
function MP3_startEncode() {
    let executePath = document.getElementById("lame-dir").innerHTML;
    let parameter = [];
    let inputPath = document.getElementById("selected-file").innerHTML;
    let outPath = document.getElementById("output-text").innerHTML;

    let n = document.getElementById("mp3-radio");
    let radio = n["mp3-input"];
    let mode = 0;

    if(radio.value === "CBR"){
        mode = 0;
    }
    // start encoding
    if(mode == 0){
        let val = document.getElementsByName("mp3-CBRslide")[0].value;
        parameter = parameter.concat("-b", val, inputPath, outPath+"\\_enc.mp3");
        execFile(executePath, parameter, (error, stdout, stderr)=>{
            if(error){
                document.getElementById("info-line").innerHTML = error;
                throw error;
                return;
            }
            console.log(stdout);
            document.getElementById("info-line").innerHTML = "";
        });
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