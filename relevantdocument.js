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
var contentRelevantDocument;
var headerRelevantDocument;
//var showRelevantDocumentinMap = 1;
var showRelevantDocumentHref;
var divCountryDistributionRelevantDocument;
var modeCountryDistributionRelevantDocument = 0;
var modeCountryTypeRelevantDocument = 1;
var defaultChangedRelevantDocument = 0;
var hrefCountryTypeRelevantDocument;
var hrefCDRD;
var imgRelevantDocument = new Array();
imgRelevantDocument[0] = imgObject[6];
imgRelevantDocument[1] = imgObject[11];


function initializeRelevantDocument () {
	divRelevantDocument = document.getElementById("windowRelevantDocument");
	divRelevantDocument.style.overflow = 'hidden';
	relevantDocumentPosX = 740;
	relevantDocumentPosY = 90;
	relevantDocumentWidth = parseInt(divRelevantDocument.style.width);
	relevantDocumentHeight = parseInt(divRelevantDocument.style.height);
	//divRelevantDocument.style.display = "none";
	divRelevantDocument.style.height = '0px';
	divRelevantDocument.style.width = '0px';
	ctxMenu.drawImage(imgRelevantDocument[relevantDocumentVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	
	headerRelevantDocument = document.createElement('div');
	headerRelevantDocument.style.position = 'relative';
	headerRelevantDocument.style.top = '0px';
	headerRelevantDocument.style.left ='0px';
	headerRelevantDocument.style.height = '23px';
	headerRelevantDocument.style.width = relevantDocumentWidth + 'px';
	headerRelevantDocument.style.paddingLeft = '5px';
	headerRelevantDocument.style.color = 'white';
	headerRelevantDocument.appendChild(document.createTextNode("Relevant Document"));
	divRelevantDocument.appendChild(headerRelevantDocument);
	headerRelevantDocument.onselectstart = function() {return false};
	
	contentRelevantDocument = document.createElement('div');
	divRelevantDocument.appendChild(contentRelevantDocument);
	contentRelevantDocument.setAttribute('id', "contentRelevantDocument");
	contentRelevantDocument.style.position = 'relative';
	//contentRelevantDocument.style.top = topbarHeight-9 + 'px';
	contentRelevantDocument.style.left = 1 + 'px';
	contentRelevantDocument.style.width = citedByWidth-2 + 'px';
	contentRelevantDocument.style.height = citedByHeight-parseInt(headerRelevantDocument.style.height) +'px';
	contentRelevantDocument.style['overflow-x'] = 'hidden';
	contentRelevantDocument.style['overflow-y'] = 'auto';
	
	showRelevantDocumentHref= document.createElement('a');
	showRelevantDocumentHref.href = "#";
	showRelevantDocumentHref.style.color = 'blue';
	showRelevantDocumentHref.textContent = "Show in map";
	/*
	showRelevantDocumentHref.onclick = function () {
		if (defaultChangedRelevantDocument==0) showResult(0, relevantDocumentObject);
		else resetQueryRelevantDocument;
	}*/
	
	divCountryDistributionRelevantDocument = document.createElement('div');
	divCountryDistributionRelevantDocument.style.background = '#F2F1EF';
	divCountryDistributionRelevantDocument.style.position = 'absolute';
	divCountryDistributionRelevantDocument.style.width = '130px';
	divCountryDistributionRelevantDocument.style.height = '300px';
	divCountryDistributionRelevantDocument.style.top = relevantDocumentPosY + 27 + 'px';
	divCountryDistributionRelevantDocument.style.left = relevantDocumentPosX-parseInt(divCountryDistributionRelevantDocument.style.width) + 8 + 'px';
	divCountryDistributionRelevantDocument.style['z-index'] = 0;
	divCountryDistributionRelevantDocument.style.overflow = 'auto';
	divCountryDistributionRelevantDocument.style.display = 'none';
	document.body.appendChild(divCountryDistributionRelevantDocument);
	
	hrefCountryTypeRelevantDocument = document.createElement('a');
	hrefCountryTypeRelevantDocument.href = "#";
	hrefCountryTypeRelevantDocument.style.color = 'blue';
	hrefCountryTypeRelevantDocument.textContent = "View overall result distribution";
	hrefCountryTypeRelevantDocument.onclick = function () {
		//console.log("bbbbb");
		if (modeCountryTypeRelevantDocument==0) {
			modeCountryTypeRelevantDocument = 1;
			viewAllModeActive = 0;
			modeInMap = relevantDocumentMode;
			hrefCountryTypeRelevantDocument.textContent = "View overall result distribution";
			changeModeRelevantDocument();
		}
		else {
			modeCountryTypeRelevantDocument = 0;
			viewAllModeActive = 1;
			modeInMap = relevantDocumentMode;
			hrefCountryTypeRelevantDocument.textContent = "View 25 result distribution";
			showOverallCountryRelevantDocument(countryRelevantDocument);
		}
		//showOverallCountryRelevantDocument(countryRelevantDocument);
	}
	//showOverallCountryRelevantDocument(countryRelevantDocument);
	
	hrefCDRD = document.createElement('a');
	hrefCDRD.href = "#";
	hrefCDRD.style.color = 'blue';
	hrefCDRD.textContent = "View country distribution";
	hrefCDRD.onclick = function () {
		showRelevantDocumentCountryDistribution();
		if (modeCountryDistributionRelevantDocument==0)
			hrefCDRD.textContent = "View country distribution";
		else hrefCDRD.textContent = "Hide country distribution";
	};
}

function updateRelevantDocument (rdObject, rdMode) {
	removecontentRelevantDocumentChild();
	if (rdObject.length>0) {
		if (rdMode==1 || defaultChangedRelevantDocument==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.style.color = 'blue';
			temp.onclick = function () {
				if (defaultChangedRelevantDocument==1) {
					modeInMap = relevantDocumentMode;
					viewAllModeActive = 0;
					defaultChangedRelevantDocument = 0;
					resetQueryRelevantDocument();
				}
				else {
					viewAllModeActive = 0;
					modeInMap = relevantDocumentMode;
					showResult(relevantDocumentMode, relevantDocumentObject);
					updateRelevantDocument(relevantDocumentObject, 0);
					showOverallCountryRelevantDocument(countryRelevantDocument);
					
				}
				modeCountryTypeRelevantDocument = 1;
				hrefCountryTypeRelevantDocument.textContent = "View overall result distribution";
			}
			temp.textContent = "Show all result";
			contentRelevantDocument.appendChild(temp);
			contentRelevantDocument.appendChild(document.createElement('br'));
		}
		
		showRelevantDocumentHref.onclick = function () {
			modeInMap = relevantDocumentMode;
			viewAllModeActive = 0;
			showResult(relevantDocumentMode, rdObject);
		};
		contentRelevantDocument.appendChild(showRelevantDocumentHref);
		contentRelevantDocument.appendChild(document.createElement('br'));
		
		contentRelevantDocument.appendChild(hrefCDRD);
		contentRelevantDocument.appendChild(document.createElement('br'));
		
		for (var i=0; i<rdObject.length; i++) {
			if (rdMode==1 && (i==0 || rdObject[i].country!=rdObject[i-1].country)) {
				contentRelevantDocument.appendChild(document.createTextNode(rdObject[i].country));
			}
			var temp = document.createElement('div');
			document.getElementById("contentRelevantDocument").appendChild(temp);
			temp.setAttribute('id', "RelevantDocument" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertRelevantDocument(rdObject, i);
		}
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		if (rdMode==0) {
			if (currentLevelRelevantDocument>1) {
				temp = document.createElement('a');
				document.getElementById("contentRelevantDocument").appendChild(temp);
				temp.href="javascript:downRelevantDocument()";
				temp.style.color = 'blue';
				temp.textContent = "Previous";
				contentRelevantDocument.appendChild(document.createTextNode(" "));
			}
			if (currentLevelRelevantDocument<totalLevelRelevantDocument) {
				temp = document.createElement('a');
				document.getElementById("contentRelevantDocument"). appendChild(temp);
				temp.href = "javascript:upRelevantDocument()";
				temp.style.color ='blue';
				temp.textContent = "Next";
			}
		}
	}
	else {
		document.getElementById("contentRelevantDocument").innerHTML = "No relevant document is found.";
	}
}

function insertRelevantDocument(rdObject, i) {
	var tempTable = document.createElement('table');
	//tempTable.align = 'justify';
	document.getElementById("RelevantDocument"+i).appendChild(tempTable);
	
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "RelevantDocument" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractRelevant(i);};
	var row = tempTable.insertRow(0);
	row.insertCell(0).appendChild(temp);
	temp = document.createElement("a");
	temp.style['font-weight'] = 'bold';
	temp.style.textDecoration = 'none';
	temp.onclick = function () {
		if (abstractRelevantMode[i]==0) {
			showAbstractRelevant(i);
		}
		viewAllModeActive = 0;
		modeInMap = relevantDocumentMode;
		showResult(relevantDocumentMode, rdObject);
		highlight(rdObject[i]);
	};
	temp.href = "#";
	temp.style.color = 'blue';
	//temp.textContent = (currentLevelRelevantDocument-1)*25+i+1 + " " + rdObject[i].title;
	temp.textContent = rdObject[i].title;
	row.insertCell(1).appendChild(temp);
	//temp.setAttribute('onclick', 'window.open(temp.href)');
	
	temp = document.createElement('div');
	document.getElementById("RelevantDocument"+i).appendChild(temp);
	temp.align = 'justify';
	temp.setAttribute('id', "RelevantDocument" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = relevantDocumentWidth - 43 + 'px';
	if (rdObject[i].url) {
		var temp2 = document.createElement('a');
		temp2.style.color = 'blue';
		temp2.textContent = "Show in Scopus";
		temp2.href = "javascript:window.open('" + rdObject[i].url + "')";
		temp2.style.textDecoration = 'none';
		temp.appendChild(temp2);
		//temp.appendChild(document.createElement('br'));
	}
	if (rdObject[i].authorId && rdObject[i].scopusId) {
		var temp2 = document.createElement('a');
		temp2.href = "#";
		temp2.style.color = 'blue';
		temp2.onclick = function() {newMainArticle(rdObject[i]);};
		temp2.style.textDecoration = 'none';
		temp2.style.cssFloat = 'right';
		temp2.textContent = "Set as main article";
		temp.appendChild(temp2);
		//temp.appendChild(document.createElement('br'));
	}
	temp.appendChild(document.createElement('br'));
	if (rdObject[i].Abstract)
		temp.appendChild(document.createTextNode(rdObject[i].Abstract));
	else temp.appendChild(document.createTextNode("Abstract not available"));
	abstractRelevantHeight[i] = temp.clientHeight;
	temp.style.overflow = 'hidden';
	//console.log(abstractRelevantHeight[i]);
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractRelevantState[i] = 0;
	abstractRelevantMode[i] = 0;
}

function showRelevantDocumentCountryDistribution() {
	if (modeCountryDistributionRelevantDocument==0) {
		modeCountryDistributionRelevantDocument = 1;
		divCountryDistributionRelevantDocument.style.display = 'block';
	}
	else {
		modeCountryDistributionRelevantDocument = 0;
		divCountryDistributionRelevantDocument.style.display = 'none';
	}
}

function showOverallCountryRelevantDocument(crdObject) {
	console.log("show all");
	console.log (crdObject);
	while (divCountryDistributionRelevantDocument.firstChild) {
		divCountryDistributionRelevantDocument.removeChild(divCountryDistributionRelevantDocument.firstChild);
	}
	divCountryDistributionRelevantDocument.appendChild(hrefCountryTypeRelevantDocument);
	divCountryDistributionRelevantDocument.appendChild(document.createElement('br'));
	for (var i=0; i<crdObject.length; i++) {
		var temp = document.createElement('a');
		temp.href = "javascript:focusToCountryRelevantDocument('"+crdObject[i].name+"')";
		temp.style.color = 'blue';
		temp.textContent = crdObject[i].name;
		temp.style.textDecoration = 'none';
		divCountryDistributionRelevantDocument.appendChild(temp);
		divCountryDistributionRelevantDocument.appendChild(document.createTextNode(" ("+crdObject[i].hitCount+")"));
		divCountryDistributionRelevantDocument.appendChild(document.createElement('br'));
	}
}

function focusToCountryRelevantDocument(crdObjectName) {
	viewAllModeActive = 0;
	modeInMap = relevantDocumentMode;
	if (modeCountryTypeRelevantDocument==0) {
		defaultChangedRelevantDocument = 1;
		var temp=new Object;
		temp.country=crdObjectName;
		getRelevantDocumentFilter1(new Array(temp));
	}
	else {
		getRelevantDocumentFilter2(new Array(crdObjectName));
	}
	highlight(getObject(crdObjectName));
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
	divCountryDistributionRelevantDocument.style['z-index'] = zIndex;
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
	modeCountryDistributionRelevantDocument = 0;
	divCountryDistributionRelevantDocument.style.display = 'none';
	hrefCDRD.textContent = "View country distribution";
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
	ctxMenu.drawImage(imgRelevantDocument[relevantDocumentVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
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
		divCountryDistributionRelevantDocument.style.top = relevantDocumentPosY + 27 + "px";
		divCountryDistributionRelevantDocument.style.left = relevantDocumentPosX-parseInt(divCountryDistributionRelevantDocument.style.width) + 8 + 'px';
		
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