function initializeMenu(){
	//document.onselectstart = function(){ return false; }

	canvasMenu = document.getElementById('canvasMenu');
	ctxMenu=canvasMenu.getContext('2d');
	canvasMenu.width = 6*buttonMenuWidth + 7*frameWidth;
	canvasMenu.height = buttonMenuHeight + 2*frameWidth;
	//canvasAuthor = document.getElementById('canvasAuthor');
	//ctxAuthor=canvasAuthor.getContext('2d');
	//ctxAuthor.fillStyle = "rgb(220,220,220)";
	//canvasAffiliation = document.getElementById('canvasAffiliation');
	//ctxAffiliation=canvasAffiliation.getContext('2d');
	//ctxAffiliation.fillStyle = "rgb(220,220,220)";
	ctxMenu.fillStyle = "rgb(220,220,220)";
	ctxMenu.fillRect(0 , 0, canvasMenu.width, canvasMenu.height);
	imgDataMenu[0] = ctxMenu.createImageData(buttonMenuWidth, buttonMenuHeight);
	imgDataMenu[1] = ctxMenu.createImageData(buttonMenuWidth, buttonMenuHeight);
	for (var i=0; i<4*buttonMenuWidth*buttonMenuHeight; i+=4)
	{
		imgDataMenu[0].data[i] = 220;
		imgDataMenu[0].data[i+1] = 220;
		imgDataMenu[0].data[i+3] = 255;
		imgDataMenu[1].data[i] = 220;
		imgDataMenu[1].data[i+3] = 255;
	}
	
	initializeReference();
	initializeCitedBy();
	initializeRelevantDocument();
	initializeCoAuthor();
	initializeSearch();
	initializeAffiliation();
	
	canvasMenu.onmousedown = function(e) {
		if (e.clientX-canvasMenu.offsetLeft>frameWidth && e.clientX-canvasMenu.offsetLeft<frameWidth+buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			referenceIncrement *= -1;
			divReference.style['z-index'] = zIndex;
			zIndex += 1;
			changeViewReference();
		}
		else if (e.clientX-canvasMenu.offsetLeft>2*frameWidth+buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<2*frameWidth+2*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divCitedBy.style['z-index'] = zIndex;
			zIndex += 1;
			citedByIncrement *= -1;
			changeViewCitedBy();
		}
		else if (e.clientX-canvasMenu.offsetLeft>3*frameWidth+2*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<3*frameWidth+3*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divRelevantDocument.style['z-index'] = zIndex;
			zIndex += 1;
			relevantDocumentIncrement *= -1;
			changeViewRelevantDocument();
		}
		else if (e.clientX-canvasMenu.offsetLeft>4*frameWidth+3*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<4*frameWidth+4*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divCoAuthor.style['z-index'] = zIndex;
			zIndex += 1;
			coAuthorIncrement *= -1;
			changeViewCoAuthor();
		}
		else if (e.clientX-canvasMenu.offsetLeft>5*frameWidth+4*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<5*frameWidth+5*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divSearch.style['z-index'] = zIndex;
			zIndex += 1;
			searchIncrement *= -1;
			changeViewSearch();
		}
		else if (e.clientX-canvasMenu.offsetLeft>6*frameWidth+5*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<6*frameWidth+6*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divAffiliation.style['z-index'] = zIndex;
			zIndex += 1;
			affiliationIncrement *= -1;
			changeViewAffiliation();
		}
	}
}	


//SHOWING MAIN ARTICLE:
function setDivPosition(_divObj, _posX, _posY)
{
	//console.log("positionObject: "+ _posX + " " + _posY);
	_divObj.style.top = _posX + "px";
	_divObj.style.left = _posY + "px";	
}

function setDivInnerHTML (_divObj, _sourceObj)
{
	console.log("authorObject:")
	console.log(_sourceObj);
	if (_sourceObj != null)
	{
		if (!(_sourceObj.title === undefined))_divObj.innerHTML = _sourceObj.title + "<br>";
		if (!(_sourceObj.name === undefined))_divObj.innerHTML +="Author: " +  _sourceObj.name + "<br>";
		if (!(_sourceObj.affiliationName === undefined))_divObj.innerHTML +="Affiliation: " + _sourceObj.affiliationName + "<br>";
		if (!(_sourceObj.city === undefined))_divObj.innerHTML +="Affiliation-City: " +  _sourceObj.city + "<br>";
		if (!(_sourceObj.country === undefined))_divObj.innerHTML +="Affiliation-Country: " +  _sourceObj.country + "<br>";
	}

	
}




