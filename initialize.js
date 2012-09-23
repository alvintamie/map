// 
 	var ctxButton;
 	var ctxButtonScroll;


	var canvas;
	var ctx;
	var canvasButton;
	var canvasButtonScroll;
	var timeBefore = 0;
	var timeNow= 0;
	var readyScroll=1;
	var img= new Array();
	var imgObject= new Array();
	var imgSizeX= new Array();
	var imgSizeY= new Array();
	var triangleSize=0;
	var stripLength = 15;
	var rotateAngle = 0;
	var tempWidthImage;

var ready_x;
var ready_x_p;
var ready_x_n;
var nready_x;
var nready_x_p;
var nready_x_n;
var obj_dis_x;

	img[0] = new Image();
	img[1] = new Image();
	img[2] = new Image();
	imgObject[0]= new Image();
	imgObject[1]= new Image();

	imgObject[0].src = 'https://raw.github.com/alvi0010/map/master/image/person.png';
	imgObject[1].src = 'https://raw.github.com/alvi0010/map/master/image/person1.png';
	
	imgSizeX[0]=img[0].width;
	imgSizeX[1]=img[1].width;
	imgSizeX[2]=img[2].width;
	imgSizeY[0]=img[0].height;
	imgSizeY[1]=img[1].height;
	imgSizeY[2]=img[2].height;
	

	var isDown = false;
	var startCoords = [0,0];
	var imageCoords=[0,0];
	var imageTempCoords=[0,0];
	var last   =[0,0];
	var delta  =[0,0];
	var zoom   =0;
//	var canvasPosX = 158;
//	var canvasPosY = 43;
	var mouseX=0;
	var mouseY=0;
	var deltaMouseX;
	var deltaMouseY;
	var multiplier=0;
	
	//for calculateDelta
	var pastDate = new Date();
	
	//for goTo
	var goTo_steps = 0;
	var stepNumber = 0;
	var stepVector = [0,0];
	
	
// for Author menu
	var c;
	var d;
	var canvasBackground;
	var ctxBackground;
	var canvasAuthor;
	var ctxAuthor;
	var canvasMenu;
	var ctxMenu;
	var actionAuthor=0;
	var imgAuthor = new Image;
	imgAuthor.src = 'https://raw.github.com/alvi0010/map/master/image/author.jpg';
	
// for resize canvas
	var canvasMaxSizeX=1025;
	var canvasMaxSizeY=552;
	var resizeBuffer1=1000;
	var resizeBuffer2=600;
	var resizeBufferRight=1000;
	var canvasResizeRight;
	var ctxResizeRight;
	var canvasResizeBottom;
	var ctxResizeBottom;
	
	
	//for country
	var code = -1;
	var prevZoom = -1;
	var colorCountry;
	var colorMap;
	var canvasTemp = new Array(3);
	var ctxTemp = new Array(3);
	var countryLeftX;
	var countryRightX;
	var countryTopY;
	var countryBottomY;
	var countryWidth;
	var countryHeight;
	
		// for canvasObject
		
	var multiplierObjectX=new Array();
	var multiplierObjectY=new Array();
	var canvasObject = new Array();
	var canvasObjectAuthor = new Object();
	multiplierObjectX[0]=1;
	multiplierObjectX[1]=2;
	multiplierObjectX[2]=4;
	multiplierObjectY[0]=1;
	multiplierObjectY[1]=2;
	multiplierObjectY[2]=4;
	
	// for author/menu
	var imgDataMenu = new Array(2);
	var frameWidth = 4;
	var buttonMenuWidth = 50;
	var	buttonMenuHeight = 20;
	//var imgSearch = new Image;
	//imgSearch.src = 'https://raw.github.com/alvi0010/map/master/image/author.jpg';
	var divReference;
	var divCitedBy;
	var divRelevantDocument;
	var divCoAuthor;
	var divSearch;
	//var divAffiliation;
	//var imgAffiliation = new Image;
	//imgAffiliation.src = 'https://raw.github.com/alvi0010/map/master/image/author.jpg';
	//var canvasSearch;
	//var ctxSearch;
	//var canvasAffiliation;
	//var ctxAffiliation;
	var topbarHeight = 25;
	var zIndex = 10;
	var mouseInCanvas = 0;
	var minimizePosWidth = 30;
	
	//for buttonscroll
	var imgIn = new Image;
	imgIn.src = 'https://raw.github.com/alvi0010/map/master/image/zoomin.png';
	var imgOut = new Image;
	imgOut.src = 'https://raw.github.com/alvi0010/map/master/image/zoomout.png';
	var imgLeft = new Image;
	imgLeft.src = 'https://raw.github.com/alvi0010/map/master/image/shiftleft.png';
	var imgRight = new Image;
	imgRight.src = 'https://raw.github.com/alvi0010/map/master/image/shiftright.png';
	var imgUp = new Image;
	imgUp.src = 'https://raw.github.com/alvi0010/map/master/image/shiftup.png';
	var imgDown = new Image;
	imgDown.src = 'https://raw.github.com/alvi0010/map/master/image/shiftdown.png';
	var lastMouseX;
	var lastMouseY;
	
	//Expand/Contract
	var imgExpand = new Image;
	imgExpand.src = 'https://raw.github.com/alvi0010/map/master/image/expand.png';
	var imgContract = new Image;
	imgContract.src = 'https://raw.github.com/alvi0010/map/master/image/contract.png';
	
	
