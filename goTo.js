function renderGoTo()
{
		if(goTo_steps > 0)
		{
			imageCoords[0] += stepVector[0];
			imageCoords[1] += stepVector[1];
			goTo_steps --;
		}
}

function goTo(mapX,mapY,canvasX,canvasY)
{
		moveCalculation(mapX,mapY,canvasX,canvasY);
		goTo_steps = stepNumber;
}
	

function moveCalculation(mapX,mapY,canvasX,canvasY)
{
	var stepSize = 25;
	//var stepVector = [0,0];
	//var stepNumber = 0;
	var vectorSize = 0;

	
	stepVector[0] = ( (mapX - canvasX) - imageCoords[0])%img[zoom].width ;
	if (Math.abs(stepVector[0]) > 0.5*img[zoom].width)
	{
		if (stepVector[0] > 0) stepVector[0] -= img[zoom].width;
		else stepVector[0] += img[zoom].width;
	}
	stepVector[1] = ((mapY - canvasY) - imageCoords[1] )%img[zoom].height ;
	
	vectorSize = Math.sqrt(stepVector[0]*stepVector[0] + stepVector[1]*stepVector[1]) ;
	stepNumber = Math.floor(vectorSize / stepSize);
	stepVector[0] /= stepNumber;
	stepVector[1] /= stepNumber;

	
}

function wait( ms )
{
	var date = new Date();
	var curDate = null;
	while (curDate - date < ms) curDate = new Date();
}