var isMouseDownCitedBy=0;
var deltaCitedByPositionX;
var deltaCitedByPositionY;
var citedByStatus=0;
var citedByTotalSteps=15;
var citedByIncrement = -1;
var citedByVisible=0;
var citedByPosX;
var citedByPosY;
var citedByWidth;
var citedByHeight;

function mouseDownCitedBy(e){
  divCitedBy.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divCitedBy.offsetTop<topbarHeight) {
		if (e.clientX-divCitedBy.offsetLeft<=parseInt(divCitedBy.style.width)-minimizePosWidth) {
			isMouseDownCitedBy=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divCitedBy.offsetLeft>parseInt(divCitedBy.style.width)-minimizePosWidth) {
			citedByIncrement *= -1;
			changeViewCitedBy();
		}
	}
}
	
function changeViewCitedBy() {
	if (citedByStatus <= 0 && citedByIncrement==-1) {
		citedByStatus = 1;
	}
	else if (citedByStatus >= citedByTotalSteps && citedByIncrement==1) {
		citedByStatus = citedByTotalSteps - 1;
	}
	citedByStatus += citedByIncrement;
	divCitedBy.style.width = citedByStatus*citedByWidth/citedByTotalSteps + "px";
	divCitedBy.style.height = citedByStatus*citedByHeight/citedByTotalSteps + "px";
	divCitedBy.style.left = (canvasMenu.offsetLeft+2*frameWidth+3*buttonMenuWidth/2) + citedByStatus*(citedByPosX+citedByWidth/2-canvasMenu.offsetLeft-2*frameWidth-3*buttonMenuWidth/2)/citedByTotalSteps - citedByStatus*citedByWidth/2/citedByTotalSteps + "px";
	divCitedBy.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + citedByStatus*(citedByPosY-canvasMenu.offsetTop-canvasMenu.height/2)/citedByTotalSteps + "px";
	if (citedByStatus > 0) {
		//divCitedBy.style.display = "block";
		citedByVisible = 1;
	}
	else {
		//divCitedBy.style.display = "none";
		citedByVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
	if (citedByStatus > 0 && citedByStatus <citedByTotalSteps) setTimeout (changeViewCitedBy, 10);
}

function citedByDisplacement(e){
	if(e.clientX>divCitedBy.offsetLeft && e.clientY>divCitedBy.offsetTop && e.clientY-divCitedBy.offsetTop<topbarHeight) {
		if (e.clientX-divCitedBy.offsetLeft<=parseInt(divCitedBy.style.width)-minimizePosWidth) {
			divCitedBy.style.cursor = "move";
		}
		else if (e.clientX-divCitedBy.offsetLeft>parseInt(divCitedBy.style.width)-minimizePosWidth) {
			divCitedBy.style.cursor = "default";
		}
	}
	else {
		divCitedBy.style.cursor = "default";
	}
	if(isMouseDownCitedBy) {
		citedByPosX += e.clientX - lastMouseX;
		citedByPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divCitedBy.style.left = citedByPosX + "px";
		divCitedBy.style.top  = citedByPosY + "px";
		if(divCitedBy.offsetTop<0) {
			divCitedBy.style.top="0px";
			citedByPosY = 0;
		}
		/*
		if(divCitedBy.offsetLeft<0){
			divCitedBy.style.left="0px";
			console.log(divCitedBy.offsetLeft);
			console.log(divCitedBy.style.left);
		}
		if(divCitedBy.offsetLeft+parseInt(divCitedBy.style.width)>window.innerWidth)
			divCitedBy.style.left = (window.innerWidth - parseInt(divCitedBy.style.width)) +"px";
		if(divCitedBy.offsetTop+parseInt(divCitedBy.style.height)>window.innerHeight)
			divCitedBy.style.top = (window.innerHeight-parseInt(divCitedBy.style.height))+"px";
		*/
	}	
}