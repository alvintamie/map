var isMouseDownReference=0;
var deltaReferencePositionX;
var deltaReferencePositionY;
var referenceStatus=25;
var referenceTotalSteps=25;
var referenceIncrement = 1;
var referenceVisible=1;
var referencePosX;
var referencePosY;
var referenceWidth;
var referenceHeight;
var overflowX = 1;

function mouseDownReference(e){
	divReference.style['z-index'] = zIndex;
	console.log(document.getElementById("contentReference").style.top);
	console.log(document.getElementById("contentReference").offsetTop);
	zIndex += 1;
	if(e.clientY-divReference.offsetTop<topbarHeight) {
		if (e.clientX-divReference.offsetLeft<=parseInt(divReference.style.width)-minimizePosWidth) {
			isMouseDownReference=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divReference.offsetLeft>parseInt(divReference.style.width)-minimizePosWidth) {
			referenceIncrement *= -1;
			changeViewReference();
		}
	}
}

function insertReference() {
	var temp = document.createElement('div');
	divReference.appendChild(temp);
	temp.setAttribute('id', "contentReference");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1;
	temp.style.width = referenceWidth-2 + 'px';
	temp.style.height = referenceHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
	
	while (readyRef==0) {waiting(500); console.log("wait");}
	if (readyRef==1) {
		for (var i=0; i<numberRef; i++) {
			temp = document.createElement('div');
			temp.setAttribute('id', "Reference" + i);
			temp.style.left = 3 + 'px';
			document.getElementById("contentReference").appendChild(temp);
			document.getElementById("Reference"+i).innerHTML = i + ". " + referenceObject[i].title;
		}
	}
	else if (readyRef==2) {
		document.getElementById("contentReference").innerHTML = "The paper is not published yet.";
	}
	
}
	
function changeViewReference() {
	if (referenceStatus <= 0 && referenceIncrement==-1) {
		referenceStatus = 1;
	}
	else if (referenceStatus >= referenceTotalSteps && referenceIncrement==1) {
		referenceStatus = referenceTotalSteps - 1;
	}
	referenceStatus += referenceIncrement;
	divReference.style.width = referenceStatus*referenceWidth/referenceTotalSteps + "px";
	divReference.style.height = referenceStatus*referenceHeight/referenceTotalSteps + "px";
	divReference.style.left = (canvasMenu.offsetLeft+frameWidth+buttonMenuWidth/2) + referenceStatus*(referencePosX+referenceWidth/2-canvasMenu.offsetLeft-frameWidth-buttonMenuWidth)/referenceTotalSteps - referenceStatus*referenceWidth/2/referenceTotalSteps + "px";
	divReference.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + referenceStatus*(referencePosY-canvasMenu.offsetTop-canvasMenu.height/2)/referenceTotalSteps + "px";
	if (referenceStatus > 0) {
		divReference.style.display = "block";
		referenceVisible = 1;
	}
	else {
		divReference.style.display = "none";
		referenceVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[referenceVisible], frameWidth, frameWidth);
	if (referenceStatus > 0 && referenceStatus <referenceTotalSteps) setTimeout (changeViewReference, 10);
}

function referenceDisplacement(e){
	if(e.clientX>divReference.offsetLeft && e.clientY>divReference.offsetTop && e.clientY-divReference.offsetTop<topbarHeight) {
		if (e.clientX-divReference.offsetLeft<=parseInt(divReference.style.width)-minimizePosWidth) {
			divReference.style.cursor = "move";
		}
		else if (e.clientX-divReference.offsetLeft>parseInt(divReference.style.width)-minimizePosWidth) {
			divReference.style.cursor = "default";
		}
	}
	else {
		divReference.style.cursor = "default";
	}
	if(isMouseDownReference) {
		referencePosX += e.clientX - lastMouseX;
		referencePosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divReference.style.left = referencePosX + "px";
		divReference.style.top  = referencePosY + "px";
		if(divReference.offsetTop<0) {
			divReference.style.top="0px";
			referencePosY = 0;
		}
		/*
		if(divReference.offsetLeft<0){
			divReference.style.left="0px";
			console.log(divReference.offsetLeft);
			console.log(divReference.style.left);
		}
		if(divReference.offsetLeft+parseInt(divReference.style.width)>window.innerWidth)
			divReference.style.left = (window.innerWidth - parseInt(divReference.style.width)) +"px";
		if(divReference.offsetTop+parseInt(divReference.style.height)>window.innerHeight)
			divReference.style.top = (window.innerHeight-parseInt(divReference.style.height))+"px";
		*/
	}	
}