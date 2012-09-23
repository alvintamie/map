var isMouseDownCitedBy=0;
var deltaCitedByPositionX;
var deltaCitedByPositionY;
var citedByStatus=0;
var citedByTotalSteps=15;
var citedByIncrement = -1;
var citedByVisible=0;
var citedByPosX;
var citedByPosY;
var citedByWidth;
var citedByHeight;

var abstractCitedHeight = new Array();
var abstractCitedState = new Array();
var abstractCitedMode = new Array();
var abstractCitedTotal = 20;
var contentCitedBy;
var showCitedByinMap = 1;
var showCitedByHref;
var divCountryDistributionCitedBy;
var modeCountryDistributionCitedBy = 0;
var modeCountryTypeCitedBy = 0;
var defaultChangedCitedBy = 0;
var hrefCountryTypeCitedBy;
var hrefCDCB;

function initializeCitedBy() {
	divCitedBy = document.getElementById("windowCitedBy");
	citedByPosX = 720;
	citedByPosY = 70;
	citedByWidth = parseInt(divCitedBy.style.width);
	citedByHeight = parseInt(divCitedBy.style.height);
	//divCitedBy.style.display = "none";
	divCitedBy.style.width = '0px';
	divCitedBy.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
	
	contentCitedBy = document.createElement('div');
	divCitedBy.appendChild(contentCitedBy);
	contentCitedBy.setAttribute('id', "contentCitedBy");
	contentCitedBy.style.position = 'absolute';
	contentCitedBy.style.top = topbarHeight-9 + 'px';
	contentCitedBy.style.left = 1 + 'px';
	contentCitedBy.style.width = citedByWidth-2 + 'px';
	contentCitedBy.style.height = citedByHeight-topbarHeight+7 +'px';
	contentCitedBy.style['overflow-x'] = 'hidden';
	contentCitedBy.style['overflow-y'] = 'auto';
	
	showCitedByHref = document.createElement('a');
	showCitedByHref.href = "#";
	showCitedByHref.textContent = "Show in map";
	
	divCountryDistributionCitedBy = document.createElement('div');
	divCountryDistributionCitedBy.style.background = 'yellow';
	divCountryDistributionCitedBy.style.position = 'absolute';
	divCountryDistributionCitedBy.style.width = '200px';
	divCountryDistributionCitedBy.style.height = '300px';
	divCountryDistributionCitedBy.style.top = citedByPosY + 'px';
	divCountryDistributionCitedBy.style.left = citedByPosX-parseInt(divCountryDistributionCitedBy.style.width) + 'px';
	divCountryDistributionCitedBy.style['z-index'] = 0;
	divCountryDistributionCitedBy.style.overflow = 'hidden';
	divCountryDistributionCitedBy.style.display = 'none';
	document.body.appendChild(divCountryDistributionCitedBy);
	
	hrefCountryTypeCitedBy = document.createElement('a');
	hrefCountryTypeCitedBy.textContent = "View 25 result distribution";
	hrefCountryTypeCitedBy.href = "#";
	hrefCountryTypeCitedBy.onclick = function () {
		if (modeCountryTypeCitedBy==0) {
			modeCountryTypeCitedBy = 1;
			hrefCountryTypeCitedBy.textContent = "View overall result distribution";
			changeModeCitedby();
		}
		else {
			modeCountryTypeCitedBy = 0;
			hrefCountryTypeCitedBy.textContent = "View 25 result distribution";
			showOverallCountryCitedBy(countryCitedby);
		}
		//showOverallCountryCitedBy(countryCitedby);
	}
	//showOverallCountryCitedBy(countryCitedby);
	
	hrefCDCB = document.createElement('a');
	hrefCDCB.textContent = "View country distribution";
	hrefCDCB.href = "#";
	hrefCDCB.onclick = function () {
		showCitedByCountryDistribution();
		if (modeCountryDistributionCitedBy==0)
			hrefCDCB.textContent = "View country distribution";
		else hrefCDCB.textContent = "Hide country distribution";
	};
}

function updateCitedBy (cbObject, cbMode) {
	removecontentCitedByChild();
	//console.log("wewe");
	//console.log(cbObject);
	if (cbObject.length>0) {
		showCitedByHref.onclick = function () {showResult(0, cbObject)};
		contentCitedBy.appendChild(showCitedByHref);
		contentCitedBy.appendChild(document.createElement('br'));
		if (cbMode==1 || defaultChangedCitedBy==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.onclick = function () {
				if (defaultChangedCitedBy==1) {
					resetQueryCitedby();
					defaultChangedCitedBy = 0;
				}
				else {
					updateCitedBy(citedbyObject, 0);
					showResult(0, cbObject);

				}
				modeCountryTypeCitedBy = 1;
				hrefCountryTypeCitedBy.textContent = "View overall result distribution";
				showOverallCountryCitedBy(countryCitedby);
			}
			temp.textContent = "Show all result";
			contentCitedBy.appendChild(temp);
			contentCitedBy.appendChild(document.createElement('br'));
		}
		
		contentCitedBy.appendChild(hrefCDCB);
		contentCitedBy.appendChild(document.createElement('br'));
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		
		for (var i=0; i<cbObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentCitedBy").appendChild(temp);
			temp.setAttribute('id', "CitedBy" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertCitedBy(cbObject, i);
		}
		if (cbMode==0) {
			if (currentLevelCitation>1) {
				temp = document.createElement('a');
				document.getElementById("contentCitedBy").appendChild(temp);
				temp.href="javascript:downCitedby()";
				temp.textContent = "Previous";
				contentCitedBy.appendChild(document.createTextNode(" "));
			}
			
			if (currentLevelCitation<totalLevelCitation) {
				temp = document.createElement('a');
				document.getElementById("contentCitedBy"). appendChild(temp);
				temp.href = "javascript:upCitedby()";
				temp.textContent = "Next";
			}
		}
	}
	else {
		document.getElementById("contentCitedBy").innerHTML = "This paper has not been cited yet.";
	}
}

function insertCitedBy(cbObject, i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "CitedBy" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractCited(i);};
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.onclick = function () {
		if (abstractCitedMode[i]==0) {
			showAbstractCited(i);
			highlight(cbObject[i]);
			showResult (0, cbObject);
		}
	};
	temp.href = "#";
	temp.textContent = (currentLevelCitation-1)*25+i+1 + " " + cbObject[i].title;
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp.setAttribute('id', "CitedBy" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = citedByWidth - 45 + 'px';
	if (cbObject[i].url) {
		var temp2 = document.createElement('a');
		temp2.textContent = "Show in Scopus";
		temp2.href = "javascript:window.open('" + cbObject[i].url + "')";
		temp.appendChild(temp2);
		temp.appendChild(document.createElement('br'));
	}
	if (cbObject[i].Abstract)
		temp.appendChild(document.createTextNode(cbObject[i].Abstract));
	else temp.appendChild(document.createTextNode("Abstract not available"));
	temp.style.overflow = 'hidden';
	abstractCitedHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractCitedState[i] = 0;
	abstractCitedMode[i] = 0;
}

function showCitedByCountryDistribution() {
	if (modeCountryDistributionCitedBy==0) {
		modeCountryDistributionCitedBy = 1;
		divCountryDistributionCitedBy.style.display = 'block';
	}
	else {
		modeCountryDistributionCitedBy = 0;
		divCountryDistributionCitedBy.style.display = 'none';
	}
}

function showOverallCountryCitedBy(ccbObject) {
	while (divCountryDistributionCitedBy.firstChild) {
		divCountryDistributionCitedBy.removeChild(divCountryDistributionCitedBy.firstChild);
	}
	divCountryDistributionCitedBy.appendChild(hrefCountryTypeCitedBy);
	divCountryDistributionCitedBy.appendChild(document.createElement('br'));
	for (var i=0; i<ccbObject.length; i++) {
		divCountryDistributionCitedBy.appendChild(document.createTextNode(ccbObject[i].name + " : " + ccbObject[i].hitCount));
		divCountryDistributionCitedBy.appendChild(document.createTextNode("	"));
		var temp = document.createElement('a');
		temp.href = "javascript:findCountryDocumentCitedBy(new Array('"+ccbObject[i].name+"'))";
		temp.textContent = "focus to this country";
		divCountryDistributionCitedBy.appendChild(temp);
		divCountryDistributionCitedBy.appendChild(document.createElement('br'));
	}
}

function findCountryDocumentCitedBy(ccbString) {
	defaultChangedCitedBy = 1;
console.log("111111111111111");
	if (modeCountryTypeCitedBy==0) {
		var temp=new Object;
		temp.country=ccbString;
		getCitedbyFilter1(new Array(temp));
	}
	else {
		getCitedbyFilter2(ccbString);
	}
	console.log("ini string");
	console.log(ccbString);
	highlight(getObject(ccbString[0]));
}

function showAbstractCited(i) {
	//console.log("show");
	if (abstractCitedMode[i]==0) {
		document.getElementById("CitedBy" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		abstractCitedMode[i] = 1;
		expandAbstractCited(i);
	}
	else {
		document.getElementById("CitedBy" + i + "_image").src = imgExpand.src;
		abstractCitedMode[i] = 0;
		contractAbstractCited(i);
	}
}

function expandAbstractCited(i) {
	//console.log(i);
	abstractCitedState[i] += 1;
	document.getElementById("CitedBy" + i + "_abstract").style.height = abstractCitedState[i]*abstractCitedHeight[i]/abstractCitedTotal + 'px';
	//console.log(abstractCitedHeight[i]);
	if (abstractCitedState[i]<abstractCitedTotal && abstractCitedMode[i]==1) {
		setTimeout (function() {expandAbstractCited(i)}, 10);
	}
}

function contractAbstractCited(i) {
	//console.log(i);
	abstractCitedState[i] -= 1;
	document.getElementById("CitedBy" + i + "_abstract").style.height = abstractCitedState[i]*abstractCitedHeight[i]/abstractCitedTotal + 'px';
	if (abstractCitedState[i]>0 && abstractCitedMode[i]==0) {
		setTimeout (function(){contractAbstractCited(i);}, 10);
	}
	//else if (abstractRefMode[i]==0)
		//document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}

function removecontentCitedByChild() {
	var el = document.getElementById("contentCitedBy");
	while (el.firstChild) {
		//console.log(el.firstChild.id);
		el.removeChild(el.firstChild);
	}
	//console.log(el.lastChild.id);
	
}

function mouseDownCitedBy(e){
  	divCitedBy.style['z-index'] = zIndex;
  	divCountryDistributionCitedBy.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divCitedBy.offsetTop<topbarHeight) {
		if (e.clientX-divCitedBy.offsetLeft<=parseInt(divCitedBy.style.width)-minimizePosWidth) {
			isMouseDownCitedBy=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divCitedBy.offsetLeft>parseInt(divCitedBy.style.width)-minimizePosWidth) {
			citedByIncrement *= -1;
			changeViewCitedBy();
		}
	}
}
	
function changeViewCitedBy() {
	modeCountryDistributionCitedBy = 0;
	divCountryDistributionCitedBy.style.display = 'none';
	hrefCDCB.textContent = "View country distribution";
	if (citedByStatus <= 0 && citedByIncrement==-1) {
		citedByStatus = 1;
	}
	else if (citedByStatus >= citedByTotalSteps && citedByIncrement==1) {
		citedByStatus = citedByTotalSteps - 1;
	}
	citedByStatus += citedByIncrement;
	divCitedBy.style.width = citedByStatus*citedByWidth/citedByTotalSteps + "px";
	divCitedBy.style.height = citedByStatus*citedByHeight/citedByTotalSteps + "px";
	divCitedBy.style.left = (canvasMenu.offsetLeft+2*frameWidth+3*buttonMenuWidth/2) + citedByStatus*(citedByPosX+citedByWidth/2-canvasMenu.offsetLeft-2*frameWidth-3*buttonMenuWidth/2)/citedByTotalSteps - citedByStatus*citedByWidth/2/citedByTotalSteps + "px";
	divCitedBy.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + citedByStatus*(citedByPosY-canvasMenu.offsetTop-canvasMenu.height/2)/citedByTotalSteps + "px";
	if (citedByStatus > 0) {
		//divCitedBy.style.display = "block";
		citedByVisible = 1;
	}
	else {
		//divCitedBy.style.display = "none";
		citedByVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
	if (citedByStatus > 0 && citedByStatus <citedByTotalSteps) setTimeout (changeViewCitedBy, 10);
}

function citedByDisplacement(e){
	if(e.clientX>divCitedBy.offsetLeft && e.clientY>divCitedBy.offsetTop && e.clientY-divCitedBy.offsetTop<topbarHeight) {
		if (e.clientX-divCitedBy.offsetLeft<=parseInt(divCitedBy.style.width)-minimizePosWidth) {
			divCitedBy.style.cursor = "move";
		}
		else if (e.clientX-divCitedBy.offsetLeft>parseInt(divCitedBy.style.width)-minimizePosWidth) {
			divCitedBy.style.cursor = "default";
		}
	}
	else {
		divCitedBy.style.cursor = "default";
	}
	if(isMouseDownCitedBy) {
		citedByPosX += e.clientX - lastMouseX;
		citedByPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divCitedBy.style.left = citedByPosX + "px";
		divCitedBy.style.top  = citedByPosY + "px";
		if(divCitedBy.offsetTop<0) {
			divCitedBy.style.top="0px";
			citedByPosY = 0;
		}
		divCountryDistributionCitedBy.style.top = citedByPosY + "px";
		divCountryDistributionCitedBy.style.left = citedByPosX-parseInt(divCountryDistributionCitedBy.style.width) + 'px';
		/*
		if(divCitedBy.offsetLeft<0){
			divCitedBy.style.left="0px";
			console.log(divCitedBy.offsetLeft);
			console.log(divCitedBy.style.left);
		}
		if(divCitedBy.offsetLeft+parseInt(divCitedBy.style.width)>window.innerWidth)
			divCitedBy.style.left = (window.innerWidth - parseInt(divCitedBy.style.width)) +"px";
		if(divCitedBy.offsetTop+parseInt(divCitedBy.style.height)>window.innerHeight)
			divCitedBy.style.top = (window.innerHeight-parseInt(divCitedBy.style.height))+"px";
		*/
	}	
}