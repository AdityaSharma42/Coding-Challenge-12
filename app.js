const canvas= document.getElementById('drawingCanvas');
const ctx= canvas.getContext('2d');


let isDrawing= false;
let startX, startY;
let shape= 'line';
let color="black"

resizeCanvas();
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
window.addEventListener('resize', resizeCanvas);
document.getElementById('clear').addEventListener('click', clearCanvas);

function resizeCanvas(){
    ctx.canvas.width= window.innerWidth
    ctx.canvas.height=window.innerHeight;
}

function startDrawing(event){
    isDrawing= true;
    startX= event.clientX- canvas.offsetLeft;
    startY= event.clientY- canvas.offsetTop;
    
}


function stopDrawing(){
    isDrawing=false;
    ctx.beginPath();
}

function draw(event){
    if (!isDrawing) return;

    const currentX= event.clientX-canvas.offsetLeft;
    const currentY= event.clientY-canvas.offsetTop;

    ctx.fillStyle= color;
    ctx.strokeStyle= color; 
    ctx.lineWidth= 4;

   
    ctx.beginPath();
    if (shape === 'line'){
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
    }else if(shape ==='rectangle'){
        ctx.rect(startX,startY, currentX-startX, currentY-startY);
    }else if (shape ==='circle'){
        const radius= Math.sqrt((currentX - startX) **2 + (currentY-startY) ** 2);
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    }

    ctx.stroke();

}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
