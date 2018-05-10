const { execFile } = require("child_process");

// load before status (might as well depulicate file?)
document.getElementById("nav-aac").style.color = "#fff";
document.getElementById("nav-aac").style.backgroundColor = "#325088";
document.getElementById("nav-aac").style.borderBottomWidth = "0px";

// start encode function
function AAC_startEncode() {
    let executePath = document.getElementById("qaac-dir").innerHTML;
    let parameter = [];
    let inputPath = document.getElementById("selected-file").innerHTML;
    let outPath = document.getElementById("output-text").innerHTML;

    let n = document.getElementById("aac-radio");
    let radio = n["aac-input"];
    let mode = 0;

    if(radio.value === "TrueVBR"){
        mode = 0;
    }
    // start encoding
    if(mode == 0){
        let val = document.getElementsByName("aac-TVBRslide")[0].value;
        parameter = parameter.concat("-V"+val, inputPath, "-o", outPath+"\\_enc.m4a");
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