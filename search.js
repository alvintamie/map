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
var modeEdit = -1;
var searchBoolString = new Array("AND", "OR");
var searchYearFromString  = new Array(2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
				1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985,
				1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971,
				1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, "All year");
var searchYearToString = new Array("Present", 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
				1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
				1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 
				1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, "Before 1960");
var searchIndexQuery = new Array();
var searchStringQuery = new Array();
var searchBoolQuery = new Array();
var searchText;
var searchSelect;
var searchBoolSelect;
var searchYearFromSelect;
var searchYearToSelect;

function initializeSearch() {
	divSearch = document.getElementById("windowSearch");
	searchPosX = divSearch.offsetLeft;
	searchPosY = divSearch.offsetTop;
	searchWidth = parseInt(divSearch.style.width);
	searchHeight = parseInt(divSearch.style.height);
	//divSearch.style.display = "none";
	divSearch.style.width = '0px';
	divSearch.style.height = '0px';
	divSearch.style.overflow = 'hidden';
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
	
	searchText = document.createElement('input');
	searchText.type = 'text';
	searchText.setAttribute('name', 'search_inputText');
	
	searchSelect = document.createElement('select');
	searchSelect.setAttribute('name', 'search_inputSelect');
	for (var i=0; i<searchElement.length; i++) {
		searchSelect.options[i] = new Option (searchElement[i], i);
	}
	
	updatecontentSearchQuery();
	
	searchBoolSelect = document.createElement('select');
	searchSelect.setAttribute('name', 'search_inputBoolSelect');
	for (var i=0; i<searchBoolString.length; i++) {
		searchBoolSelect.options[i] = new Option (searchBoolString[i], i);
	}
	
	searchYearFromSelect = document.createElement('select');
	searchYearFromSelect.setAttribute('name', 'search_inputYearFromSelect');
	for (var i=0; i<searchYearFromString.length; i++) {
		searchYearFromSelect.options[i] = new Option (searchYearFromString[i], i);
	}
	searchYearFromSelect.value = searchYearFromString.length-1;
	console.log(searchYearFromSelect.value);
	
	searchYearToSelect = document.createElement('select');
	searchYearToSelect.setAttribute('name', 'search_inputYearToSelect');
	for (var i=0; i<searchYearToString.length; i++) {
		searchYearToSelect.options[i] = new Option (searchYearToString[i], i);
	}
}

function updatecontentSearchQuery() {
	removecontentSearchQueryChild();
	var contentSearch_query = document.getElementById("contentSearch_query");
	
	var searchCategory = document.createElement('div');
	searchCategory.setAttribute('id', "contentSearchQuery_categor1");
	contentSearch_query.appendChild(searchCategory);
	
	for (var i=0; i<searchIndexQuery.length; i++) {
		if (modeEdit==i) {
			if (i>0) {
				searchBoolSelect.value = searchBoolQuery[modeEdit];
				searchCategory.appendChild(searchBoolSelect);
			}
			searchText.value = searchStringQuery[modeEdit];
			searchCategory.appendChild(searchText);
			searchSelect.value = searchIndexQuery[modeEdit];
			searchCategory.appendChild(searchSelect);
			
			var searchAccept = document.createElement('a');
			searchAccept.textContent = "accept";
			searchCategory.appendChild(searchAccept);
			searchAccept.href = "#";
			searchAccept.onclick = function() {acceptQueryChange();};
			searchCategory.appendChild(document.createTextNode(" "));
			
			var searchCancel = document.createElement('a');
			searchCancel.textContent = "cancel";
			searchCategory.appendChild(searchCancel);
			searchCancel.href = "#";
			searchCancel.onclick = function() {cancelQueryChange();};
		}
		else {
			if (i>0) {
				searchCategory.appendChild(document.createTextNode(searchBoolString[searchBoolQuery[i]]+" "));
			}
			searchCategory.appendChild(document.createTextNode(searchElement[searchIndexQuery[i]] + " : " + searchStringQuery[i] + " "));
			if (modeEdit==-1) {
				var searchEdit = document.createElement('a');
				searchEdit.textContent = "edit";
				searchCategory.appendChild(searchEdit);
				searchEdit.href = "javascript:editSearchQuery("+i+")";
				searchCategory.appendChild(document.createTextNode(" "));
				
				var searchRemove = document.createElement('a');
				searchRemove.textContent = "remove";
				searchCategory.appendChild(searchRemove);
				searchRemove.href = "javascript:removeSearchQuery("+i+")";
			}
		}
		searchCategory.appendChild(document.createElement('br'));
	}
	
	if (modeEdit==-1) {
		var searchField = document.createElement('div');
		contentSearch_query.appendChild(searchField);
		
		if (searchIndexQuery.length>0) {
			searchBoolSelect.value = 0;
			searchField.appendChild(searchBoolSelect);
		}
		
		searchText.value = "";
		searchField.appendChild(searchText);
		searchSelect.value = "0";
		searchField.appendChild(searchSelect);
		
		var searchAdd = document.createElement('a');
		searchAdd.textContent = "add";
		searchField.appendChild(searchAdd);
		searchAdd.href = "#";
		searchAdd.onclick = function() {addSearchQuery();};
		searchField.appendChild(document.createTextNode(" "));
		
		var searchReset = document.createElement('a');
		searchReset.textContent = "reset";
		searchField.appendChild(searchReset);
		searchReset.href = "#";
		searchReset.onclick = function() {resetSearchQuery();};
		searchField.appendChild(document.createElement('br'));
		
		searchField.appendChild(document.createTextNode("Published year"));
		searchField.appendChild(document.createElement('br'));
		searchField.appendChild(document.createTextNode("from year : "));
		//searchField.appendChild(searchYearFromSelect);
		searchField.appendChild(document.createElement('br'));
		searchField.appendChild(document.createTextNode("to year : "));
		//searchField.appendChild(searchYearToSelect);
		searchField.appendChild(document.createElement('br'));
		
		var searchSubmitButton = document.createElement('button');
		searchSubmitButton.textContent = "Search";
		searchField.appendChild(searchSubmitButton);
		searchSubmitButton.onclick = function() {submitSearchQuery();};
	}
}

function removecontentSearchQueryChild() {
	var el = document.getElementById("contentSearch_query");
	while (el.firstChild)
		el.removeChild(el.firstChild);
}

function addSearchQuery() {
	if (!searchText.value) {
		alert ("Please specify a value to the text box.");
	}
	else {
		searchBoolQuery.push(searchBoolSelect.value);
		searchIndexQuery.push(searchSelect.value);
		searchStringQuery.push(searchText.value);
		updatecontentSearchQuery();
		//console.log(searchSelect.value);
	}
}

function resetSearchQuery() {
	searchBoolQuery = [];
	searchIndexQuery = [];
	searchStringQuery = [];
	updatecontentSearchQuery();
}
function submitSearchQuery() {
	if (searchIndexQuery.length==0) {
		alert("Please insert a query.");
	}
	else {
		resetQuery();
		for (var i=0; i<searchIndexQuery.length; i++) {
			addQuery(searchStringQuery[i], searchIndexQuery[i]);
		}
		submitQuery(0);
		searchYearFromSelect.value = searchYearFromString.length-1;
		searchYearToSelect.value = 0;
		updatecontentSearchQuery();
	}
}

function editSearchQuery(editNumber) {
	modeEdit = editNumber;
	updatecontentSearchQuery();
}

function removeSearchQuery(removeNumber) {
	searchBoolQuery.splice(removeNumber, 1);
	searchIndexQuery.splice(removeNumber, 1);
	searchStringQuery.splice(removeNumber, 1);
	modeEdit = -1;
	updatecontentSearchQuery();
}

function acceptQueryChange() {
	if (!searchText.value) {
		alert("Please specify a value to the text box.");
	}	
	else {
		searchBoolQuery[modeEdit] = searchBoolSelect.value;
		searchIndexQuery[modeEdit] = searchSelect.value;
		searchStringQuery[modeEdit] = searchText.value;
		modeEdit = -1;
		updatecontentSearchQuery();
	}
}

function cancelQueryChange() {
	modeEdit = -1;
	updatecontentSearchQuery();
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