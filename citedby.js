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
var headerCitedBy;
var showCitedByinMap = 1;
var showCitedByHref;
var divCountryDistributionCitedBy;
var modeCountryDistributionCitedBy = 0;
var modeCountryTypeCitedBy = 0;
var defaultChangedCitedBy = 0;
var hrefCountryTypeCitedBy;
var hrefCDCB;
var imgCitedBy = new Array();
imgCitedBy[0] = imgObject[5];
imgCitedBy[1] = imgObject[10];

function initializeCitedBy() {
	divCitedBy = document.getElementById("windowCitedBy");
	divCitedBy.style.overflow = 'hidden';
	citedByPosX = 720;
	citedByPosY = 70;
	citedByWidth = parseInt(divCitedBy.style.width);
	citedByHeight = parseInt(divCitedBy.style.height);
	//divCitedBy.style.display = "none";
	divCitedBy.style.width = '0px';
	divCitedBy.style.height = '0px';
	ctxMenu.drawImage(imgCitedBy[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
	
	headerCitedBy = document.createElement('div');
	headerCitedBy.style.position = 'relative';
	headerCitedBy.style.top = '0px';
	headerCitedBy.style.left ='0px';
	headerCitedBy.style.height = '23px';
	headerCitedBy.style.width = citedByWidth + 'px';
	headerCitedBy.style.paddingLeft = '5px';
	headerCitedBy.style.color = 'white';
	headerCitedBy.appendChild(document.createTextNode("Cited By"));
	divCitedBy.appendChild(headerCitedBy);
	headerCitedBy.onselectstart = function() {return false};
	
	contentCitedBy = document.createElement('div');
	divCitedBy.appendChild(contentCitedBy);
	contentCitedBy.setAttribute('id', "contentCitedBy");
	contentCitedBy.style.position = 'relative';
	//contentCitedBy.style.top = topbarHeight-9 + 'px';
	contentCitedBy.style.left = 1 + 'px';
	contentCitedBy.style.width = citedByWidth-2 + 'px';
	contentCitedBy.style.height = citedByHeight-parseInt(headerCitedBy.style.height) +'px';
	contentCitedBy.style['overflow-x'] = 'hidden';
	contentCitedBy.style['overflow-y'] = 'auto';
	
	showCitedByHref = document.createElement('a');
	showCitedByHref.style.color = 'blue';
	showCitedByHref.href = "#";
	showCitedByHref.textContent = "Show in map";
	
	
	divCountryDistributionCitedBy = document.createElement('div');
	divCountryDistributionCitedBy.style.background = '#F2F1EF';
	divCountryDistributionCitedBy.style.position = 'absolute';
	divCountryDistributionCitedBy.style.width = '130px';
	divCountryDistributionCitedBy.style.height = '300px';
	divCountryDistributionCitedBy.style.top = citedByPosY + 27 + 'px';
	divCountryDistributionCitedBy.style.left = citedByPosX-parseInt(divCountryDistributionCitedBy.style.width) + 8 + 'px';
	divCountryDistributionCitedBy.style['z-index'] = 0;
	divCountryDistributionCitedBy.style.overflow = 'hidden';
	divCountryDistributionCitedBy.style.display = 'none';
	document.body.appendChild(divCountryDistributionCitedBy);
	
	hrefCountryTypeCitedBy = document.createElement('a');
	hrefCountryTypeCitedBy.href = "#";
	hrefCountryTypeCitedBy.style.color = 'blue';
	hrefCountryTypeCitedBy.textContent = "View 25 result distribution";
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
	hrefCDCB.href = "#";
	hrefCDCB.style.color = 'blue';
	hrefCDCB.textContent = "View country distribution";
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
	//CHANGED:
	while (headerCitedBy.firstChild) 
	{
		headerCitedBy.removeChild(headerCitedBy.firstChild);
	}	
	headerCitedBy.appendChild(document.createTextNode("Cited by(" +total_Citedby +"):"));
	
	
	//////////////////
	if (cbObject.length>0) {
		
	
		if (cbMode==1 || defaultChangedCitedBy==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.style.color = 'blue';
			temp.onclick = function () {
				if (defaultChangedCitedBy==1) {
					modeInMap = citedByMode;
					viewAllModeActive = 0;
					defaultChangedCitedBy = 0;
					resetQueryCitedby();

				}
				else {
					viewAllModeActive = 0;
					modeInMap = citedByMode;
					showResult(0, cbObject);
					updateCitedBy(citedbyObject, 0);
					showOverallCountryCitedBy(countryCitedby);

				}
				modeCountryTypeCitedBy = 1;
				hrefCountryTypeCitedBy.textContent = "View overall result distribution";
			}
			temp.textContent = "Show all result";
			contentCitedBy.appendChild(temp);
			contentCitedBy.appendChild(document.createElement('br'));
		}
		
		showCitedByHref.onclick = function () {
		viewAllModeActive = 0;
		modeInMap = citedByMode;
		showResult(citedByMode, cbObject);		
		};
		
		contentCitedBy.appendChild(showCitedByHref);
		contentCitedBy.appendChild(document.createElement('br'));
		
		contentCitedBy.appendChild(hrefCDCB);
		contentCitedBy.appendChild(document.createElement('br'));
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		
		for (var i=0; i<cbObject.length; i++) {
			var temp = document.createElement('div');
			temp.style.fontSize = '13px';
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
				temp.style.color = 'blue';
				temp.textContent = "Previous";
				contentCitedBy.appendChild(document.createTextNode(" "));
			}
			
			if (currentLevelCitation<totalLevelCitation) {
				temp = document.createElement('a');
				document.getElementById("contentCitedBy"). appendChild(temp);
				temp.href = "javascript:upCitedby()";
				temp.style.color = 'blue';
				temp.textContent = "Next";
				temp.style.cssFloat = 'right';
			}
		}
	}
	else {
		document.getElementById("contentCitedBy").innerHTML = "This paper has not been cited yet.";
	}
}

function insertCitedBy(cbObject, i) {
	if (typeof(rObject[i].title) != 'undefined' || rObject[i].sourcetitle || rObject[i].publicationName)
	{
		var tempTable = document.createElement('table');
		//tempTable.align = 'justify';
		document.getElementById("CitedBy"+i).appendChild(tempTable);
		
		var temp = document.createElement("IMG");
		temp.setAttribute('id', "CitedBy" + i + "_image");
		temp.src = imgExpand.src;
		//temp.setAttribute('onclick', "showAbstractRef("+i+")");
		temp.onclick = function () {showAbstractCited(i);};
		var row = tempTable.insertRow(0);
		row.insertCell(0).appendChild(temp);
		
		temp = document.createElement("a");
		temp.style['font-weight'] = 'bold';
		temp.style.textDecoration = 'none';
		temp.onclick = function () {
			if (abstractCitedMode[i]==0) {
				showAbstractCited(i);
			}
				viewAllModeActive = 0;
				modeInMap = citedByMode;
				showResult (citedByMode, cbObject);
				highlight(cbObject[i]);
		};
		temp.href = "#";
		//temp.textContent = (currentLevelCitation-1)*25+i+1 + " " + cbObject[i].title;
		temp.style.color = 'blue';
		temp.textContent = cbObject[i].title;
		var st = 0;
		if (cbObject[i].title) {
			temp.textContent = cbObject[i].title;
		}
		else if (cbObject[i].sourcetitle){
			temp.textContent = cbObject[i].sourcetitle;
			st=1;
		}
		else if (cbObject[i].publicationName) {
			temp.textContent = cbObject[i].publicationName;
			st=1;
		}
		row.insertCell(1).appendChild(temp);
	
		temp = document.createElement('div');
		temp.style.fontSize = '11px';
		temp.style.paddingLeft = '18px';
		document.getElementById("CitedBy"+i).appendChild(temp);
		console.log("aa " + cbObject[i].sourcetitle);
		if (st==0) {
			if (cbObject[i].sourcetitle) {
				temp.appendChild (document.createTextNode(cbObject[i].sourcetitle));
				if (cbObject[i].citedby) {
					temp.appendChild(document.createTextNode(", cited "+cbObject[i].citedby+" times"));
				}
				else if (cbObject[i].citedbyCount) {
					temp.appendChild(document.createTextNode(", cited "+cbObject[i].citedbyCount+" times"));
				}
			}
			else if (cbObject[i].publicationName) {
				temp.appendChild (document.createTextNode(cbObject[i].publicationName));
				if (cbObject[i].citedby) {
					temp.appendChild(document.createTextNode(", cited "+cbObject[i].citedby+" times"));
				}
				else if (cbObject[i].citedbyCount) {
					temp.appendChild(document.createTextNode(", cited "+cbObject[i].citedbyCount+" times"));
				}
			}
			temp.appendChild(document.createElement('br'));
		}
		if (cbObject[i].author) {
			if ( typeof(cbObject[i].author[0].authname)!= 'undefined' )temp.appendChild(document.createTextNode(cbObject[i].author[0].authname));
			else temp.appendChild(document.createTextNode(cbObject[i].author[0]["ce:indexed-name"]));
			for (var j=1; j<cbObject[i].author.length; j++) {
				if (j==3) {
					temp.appendChild(document.createTextNode(", et al."));
					break;
				}
				if ( typeof(cbObject[i].author[j].authname)!= 'undefined' )temp.appendChild(document.createTextNode(", "+cbObject[i].author[j].authname));
				else temp.appendChild(document.createTextNode(cbObject[i].author[j]["ce:indexed-name"]));
			}
			temp.appendChild(document.createElement('br'));
		}
		if (cbObject[i].affilname) {
			temp.appendChild(document.createTextNode(cbObject[i].affilname.split('|')[0]));
			temp.appendChild(document.createElement('br'));
		}
		
		if (cbObject[i].city) {
			temp.appendChild(document.createTextNode(cbObject[i].city));
			if (cbObject[i].country) {
				temp.appendChild(document.createTextNode(", "+cbObject[i].country));
			}
			temp.appendChild(document.createElement('br'));
		}
		else if (cbObject[i].country) {
			temp.appendChild(document.createTextNode(cbObject[i].country));
			temp.appendChild(document.createElement('br'));
		}
	
		temp = document.createElement('div');
		temp.style.fontSize = '11px';
		temp.align = 'justify';
		document.getElementById("CitedBy"+i).appendChild(temp);
		temp.setAttribute('id', "CitedBy" + i + "_abstract");
		temp.style.position = 'relative';
		temp.style.left = 18 + 'px';
		temp.style.width = citedByWidth - 43 + 'px';
		if (cbObject[i].url) {
			var temp2 = document.createElement('a');
			temp2.style.color = 'blue';
			temp2.textContent = "Show in Scopus";
			temp2.href = "javascript:window.open('" + cbObject[i].url + "')";
			temp2.style.textDecoration = 'none';
			temp.appendChild(temp2);
			//temp.appendChild(document.createElement('br'));
		}
		if (cbObject[i].authorId && cbObject[i].scopusId) {
			var temp2 = document.createElement('a');
			temp2.style.color = 'blue';
			temp2.textContent = "Set as main article";
			temp2.href = "#";
			temp2.style.textDecoration = 'none';
			temp2.style.cssFloat = 'right';
			temp2.onclick = function() {newMainArticle(cbObject[i]);};
			temp.appendChild(temp2);
			//temp.appendChild(document.createElement('br'));
		}
		temp.appendChild(document.createElement('br'));
		if (cbObject[i].Abstract) {
			temp.appendChild(document.createTextNode("Abstract:"));
			temp.appendChild(document.createElement('br'));
			temp.appendChild(document.createTextNode(cbObject[i].Abstract));
		}
		else temp.appendChild(document.createTextNode("Abstract not available"));
		temp.style.overflow = 'hidden';
		abstractCitedHeight[i] = temp.clientHeight;
		temp.style.height = 0 + 'px';
		//temp.style.display = 'none';
		abstractCitedState[i] = 0;
		abstractCitedMode[i] = 0;
	}
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
		var temp = document.createElement('a');
		temp.href = "javascript:findCountryDocumentCitedBy(new Array('"+ccbObject[i].name+"'))";
		temp.style.color = 'blue';
		temp.textContent = ccbObject[i].name;
		temp.style.textDecoration = 'none';
		divCountryDistributionCitedBy.appendChild(temp);
		divCountryDistributionCitedBy.appendChild(document.createTextNode(" ("+ccbObject[i].hitCount+")"));
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
	hrefCDCB.style.color = 'blue';
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
	ctxMenu.drawImage(imgCitedBy[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
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
		divCountryDistributionCitedBy.style.top = citedByPosY + 27 + "px";
		divCountryDistributionCitedBy.style.left = citedByPosX-parseInt(divCountryDistributionCitedBy.style.width) + 8 + 'px';
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