document.onmousemove=getMouseCoordinates;
document.onmouseup=getMouseUp;

var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" ;
if (document.attachEvent) 
    	document.addEventListener("on"+mousewheelevt,scroll);
else if (document.addEventListener) 
    		document.addEventListener(mousewheelevt, scroll, false);	
    	

function getMouseCoordinates(e){
		referenceDisplacement(e);
		searchDisplacement(e);
		affiliationDisplacement(e);
		resizeCanvas(e);
		if (readyScroll==1) {
			mouseX=e.clientX;
			mouseY=e.clientY;
			deltaMouseX = mouseX-canvasPosX;
			deltaMouseY = mouseY-canvasPosY;
		}
		if(!isDown) return;
		calculateDelta();
		}
		
function getMouseUp(e) {	
		isMouseDownAuthor=false;
		isMouseDownReference=false;
		isMouseDownSearch=false;
		isMouseDownAffiliation=false;
		isDown=false;
		isResizeWidth=false;
		isResizeHeight=false;
		isResizeBoth=false;
		//document.onselectstart = function() {return true;}
	}

function scroll(e){
		if(readyScroll==1 && mouseInCanvas){
			//console.log(mouseInCanvas);
			multiplier=1;
			timeBefore = 0;
			if( (e.detail<0 || e.wheelDelta>0) && zoom<2){
				readyScroll=-1;
				triangleSize=60;
			}
			if((e.detail>0 || e.wheelDelta<0) && zoom>0){
				readyScroll=-2;
				triangleSize=120;
			}
			mouseX=e.clientX;
			mouseY=e.clientY;
			deltaMouseX = mouseX - canvasPosX;
			deltaMouseY = mouseY - canvasPosY;
			}
	}