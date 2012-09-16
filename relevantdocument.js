var isMouseDownRelevantDocument=0;
var deltaRelevantDocumentPositionX;
var deltaRelevantDocumentPositionY;
var relevantDocumentStatus=0;
var relevantDocumentTotalSteps=15;
var relevantDocumentIncrement = -1;
var relevantDocumentVisible=0;
var relevantDocumentPosX;
var relevantDocumentPosY;
var relevantDocumentWidth;
var relevantDocumentHeight;

function initializeRelevantDocument () {
	divRelevantDocument = document.getElementById("windowRelevantDocument");
	relevantDocumentPosX = divRelevantDocument.offsetLeft;
	relevantDocumentPosY = divRelevantDocument.offsetTop;
	relevantDocumentWidth = parseInt(divRelevantDocument.style.width);
	relevantDocumentHeight = parseInt(divRelevantDocument.style.height);
	divRelevantDocument.style.display = "none";
	ctxMenu.putImageData(imgDataMenu[relevantDocumentVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
}

function mouseDownRelevantDocument(e){
	divRelevantDocument.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divRelevantDocument.offsetTop<topbarHeight) {
		if (e.clientX-divRelevantDocument.offsetLeft<=parseInt(divRelevantDocument.style.width)-minimizePosWidth) {
			isMouseDownRelevantDocument=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divRelevantDocument.offsetLeft>parseInt(divRelevantDocument.style.width)-minimizePosWidth) {
			relevantDocumentIncrement *= -1;
			changeViewRelevantDocument();
		}
	}
}
	
function changeViewRelevantDocument() {
	if (relevantDocumentStatus <= 0 && relevantDocumentIncrement==-1) {
		relevantDocumentStatus = 1;
	}
	else if (relevantDocumentStatus >= relevantDocumentTotalSteps && relevantDocumentIncrement==1) {
		relevantDocumentStatus = relevantDocumentTotalSteps - 1;
	}
	relevantDocumentStatus += relevantDocumentIncrement;
	divRelevantDocument.style.width = relevantDocumentStatus*relevantDocumentWidth/relevantDocumentTotalSteps + "px";
	divRelevantDocument.style.height = relevantDocumentStatus*relevantDocumentHeight/relevantDocumentTotalSteps + "px";
	divRelevantDocument.style.left = (canvasMenu.offsetLeft+3*frameWidth+5*buttonMenuWidth/2) + relevantDocumentStatus*(relevantDocumentPosX+relevantDocumentWidth/2-canvasMenu.offsetLeft-3*frameWidth-5*buttonMenuWidth/2)/relevantDocumentTotalSteps - relevantDocumentStatus*relevantDocumentWidth/2/relevantDocumentTotalSteps + "px";
	divRelevantDocument.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + relevantDocumentStatus*(relevantDocumentPosY-canvasMenu.offsetTop-canvasMenu.height/2)/relevantDocumentTotalSteps + "px";
	if (relevantDocumentStatus > 0) {
		divRelevantDocument.style.display = "block";
		relevantDocumentVisible = 1;
	}
	else {
		divRelevantDocument.style.display = "none";
		relevantDocumentVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[relevantDocumentVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	if (relevantDocumentStatus > 0 && relevantDocumentStatus <relevantDocumentTotalSteps) setTimeout (changeViewRelevantDocument, 10);
}

function relevantDocumentDisplacement(e){
	if(e.clientX>divRelevantDocument.offsetLeft && e.clientY>divRelevantDocument.offsetTop && e.clientY-divRelevantDocument.offsetTop<topbarHeight) {
		if (e.clientX-divRelevantDocument.offsetLeft<=parseInt(divRelevantDocument.style.width)-minimizePosWidth) {
			divRelevantDocument.style.cursor = "move";
		}
		else if (e.clientX-divRelevantDocument.offsetLeft>parseInt(divRelevantDocument.style.width)-minimizePosWidth) {
			divRelevantDocument.style.cursor = "default";
		}
	}
	else {
		divRelevantDocument.style.cursor = "default";
	}
	if(isMouseDownRelevantDocument) {
		relevantDocumentPosX += e.clientX - lastMouseX;
		relevantDocumentPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divRelevantDocument.style.left = relevantDocumentPosX + "px";
		divRelevantDocument.style.top  = relevantDocumentPosY + "px";
		if(divRelevantDocument.offsetTop<0) {
			divRelevantDocument.style.top="0px";
			relevantDocumentPosY = 0;
		}
		/*
		if(divRelevantDocument.offsetLeft<0){
			divRelevantDocument.style.left="0px";
			console.log(divRelevantDocument.offsetLeft);
			console.log(divRelevantDocument.style.left);
		}
		if(divRelevantDocument.offsetLeft+parseInt(divRelevantDocument.style.width)>window.innerWidth)
			divRelevantDocument.style.left = (window.innerWidth - parseInt(divRelevantDocument.style.width)) +"px";
		if(divRelevantDocument.offsetTop+parseInt(divRelevantDocument.style.height)>window.innerHeight)
			divRelevantDocument.style.top = (window.innerHeight-parseInt(divRelevantDocument.style.height))+"px";
		*/
	}	
}