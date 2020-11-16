const canvas = document.getElementById('jsCanvas');//get canvas from html(document) 
const ctx = canvas.getContext('2d');//canvas 의 context 값을 설정 deafault value
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const colors = document.getElementsByClassName("jsColor");

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;//canvas 의 size 를 선언
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'White';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR; //default stroke color and line width 
ctx.lineWidth = 2.5;

function startPainting() {
    painting = true;
}

function stopPainting(){
    painting = false
}

function onMouseMove(e) {//get e = event and get pozition from mousemove.offsetX
    let x = e.offsetX;
    let y = e.offsetY
    console.log(x, y)
    if(!painting){//if stopPainting(painting=false) begenpath 
        ctx.beginPath();//making a new path
        ctx.moveTo(x, y);//x y의 위치로 이동 선 시작좌표
    }
    else{
        ctx.lineTo(x, y);//선 끝 좌표
        ctx.stroke();//그걸 그리는놈  https://stackoverflow.com/questions/51368492/should-one-use-ctx-moveto-before-ctx-lineto 여기 또는 mdn canvasrenderingcontext2d 참조
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(e){
    console.log(e)
    e.preventDefault();

}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(e.target.style.backgroundColor);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
    console.log(e.target.value);
}

if (range){
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick(e){
    console.log(e)
    if (filling ===true) {
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
    console.log(link);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}