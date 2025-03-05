 
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const textInput = document.getElementById('textInput');
const addTextBtn = document.getElementById('addText');
const backgroundColor=document.getElementById('background1');
const backgroundBtn= document.getElementById('setbackground')

let brushColor = '#000000';
let brushWidth = 5;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

function drawBackground() {
  const bgColor = backgroundColor.value
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
 
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = brushColor;
  ctx.lineWidth = brushWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; 
} 
function stopDrawing() {
  isDrawing = false;
} 
colorPicker.addEventListener('input', (e) => {
  brushColor = e.target.value;
});
 
brushSize.addEventListener('input', (e) => {
  brushWidth = e.target.value;
});
backgroundBtn.addEventListener('click', () => {
    alert('your drawing will erase once you change the background');
    drawBackground();  
  }); 
clearBtn.addEventListener('click', () => {
  drawBackground();   
});
 
saveBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'drawing.png';
  link.click();
});
 
addTextBtn.addEventListener('click', () => {
  const text = textInput.value;
  if (text) {
    ctx.font = '20px Arial';
    ctx.fillStyle = brushColor;
    ctx.fillText(text, 100, 100);   
  }
});



