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

var listCoAuthorHeight = new Array();
var listCoAuthorState = new Array();
var listCoAuthorMode = new Array();
var listCoAuthorTotal = 20;
var contentCoAuthor;
var showCoAuthorinMap = 1;
var showCoAuthorHref;
var divCountryDistributionCoAuthor;
var modeCountryDistributionCoAuthor = 0;
var modeCountryTypeCoAuthor = 0;

//var hrefCountryTypeCoAuthor;
var hrefCDCA;

function initializeCoAuthor() {
	divCoAuthor = document.getElementById("windowCoAuthor");
	coAuthorPosX = 760;
	coAuthorPosY = 110;
	coAuthorWidth = parseInt(divCoAuthor.style.width);
	coAuthorHeight = parseInt(divCoAuthor.style.height);
	//divCoAuthor.style.display = "none";
	divCoAuthor.style.width = '0px';
	divCoAuthor.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 4*frameWidth+3*buttonMenuWidth, frameWidth);
	contentCoAuthor = document.createElement('div');
	divCoAuthor.appendChild(contentCoAuthor);
	contentCoAuthor.setAttribute('id', "contentCoAuthor");
	contentCoAuthor.style.position = 'absolute';
	contentCoAuthor.style.top = topbarHeight-9 + 'px';
	contentCoAuthor.style.left = 1 + 'px';
	contentCoAuthor.style.width = coAuthorWidth-2 + 'px';
	contentCoAuthor.style.height = coAuthorHeight-topbarHeight+7 +'px';
	contentCoAuthor.style['overflow-x'] = 'hidden';
	contentCoAuthor.style['overflow-y'] = 'auto';
	
	showCoAuthorHref = document.createElement('a');
	showCoAuthorHref.href = "#";
	showCoAuthorHref.textContent = "Show documents in map";

	divCountryDistributionCoAuthor = document.createElement('div');
	divCountryDistributionCoAuthor.style.background = '#F2F1EF';
	divCountryDistributionCoAuthor.style.position = 'absolute';
	divCountryDistributionCoAuthor.style.width = '130px';
	divCountryDistributionCoAuthor.style.height = '300px';
	divCountryDistributionCoAuthor.style.top = coAuthorPosY + 27 + 'px';
	divCountryDistributionCoAuthor.style.left = coAuthorPosX-parseInt(divCountryDistributionCoAuthor.style.width) + 8 + 'px';
	divCountryDistributionCoAuthor.style['z-index'] = 0;
	divCountryDistributionCoAuthor.style.overflow = 'hidden';
	divCountryDistributionCoAuthor.style.display = 'none';
	document.body.appendChild(divCountryDistributionCoAuthor);

	hrefCDCA = document.createElement('a');
	hrefCDCA.textContent = "View country distribution";
	hrefCDCA.href = "#";
	hrefCDCA.onclick = function () {
		showCoAuthorCountryDistribution();
		if (modeCountryDistributionCoAuthor==0)
			hrefCDCA.textContent = "View country distribution";
		else hrefCDCA.textContent = "Hide country distribution";
	};
}

function updateCoauthors (caObject, caMode) {
	removecontentCoAuthorChild();
	//console.log("update");
	//console.log(caObject);
	if (caObject.length>0) {
		if (caMode=1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.onclick = function () {
				modeInMap = coAuthorsMode;
				viewAllModeACtive = 0;
				showResult(coAuthorsMode, coauthorsObject);
				updateCoauthors (caObject, 0);	
			}
			temp.textContent = "Show all result";
			contentCoAuthor.appendChild(temp);
			contentCoAuthor.appendChild(document.createElement('br'));
		}
		
		showCoAuthorHref.onclick = function () {
			modeInMap = coAuthorsMode;
			viewAllModeActive = 0;
			showResult(coAuthorsMode, caObject);
		}
		contentCoAuthor.appendChild(showCoAuthorHref);
		contentCoAuthor.appendChild(document.createElement('br'));
		//console.log("coauthors number = " + caObject.length);
		
		contentCoAuthor.appendChild(hrefCDCA);
		contentCoAuthor.appendChild(document.createElement('br'));
		for (var i=0; i<caObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentCoAuthor").appendChild(temp);
			temp.setAttribute('id', "CoAuthor" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertCoauthors(caObject, i);
		}

		if (currentLevelCoauthors>1) {
			temp = document.createElement('a');
			contentCoAuthor.appendChild(temp);
			temp.href="javascript:downCoauthors()";
			temp.textContent = "Previous";
		}
		if (currentLevelCoauthors<totalLevelCoauthors) {
			temp = document.createElement('a');
			contentCoAuthor. appendChild(temp);
			temp.href = "javascript:upCoauthors()";
			temp.textContent = "Next";
		}
	}
	else {
		document.getElementById("contentCoAuthor").innerHTML = "This author has no co-Authors.";
	}
}

function insertCoauthors(caObject, i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "CoAuthor" + i + "_image");
	temp.src = imgExpand.src;
	temp.onclick = function () {showListCoAuthor(i);};
	document.getElementById("CoAuthor"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.onclick = function () {
		if (listCoAuthorMode[i]==0) {
			showListCoAuthor(i);
		}
		viewAllModeActive = 0;
		modeInMap = coAuthorsMode;
		showResult(coAuthorsMode, caObject);
		highlight(caObject[i]);
	};
	temp.href = "#";
	temp.textContent = (currentLevelCoauthors-1)*200+i+1 + " " + caObject[i].name['given-name'] + ", " + caObject[i].name.surname;
	document.getElementById("CoAuthor"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("CoAuthor"+i).appendChild(temp);
	temp.setAttribute('id', "CoAuthor" + i + "_affiliation");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = citedByWidth - 45 + 'px';
	if (caObject[i].url) {
		var temp2 = document.createElement('a');
		temp2.textContent = "Show in Scopus";
		temp2.href = "javascript:window.open('" + caObject[i].url + "')";
		temp.appendChild(temp2);
		temp.appendChild(document.createElement('br'));
	}
	if (caObject[i].affiliationName) {
		temp.appendChild(document.createTextNode("Affiliation: " + caObject[i].affiliationName));;
		temp.appendChild(document.createElement('br'));
	}
	if (caObject[i].city) {
		temp.appendChild(document.createTextNode("City: " + caObject[i].city));
		temp.appendChild(document.createElement('br'));
	}
	if (caObject[i].country) {
		temp.appendChild(document.createTextNode("Country:" + caObject[i].country));
		temp.appendChild(document.createElement('br'));
	}
	temp.style.overflow = 'hidden';
	listCoAuthorHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	listCoAuthorState[i] = 0;
	listCoAuthorMode[i] = 0;
	//console.log(i+1);
}

function showListCoAuthor(i) {
	//console.log("show");
	if (listCoAuthorMode[i]==0) {
		document.getElementById("CoAuthor" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		listCoAuthorMode[i] = 1;
		expandAffiliationCoAuthor(i);
	}
	else {
		document.getElementById("CoAuthor" + i + "_image").src = imgExpand.src;
		listCoAuthorMode[i] = 0;
		contractAffiliationCoAuthor(i);
	}
}

function showCoAuthorCountryDistribution() {
	if (modeCountryDistributionCoAuthor==0) {
		modeCountryDistributionCoAuthor = 1;
		divCountryDistributionCoAuthor.style.display = 'block';
	}
	else {
		modeCountryDistributionCoAuthor = 0;
		divCountryDistributionCoAuthor.style.display = 'none';
	}
}

function showOverallCountryCoAuthor(ccaObject) {
	//console.log("counrycoauthor");
	//console.log(caObject);
	while (divCountryDistributionCoAuthor.firstChild) {
		divCountryDistributionCoAuthor.removeChild(divCountryDistributionCoAuthor.firstChild);
	}
	//divCountryDistributionCoAuthor.appendChild(hrefCountryTypeCoAuthor);
	//divCountryDistributionCoAuthor.appendChild(document.createElement('br'));
	for (var i=0; i<ccaObject.length; i++) {
		var temp = document.createElement('a');
		temp.href = "javascript:focusToCountryCoAuthor('"+ccaObject[i].name+"')";
		temp.textContent = ccaObject[i].name;
		divCountryDistributionCoAuthor.appendChild(document.createTextNode(" ("+ccaObject[i].hitCount+")"));
		divCountryDistributionCoAuthor.appendChild(document.createElement('br'));
	}
}

function focusToCountryCoAuthor(ccaObjectName) {
	//console.log("focus country");
	viewAllModeActive = 0;
	modeInMap = coAuthorsMode;
	getCoauthorsFilter(new Array(ccaObjectName));
	highlight(getObject(ccaObjectName));
}

function expandAffiliationCoAuthor(i) {
	//console.log(i);
	listCoAuthorState[i] += 1;
	document.getElementById("CoAuthor" + i + "_affiliation").style.height = listCoAuthorState[i]*listCoAuthorHeight[i]/listCoAuthorTotal + 'px';
	//console.log(abstractCitedHeight[i]);
	if (listCoAuthorState[i]<listCoAuthorTotal && listCoAuthorMode[i]==1) {
		setTimeout (function() {expandAffiliationCoAuthor(i);}, 10);
	}
}

function contractAffiliationCoAuthor(i) {
	//console.log(i);
	listCoAuthorState[i] -= 1;
	document.getElementById("CoAuthor" + i + "_affiliation").style.height = listCoAuthorState[i]*listCoAuthorHeight[i]/listCoAuthorTotal + 'px';
	if (listCoAuthorState[i]>0 && listCoAuthorMode[i]==0) {
		setTimeout (function(){contractAffiliationCoAuthor(i);}, 10);
	}
	//else if (abstractRefMode[i]==0)
		//document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}

function removecontentCoAuthorChild() {
	var el = document.getElementById("contentCoAuthor");
	while (el.firstChild) {
		//console.log(el.firstChild.id);
		el.removeChild(el.firstChild);
	}
	//console.log(el.lastChild.id);

}

function mouseDownCoAuthor(e){
  	divCoAuthor.style['z-index'] = zIndex;
  	divCountryDistributionCoAuthor.style['z-index'] = zIndex;
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
	modeCountryDistributionCoAuthor = 0;
	divCountryDistributionCoAuthor.style.display = 'none';
	hrefCDCA.textContent = "View country distribution";
	if (coAuthorStatus <= 0 && coAuthorIncrement==-1) {
		coAuthorStatus = 1;
	}
	else if (coAuthorStatus >= coAuthorTotalSteps && coAuthorIncrement==1) {
		coAuthorStatus = coAuthorTotalSteps - 1;
	}
	coAuthorStatus += coAuthorIncrement;
	divCoAuthor.style.width = coAuthorStatus*coAuthorWidth/coAuthorTotalSteps + "px";
	divCoAuthor.style.height = coAuthorStatus*coAuthorHeight/coAuthorTotalSteps + "px";
	divCoAuthor.style.left = (canvasMenu.offsetLeft+4*frameWidth+7*buttonMenuWidth/2) + coAuthorStatus*(coAuthorPosX+coAuthorWidth/2-canvasMenu.offsetLeft-4*frameWidth-7*buttonMenuWidth/2)/coAuthorTotalSteps - coAuthorStatus*coAuthorWidth/2/coAuthorTotalSteps + "px";
	divCoAuthor.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + coAuthorStatus*(coAuthorPosY-canvasMenu.offsetTop-canvasMenu.height/2)/coAuthorTotalSteps + "px";
	if (coAuthorStatus > 0) {
		//divCoAuthor.style.display = "block";
		coAuthorVisible = 1;
	}
	else {
		//divCoAuthor.style.display = "none";
		coAuthorVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 4*frameWidth+3*buttonMenuWidth, frameWidth);
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
		divCountryDistributionCoAuthor.style.top = coAuthorPosY + 27 + "px";
		divCountryDistributionCoAuthor.style.left = coAuthorPosX-parseInt(divCountryDistributionCoAuthor.style.width) + 8 + 'px';

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