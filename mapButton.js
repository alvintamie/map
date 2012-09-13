function mapButton(){
	
	canvasButton = document.getElementById('canvasButton');
	ctxButton = canvasButton.getContext('2d');
	ctxButton.fillStyle = "rgb(220,220,220)";

	canvasButtonScroll = document.getElementById('canvasButtonScroll');
	ctxButtonScroll = canvasButtonScroll.getContext('2d');
	ctxButtonScroll.fillStyle = "rgb(220,220,220)";
	
	
		canvasButtonScroll.onmousedown = function(e) {
		if (e.clientX>canvasPosX+20 && e.clientX<40+canvasPosX && e.clientY>150+canvasPosY && e.clientY<180+canvasPosY) {	
			if (readyScroll==1) {
				multiplier = 1;
				timeBefore = 0;
				if(zoom<2) {
					readyScroll = -1;
					triangleSize = 60;
				}
				mouseX=canvasPosX+canvas.width/2;
				mouseY=canvasPosY+canvas.height/2;
				deltaMouseX = canvas.width/2;
				deltaMouseY = canvas.height/2;
			}
		}
		
		if(e.clientX>canvasPosX+20 && e.clientX<40+canvasPosX && e.clientY>320+canvasPosY && e.clientY<350+canvasPosY){	
			if (readyScroll==1) {
				multiplier = 1;
				timeBefore = 0;
				if (zoom>0) {
					readyScroll = -2;
					triangleSize = 120;
				}
				mouseX = canvasPosX+canvas.width/2;
				mouseY = canvasPosY+canvas.height/2;
				deltaMouseX = canvas.width/2;
				deltaMouseY = canvas.height/2;
			}
		}
	}
	canvasButton.onmousedown = function(e){
	console.log(e.clientX);
	console.log(canvasButton.clientLeft);
		if (e.clientX<canvasButton.width/3+canvasPosX && e.clientY>canvasButton.height/3+canvasPosY && e.clientY<2*canvasButton.height/3+canvasPosY) {	
			imageCoords[0]+=10;
		}
	
		if (e.clientX>canvasPosX+2*canvasButton.width/3 && e.clientY>canvasButton.height/3+canvasPosY && e.clientY<2*canvasButton.height/3+canvasPosY) {	
			imageCoords[0]-=10;
		}
		
		if (e.clientX>canvasPosX+canvasButton.width/3 && e.clientX<2*canvasButton.width/3+canvasPosX && e.clientY<canvasButton.height/3+canvasPosY) {	
			imageCoords[1]+=10;
		}
		
		if (e.clientX>canvasPosX+canvasButton.width/3 && e.clientX<2*canvasButton.width/3+canvasPosX && e.clientY>2*canvasButton.height/3+canvasPosY) {	
			imageCoords[1]-=10;
		}
	}
}

	function renderButton(){
		//ctxButton.fillRect ( 0 , 0 , canvasButton.width , canvasButton.height );
		ctxButton.drawImage (imgLeft, 0, canvasButton.height/3);
		ctxButton.drawImage (imgRight, 2*canvasButton.width/3, canvasButton.height/3);
		ctxButton.drawImage (imgUp, canvasButton.width/3, 0);
		ctxButton.drawImage (imgDown, canvasButton.width/3, 2*canvasButton.height/3);
		ctxButtonScroll.fillRect ( 0 , 0 , canvasButtonScroll.width , canvasButtonScroll.height);
		ctxButtonScroll.drawImage (imgIn, 0, 0);
		ctxButtonScroll.drawImage (imgOut, 0, canvasButtonScroll.height-imgOut.height);
		}