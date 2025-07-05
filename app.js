const settingMenu = document.querySelector(".settings");
const DEFAULT_COLOR ='rgb(0, 0, 0)';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE='color';
const colorInput=document.querySelector("input");
let color=DEFAULT_COLOR;
let size=DEFAULT_SIZE;
let mode=DEFAULT_MODE;
settingMenu.addEventListener('click',(event)=>{
    if(event.target.tagName ==='INPUT'){
        event.target.addEventListener("change", ()=>{
            color=event.target.value;
            mode='color'
        });
    }
    else{
        setParameters(event.target.innerText);
    }
});

function setParameters(buttonName){
    switch(buttonName){
        case "Reset":
            clear();
            gridDraw();
            mode=DEFAULT_MODE;
            break;
        case "Grid Size":
            gridSizeInput();
            break;
        case "Color":
            mode='color';
            color=colorInput.value;
            break;
        case "Rainbow":
            mode='rainbow';
            break;
        case "Shade-Light":
            mode='shade light'
            break;
        case "Shade-Dark":
            mode='shade dark'
            break;
    }
}

function gridSizeInput(){
    clear();
    size=+prompt("Enter the grid size: (should be less than 100)");
    while(isNaN(size)||size<=0 || size>100){
        size=+prompt("Enter the grid size: (should be less than 100)");
    }
    gridDraw();
}

function lighten(currentColor){
    currentColor=currentColor.substring(3);
    currentColor=currentColor.substring(1,currentColor.length-1);
    currentColor=currentColor.split(", ");
    let r=+currentColor[0];
    let g=+currentColor[1];
    let b=+currentColor[2];

    r+=25.5
    g+=25.5;
    b+=25.5;
    if(r>=255){
        r=255;
    }
    if(g>=255){
        g=255;
    }
    if(b>=255){
        b=255;
    }
    let newColor=`rgb(${r}, ${g}, ${b})`;
    return newColor;
}

function darken(currentColor){
    currentColor=currentColor.substring(3);
    currentColor=currentColor.substring(1,currentColor.length-1);
    currentColor=currentColor.split(", ");
    let r=+currentColor[0];
    let g=+currentColor[1];
    let b=+currentColor[2];

    r-=25.5
    g-=25.5;
    b-=25.5;
    if(r<=0){
        r=0;
    }
    if(g<=0){
        g=0;
    }
    if(b<=0){
        b=0;
    }
    let newColor=`rgb(${r}, ${g}, ${b})`;
    return newColor;
}

function renderLogic(){
    const sketchPad=document.querySelector(".sketch-pad");
    const colBoxes=document.querySelectorAll(".columns");
    let isDrawing=false;
    sketchPad.addEventListener('mousedown', (e)=>{
        e.preventDefault();
        isDrawing=true;
    })
    sketchPad.addEventListener('mouseup', ()=>{
        isDrawing=false;
    })
    colBoxes.forEach(element => {
        element.addEventListener('mousedown', ()=>{
            isDrawing=true;
        });
        element.addEventListener('mousedown', ()=>{
            isDrawing=true;
        })
        element.addEventListener('mouseenter', ()=>{
            if(isDrawing){
                if(mode==='color'){
                    element.style.backgroundColor=color;
                }
                else if(mode==='rainbow'){
                    let r=Math.floor(255*Math.random());
                    let g=Math.floor(255*Math.random());
                    let b=Math.floor(255*Math.random());
                    element.style.backgroundColor=`rgb(${r},${g},${b})`;
                }
                else if(mode==='shade light'){
                    let currentColor=element.style.backgroundColor;
                    element.style.backgroundColor=lighten(currentColor);
                }
                else{
                    let currentColor=element.style.backgroundColor;
                    element.style.backgroundColor=darken(currentColor);
                }
            }
        })
    });
}

function clear(){
    const sketchPad=document.querySelector(".sketch-pad");
    const rowBoxes=document.querySelectorAll(".rows");
    rowBoxes.forEach(element => {
        sketchPad.removeChild(element);
    });
}

function gridDraw(){
    const sketchPad=document.querySelector(".sketch-pad");
    for(let i=0; i<size; i++){
        let rowBox=document.createElement("div");
        rowBox.classList.add("rows");
        for(let j=0; j<size; j++){
            let colBox=document.createElement("div");
            colBox.classList.add("columns");
            rowBox.appendChild(colBox);
        }
        sketchPad.appendChild(rowBox);
    }
    renderLogic();
}

gridDraw();