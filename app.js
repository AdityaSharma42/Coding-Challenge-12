const canvas= document.getElementById('drawingCanvas'); //this gets the canvas element from HTML
const ctx= canvas.getContext('2d');


let isDrawing= false; //whether the user is drawing or not
let startX, startY; //variables that store the coordinates of where the shape starts getting drawn
let shape= 'line'; //if no shape is selected, it will start drawing with a line
let color="black" 


resizeCanvas();
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);  //adding event listeners for mouse actions
canvas.addEventListener('resize', resizeCanvas);
document.getElementById('clear').addEventListener('click', clearCanvas); //when the button is clicked, the canvas is cleared
document.getElementById('colorPicker').value= color;

function resizeCanvas(){
    ctx.canvas.width= window.innerWidth
    ctx.canvas.height=window.innerHeight; //resizing the canvas
}

function startDrawing(event){
    isDrawing= true; //user is starting to draw
    startX= event.clientX- canvas.offsetLeft; 
    startY= event.clientY- canvas.offsetTop; //calculating the starting coordinates of the x and y coordinates
    
}


function stopDrawing(){ //stop drawing when the mouse button is released.
    isDrawing=false;
    ctx.beginPath();
}

function draw(event){
    if (!isDrawing) return;

    const currentX= event.clientX-canvas.offsetLeft;
    const currentY= event.clientY-canvas.offsetTop;

    ctx.fillStyle= color;
    ctx.strokeStyle= color; 
    ctx.lineWidth= 2;

   
    ctx.beginPath();
    if (shape === 'line'){
        ctx.moveTo(startX, startY); //move to starting coordinates
        ctx.lineTo(currentX, currentY); //draw line to current coordinates
    }else if(shape ==='rectangle'){
        ctx.rect(startX,startY, currentX-startX, currentY-startY);//drawing the rectangle
    }else if (shape ==='circle'){
        const radius= Math.sqrt((currentX - startX) **2 + (currentY-startY) ** 2);
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);//draw a circle using the calculated radius
    }

    ctx.stroke();

}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height); //clear the canvas
}

function setShape(newShape){
    shape=newShape; //updating the shape based on the shape that was selected
}

function setColor(newColor){
    color=newColor; //color selection
}
