function moveCursor(){
		ctx.save();
		ctx.lineWidth = 2;
		ctx.translate(deltaMouseX, deltaMouseY);
		ctx.rotate(rotateAngle*Math.PI/180);
		//console.log(rotateAngle);
		ctx.beginPath();
		ctx.moveTo(-triangleSize/2.0+stripLength, triangleSize*Math.sqrt(3.0)/6.0);
		ctx.lineTo(-triangleSize/2.0, triangleSize*Math.sqrt(3.0)/6.0);
		ctx.lineTo(-triangleSize/2.0+stripLength/2.0, triangleSize*Math.sqrt(3.0)/6.0-stripLength*Math.sqrt(3.0)/2.0);
		ctx.strokeStyle = 'blue';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(-stripLength/2.0, -triangleSize*Math.sqrt(3.0)/3.0+stripLength*Math.sqrt(3.0)/2.0);
		ctx.lineTo(0, -triangleSize*Math.sqrt(3.0)/3.0);
		ctx.lineTo(stripLength/2.0, -triangleSize*Math.sqrt(3.0)/3.0+stripLength*Math.sqrt(3.0)/2.0);
		ctx.strokeStyle = 'red';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(triangleSize/2.0-stripLength, triangleSize*Math.sqrt(3.0)/6.0);
		ctx.lineTo(triangleSize/2.0, triangleSize*Math.sqrt(3.0)/6.0);
		ctx.lineTo(triangleSize/2.0-stripLength/2.0, triangleSize*Math.sqrt(3.0)/6.0-stripLength*Math.sqrt(3.0)/2.0);
		ctx.strokeStyle = 'green';
		ctx.stroke();
		ctx.restore();
		if (timeBefore<21) {
			if (readyScroll==-1) {
				triangleSize += 3;
				rotateAngle += 6;
			}
			else {
				triangleSize -= 3;
				rotateAngle -= 6;
			}
		}
	}