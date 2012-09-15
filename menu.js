function initializeMenu(){
	document.onselectstart = function(){ return false; }

	canvasMenu = document.getElementById('canvasMenu');
	ctxMenu=canvasMenu.getContext('2d');
	canvasMenu.width = 5*buttonMenuWidth + 6*frameWidth;
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
	
	divCoAuthor = document.getElementById("windowCoAuthor");
	coAuthorPosX = divCoAuthor.offsetLeft;
	coAuthorPosY = divCoAuthor.offsetTop;
	coAuthorWidth = parseInt(divCoAuthor.style.width);
	coAuthorHeight = parseInt(divCoAuthor.style.height);
	//divCoAuthor.style.display = "none";
	divCoAuthor.style.width = '0px';
	divCoAuthor.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[coAuthorVisible], 3*frameWidth+2*buttonMenuWidth, frameWidth);
	
	divSearch = document.getElementById("windowSearch");
	searchPosX = divSearch.offsetLeft;
	searchPosY = divSearch.offsetTop;
	searchWidth = parseInt(divSearch.style.width);
	searchHeight = parseInt(divSearch.style.height);
	//divSearch.style.display = "none";
	divSearch.style.width = '0px';
	divSearch.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[searchVisible], 4*frameWidth+3*buttonMenuWidth, frameWidth);
	
	divAffiliation = document.getElementById("windowAffiliation");
	affiliationPosX = divAffiliation.offsetLeft;
	affiliationPosY = divAffiliation.offsetTop;
	affiliationWidth = parseInt(divAffiliation.style.width);
	affiliationHeight = parseInt(divAffiliation.style.height);
	//divAffiliation.style.display = "none";
	divAffiliation.style.width = '0px';
	divAffiliation.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[affiliationVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
	//console.log("ts");
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
			divCoAuthor.style['z-index'] = zIndex;
			zIndex += 1;
			coAuthorIncrement *= -1;
			changeViewCoAuthor();
		}
		else if (e.clientX-canvasMenu.offsetLeft>4*frameWidth+3*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<4*frameWidth+4*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divSearch.style['z-index'] = zIndex;
			zIndex += 1;
			searchIncrement *= -1;
			changeViewSearch();
		}
		else if (e.clientX-canvasMenu.offsetLeft>5*frameWidth+4*buttonMenuWidth && e.clientX-canvasMenu.offsetLeft<5*frameWidth+5*buttonMenuWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<frameWidth+buttonMenuHeight) {
			divAffiliation.style['z-index'] = zIndex;
		zIndex += 1;
			affiliationIncrement *= -1;
			changeViewAffiliation();
		}
	}
}
