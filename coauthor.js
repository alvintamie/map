var isMouseDownCoAuthor=0;
var deltaCoAuthorPositionX;
var deltaCoAuthorPositionY;
var coAuthorStatus=0;
var coAuthorTotalSteps=15;
var coAuthorIncrement = -1;
var coAuthorVisible=0;
var coAuthorPosX;
var coAuthorPosY;
var coAuthorWidth;
var coAuthorHeight;

function initializeCoAuthor() {
	divCoAuthor = document.getElementById("windowCoAuthor");
	coAuthorPosX = divCoAuthor.offsetLeft;
	coAuthorPosY = divCoAuthor.offsetTop;
	coAuthorWidth = parseInt(divCoAuthor.style.width);
	coAuthorHeight = parseInt(divCoAuthor.style.height);
	//divCoAuthor.style.display = "none";
	divCoAuthor.style.width = '0px';
	divCoAuthor.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
}

function mouseDownCoAuthor(e){
  divCoAuthor.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divCoAuthor.offsetTop<topbarHeight) {
		if (e.clientX-divCoAuthor.offsetLeft<=parseInt(divCoAuthor.style.width)-minimizePosWidth) {
			isMouseDownCoAuthor=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divCoAuthor.offsetLeft>parseInt(divCoAuthor.style.width)-minimizePosWidth) {
			coAuthorIncrement *= -1;
			changeViewCoAuthor();
		}
	}
}
	
function changeViewCoAuthor() {
	if (coAuthorStatus <= 0 && coAuthorIncrement==-1) {
		coAuthorStatus = 1;
	}
	else if (coAuthorStatus >= coAuthorTotalSteps && coAuthorIncrement==1) {
		coAuthorStatus = coAuthorTotalSteps - 1;
	}
	coAuthorStatus += coAuthorIncrement;
	divCoAuthor.style.width = coAuthorStatus*coAuthorWidth/coAuthorTotalSteps + "px";
	divCoAuthor.style.height = coAuthorStatus*coAuthorHeight/coAuthorTotalSteps + "px";
	divCoAuthor.style.left = (canvasMenu.offsetLeft+3*frameWidth+5*buttonMenuWidth/2) + coAuthorStatus*(coAuthorPosX+coAuthorWidth/2-canvasMenu.offsetLeft-3*frameWidth-5*buttonMenuWidth/2)/coAuthorTotalSteps - coAuthorStatus*coAuthorWidth/2/coAuthorTotalSteps + "px";
	divCoAuthor.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + coAuthorStatus*(coAuthorPosY-canvasMenu.offsetTop-canvasMenu.height/2)/coAuthorTotalSteps + "px";
	if (coAuthorStatus > 0) {
		//divCoAuthor.style.display = "block";
		coAuthorVisible = 1;
	}
	else {
		//divCoAuthor.style.display = "none";
		coAuthorVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	if (coAuthorStatus > 0 && coAuthorStatus <coAuthorTotalSteps) setTimeout (changeViewCoAuthor, 10);
}

function coAuthorDisplacement(e){
	if(e.clientX>divCoAuthor.offsetLeft && e.clientY>divCoAuthor.offsetTop && e.clientY-divCoAuthor.offsetTop<topbarHeight) {
		if (e.clientX-divCoAuthor.offsetLeft<=parseInt(divCoAuthor.style.width)-minimizePosWidth) {
			divCoAuthor.style.cursor = "move";
		}
		else if (e.clientX-divCoAuthor.offsetLeft>parseInt(divCoAuthor.style.width)-minimizePosWidth) {
			divCoAuthor.style.cursor = "default";
		}
	}
	else {
		divCoAuthor.style.cursor = "default";
	}
	if(isMouseDownCoAuthor) {
		coAuthorPosX += e.clientX - lastMouseX;
		coAuthorPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divCoAuthor.style.left = coAuthorPosX + "px";
		divCoAuthor.style.top  = coAuthorPosY + "px";
		if(divCoAuthor.offsetTop<0) {
			divCoAuthor.style.top="0px";
			coAuthorPosY = 0;
		}
		/*
		if(divCoAuthor.offsetLeft<0){
			divCoAuthor.style.left="0px";
			console.log(divCoAuthor.offsetLeft);
			console.log(divCoAuthor.style.left);
		}
		if(divCoAuthor.offsetLeft+parseInt(divCoAuthor.style.width)>window.innerWidth)
			divCoAuthor.style.left = (window.innerWidth - parseInt(divCoAuthor.style.width)) +"px";
		if(divCoAuthor.offsetTop+parseInt(divCoAuthor.style.height)>window.innerHeight)
			divCoAuthor.style.top = (window.innerHeight-parseInt(divCoAuthor.style.height))+"px";
		*/
	}	
}