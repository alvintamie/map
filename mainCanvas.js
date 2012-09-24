var _readyScroll=0;
var xForDoubleClick=0;
var yForDoubleClick=0;

var mainArticleDiv;

function initializeMainCanvas(){
		canvasButtonScroll.style.display = 'none';
		showInfoDiv = document.createElement("div");
		document.body.appendChild(showInfoDiv);
		showInfoDiv.style.width = "220px";
		showInfoDiv.style.background = "#FFD39B";
		showInfoDiv.style.display = "none";
		showInfoDiv.style.position = "absolute";
		showInfoDiv.style.cursor = "pointer";
		showInfoDiv.style["z-index"] = 2;
		showInfoDiv.style["border-radius"] = "10px";
		showInfoDiv.style["-moz-border-radius"] = "10px";
		showInfoDiv.style["-webkit-border-radius"] = "10px";
		showInfoDiv.style.paddingLeft = "5px";
		
		mainArticleDiv = document.createElement("div");
		mainArticleDiv.style.position = "absolute";
		mainArticleDiv.style.paddingLeft = "5px";
		mainArticleDiv.style.width = "500px";
	//	mainArticleDiv.innerHTML = "test";
	//	setDivInnerHTML(mainArticleDiv, authorObject);
		document.body.appendChild(mainArticleDiv);
		
		
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgb(120,120,120)";
		
		canvas.oncontextmenu= function(){ doubleClickRight(); return false;}
		canvas.ondblclick = function(){/* highlight(getObject("Beijing:China"));*/}
		
		
		canvas.onmousedown = function(e) {
			isDown = true;
			xForDoubleClick=e.clientX;
			yForDoubleClick=e.clientY;
			mouseDownCoords = [e.clientX - imageCoords[0], e.clientY - imageCoords[1]];
			startCoords = [(e.clientX-canvas.offsetLeft) - last[0],(e.clientY-canvas.offsetTop) - last[1]];
			var clickMapCoords = [(mouseDownCoords[0]-canvas.offsetLeft)%img[zoom].width, (mouseDownCoords[1]-canvas.offsetTop)%img[zoom].height];
			if (clickMapCoords[0] < 0) clickMapCoords[0] += img[zoom].width;
			listenAllClick(clickMapCoords[0],clickMapCoords[1],0);
		};
	
		canvas.onmousemove = function(e) {
			var mouseMapCoords = [e.clientX - imageCoords[0], e.clientY - imageCoords[1]];
			var mouseMoveMapCoords = [(mouseMapCoords[0]-canvas.offsetLeft)%img[zoom].width, (mouseMapCoords[1]-canvas.offsetTop)%img[zoom].height];
			if (mouseMoveMapCoords[0] < 0) mouseMoveMapCoords[0] += img[zoom].width;
			mouseInCanvas = 1;
			listenAllMouseOver(mouseMoveMapCoords[0], mouseMoveMapCoords[1], 0);
		}
		canvas.onmouseout = function(e){
			mouseInCanvas = 0;
			//console.log("yo");
		}
		canvas.onselectstart= function(){
			return false;
		}
		canvas.addEventListener('dblclick', function(){ 

  // Some dazzling stuff happens be here
  	//		showResult(0,countryRelevantDocument);
  	//		console.log("db click");
  	//		console.log(countryRelevantDocument);
  			if(_readyScroll==1 && readyScroll==1 && mouseInCanvas){
			multiplier=1;
			timeBefore = 0;
			if(zoom<2){
				readyScroll=-1;
				triangleSize=60;
			}
			mouseX=xForDoubleClick;
			mouseY=yForDoubleClick;
			deltaMouseX = mouseX - canvas.offsetLeft;
			deltaMouseY = mouseY - canvas.offsetTop;
			
  			}
  			return false;
  			
		});
}

function renderLoading(){
	if(loadingStatus){
	document.getElementById("loading").className = "loading-visible";	
	}
	else
	document.getElementById("loading").className = "loading-invisible";
}

function renderCanvas(){

	if(readyScroll<0) { 
			renderScroll();}
	if(readyScroll>0) {
			ready_x=Math.round(imageCoords[0])%img[zoom].width;
			ctx.drawImage(img[zoom],ready_x,imageCoords[1]); 
			if(imageCoords[0]<0){
			ready_x_p=ready_x+img[zoom].width;
			ctx.drawImage(img[zoom],ready_x_p,imageCoords[1]);}
			else{
			ready_x_n=ready_x-img[zoom].width;
			ctx.drawImage(img[zoom],ready_x_n,imageCoords[1]); }
			//displayCountry();
			if (highlightObjStatus == 1) renderHighlight();

		//	setDivPosition(mainArticleDiv, canvas.offsetLeft + canvas.width + 20, canvas.offsetTop + 20);
	}
}
function renderScroll(){
	
		if(_readyScroll==0) return;
		if(readyScroll==-1){
			multiplier += 0.05;			
		}
		if(readyScroll==-2){
			multiplier -= 0.025;
		}
			if(timeBefore>21) { 
				//	console.log("ini dia"+((deltaMouseX-imageCoords[0])*img[zoom+1].width/img[zoom].width-deltaMouseX));
					if(readyScroll==-1) {
						imageCoords[0] = (deltaMouseX-imageCoords[0])*img[zoom+1].width/img[zoom].width-deltaMouseX;
						imageCoords[1] = (deltaMouseY-imageCoords[1])*img[zoom+1].height/img[zoom].height-deltaMouseY;
						imageCoords[0] *= -1;
						imageCoords[1] *=- 1;
						mouseDownCoords = [mouseX - imageCoords[0], mouseY - imageCoords[1]];	
						zoom++;
						refreshShow();
					}
					else {
						imageCoords[0] = (deltaMouseX-imageCoords[0])*img[zoom-1].width/img[zoom].width-deltaMouseX;
						imageCoords[1] = (deltaMouseY-imageCoords[1])*img[zoom-1].height/img[zoom].height-deltaMouseY;
						imageCoords[0]*=-1;
						imageCoords[1]*=-1;
						mouseDownCoords = [mouseX - imageCoords[0], mouseY - imageCoords[1]];
						zoom--;
						refreshShow();
					}
					readyScroll=1;
					multiplier=0;
					
					return;
			}
		tempWidthImage=Math.round(img[zoom].width*multiplier);
		imageTempCoords[0]=Math.round((deltaMouseX-imageCoords[0])*tempWidthImage/img[zoom].width)-deltaMouseX;
		imageTempCoords[1]=(deltaMouseY-imageCoords[1])*img[zoom].height*multiplier/img[zoom].height-deltaMouseY;
		imageTempCoords[0]*=-1;
		imageTempCoords[1]*=-1;
		nready_x=imageTempCoords[0]%tempWidthImage;
		ctx.drawImage(img[zoom],nready_x,imageTempCoords[1],tempWidthImage,img[zoom].height*multiplier); 
		if(imageTempCoords[0]<0){
		nready_x_p=nready_x+tempWidthImage-1;
		ctx.drawImage(img[zoom],nready_x_p,imageTempCoords[1],tempWidthImage,img[zoom].height*multiplier); }
		else{
		nready_x_n=nready_x-tempWidthImage+1;
		ctx.drawImage(img[zoom],nready_x_n+1,imageTempCoords[1],tempWidthImage,img[zoom].height*multiplier); 
		}
		moveCursor();
	

}
		
function moveImage(){			
	
	if (isDown)															
	{
		imageCoords[0] = mouseX - mouseDownCoords[0];				
		imageCoords[1] = mouseY - mouseDownCoords[1];					
	}
	if (!isDown)
	{
		if(delta[0]<0.1 && delta[0]>-0.1) delta[0]=0;
		if(delta[1]<0.1 && delta[1]>-0.1) delta[1]=0;
		imageCoords[0]+=delta[0];
		imageCoords[1]+=delta[1];
		if (delta[0]==0) imageCoords[0] = Math.round(imageCoords[0]);
		if (delta[1]==0) imageCoords[1] = Math.round(imageCoords[1]);
		if(delta[0]>0) delta[0]*=0.93;
		if(delta[0]<0) delta[0]*=0.93;
		if(delta[1]>0) delta[1]*=0.93;
		if(delta[1]<0) delta[1]*=0.93;
	}
	if(imageCoords[1]>300) imageCoords[1]=300;
	if(imageCoords[1]<-img[zoom].height+canvas.height-300) imageCoords[1]=-img[zoom].height+canvas.height-300;
}