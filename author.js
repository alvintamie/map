function initializeMenu(){
	document.onselectstart = function(){ return false; }

	canvasMenu = document.getElementById('canvasMenu');
	ctxMenu=canvasMenu.getContext('2d');
	//canvasAuthor = document.getElementById('canvasAuthor');
	//ctxAuthor=canvasAuthor.getContext('2d');
	//ctxAuthor.fillStyle = "rgb(220,220,220)";
	//canvasAffiliation = document.getElementById('canvasAffiliation');
	//ctxAffiliation=canvasAffiliation.getContext('2d');
	//ctxAffiliation.fillStyle = "rgb(220,220,220)";
	ctxMenu.fillStyle = "rgb(220,220,220)";
	ctxMenu.fillRect(0 , 0, canvasMenu.width, canvasMenu.height);
	imgDataMenu[0] = ctxMenu.createImageData(canvasMenu.width/3-2*frameWidth, canvasMenu.height-2*frameWidth);
	imgDataMenu[1] = ctxMenu.createImageData(canvasMenu.width/3-2*frameWidth, canvasMenu.height-2*frameWidth);
	for (var i=0; i<4*(canvasMenu.width/3)*canvasMenu.height; i+=4)
	{
		imgDataMenu[0].data[i] = 220;
		imgDataMenu[0].data[i+1] = 220;
		imgDataMenu[0].data[i+3] = 255;
		imgDataMenu[1].data[i] = 220;
		imgDataMenu[1].data[i+3] = 255;
	}
	
	divSearch = document.getElementById("windowSearch");
	searchPosX = divSearch.offsetLeft;
	searchPosY = divSearch.offsetTop;
	searchWidth = parseInt(divSearch.style.width);
	searchHeight = parseInt(divSearch.style.height);
	divSearch.style.display = "none";
	ctxMenu.putImageData(imgDataMenu[searchVisible], frameWidth+canvasMenu.width/3, frameWidth);
	
	divAffiliation = document.getElementById("windowAffiliation");
	affiliationPosX = divAffiliation.offsetLeft;
	affiliationPosY = divAffiliation.offsetTop;
	affiliationWidth = parseInt(divAffiliation.style.width);
	affiliationHeight = parseInt(divAffiliation.style.height);
	divAffiliation.style.display = "none";
	ctxMenu.putImageData(imgDataMenu[affiliationVisible], frameWidth+2*canvasMenu.width/3, frameWidth);
	
	canvasMenu.onmousedown = function(e) {
		if (e.clientX-canvasMenu.offsetLeft>canvasMenu.width/3+frameWidth && e.clientX-canvasMenu.offsetLeft<2*canvasMenu.width/3-frameWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<canvasMenu.height-frameWidth) {
			searchIncrement *= -1;
			changeViewSearch();
		}
		if (e.clientX-canvasMenu.offsetLeft>2*canvasMenu.width/3+frameWidth && e.clientX-canvasMenu.offsetLeft<canvasMenu.width-frameWidth && e.clientY-canvasMenu.offsetTop>frameWidth && e.clientY-canvasMenu.offsetTop<canvasMenu.height-frameWidth) {
			affiliationIncrement *= -1;
			changeViewAffiliation();
		}
	}
}
