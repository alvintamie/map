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

function initializeCoAuthor() {
	divCoAuthor = document.getElementById("windowCoAuthor");
	coAuthorPosX = divCoAuthor.offsetLeft;
	coAuthorPosY = divCoAuthor.offsetTop;
	coAuthorWidth = parseInt(divCoAuthor.style.width);
	coAuthorHeight = parseInt(divCoAuthor.style.height);
	//divCoAuthor.style.display = "none";
	divCoAuthor.style.width = '0px';
	divCoAuthor.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	
	var temp = document.createElement('div');
	divCoAuthor.appendChild(temp);
	temp.setAttribute('id', "contentCoAuthor");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = coAuthorWidth-2 + 'px';
	temp.style.height = coAuthorHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
}

function updateCoauthors () {
	removecontentCoAuthorChild();
	if (coauthorsObject.length>0) {
		for (var i=0; i<coauthorsObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentCoAuthor").appendChild(temp);
			temp.setAttribute('id', "CoAuthor" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertCitedBy(i);
		}
		//console.log(currentLevelCitation);
		//console.log(totalLevelCitation);
		if (currentLevelCoauthors>1) {
			temp = document.createElement('a');
			document.getElementById("contentCoAuthor").appendChild(temp);
			temp.href="javascript:downCoauthors()";
			temp.textContent = "Previous";
		}
		if (currentLevelCoauthors<totalLevelCoauthors) {
			temp = document.createElement('a');
			document.getElementById("contentCoAuthor"). appendChild(temp);
			temp.href = "javascript:upCoauthors()";
			temp.textContent = "Next";
		}
	}
	else {
		document.getElementById("contentCoAuthor").innerHTML = "This author has no co-Authors.";
	}
}

function insertCoauthors(i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "CoAuthor" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	//temp.onclick = function () {showListhCoAuthor(i);};
	document.getElementById("CoAuthor"+i).appendChild(temp);
	document.getElementById("CoAuthor"+i).innerHTML += coauthorsObject[i].name['given-name'] + ", " + coauthorsObject[i].name.surname;
	/*
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
	abstractCitedMode[i] = 0;*/
}
/*
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
*/
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
	if (coAuthorStatus <= 0 && coAuthorIncrement==-1) {
		coAuthorStatus = 1;
	}
	else if (coAuthorStatus >= coAuthorTotalSteps && coAuthorIncrement==1) {
		coAuthorStatus = coAuthorTotalSteps - 1;
	}
	coAuthorStatus += coAuthorIncrement;
	divCoAuthor.style.width = coAuthorStatus*coAuthorWidth/coAuthorTotalSteps + "px";
	divCoAuthor.style.height = coAuthorStatus*coAuthorHeight/coAuthorTotalSteps + "px";
	divCoAuthor.style.left = (canvasMenu.offsetLeft+3*frameWidth+5*buttonMenuWidth/2) + coAuthorStatus*(coAuthorPosX+coAuthorWidth/2-canvasMenu.offsetLeft-3*frameWidth-5*buttonMenuWidth/2)/coAuthorTotalSteps - coAuthorStatus*coAuthorWidth/2/coAuthorTotalSteps + "px";
	divCoAuthor.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + coAuthorStatus*(coAuthorPosY-canvasMenu.offsetTop-canvasMenu.height/2)/coAuthorTotalSteps + "px";
	if (coAuthorStatus > 0) {
		//divCoAuthor.style.display = "block";
		coAuthorVisible = 1;
	}
	else {
		//divCoAuthor.style.display = "none";
		coAuthorVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
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