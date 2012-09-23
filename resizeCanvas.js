var isResizeWidth=false;
var isResizeHeight=false;
var isResizeBoth=false;


function initializeResize(){
		canvasResizeRight = document.getElementById('canvasResizeRight');
		ctxResizeRight=canvasResizeRight.getContext('2d');
	
		canvasResizeBottom = document.getElementById('canvasResizeBottom');
		ctxResizeBottom=canvasResizeBottom.getContext('2d');

		canvasResizeBoth = document.getElementById('canvasResizeBoth');
		ctxResizeBoth=canvasResizeBoth.getContext('2d');
		
		ctxResizeBottom.fillStyle = "rgb(220,220,220)";
		ctxResizeRight.fillStyle = "rgb(220,220,220)";
		ctxResizeBoth.fillStyle = "rgb(220,220,220)";
		
	
		}
var deltaResize;
var deltaResize1;

function resizeCanvasWidth(){
	if(isResizeWidth){
		if(resizeBuffer1>canvasMaxSizeX) 
			{ canvas.width= canvasMaxSizeX;}
		else
		canvas.width= 	resizeBuffer1;
		ctx.fillStyle = "rgb(220,220,220)";
		ctx.fillRect(0 , 0 , canvas.width , canvas.height);
		}
		
	if(isResizeHeight){
		if(resizeBuffer2>canvasMaxSizeY) 
			{ canvas.height= canvasMaxSizeY;}
		else
		canvas.height= 	resizeBuffer2;
		ctx.fillStyle = "rgb(220,220,220)";
		ctx.fillRect(0 , 0 , canvas.width , canvas.height);
		}
	if(isResizeBoth){
			if(resizeBuffer1>canvasMaxSizeX) 
			{ canvas.width= canvasMaxSizeX;}
		else
		canvas.width= 	resizeBuffer1;
		ctx.fillStyle = "rgb(220,220,220)";
		ctx.fillRect(0 , 0 , canvas.width , canvas.height);
		if(resizeBuffer2>canvasMaxSizeY) 
			{ canvas.height= canvasMaxSizeY;}
		else
		canvas.height= 	resizeBuffer2;
		ctx.fillStyle = "rgb(220,220,220)";
		ctx.fillRect(0 , 0 , canvas.width , canvas.height);
		}
}
		
function resizeCanvas(e){
	if(isResizeWidth){
						resizeBuffer1=e.clientX-deltaResize;
			}
	if(isResizeHeight){
						resizeBuffer2=e.clientY-deltaResize;
			}
	if(isResizeBoth){
		resizeBuffer1=e.clientX-deltaResize;
		resizeBuffer2=e.clientY-deltaResize1;
		}
}
statRenderResize=true;
function renderResize(){
	if(statRenderResize){
		canvasResizeRight.style.left= canvas.offsetLeft+canvas.width+"px";
		canvasResizeRight.style.top= canvas.offsetTop-10+"px";
		canvasResizeBottom.style.left= canvas.offsetLeft-10+"px";
		canvasResizeBottom.style.top= canvas.offsetTop+canvas.height+"px";
		canvasResizeBoth.style.left= canvas.offsetLeft+canvas.width+"px";
		canvasResizeBoth.style.top= canvas.offsetTop+canvas.height+"px";
		statRenderResize=false;
	}
	canvasResizeRight.onmousedown = function(e){
	isResizeWidth=true;
	deltaResize=e.clientX-canvas.width-20+canvas.offsetLeft;}
	
	canvasResizeBottom.onmousedown = function(e){
	isResizeHeight=true;
	deltaResize=e.clientY-canvas.height-20+canvas.offsetTop;}
	
	canvasResizeBoth.onmousedown = function(e){
	isResizeBoth=true;
	deltaResize=e.clientX-canvas.width+canvas.offsetLeft;
	deltaResize1=e.clientY-canvas.height+canvas.offsetTop;}
	
	if(isResizeWidth){
	if(canvas.width>canvasMaxSizeX){
	canvasResizeRight.style.left=canvasMaxSizeX+"px";
	canvasResizeBoth.style.left=canvasMaxSizeX+"px";
	canvasResizeBottom.width=canvasMaxSizeX+10;}
	else{
	 canvasResizeRight.style.left=canvas.offsetLeft+canvas.width+"px";
	 canvasResizeBoth.style.left=canvas.offsetLeft+canvas.width+"px";
	 canvasResizeBottom.width=canvas.width+10;}
	 }
	 
	 if(isResizeHeight){
	if(canvas.offsetTop+canvas.height>canvasMaxSizeY){
	canvasResizeBottom.style.top=canvasMaxSizeY+"px";
	canvasResizeBoth.style.top=canvasMaxSizeY+"px";
	canvasResizeRight.height=canvasMaxSizeY+10;}
	else{
	 canvasResizeBottom.style.top=canvas.offsetTop+canvas.height+"px";
	 canvasResizeBoth.style.top=canvas.offsetTop+canvas.height+"px";
	 canvasResizeRight.height=canvas.height+10;}
	 }
	 
	 	if(isResizeBoth){
	 		
	 		if(canvas.width>canvasMaxSizeX){
	canvasResizeRight.style.left=canvasMaxSizeX+"px";
	canvasResizeBoth.style.left=canvasMaxSizeX+"px";
	canvasResizeBottom.width=canvasMaxSizeX+10;}
	else{
	 canvasResizeRight.style.left=canvas.offsetLeft+canvas.width+"px";
	 canvasResizeBoth.style.left=canvas.offsetLeft+canvas.width+"px";
	 canvasResizeBottom.width=canvas.width+10;}
	 
			if(canvas.offsetTop+canvas.height>canvasMaxSizeY){
	canvasResizeBottom.style.top=canvasMaxSizeY+"px";
	canvasResizeBoth.style.top=canvasMaxSizeY+"px";
	canvasResizeRight.height=canvasMaxSizeY+10;}
	else{
	 canvasResizeBottom.style.top=canvas.offsetTop+canvas.height+"px";
	 canvasResizeBoth.style.top=canvas.offsetTop+canvas.height+"px";
	 canvasResizeRight.height=canvas.height+10;}
	 }
	ctxResizeBottom.fillStyle = "rgb(220,220,220)";
	ctxResizeRight.fillStyle = "rgb(220,220,220)";
	ctxResizeBoth.fillStyle = "rgb(220,220,220)";
	ctxResizeRight.fillRect(0,0,canvasResizeRight.width,canvasResizeRight.height);
	ctxResizeBottom.fillRect(0,0,canvasResizeBottom.width,canvasResizeBottom.height);
	ctxResizeBoth.fillRect(0,0,canvasResizeBoth.width,canvasResizeBoth.height);
	

}