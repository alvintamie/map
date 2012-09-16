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

var abstractRelevantHeight = new Array();
var abstractRelevantState = new Array();
var abstractRelevantMode = new Array();
var abstractRelevantTotal = 20;

function initializeRelevantDocument () {
	divRelevantDocument = document.getElementById("windowRelevantDocument");
	relevantDocumentPosX = divRelevantDocument.offsetLeft;
	relevantDocumentPosY = divRelevantDocument.offsetTop;
	relevantDocumentWidth = parseInt(divRelevantDocument.style.width);
	relevantDocumentHeight = parseInt(divRelevantDocument.style.height);
	divRelevantDocument.style.display = "none";
	ctxMenu.putImageData(imgDataMenu[relevantDocumentVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	
	var temp = document.createElement('div');
	divRelevantDocument.appendChild(temp);
	temp.setAttribute('id', "contentRelevantDocument");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = citedByWidth-2 + 'px';
	temp.style.height = citedByHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
}

function updateRelevantDocument () {
	removecontentRelevantDocumentChild();
	if (relevantDocumentObject.length>0) {
		for (var i=0; i<relevantDocumentObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentRelevantDocument").appendChild(temp);
			temp.setAttribute('id', "RelevantDocument" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertRelevantDocument(i);
		}
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		if (currentLevelRelevantDocument>1) {
			temp = document.createElement('a');
			document.getElementById("contentRelevantDocument").appendChild(temp);
			temp.href="javascript:downRelevantDocument()";
			temp.textContent = "Previous";
		}
		if (currentLevelRelevantDocument<totalLevelRelevantDocument) {
			temp = document.createElement('a');
			document.getElementById("contentRelevantDocument"). appendChild(temp);
			temp.href = "javascript:upRelevantDocument()";
			temp.textContent = "Next";
		}	
	}
	else {
		document.getElementById("contentRelevantDocument").innerHTML = "No relevant document has been found.";
	}
}

function insertRelevantDocument(i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "RelevantDocument" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractRelevant(i);};
	document.getElementById("RelevantDocument"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.href = "javascript:window.open('" + relevantDocumentObject[i].url + "')";
	temp.textContent = (currentLevelRelevantDocument-1)*25+i+1 + " " + relevantDocumentObject[i].title;
	//temp.setAttribute('onclick', 'window.open(temp.href)');
	document.getElementById("RelevantDocument"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("RelevantDocument"+i).appendChild(temp);
	temp.innerHTML = relevantDocumentObject[i].Abstract;
	temp.setAttribute('id', "RelevantDocument" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = relevantDocumentWidth - 45 + 'px';
	temp.style.overflow = 'hidden';
	abstractRelevantHeight[i] = temp.clientHeight;
	console.log(abstractRelevantHeight[i]);
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractRelevantState[i] = 0;
	abstractRelevantMode[i] = 0;
}

function showAbstractRelevant(i) {
	//console.log("show");
	if (abstractRelevantMode[i]==0) {
		document.getElementById("RelevantDocument" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		abstractRelevantMode[i] = 1;
		//console.log("before");
		expandAbstractRelevant(i);
		//console.log("after");
	}
	else {
		document.getElementById("RelevantDocument" + i + "_image").src = imgExpand.src;
		abstractRelevantMode[i] = 0;
		contractAbstractRelevant(i);
	}
}

function expandAbstractRelevant(i) {
	//console.log("expand");
	abstractRelevantState[i] += 1;
	document.getElementById("RelevantDocument" + i + "_abstract").style.height = abstractRelevantState[i]*abstractRelevantHeight[i]/abstractRelevantTotal + 'px';
	//console.log(abstractRelevantHeight[i]);
	if (abstractRelevantState[i]<abstractRelevantTotal && abstractRelevantMode[i]==1) {
		setTimeout (function() {expandAbstractRelevant(i)}, 10);
	}
}

function contractAbstractRelevant(i) {
	//console.log(i);
	abstractRelevantState[i] -= 1;
	document.getElementById("RelevantDocument" + i + "_abstract").style.height = abstractRelevantState[i]*abstractRelevantHeight[i]/abstractRelevantTotal + 'px';
	if (abstractRelevantState[i]>0 && abstractRelevantMode[i]==0) {
		setTimeout (function(){contractAbstractRelevant(i);}, 10);
	}
	//else if (abstractRefMode[i]==0)
		//document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}

function removecontentRelevantDocumentChild() {
	var el = document.getElementById("contentRelevantDocument");
	while (el.firstChild) {
		//console.log(el.firstChild.id);
		el.removeChild(el.firstChild);
	}
	//console.log(el.lastChild.id);

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