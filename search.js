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
				1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, "All years");
var searchYearToString = new Array("Present", 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
				1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
				1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 
				1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, "Before 1960");
var searchSortByString = new Array("Date (Newest)", "Date (Oldest)", "Cited by", "Relevance", "Author cite",
				"First Author (A-Z)", "First Author (Z-A)", "Publication Name (A-Z)", "Title (A-Z)",
				"Title (A-Z)", "Title (Z-A)", "Relevance");
var searchIndexQuery = new Array();
var searchStringQuery = new Array();
var searchBoolQuery = new Array();
var searchText;
var searchSelect;
var searchBoolSelect;
var searchYearFromSelect;
var searchYearToSelect;
var searchSortBySelect;

var abstractSearchHeight = new Array();
var abstractSearchState = new Array();
var abstractSearchMode = new Array();
var abstractSearchTotal = 20;
var contentSearchResult;
var headerSearch;
var showSearchinMap = 1;
var showSearchHref;
var divCountryDistributionSearch;
var modeCountryDistributionSearch = 0;
var modeCountryTypeSearch = 0;
var hrefCountryTypeSearch;
var hrefCDS;
var imgSearch = new Array();
imgSearch[0] = imgObject[8];
imgSearch[1] = imgObject[13];

function initializeSearch() {
	divSearch = document.getElementById("windowSearch");
	divSearch.style.overflow = 'hidden';
	searchPosX = 780;
	searchPosY = 130;
	searchWidth = parseInt(divSearch.style.width);
	searchHeight = parseInt(divSearch.style.height);
	//divSearch.style.display = "none";
	divSearch.style.width = '0px';
	divSearch.style.height = '0px';
	divSearch.style.overflow = 'hidden';
	ctxMenu.drawImage(imgSearch[searchVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
	
	headerSearch = document.createElement('div');
	headerSearch.style.position = 'relative';
	headerSearch.style.top = '0px';
	headerSearch.style.left ='0px';
	headerSearch.style.height = '23px';
	headerSearch.style.width = searchWidth + 'px';
	headerSearch.style.paddingLeft = '5px';
	headerSearch.style.color = 'white';
	headerSearch.appendChild(document.createTextNode("Search"));
	divSearch.appendChild(headerSearch);
	headerSearch.onselectstart = function() {return false};
	
	var temp = document.createElement('div');
	divSearch.appendChild(temp);
	temp.setAttribute('id', "contentSearch");
	temp.style.position = 'relative';
	//temp.style.top = topbarHeight-9 + 'px';
	temp.style.left = 1 + 'px';
	temp.style.width = citedByWidth-2 + 'px';
	temp.style.height = citedByHeight-parseInt(headerSearch.style.height) +'px';
	temp.style['overflow-x'] = 'hidden';
	temp.style['overflow-y'] = 'auto';
	
	var contentSearch = document.getElementById('contentSearch');
	temp = document.createElement('div');
	contentSearch.appendChild(temp);
	temp.setAttribute('id', 'contentSearch_query');
	
	searchText = document.createElement('input');
	searchText.type = 'text';
	searchText.setAttribute('name', 'search_inputText');
	
	searchSelect = document.createElement('select');
	searchSelect.setAttribute('name', 'search_inputSelect');
	for (var i=0; i<searchElement.length; i++) {
		searchSelect.options[i] = new Option (searchElement[i], i);
	}
	
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
	
	searchYearToSelect = document.createElement('select');
	searchYearToSelect.setAttribute('name', 'search_inputYearToSelect');
	for (var i=0; i<searchYearToString.length; i++) {
		searchYearToSelect.options[i] = new Option (searchYearToString[i], i);
	}
	
	searchSortBySelect = document.createElement('select');
	searchSortBySelect.setAttribute('name', 'search_inputSortBySelect');
	for (var i=0; i<searchSortByString.length; i++) {
		searchSortBySelect.options[i] = new Option (searchSortByString[i], i);
	}
	
	updatecontentSearchQuery();
	
	contentSearchResult = document.createElement('div');
	contentSearch.appendChild(contentSearchResult);
	contentSearchResult.setAttribute('id', 'contentSearch_result');
	contentSearchResult.style.position = 'absolute';
	contentSearchResult.style.left = 1 + 'px';
	contentSearchResult.style.width = searchWidth-2 + 'px';
	contentSearchResult.style.overflow = 'hidden';

	showSearchHref = document.createElement('a');
	showSearchHref.href = "#";
	showSearchHref.onclick = function () {
		if  (showSearchinMap==0) {
			showSearchinMap = 1;
			showResult(0, queryResults);
			showSearchHref.textContent = "Hide documents in map";
		}
		else {
			showSearchinMap = 0;
			clearCanvasObject();
			showSearchHref.textContent = "Show documents in map";
		}
	}
	showSearchHref.textContent = "Hide documents in map";

	divCountryDistributionSearch = document.createElement('div');
	divCountryDistributionSearch.style.background = '#F2F1EF';
	divCountryDistributionSearch.style.position = 'absolute';
	divCountryDistributionSearch.style.width = '130px';
	divCountryDistributionSearch.style.height = '300px';
	divCountryDistributionSearch.style.top = searchPosY + 27 + 'px';
	divCountryDistributionSearch.style.left = searchPosX-parseInt(divCountryDistributionSearch.style.width) + 8 + 'px';
	divCountryDistributionSearch.style['z-index'] = 0;
	divCountryDistributionSearch.style.overflow = 'auto';
	divCountryDistributionSearch.style.display = 'none';
	document.body.appendChild(divCountryDistributionSearch);

	hrefCountryTypeSearch = document.createElement('a');
	hrefCountryTypeSearch.textContent = "View 25 result distribution";
	hrefCountryTypeSearch.href = "#";
	hrefCountryTypeSearch.onclick = function () {
		if (modeCountryTypeSearch==0) {
			modeCountryTypeSearch = 1;
			hrefCountryTypeSearch.textContent = "View overall result distribution";
		}
		else {
			modeCountryTypeSearch = 0;
			hrefCountryTypeSearch.textContent = "View 25 result distribution";
		}
		showOverallCountrySearch(queryCtry);
	}
	showOverallCountrySearch(queryCtry);
	
	hrefCDS = document.createElement('a');
	hrefCDS.textContent = "View country distribution";
	hrefCDS.href = "#";
	hrefCDS.onclick = function () {
		showSearchCountryDistribution();
		if (modeCountryDistributionSearch==0)
			hrefCDS.textContent = "View country distribution";
		else hrefCDS.textContent = "Hide country distribution";
	};
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
		searchField.appendChild(document.createTextNode("from : "));
		searchField.appendChild(searchYearFromSelect);
		searchField.appendChild(document.createElement('br'));
		searchField.appendChild(document.createTextNode("to : "));
		searchField.appendChild(searchYearToSelect);
		searchField.appendChild(document.createElement('br'));
		
		searchField.appendChild(document.createTextNode("Sort the document by "));
		searchField.appendChild(searchSortBySelect);
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
	else if (searchYearFromSelect.value<searchYearToSelect.value-1) {
		alert("The year cannot be from higher value to lower value.")
	}
	else {
		resetQuery();
		searchBoolQuery[0] = 0;
		for (var i=0; i<searchIndexQuery.length; i++) {
			addQuery(searchStringQuery[i], searchIndexQuery[i], 1-searchBoolQuery[i]);
			//console.log(!searchBoolQuery[i]);
		}
		changeDate(searchYearFromString[searchYearFromSelect.value], searchYearToString[searchYearToSelect.value])
		changeSort(searchSortBySelect.value)
		submitQuery(0);
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

function updateSearch(sObject, sMode) {
	console.log("search haha");
	searchYearFromSelect.value = searchYearFromString.length-1;
	searchYearToSelect.value = 0;
	updatecontentSearchQuery();
	removecontentSearchResultChild();
	console.log(sObject);
	if (sObject.length>0) {
		contentSearchResult.appendChild(showSearchHref);
		contentSearchResult.appendChild(document.createElement('br'));
		if (sMode==1) {
			var temp = document.createElement('a');
			temp.href = "#";
			temp.onclick = function () {updateSearch(queryResults, 0);};
			temp.textContent = "Show all result";
			contentSearchResult.appendChild(temp);
			contentSearchResult.appendChild(document.createElement('br'));
		}
		
		contentSearchResult.appendChild(hrefCDS);
		contentSearchResult.appendChild(document.createElement('br'));

		for (var i=0; i<sObject.length; i++) {
			var temp = document.createElement('div');
			contentSearchResult.appendChild(temp);
			temp.setAttribute('id', "Search" + i);
			temp.style.position = 'relative';
			temp.style.left = 3 + 'px';
			insertSearch(sObject, i);
		}
		if (sMode==0) {
			if (currentLevelSearchEngine>1) {
				temp = document.createElement('a');
				contentSearchResult.appendChild(temp);
				temp.href="javascript:downSearchEngine()";
				temp.textContent = "Previous";
				contentSearchResult.appendChild(document.createTextNode(" "));
			}

			if (currentLevelSearchEngine<totalLevelSearchEngine) {
				temp = document.createElement('a');
				contentSearchResult. appendChild(temp);
				temp.href = "javascript:upSearchEngine()";
				temp.textContent = "Next";
			}
		}
	}
	else {
		contentSearchResult.innerHTML = "There is no result for the query.";
	}
}

function insertSearch(sObject, i) {
	var temp = document.createElement("IMG");
	temp.setAttribute('id', "Search" + i + "_image");
	temp.src = imgExpand.src;
	//temp.setAttribute('onclick', "showAbstractRef("+i+")");
	temp.onclick = function () {showAbstractSearch(i);};
	document.getElementById("Search"+i).appendChild(temp);
	temp = document.createElement("a");
	temp.onclick = function () {
		if (abstractSearchMode[i]==0) {
			showAbstractSearch(i);
			highlight(sObject[i]);
		}
	};
	temp.href = "#";
	temp.textContent = (currentLevelSearchEngine-1)*100+i+1 + " " + sObject[i].title;
	document.getElementById("Search"+i).appendChild(temp);
	temp = document.createElement('div');
	document.getElementById("Search"+i).appendChild(temp);
	temp.setAttribute('id', "Search" + i + "_abstract");
	temp.style.position = 'relative';
	temp.style.left = 18 + 'px';
	temp.style.width = searchWidth - 45 + 'px';
	if (sObject[i].url) {
		var temp2 = document.createElement('a');
		temp2.textContent = "Show in Scopus";
		temp2.href = "javascript:window.open('" + sObject[i].url + "')";
		temp.appendChild(temp2);
		temp.appendChild(document.createElement('br'));
	}
	if (sObject[i].Abstract)
		temp.appendChild(document.createTextNode(sObject[i].Abstract));
	else temp.appendChild(document.createTextNode("Abstract not available"));
	temp.style.overflow = 'hidden';
	abstractSearchHeight[i] = temp.clientHeight;
	temp.style.height = 0 + 'px';
	//temp.style.display = 'none';
	abstractSearchState[i] = 0;
	abstractSearchMode[i] = 0;
}

function showSearchCountryDistribution() {
	if (modeCountryDistributionSearch==0) {
		modeCountryDistributionSearch = 1;
		divCountryDistributionSearch.style.display = 'block';
	}
	else {
		modeCountryDistributionSearch = 0;
		divCountryDistributionSearch.style.display = 'none';
	}
}

function showOverallCountrySearch(csObject) {
	while (divCountryDistributionSearch.firstChild) {
		divCountryDistributionSearch.removeChild(divCountryDistributionSearch.firstChild);
	}
	divCountryDistributionSearch.appendChild(hrefCountryTypeSearch);
	divCountryDistributionSearch.appendChild(document.createElement('br'));
	for (var i=0; i<csObject.length; i++) {
		var temp = document.createElement('a');
		temp.href = "javascript:focusToCountrySearch('"+csObject[i].name+"');";
		temp.textContent = caObject[i].name;
		temp.style.textDecoration = 'none';
		divCountryDistributionSearch.appendChild(temp);
		divCountryDistributionSearch.appendChild(document.createTextNode(" ("+csObject[i].hitCount+")"));
		divCountryDistributionSearch.appendChild(document.createElement('br'));
	}
}

function focusToCountryReference(csObjectName) {
	
}

function showAbstractSearch(i) {
	//console.log("show");
	if (abstractSearchMode[i]==0) {
		document.getElementById("Search" + i + "_image").src = imgContract.src;
		//document.getElementById("Reference" + i + "_abstract").style.display = 'block';
		abstractSearchMode[i] = 1;
		expandAbstractSearch(i);
	}
	else {
		document.getElementById("Search" + i + "_image").src = imgExpand.src;
		abstractSearchMode[i] = 0;
		contractAbstractSearch(i);
	}
}

function expandAbstractSearch(i) {
	//console.log(i);
	abstractSearchState[i] += 1;
	document.getElementById("Search" + i + "_abstract").style.height = abstractSearchState[i]*abstractSearchHeight[i]/abstractSearchTotal + 'px';
	//console.log(abstractSearchHeight[i]);
	if (abstractSearchState[i]<abstractSearchTotal && abstractSearchMode[i]==1) {
		setTimeout (function() {expandAbstractSearch(i)}, 10);
	}
}

function contractAbstractSearch(i) {
	//console.log(i);
	abstractSearchState[i] -= 1;
	document.getElementById("Search" + i + "_abstract").style.height = abstractSearchState[i]*abstractSearchHeight[i]/abstractSearchTotal + 'px';
	if (abstractSearchState[i]>0 && abstractSearchMode[i]==0) {
		setTimeout (function(){contractAbstractSearch(i);}, 10);
	}
	//else if (abstractRefMode[i]==0)
		//document.getElementById("Reference" + i + "_abstract").style.display = 'none';
}

function removecontentSearchResultChild() {
	var el = document.getElementById("contentSearch_result");
	while (el.firstChild) {
		//console.log(el.firstChild.id);
		el.removeChild(el.firstChild);
	}
	//console.log(el.lastChild.id);

}

function mouseDownSearch(e){
	divSearch.style['z-index'] = zIndex;
	divCountryDistributionSearch.style['z-index'] = zIndex;
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
	modeCountryDistributionSearch = 0;
	divCountryDistributionSearch.style.display = 'none';
	hrefCDS.textContent = "View country distribution";
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
	ctxMenu.drawImage(imgSearch[searchVisible], 5*frameWidth+4*buttonMenuWidth, frameWidth);
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
		divCountryDistributionSearch.style.top = searchPosY + 27 + "px";
		divCountryDistributionSearch.style.left = searchPosX-parseInt(divCountryDistributionSearch.style.width) + 8 + 'px';
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