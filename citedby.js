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

function initializeCitedBy() {
	divCitedBy = document.getElementById("windowCitedBy");
	citedByPosX = divCitedBy.offsetLeft;
	citedByPosY = divCitedBy.offsetTop;
	citedByWidth = parseInt(divCitedBy.style.width);
	citedByHeight = parseInt(divCitedBy.style.height);
	//divCitedBy.style.display = "none";
	divCitedBy.style.width = '0px';
	divCitedBy.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[citedByVisible], 2*frameWidth+buttonMenuWidth, frameWidth);
	
	var temp = document.createElement('div');
	divCitedBy.appendChild(temp);
	temp.setAttribute('id', "contentCitedBy");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = citedByWidth-2 + 'px';
	temp.style.height = citedByHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
}

function updateCitedBy () {
	removecontentCitedByChild();
	if (citedbyObject.length>0) {
		for (var i=0; i<citedbyObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentCitedBy").appendChild(temp);
			temp.setAttribute('id', "CitedBy" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertCitedBy(i);
		}
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		if (currentLevelCitation>1) {
			temp = document.createElement('a');
			document.getElementById("contentCitedBy").appendChild(temp);
			temp.href="javascript:downCitedby()";
			temp.textContent = "Previous";
		}
		if (currentLevelCitation<totalLevelCitation) {
			temp = document.createElement('a');
			document.getElementById("contentCitedBy"). appendChild(temp);
			temp.href = "javascript:upCitedby()";
			temp.textContent = "Next";
		}	
	}
	else {
		document.getElementById("contentCitedBy").innerHTML = "This paper has not been cited yet.";
	}
}

function insertCitedBy(i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "CitedBy" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractCited(i);};
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.href = "javascript:window.open('" + citedbyObject[i].url + "')";
	temp.textContent = (currentLevelCitation-1)*25+i+1 + " " + citedbyObject[i].title;
	//temp.setAttribute('onclick', 'window.open(temp.href)');
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp.innerHTML = citedbyObject[i].Abstract;
	temp.setAttribute('id', "CitedBy" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = citedByWidth - 45 + 'px';
	temp.style.overflow = 'hidden';
	abstractCitedHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractCitedState[i] = 0;
	abstractCitedMode[i] = 0;
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