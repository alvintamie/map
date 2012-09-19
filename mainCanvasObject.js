var authorMarginX=5;
var authorMarginY=10;
var canvasObjectText = new Array();
function renderCanvasObject(){	
			authorMarginX=imgObject[0].width/2/multiplierObjectX[zoom];
			authorMarginY=imgObject[0].height/2/multiplierObjectY[zoom];
			obj_dis_x=multiplier*multiplierObjectX[zoom];
			obj_dis_y=multiplier*multiplierObjectY[zoom];
			obj_m_x=multiplier*multiplierObjectX[zoom];
			obj_m_y=multiplier*multiplierObjectY[zoom];
	if(canvasObjectAuthor.status==-1)
	for(var i=0;i<canvasObject.length;i++){
			drawObjectLine(canvasObjectAuthor,canvasObject[i])};
	for(var i=0;i<canvasObject.length;i++){
			drawObject(canvasObject[i].img,canvasObject[i].x,canvasObject[i].y);
			  drawText(canvasObjectText[i],canvasObject[i].x,canvasObject[i].y);
	}
	drawObject(canvasObjectAuthor.img,canvasObjectAuthor.x,canvasObjectAuthor.y);
}

function drawObject(im,x,y){
	
			if(readyScroll<0) { 
			ctx.drawImage(imgObject[im],nready_x+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]);		
			if(imageCoords[0]<0)
			ctx.drawImage(imgObject[im],nready_x_p+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]); 
			else
			ctx.drawImage(imgObject[im],nready_x_n+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]); 
			}
	if(readyScroll>0) {
			ctx.drawImage(imgObject[im],ready_x+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]);
			if(imageCoords[0]<0)
			ctx.drawImage(imgObject[im],ready_x_p+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]); 
			else
			ctx.drawImage(imgObject[im],ready_x_n+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]); 
	}
}

function drawText(text,x,y){
	ctx.font = "bold 12px sans-serif";
	if(readyScroll<0) { 
		ctx.fillText(text,nready_x+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]);		
		if(imageCoords[0]<0)
		ctx.fillText(text,nready_x_p+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]); 
		else
		ctx.fillText(text,nready_x_n+x*obj_dis_x,y*obj_dis_y+imageTempCoords[1]);
	}
	if(readyScroll>0) {
		ctx.fillText(text,ready_x+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]);
		if(imageCoords[0]<0)
		ctx.fillText(text,ready_x_p+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]); 
		else
		ctx.fillText(text,ready_x_n+x*multiplierObjectX[zoom],imageCoords[1]+y*multiplierObjectY[zoom]); 
	}
}

function drawObjectLine(obj1,obj2){
	
	ctx.save();
	ctx.strokeStyle = 'yellow';
	ctx.lineWidth = 2;
	ctx.beginPath();
	if(readyScroll<0) { 
	ctx.moveTo(nready_x+(obj1.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj1.y+authorMarginY)*multiplier*multiplierObjectY[zoom]);
	ctx.lineTo(nready_x+(obj2.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj2.y+authorMarginY)*multiplier*multiplierObjectY[zoom]);	ctx.stroke();
	ctx.stroke();
			if(imageCoords[0]<0){
				ctx.moveTo(nready_x_p+(obj1.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj1.y+authorMarginY)*obj_m_y);
				ctx.lineTo(nready_x_p+(obj2.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj2.y+authorMarginY)*obj_m_y);
				ctx.stroke();}
			else{	
				ctx.moveTo(nready_x_n+(obj1.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj1.y+authorMarginY)*obj_m_y);
				ctx.lineTo(nready_x_n+(obj2.x+authorMarginX)*obj_m_x,imageTempCoords[1]+(obj2.y+authorMarginY)*obj_m_y);
				ctx.stroke();}}
	if(readyScroll>0){
	ctx.moveTo(ready_x+(obj1.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj1.y+authorMarginY)*multiplierObjectY[zoom]);
	ctx.lineTo(ready_x+(obj2.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj2.y+authorMarginY)*multiplierObjectY[zoom]);ctx.stroke();
		if(imageCoords[0]<0){
			ctx.moveTo(ready_x_p+(obj1.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj1.y+authorMarginY)*multiplierObjectY[zoom]);
			ctx.lineTo(ready_x_p+(obj2.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj2.y+authorMarginY)*multiplierObjectY[zoom]);ctx.stroke();
			}
	   else{
	   	ctx.moveTo(ready_x_n+(obj1.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj1.y+authorMarginY)*multiplierObjectY[zoom]);
			ctx.lineTo(ready_x_n+(obj2.x+authorMarginX)*multiplierObjectX[zoom],imageCoords[1]+(obj2.y+authorMarginY)*multiplierObjectY[zoom]);ctx.stroke();
			}}

	ctx.stroke();
	ctx.restore();
	}

function addCanvasObject(x,y,imgNumber){
	
	var obj = new Object;
	obj.x=x;
	obj.y=y;
	obj.img=imgNumber;
	canvasObject.push(obj);
	}
	
function addCanvasObjectAuthor(x,y,imgNumber){
	

	canvasObjectAuthor.x=x;
	canvasObjectAuthor.y=y;
	canvasObjectAuthor.img=imgNumber;
	}

function clearCanvasObject(){
	canvasObjectAuthor.status=-1;
	canvasObject=[];
	}

//	ctx.drawImage(img[zoom],imageTempCoords[0]%tempWidthImage,imageTempCoords[1],tempWidthImage,img[zoom].height*multiplier); 


	