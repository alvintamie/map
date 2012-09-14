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

var abstractRefHeight = new Array();
var abstractRefState = new Array();
var abstractRefMode = new Array();
var abstractRefTotal = 20;

function initializeReference() {
	divReference = document.getElementById("windowReference");
	referencePosX = divReference.offsetLeft;
	referencePosY = divReference.offsetTop;
	referenceWidth = parseInt(divReference.style.width);
	referenceHeight = parseInt(divReference.style.height);
	ctxMenu.putImageData(imgDataMenu[referenceVisible], frameWidth, frameWidth);
	//console.log ("before");
	//setTimeout(insertReference, 3000);
	//console.log("after");
	var temp = document.createElement('div');
	divReference.appendChild(temp);
	temp.setAttribute('id', "contentReference");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = referenceWidth-2 + 'px';
	temp.style.height = referenceHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';

}

function mouseDownReference(e){
	divReference.style['z-index'] = zIndex;
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

function createDivReference () {
	if (readyRef==1) {
		for (var i=0; i<numberRef; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentReference").appendChild(temp);
			temp.setAttribute('id', "Reference" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
		}
	}
	else if (readyRef==2) {
		document.getElementById("contentReference").innerHTML = "The paper is not published yet.";
	}
}

function insertReference(i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "Reference" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractRef(i);};
	document.getElementById("Reference"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.href = "javascript:window.open('" + referenceObject[i].url + "')";
	temp.textContent = referenceObject[i].title;
	//temp.setAttribute('onclick', 'window.open(temp.href)');
	document.getElementById("Reference"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("Reference"+i).appendChild(temp);
	temp.innerHTML = referenceObject[i].Abstract;
	temp.setAttribute('id', "Reference" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = referenceWidth - 45 + 'px';
	temp.style.overflow = 'hidden';
	abstractRefHeight[i] = temp.client.height;
	abstractRefState[i] = 0;
	abstractRefMode[i] = 0;
	temp.style.height = 0 + 'px';
	temp.style.display = 'none';
}

function showAbstractRef(i) {
	console.log("show");
	if (abstractRefMode[i]==0) {
		document.getElementById("Reference" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		abstractRefMode[i] = 1;
		//console.log(a.offsetLeft);
		//console.log(a.offsetTop);
		//a.style.height = "20px";
		//console.log(hei);
		//expandAbstractRef(i);
	}
	else {
		document.getElementById("Reference" + i + "_image").src = imgExpand.src;
		abstractRefMode[i] = 0;
		//contractAbstractRef(i);
	}
}
/*		
function expandAbstractRef(i) {
	console.log("expand");
	abstractRefState[i] += 1;
	document.getElementById("Reference" + i + "_abstract").style.height = abstractRefState[i]*abstractRefHeight[i]/abstractRefTotal + 'px';
	if (abstractRefState[i]<abstractRefTotal && abstractRefMode[i]) {
		setTimeout (expandAbstractRef(i), 10);
	}
}

function contractAbstractRef(i) {
	console.log("contract");
	abstractRefState[i] -= 1;
	document.getElementById("Reference" + i + "_abstract").style.height = abstractRefState[i]*abstractRefHeight[i]/abstractRefTotal + 'px';
	if (abstractRefState[i]>0 && !abstractRefMode[i]) {
		setTimeout (contractAbstractRef(i), 10);
	}
	else if (!abstractRefMode[i])
		document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}
*/	
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