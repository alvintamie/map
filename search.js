var isMouseDownSearch=0;
var deltaSearchPositionX;
var deltaSearchPositionY;
var searchStatus=0;
var searchTotalSteps=15;
var searchIncrement = -1;
var searchVisible=0;
var searchPosX;
var searchPosY;
var searchWidth;
var searchHeight;

function initializeSearch() {
	divSearch = document.getElementById("windowSearch");
	searchPosX = divSearch.offsetLeft;
	searchPosY = divSearch.offsetTop;
	searchWidth = parseInt(divSearch.style.width);
	searchHeight = parseInt(divSearch.style.height);
	//divSearch.style.display = "none";
	divSearch.style.width = '0px';
	divSearch.style.height = '0px';
	ctxMenu.putImageData(imgDataMenu[searchVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
	
	var temp = document.createElement('div');
	divSearch.appendChild(temp);
	temp.setAttribute('id', "contentSearch");
	temp.style.position = 'absolute';
	temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = citedByWidth-2 + 'px';
	temp.style.height = citedByHeight-topbarHeight+7 +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
	
	var contentSearch = document.getElementById('contentSearch');
	temp = document.createElement('div');
	contentSearch.appendChild(temp);
	temp.setAttribute('id', 'contentSearch_query');
	
	temp = document.createElement('div');
	contentSearch.appendChild(temp);
	temp.setAttribute('id', 'contentSearch_result');
	
	updatecontentSearch_query();
}

function updatecontentSearch_query() {
	removecontentSearch_queryChild();
	var contentSearch_query = document.getElementById("contentSearch_query");
	var searchForm = document.createElement('form');
	contentSearch_query.appendChild(searchForm);
	
	var searchText = document.createElement('input');
	searchText.type = 'text';
	searchText.setAttribute('name', 'search_inputText');
	searchForm.appendChild(searchText);
	/*
	searchSelect = document.createElement('select');
	searchSelect.setAttribute('name', 'search_inputSelect')
	for (var i=0; i<searchElement.length; i++) {
		searchSelect.option[i].value = i;
		searchSelect.option[i].text = searchElement[i];
	}
	searchForm.appendChild(searchSelect);*/
}

function removecontentSearch_queryChild() {
	var el = document.getElementById("contentSearch_query");
	while (el.firstChild)
		el.removeChild(el.firstChild);
}

function mouseDownSearch(e){
	divSearch.style['z-index'] = zIndex;
	zIndex += 1;
	if(e.clientY-divSearch.offsetTop<topbarHeight) {
		if (e.clientX-divSearch.offsetLeft<=parseInt(divSearch.style.width)-minimizePosWidth) {
			isMouseDownSearch=true;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		}
		else if (e.clientX-divSearch.offsetLeft>parseInt(divSearch.style.width)-minimizePosWidth) {
			searchIncrement *= -1;
			changeViewSearch();
		}
	}
}
	
function changeViewSearch() {
	if (searchStatus <= 0 && searchIncrement==-1) {
		searchStatus = 1;
	}
	else if (searchStatus >= searchTotalSteps && searchIncrement==1) {
		searchStatus = searchTotalSteps - 1;
	}
	searchStatus += searchIncrement;
	divSearch.style.width = searchStatus*searchWidth/searchTotalSteps + "px";
	divSearch.style.height = searchStatus*searchHeight/searchTotalSteps + "px";
	divSearch.style.left = (canvasMenu.offsetLeft+5*frameWidth+9*buttonMenuWidth/2) + searchStatus*(searchPosX+searchWidth/2-canvasMenu.offsetLeft-5*frameWidth-9*buttonMenuWidth/2)/searchTotalSteps - searchStatus*searchWidth/2/searchTotalSteps + "px";
	divSearch.style.top = (canvasMenu.offsetTop+canvasMenu.height/2) + searchStatus*(searchPosY-canvasMenu.offsetTop-canvasMenu.height/2)/searchTotalSteps + "px";
	if (searchStatus > 0) {
		//divSearch.style.display = "block";
		searchVisible = 1;
	}
	else {
		//divSearch.style.display = "none";
		searchVisible = 0;
	}
	ctxMenu.putImageData(imgDataMenu[searchVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
	if (searchStatus > 0 && searchStatus <searchTotalSteps) setTimeout (changeViewSearch, 10);
}

function searchDisplacement(e){
	if(e.clientX>divSearch.offsetLeft && e.clientY>divSearch.offsetTop && e.clientY-divSearch.offsetTop<topbarHeight) {
		if (e.clientX-divSearch.offsetLeft<=parseInt(divSearch.style.width)-minimizePosWidth) {
			divSearch.style.cursor = "move";
		}
		else if (e.clientX-divSearch.offsetLeft>parseInt(divSearch.style.width)-minimizePosWidth) {
			divSearch.style.cursor = "default";
		}
	}
	else {
		divSearch.style.cursor = "default";
	}
	if(isMouseDownSearch) {
		searchPosX += e.clientX - lastMouseX;
		searchPosY += e.clientY - lastMouseY;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		divSearch.style.left = searchPosX + "px";
		divSearch.style.top  = searchPosY + "px";
		if(divSearch.offsetTop<0) {
			divSearch.style.top="0px";
			searchPosY = 0;
		}
		/*
		if(divSearch.offsetLeft<0){
			divSearch.style.left="0px";
			console.log(divSearch.offsetLeft);
			console.log(divSearch.style.left);
		}
		if(divSearch.offsetLeft+parseInt(divSearch.style.width)>window.innerWidth)
			divSearch.style.left = (window.innerWidth - parseInt(divSearch.style.width)) +"px";
		if(divSearch.offsetTop+parseInt(divSearch.style.height)>window.innerHeight)
			divSearch.style.top = (window.innerHeight-parseInt(divSearch.style.height))+"px";
		*/
	}	
}