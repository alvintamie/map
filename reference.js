var isMouseDownReference=0;
var deltaReferencePositionX;
var deltaReferencePositionY;
var referenceStatus=15;
var referenceTotalSteps=15;
var referenceIncrement = 1;
var referenceVisible=1;
var referencePosX;
var referencePosY;
var referenceWidth;
var referenceHeight;

var abstractRefHeight = new Array();
var abstractRefState = new Array();
var abstractRefMode = new Array();
var abstractRefTotal = 20;
var contentReference;
//var showReferenceinMap = 1;
var showReferenceHref;
var divCountryDistributionReference;
var modeCountryDistributionReference = 0;
//var modeCountryTypeReference = 0;
//var hrefCountryTypeReference;
var hrefCDR;

function initializeReference() {
	divReference = document.getElementById("windowReference");
	referencePosX = 700;
	referencePosY = 50;
	referenceWidth = parseInt(divReference.style.width);
	referenceHeight = parseInt(divReference.style.height);
	ctxMenu.putImageData(imgDataMenu[referenceVisible], frameWidth, frameWidth);
	//console.log ("before");
	//setTimeout(insertReference, 3000);
	//console.log("after");
	contentReference = document.createElement('div');
	divReference.appendChild(contentReference);
	contentReference.setAttribute('id', "contentReference");
	contentReference.style.position = 'absolute';
	contentReference.style.top = topbarHeight-9 + 'px';
	contentReference.style.left = 1 + 'px';
	contentReference.style.width = referenceWidth-2 + 'px';
	contentReference.style.height = referenceHeight-topbarHeight+7 +'px';
	contentReference.style['overflow-x'] = 'hidden';
	contentReference.style['overflow-y'] = 'auto';
	
	showReferenceHref = document.createElement('a');
	showReferenceHref.href = "#";
	showReferenceHref.textContent = "Show documents in map";
	
	divCountryDistributionReference = document.createElement('div');
	divCountryDistributionReference.style.background = '#D8D8D8';
	divCountryDistributionReference.style.position = 'absolute';
	divCountryDistributionReference.style.width = '130px';
	divCountryDistributionReference.style.height = '300px';
	divCountryDistributionReference.style.top = referencePosY + 23 + 'px';
	divCountryDistributionReference.style.left = referencePosX-parseInt(divCountryDistributionReference.style.width)+ 8 + 'px';
	divCountryDistributionReference.style['z-index'] = 0;
	divCountryDistributionReference.style.overflow = 'hidden';
	divCountryDistributionReference.style.display = 'block';
	document.body.appendChild(divCountryDistributionReference);
	
	hrefCDR = document.createElement('a');
	hrefCDR.textContent = "View country distribution";
	hrefCDR.href = "#";
	hrefCDR.onclick = function () {
		showReferenceCountryDistribution();
		if (modeCountryDistributionReference==0)
			hrefCDR.textContent = "View country distribution";
		else hrefCDR.textContent = "Hide country distribution";
	};
}

function updateReference (rObject, rMode) {
	removecontentReferenceChild();
	console.log("updatereference");
	console.log (rObject);
	if (rObject.length>0) {
		if (rMode==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.onclick = function () {
				modeInMap = referenceMode;
				viewAllModeActive = 0;
				showResult(referenceMode, referenceObject);
				updateReference(referenceObject, 0);};
			temp.textContent = "Show all result";
			contentReference.appendChild(temp);
			contentReference.appendChild(document.createElement('br'));
		}

		showReferenceHref.onclick = function () {
			modeInMap = referenceMode;
			viewAllModeActive = 0;
			showResult(referenceMode, rObject);
		}
		contentReference.appendChild(showReferenceHref);
		contentReference.appendChild(document.createElement('br'));
		
		contentReference.appendChild(hrefCDR);
		contentReference.appendChild(document.createElement('br'));

		for (var i=0; i<rObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentReference").appendChild(temp);
			temp.setAttribute('id', "Reference" + i);
			temp.style.position = 'relative';
			//temp.style.left = 1 + 'px';
			insertReference(rObject, i);
		}
	}
	else {
		document.getElementById("contentReference").innerHTML = "There is no data for reference.";
	}
}

function insertReference(rObject, i) {
	var tempTable = document.createElement('table');
	//tempTable.align = 'justify';
	document.getElementById("Reference"+i).appendChild(tempTable);
	
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "Reference" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractRef(i);};
	var row = tempTable.insertRow(0);
	row.insertCell(0).appendChild(temp);
	temp = document.createElement("a");
	temp.style['font-weight'] = 'bold';
	temp.style.textDecoration = 'none';
	temp.href = "#";
	temp.textContent = i + " " + rObject[i].title;
	temp.onclick = function () {
		if (abstractRefMode[i]==0) {
			showAbstractRef(i);
		}
		viewAllModeActive = 0;
		modeInMap = referenceMode;
		showResult(referenceMode, rObject);
		highlight(rObject[i]);
	};
	row.insertCell(1).appendChild(temp);
	temp = document.createElement('div');
	temp.align = 'justify';
	document.getElementById("Reference"+i).appendChild(temp);
	temp.setAttribute('id', "Reference" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 15 + 'px';
	temp.style.width = referenceWidth - 43 + 'px';
	if (rObject[i].url) {
		var temp2 = document.createElement('a');
		temp2.textContent = "Show in Scopus";
		temp2.href = "javascript:window.open('" + rObject[i].url + "')";
		temp2.style.textDecoration = 'none';
		temp.appendChild(temp2);
		temp.appendChild(document.createElement('br'));
	}
	if (rObject[i].authorId && rObject[i].scopusId) {
		var temp2 = document.createElement('a');
		temp2.textContent = "Set as main article";
		temp2.href = "#";
		temp2.style.textDecoration = 'none';
		temp2.onclick = function() {newMainArticle(rObject[i]);};
		temp.appendChild(temp2);
		temp.appendChild(document.createElement('br'));
	}
	if (rObject[i].Abstract)
		temp.appendChild(document.createTextNode(rObject[i].Abstract));
	else temp.appendChild(document.createTextNode("Abstract not available"));
	temp.style.overflow = 'hidden';
	abstractRefHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractRefState[i] = 0;
	abstractRefMode[i] = 0;
}

function removecontentReferenceChild () {
	while (contentReference.firstChild) {
		contentReference.removeChild(contentReference.firstChild);
	}
}

function showReferenceCountryDistribution() {
	if (modeCountryDistributionReference==0) {
		modeCountryDistributionReference = 1;
		divCountryDistributionReference.style.display = 'block';
	}
	else {
		modeCountryDistributionReference = 0;
		divCountryDistributionReference.style.display = 'none';
	}
}

function showOverallCountryReference(crObject) {
	while (divCountryDistributionReference.firstChild) {
		divCountryDistributionReference.removeChild(divCountryDistributionReference.firstChild);
	}
	//divCountryDistributionReference.appendChild(hrefCountryTypeReference);
	//divCountryDistributionReference.appendChild(document.createElement('br'));
	for (var i=0; i<crObject.length; i++) {
		var temp = document.createElement('a');
		temp.href = "javascript:focusToCountryReference('"+crObject[i].name+"');";
		temp.textContent = crObject[i].name;
		temp.style.textDecoration = 'none';
		divCountryDistributionReference.appendChild(temp);
		divCountryDistributionReference.appendChild(document.createTextNode(" ("+crObject[i].hitCount+")"));
		divCountryDistributionReference.appendChild(document.createElement('br'));
	}
}

function focusToCountryReference (crObjectName) {
	//console.log("focus country");
	viewAllModeActive = 0;
	modeInMap = referenceMode;
	getReferenceFilter(new Array(crObjectName));
	highlight(getObject(crObjectName));
}

function showAbstractRef(i) {
	//console.log("show");
	if (abstractRefMode[i]==0) {
		document.getElementById("Reference" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		abstractRefMode[i] = 1;
		expandAbstractRef(i);
	}
	else {
		document.getElementById("Reference" + i + "_image").src = imgExpand.src;
		abstractRefMode[i] = 0;
		contractAbstractRef(i);
	}
}
		
function expandAbstractRef(i) {
	//console.log(i);
	abstractRefState[i] += 1;
	document.getElementById("Reference" + i + "_abstract").style.height = abstractRefState[i]*abstractRefHeight[i]/abstractRefTotal + 'px';
	//console.log(abstractRefHeight[i]);
	if (abstractRefState[i]<abstractRefTotal && abstractRefMode[i]==1) {
		setTimeout (function() {expandAbstractRef(i)}, 10);
	}
}

function contractAbstractRef(i) {
	//console.log(i);
	abstractRefState[i] -= 1;
	document.getElementById("Reference" + i + "_abstract").style.height = abstractRefState[i]*abstractRefHeight[i]/abstractRefTotal + 'px';
	if (abstractRefState[i]>0 && abstractRefMode[i]==0) {
		setTimeout (function(){contractAbstractRef(i);}, 10);
	}
	//else if (abstractRefMode[i]==0)
		//document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}

function mouseDownReference(e){
	divReference.style['z-index'] = zIndex;
	divCountryDistributionReference.style['z-index'] = zIndex;
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
	
function changeViewReference() {
	modeCountryDistributionReference = 0;
	divCountryDistributionReference.style.display = 'none';
	hrefCDR.textContent = "View country distribution";
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
		//divReference.style.display = "block";
		referenceVisible = 1;
	}
	else {
		//divReference.style.display = "none";
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
		divCountryDistributionReference.style.top = referencePosY + "px";
		divCountryDistributionReference.style.left = referencePosX-parseInt(divCountryDistributionReference.style.width) + 'px';
		
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