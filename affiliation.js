var isMouseDownAffiliation=0;
var deltaAffiliationPositionX;
var deltaAffiliationPositionY;
var affiliationStatus=0;
var affiliationTotalSteps=15;
var affiliationIncrement = -1;
var affiliationVisible=0;
var affiliationPosX;
var affiliationPosY;
var affiliationWidth;
var affiliationHeight;

function mouseDownAffiliation(e){
	divAffiliation.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divAffiliation.offsetTop<topbarHeight) {
		if (e.clientX-divAffiliation.offsetLeft<=parseInt(divAffiliation.style.width)-minimizePosWidth) {
			isMouseDownAffiliation=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divAffiliation.offsetLeft>parseInt(divAffiliation.style.width)-minimizePosWidth) {
			affiliationIncrement *= -1;
			changeViewAffiliation();
		}
	}
}
	
function changeViewAffiliation() {
	if (affiliationStatus <= 0 && affiliationIncrement==-1) {
		affiliationStatus = 1;
	}
	else if (affiliationStatus >= affiliationTotalSteps && affiliationIncrement==1) {
		affiliationStatus = affiliationTotalSteps - 1;
	}
	affiliationStatus += affiliationIncrement;
	divAffiliation.style.width = affiliationStatus*affiliationWidth/affiliationTotalSteps + "px";
	divAffiliation.style.height = affiliationStatus*affiliationHeight/affiliationTotalSteps + "px";
	divAffiliation.style.left = (canvasMenu.offsetLeft+5*frameWidth+9*buttonMenuWidth/2) + affiliationStatus*(affiliationPosX+affiliationWidth/2-canvasMenu.offsetLeft-5*frameWidth-9*buttonMenuWidth/2)/affiliationTotalSteps - affiliationStatus*affiliationWidth/2/affiliationTotalSteps + "px";
	divAffiliation.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + affiliationStatus*(affiliationPosY-canvasMenu.offsetTop-canvasMenu.height/2)/affiliationTotalSteps + "px";
	if (affiliationStatus > 0) {
		//divAffiliation.style.display = "block";
		affiliationVisible = 1;
	}
	else {
		//divAffiliation.style.display = "none";
		affiliationVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[affiliationVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
	if (affiliationStatus > 0 && affiliationStatus <affiliationTotalSteps) setTimeout (changeViewAffiliation, 10);
}

function affiliationDisplacement(e){
	if(e.clientX>divAffiliation.offsetLeft && e.clientY>divAffiliation.offsetTop && e.clientY-divAffiliation.offsetTop<topbarHeight) {
		if (e.clientX-divAffiliation.offsetLeft<=parseInt(divAffiliation.style.width)-minimizePosWidth) {
			divAffiliation.style.cursor = "move";
		}
		else if (e.clientX-divAffiliation.offsetLeft>parseInt(divAffiliation.style.width)-minimizePosWidth) {
			divAffiliation.style.cursor = "default";
		}
	}
	else {
		divAffiliation.style.cursor = "default";
	}
	if(isMouseDownAffiliation) {
		affiliationPosX += e.clientX - lastMouseX;
		affiliationPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divAffiliation.style.left = affiliationPosX + "px";
		divAffiliation.style.top  = affiliationPosY + "px";
		if(divAffiliation.offsetTop<0) {
			divAffiliation.style.top="0px";
			affiliationPosY = 0;
		}
		/*
		if(divAffiliation.offsetLeft<0){
			divAffiliation.style.left="0px";
			console.log(divAffiliation.offsetLeft);
			console.log(divAffiliation.style.left);
		}
		if(divAffiliation.offsetLeft+parseInt(divAffiliation.style.width)>window.innerWidth)
			divAffiliation.style.left = (window.innerWidth - parseInt(divAffiliation.style.width)) +"px";
		if(divAffiliation.offsetTop+parseInt(divAffiliation.style.height)>window.innerHeight)
			divAffiliation.style.top = (window.innerHeight-parseInt(divAffiliation.style.height))+"px";
		*/
	}	
}