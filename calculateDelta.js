function calculateDelta()
{
		var curDate = new Date();
		var x = (mouseX-canvas.offsetLeft);
		var y = (mouseY-canvas.offsetTop);
		delta = [5*(x - startCoords[0])/(curDate - pastDate), 5*(y - startCoords[1])/(curDate - pastDate)];
		startCoords = [x,y];
		pastDate = curDate;

}