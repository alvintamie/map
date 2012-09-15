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
}

function updateCitedBy () {
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
	if (citedbyObject.length>0) {
		for (var i=0; i<citedbyObject.length; i++) {
			var temp = document.createElement('div');
			document.getElementById("contentCitedBy").appendChild(temp);
			temp.setAttribute('id', "CitedBy" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertCitedBy(i);
		}
	}
	else {
		document.getElementById("contentCitedBy").innerHTML = "This paper has not been cited yet.";
	}
}

function insertCitedBy(i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "Reference" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	//temp.onclick = function () {showAbstractCited(i);};
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.href = "javascript:window.open('" + citedByObject[i].url + "')";
	temp.textContent = citedByObject[i].title;
	temp.setAttribute('onclick', 'window.open(temp.href)');
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("CitedBy"+i).appendChild(temp);
	temp.innerHTML = citedbyObject[i].Abstract;
	temp.setAttribute('id', "CitedBy" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = citedByWidth - 45 + 'px';
	temp.style.overflow = 'hidden';
	abstractRefHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractRefState[i] = 0;
	abstractRefMode[i] = 0;
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