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
var headerReference;
var contentReference;
//var showReferenceinMap = 1;
var showReferenceHref;
var divCountryDistributionReference;
var modeCountryDistributionReference = 0;
//var modeCountryTypeReference = 0;
//var hrefCountryTypeReference;
var hrefCDR;
var imgReference = new Array();
imgReference[0] = imgObject[4];
imgReference[1] = imgObject[9];

function initializeReference() {
	divReference = document.getElementById("windowReference");
	referencePosX = 700;
	referencePosY = 50;
	referenceWidth = parseInt(divReference.style.width);
	referenceHeight = parseInt(divReference.style.height);
	divReference.style.overflow = 'hidden';
	ctxMenu.drawImage(imgReference[referenceVisible], 0, 0);
	//console.log ("before");
	//setTimeout(insertReference, 3000);
	//console.log("after");
	
	headerReference = document.createElement('div');
	headerReference.style.position = 'relative';
	headerReference.style.top = '0px';
	headerReference.style.left ='0px';
	headerReference.style.height = '23px';
	headerReference.style.width = referenceWidth + 'px';
	headerReference.style.paddingLeft = '5px';
	headerReference.style.color = 'white';
	headerReference.appendChild(document.createTextNode("Reference"));
	divReference.appendChild(headerReference);
	headerReference.onselectstart = function() {return false};
	
	contentReference = document.createElement('div');
	divReference.appendChild(contentReference);
	contentReference.setAttribute('id', "contentReference");
	contentReference.style.position = 'relative';
	//contentReference.style.top = topbarHeight-9 + 'px';
	contentReference.style.left = 1 + 'px';
	contentReference.style.width = referenceWidth-2 + 'px';
	contentReference.style.height = referenceHeight-parseInt(headerReference.style.height) +'px';
	contentReference.style['overflow-x'] = 'hidden';
	contentReference.style['overflow-y'] = 'auto';
	
	showReferenceHref = document.createElement('a');
	showReferenceHref.style.color = 'blue';
	showReferenceHref.href = "#";
	showReferenceHref.textContent = "Show in map";
	
	divCountryDistributionReference = document.createElement('div');
	divCountryDistributionReference.style.background = '#F2F1EF';
	divCountryDistributionReference.style.position = 'absolute';
	divCountryDistributionReference.style.width = '130px';
	divCountryDistributionReference.style.height = '300px';
	divCountryDistributionReference.style.top = referencePosY + 27 + 'px';
	divCountryDistributionReference.style.left = referencePosX-parseInt(divCountryDistributionReference.style.width) + 2 + 'px';
	divCountryDistributionReference.style['z-index'] = 0;
	divCountryDistributionReference.style.overflow = 'auto';
	divCountryDistributionReference.style['border-radius'] = '4px';
	divCountryDistributionReference.style['-moz-border-radius'] = '4px';
	divCountryDistributionReference.style['-webkit-border-radius'] = '4px';
	divCountryDistributionReference.style.paddingLeft = '5px';
	divCountryDistributionReference.style.display = 'block';
	document.body.appendChild(divCountryDistributionReference);
	
	hrefCDR = document.createElement('a');
	hrefCDR.style.color = 'blue';
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
	console.log(rObject);
	//CHANGED
	while (headerReference.firstChild) 
	{
		headerReference.removeChild(headerReference.firstChild);
	}	
	headerReference.appendChild(document.createTextNode("References(" +rObject.length +")"));
	//////////////////////
//	contentReference.appendChild(document.createElement('br'));
	console.log("updatereference");
	console.log (rObject);
	if (rObject.length>0) {
		if (rMode==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.style.color = 'blue';
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
			temp.style.fontSize = '13px';
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
	if (typeof(rObject[i].title) != 'undefined' || rObject[i].sourcetitle || rObject[i].publicationName)
	{
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
		//CHANGED:
	//	temp.style.position = "absolute";
	//	temp.style.top = "0px";
		
		
		////////////////////
		temp.onclick = function () {
			if (abstractRefMode[i]==0) {
				showAbstractRef(i);
			}
			viewAllModeActive = 0;
			modeInMap = referenceMode;
			showResult(referenceMode, rObject);
			highlight(rObject[i]);
		};
		temp.href = "#";
		temp.style.color = 'blue';
		//CHANGED:
		/*var toStartOne = i+1;
		if ( typeof(rObject[i].title) != 'undefined') temp.textContent = toStartOne + " " + rObject[i].title;
		else temp.textContent = toStartOne + " " + rObject[i].sourcetitle;
		///////////////////////////
		*/
		var st = 0;
		if (rObject[i].title) {
			temp.textContent = rObject[i].title;
		}
		else if (rObject[i].sourcetitle){
			temp.textContent = rObject[i].sourcetitle;
			st=1;
		}
		else if (rObject[i].publicationName) {
			temp.textContent = rObject[i].publicationName;
			st=1;
		}
		row.insertCell(1).appendChild(temp);
	
		temp = document.createElement('div');
		temp.style.fontSize = '11px';
		temp.style.paddingLeft = '18px';
		document.getElementById("Reference"+i).appendChild(temp);
		//console.log("aa " + rObject[i].sourcetitle);
		if (st==0) {
			if (rObject[i].sourcetitle) {
				temp.appendChild (document.createTextNode(rObject[i].sourcetitle));
				if (rObject[i].citedby) {
					temp.appendChild(document.createTextNode(", cited "+rObject[i].citedby+" times"));
				}
				else if (rObject[i].citedbyCount) {
					temp.appendChild(document.createTextNode(", cited "+rObject[i].citedbyCount+" times"));
				}
			}
			else if (rObject[i].publicationName) {
				temp.appendChild (document.createTextNode(rObject[i].publicationName));
				if (rObject[i].citedby) {
					temp.appendChild(document.createTextNode(", cited "+rObject[i].citedby+" times"));
				}
				else if (rObject[i].citedbyCount) {
					temp.appendChild(document.createTextNode(", cited "+rObject[i].citedbyCount+" times"));
				}
			}
			temp.appendChild(document.createElement('br'));
		}
		if (rObject[i].author) {
			if ( typeof(rObject[i].author[0].authname)!= 'undefined' )temp.appendChild(document.createTextNode(rObject[i].author[0].authname));
			else temp.appendChild(document.createTextNode(rObject[i].author[0]["ce:indexed-name"]));
			for (var j=1; j<rObject[i].author.length; j++) {
				if (j==3) {
					temp.appendChild(document.createTextNode(", et al."));
					break;
				}
				if ( typeof(rObject[i].author[j].authname)!= 'undefined' )temp.appendChild(document.createTextNode(", "+rObject[i].author[j].authname));
				else temp.appendChild(document.createTextNode(rObject[i].author[j]["ce:indexed-name"]));
			}
			temp.appendChild(document.createElement('br'));
		}
		if (rObject[i].affilname) {
			temp.appendChild(document.createTextNode(rObject[i].affilname.split('|')[0]));
			temp.appendChild(document.createElement('br'));
		}
		
		if (rObject[i].city) {
			temp.appendChild(document.createTextNode(rObject[i].city));
			if (rObject[i].country) {
				temp.appendChild(document.createTextNode(", "+rObject[i].country));
			}
			temp.appendChild(document.createElement('br'));
		}
		else if (rObject[i].country) {
			temp.appendChild(document.createTextNode(rObject[i].country));
			temp.appendChild(document.createElement('br'));
		}
	
		temp = document.createElement('div');
		temp.style.fontSize = '11px';
		row.insertCell(1).appendChild(temp);
		temp = document.createElement('div');
		temp.align = 'justify';
		document.getElementById("Reference"+i).appendChild(temp);
		temp.setAttribute('id', "Reference" + i + "_abstract");
		temp.style.position = 'relative';
		temp.style.left = 18 + 'px';
		temp.style.width = referenceWidth - 43 + 'px';
		if (rObject[i].url) {
			var temp2 = document.createElement('a');
			temp2.textContent = "Show in Scopus";
			temp2.href = "javascript:window.open('" + rObject[i].url + "')";
			temp2.style.color = 'blue';
			temp2.style.textDecoration = 'none';
			temp.appendChild(temp2);
			//temp.appendChild(document.createElement('br'));
		}
		//temp.appendChild(document.createElement('br'));
		if (rObject[i].authorId && rObject[i].scopusId) {
			var temp2 = document.createElement('a');
			temp2.textContent = "Set as main article";
			temp2.href = "#";
			temp2.style.color = 'blue';
			temp2.style.textDecoration = 'none';
			temp2.style.cssFloat = 'right';
			temp2.onclick = function() {newMainArticle(rObject[i]);};
			temp.appendChild(temp2);
			//temp.appendChild(document.createElement('br'));
		}
		temp.appendChild(document.createElement('br'));
		if (rObject[i].Abstract) {
			temp.appendChild(document.createTextNode("Abstract:"));
			temp.appendChild(document.createElement('br'));
			temp.appendChild(document.createTextNode(rObject[i].Abstract));
		}
		else temp.appendChild(document.createTextNode("Abstract not available"));
		temp.style.overflow = 'hidden';
		abstractRefHeight[i] = temp.clientHeight;
		temp.style.height = 0 + 'px';
		//temp.style.display = 'none';
		abstractRefState[i] = 0;
		abstractRefMode[i] = 0;
	
	}
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
		temp.href = "javascript:focusToCountryReference('" + crObject[i].name + "')";
		temp.style.color = 'blue';
//		temp.href = "javascript:console.log('" + crObject[i].name + "')";
		temp.textContent = crObject[i].name;
		temp.style.textDecoration = 'none';
		divCountryDistributionReference.appendChild(temp);
		divCountryDistributionReference.appendChild(document.createTextNode(" ("+crObject[i].hitCount+")"));
		divCountryDistributionReference.appendChild(document.createElement('br'));
	}
}


function focusToCountryReference(crObjectName) {
	console.log("focus country");
	viewAllModeActive = 0;
	modeInMap = referenceMode;
	getReferenceFilter(new Array(crObjectName));
//	console.log(crObjectName);
//	console.log(getObject(crObjectName));
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
	ctxMenu.drawImage(imgReference[referenceVisible], 0, 0);
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
		divCountryDistributionReference.style.top = referencePosY + 27 + "px";
		divCountryDistributionReference.style.left = referencePosX-parseInt(divCountryDistributionReference.style.width) + 2 + 'px';
		
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