const canvas= document.getElementById('drawingCanvas');
const ctx= canvas.getContext('2d');

let coord= {x:0, y:0}
let isDrawing= false;

resizeCanvas();
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
window.addEventListener('resize', resizeCanvas);

function resizeCanvas(){
    ctx.canvas.width= window.innerWidth
    ctx.canvas.height=window.innerHeight;
}

function startDrawing(event){
    isDrawing= false;
    startX= event.clientX-canvas.offsetLeft;
    startY= event.clientY-canvas.offsetTop;
    
}


function stopDrawing(){
    isDrawing=false;
    ctx.beginPath();
}

function draw(event){
    if (!isDrawing) return;
    currentX= event.clientX-canvas.offsetLeft;
    currentY= event.clientY-canvas.offsetTop;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle= color;
    ctx.strokeStyle= color; 
    ctx.linewidth= 4;

   
    ctx.beginPath();
    if (shape==='line'){
        ctx.moveto(startX, startY);
        ctx.lineTo(currentX, currentY);
    }else if(shape==='rectangle'){
        ctx.rect(startX,startY, currentX-startX, currentY-startY);
    }elseif (shape==='circle'){
        const radius= math.sqrt((currentX-startX)**2+(currentY-startY)**2);
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
    }

    ctx.stroke();

    function setShape(newShape){
        shape=newShape;

    }

}