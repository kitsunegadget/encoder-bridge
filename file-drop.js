// ページのドロップで変移しないように
document.ondragover = (event) => {
    event.stopPropagation();
    event.preventDefault();
};

document.ondrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
};

inputArea = document.getElementById("input-area");
inputArea.ondragover = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    inputArea.style = 'border-style: dashed;';
};

inputArea.ondragleave  = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    inputArea.style = 'border-style: solid;';
};

inputArea.ondrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    inputArea.style = 'border-style: solid;';

    let fileData = event.dataTransfer.files;
    console.log(fileData)
    selectfile = document.getElementById('selected-file');
    //for(let f of fileData){
    let file = fileData[0]; //まだ処理はひとつだけ
    if(['audio/wav','audio/mp3','audio/x-m4a','video/mp4'].includes(file.type)){
        selectfile.innerHTML = file.path;
    };
    //};
};