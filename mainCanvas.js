var _readyScroll=0;
function initializeMainCanvas(){
		_readyScroll=1;
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgb(120,120,120)";
		
		//canvas.ondblclick = function(){ goTo(100,100,300,300);}
		
		
		canvas.onmousedown = function(e) {
			isDown = true;
			mouseDownCoords = [e.clientX - imageCoords[0], e.clientY - imageCoords[1]];
			startCoords = [(e.clientX-canvas.offsetLeft) - last[0],(e.clientY-canvas.offsetTop) - last[1]];
			var clickMapCoords = [(mouseDownCoords[0]-canvas.offsetLeft)%img[zoom].width, (mouseDownCoords[1]-canvas.offsetTop)%img[zoom].height];
			if (clickMapCoords[0] < 0) clickMapCoords[0] += img[zoom].width;
			listenAllClick(clickMapCoords[0],clickMapCoords[1], 0);
		};
	
		canvas.onmousemove = function(e) {
			mouseInCanvas = 1;
		}
		canvas.onmouseout = function(e){
			mouseInCanvas = 0;
			//console.log("yo");
		}
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
			if (highlightObj.status == 1) renderHighlight();
	}
}
function renderScroll(){
		try{
		if(_readyScroll==0) return;
		if(readyScroll==-1){
			multiplier += 0.05;			
		}
		if(readyScroll==-2){
			multiplier -= 0.025;
		}
			if(timeBefore>21) { 
				
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
	catch(e){ console.log("Image is not ready");};
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