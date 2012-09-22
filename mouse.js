document.onmousemove=getMouseCoordinates;
document.onmouseup=getMouseUp;

var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" ;
if (document.attachEvent) 
    	document.addEventListener("on"+mousewheelevt,scroll);
else if (document.addEventListener) 
    		document.addEventListener(mousewheelevt, scroll, false);	
    	

function getMouseCoordinates(e){
		referenceDisplacement(e);
		citedByDisplacement(e);
		relevantDocumentDisplacement(e);
		coAuthorDisplacement(e);
		searchDisplacement(e);
		affiliationDisplacement(e);
		resizeCanvas(e);
		if (readyScroll==1) {
			mouseX=e.clientX;
			mouseY=e.clientY;
			deltaMouseX = mouseX-canvas.offsetLeft;
			deltaMouseY = mouseY-canvas.offsetTop;
		}
		if(!isDown) return;
		calculateDelta();
		}
		
function getMouseUp(e) {	
		isMouseDownAuthor=false;
		isMouseDownReference=false;
		isMouseDownCitedBy=false;
		isMouseDownRelevantDocument=false;
		isMouseDownCoAuthor=false;
		isMouseDownSearch=false;
		isMouseDownAffiliation=false;
		isDown=false;
		isResizeWidth=false;
		isResizeHeight=false;
		isResizeBoth=false;
		//document.onselectstart = function() {return true;}
	}

function scroll(e){
		if(_readyScroll==1 && readyScroll==1 && mouseInCanvas){
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
			deltaMouseX = mouseX - canvas.offsetLeft;
			deltaMouseY = mouseY - canvas.offsetTop;
			}
	}
canvas.addEventListener('dblclick', function(){ 
		if(_readyScroll==1 && readyScroll==1 && mouseInCanvas){
			multiplier=1;
			timeBefore = 0;
			if(zoom<2){
				readyScroll=-1;
				triangleSize=60;
			}
			mouseX=canvas.offsetLeft+canvas.width/2;
			mouseY=canvas.offsetTop+canvas.height/2;
			deltaMouseX = mouseX - canvas.offsetLeft;
			deltaMouseY = mouseY - canvas.offsetTop;
			}
	});